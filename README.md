# 🗺️ Expedição Tabuada: O Grande Atlas

Um webapp educacional para aprender a tabuada em um mapa de aventuras com 12 capítulos e 60 fases.

## Jogar
O jogo é estático e abre diretamente em `index.html`. Depois da publicação, o endereço esperado é:

https://juliano-souza-dev.github.io/tq_f/

## Pedagogia
- 12 regiões, 5 fases em cada uma.
- 8 operações por fase, cada operação precisa de 2 acertos na mesma sessão.
- Respostas incorretas dão feedback e dicas, sem punição.
- O conteúdo escala das tabuadas de 1 a 10 até duas regiões de revisão.
- Fase interrompida reinicia; conclusão libera a próxima missão.
- O mapa conta uma história, com recompensas e desafios.
- Perfis separados para Alana, Taís e Heloísa.

## Tecnologia
HTML, CSS e JavaScript puro. Funciona em celular, tablet e computador e utiliza `localStorage` para preservar o progresso em cada navegador. Não há backend, login nem sincronização entre dispositivos.

## Publicação
O workflow em `.github/workflows/deploy-pages.yml` publica a branch `main` via GitHub Actions. Se necessário, selecione **Settings → Pages → Source: GitHub Actions**.

Durante o desenvolvimento não há service worker, evitando caches de versões antigas.
