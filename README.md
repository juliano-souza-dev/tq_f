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

## ✨ Nova experiência visual
- Paisagens vetoriais originais para os 12 capítulos, com mapa, cenas de missões e identidade temática.
- **Coleção** acessível pelo mapa e pelo perfil, com Nilo como mascote inicial e companheiros regionais.
- **Baús** na 4ª missão de cada capítulo, com moedas, cristais e uma figurinha por baú.
- **Relíquias** ao concluir as 5 missões de cada região.
- **Loja** com cosméticos permanentes: capa, tiara, mochila e asas. São adquiridos apenas com recompensas do próprio jogo.
- Dados migrados sem zerar perfis existentes. Baús e relíquias referentes a fases antigas podem ser recuperados.
- Tudo local, sem anúncios, apostas ou compras reais.

Leia [Direção Visual e Recompensas](docs/DIRECAO-VISUAL-E-RECOMPENSAS.md) para o documento de produto, critérios de aceite e o escopo já implementado.

## Qualidade
O workflow valida a sintaxe JavaScript, verifica o atlas SVG e executa `node tests/rewards.test.js` antes de publicar.

## Tecnologia
HTML, CSS e JavaScript puro. Funciona em celular, tablet e computador e utiliza `localStorage` para preservar o progresso em cada navegador. Não há backend, login nem sincronização entre dispositivos.

## Publicação
O workflow em `.github/workflows/deploy-pages.yml` publica a branch `main` via GitHub Actions. Se necessário, selecione **Settings → Pages → Source: GitHub Actions**.

Durante o desenvolvimento não há service worker, evitando caches de versões antigas.
