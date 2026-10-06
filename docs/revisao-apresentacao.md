# Revisão para apresentação — MFH Advogados

Data: 6 de outubro de 2026.

A versão foi revisada em conteúdo, composição visual e funcionamento. Não foram identificadas divergências factuais entre os textos institucionais do site e os dois PDFs fornecidos. A redação foi adaptada para leitura na web, sem acrescentar áreas de atuação, qualificações ou resultados ausentes dos materiais.

## Conferência dos materiais

Foram examinadas as seis páginas de cada PDF, inclusive os currículos e os dados de contato em tamanho legível.

| Conteúdo do site                                                                                                                                    | Fonte conferida                                   | Resultado       |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------------- |
| MFH / Melara, Fuhrmann & Huinka Advogados Associados; desde 2006; Florianópolis/SC                                                                  | Capas e páginas 2 dos dois PDFs                   | Correspondente  |
| Propósito, atuação empresarial, assessoria contínua e extensão do jurídico                                                                          | Empresarial, páginas 2 e 6; contencioso, página 2 | Correspondente  |
| Trabalhista empresarial, societário, contratos, consultoria preventiva, defesa cível e consumerista, proteção patrimonial, cobranças e notificações | Empresarial, páginas 2, 4 e 6                     | Correspondente  |
| Orientação a gestores/RH, normas coletivas, políticas internas, treinamentos e compliance trabalhista                                               | Empresarial, página 4                             | Correspondente  |
| Volume processual, prazos, padronização, relatórios, comunicação, audiências, recursos, sustentações e correspondência                              | Contencioso, páginas 2, 4 e 6                     | Correspondente  |
| Prevenção → Orientação → Estratégia → Segurança                                                                                                     | Empresarial, página 5                             | Mesma sequência |
| Entrada → Gestão → Estratégia → Resultado                                                                                                           | Contencioso, página 4                             | Mesma sequência |
| Visão empresarial, eficiência, tecnologia, presença em Santa Catarina e proximidade                                                                 | Contencioso, página 5                             | Correspondente  |
| Nomes, inscrições da OAB, CEO e trajetórias dos três sócios                                                                                         | Página 3 dos dois PDFs                            | Correspondente  |
| Endereço, CEP, telefone/WhatsApp e Instagram                                                                                                        | Página 6 dos dois PDFs                            | Correspondente  |

Inscrições conferidas: Flavio Augusto Boreggio Melara — OAB/SC 15526B; Rafaela Fernandes Fuhrmann — OAB/SC 38603 e OAB/SP 503494; Franciele Karine Huinka — OAB/SC 45692. Os tempos de experiência das biografias reproduzem os materiais, sem atualização presumida.

Contato conferido: `(48) 99942-4925`, `@mfhadvempresa`, Av. Prefeito Osmar Cunha, 183, Bloco B, sala 806, Florianópolis/SC, CEP 88015-900. Endereço e Maps ficam no rodapé conforme solicitado.

Os links do Google e Maps são os fornecidos pelo responsável pelo site. Os cinco depoimentos e as fotos correspondem ao TXT e às imagens de `feedbacks/`; as cinco estrelas foram informadas pelo responsável. A revisão verificou a reprodução desses arquivos, sem consultar ou atribuir uma nota média ao perfil do Google.

## Revisão visual e de uso

Todas as seções foram capturadas em 320, 390, 768 e 1440 px. A revisão incluiu hierarquia dos títulos, contraste, espaçamentos, quebras de linha, alinhamento dos CTAs, retratos, informações da OAB, menu lateral, carrossel e organização do rodapé. O layout também foi inspecionado em larguras de 600, 1024 e 1920 px.

Os ajustes finais aumentaram discretamente os textos auxiliares do tablet e desktop para 12 px, sem engrossar a tipografia. A seta de retorno ao início ganhou nome acessível no celular. Os resumos dos depoimentos aproveitam melhor o espaço, e os controles do carrossel deixam espaço para o WhatsApp flutuante. Cards mantêm a altura de 364 px; a leitura completa preserva texto, pontuação e parágrafos.

Os contornos de foco do cabeçalho e dos canais de contato usam a variante mais escura do dourado para melhor contraste nos fundos claros. Nos fundos pretos, permanece o dourado da identidade.

Foram preservados o hero com a cor original da fotografia e o texto mais baixo no celular, o menu mais estreito, os links simples no rodapé e sua ordem mobile: marca/apresentação, contato, navegação e informações finais.

## Validação

- Build de produção concluído; TypeScript verificado pelo build.
- Lint e formatação aprovados.
- **44 testes de navegador aprovados em 46,3 segundos.**
- Dez larguras cobertas pela suíte: 320, 360, 375, 390, 414, 768, 1024, 1280, 1440 e 1920 px.
- Telas baixas, teclado, foco, Escape, menu, links internos, fluxos, biografias, imagens, contatos, metadados e ausência de rolagem horizontal verificados.
- Textos das avaliações comparados ao TXT e fotos associadas por autor. Os cinco diálogos foram testados em 320×480 px, com fechamento acessível e retorno do foco.
- Funcionamento do carrossel e leitura completa sem JavaScript verificados.

Os testes usam Chrome no Windows com diferentes viewports. Safari e aparelhos físicos não foram testados nesta revisão. As capturas finais estão em `.artifacts/client-review/`, com sufixo `-final.png`.

## Configuração para publicação

O domínio oficial ainda precisa ser informado em `SITE_URL` para completar canonical, sitemap e URLs institucionais dos metadados. Essa pendência não impede a apresentação visual local. E-mail, LinkedIn e horários não constam dos materiais e não foram acrescentados.
