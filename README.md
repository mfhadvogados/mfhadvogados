# MFH Advogados

Site institucional de Melara, Fuhrmann & Huinka Advogados Associados. Assessoria jurídica empresarial e contencioso estratégico e de massa, com atuação em Florianópolis, Santa Catarina, desde 2006.

## Executar

Requer Node.js 20.9 ou superior. A base mantém Next.js 16.3.5, React 19, TypeScript e o gerenciador npm.

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

`npm start` serve o build de produção. O runner E2E inicia produção isoladamente na porta 3100 e encerra somente seus próprios processos. Para testar um servidor existente, configure `E2E_BASE_URL`. O Playwright utiliza o Chrome instalado no Windows; `CHROME_PATH` permite indicar outro executável. As capturas ficam em `test-results/`.

## Estrutura

- `app/page.tsx`: narrativa institucional e dados estruturados `LegalService`.
- `app/layout.tsx`: Montserrat local, idioma, metadados Open Graph e Twitter.
- `app/globals.css`: tokens MFH, seções, responsividade e movimentos discretos.
- `components/site/`: header, footer, marca oficial, fotografias, seções e interações. `chrome.css` concentra navegação e contatos.
- `components/ui/sheet.tsx`: Sheet shadcn/ui com Radix, foco, Escape e bloqueio da rolagem.
- `lib/site-content.ts`: conteúdo oficial, profissionais, inscrições e contatos.
- `lib/site-assets.ts`: somente as cinco fotografias identificadas do MFH.
- `lib/site-url.ts`: domínio configurável; sem endereço presumido.
- `scripts/prepare-brand-assets.mjs`: reprodução dos ícones e imagem Open Graph a partir dos PNGs oficiais e da fotografia hero. Execute `npm run assets:branding`.
- `docs/auditoria.md`: fontes, direção visual, decisões e validação.

Homepage: hero → duas frentes → escritório e equipe → assessoria e áreas → prevenção → contencioso → diferenciais → sócios → contato → rodapé.

A revisão final passou em 36 testes de browser, incluindo dez larguras de 320 a 1920 px, telas baixas, alinhamento de CTAs, legibilidade, menu lateral, fluxos por teclado e WhatsApp flutuante nas cores da identidade.

## Materiais oficiais

Os dois PDFs da raiz são as fontes institucionais. A pasta `materialGraficoMFH/` contém os arquivos originais preservados. Nenhum arquivo `reserva*` é utilizado, importado ou publicado.

Montserrat Light, Regular, Medium, SemiBold e Bold foram identificadas nos PDFs. A fonte variável já instalada pelo Fontsource é carregada pelo `next/font/local`, sem consultas externas. Fotografias usam `next/image`, dimensões estáveis, tamanhos responsivos e carregamento prioritário no hero.

Não há formulário nem coleta de dados no site. WhatsApp, telefone, Instagram e localização são links diretos baseados nos PDFs. As biografias são expansíveis com `details`; as áreas e os dois fluxos possuem controle por teclado. O movimento respeita `prefers-reduced-motion`.

## Domínio para publicação

Copie `.env.example` para `.env.local` e preencha `SITE_URL` com a URL oficial confirmada antes do build publicado. Isso configura canonical, `metadataBase`, URLs sociais, sitemap e URL nos dados estruturados. Sem esse dado, canonical e URL institucional são omitidos; sitemap permanece vazio e Next usa localhost para a imagem social durante o desenvolvimento.

Os materiais não informam e-mail, LinkedIn ou horários de atendimento. Esses dados não foram acrescentados. A publicação em hospedagem não faz parte desta implementação.
