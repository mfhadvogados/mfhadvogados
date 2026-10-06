import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const names = [
  "Ricardo Karam",
  "Rodrigo Melendez",
  "Ana Caroline Nascimento",
  "Tayano Lima",
  "Floeli Do Prado Santos",
];
const files = [
  "ricardoKaram",
  "rodrigoMelendez",
  "anaCarolineNascimento",
  "tayanoLima",
  "floeliDoPradoSantos",
];
const source = readFileSync("feedbacks/feedbacksTexto.txt", "utf8");
const sourceTexts = names.map((name, index) => {
  const start = source.indexOf(name) + name.length;
  const end =
    index + 1 < names.length ? source.indexOf(names[index + 1]) : undefined;
  return source
    .slice(start, end)
    .replace(/^\s*:\s*/, "")
    .trim();
});

for (const width of [320, 768, 1440]) {
  test(`avaliações preservam fontes, fotos e cards uniformes em ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const section = page.locator("#avaliacoes");
    await section.scrollIntoViewIfNeeded();
    const cards = section.getByRole("article");
    await expect(cards).toHaveCount(5);
    await expect(
      section.getByRole("img", { name: "5 de 5 estrelas" }),
    ).toHaveCount(5);

    for (let index = 0; index < names.length; index++) {
      const card = cards.nth(index);
      await expect(card.getByRole("heading")).toHaveText(names[index]);
      await expect(card.locator("blockquote")).toHaveText(sourceTexts[index]);
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

    const expectedVisible =
      width === 320 ? "1 de 5" : width === 768 ? "1–2 de 5" : "1–3 de 5";
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
  await expect(counter).toHaveText("2 de 5");
  await expect(previous).toBeEnabled();
  await previous.click();
  await expect(counter).toHaveText("1 de 5");
  await track.focus();
  await page.keyboard.press("End");
  await expect(counter).toHaveText("5 de 5");
  await expect(next).toBeDisabled();
  await page.keyboard.press("ArrowLeft");
  await expect(counter).toHaveText("4 de 5");
  await page.keyboard.press("Home");
  await expect(counter).toHaveText("1 de 5");
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
  await expect(dialog.locator("blockquote")).toHaveText(sourceTexts[0]);
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
    const text = noScriptPage.locator("#avaliacoes .review-card__text").first();
    await expect(text).toHaveText(sourceTexts[0]);
    expect(
      await text.evaluate(
        (element) => element.scrollHeight - element.clientHeight,
      ),
    ).toBeLessThanOrEqual(1);
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

test("todas as avaliações completas cabem no diálogo de um celular pequeno", async ({
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
    await expect(button).toBeVisible();
    await button.click();
    const dialog = page.getByRole("dialog", { name: names[index] });
    await expect(dialog.locator("blockquote")).toHaveText(sourceTexts[index]);
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
