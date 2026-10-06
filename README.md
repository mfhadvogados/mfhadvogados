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
- `lib/reviews.ts`: cinco avaliações do Google e respectivas fotos fornecidas em `feedbacks/`.
- `components/site/Reviews.tsx`: carrossel responsivo com cards uniformes e leitura completa em diálogo.
- `lib/site-url.ts`: domínio configurável; sem endereço presumido.
- `scripts/prepare-brand-assets.mjs`: reprodução dos ícones e imagem Open Graph a partir dos PNGs oficiais e da fotografia hero. Execute `npm run assets:branding`.
- `docs/auditoria.md`: fontes, direção visual, decisões e validação.
- `docs/revisao-apresentacao.md`: conferência final dos PDFs e revisão para apresentação ao cliente.

Homepage: hero → duas frentes → escritório e equipe → assessoria e áreas → prevenção → contencioso → diferenciais → sócios → contato → avaliações → rodapé.

A revisão passou em 44 testes de browser, incluindo dez larguras de 320 a 1920 px, telas baixas, alinhamento de CTAs, legibilidade, menu lateral, fluxos por teclado, WhatsApp flutuante e carrossel de avaliações. Os cinco diálogos de leitura completa foram conferidos em 320×480 px; os controles do carrossel reservam espaço para o botão flutuante.

## Materiais oficiais

Os dois PDFs da raiz são as fontes institucionais. A pasta `materialGraficoMFH/` contém os arquivos originais preservados. Nenhum arquivo `reserva*` é utilizado, importado ou publicado.

Montserrat Light, Regular, Medium, SemiBold e Bold foram identificadas nos PDFs. A fonte variável já instalada pelo Fontsource é carregada pelo `next/font/local`, sem consultas externas. Fotografias usam `next/image`, dimensões estáveis, tamanhos responsivos e carregamento prioritário no hero.

Não há formulário nem coleta de dados no site. WhatsApp, telefone e Instagram são links diretos baseados nos PDFs; os links de Google e Maps foram fornecidos pelo responsável pelo site. Endereço e localização aparecem no rodapé. As biografias são expansíveis com `details`; as áreas e os dois fluxos possuem controle por teclado. O movimento respeita `prefers-reduced-motion`.

As cinco avaliações de `feedbacks/feedbacksTexto.txt` são reproduzidas com as fotos correspondentes de `feedbacks/imgFeedback/`. As notas de cinco estrelas foram informadas pelo responsável pelo site. O carrossel usa rolagem nativa, setas, teclado e deslize, sem autoplay nem dependência adicional. Cards têm altura uniforme; “Ler mais” aparece quando o texto excede o espaço disponível e abre um diálogo com a avaliação completa. Sem JavaScript, o texto permanece integralmente disponível. A seção não calcula nem anuncia uma nota média do escritório.

## Domínio para publicação

Copie `.env.example` para `.env.local` e preencha `SITE_URL` com a URL oficial confirmada antes do build publicado. Isso configura canonical, `metadataBase`, URLs sociais, sitemap e URL nos dados estruturados. Sem esse dado, canonical e URL institucional são omitidos; sitemap permanece vazio e Next usa localhost para a imagem social durante o desenvolvimento.

Os materiais não informam e-mail, LinkedIn ou horários de atendimento. Esses dados não foram acrescentados.

## Publicar na Vercel

O `vercel.json` da raiz configura o framework `nextjs`, o comando `npm run build` e a saída `.next`. Essas propriedades substituem os respectivos valores do painel para o deploy, evitando a procura incorreta por uma pasta de saída `public`. A configuração segue a [documentação oficial da Vercel](https://vercel.com/docs/project-configuration/vercel-json).

No projeto da Vercel, mantenha Root Directory na raiz do repositório, onde está `package.json`. Em Settings → Build and Deployment, selecione Next.js e remova o override de Output Directory `public`, usando o padrão do framework. Cadastre `SITE_URL` nas variáveis do ambiente publicado com a URL oficial confirmada.

Faça commit e push de `vercel.json` e das alterações para a branch conectada. O novo deploy precisa usar esse commit; redeploy de um commit anterior não inclui a correção. A pasta `.next` é gerada no build e permanece fora do Git.
