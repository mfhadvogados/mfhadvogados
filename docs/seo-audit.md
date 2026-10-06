# Auditoria de SEO — MFH Advogados

Data: 6 de outubro de 2026. Domínio oficial: **https://www.mfhadvogados.com.br/**. Skill aplicada: [seo-audit](../.agents/skills/seo-audit/SKILL.md). O [roadmap](./seo-roadmap.md) foi registrado antes da implementação.

## Resultado da entrega

A implementação está pronta para publicação: três páginas estáticas indexáveis, metadados próprios, canonicals, sitemap, robots, dados estruturados e links internos. Os cinco novos depoimentos completam dez avaliações com fotos correspondentes. Todos os links do WhatsApp levam à mensagem de agendamento. A imagem social usa a logo oficial preta sobre fundo branco.

**Os textos institucionais existentes e os depoimentos não foram reescritos.** A comparação automatizada dos 119 blocos institucionais da versão anterior passou. As dez avaliações foram comparadas literalmente ao TXT, incluindo pontuação, espaços internos e parágrafos. As páginas de serviços reutilizam a redação existente; títulos e descrições de metadados organizam os serviços e a região para os buscadores.

O principal impedimento externo permanece no DNS: na conferência desta entrega, `www.mfhadvogados.com.br` retornou `DNS_ERROR_RCODE_NAME_ERROR`; a consulta A do domínio sem www retornou somente a autoridade SOA `a.auto.dns.br`, sem endereço A. O acesso HTTPS público também falhou. Esse resultado não permite afirmar que o site já esteja publicado ou indexado.

## Achados técnicos e correções

| Prioridade | Achado                                                               | Impacto                                                           | Evidência                                                     | Correção e situação                                                                                                                                           |
| ---------- | -------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1          | Domínio público indisponível                                         | Alto: impede acesso e rastreamento                                | Consultas DNS e tentativa HTTPS nesta entrega                 | **Pendente externo:** configurar os registros indicados pelo projeto Vercel no provedor DNS, conectar www e domínio sem www e conferir certificado/propagação |
| 1          | URLs de SEO dependiam de `SITE_URL` ainda não confirmado             | Alto: canonical, sitemap e imagem social incompletos sem variável | Inspeção do código anterior de URL/metadados                  | **Corrigido:** domínio confirmado centralizado em `lib/site-url.ts`; metadados e sitemap utilizam a mesma origem                                              |
| 2          | Toda a apresentação estava concentrada na homepage                   | Médio: frentes diferentes sem URL própria para descoberta         | Arquitetura anterior com uma única página de conteúdo         | **Corrigido:** páginas de assessoria e contencioso, ligadas à home e entre si, com conteúdo pertinente já existente                                           |
| 2          | Canonical e Open Graph precisavam refletir cada nova página          | Alto: sinalização incorreta de páginas distintas                  | Inspeção do head renderizado no Chrome                        | **Corrigido:** canonical e `og:url` próprios; títulos e descrições específicos por rota                                                                       |
| 2          | Sitemap precisava cobrir todas as URLs reais                         | Médio: descoberta das páginas novas                               | XML e respostas HTTP verificados por teste                    | **Corrigido:** três URLs canônicas, sem âncoras, parâmetros ou datas de alteração artificiais; robots permite rastreamento e referencia o sitemap             |
| 2          | Identidade local e relações entre serviços/profissionais incompletas | Médio: informações menos explícitas para processamento            | Conferência dos PDFs e extração do JSON-LD no DOM renderizado | **Corrigido:** LegalService, WebSite, WebPage, Service, pessoas/OAB e breadcrumbs; catálogo apenas onde os serviços aparecem                                  |
| 3          | Imagem de compartilhamento divergia da solicitação final             | Baixo para busca; relevante para apresentação e compartilhamento  | Inspeção visual e resposta HTTP da imagem                     | **Corrigido:** PNG 1200×630 com logo preta oficial sobre branco; logo pública específica e URLs absolutas                                                     |
| 3          | WhatsApp abria sem mensagem inicial                                  | Conversão                                                         | Inspeção de todos os destinos nas três páginas                | **Corrigido:** parâmetro `text` centralizado, com número oficial e mensagem de agendamento                                                                    |

As páginas e os arquivos XML/TXT responderam 200 no servidor de produção local. Uma URL inexistente respondeu 404. O redirecionamento por host do domínio sem www respondeu 308 para HTTPS com www, preservando caminho e consulta. A execução desse redirecionamento no domínio público depende de DNS e associação dos dois hosts na hospedagem. O redirecionamento HTTP→HTTPS e o certificado público devem ser conferidos após essa associação.

O Next normaliza o canonical da homepage para a origem sem a barra final. Ambas as formas representam a mesma URL raiz; a comparação dos testes normaliza a URL antes de verificar a igualdade. As duas páginas de serviço usam caminhos sem barra final.

Referências: [canonicals](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemap XML](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [links rastreáveis](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

## SEO por página e pesquisa regional

| URL                                 | Título nos metadados                                          | Conteúdo e intenção                                                                        |
| ----------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `/`                                 | Advocacia empresarial em Florianópolis · MFH Advogados        | Marca, escritório, equipe/OAB, duas frentes, contatos e avaliações                         |
| `/assessoria-juridica-empresarial`  | Assessoria empresarial em Florianópolis · MFH Advogados       | Sete áreas, orientação a empresas/gestores/RH e sequência preventiva completa              |
| `/contencioso-estrategico-de-massa` | Contencioso em Florianópolis e Santa Catarina · MFH Advogados | Gestão de volume processual, serviços operacionais, quatro etapas e diferenciais regionais |

Na tabela, o separador visual é `·`; o código usa `|` nos três títulos. Todas as páginas têm um H1, idioma pt-BR, descrição própria, canonical para si e informações locais visíveis. O H1 da home mantém o texto institucional aprovado. As páginas novas utilizam como H1 os nomes das frentes já presentes no site.

As páginas de serviço ficam a um clique da homepage por links HTML com nomes descritivos. Menu, marca e links do rodapé dessas páginas retornam às seções reais da homepage. As áreas da assessoria têm âncoras próprias; as duas páginas também se conectam entre si. O conteúdo principal chega no HTML mesmo sem JavaScript, incluindo as descrições completas dos serviços e das etapas.

O [mapa de pesquisas do roadmap](./seo-roadmap.md#mapa-de-pesquisas) relaciona as URLs a buscas empresariais, trabalhistas, societárias, contratuais, preventivas e de contencioso/correspondência jurídica na região. Não há volume de busca ou histórico de tráfego fornecido; esse mapa descreve intenções sustentadas pelos materiais, sem estimar demanda ou posições.

Não foram criadas páginas repetidas para cidades/bairros ou combinações de palavras. As duas frentes organizam conteúdo útil já disponível. Referências: [conteúdo útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [política sobre doorway pages](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse).

## Conteúdo, confiança e presença local

Nomes dos sócios, OAB, funções, biografias, localização, serviços e contatos mantêm os fatos dos dois PDFs. A [conferência dos materiais](./revisao-apresentacao.md) documenta as 12 páginas examinadas. Os dois novos destinos reutilizam as mesmas fontes centralizadas, sem criar qualificações, clientes, resultados, áreas ou estatísticas.

Nome, endereço, telefone e localidade são consistentes entre a apresentação, o rodapé e LegalService. `hasMap` usa o link exato fornecido para o escritório; `sameAs` aponta ao Instagram institucional. O link genérico de pesquisa no Google permanece disponível ao visitante, sem ser tratado como identificador do escritório nos dados estruturados.

O grafo de dados estruturados relaciona o escritório ao site, à página atual e aos serviços. As três pessoas, biografias e registros da OAB são descritos na homepage, onde estão apresentados. Nas páginas de serviço, essas entidades são referenciadas pelos IDs da home; o catálogo com sete áreas aparece somente na home e na assessoria. O contencioso descreve sua própria frente e seus breadcrumbs.

Os depoimentos e fotos fornecidos são exibidos integralmente na leitura completa e também sem JavaScript. As notas de cinco estrelas foram informadas pelo responsável. Não foi calculada uma média do perfil ou acrescentado Review/AggregateRating ao escritório: esse tipo de avaliação da própria empresa não é elegível ao recurso de estrelas do Google. [Diretrizes de avaliações](https://developers.google.com/search/docs/appearance/structured-data/review-snippet#guidelines).

Dados estruturados não incluem horários, preços, e-mail, fundadores ou dados comerciais ausentes dos materiais. Referências: [empresa local](https://developers.google.com/search/docs/appearance/structured-data/local-business), [políticas de dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [LegalService](https://schema.org/LegalService).

## Desempenho: laboratório local

Três amostras por página no build de produção, Chrome no Windows, viewport 390×844, emulação mobile/touch, CPU com desaceleração 4× e configuração CDP de rede com 1,6 Mbps de download, 750 kbps de upload e latência de 150 ms. Cada amostra usou contexto novo, cache do navegador limpo/desabilitado e observadores PerformanceObserver. A coleta ocorreu sem interação, após network idle mais dois segundos.

| Página      | TTFB mediano local | LCP mediano | Faixa LCP, três amostras | CLS observado | Requisições | Transferência observada |
| ----------- | ------------------ | ----------- | ------------------------ | ------------- | ----------- | ----------------------- |
| Home        | 7 ms               | 1,904 s     | 1,624–2,456 s            | 0             | 19          | 382 KiB                 |
| Assessoria  | 6 ms               | 1,072 s     | 0,984–1,076 s            | 0             | 20          | 323 KiB                 |
| Contencioso | 4 ms               | 0,892 s     | 0,884–0,920 s            | 0             | 20          | 321 KiB                 |

LCP: maior candidato registrado antes de qualquer interação; na home, a imagem do hero; nas páginas de serviço, texto. CLS: soma dos deslocamentos observados, excluindo entradas com `hadRecentInput`; todas as amostras tiveram zero entradas. Requisições e bytes correspondem à janela inicial medida, sem rolagem por toda a página.

**Essas medições são locais e não representam Core Web Vitals de usuários reais.** O servidor Next e o cache de imagens estavam aquecidos; os cabeçalhos indicaram HIT. O TTFB de localhost não representa Vercel, DNS, TLS ou redes reais. A configuração de rede aplicada pelo CDP não transforma localhost em uma medição da hospedagem pública. INP não foi medido. Não há nota de PageSpeed, dados CrUX ou resultado público do Rich Results Test nesta entrega.

Fontes são servidas localmente com preload e swap; o hero tem preload de imagem responsiva; fotografias abaixo da dobra são lazy. Não houve erro de console, JavaScript ou HTTP nas nove medições. Referência para validação após publicação: [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

## Validação visual e funcional

- Build de produção e TypeScript aprovados; três páginas de conteúdo pré-renderizadas.
- **63 testes Playwright aprovados**, cobrindo SEO renderizado, sitemap/robots, 404, redirecionamento, WhatsApp e conteúdo sem JavaScript.
- Comparação dos **119 blocos institucionais** com a versão anterior aprovada; comparação literal das **dez avaliações** ao TXT aprovada.
- Home verificada pela suíte em 320, 360, 375, 390, 414, 768, 1024, 1280, 1440 e 1920 px; novas páginas em 320, 390, 768 e 1440 px, sem transbordamento horizontal.
- Capturas de home e páginas de serviço inspecionadas em 390 e 1440 px; CTAs, quebras de texto, rodapé e novos cards conferidos.
- Cards com altura de 364 px, leitura completa quando necessária, fotos correspondentes, controles/limites e teclado verificados; telas baixas de 320×480 também cobertas.
- OG conferido visualmente e por teste: 1200×630, borda branca, logo oficial preta, resposta HTTP 200.

Os testes usam Chrome no Windows com viewports simuladas. Safari e aparelhos físicos não foram usados. Nenhuma indexação ou posição foi confirmada por esses testes.

## Limpeza e organização

Textos compartilhados centralizados em `lib/site-content.ts`; domínio em `lib/site-url.ts`; configuração das páginas em `lib/service-pages.ts`; metadados e entidades em `lib/seo.ts`; renderização compartilhada em `ServicePage` e `StructuredData`.

Removidos o helper não utilizado `SheetHeader`, a filtragem redundante da navegação e a condição desnecessária do link de contato no rodapé. Sharp foi declarado explicitamente como dependência de desenvolvimento do gerador de marca, usando a versão já instalada e lockfile sincronizado. Não foram acrescentadas bibliotecas de carrossel, animação ou SEO.

Capturas, renderizações dos PDFs, scripts pontuais de auditoria, cache npm temporário, resultados de testes e cache incremental TypeScript são artefatos gerados descartáveis. Foram removidos após a conferência; este relatório conserva os resultados. PDFs originais, materiais gráficos, dez feedbacks/fotos, skills, configurações e histórico Git permanecem preservados.

## Plano externo após a publicação

1. **DNS e HTTPS:** associar o domínio ao projeto Vercel, cadastrar os registros exatos indicados no painel e validar www, domínio sem www, certificado e redirecionamentos. Não presumir endereços IP nem prazo fixo de propagação.
2. **Search Console:** verificar propriedade de domínio por DNS; enviar `https://www.mfhadvogados.com.br/sitemap.xml`; inspecionar as três URLs e acompanhar páginas indexadas/erros. Para uma propriedade por prefixo de URL, o token HTML pode ser informado em `GOOGLE_SITE_VERIFICATION` antes do build. [Verificação de propriedade](https://support.google.com/webmasters/answer/9008080?hl=pt-BR).
3. **Perfil da Empresa no Google:** conferir a URL oficial, nome, endereço e telefone do perfil existente; revisar categorias/serviços compatíveis com os materiais e confirmar horários com o responsável. O link público do Maps não concede acesso de edição à conta. [Diretrizes do perfil](https://support.google.com/business/answer/3038177?hl=pt-BR).
4. **Validação pública:** executar Rich Results Test e PageSpeed Insights no domínio ativo. Aguardar amostra real antes de reportar LCP, INP e CLS de usuários reais.
5. **Acompanhamento:** registrar a linha de base de impressões/cliques e consultas por serviço/região no Search Console; acompanhar canonical escolhido, indexação e visitas às duas frentes. Não há baseline de tráfego disponibilizado nesta sessão.

Não foi enviado sitemap, solicitada indexação ou alterado o perfil do Google nesta sessão, pois não há acesso às contas. SEO técnico prepara rastreamento e interpretação; presença e posições dependem também de indexação, concorrência e sinais externos. O ranking local considera relevância, distância e destaque. [Critérios do Google para resultados locais](https://support.google.com/business/answer/7091?hl=pt-BR).
