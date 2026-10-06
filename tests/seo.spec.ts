import { readFileSync } from "node:fs";
import sharp from "sharp";
import { expect, test } from "@playwright/test";
import {
  site,
  institutionalCopy,
  practiceAreas,
  litigationSteps,
  preventionSteps,
} from "../lib/site-content";
import { servicePages } from "../lib/service-pages";

const origin = "https://www.mfhadvogados.com.br";
const pages = [
  {
    path: "/",
    title: "Advocacia empresarial em Florianópolis | MFH Advogados",
  },
  ...Object.values(servicePages),
];

test("os 119 blocos institucionais permanecem iguais à versão anterior", async ({
  page,
}) => {
  const original = JSON.parse(
    readFileSync("tests/fixtures/institutional-copy.json", "utf8"),
  );
  await page.goto("/");
  const current = await page.evaluate(
    (ids) =>
      Object.fromEntries(
        ids.map((id) => [
          id,
          [
            ...document
              .querySelector("#" + id)!
              .querySelectorAll("h1,h2,h3,p,li,figcaption"),
          ].map((element) => element.textContent!.replace(/\s+/g, " ").trim()),
        ]),
      ),
    Object.keys(original),
  );
  expect(current).toEqual(original);
});

test("sitemap e robots usam apenas as três URLs canônicas existentes", async ({
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(sitemap.headers()["content-type"]).toContain("xml");
  const xml = await sitemap.text();
  expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  expect(urls).toEqual(pages.map(({ path }) => new URL(path, origin).href));
  expect(
    urls.some((url) => url.includes("#") || url.includes("localhost")),
  ).toBe(false);
  for (const { path } of pages)
    expect((await request.get(path)).status()).toBe(200);
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${origin}/sitemap.xml`);
  expect(await robots.text()).toContain("Allow: /");
  expect((await request.get("/pagina-que-nao-existe")).status()).toBe(404);
});

for (const route of pages) {
  test(`SEO renderizado: ${route.path}`, async ({ page, request }) => {
    await page.goto(route.path);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page).toHaveTitle(route.title);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    expect(
      new URL(
        (await page.locator('link[rel="canonical"]').getAttribute("href"))!,
      ).href,
    ).toBe(new URL(route.path, origin).href);
    expect(
      new URL(
        (await page
          .locator('meta[property="og:url"]')
          .getAttribute("content"))!,
      ).href,
    ).toBe(new URL(route.path, origin).href);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Florianópolis/,
    );
    await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute(
      "content",
      /noindex/,
    );

    const graph = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) =>
        scripts.flatMap((script) => JSON.parse(script.textContent!)["@graph"]),
      );
    const business = graph.find((node) => node["@type"] === "LegalService");
    expect(business).toMatchObject({
      name: site.fullName,
      url: origin + "/",
      telephone: "+5548999424925",
      hasMap: site.mapsHref,
      address: {
        streetAddress: site.address,
        addressLocality: "Florianópolis",
        addressRegion: "SC",
        postalCode: site.postalCode,
        addressCountry: "BR",
      },
      areaServed: { name: "Santa Catarina" },
    });
    expect(
      graph.some((node) =>
        ["Review", "AggregateRating"].includes(node["@type"]),
      ),
    ).toBe(false);
    expect(JSON.stringify(graph)).not.toMatch(
      /aggregateRating|openingHours|priceRange/,
    );
    expect(graph.find((node) => node["@type"] === "WebPage").url).toBe(
      new URL(route.path, origin).href,
    );
    const people = graph.filter((node) => node["@type"] === "Person");
    if (route.path === "/") {
      expect(people).toHaveLength(3);
      expect(people.map((person) => person.identifier)).toEqual([
        "OAB/SC 15526B",
        "OAB/SC 38603 · OAB/SP 503494",
        "OAB/SC 45692",
      ]);
    } else {
      expect(people).toHaveLength(0);
      const breadcrumbs = graph.find(
        (node) => node["@type"] === "BreadcrumbList",
      ).itemListElement;
      expect(breadcrumbs.map((item: { item: string }) => item.item)).toEqual([
        origin + "/",
        new URL(route.path, origin).href,
      ]);
      expect(graph.filter((node) => node["@type"] === "Service")).toHaveLength(
        1,
      );
    }
    expect(Boolean(business.hasOfferCatalog)).toBe(
      route.path !== servicePages.litigation.path,
    );

    const image = new URL(
      (await page
        .locator('meta[property="og:image"]')
        .getAttribute("content"))!,
    );
    expect(image.origin).toBe(origin);
    expect(image.pathname).toBe("/opengraph-image.png");
    const response = await request.get(image.pathname + image.search);
    expect(response.status()).toBe(200);
    const data = await response.body();
    const metadata = await sharp(data).metadata();
    expect([metadata.width, metadata.height]).toEqual([1200, 630]);
    const corners = await sharp(data)
      .extract({ left: 0, top: 0, width: 24, height: 24 })
      .removeAlpha()
      .raw()
      .toBuffer();
    expect([...corners].every((channel) => channel === 255)).toBe(true);
    expect(
      (await request.get("/marca/mfh-advogados-logo-preta.png")).status(),
    ).toBe(200);
  });
}

test("links para WhatsApp levam a mesma mensagem preenchida em todas as páginas", async ({
  page,
}) => {
  for (const { path } of pages) {
    await page.goto(path);
    const links = page.locator('a[href^="https://wa.me/"]');
    expect(await links.count()).toBeGreaterThanOrEqual(2);
    for (const link of await links.all()) {
      const url = new URL((await link.getAttribute("href"))!);
      expect(url.pathname).toBe("/5548999424925");
      expect(url.searchParams.get("text")).toBe(
        "Olá! Gostaria de agendar um atendimento com o escritório MFH Advogados.",
      );
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  }
});

for (const width of [320, 390, 768, 1440]) {
  for (const service of Object.values(servicePages)) {
    test(`página de serviço sem transbordamento e com links válidos: ${width}px ${service.path}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(service.path);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        service.name,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
      ).toBeLessThanOrEqual(1);
      await expect(page.locator(".site-header__brand")).toHaveAttribute(
        "href",
        "/#inicio",
      );
      for (const link of await page
        .locator(".desktop-nav a,.site-footer__practice a")
        .all()) {
        expect(await link.getAttribute("href")).toMatch(/^\/#/);
      }
      const other =
        service.path === servicePages.business.path
          ? servicePages.litigation
          : servicePages.business;
      await expect(page.locator(".service-page__related a")).toHaveAttribute(
        "href",
        other.path,
      );
    });
  }
}

test("páginas de serviço entregam todos os textos existentes sem JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(new URL(servicePages.business.path, baseURL).href);
    for (const paragraph of institutionalCopy.practice)
      await expect(page.getByRole("main")).toContainText(paragraph);
    for (const area of practiceAreas) {
      await expect(page.getByRole("main")).toContainText(area.description);
      for (const detail of area.details)
        await expect(page.getByRole("main")).toContainText(detail);
    }
    for (const step of preventionSteps)
      await expect(page.getByRole("main")).toContainText(step.description);
    await page.goto(new URL(servicePages.litigation.path, baseURL).href);
    for (const paragraph of institutionalCopy.litigation.paragraphs)
      await expect(page.getByRole("main")).toContainText(paragraph);
    for (const step of litigationSteps)
      await expect(page.getByRole("main")).toContainText(step.description);
  } finally {
    await context.close();
  }
});

test("menu da página de serviço navega para a seção real da homepage", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(servicePages.business.path);
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const menu = page.getByRole("dialog");
  await menu.getByRole("link", { name: "Profissionais", exact: true }).click();
  await expect(page).toHaveURL(/\/#profissionais$/);
  await expect(menu).toBeHidden();
  await expect(page.locator("#profissionais")).toBeInViewport();
});

test("domínio sem www redireciona preservando o caminho e a consulta", async ({
  request,
}) => {
  const response = await request.get(
    servicePages.business.path + "?origem=teste",
    { headers: { host: "mfhadvogados.com.br" }, maxRedirects: 0 },
  );
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe(
    origin + servicePages.business.path + "?origem=teste",
  );
});
