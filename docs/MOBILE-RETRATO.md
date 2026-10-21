# Expedição Tabuada | Interface mobile vertical

**Status:** implementado na branch `main` em outubro de 2026.  
**Objetivo:** transformar a aparência de site responsivo em experiência de jogo mobile em retrato, sem alterar o conteúdo matemático.

## Critérios não negociáveis

- Referências de tela: **360 × 740, 390 × 844, 412 × 915 px**. Até 900 px, aplica-se o layout de app mobile.
- O mapa é uma **trilha vertical** com 12 regiões ilustradas, conectadas visualmente; desbloqueio cronológico preservado.
- Barra superior compacta, com **avatar, nome, região, moedas e cristais**. A barra lateral de desktop não aparece em retrato.
- **Barra inferior fixa**: Mapa, Coleção, Diário, Perfil. Considera safe area de aparelhos com borda/indicador de gestos.
- Durante o quiz e o prólogo, a navegação inferior e o HUD são ocultos para manter a atenção na missão.
- Perguntas grandes, respostas em grade 2×2, teclas de toque amplas, entrada numérica com `inputmode=numeric`, botões primários acessíveis ao polegar.
- Cada capítulo apresenta **arte grande e história**, seguido por 5 fases em trilha vertical.
- Coleção usa 4 **abas**: Baús, Mascotes, Relíquias e Loja.
- Perfil mostra o progresso real e controles de preferências.
- Textos legíveis, foco de teclado, modo calmo, `prefers-reduced-motion`, suporte à área segura do iPhone.
- O manifesto PWA solicita **portrait-primary** no modo instalado. O navegador comum não é forçado a girar, para evitar bloqueios inesperados.

## Telas

| Tela | Organização em retrato | Ação principal |
| --- | --- | --- |
| Seleção de perfil | Cartões de aventureiras em 2 colunas | Selecionar jogadora |
| Mapa | Hero curto + 12 cards altos empilhados em trilha | Continuar história |
| Região | Ilustração de abertura + história + 5 etapas verticais | Ler próxima missão |
| Missão | Cenário ilustrado, objetivo e personagem local | Resolver desafios |
| Quiz | Progresso, operação central e grandes opções ou teclado numérico | Responder, continuar |
| Vitória | Arte e prêmios em destaque + botão largo | Próxima fase |
| Coleção | Resumo compacto + abas de categorias | Abrir / equipar / comprar |
| Perfil | Avatar, indicadores de domínio e atalhos | Continuar / trocar |

## Estrutura de código

- `assets/mobile-portrait.css`: regras responsivas **após** `adventure.css`, sem duplicar motor pedagógico.
- `index.html`: `mobileHeader`, `mobileBottomNav`, `renderProfileScreen` e abas da `renderCollection`.
- `manifest.webmanifest`: experiência instalável em retrato.
- `tests/mobile-flow.test.js`: simula escolha de perfil, mapa com doze imagens, navegação, abas, abandono de quiz e conclusão de 16 acertos.
- `.github/workflows/deploy-pages.yml`: executa esses testes antes de publicar.

## Fluxo pedagógico preservado

- 12 regiões, 60 fases, 8 operações por fase, 2 acertos por operação.
- Primeira passagem com alternativas; segunda com resposta digitada.
- Sair de uma fase incompleta significa reiniciá-la, sem recompensas nem marcação de conclusão.
- Cada conquista é concedida uma só vez. Avanço nunca depende de compras.

## Testes e revisão visual

- **Automatizado em CI:** sintaxe JS, testes da economia, integridade SVG e simulação do fluxo de 16 respostas.
- **Ainda exige inspeção visual real:** smartphones Android/iOS em retrato, teclado numérico aberto, safe area inferior e acessibilidade com leitor de tela.
- O posicionamento retrato muda apenas layout e navegação. O desktop continua suportado.

## Evoluções futuras

Criar transições narrativas de página, animar a rota com movimento sutil, substituir os emojis dos mascotes secundários por desenhos próprios e fazer inspeções visuais automatizadas de viewport no pipeline.

## Artes originais integradas ao jogo

Todos os arquivos a seguir são WebP otimizados e **servidos localmente pelo GitHub Pages**, sem depender de URLs externas:

| Arquivo | Local de uso |
|---|---|
| `assets/artwork/splash.webp` | Capa da aventura, em retrato, no mapa principal |
| `assets/artwork/nilo.webp` | Mascote Nilo, tela de prólogo, perfil e coleção |
| `assets/artwork/chest.webp` | Baús da coleção e conquista da quarta missão |
| `assets/artwork/beach.webp` | Capítulo 1, Baía das Conchas, e sua missão |
| `assets/artwork/forest.webp` | Capítulo 2, Floresta das Araras, e sua missão |
| `assets/artwork/candy.webp` | Capítulo final, Coroa do Mundo, na arte do castelo |

O helper `sceneArt` do `index.html` seleciona essas imagens quando disponíveis e mantém `atlas-scenes.svg` como alternativa para as demais regiões. O arquivo `assets/artwork.css` define composição, cortes e legibilidade em mobile, sem interferir no motor de multiplicação.

Os arquivos originais foram convertidos para WebP via pipeline temporário de integração. Após conferência no repositório, o importador foi removido. Para integrar outras imagens futuramente, manter um pipeline isolado, e não converter imagens em cada carregamento do aplicativo.

## Redesign de jornada premium (2026-10-21)

A captura da interface anterior mostrou que os capítulos pareciam cards de dashboard: arte confinada a uma faixa, grande área vazia abaixo, bloqueados totalmente cinzas e uma grade desktop de três colunas sem sensação de aventura.

### Correção aplicada
- `assets/atlas-premium.css` é carregado **depois** de `artwork.css`, para ser a camada de composição final.
- `regionHTML` usa `journey-stop` e `journey-card`: ilustração preenche o destino, título e contexto aparecem sobre gradiente contrastante e cinco marcas representam o progresso real.
- O mapa usa `journey-route`, uma rota contínua **em uma coluna também no desktop**, para manter a leitura de jornada em vez de painel.
- Capítulos futuros têm bruma colorida e identidade visual, sem remover a indicação inequívoca de bloqueio.
- Destino atual tem moldura dourada e marco luminoso; destinos concluídos têm identidade de conquista.
- Cartões não têm mais fundo bege vazio nem título escuro sobre imagem clara.
- O perfil desktop ganhou acabamento de passaporte ilustrado, com Nilo como personagem destacado.
- Dentro do capítulo, o banner se torna uma cena inteira com título protegido pelo gradiente. Etapas viram placas volumétricas, e história, desafio e vitória seguem a mesma linguagem.
- A composição respeita (prefers-reduced-motion) e a preferência de modo calmo. Os elementos com conteúdo pedagógico não usam animação obrigatória.

### Restrições mantidas
Não alterar `buildFacts`, `selectNext`, `answer`, `finishIsland`, armazenamentos, nem lógica da loja ou de baús. Nenhuma fase oculta fica clicável e nenhuma ilustração substitui informação de acessibilidade.

### Qualidade
Os testes verificam a existência das 12 cenas, trilha ilustrada, folhas CSS, navegação, colecionáveis e conclusão de 16 acertos na mesma sessão. Não substituem inspeção visual manual em 360×740, 390×844, 412×915 e desktop, que deve ser feita depois de testar o Pages.
