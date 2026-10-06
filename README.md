# MFH Advogados

Site institucional de Melara, Fuhrmann & Huinka Advogados Associados. Assessoria jurídica empresarial e contencioso estratégico e de massa, com atuação em Florianópolis, Santa Catarina, desde 2006.

O domínio oficial é `https://www.mfhadvogados.com.br`. A homepage mantém a apresentação institucional e conta com duas páginas dedicadas às frentes de atuação, que reutilizam os textos dos materiais oficiais:

- `/assessoria-juridica-empresarial`
- `/contencioso-estrategico-de-massa`

## Executar e verificar

Requer Node.js 20.9 ou superior. A base utiliza Next.js 16.3.5, React 19, TypeScript, Tailwind 4 e npm.

```sh
npm install
npm run dev
```

Servidor local: `http://localhost:3000`. `npm run dev:3001` utiliza a porta 3001.

```sh
npm run lint
npm run format:check
npm run build
npm run test:e2e
```

`npm start` serve o build de produção. O runner E2E inicia produção isoladamente na porta 3100 e encerra somente seus próprios processos. Para testar um servidor existente, configure `E2E_BASE_URL`. O Playwright utiliza o Chrome instalado no Windows; `CHROME_PATH` permite indicar outro executável.

A validação da entrega passou em 63 testes de navegador, cobrindo conteúdo, responsividade, teclado, menu, avaliações e SEO das três páginas. Build, lint e formatação também passaram. Os resultados estão registrados em [docs/seo-audit.md](docs/seo-audit.md). `test-results/` e as capturas de auditoria são saídas temporárias, excluídas do Git e da publicação.

## Organização

- `app/page.tsx`: apresentação institucional completa.
- `app/assessoria-juridica-empresarial/` e `app/contencioso-estrategico-de-massa/`: rotas dedicadas às duas frentes existentes.
- `app/layout.tsx`: Montserrat local, idioma, metadados gerais e verificação opcional do Search Console.
- `app/robots.ts` e `app/sitemap.ts`: instruções de rastreamento e as três URLs oficiais.
- `components/site/`: navegação, marca, seções, avaliações e contatos. `ServicePage.tsx` compõe as páginas de serviços; `StructuredData.tsx` publica os dados estruturados compartilhados.
- `components/ui/sheet.tsx`: menu lateral com Radix, foco, Escape e bloqueio da rolagem.
- `app/globals.css`, `components/site/chrome.css`, `reviews.css` e `service-page.css`: identidade visual, navegação, carrossel e páginas de serviços.
- `lib/site-content.ts`: textos oficiais, profissionais, inscrições e contatos. A mensagem inicial do WhatsApp e seu link estão centralizados nesse arquivo.
- `lib/site-assets.ts`: as cinco fotografias identificadas do MFH.
- `lib/reviews.ts`: dez avaliações e respectivas fotos fornecidas em `feedbacks/`.
- `lib/site-url.ts`: domínio oficial fixo e construção de URLs absolutas, sem variável `SITE_URL`.
- `lib/service-pages.ts`: identificação, URLs e metadados das duas frentes.
- `lib/seo.ts`: canonical, Open Graph, Twitter e entidades `LegalService`, `WebSite`, `WebPage`, `Service`, `Person` e breadcrumbs, conforme a página.
- `scripts/prepare-brand-assets.mjs`: regeneração dos ícones, imagem social e logo pública com Sharp. Execute `npm run assets:branding`.

Homepage: hero → duas frentes → escritório e equipe → assessoria e áreas → prevenção → contencioso → diferenciais → sócios → contato → avaliações → rodapé.

## Conteúdo e identidade

Os dois PDFs da raiz são as fontes institucionais. A pasta `materialGraficoMFH/` preserva os arquivos originais. Nenhum arquivo `reserva*` é utilizado, importado ou publicado. A conferência das 12 páginas, dos contatos e das inscrições profissionais está documentada em [docs/auditoria.md](docs/auditoria.md) e [docs/revisao-apresentacao.md](docs/revisao-apresentacao.md).

Montserrat Light, Regular, Medium, SemiBold e Bold foram identificadas nos PDFs. A fonte variável do Fontsource é carregada por `next/font/local`, sem consultas externas. Fotografias usam `next/image`, dimensões estáveis e tamanhos responsivos; o hero possui carregamento prioritário.

A imagem Open Graph de 1200×630 usa a assinatura oficial preta centralizada sobre fundo branco. Os ícones e `public/marca/mfh-advogados-logo-preta.png` também derivam dos PNGs oficiais. Os originais são preservados durante a geração.

Não há formulário. WhatsApp, telefone e Instagram são links diretos baseados nos PDFs; Google e Maps foram fornecidos pelo responsável pelo site. Todos os links de WhatsApp utilizam a mesma mensagem inicial. Endereço e localização aparecem no rodapé. Os materiais não informam e-mail, LinkedIn ou horários de atendimento; esses dados não foram acrescentados.

As dez avaliações de `feedbacks/feedbacksTexto.txt` são reproduzidas com as fotos correspondentes de `feedbacks/imgFeedback/`. As notas de cinco estrelas foram informadas pelo responsável. O carrossel utiliza rolagem nativa, setas, teclado e deslize. Cards têm altura uniforme; “Ler mais” abre um diálogo acessível quando o texto excede o espaço disponível. Sem JavaScript, o texto completo permanece disponível. Não é calculada nem anunciada uma nota média do escritório.

As biografias usam `details`; áreas e fluxos possuem navegação por teclado. O movimento respeita `prefers-reduced-motion`.

## SEO e Search Console

O domínio confirmado em `lib/site-url.ts` define canonical, `metadataBase`, URLs sociais, sitemap e dados estruturados. As páginas têm metadados próprios e links internos entre as duas frentes e a homepage. O grafo reutiliza somente dados comprovados pelos materiais; não declara nota média, preços, horários ou resultados profissionais.

`.env.example` contém apenas `GOOGLE_SITE_VERIFICATION`, opcional para verificação HTML de uma propriedade por prefixo de URL no Search Console. Se utilizar esse método, copie o arquivo para `.env.local` e preencha o token. A propriedade de domínio utiliza verificação por DNS, fora do código. Nenhuma variável de domínio é necessária para executar ou publicar o site.

O diagnóstico técnico e as evidências da entrega estão em [docs/seo-audit.md](docs/seo-audit.md). O plano de conteúdo, autoridade e acompanhamento está em [docs/seo-roadmap.md](docs/seo-roadmap.md).

## Publicar na Vercel

`vercel.json` configura o framework `nextjs`, o comando `npm run build` e a saída `.next`. No painel da Vercel, mantenha Root Directory na raiz do repositório, onde está `package.json`, e utilize a configuração de Next.js. Um override de Output Directory apontando para `public` deve ser removido.

Publique um commit que inclua as alterações; um redeploy de commit anterior utiliza a configuração anterior. `.next` é gerada pelo build e permanece fora do Git. Se optar pela verificação HTML do Search Console, cadastre `GOOGLE_SITE_VERIFICATION` no ambiente publicado antes do build.
