# Tabuada Quest: reconstrução webapp modular

**Status:** início da reconstrução; não é uma versão de produção. A antiga main pode ser descartada como base do jogo, mas será preservada como histórico até a nova versão ser validada. Branch de trabalho: feature/webapp-modular. Fonte original e banco de recursos: apoio/apk-extraido/assets.

## Separação atual

- webapp/index.html: marcação original sem blocos CSS e JavaScript inline.
- webapp/styles/legacy.css: CSS original isolado para compatibilidade.
- webapp/scripts/legacy.js: lógica de jogo original isolada para compatibilidade.
- webapp/vendor/: biblioteca e dados Lottie preservados.
- webapp/data/asset-inventory.csv: inventário individual de **todos os 1.362 arquivos**.
- webapp/data/asset-inventory.summary.json: resumo da auditoria.
- webapp/data/batches/: lotes de migração, resultados e tamanhos.
- webapp/assets/optimized/: apenas recursos escolhidos e convertidos aos poucos.
- webapp/tools/: scripts auditáveis de inventário, conversão e implantação.
- webapp/tests/: testes de integridade.

A separação inicial do CSS e JS NÃO é a arquitetura final: os dois arquivos legacy devem ser esvaziados gradualmente e substituídos por módulos pequenos. O HTML original ainda contém atributos de eventos e de estilo que serão eliminados por tela.

## Arquitetura desejada

src/app: composição, rotas, inicialização e estados da UI.
src/core: persistência versionada, domínio matemático, progressão, recursos e regras.
src/features: profile, home, worlds, practice, portals, pets, rewards, inventory, shop, daily.
src/components: botões, modais, elementos do HUD e feedback.
src/styles: tokens, layout mobile-first, tipografia e animações.
src/resources: resolução e carregamento gradual de WebP, vetores e Lottie.

Regras ficam nos serviços, nunca misturadas com renderização. A interface não escreve diretamente no armazenamento. Módulos novos serão ES modules, com importações explícitas e testes próprios. Interface retrato, tela pequena como padrão.

## Asset inventory: interpretação obrigatória

- Referência explícita: o nome do arquivo aparece no HTML, CSS, JS ou dados Lottie.
- Referência dinâmica ou derivada: pode ser construído em execução por funções, por exemplo os quadros dos trinta pets.
- Não identificado: não foi encontrado pelo método estático, MAS ISTO NÃO PROVA AUSÊNCIA DE USO.
- WebP pequeno: apenas candidato já compactado; ainda requer inspeção visual e checagem de dimensões.
- PNG: candidato à conversão por lotes, não ao descarte.
- SVG: manter vetorial, pois rasterizar pode prejudicar a nitidez.
- JSON de Lottie: manter JSON e carregamento sob demanda; não transformar a animação em uma imagem estática.
- Código: manter código; arquivos JS/HTML não são assets raster.

O inventário inicial tem 1.208 PNG, 95 WebP, 12 SVG, 43 JSON e 4 arquivos de código/texto, total aproximado de 496 MiB. Reavaliações deverão incorporar medidas reais de largura, altura, alpha, desempenho e tamanho após migração.

## Lotes previstos

001 - HOME: quatorze elementos visuais da tela inicial. Preservar transparência, texto e detalhes.
002 - PERFIS: 33 variações de avatares, carregadas somente conforme seleção.
003 - MAPAS: 12 imagens de mapa, 10 fundos de prática e portais.
004 - DESAFIOS: HUD, botões e feedback, com resposta instantânea.
005 - RECOMPENSAS: baús, galerias, colecionáveis e raridades.
006 - PETS: trinta personagens animados, múltiplas ações e dados Lottie. Evitar 960 downloads individuais: testar WebP animado ou atlas por personagem/ação.
007+ - Demais efeitos, molduras, fundos, acessórios e eventos.

O fluxo de cada lote será manifesto -> conversão -> relatório de tamanho e PSNR -> inventário atualizado -> integração no componente -> testes -> comparação visual humana. Qualidade sem perda perceptível não é certificada apenas pelo PSNR.

## Critérios de promoção à main

- Nada da aparência ou estrutura antiga será usado como padrão da nova versão.
- Login/perfis, tabuada, portais, progressão, pets, loja e recompensas do APK precisam funcionar e persistir.
- CSS fora de HTML, JS fora de HTML, sem lógica distribuída em onclick inline na arquitetura final.
- Tela vertical responsiva, sem elementos sobrepostos em 360x740, 390x844, 412x915 e desktop.
- Sem erros de console, sem recursos quebrados e sem carregamento antecipado dos 490 MB.
- Senha de teste ou controle Papai embutido no JS não pode ser vendido como autenticação segura.
- Testes de comportamento e visual antes de qualquer substituição em produção.

## Comandos

Rodar testes: cd webapp && npm run check.

Regerar catálogo em checkout com a branch apoio: node webapp/tools/build-asset-inventory.mjs apk-extraido/assets webapp/data/asset-inventory.csv.

Converter um lote a partir da raiz: python -m pip install pillow && python webapp/tools/convert-batch.py webapp/data/batches/001-home.json.

Confirmar a migração do lote: node webapp/tools/apply-batch-to-inventory.mjs webapp/data/batches/001-home-results.json.

Os scripts nunca alteram os arquivos originais da branch apoio.
