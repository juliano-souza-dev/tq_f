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
