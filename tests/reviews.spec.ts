import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const files = [
  "ricardoKaram",
  "rodrigoMelendez",
  "anaCarolineNascimento",
  "tayanoLima",
  "floeliDoPradoSantos",
  "anapaulapereira",
  "marianaGuedes",
  "lauraFenoci",
  "michellePereira",
  "rafaelaCardoso",
];
const source = readFileSync("feedbacks/feedbacksTexto.txt", "utf8").replace(
  /\r\n/g,
  "\n",
);
const sourceHeaders = [...source.matchAll(/^([^:\n]+?)\s*:\s*/gm)];
const names = sourceHeaders.map((header) => header[1].trim());
const sourceTexts = sourceHeaders.map((header, index) =>
  source
    .slice(header.index + header[0].length, sourceHeaders[index + 1]?.index)
    .trim(),
);
const total = names.length;

for (const width of [320, 768, 1440]) {
  test(`avaliações preservam fontes, fotos e cards uniformes em ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const section = page.locator("#avaliacoes");
    await section.scrollIntoViewIfNeeded();
    const cards = section.getByRole("article");
    expect(total).toBe(10);
    await expect(cards).toHaveCount(total);
    await expect(section.getByRole("list")).toHaveAccessibleName(
      `${total} avaliações no Google`,
    );
    await expect(
      section.getByRole("img", { name: "5 de 5 estrelas" }),
    ).toHaveCount(total);

    for (let index = 0; index < names.length; index++) {
      const card = cards.nth(index);
      await expect(card.getByRole("heading")).toHaveText(names[index]);
      expect(await card.locator("blockquote > p").textContent()).toBe(
        sourceTexts[index],
      );
      await expect(card.locator("img")).toHaveAttribute(
        "src",
        new RegExp(files[index]),
      );
      const box = await card.boundingBox();
      expect(box!.height).toBe(364);
      if (index > 0) {
        const first = await cards.first().boundingBox();
        expect(Math.abs(box!.width - first!.width)).toBeLessThanOrEqual(1);
        expect(box!.y).toBe(first!.y);
      }
    }

    const expectedVisible = `${width === 320 ? "1" : width === 768 ? "1–2" : "1–3"} de ${total}`;
    await expect(section.locator(".reviews__controls > p")).toHaveText(
      expectedVisible,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBeLessThanOrEqual(1);
    const order = await page.evaluate(() => {
      const reviews = document.querySelector("#avaliacoes")!;
      return (
        reviews.parentElement!.lastElementChild === reviews &&
        reviews.getBoundingClientRect().bottom <=
          document.querySelector("footer")!.getBoundingClientRect().top + 1
      );
    });
    expect(order).toBe(true);
  });
}

test("carrossel responde a botões e teclado e respeita seus limites", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const section = page.locator("#avaliacoes");
  await section.scrollIntoViewIfNeeded();
  const counter = section.locator(".reviews__controls > p");
  const previous = section.getByRole("button", { name: "Avaliação anterior" });
  const next = section.getByRole("button", { name: "Próxima avaliação" });
  const track = section.getByRole("list");
  await expect(previous).toBeDisabled();
  await next.click();
  await expect(counter).toHaveText(`2 de ${total}`);
  await expect(previous).toBeEnabled();
  await previous.click();
  await expect(counter).toHaveText(`1 de ${total}`);
  await track.focus();
  await page.keyboard.press("End");
  await expect(counter).toHaveText(`${total} de ${total}`);
  await expect(next).toBeDisabled();
  await page.keyboard.press("ArrowLeft");
  await expect(counter).toHaveText(`${total - 1} de ${total}`);
  await page.keyboard.press("Home");
  await expect(counter).toHaveText(`1 de ${total}`);
});

test("navegação alcança as cinco avaliações novas com suas fotos", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const section = page.locator("#avaliacoes");
  await section.scrollIntoViewIfNeeded();
  const counter = section.locator(".reviews__controls > p");
  const next = section.getByRole("button", { name: "Próxima avaliação" });

  for (let index = 1; index < total; index++) {
    await next.click();
    await expect(counter).toHaveText(`${index + 1} de ${total}`);
    if (index < total - 5) continue;
    const card = section.getByRole("article", { name: names[index] });
    await expect(card.getByRole("heading")).toBeInViewport();
    expect(await card.locator("blockquote > p").textContent()).toBe(
      sourceTexts[index],
    );
    const avatar = card.locator("img");
    await expect(avatar).toHaveAttribute("src", new RegExp(files[index]));
    await expect
      .poll(() =>
        avatar.evaluate((image) => (image as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }
  await expect(next).toBeDisabled();
});

test("rolagem horizontal e redimensionamento atualizam o carrossel", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const section = page.locator("#avaliacoes");
  await section.scrollIntoViewIfNeeded();
  const track = section.getByRole("list");
  const counter = section.locator(".reviews__controls > p");
  await track.hover();
  await track.evaluate((element) => {
    element.setAttribute("data-test-scroll-ended", "false");
    element.addEventListener(
      "scrollend",
      () => element.setAttribute("data-test-scroll-ended", "true"),
      { once: true },
    );
  });
  await page.mouse.wheel(390, 0);
  // Wheel input returns before the browser finishes its native scroll snapping.
  await expect(track).toHaveAttribute("data-test-scroll-ended", "true");
  await track.evaluate((element) =>
    element.removeAttribute("data-test-scroll-ended"),
  );
  await expect(counter).not.toHaveText(`1 de ${total}`);
  await expect(
    section.getByRole("button", { name: "Avaliação anterior" }),
  ).toBeEnabled();

  for (const width of [1440, 768, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await track.focus();
    await page.keyboard.press("End");
    const visible = width === 1440 ? 3 : width === 768 ? 2 : 1;
    const expected =
      visible === 1 ? `${total}` : `${total - visible + 1}–${total}`;
    await expect(counter).toHaveText(`${expected} de ${total}`);
    await expect(
      section.getByRole("button", { name: "Próxima avaliação" }),
    ).toBeDisabled();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBeLessThanOrEqual(1);
  }
});

test("ler mais mostra o texto completo sem alterar o tamanho dos cards", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await page.goto("/");
  const section = page.locator("#avaliacoes");
  await section.scrollIntoViewIfNeeded();
  const button = section.getByRole("button", {
    name: "Ler avaliação completa de Ricardo Karam",
  });
  await expect(button).toBeVisible();
  await button.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Ricardo Karam" });
  await expect(dialog).toBeVisible();
  expect(await dialog.locator("blockquote > p").textContent()).toBe(
    sourceTexts[0],
  );
  await expect(
    dialog.getByRole("button", { name: "Fechar avaliação" }),
  ).toBeInViewport();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  for (let count = 0; count < 5; count++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(button).toBeFocused();
  for (const card of await section.getByRole("article").all()) {
    expect((await card.boundingBox())!.height).toBe(364);
  }
});

test("avaliação curta cabe no desktop e texto completo funciona sem JavaScript", async ({
  page,
  browser,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const floeli = page
    .locator("#avaliacoes")
    .getByRole("article", { name: "Floeli Do Prado Santos" });
  await floeli.scrollIntoViewIfNeeded();
  await expect(
    floeli.getByRole("button", { name: /Ler avaliação completa/ }),
  ).toHaveCount(0);

  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 900 },
  });
  try {
    const noScriptPage = await context.newPage();
    await noScriptPage.goto(page.url());
    const texts = noScriptPage.locator("#avaliacoes .review-card__text");
    await expect(texts).toHaveCount(total);
    for (let index = 0; index < total; index++) {
      const text = texts.nth(index);
      expect(await text.textContent()).toBe(sourceTexts[index]);
      expect(
        await text.evaluate(
          (element) => element.scrollHeight - element.clientHeight,
        ),
      ).toBeLessThanOrEqual(1);
    }
  } finally {
    await context.close();
  }
});

test("controles das avaliações deixam espaço para o WhatsApp flutuante", async ({
  page,
}) => {
  for (const width of [320, 390, 600, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await page.locator("#avaliacoes").scrollIntoViewIfNeeded();
    const floating = await page.locator(".floating-whatsapp").boundingBox();
    for (const button of await page
      .locator(".reviews__controls button")
      .all()) {
      const box = await button.boundingBox();
      expect(box!.x + box!.width).toBeLessThan(floating!.x);
    }
    await expect(
      page.getByRole("link", { name: "Voltar ao início", exact: true }),
    ).toHaveAttribute("href", "#inicio");
  }
});

test("avaliações truncadas cabem no diálogo e as curtas no card de um celular pequeno", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const section = page.locator("#avaliacoes");
  await section.scrollIntoViewIfNeeded();
  await expect(section.locator(".review-card__read").first()).toBeVisible();

  for (let index = 0; index < names.length; index++) {
    const card = section.getByRole("article", { name: names[index] });
    await card.scrollIntoViewIfNeeded();
    const button = card.getByRole("button", {
      name: `Ler avaliação completa de ${names[index]}`,
    });
    const text = card.locator(".review-card__text");
    const truncated = await text.evaluate(
      (element) => element.scrollHeight > element.clientHeight + 1,
    );
    if (!truncated) {
      await expect(button).toHaveCount(0);
      expect(await text.textContent()).toBe(sourceTexts[index]);
      continue;
    }
    await expect(button).toBeVisible();
    await button.click();
    const dialog = page.getByRole("dialog", { name: names[index] });
    expect(await dialog.locator("blockquote > p").textContent()).toBe(
      sourceTexts[index],
    );
    const box = await dialog.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
    expect(box!.y + box!.height).toBeLessThanOrEqual(480);
    await expect(
      dialog.getByRole("button", { name: "Fechar avaliação" }),
    ).toBeInViewport();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(button).toBeFocused();
  }
});
