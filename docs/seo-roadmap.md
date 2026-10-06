# Roadmap de SEO — MFH Advogados

Planejado em 6 de outubro de 2026, antes da implementação desta etapa. Skill aplicada: [seo-audit](../.agents/skills/seo-audit/SKILL.md).

Domínio confirmado pelo responsável: **https://www.mfhadvogados.com.br/**. Objetivo: ser encontrado pelas frentes de atuação e pela região de Florianópolis/Santa Catarina, além das pesquisas pela marca. Restrição: preservar integralmente os textos institucionais e dos depoimentos.

## Etapas de implementação

| Prioridade | Frente                          | Trabalho previsto                                                                                                                                                                    | Como validar                                                                                         |
| ---------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| 1          | Rastreamento e domínio          | URL oficial centralizada; canonical por página; sitemap XML com URLs reais; robots com referência ao sitemap; controle de duplicatas e páginas inexistentes                          | Build, HTML renderizado, respostas HTTP e leitura dos arquivos XML/TXT                               |
| 1          | Arquitetura e intenção de busca | Duas páginas temáticas: assessoria jurídica empresarial e contencioso estratégico/de massa. Reutilizar literalmente apenas o conteúdo pertinente de cada frente; ligá-las à homepage | Textos comparados à fonte atual, páginas indexáveis, links internos funcionais e canonicals próprios |
| 2          | SEO por página                  | Títulos e descrições usando os serviços e a localização reais; idioma pt-BR; H1 único e hierarquia clara; URLs descritivas                                                           | Inspeção do head e da árvore de títulos no navegador                                                 |
| 2          | Identidade e presença local     | Dados estruturados LegalService, endereço, telefone, Maps, área de atuação, serviços e sócios com OAB; identificadores estáveis e ligação entre entidades                            | JSON-LD extraído do DOM renderizado e comparado aos materiais oficiais                               |
| 2          | Compartilhamento                | Logo oficial preta centralizada em fundo branco para Open Graph e Twitter; URL absoluta, dimensões e texto alternativo                                                               | Inspeção do PNG, metadados e requisição da imagem                                                    |
| 2          | Conversão e confiança           | Dez depoimentos literais com fotos correspondentes; mensagem preenchida em todos os links do WhatsApp; contatos consistentes                                                         | Testes de carrossel, leitura completa, destinos e conteúdo do parâmetro text                         |
| 3          | Qualidade técnica               | Conteúdo principal entregue no HTML; imagens responsivas, fonte local, dimensões estáveis, menor JavaScript desnecessário, navegação mobile e teclado                                | Build de produção, testes de browser e medição local identificada como laboratório                   |
| 3          | Organização                     | Centralizar dados e textos compartilhados sem alterar sua redação; remover código comprovadamente morto e artefatos gerados obsoletos                                                | Revisão de imports, Git diff, lint, formatação e testes                                              |

## Mapa de pesquisas

São intenções fundamentadas nos serviços dos PDFs, não estimativas de volume de busca nem promessas de posição.

| Destino                             | Tema principal                                       | Pesquisas relacionadas                                                                                                                                             |
| ----------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`                                 | Escritório de advocacia empresarial em Florianópolis | MFH Advogados; Melara, Fuhrmann e Huinka; advogados empresariais Florianópolis                                                                                     |
| `/assessoria-juridica-empresarial`  | Assessoria jurídica empresarial em Florianópolis     | direito trabalhista empresarial; consultoria jurídica preventiva; contratos empresariais; direito societário; cobranças empresariais; proteção patrimonial         |
| `/contencioso-estrategico-de-massa` | Contencioso estratégico e de massa em Santa Catarina | gestão de contencioso; contencioso trabalhista empresarial; cível e consumerista; correspondência jurídica Florianópolis; audiências; recursos; sustentações orais |

Não serão criadas páginas em série para bairros, cidades sem atuação comprovada ou combinações de palavras. O conteúdo existente sustenta duas frentes completas, evitando páginas curtas e repetitivas por palavra-chave.

## Etapas externas após a ativação do domínio

1. Confirmar DNS, HTTPS e o redirecionamento da versão sem www para o domínio oficial no provedor/Vercel. A previsão de propagação informada pelo responsável não comprova disponibilidade ou indexação.
2. Verificar uma propriedade de domínio no Google Search Console, enviar `https://www.mfhadvogados.com.br/sitemap.xml` e inspecionar as três URLs. Não há acesso autorizado à conta nesta sessão.
3. No Perfil da Empresa no Google, cadastrar a mesma URL, manter nome/endereço/telefone consistentes e revisar categorias, serviços e horários com o responsável. Não inventar horários nem alterar o perfil sem acesso e instrução específica.
4. Validar o domínio público com Rich Results Test e PageSpeed Insights quando estiver acessível. Dados de Core Web Vitals de usuários reais só podem ser reportados quando houver amostra disponível.
5. Acompanhar no Search Console impressões e cliques por consultas de serviço e região, páginas indexadas e eventuais erros. Registrar uma linha de base após a publicação; não há histórico de tráfego fornecido.

## Desenvolvimento posterior

Se o cliente autorizar novos textos no futuro: materiais explicativos assinados pelos profissionais, respostas a dúvidas reais dos serviços e exemplos permitidos, sempre com revisão do escritório. Parcerias e menções locais legítimas podem fortalecer a autoridade. Esta entrega não inclui textos novos, backlinks comprados, geração de avaliações ou disparos de mensagens.

O Google explica que resultados locais dependem de relevância, distância e destaque. Um sitemap ajuda a descobrir URLs e não garante indexação ou posições. Fontes: [ranking local](https://support.google.com/business/answer/7091?hl=pt-BR), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [dados de empresa local](https://developers.google.com/search/docs/appearance/structured-data/local-business).

Os depoimentos permanecem visíveis ao visitante. Não será acrescentada marcação de estrelas à própria empresa: avaliações controladas pelo negócio não são elegíveis para esse recurso do Google. Fonte: [diretrizes de avaliações](https://developers.google.com/search/docs/appearance/structured-data/review-snippet).
