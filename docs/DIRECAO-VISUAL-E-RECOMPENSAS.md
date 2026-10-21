# Expedição Tabuada — Direção visual e sistema de recompensas
> Documento de produto e especificação de implementação. Primeira entrega: outubro de 2026.

## Visão
Webapp infantil de aventura por **mapa e capítulos**, sem navegação livre. O **Grande Atlas** perdeu doze estrelas. A criança explora as 12 regiões, cada uma com cinco missões narrativas, para restaurar o mundo enquanto domina a multiplicação. Mobile first (360 px+), acessível e hospedado no GitHub Pages.

## Contrato pedagógico — não negociável
- 12 regiões; tabuadas 1 a 10 e duas revisões finais.
- 5 fases sequenciais por região; 8 operações distintas por fase.
- Cada operação deve obter **dois acertos na mesma sessão**; a segunda tentativa é digitada, sem alternativas.
- Respostas erradas geram feedback formativo; erros ficam no histórico de aprendizagem, em vez de punir com moedas.
- Progresso de uma fase é **atômico**: sair antes de finalizar recomeça a fase, sem marcar como concluída.
- Recompensas são concedidas **apenas** na conclusão validada; jamais podem desbloquear fase ou comprar acertos.
- Concluída uma fase, não se repete e não se concedem novamente as mesmas recompensas.
- Sem cronômetro obrigatório; modo de baixo movimento; todos os botões acionáveis por teclado.
- O arquivo de dados atual em localStorage permanece compatível (chave expedicao-tabuada-v1).

## Linguagem visual
**Aventura ilustrada fantástica**: cenários SVG em camadas (céu, colinas, terreno, detalhes temáticos), brilho de relíquias, trilhas pontilhadas e cartões em cores contrastantes. Cada um dos doze capítulos tem composição cromática própria e arte dedicada. Tipografia grande e alto contraste na matemática; textos narrativos curtos. O destaque visual é o mapa, a coleção e a recompensa, jamais esconder perguntas sob elementos decorativos.

## Inventário e economia — primeira entrega
- **Moedas 🪙**: continuam sendo obtidas por fase; usadas para itens cosméticos.
- **Cristais 💎**: continuam sendo concedidos em fases específicas; podem comprar cosméticos raros.
- **Estrelas ⭐**: uma por região concluída; apenas marca domínio, não podem ser compradas.
- **Baús 🎁**: um baú ao completar a quarta fase de cada capítulo; prêmio determinístico, sem apostas ou compra de caixas.
- **Relíquias ✨**: uma por região completamente concluída.
- **Mascotes 🐾**: Nilo, coruja cartógrafa, é companheiro inicial; amigos adicionais são conquistados na terceira fase de cada região (mecânica original).
- **Personalização**: ao menos três cosméticos permanentes para adquirir e equipar.
- Estado salvo **por perfil**: `inventory`, `equipped`, `chests`, `relics`. Progresso existente é migrado sem zerar moedas nem fases.
- Baús adquiridos no passado antes da atualização podem ser recuperados na migração de perfil, sempre uma única vez.

## Jornadas principais
1. Selecionar perfil; ver arte de boas-vindas e o progresso individual.
2. Abrir **Mapa** com as 12 regiões ilustradas, missão atual e um teaser da recompensa.
3. Entrar em capítulo: história, NPC, cinco fases ilustradas, objetivos pedagógicos.
4. Resolver 8 × 2 acertos com reforço positivo sem penalidade.
5. Tela de vitória apresenta recompensa, novo baú/relíquia, e acesso direto à coleção.
6. **Coleção** exibe Nilo e outros amigos, relíquias, baús disponíveis, inventário e loja cosmética.
7. Abrir baú concede prêmio imediatamente, transação persistida para evitar duplicação.
8. Comprar/equipar cosméticos usa somente saldo existente; nenhum item interfere na aprendizagem.

## Acessibilidade e performance
- Layout 360–1440px, alvos de toque preferencialmente >=44px, modal e componentes com nomes legíveis.
- `prefers-reduced-motion` e opção calma desabilitam movimentos intensos.
- SVG vetorial local, nenhuma CDN ou biblioteca pesada para ilustrações.
- Sem anúncios, pagamentos, ranking competitivo ou surpresa monetizada.
- Progresso local por navegador; não há sincronização multiaparelho até inclusão futura de backend.

## Catálogo de assets — etapa implementada
- 12 paisagens temáticas em `assets/atlas-scenes.svg`.
- Ilustrações de Nilo e do baú no mesmo atlas SVG.
- Tema visual e transições em `assets/adventure.css`.
- Inventário e regras de conquista em `assets/rewards.js`.

## Critérios de aceite
- [ ] Mapa mostra 12 pinturas regionais sem esconder estados de bloqueio.
- [ ] Tela de capítulo e introdução da missão exibem ilustrações.
- [x] Primeiro baú ao concluir fase 4, no máximo uma vez; abrir também uma vez. Testado automaticamente.
- [x] Região completa gera relíquia; coleção usa o perfil ativo (concessão e isolamento testados).
- [x] Compra com saldo insuficiente não entrega item. Testado automaticamente.
- [x] Cosmético comprado pode ser equipado; equipar não aumenta pontuação. Testado automaticamente.
- [x] 8 operações × 2 acertos permanecem no motor existente; verificação de sintaxe e testes de recompensas passam. Teste pedagógico de ponta a ponta no navegador ainda pendente.
- [x] Dados anteriores conservados pelo processo de migração, verificado por testes.
- [x] Deploy do Pages concluído com sucesso pelo GitHub Actions.

## Roadmap, fora deste pacote
Animações por spritesheets, trilhas sonoras locais, animação de abertura de baús, personagens originais com variação de expressões, customização corporal do avatar, mais coleções e painel dos responsáveis. Nenhum desses itens deve desviar do contrato pedagógico.

## Implementação na branch main
- `index.html`: 12 cards de região com arte, capa ilustrada, tela de capítulo, cena da missão, atalhos e tela de coleção. O núcleo pedagógico preexistente foi preservado.
- `assets/atlas-scenes.svg`: 12 paisagens, baú e Nilo em símbolos vetoriais originais, sem dependência de CDN.
- `assets/adventure.css`: redesign de telas, mapa, cartões, recompensa e responsividade.
- `assets/rewards.js`: economia determinística, migração de dados, baús, relíquias, compras e equipar.
- `tests/rewards.test.js`: migração, concessão única, baú não repetível, saldos, compra e isolamento de perfis.
- `.github/workflows/deploy-pages.yml`: verificação do JavaScript, testes da economia e validação XML dos assets antes do deploy.

**Pendente antes de considerar a direção visual encerrada:** revisão visual em aparelhos reais e testes end-to-end do ciclo de 16 acertos usando teclado e toque. As ilustrações atuais são vetoriais e editáveis; animações narrativas e avatares com roupas renderizadas em camadas ficam para a próxima entrega. 
