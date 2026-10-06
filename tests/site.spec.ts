import { expect, test, type Page } from "@playwright/test";

const widths = [320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920];
const sectionIds = [
  "inicio",
  "escritorio",
  "atuacao",
  "prevencao",
  "contencioso",
  "diferenciais",
  "profissionais",
  "contato",
];
const invalidContent =
  /lorem ipsum|projeto demonstrativo|profissional fictício/i;
const forbiddenImage = /reserva/i;
const officialImage =
  /fotohero|fotoEquipe|flavioAugusto|rafaelaFernandes|francieleKarine|logo-v[12]|ricardoKaram|rodrigoMelendez|anaCarolineNascimento|tayanoLima|floeliDoPradoSantos/;

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(
    overflow,
    "A página deve caber na largura da viewport",
  ).toBeLessThanOrEqual(1);
}

async function expectImagesLoaded(page: Page) {
  const images = page.locator("main img");
  expect(await images.count()).toBeGreaterThanOrEqual(5);

  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
    const source = await image.getAttribute("src");
    expect(decodeURIComponent(source ?? "")).not.toMatch(forbiddenImage);
    expect(decodeURIComponent(source ?? "")).toMatch(officialImage);
  }
}

for (const width of widths) {
  test(
    "MFH: conteúdo, imagens e composição responsiva em " + width + "px",
    async ({ page }, testInfo) => {
      const failures: string[] = [];
      const imageRequests: string[] = [];
      page.on("pageerror", (error) => failures.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") failures.push(message.text());
      });
      page.on("response", (response) => {
        if (response.status() >= 400)
          failures.push(response.status() + " " + response.url());
      });
      page.on("request", (request) => {
        if (request.resourceType() === "image")
          imageRequests.push(request.url());
      });

      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        /Inteligência jurídica\.\s*Visão empresarial\./i,
      );
      await expect(page.locator("#inicio img")).toBeVisible();
      await expectNoHorizontalOverflow(page);

      for (const id of sectionIds) {
        const section = page.locator("#" + id);
        await expect(section).toHaveCount(1);
        await section.scrollIntoViewIfNeeded();
        await expect(section.getByRole("heading").first()).toBeVisible();
        await expectNoHorizontalOverflow(page);
      }

      await expectImagesLoaded(page);
      await expect(page.locator("body")).toContainText(/desde 2006/i);
      await expect(page.locator("#profissionais")).toContainText(
        /Flavio.*Melara/,
      );
      await expect(page.locator("#profissionais")).toContainText(
        /Rafaela.*Fuhrmann/,
      );
      await expect(page.locator("#profissionais")).toContainText(
        /Franciele.*Huinka/,
      );
      await expect(page.locator("body")).not.toContainText(invalidContent);
      await expect(page.locator("footer")).toContainText(
        /Melara, Fuhrmann & Huinka/,
      );

      for (const request of imageRequests) {
        expect(decodeURIComponent(request)).not.toMatch(forbiddenImage);
      }

      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      await page.screenshot({
        path: testInfo.outputPath("mfh-" + width + ".png"),
        fullPage: true,
      });
      expect(failures).toEqual([]);
    },
  );
}

test("Sheet móvel mantém foco, permite rolagem interna e fecha por Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Abrir menu" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const menu = page.getByRole("dialog", { name: "Navegação principal" });
  await expect(menu).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expectNoHorizontalOverflow(page);
  await expect(
    menu.getByRole("button", { name: "Fechar menu" }),
  ).toBeInViewport();

  for (let tab = 0; tab < 12; tab++) {
    await page.keyboard.press("Tab");
    expect(
      await menu.evaluate((dialog) => dialog.contains(document.activeElement)),
    ).toBe(true);
  }

  const contact = menu.getByRole("link", { name: "Falar com o escritório" });
  await contact.scrollIntoViewIfNeeded();
  await expect(contact).toBeInViewport();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("Sheet fecha ao navegar para Contencioso e transfere foco abaixo do header", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const menu = page.getByRole("dialog", { name: "Navegação principal" });
  await menu.getByRole("link", { name: "Contencioso", exact: true }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#contencioso$/);
  const heading = page.locator("#contencioso").getByRole("heading").first();
  await expect(heading).toHaveText(/Contencioso estratégico\s*e de massa\./i);
  await expect(heading).toBeInViewport();
  await expect(heading).toBeFocused();
  await expect
    .poll(async () => {
      const titleBounds = await heading.boundingBox();
      const headerBounds = await page.locator("header").boundingBox();
      return titleBounds && headerBounds
        ? titleBounds.y >= headerBounds.y + headerBounds.height - 1
        : false;
    })
    .toBe(true);
  await expectNoHorizontalOverflow(page);
});

test("áreas expandem por teclado e painéis fechados saem da árvore acessível", async ({
  page,
}) => {
  await page.goto("/");
  const labor = page.getByRole("button", {
    name: "Direito Trabalhista Empresarial",
    exact: true,
  });
  const corporate = page.getByRole("button", {
    name: "Direito Societário",
    exact: true,
  });
  await expect(labor).toHaveAttribute("aria-expanded", "true");
  await labor.focus();
  await page.keyboard.press("ArrowDown");
  await expect(corporate).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(corporate).toHaveAttribute("aria-expanded", "true");
  await expect(labor).toHaveAttribute("aria-expanded", "false");
  const panel = page.getByRole("region", {
    name: "Direito Societário",
    exact: true,
  });
  await expect(panel).toBeVisible();
  await expect(panel).toContainText(/societ|sócios|sociedades/i);
  await page.keyboard.press("Enter");
  await expect(corporate).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toHaveCount(0);
  await page.keyboard.press("End");
  await expect(
    page.getByRole("button", { name: "Cobranças e Notificações", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Home");
  await expect(labor).toBeFocused();
});

test("links de áreas abrem painel e transferem foco, inclusive no acesso direto", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#atuacao-patrimonial");
  const patrimonial = page.getByRole("button", {
    name: "Proteção Patrimonial",
    exact: true,
  });
  await expect(patrimonial).toHaveAttribute("aria-expanded", "true");
  await expect(patrimonial).toBeFocused();
  const contracts = page.getByRole("button", {
    name: "Contratos Empresariais",
    exact: true,
  });
  const link = page.locator("footer a[href='#atuacao-contratos']");
  await link.click();
  await expect(contracts).toHaveAttribute("aria-expanded", "true");
  await expect(contracts).toBeFocused();
  await contracts.click();
  await expect(contracts).toHaveAttribute("aria-expanded", "false");
  await link.click();
  await expect(contracts).toHaveAttribute("aria-expanded", "true");
  await expect(contracts).toBeFocused();
});

test("profissionais preservam os registros oficiais dos PDFs", async ({
  page,
}) => {
  await page.goto("/");
  const professionals = page.locator("#profissionais");
  await expect(professionals).toContainText(/15\.?526[\s-]*B/);
  await expect(professionals).toContainText(/38\.?603/);
  await expect(professionals).toContainText(/503\.?494/);
  await expect(professionals).toContainText(/45\.?692/);
});

const strategyFlows = [
  {
    section: "#prevencao",
    label: "Caminho da assessoria preventiva",
    titles: ["Prevenção", "Orientação", "Estratégia", "Segurança"],
    descriptions: [
      /antecipar questões trabalhistas/,
      /apoiar gestores, RH e lideranças/,
      /cenário jurídico e de negócios/,
      /prevenção de passivos/,
    ],
  },
  {
    section: "#contencioso",
    label: "Fluxo do contencioso",
    titles: ["Entrada", "Gestão", "Estratégia", "Resultado"],
    descriptions: [
      /departamentos jurídicos/,
      /gestão de elevado volume processual/,
      /recursos e sustentações orais/,
      /Relatórios gerenciais e executivos/,
    ],
  },
] as const;

for (const flow of strategyFlows) {
  test("etapas acessíveis: " + flow.label, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const section = page.locator(flow.section);
    const tablist = section.getByRole("tablist", { name: flow.label });
    const tabs = tablist.getByRole("tab");
    await expect(tabs).toHaveCount(4);

    async function expectStep(index: number) {
      const current = tablist.getByRole("tab", {
        name: new RegExp(flow.titles[index]),
      });
      await expect(current).toHaveAttribute("aria-selected", "true");
      await expect(current).toHaveAttribute("tabindex", "0");
      await expect(tablist.locator('[aria-selected="true"]')).toHaveCount(1);
      await expect(tablist.locator('[tabindex="0"]')).toHaveCount(1);
      const panel = section.getByRole("tabpanel");
      await expect(panel).toHaveCount(1);
      await expect(panel).toContainText(flow.descriptions[index]);
      await expect(panel).toHaveAttribute(
        "aria-labelledby",
        (await current.getAttribute("id"))!,
      );
      return current;
    }

    const first = await expectStep(0);
    await first.focus();
    await page.keyboard.press("ArrowRight");
    await expect(await expectStep(1)).toBeFocused();
    await page.keyboard.press("End");
    await expect(await expectStep(3)).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(await expectStep(0)).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(await expectStep(3)).toBeFocused();
    await page.keyboard.press("Home");
    await expect(await expectStep(0)).toBeFocused();
    await tablist.getByRole("tab", { name: /Estratégia/ }).click();
    await expectStep(2);
    await expectNoHorizontalOverflow(page);
  });
}

test("trajetórias abrem por teclado, preservam biografia completa e mantêm a OAB visível", async ({
  page,
}) => {
  await page.goto("/");
  const professionals = [
    {
      name: /Flavio Augusto Boreggio Melara/,
      registration: /OAB\/SC 15526B/,
      excerpts: [/25 anos de experiência/, /Florianópolis e Santa Catarina/],
    },
    {
      name: /Rafaela Fernandes Fuhrmann/,
      registration: /OAB\/SC 38603.*OAB\/SP 503494/,
      excerpts: [/CEO do escritório/, /gestão de risco trabalhista/],
    },
    {
      name: /Franciele Karine Huinka/,
      registration: /OAB\/SC 45692/,
      excerpts: [
        /Direito Empresarial, Societário e Trabalhista Empresarial/,
        /crescimento sustentável dos negócios/,
      ],
    },
  ];

  for (const professional of professionals) {
    const article = page
      .locator("#profissionais")
      .getByRole("article", { name: professional.name });
    const details = article.locator("details");
    const summary = details.locator("summary");
    const biography = details.locator("div > p");
    const fullBiography = await biography.allTextContents();
    await expect(biography).toHaveCount(2);
    await expect(details).toHaveJSProperty("open", false);
    await expect(article).toContainText(professional.registration);

    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(details).toHaveJSProperty("open", true);
    for (let paragraph = 0; paragraph < 2; paragraph++) {
      await expect(biography.nth(paragraph)).toBeVisible();
      await expect(biography.nth(paragraph)).toContainText(
        professional.excerpts[paragraph],
      );
    }
    expect(await biography.allTextContents()).toEqual(fullBiography);
    await expect(article).toContainText(professional.registration);

    await page.keyboard.press("Enter");
    await expect(details).toHaveJSProperty("open", false);
    await expect(summary).toBeFocused();
    await expect(biography.first()).toBeHidden();
    await expect(article).toContainText(professional.registration);
    expect(await biography.allTextContents()).toEqual(fullBiography);
  }
});

test("contato expõe canais confirmados e links internos têm destino", async ({
  page,
}) => {
  await page.goto("/");
  const contact = page.locator("#contato");
  await expect(
    contact.locator('a[href="tel:+5548999424925"]').first(),
  ).toBeVisible();
  await expect(
    contact.locator('a[href="https://wa.me/5548999424925"]').first(),
  ).toBeVisible();
  await expect(
    page.locator('a[href="https://www.instagram.com/mfhadvempresa/"]').first(),
  ).toBeVisible();
  await expect(contact.locator("address")).toHaveCount(0);
  await expect(page.locator("footer address")).toContainText("Osmar Cunha");
  await expect(
    page.locator("footer").getByRole("link", { name: /Ver localização/ }),
  ).toHaveAttribute("href", /google\.com\/maps\/place\/Melara/);
  await expect(
    page.locator('a[href^="mailto:"], a[href*="linkedin.com"]'),
  ).toHaveCount(0);

  const missingTargets = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links.flatMap((link) => {
        const href = link.getAttribute("href") ?? "";
        return href.length > 1 && document.getElementById(href.slice(1))
          ? []
          : [href];
      }),
    );
  expect(missingTargets).toEqual([]);
  await expect(page.locator("body")).not.toContainText(
    /canal ainda não está disponível|projeto demonstrativo/i,
  );
});

test("metadados e ícones identificam somente MFH", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/MFH Advogados/i);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /empresarial|contencioso/i,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    /MFH/i,
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    /empresarial|contencioso/i,
  );
  expect(await page.locator("head").innerHTML()).not.toMatch(invalidContent);
  const icons = page.locator('link[rel="icon"], link[rel="apple-touch-icon"]');
  expect(await icons.count()).toBeGreaterThan(0);
  for (const icon of await icons.all()) {
    const href = await icon.getAttribute("href");
    expect(href).toBeTruthy();
    const response = await request.get(new URL(href!, page.url()).href);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toMatch(/^image\//);
  }
});

test("atalho de conteúdo e interações funcionam com movimento reduzido", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Ir para o conteúdo" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  const contracts = page.getByRole("button", {
    name: "Contratos Empresariais",
    exact: true,
  });
  await contracts.click();
  await expect(contracts).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("region", { name: "Contratos Empresariais", exact: true }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.locator("[data-reveal]").evaluateAll((elements) =>
        elements.every((element) => {
          const style = getComputedStyle(element);
          return style.opacity === "1" && style.animationName === "none";
        }),
      ),
    )
    .toBe(true);
  await expectNoHorizontalOverflow(page);
});

test("mudança para movimento reduzido revela imediatamente todo o conteúdo", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page.locator("[data-reveal]").evaluateAll((elements) =>
        elements.every((element) => {
          const style = getComputedStyle(element);
          return style.opacity === "1" && style.animationName === "none";
        }),
      ),
    )
    .toBe(true);
});

test("conteúdo, fotos e contato permanecem disponíveis sem JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 667 },
  });
  try {
    const page = await context.newPage();
    await page.goto(process.env.E2E_BASE_URL ?? "http://localhost:3100");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const id of [
      "escritorio",
      "contencioso",
      "profissionais",
      "contato",
    ]) {
      const section = page.locator("#" + id);
      await section.scrollIntoViewIfNeeded();
      await expect(section.getByRole("heading").first()).toBeVisible();
      expect(
        await section.evaluate((element) => getComputedStyle(element).opacity),
      ).toBe("1");
    }
    await expectImagesLoaded(page);
    await expect(
      page.locator('#contato a[href="tel:+5548999424925"]').first(),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);
  } finally {
    await context.close();
  }
});

test("hero compacto mantém o CTA inteiro visível em 320 por 480", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await page.goto("/");
  const action = page.locator("#inicio").getByRole("link", {
    name: "Falar com o escritório",
  });
  await expect(action).toBeInViewport({ ratio: 1 });
  const box = await action.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y + box!.height).toBeLessThanOrEqual(480);
  await expectNoHorizontalOverflow(page);
});

for (const width of [601, 640, 700]) {
  test(
    "etapas evitam colisão entre seta e próximo indicador em " + width + "px",
    async ({ page }) => {
      await page.setViewportSize({ width, height: 375 });
      await page.goto("/");
      const collisions = await page
        .locator(".strategy-flow__steps")
        .evaluateAll((groups) =>
          groups.flatMap((group) => {
            const buttons = [...group.querySelectorAll("button")];
            return buttons.slice(0, -1).flatMap((button, index) => {
              const arrow = button.querySelector("svg");
              const nextIndex = buttons[index + 1].querySelector(
                ".strategy-flow__index",
              );
              if (
                !arrow ||
                !nextIndex ||
                getComputedStyle(arrow).display === "none"
              ) {
                return [];
              }
              const a = arrow.getBoundingClientRect();
              const b = nextIndex.getBoundingClientRect();
              const overlapX =
                Math.min(a.right, b.right) - Math.max(a.left, b.left);
              const overlapY =
                Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
              return overlapX > 0 && overlapY > 0
                ? [
                    {
                      flow: group.getAttribute("aria-label"),
                      step: index + 1,
                      overlapX,
                    },
                  ]
                : [];
            });
          }),
        );
      expect(collisions).toEqual([]);
      await expectNoHorizontalOverflow(page);
    },
  );
}

test("títulos mantêm palavras separadas ao adaptar quebras de linha no mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  const title = await page.locator("#practice-title").innerText();
  expect(title.replace(/\s+/g, " ")).toContain("dia a dia da sua empresa");
});

test("títulos fora da viewport permanecem legíveis enquanto aguardam animação", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect
    .poll(() => page.locator('h2[data-reveal-state="pending"]').count())
    .toBeGreaterThan(0);
  const unreadable = await page
    .locator('h2[data-reveal-state="pending"]')
    .evaluateAll((headings) =>
      headings.flatMap((heading) => {
        const style = getComputedStyle(heading);
        const rect = heading.getBoundingClientRect();
        return Number.parseFloat(style.opacity) < 0.8 ||
          style.visibility !== "visible" ||
          rect.width === 0 ||
          rect.height === 0
          ? [
              {
                id: heading.id,
                opacity: style.opacity,
                visibility: style.visibility,
              },
            ]
          : [];
      }),
    );
  expect(unreadable).toEqual([]);
});

for (const width of [640, 768, 1280, 1440]) {
  test(
    "CTAs dos profissionais da mesma linha mantêm alinhamento em " +
      width +
      "px",
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      const rows = await page
        .locator(".professional")
        .evaluateAll((articles) => {
          const groups: { top: number; actions: number[] }[] = [];
          for (const article of articles) {
            const top = article.getBoundingClientRect().top;
            const action = article.querySelector("summary")!;
            const row = groups.find((group) => Math.abs(group.top - top) <= 2);
            if (row) row.actions.push(action.getBoundingClientRect().top);
            else
              groups.push({
                top,
                actions: [action.getBoundingClientRect().top],
              });
          }
          return groups;
        });
      expect(rows.flatMap((row) => row.actions)).toHaveLength(3);
      expect(rows.some((row) => row.actions.length > 1)).toBe(true);
      for (const row of rows) {
        expect(
          Math.max(...row.actions) - Math.min(...row.actions),
        ).toBeLessThanOrEqual(2);
      }
    },
  );
}

for (const viewport of [
  { width: 320, height: 480 },
  { width: 390, height: 844 },
  { width: 640, height: 360 },
]) {
  test(
    "WhatsApp flutuante acessível, sem sobreposição e atrás do Sheet em " +
      viewport.width +
      " por " +
      viewport.height,
    async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/");
      const floating = page.getByRole("link", {
        name: "Falar com o escritório pelo WhatsApp (abre em nova aba)",
        exact: true,
      });
      await expect(floating).toHaveAttribute(
        "href",
        "https://wa.me/5548999424925",
      );
      await expect(floating).toHaveAttribute("target", "_blank");
      await expect(floating).toHaveAttribute("rel", /noopener/);
      await expect(floating).toHaveCSS("position", "fixed");
      await expect(floating).toHaveCSS("background-color", "rgb(10, 10, 10)");
      await expect(floating.locator("svg")).toHaveCSS(
        "fill",
        "rgb(255, 255, 255)",
      );
      await expect(floating).toBeInViewport({ ratio: 1 });
      const beforeScroll = await floating.boundingBox();
      expect(beforeScroll).not.toBeNull();
      expect(beforeScroll!.width).toBeGreaterThanOrEqual(52);
      expect(beforeScroll!.height).toBeGreaterThanOrEqual(52);

      const heroAction = await page.locator("#inicio .button").boundingBox();
      expect(heroAction).not.toBeNull();
      const overlapX =
        Math.min(
          beforeScroll!.x + beforeScroll!.width,
          heroAction!.x + heroAction!.width,
        ) - Math.max(beforeScroll!.x, heroAction!.x);
      const overlapY =
        Math.min(
          beforeScroll!.y + beforeScroll!.height,
          heroAction!.y + heroAction!.height,
        ) - Math.max(beforeScroll!.y, heroAction!.y);
      expect(overlapX > 0 && overlapY > 0).toBe(false);

      await page.evaluate(() =>
        window.scrollTo({ top: 200, behavior: "instant" }),
      );
      const afterScroll = await floating.boundingBox();
      expect(afterScroll!.x).toBeCloseTo(beforeScroll!.x, 0);
      expect(afterScroll!.y).toBeCloseTo(beforeScroll!.y, 0);
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await expect(
        page.getByRole("dialog", { name: "Navegação principal" }),
      ).toBeVisible();
      const coveredByMenu = await page.evaluate(
        ({ x, y }) => {
          const element = document.elementFromPoint(x, y);
          return Boolean(
            element?.closest('.mobile-menu, [data-slot="sheet-overlay"]'),
          );
        },
        {
          x: beforeScroll!.x + beforeScroll!.width / 2,
          y: beforeScroll!.y + beforeScroll!.height / 2,
        },
      );
      expect(coveredByMenu).toBe(true);
      await page.keyboard.press("Escape");
      await expect(floating).toBeInViewport({ ratio: 1 });
      expect(errors).toEqual([]);
    },
  );
}
