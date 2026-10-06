# Auditoria e direção visual — MFH Advogados

Registro da implementação e das revisões visuais anteriores, realizadas em 6 de outubro de 2026. As contagens de testes nas seções históricas descrevem aquelas revisões. A atualização posterior de SEO, domínio e avaliações está descrita ao final; a auditoria técnica atual está em [seo-audit.md](./seo-audit.md).

## Análise antes da implementação

A base foi examinada integralmente: App Router Next.js 16.3.5, React 19.2, TypeScript estrito, Tailwind 4, shadcn/ui com Radix Dialog, Lucide e Playwright. A aplicação tinha uma única rota institucional, dados de demonstração, estilos de outra identidade e imports de imagens inexistentes. Framework, versões, lockfile, lint, scripts de build e Sheet foram preservados. A skill `.agents/skills/frontend-design/SKILL.md` foi lida integralmente, junto aos guias locais de imagens, fontes, Server/Client Components e metadados em `node_modules/next/dist/docs/`.

Os dois PDFs oficiais têm seis páginas cada. Todas as 12 páginas foram examinadas visualmente, além de extração de texto, fontes e cores. As fotografias identificadas e todas as seis versões de logo foram conferidas. Os nove arquivos de reserva não foram usados e permanecem intactos.

## Fontes de conteúdo

| Material                     | Páginas | Aplicação                                                                                                                        |
| ---------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Apresentação empresarial MFH | 1–2     | Assessoria empresarial, desde 2006, Florianópolis, propósito e equipe                                                            |
| Apresentação empresarial MFH | 3       | Nomes, inscrições e currículos dos sócios                                                                                        |
| Apresentação empresarial MFH | 4–6     | Áreas, suporte a RH/gestores, contratos, consultoria, treinamentos, defesa, riscos e contato                                     |
| Apresentação empresarial MFH | 5       | Prevenção → Orientação → Estratégia → Segurança                                                                                  |
| Portfólio de contencioso MFH | 1–2     | Posicionamento empresarial e extensão do departamento jurídico                                                                   |
| Portfólio de contencioso MFH | 3       | Conferência dos mesmos dados dos sócios                                                                                          |
| Portfólio de contencioso MFH | 4–6     | Volume processual, prazos, padronização, relatórios, audiências, recursos, sustentação oral, correspondência e grandes operações |
| Portfólio de contencioso MFH | 4       | Entrada → Gestão → Estratégia → Resultado                                                                                        |
| Portfólio de contencioso MFH | 5       | Visão empresarial, eficiência, tecnologia, atuação regional e atendimento personalizado                                          |

Textos foram reorganizados para leitura na web, preservando fatos. Objetos textuais ocultos na capa empresarial e uma frase incompleta da página 5 foram excluídos da adaptação. Nenhum cliente, case, prêmio, certificação, estatística de resultado ou área de atuação foi criado.

Inscrições conferidas na página 3 de ambos: Flavio Augusto Boreggio Melara, OAB/SC 15526B; Rafaela Fernandes Fuhrmann, OAB/SC 38603 e OAB/SP 503494; Franciele Karine Huinka, OAB/SC 45692. Informações de experiência em anos permanecem conforme os currículos dos materiais, sem extrapolação automática.

Telefone/WhatsApp `(48) 99942-4925`, Instagram `@mfhadvempresa` e endereço Av. Prefeito Osmar Cunha, 183, Bloco B, sala 806, Florianópolis/SC, CEP 88015-900 foram confirmados na página 6. Os PDFs não informam domínio, e-mail, LinkedIn ou horário de funcionamento. O responsável confirmou posteriormente o domínio `https://www.mfhadvogados.com.br`.

## Plano visual e revisão do plano

Tokens: branco `#ffffff`; preto `#0a0a0a`; grafite `#333333`; cinza de leitura `#535353`; superfície neutra `#f5f5f4`; dourado `#bc9f6c`. O cinza de leitura aprofunda o `#666666` identificado nos PDFs para melhorar contraste. `#80683f` é uma variante mais escura do detalhe dourado para legibilidade em fundos claros.

Tipografia: exclusivamente Montserrat, identificada nas fontes incorporadas dos PDFs. Light nos títulos; Regular nos textos; Medium/SemiBold nos elementos de navegação. O arquivo variável Latin já instalado fornece os caracteres portugueses e todos os pesos necessários via `next/font/local`, com preload e font-display swap.

Layout: títulos alinhados à esquerda, fotografia da Ponte Hercílio Luz em largura total, apresentação institucional em duas colunas e equipe ampla, serviços em lista expansível, alternância de superfícies brancas e pretas, contencioso com escala própria e sócios em três colunas no desktop. O grid se reorganiza em telas pequenas. A numeração aparece apenas nos dois processos sequenciais reais dos PDFs.

O plano foi confrontado com a skill: retirados ondas, cores herdadas, métricas decorativas, muro de cards, carrosséis desnecessários e animações em toda a página. A memorabilidade se concentra na fotografia regional e na tipografia leve do hero. As pequenas linhas douradas, os recortes diagonais e a marca d’água respondem especificamente à identidade dos PDFs.

## Arquivos gráficos utilizados

- `fotohero.jpg`: fundo do hero, preservando a fotografia regional.
- `fotoEquipe.jpeg`: imagem institucional ampla.
- `flavioAugusto.jpeg`, `rafaelaFernandes.jpeg`, `francieleKarine.jpeg`: retratos correspondentes, conferidos com os PDFs.
- `logo-v1-preto@3x.png`: assinatura completa no header, imagem social sobre fundo branco e logo pública.
- `logo-v2-preto@3x.png`: monograma em fundo claro e ícones de navegador.
- `logo-v2-branco@3x.png`: menu, rodapé e marca d’água em fundo escuro.

Brand usa SVG como janela de enquadramento do PNG oficial, removendo apenas o canvas transparente, com proporções preservadas. Não recria o desenho da marca. Ícones 192×192 e 180×180, Open Graph 1200×630 e `public/marca/mfh-advogados-logo-preta.png` são derivados de modo reprodutível com Sharp. A imagem social atual usa a assinatura preta centralizada sobre fundo branco. Os originais não foram alterados.

## Interações, acessibilidade e desempenho

Sheet lateral com foco restrito, bloqueio de rolagem, Escape, restauração de foco e navegação para títulos abaixo do header. Áreas com `aria-expanded`, regiões nomeadas, foco por setas/Home/End e abertura por hash. Fluxos em abas com navegação por teclado e descrições associadas. Biografias com `details/summary` nativo, também funcionando sem JavaScript. Sem autoplay, scroll hijacking ou biblioteca nova de animação.

HTML semântico, um H1, headings funcionais, link de salto, foco visível, textos alternativos nas fotos e SVGs reconhecíveis de WhatsApp e Instagram. Revelações discretas por IntersectionObserver apenas em títulos e imagem de equipe; conteúdo é visível sem JavaScript e com movimento reduzido. Imagens abaixo da dobra usam lazy loading e `sizes`; hero usa `preload` da API Next 16. Componentes estáticos permanecem no servidor.

SEO da implementação inicial: título, descrição, idioma pt-BR, Open Graph, Twitter, imagem social, ícones oficiais, robots e dados estruturados `LegalService`. Na atualização posterior, o domínio confirmado foi fixado em `lib/site-url.ts`; canonical, URLs absolutas e sitemap passaram a utilizar `https://www.mfhadvogados.com.br`, sem variável `SITE_URL`.

## Limpeza

Substituídos dados, conteúdo, metadados, cores e estilos da base. Removidos WaveLines e seus estilos, CSS de interações e revelações substituído, logo pública antiga, nomes antigos em package/lock e documentação desatualizada. Helpers genéricos, Sheet, controle acessível das áreas e observador de revelação foram reaproveitados. Nenhuma rota com conteúdo institucional antigo permanece. PDFs, fotos, logos, skills e histórico Git foram preservados.

## Validação histórica da implementação visual

Lint, verificação de formatação e build de produção concluíram. Os 36 testes MFH passaram no Chrome em 36,4 segundos, sem erros de console ou HTTP. A suíte contempla todas as larguras solicitadas: 320, 360, 375, 390, 414, 768, 1024, 1280, 1440 e 1920 px. Foram conferidas também capturas de desktop, tablet e smartphones, incluindo hero, equipe, contencioso, sócios, contato, rodapé e Sheet. Testes utilizam Chrome no Windows; não substituem teste em Safari ou aparelhos físicos.

A segunda revisão incluiu alturas de 360 e 480 px e larguras intermediárias de 601, 640 e 700 px. Corrigiu quebra de título que concatenava palavras, colisões entre setas e etapas, excesso de altura do hero, microtipografia e a cascata que mantinha uma marca decorativa no mobile. Textos de leitura possuem 14–15 px no celular, informações secundárias pelo menos 12 px e títulos permanecem Light. Revelações começam com opacidade 0,8; nenhum conteúdo fica invisível aguardando rolagem. Os CTAs dos profissionais foram alinhados por linha em 640, 768, 1280 e 1440 px.

O WhatsApp flutuante usa o glifo da marca em SVG local, branco sobre preto, detalhe dourado em hover/foco e destino oficial confirmado. Mede 52–56 px, respeita a área de segurança do dispositivo e fica atrás do Sheet. Testes comprovam que não cobre o CTA do hero em 320×480, 390×844 e 640×360; a margem do rodapé preserva a leitura dos textos finais. Os SVGs sociais são incorporados ao código, sem requisições externas; a geometria do Instagram foi conferida no repositório Simple Icons.

## Histórico das primeiras avaliações e ajustes visuais

Na primeira implementação das avaliações, os cinco textos então fornecidos em `feedbacks/feedbacksTexto.txt` foram reproduzidos integralmente, preservando nomes, pontuação e parágrafos. As cinco fotos de 79×79 px em `feedbacks/imgFeedback/` foram associadas pelos nomes: Ricardo Karam, Rodrigo Melendez, Ana Caroline Nascimento, Tayano Lima e Floeli Do Prado Santos. A atualização posterior ampliou a seção para dez avaliações com as respectivas fotos. As notas de cinco estrelas foram informadas pelo responsável pelo site; não foi criada nota média nem contagem global de avaliações do Google.

O carrossel fica após a seção de contato e imediatamente acima do rodapé. Exibe um, dois ou três cards conforme a largura, todos com altura de 364 px. A rolagem é nativa, com encaixe por card, botões, teclado e deslize. Não há autoplay ou dependência nova. “Ler mais” aparece apenas quando o texto excede a área disponível e abre um diálogo acessível com o conteúdo completo, preservando a altura dos cards. Escape fecha o diálogo e devolve o foco ao botão; sem JavaScript, o texto completo fica disponível no próprio card.

Endereço e link do Maps permanecem apenas no rodapé, conforme solicitado. No mobile, a marca e apresentação vêm antes do contato e dos links de navegação. O hero usa as cores originais da fotografia, sem filtro cinza adicional, com camada escura mais leve e texto 32–40 px abaixo nas telas comuns. O menu foi reduzido discretamente em largura e tipografia.

Foram adicionados seis testes específicos de avaliações, incluindo correspondência literal ao TXT, fotos por autor, estrelas, altura uniforme, posição antes do rodapé, setas, teclado, limites, leitura completa, foco e funcionamento sem JavaScript. A suíte passou com 42 testes; lint, formatação, TypeScript e build também concluíram.

## Dados institucionais disponíveis

O domínio oficial `https://www.mfhadvogados.com.br` foi confirmado e incorporado ao código. E-mail, LinkedIn e horários somente se a cliente desejar publicar esses canais e fornecer os dados. Não existe formulário ou política de tratamento presumida; adicionar coleta de dados exige definir o fluxo real e o texto correspondente.

## Revisão anterior para apresentação — 6 de outubro de 2026

As 12 páginas dos dois PDFs foram novamente confrontadas com a versão implementada, incluindo os textos das áreas, biografias expandidas, etapas dos fluxos e dados do rodapé. Não foram encontradas divergências factuais. A redação é uma adaptação editorial para a web; nomes, inscrições, datas, serviços e contatos permanecem fiéis às fontes. A conferência detalhada está em [revisao-apresentacao.md](./revisao-apresentacao.md).

Foram capturadas todas as seções em 320, 390, 768 e 1440 px, com inspeção complementar do layout em 600, 1024 e 1920 px. A revisão ajustou textos auxiliares de 11 para 12 px no tablet e desktop, preservando os pesos da Montserrat. A seta de retorno ao início recebeu nome acessível mesmo quando sua legenda fica oculta no celular. Os resumos das avaliações usam o espaço de leitura sem linhas vazias entre parágrafos; o diálogo e a versão sem JavaScript preservam os parágrafos originais. Os controles do carrossel reservam espaço horizontal para o WhatsApp em larguras abaixo de 1200 px.

Naquela revisão, o build de produção concluiu e a suíte completa passou com **44 testes em 46,3 segundos**. Lint e formatação também passaram. Os dois testes adicionados verificaram a separação entre os controles e o WhatsApp em cinco larguras, o nome do retorno ao topo e os cinco diálogos de avaliação em 320×480 px. As capturas utilizadas foram artefatos temporários de inspeção, sem publicação ou permanência exigida no repositório.

O contorno de foco nos fundos claros do cabeçalho e dos canais de contato usa o dourado escuro; nos fundos pretos, usa o dourado original. A checagem complementar de cores de textos em fundos sólidos não encontrou contraste abaixo de 4,5:1 para leitura ou 3:1 para títulos grandes nos elementos examinados; o hero sobre fotografia foi revisado visualmente. Isso não constitui certificação de acessibilidade.

## Atualização de SEO e publicação — 6 de outubro de 2026

O domínio confirmado está centralizado em `lib/site-url.ts`. As duas rotas `/assessoria-juridica-empresarial` e `/contencioso-estrategico-de-massa` organizam as frentes existentes e reutilizam o texto institucional dos PDFs. `lib/service-pages.ts` identifica essas páginas; `lib/seo.ts` compõe metadados e entidades; `StructuredData.tsx` publica o grafo compartilhado. Sitemap, canonical, Open Graph e Twitter utilizam as três URLs oficiais.

A imagem social foi atualizada para a assinatura preta sobre fundo branco, com uma logo pública própria para identificação institucional. O WhatsApp utiliza uma mensagem inicial centralizada em `lib/site-content.ts`. A seção de avaliações reproduz os dez textos e fotos atualmente fornecidos em `feedbacks/`, preservando a ausência de nota média atribuída ao escritório.

`.env.example` oferece somente `GOOGLE_SITE_VERIFICATION`, opcional para verificação HTML por prefixo de URL no Search Console. A propriedade de domínio é verificada por DNS. `vercel.json` mantém o framework Next.js e a saída `.next`.

A validação atual passou em **63 testes de navegador em cerca de um minuto**, além de build, lint e formatação. A conferência de preservação dos 119 blocos institucionais passou; os dez depoimentos foram comparados literalmente ao TXT. Homepage e páginas de serviços foram inspecionadas visualmente em 390 e 1440 px, com cobertura automatizada das dez larguras da homepage e quatro larguras das novas páginas.

Os resultados atuais, o diagnóstico e as ações externas estão em [seo-audit.md](./seo-audit.md); o planejamento de conteúdo e autoridade está em [seo-roadmap.md](./seo-roadmap.md). Os arquivos de inspeção e as saídas de testes são temporários e podem ser removidos após a validação, preservando PDFs, materiais gráficos, feedbacks, skills e histórico Git.
