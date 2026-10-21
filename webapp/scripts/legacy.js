
const KEY='tabuadaquest.v0.1';
const AVATAR_BASES=[
{id:'luna',name:'Avatar da Alana',theme:'Lilás'},
{id:'sofia',name:'Avatar da Thaís',theme:'Rosa'},
{id:'maya',name:'Avatar da Heloísa',theme:'Turquesa'}];
const AVATAR_SKINS={
  luna:[
    {id:'original',name:'Original',asset:'avatar-luna-neutral-base.png',theme:'Princesa dos Números',price:0,sources:['starter']},
    {id:'pirate',name:'Pirata',asset:'avatar-luna-pirate.png',theme:'Aventura Pirata · Épico',price:180,sources:['coins']},
    {id:'pirata1',name:'Pirata 1',asset:'avatar-luna-pirata1.png',theme:'Piratas 01 · Épico',price:180,sources:['coins']},
    {id:'navigator2',name:'Capitã dos Navegadores',asset:'avatar-luna-navigator2.png',theme:'Baú das Tabuadas 1–2',price:0,sources:['table2_chest']},
    {id:'inventor3',name:'Inventora da Oficina',asset:'avatar-luna-inventor3.png',theme:'Baú das Tabuadas 3–4',price:0,sources:['table3_chest']},
    {id:'coelhinha',name:'Coelhinha Encantada',asset:'avatar-luna-coelhinha.png',theme:'Baú das Tabuadas 5–6',price:0,sources:['mastery56_chest']},
    {id:'havaiana',name:'Aventura Havaiana',asset:'avatar-luna-havaiana.png',theme:'Baú das Tabuadas 7–8',price:0,sources:['mastery78_chest']},
    {id:'lbug',name:'Joaninha Heroica',asset:'avatar-luna-lbug.png',theme:'Baú das Tabuadas 9–10',price:0,sources:['mastery910_chest']},
    {id:'penelope',name:'Penelope Glam',asset:'avatar-luna-penelope.png',theme:'Coleção Glam · Lendário',price:260,sources:['coins']}
  ],
  sofia:[
    {id:'original',name:'Original',asset:'avatar-sofia-neutral-base.png',theme:'Princesa dos Números',price:0,sources:['starter']},
    {id:'pirate',name:'Pirata',asset:'avatar-sofia-pirate.png',theme:'Aventura Pirata · Épico',price:180,sources:['coins']},
    {id:'pirata1',name:'Pirata 1',asset:'avatar-sofia-pirata1.png',theme:'Piratas 01 · Épico',price:180,sources:['coins']},
    {id:'navigator2',name:'Capitã dos Navegadores',asset:'avatar-sofia-navigator2.png',theme:'Baú das Tabuadas 1–2',price:0,sources:['table2_chest']},
    {id:'inventor3',name:'Inventora da Oficina',asset:'avatar-sofia-inventor3.png',theme:'Baú das Tabuadas 3–4',price:0,sources:['table3_chest']},
    {id:'coelhinha',name:'Coelhinha Encantada',asset:'avatar-sofia-coelhinha.png',theme:'Baú das Tabuadas 5–6',price:0,sources:['mastery56_chest']},
    {id:'havaiana',name:'Aventura Havaiana',asset:'avatar-sofia-havaiana.png',theme:'Baú das Tabuadas 7–8',price:0,sources:['mastery78_chest']},
    {id:'lbug',name:'Joaninha Heroica',asset:'avatar-sofia-lbug.png',theme:'Baú das Tabuadas 9–10',price:0,sources:['mastery910_chest']},
    {id:'penelope',name:'Penelope Glam',asset:'avatar-sofia-penelope.png',theme:'Coleção Glam · Lendário',price:260,sources:['coins']},
    {id:'panda_infinity_01',name:'Guardiã Panda do Infinito',asset:'avatar-sofia-panda-infinity-01.png',theme:'Coleção Panda Infinito · Exclusiva Thaís',price:500,sources:['coins']},
    {id:'panda_infinity_02',name:'Panda de Cristal Celestial',asset:'avatar-sofia-panda-infinity-02.png',theme:'Coleção Panda Infinito · Exclusiva Thaís',price:500,sources:['coins']},
    {id:'panda_infinity_03',name:'Panda Arcano Violeta',asset:'avatar-sofia-panda-infinity-03.png',theme:'Coleção Panda Infinito · Exclusiva Thaís',price:500,sources:['coins']},
    {id:'panda_infinity_04',name:'Panda Oráculo Estelar',asset:'avatar-sofia-panda-infinity-04.png',theme:'Coleção Panda Infinito · Exclusiva Thaís',price:500,sources:['coins']},
    {id:'panda_infinity_05',name:'Princesa Panda do Infinito',asset:'avatar-sofia-panda-infinity-05.png',theme:'Coleção Panda Infinito · Exclusiva Thaís',price:500,sources:['coins']}
  ],
  maya:[
    {id:'original',name:'Original',asset:'avatar-maya-neutral-base.png',theme:'Princesa dos Números',price:0,sources:['starter']},
    {id:'pirate',name:'Pirata',asset:'avatar-maya-pirate.png',theme:'Aventura Pirata · Épico',price:180,sources:['coins']},
    {id:'pirata1',name:'Pirata 1',asset:'avatar-maya-pirata1.png',theme:'Piratas 01 · Épico',price:180,sources:['coins']},
    {id:'navigator2',name:'Capitã dos Navegadores',asset:'avatar-maya-navigator2.png',theme:'Baú das Tabuadas 1–2',price:0,sources:['table2_chest']},
    {id:'inventor3',name:'Inventora da Oficina',asset:'avatar-maya-inventor3.png',theme:'Baú das Tabuadas 3–4',price:0,sources:['table3_chest']},
    {id:'coelhinha',name:'Coelhinha Encantada',asset:'avatar-maya-coelhinha.png',theme:'Baú das Tabuadas 5–6',price:0,sources:['mastery56_chest']},
    {id:'havaiana',name:'Aventura Havaiana',asset:'avatar-maya-havaiana.png',theme:'Baú das Tabuadas 7–8',price:0,sources:['mastery78_chest']},
    {id:'lbug',name:'Joaninha Heroica',asset:'avatar-maya-lbug.png',theme:'Baú das Tabuadas 9–10',price:0,sources:['mastery910_chest']},
    {id:'penelope',name:'Penelope Glam',asset:'avatar-maya-penelope.png',theme:'Coleção Glam · Lendário',price:260,sources:['coins']}
  ]
};
const CATALOG=[
{id:'pack_magic',cat:'package',asset:'pack-magic.webp',name:'Pacote Mágico',price:300,rarity:'Lendário',bundle:['frame_rainbow','frame_star','bg_space','fx_confetti','collect_wand']},
{id:'frame_rainbow',cat:'frame',asset:'frame-rainbow.webp',name:'Moldura Arco-íris',price:80,rarity:'Raro'},
{id:'frame_star',cat:'frame',asset:'frame-star.webp',name:'Moldura Estelar',price:95,rarity:'Épico'},
{id:'frame_champion',cat:'frame',asset:'frame-champion.webp',name:'Moldura Campeã',price:130,rarity:'Lendário'},
{id:'frame_floral',cat:'frame',asset:'frame-floral.webp',name:'Moldura Flores',price:90,rarity:'Raro'},
{id:'frame_pet_fox_autumn',cat:'frame',asset:'frame-pet-fox-autumn.png',name:'Raposa de Outono',price:150,fixedPrice:150,rarity:'Épico',source:'store'},
{id:'frame_pet_bear_honey',cat:'frame',asset:'frame-pet-bear-honey.png',name:'Ursinha do Mel',price:150,fixedPrice:150,rarity:'Épico',source:'store'},
{id:'frame_pet_chick_spring',cat:'frame',asset:'frame-pet-chick-spring.png',name:'Pintinho da Primavera',price:150,fixedPrice:150,rarity:'Épico',source:'store'},
{id:'frame_pet_frog_pond',cat:'frame',asset:'frame-pet-frog-pond.png',name:'Príncipe do Lago',price:150,fixedPrice:150,rarity:'Épico',source:'store'},
{id:'frame_pet_unicorn_rainbow',cat:'frame',asset:'frame-pet-unicorn-rainbow.png',name:'Unicórnio Arco-Íris',price:150,fixedPrice:150,rarity:'Épico',source:'store'},
{id:'frame_pet_penguin_frost',cat:'frame',asset:'frame-pet-penguin-frost.png',name:'Pinguim de Cristal',price:150,fixedPrice:150,rarity:'Épico',source:'store'},
{id:'frame_pet_bunny_dream',cat:'frame',asset:'frame-pet-bunny-dream.png',name:'Coelhinha dos Sonhos',price:150,fixedPrice:150,rarity:'Épico',source:'store'},
{id:'frame_pet_kitten_paws',cat:'frame',asset:'frame-pet-kitten-paws.png',name:'Gatinha Encantada',price:150,fixedPrice:150,rarity:'Épico',source:'store'},
{id:'frame_pet_panda_bamboo',cat:'frame',asset:'frame-pet-panda-bamboo.png',name:'Panda de Bambu',price:150,fixedPrice:150,rarity:'Épico',source:'store'},
{id:'frame_pet_puppy_friendship',cat:'frame',asset:'frame-pet-puppy-friendship.png',name:'Cãozinho da Amizade',price:150,fixedPrice:150,rarity:'Épico',source:'store'},
{id:'frame_panda_bamboo_guardian',cat:'frame',asset:'frame-panda-bamboo-guardian.png',name:'Guardião Panda de Bambu',price:150,fixedPrice:150,rarity:'Épico',source:'store'},
{id:'frame_panda_ninja',cat:'frame',asset:'frame-panda-ninja.png',name:'Panda Ninja das Marés',price:150,fixedPrice:150,rarity:'Épico',source:'store'},
{id:'frame_panda_cosmic',cat:'frame',asset:'frame-panda-cosmic.png',name:'Panda do Infinito Cósmico',price:0,rarity:'Oculto',shop:false,source:'mastery12'},
{id:'frame_infinity_sensei',cat:'frame',asset:'frame-infinity-sensei.png',name:'Sensei do Infinito',price:0,rarity:'Oculto',shop:false,source:'mastery12'},
{id:'frame_infinity_crystal',cat:'frame',asset:'frame-infinity-crystal.png',name:'Cristal do Infinito',price:0,rarity:'Oculto',shop:false,source:'mastery12'},
{id:'frame_panda_vault_cosmic',cat:'frame',asset:'frame-panda-vault-cosmic.png',name:'Panda Lunar Cósmico',price:0,rarity:'Oculto',shop:false,source:'pack_panda_infinity',collection:'panda_infinity_vault'},
{id:'frame_panda_vault_crystal',cat:'frame',asset:'frame-panda-vault-crystal.png',name:'Panda Cristal do Infinito',price:0,rarity:'Oculto',shop:false,source:'pack_panda_infinity',collection:'panda_infinity_vault'},
{id:'frame_panda_vault_royal',cat:'frame',asset:'frame-panda-vault-royal.png',name:'Panda Real Celestial',price:0,rarity:'Oculto',shop:false,source:'pack_panda_infinity',collection:'panda_infinity_vault'},
{id:'frame_panda_vault_ninja',cat:'frame',asset:'frame-panda-vault-ninja.png',name:'Panda Ninja do Infinito',price:0,rarity:'Oculto',shop:false,source:'pack_panda_infinity',collection:'panda_infinity_vault'},
{id:'frame_panda_vault_frost',cat:'frame',asset:'frame-panda-vault-frost.png',name:'Panda Glacial do Infinito',price:0,rarity:'Oculto',shop:false,source:'pack_panda_infinity',collection:'panda_infinity_vault'},
{id:'frame_curse_tide_beast',cat:'frame',asset:'frame-curse-tide-beast.png',name:'Fera das Marés',price:260,rarity:'Lendário',collection:'energia_amaldicoada'},
{id:'frame_curse_violet_eclipse',cat:'frame',asset:'frame-curse-violet-eclipse.png',name:'Eclipse Violeta',price:280,rarity:'Lendário',collection:'energia_amaldicoada'},
{id:'frame_curse_glacial_chain',cat:'frame',asset:'frame-curse-glacial-chain.png',name:'Correntes Glaciais',price:300,rarity:'Lendário',collection:'energia_amaldicoada'},
{id:'frame_curse_crimson_beast',cat:'frame',asset:'frame-curse-crimson-beast.png',name:'Fera Carmesim',price:320,rarity:'Lendário',collection:'energia_amaldicoada'},
{id:'bg_forest',cat:'background',asset:'bg-forest.webp',name:'Floresta Mágica',price:90,rarity:'Raro'},
{id:'bg_ocean',cat:'background',asset:'bg-beach.webp',name:'Praia Tropical',price:100,rarity:'Raro'},
{id:'bg_city',cat:'background',asset:'bg-city.webp',name:'Cidade Encantada',price:105,rarity:'Raro'},
{id:'bg_royal',cat:'background',asset:'bg-royal.webp',name:'Sala Real',price:120,rarity:'Épico'},
{id:'bg_space',cat:'background',asset:'bg-space.webp',name:'Espaço Cósmico',price:110,rarity:'Épico'},
{id:'bg_candy',cat:'background',asset:'bg-candy.webp',name:'Mundo Doce',price:125,rarity:'Épico'},
{id:'bg_dinos',cat:'background',asset:'bg-dinos.webp',name:'Mundo dos Dinos',price:115,rarity:'Épico'},
{id:'bg_kingdom',cat:'background',asset:'bg-kingdom.webp',name:'Reino Mágico',price:140,rarity:'Lendário'},
{id:'bg_farm',cat:'background',asset:'bg-farm.webp',name:'Fazenda Feliz',price:85,rarity:'Raro'},
{id:'bg_ice',cat:'background',asset:'bg-ice.webp',name:'Terra do Gelo',price:115,rarity:'Épico'},
{id:'fx_confetti',cat:'effect',asset:'fx-confetti.webp',name:'Explosão de Confetes',price:70,rarity:'Raro',fx:'confetti'},
{id:'fx_stars',cat:'effect',asset:'collect-medal.webp',name:'Brilho Estelar',price:90,rarity:'Épico',fx:'stars'},
{id:'fx_magic',cat:'effect',asset:'collect-wand.webp',name:'Explosão de Magia',price:0,rarity:'Lendário',fx:'magic'},
{id:'fx_papai',cat:'effect',asset:'papai-celebrate-02.png',name:'Papai Comemorando',price:0,rarity:'Especial',shop:false,source:'special',fx:'papai'},
{id:'fx_rainbow',cat:'effect',asset:'frame-rainbow.webp',name:'Onda Arco-Íris',price:120,rarity:'Épico',fx:'rainbow'},
{id:'fx_portal',cat:'effect',asset:'collect-potion.webp',name:'Portal Encantado Supremo',price:150,rarity:'Lendário',fx:'portal'},
{id:'fx_crown',cat:'effect',asset:'collect-medal.webp',name:'Coroa da Vitória',price:180,rarity:'Lendário',fx:'crown'},
{id:'collect_ball',cat:'collectible',asset:'collect-ball.webp',name:'Bola Mágica',price:55,rarity:'Raro'},
{id:'collect_wand',cat:'collectible',asset:'collect-wand.webp',name:'Varinha Estelar',price:100,rarity:'Épico'},
{id:'collect_potion',cat:'collectible',asset:'collect-potion.webp',name:'Poção Estelar',price:80,rarity:'Épico'},
{id:'collect_gift',cat:'collectible',asset:'collect-gift.webp',name:'Presente Mágico',price:95,rarity:'Épico'},
{id:'collect_medal',cat:'collectible',asset:'collect-medal.webp',name:'Medalha Estelar',price:110,rarity:'Lendário'},
{id:'collect_apple',cat:'collectible',asset:'collect-apple.webp',name:'Maçã Mágica',price:45,rarity:'Comum'},
{id:'collect_cookie',cat:'collectible',asset:'collect-cookie.webp',name:'Biscoito Estelar',price:45,rarity:'Comum'},
{id:'collect_carrot',cat:'collectible',asset:'collect-carrot.webp',name:'Cenoura Mágica',price:45,rarity:'Comum'},
{id:'collect_cloud_bed',cat:'collectible',asset:'collect-cloud-bed.webp',name:'Cama Nuvem',price:85,rarity:'Raro'},
{id:'collect_moon_bed',cat:'collectible',asset:'collect-moon-bed.webp',name:'Cama Lua',price:95,rarity:'Épico'},
{id:'frame_numbers',cat:'frame',asset:'frame-numbers.png',name:'Moldura Números Dourados',price:145,rarity:'Épico'},
{id:'frame_crystal',cat:'frame',asset:'frame-crystal.png',name:'Moldura Cristal Violeta',price:165,rarity:'Épico'},
{id:'frame_moon',cat:'frame',asset:'frame-moon.png',name:'Moldura Lua Matemática',price:180,rarity:'Lendário'},
{id:'bg_library',cat:'background',asset:'bg-library.png',name:'Biblioteca dos Números',price:160,rarity:'Épico'},
{id:'bg_equations',cat:'background',asset:'bg-equations.png',name:'Jardim das Equações',price:175,rarity:'Épico'},
{id:'bg_constellation',cat:'background',asset:'bg-constellation.png',name:'Constelações Matemáticas',price:190,rarity:'Lendário'},
{id:'fx_numbers',cat:'effect',asset:'fx-numbers.png',name:'Chuva de Números',price:145,rarity:'Épico',fx:'numbers'},
{id:'fx_constellation',cat:'effect',asset:'fx-constellation.png',name:'Constelação Matemática',price:175,rarity:'Lendário',fx:'constellation'},
{id:'fx_goldburst',cat:'effect',asset:'fx-goldburst.png',name:'Estouro Dourado',price:200,rarity:'Lendário',fx:'goldburst'},
{id:'pack_explorer',cat:'package',asset:'pack-explorer.png',name:'Pacote Aventura Mágica',price:420,rarity:'Épico',bundle:['frame_numbers','bg_library','fx_numbers','collect_ball','collect_potion']},
{id:'pack_starlight',cat:'package',asset:'pack-starlight.png',name:'Pacote Reino Estelar',price:520,rarity:'Lendário',bundle:['frame_crystal','bg_constellation','fx_constellation','collect_medal','collect_moon_bed']},
{id:'pack_royal',cat:'package',asset:'pack-royal.png',name:'Pacote Princesa dos Números',price:590,rarity:'Lendário',bundle:['frame_moon','bg_equations','fx_goldburst','collect_gift','collect_cloud_bed']},
{id:'pack_panda_infinity',cat:'package',asset:'pack-starlight.png',name:'Baú Panda do Infinito',price:600,fixedPrice:600,rarity:'Lendário',shop:true,source:'store',bundle:['frame_panda_vault_cosmic','frame_panda_vault_crystal','frame_panda_vault_royal','frame_panda_vault_ninja','frame_panda_vault_frost']},
{id:'chest_frame_secret',cat:'frame',asset:'frame-secret-royal.png',name:'Moldura Relíquia Real',price:0,rarity:'Relíquia',shop:false,source:'chest'},
{id:'chest_frame_astral_lotus',cat:'frame',asset:'chest-frame-astral-lotus.png',name:'Lótus Astral',price:0,rarity:'Relíquia',shop:false,source:'chest',collection:'energia_amaldicoada'},
{id:'chest_frame_tide_dragon',cat:'frame',asset:'chest-frame-tide-dragon.png',name:'Dragão das Marés',price:0,rarity:'Relíquia',shop:false,source:'chest',collection:'energia_amaldicoada'},
{id:'chest_frame_crimson_eclipse',cat:'frame',asset:'chest-frame-crimson-eclipse.png',name:'Eclipse Carmesim',price:0,rarity:'Relíquia',shop:false,source:'chest',collection:'energia_amaldicoada'},
{id:'chest_frame_celestial_crystal',cat:'frame',asset:'chest-frame-celestial-crystal.png',name:'Cristal Celestial',price:0,rarity:'Relíquia',shop:false,source:'chest',collection:'energia_amaldicoada'},
{id:'chest_frame_pirate_golden_nautical',cat:'frame',asset:'chest-frame-pirate-golden-nautical.png',name:'Náutica Pirata Dourada',price:0,rarity:'Épico',shop:false,source:'chest',collection:'aventura_pirata'},
{id:'chest_frame_pirate_fantastic_treasures',cat:'frame',asset:'chest-frame-pirate-fantastic-treasures.png',name:'Tesouros Fantásticos',price:0,rarity:'Lendário',shop:false,source:'chest',collection:'aventura_pirata'},
{id:'chest_frame_pirate_treasure',cat:'frame',asset:'chest-frame-pirate-treasure.png',name:'Tesouro do Navegador',price:0,rarity:'Épico',shop:false,source:'chest',collection:'aventura_pirata'},
{id:'chest_frame_pirate_waves_gems',cat:'frame',asset:'chest-frame-pirate-waves-gems.png',name:'Ondas e Gemas do Tesouro',price:0,rarity:'Lendário',shop:false,source:'chest',collection:'aventura_pirata'},
{id:'table2_bg_pirate_bay',cat:'background',asset:'table2-bg-pirate-bay.png',name:'Baía Pirata Encantada',price:0,rarity:'Épico',shop:false,source:'table2_chest',collection:'aventura_pirata'},
{id:'table2_bg_pirate_port',cat:'background',asset:'table2-bg-pirate-port.png',name:'Porto dos Navegadores ao Pôr do Sol',price:0,rarity:'Lendário',shop:false,source:'table2_chest',collection:'aventura_pirata'},
{id:'table2_fx_nautical_treasure',cat:'effect',asset:'table2-fx-nautical-treasure.png',name:'Explosão do Tesouro Náutico',price:0,rarity:'Lendário',shop:false,source:'table2_chest',collection:'aventura_pirata',fx:'asset'},
{id:'table3_bg_inventor_workshop',cat:'background',asset:'table3-bg-inventor-workshop.png',name:'Oficina Fantástica do Inventor',price:0,rarity:'Épico',shop:false,source:'table3_chest',collection:'inventores_banana'},
{id:'table3_bg_mechanical_square',cat:'background',asset:'table3-bg-mechanical-square.png',name:'Praça Mecânica Colorida',price:0,rarity:'Lendário',shop:false,source:'table3_chest',collection:'inventores_banana'},
{id:'table3_fx_gears_bananas',cat:'effect',asset:'table3-fx-gears-bananas.png',name:'Explosão de Engrenagens e Bananas',price:0,rarity:'Lendário',shop:false,source:'table3_chest',collection:'inventores_banana',fx:'asset'},
{id:'chest_bg_secret',cat:'background',asset:'bg-secret-vault.png',name:'Cofre Secreto dos Números',price:0,rarity:'Relíquia',shop:false,source:'chest'},
{id:'chest_fx_phoenix',cat:'effect',asset:'fx-phoenix.png',name:'Fênix Numérica',price:0,rarity:'Relíquia',shop:false,source:'legacy-chest',fx:'phoenix'},
{id:'chest_collect_star_sum',cat:'collectible',asset:'chest-collect-star-sum.png',name:'Estrela da Soma',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_collect_crystal_multiply',cat:'collectible',asset:'chest-collect-crystal-multiply.png',name:'Cristal da Multiplicação',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_collect_orb_division',cat:'collectible',asset:'chest-collect-orb-division.png',name:'Orbe da Divisão',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_collect_medal_subtract',cat:'collectible',asset:'chest-collect-medal-subtract.png',name:'Medalha da Subtração',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_collect_mathmage_coin',cat:'collectible',asset:'chest-collect-mathmage-coin.png',name:'Moeda do Matemago',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_collect_number_scroll',cat:'collectible',asset:'chest-collect-number-scroll.png',name:'Pergaminho dos Números',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_collect_knowledge_key',cat:'collectible',asset:'chest-collect-knowledge-key.png',name:'Chave do Conhecimento',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_collect_times_orb',cat:'collectible',asset:'chest-collect-times-orb.png',name:'Orbe da Tabuada',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_collect_calc_potion',cat:'collectible',asset:'chest-collect-calc-potion.png',name:'Poção do Cálculo',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_collect_times_book',cat:'collectible',asset:'chest-collect-times-book.png',name:'Livro das Multiplicações',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_collect_sea_star_coin',cat:'collectible',asset:'chest-collect-sea-star-coin.png',name:'Moeda Estrela do Navegador',price:120,rarity:'Raro',shop:true,source:'store',collection:'aventura_pirata'},
{id:'chest_collect_treasure_compass',cat:'collectible',asset:'chest-collect-treasure-compass.png',name:'Bússola do Tesouro Matemático',price:145,rarity:'Épico',shop:true,source:'store',collection:'aventura_pirata'},
{id:'chest_collect_adventure_map',cat:'collectible',asset:'chest-collect-adventure-map.png',name:'Mapa da Aventura Matemática',price:135,rarity:'Épico',shop:true,source:'store',collection:'aventura_pirata'},
{id:'chest_collect_number_pearl',cat:'collectible',asset:'chest-collect-number-pearl.png',name:'Pérola dos Números',price:155,rarity:'Épico',shop:true,source:'store',collection:'aventura_pirata'},
{id:'chest_bg_number_valley',cat:'background',asset:'chest-bg-number-valley.png',name:'Vale dos Números',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_bg_rainbow_sky',cat:'background',asset:'chest-bg-rainbow-sky.png',name:'Céu Arco-Íris',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_bg_starry_night',cat:'background',asset:'chest-bg-starry-night.png',name:'Noite Estrelada',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_bg_magic_castle',cat:'background',asset:'chest-bg-magic-castle.png',name:'Castelo Matemágico',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_bg_enchanted_library',cat:'background',asset:'chest-bg-enchanted-library.png',name:'Biblioteca Encantada',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_bg_mushroom_forest',cat:'background',asset:'chest-bg-mushroom-forest.png',name:'Floresta dos Cogumelos',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_bg_crystal_cave',cat:'background',asset:'chest-bg-crystal-cave.png',name:'Caverna de Cristais',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_bg_cloud_kingdom',cat:'background',asset:'chest-bg-cloud-kingdom.png',name:'Reino das Nuvens',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_bg_challenge_island',cat:'background',asset:'chest-bg-challenge-island.png',name:'Ilha dos Desafios',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_bg_number_desert',cat:'background',asset:'chest-bg-number-desert.png',name:'Deserto dos Números',price:0,rarity:'Baú',shop:false,source:'chest'},
{id:'chest_bg_pirate_island',cat:'background',asset:'chest-bg-pirate-island.png',name:'Ilha dos Navegadores',price:210,rarity:'Épico',shop:true,source:'store',collection:'aventura_pirata'},
{id:'chest_bg_pirate_harbor',cat:'background',asset:'chest-bg-pirate-harbor.png',name:'Porto dos Aventureiros',price:225,rarity:'Épico',shop:true,source:'store',collection:'aventura_pirata'},
{id:'chest_bg_treasure_cave',cat:'background',asset:'chest-bg-treasure-cave.png',name:'Gruta do Tesouro',price:250,rarity:'Lendário',shop:true,source:'store',collection:'aventura_pirata'},
{id:'chest_fx_golden_spark',cat:'effect',asset:'chest-fx-golden-spark.png',name:'Faísca Dourada',price:0,rarity:'Baú',shop:false,source:'chest',fx:'asset'},
{id:'chest_fx_star_rain',cat:'effect',asset:'chest-fx-star-rain.png',name:'Chuva de Estrelas',price:0,rarity:'Baú',shop:false,source:'chest',fx:'asset'},
{id:'chest_fx_number_confetti',cat:'effect',asset:'chest-fx-number-confetti.png',name:'Confete Numérico',price:0,rarity:'Baú',shop:false,source:'chest',fx:'asset'},
{id:'chest_fx_rainbow_burst',cat:'effect',asset:'chest-fx-rainbow-burst.png',name:'Explosão Arco-Íris',price:0,rarity:'Baú',shop:false,source:'chest',fx:'asset'},
{id:'chest_fx_magic_spiral',cat:'effect',asset:'chest-fx-magic-spiral.png',name:'Espiral Mágica',price:0,rarity:'Baú',shop:false,source:'chest',fx:'asset'},
{id:'chest_fx_streak_flame',cat:'effect',asset:'chest-fx-streak-flame.png',name:'Chama da Sequência',price:0,rarity:'Baú',shop:false,source:'chest',fx:'asset'},
{id:'chest_fx_math_lightning',cat:'effect',asset:'chest-fx-math-lightning.png',name:'Raio Matemático',price:0,rarity:'Baú',shop:false,source:'chest',fx:'asset'},
{id:'chest_fx_crystal_burst',cat:'effect',asset:'chest-fx-crystal-burst.png',name:'Explosão de Cristais',price:0,rarity:'Baú',shop:false,source:'chest',fx:'asset'},
{id:'chest_fx_number_bubbles',cat:'effect',asset:'chest-fx-number-bubbles.png',name:'Bolhas Numéricas',price:0,rarity:'Baú',shop:false,source:'chest',fx:'asset'},
{id:'chest_fx_math_hearts',cat:'effect',asset:'chest-fx-math-hearts.png',name:'Corações Matemáticos',price:0,rarity:'Baú',shop:false,source:'chest',fx:'asset'},
{id:'chest_fx_treasure_burst',cat:'effect',asset:'chest-fx-treasure-burst.png',name:'Explosão do Tesouro',price:170,rarity:'Épico',shop:true,source:'store',collection:'aventura_pirata',fx:'asset'},
{id:'chest_fx_pirate_stars',cat:'effect',asset:'chest-fx-pirate-stars.png',name:'Estrelas dos Navegadores',price:185,rarity:'Épico',shop:true,source:'store',collection:'aventura_pirata',fx:'asset'},
{id:'chest_fx_sea_vortex',cat:'effect',asset:'chest-fx-sea-vortex.png',name:'Redemoinho do Tesouro',price:210,rarity:'Lendário',shop:true,source:'store',collection:'aventura_pirata',fx:'asset'}];
const STORE_TABS=[['all','Destaques'],['frame','Molduras'],['background','Fundos'],['collectible','Colecionáveis'],['effect','Efeitos'],['package','Pacotes']];
const CHEST_FRAME_IDS=CATALOG.filter(x=>x.source==='chest'&&x.cat==='frame').map(x=>x.id);
const CHEST_COLLECTIBLE_IDS=CATALOG.filter(x=>x.source==='chest'&&x.cat==='collectible').map(x=>x.id);
const CHEST_BACKGROUND_IDS=CATALOG.filter(x=>x.source==='chest'&&x.cat==='background').map(x=>x.id);
const CHEST_EFFECT_IDS=CATALOG.filter(x=>x.source==='chest'&&x.cat==='effect').map(x=>x.id);
const CHEST_EXCLUSIVE_IDS=[...CHEST_FRAME_IDS,...CHEST_COLLECTIBLE_IDS,...CHEST_BACKGROUND_IDS,...CHEST_EFFECT_IDS];
const CHEST_CONTENT={fashion:1,frame:3,background:2,effect:1};
const CHEST_TYPES=[
{id:'magic',name:'Baú Encantado',rarity:'Raro',theme:'Magia clássica',asset:'pack-magic.webp',sprite:'magic',kicker:'TESOURO ENCANTADO',desc:'Relíquias mágicas clássicas para começar a coleção.',gradient:'linear-gradient(135deg,#4d178d,#8f3fe2)'},
{id:'pirate',name:'Baú dos Navegadores',rarity:'Épico',theme:'Aventura pirata',asset:'pack-explorer.png',sprite:'pirate',kicker:'TESOURO PIRATA',desc:'Tema pirata com foco em recompensas de aventura, tesouro e molduras náuticas exclusivas.',gradient:'linear-gradient(135deg,#0d5171,#1ea3bf)'},
{id:'starlight',name:'Baú Estelar',rarity:'Lendário',theme:'Reino estelar',asset:'pack-starlight.png',sprite:'starlight',kicker:'TESOURO ESTELAR',desc:'Baú brilhante com vibe astral, cristalina e cósmica.',gradient:'linear-gradient(135deg,#5a1b94,#b05cff)'},
{id:'royal',name:'Baú Relíquia Real',rarity:'Relíquia',theme:'Coroa dos números',asset:'pack-royal.png',sprite:'royal',kicker:'TESOURO REAL',desc:'O mais nobre de todos: relíquias reais e itens super raros.',gradient:'linear-gradient(135deg,#70450b,#e8a62a)'}
];
const CHEST_REQUIREMENTS=[3,5,7,9];
function chestRequirement(index){return CHEST_REQUIREMENTS[index]||10}
function chestProgressInfo(p){const sessions=Number(p?.stats?.sessions||0),claimed=Number(p?.stats?.chestsClaimed||0);let used=0,earned=0;while(used+chestRequirement(earned)<=sessions){used+=chestRequirement(earned);earned++}const nextReq=chestRequirement(earned),into=Math.max(0,sessions-used);return {sessions,claimed,earned,available:Math.max(0,earned-claimed),nextReq,into:Math.min(into,nextReq)}}
function chestTypeAt(index){return CHEST_TYPES[index%CHEST_TYPES.length]}
function nextChestType(p){return chestTypeAt(Number(p?.stats?.chestsClaimed||0))}
function chestRarityClass(r){return String(r||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function chestThemeScore(type,x){const blob=`${x.id} ${x.asset||''} ${x.collection||''}`.toLowerCase();if(type.id==='pirate')return (blob.includes('pirate')||blob.includes('treasure')||blob.includes('compass')||blob.includes('adventure')||blob.includes('sea')||blob.includes('harbor')||blob.includes('island')||blob.includes('nautical')||blob.includes('waves')||blob.includes('gems')||x.collection==='aventura_pirata')?5:(x.source==='chest'?1:0);if(type.id==='starlight')return (blob.includes('star')||blob.includes('astral')||blob.includes('celestial')||blob.includes('crystal')||blob.includes('cloud')||blob.includes('rainbow')||blob.includes('night'))?5:(x.source==='chest'?1:0);if(type.id==='royal')return (blob.includes('royal')||blob.includes('secret')||blob.includes('gold')||blob.includes('castle')||blob.includes('crown'))?5:(x.source==='chest'?2:0);return x.source==='chest'&&!x.collection?3:1}
function pickThemedItems(pool,count,type){const bag=[...pool],out=[];while(bag.length&&out.length<count){let bestScore=Math.max(...bag.map(x=>chestThemeScore(type,x)));const source=bestScore>0?bag.filter(x=>chestThemeScore(type,x)===bestScore):bag;const chosen=source[Math.floor(Math.random()*source.length)];out.push(chosen);bag.splice(bag.indexOf(chosen),1)}return out}
let chestRevealBusy=false,chestLastReveal=null
const TABLE2_CHEST={name:'Baú dos Navegadores',rarity:'Épico',theme:'Domínio da Tabuada do 2',asset:'table2-chest-nautical.png'};
const TABLE2_CHEST_FRAME_IDS=['chest_frame_pirate_golden_nautical','chest_frame_pirate_fantastic_treasures','chest_frame_pirate_treasure','chest_frame_pirate_waves_gems'];
const TABLE2_CHEST_BACKGROUND_IDS=['table2_bg_pirate_bay','table2_bg_pirate_port'];
const TABLE2_CHEST_EFFECT_ID='table2_fx_nautical_treasure';
let table2ChestBusy=false,table2ChestLastReveal=null;
const TABLE3_CHEST={name:'Baú dos Inventores',rarity:'Épico',theme:'Domínio da Tabuada do 3',asset:'pack-magic.webp'};
const TABLE3_CHEST_BACKGROUND_IDS=['table3_bg_inventor_workshop','table3_bg_mechanical_square'];
const TABLE3_CHEST_EFFECT_ID='table3_fx_gears_bananas';
let table3ChestBusy=false,table3ChestLastReveal=null;
// Cadastro central da galeria. Para adicionar um novo baú especial, basta inserir um objeto aqui
// e implementar somente sua função de recompensa quando o tipo ainda não existir.
const SPECIAL_CHEST_GALLERY=[
{id:'mastery2',kind:'mastery',table:2,name:'Baú dos Navegadores ×2',rarity:'Épico',theme:'Primeiro domínio da Tabuada do 2',sprite:'table2',pendingFlag:'table2PirateChestPending',claimedFlag:'table2PirateChestClaimed',rewardKind:'table2'},
{id:'mastery3',kind:'mastery',table:3,name:'Baú dos Inventores ×3',rarity:'Épico',theme:'Primeiro domínio da Tabuada do 3',sprite:'inventor',pendingFlag:'table3InventorChestPending',claimedFlag:'table3InventorChestClaimed',rewardKind:'table3'}
];
const CHEST_SPRITE_FRAME_COUNT=6;
let chestGalleryBusy=false,chestGalleryCurrent=null,chestGalleryTimer=null;
function chestSpriteFrames(key){return Array.from({length:CHEST_SPRITE_FRAME_COUNT},(_,i)=>`chest-${key}-frame-${i}.webp`)}
function chestClosedAsset(def){return chestSpriteFrames(def.sprite)[0]}
function chestOpenAsset(def){return chestSpriteFrames(def.sprite)[CHEST_SPRITE_FRAME_COUNT-1]}
function activityChestUnlockSessions(index){let total=0;for(let i=0;i<=index;i++)total+=chestRequirement(i);return total}
function activityChestDefinition(index){const type=chestTypeAt(index),cycle=Math.floor(index/CHEST_TYPES.length)+1;return {id:`activity_${index}`,kind:'activity',activityIndex:index,name:type.name+(cycle>1?` · Ciclo ${cycle}`:''),rarity:type.rarity,theme:type.theme,sprite:type.sprite||type.id,rewardKind:'activity'}}
function chestGalleryDefinitions(p){const claimed=Math.max(0,Number(p?.stats?.chestsClaimed||0)),info=chestProgressInfo(p),count=Math.max(CHEST_TYPES.length,claimed+1,Math.min(claimed+2,info.earned+1)),arr=[];for(let i=0;i<count;i++)arr.push(activityChestDefinition(i));return [...SPECIAL_CHEST_GALLERY,...arr]}
function chestGalleryState(p,def){if(def.kind==='mastery'){if(p?.flags?.[def.claimedFlag])return 'opened';if(p?.flags?.[def.pendingFlag]||tableMastered(p,def.table))return 'ready';return 'locked'}const info=chestProgressInfo(p),claimed=Number(p?.stats?.chestsClaimed||0);if(def.activityIndex<claimed)return 'opened';if(def.activityIndex===claimed&&info.available>0)return 'ready';return 'locked'}
function chestGalleryUnlockText(p,def,state){if(state==='opened')return 'Tesouro já conquistado';if(state==='ready')return 'Disponível para abrir agora';if(def.kind==='mastery')return `Domine a Tabuada do ${def.table} pela primeira vez`;const target=activityChestUnlockSessions(def.activityIndex),left=Math.max(0,target-Number(p?.stats?.sessions||0));if(def.activityIndex>Number(p?.stats?.chestsClaimed||0)&&left===0)return 'Abra o baú anterior primeiro';return `Faltam ${left} atividade${left===1?'':'s'}`}
function chestGalleryReadyCount(p){return chestGalleryDefinitions(p).filter(def=>chestGalleryState(p,def)==='ready').length}

const DAILY_REWARDS=[
{kind:'coins',amount:80},{kind:'gems',amount:5},{kind:'coins',amount:120},{kind:'coins',amount:100},{kind:'gems',amount:6},{kind:'coins',amount:150},{kind:'fashion'},
{kind:'coins',amount:100},{kind:'gems',amount:6},{kind:'coins',amount:140},{kind:'coins',amount:120},{kind:'gems',amount:8},{kind:'coins',amount:180},{kind:'chest'},
{kind:'coins',amount:120},{kind:'gems',amount:8},{kind:'coins',amount:160},{kind:'coins',amount:140},{kind:'gems',amount:10},{kind:'coins',amount:200},{kind:'chest'},
{kind:'coins',amount:140},{kind:'gems',amount:10},{kind:'coins',amount:180},{kind:'coins',amount:160},{kind:'gems',amount:12},{kind:'coins',amount:220},{kind:'coins',amount:200},{kind:'gems',amount:15},{kind:'chest'}
];
const WORLD_META={
1:{name:'Jardim do Primeiro Passo',card:'world_map_01.webp',practice:'world-practice-01.png'},
2:{name:'Floresta da Dupla',card:'world_map_02.webp',practice:'world-practice-02.png'},
3:{name:'Porto Pirata',card:'world_map_03.webp',practice:'world-practice-03.png'},
4:{name:'Oficina dos Inventores',card:'world_map_04.webp',practice:'world-practice-04.png'},
5:{name:'Ilha dos Navegadores',card:'world_map_05.webp',practice:'world-practice-05.png'},
6:{name:'Reino dos Doces',card:'world_map_06.webp',practice:'world-practice-06.png'},
7:{name:'Vila das Joaninhas',card:'world_map_07.webp',practice:'world-practice-07.png'},
8:{name:'Mina de Cristais',card:'world_map_08.webp',practice:'world-practice-08.png'},
9:{name:'Jardim Astral',card:'world_map_09.webp',practice:'world-practice-09.png'},
10:{name:'Fortaleza do Corsário',card:'world_map_10.webp',practice:'world-practice-10.png'}
};
const COLLECTION_TABS=[['all','Todos'],['Comum','Comuns'],['Raro','Raros'],['Épico','Épicos'],['Lendário','Lendários']];
let collectionFilter='all',collectionSelectedId=null;
const FX_TIMING={good:1780,bad:1660,papaiBad:2940};
const PAPAI_ERROR_ENTRANCE_DELAY=320;

let storeCat='all',inventoryCat='frame',vaultSelectedId=null,session=null,locked=false,state=load(),backgroundPreviewId=null;
const FAMILY_PLAYERS=[{key:'alana',name:'Alana',avatar:'luna',tone:'purple'},{key:'thais',name:'Thaís',avatar:'sofia',tone:'pink'},{key:'heloisa',name:'Heloísa',avatar:'maya',tone:'teal'}];
let entrySelectedId=null;
function uid(){return 'p_'+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function blank(){return {profiles:[],activeId:null}}
function fixedAvatarForName(name){const n=String(name||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();if(n==='thais')return 'sofia';if(n==='heloisa')return 'maya';return 'luna'}
function profileDefaults(name){return {id:uid(),name,coins:10000,gems:45,xp:0,owned:['fx_magic','fx_papai'],fashionOwned:['original'],quantities:{},equipped:{frame:null,background:null,effect:'fx_papai'},avatar:{id:fixedAvatarForName(name),skinId:'original'},flags:{v05TestCoins:true,v08AvatarFixed:true,v09SpacedReview:true,v10AvatarFashion:true,v11FashionEconomy:true,v0924PapaiEffect:true},stats:{correct:0,wrong:0,sessions:0,masteredDecks:{}},learning:{tables:{}},history:[]}}
function item(id){return CATALOG.find(x=>x.id===id)}
function owns(p,id){return p.owned.includes(id)}
function syncTable2ChestEntitlements(p){
  if(!p?.flags?.table2PirateChestClaimed)return;
  p.owned=Array.isArray(p.owned)?p.owned:[];p.fashionOwned=Array.isArray(p.fashionOwned)?p.fashionOwned:['original'];
  if(!p.fashionOwned.includes('navigator2'))p.fashionOwned.push('navigator2');
  for(const id of TABLE2_CHEST_BACKGROUND_IDS)if(!p.owned.includes(id))p.owned.push(id);
  if(!p.owned.includes(TABLE2_CHEST_EFFECT_ID))p.owned.push(TABLE2_CHEST_EFFECT_ID);
  const ownedFrames=TABLE2_CHEST_FRAME_IDS.filter(id=>p.owned.includes(id));
  if(ownedFrames.length<3){for(const id of TABLE2_CHEST_FRAME_IDS){if(!p.owned.includes(id)){p.owned.push(id);ownedFrames.push(id)}if(ownedFrames.length>=3)break}}
  p.flags.table2PirateChestSynced=true;
}
function syncTable3ChestEntitlements(p){
  if(!p?.flags?.table3InventorChestClaimed)return;
  p.owned=Array.isArray(p.owned)?p.owned:[];p.fashionOwned=Array.isArray(p.fashionOwned)?p.fashionOwned:['original'];
  if(!p.fashionOwned.includes('inventor3'))p.fashionOwned.push('inventor3');
  for(const id of TABLE3_CHEST_BACKGROUND_IDS)if(!p.owned.includes(id))p.owned.push(id);
  if(!p.owned.includes(TABLE3_CHEST_EFFECT_ID))p.owned.push(TABLE3_CHEST_EFFECT_ID);
  p.flags.table3InventorChestSynced=true;
}
function tableMasteredRaw(p,n){return !!p?.learning?.tables?.[String(n)]?.masteredAt}
function migrateProfile(p){
  p.coins=Number(p.coins||0);p.gems=Number.isFinite(Number(p.gems))?Number(p.gems):45;p.xp=Number(p.xp||0);p.owned=Array.isArray(p.owned)?p.owned:[];p.quantities=p.quantities||{};p.flags=p.flags||{};
  if(!p.flags.v05TestCoins){p.coins=Math.max(10000,p.coins);p.flags.v05TestCoins=true}
  const removed=['acc_bow','acc_glasses','acc_hat','acc_wings','acc_collar','acc_crown','acc_cape'];p.owned=p.owned.filter(id=>!removed.includes(id));
  p.equipped=p.equipped||{};p.equipped.frame=p.equipped.frame||null;p.equipped.background=p.equipped.background||null;p.equipped.effect=p.equipped.effect||null;delete p.equipped.profileCrown;delete p.equipped.accessory;
  p.owned=p.owned.filter(id=>!['skin_base','skin_fairy','skin_warrior'].includes(id));
  const avatarId=fixedAvatarForName(p.name),availableSkins=AVATAR_SKINS[avatarId]||[];const previousSkin=p.avatar&&p.avatar.skinId;
  p.fashionOwned=Array.isArray(p.fashionOwned)?p.fashionOwned.filter(id=>availableSkins.some(x=>x.id===id)):['original'];
  if(!p.fashionOwned.includes('original'))p.fashionOwned.unshift('original');
  if(!p.flags.v11FashionEconomy&&previousSkin&&previousSkin!=='original'&&availableSkins.some(x=>x.id===previousSkin)&&!p.fashionOwned.includes(previousSkin))p.fashionOwned.push(previousSkin);
  const safeSkin=availableSkins.some(x=>x.id===previousSkin)&&p.fashionOwned.includes(previousSkin)?previousSkin:'original';p.avatar={id:avatarId,skinId:safeSkin};p.flags.v10AvatarFashion=true;p.flags.v11FashionEconomy=true;
  for(const pack of CATALOG.filter(x=>x.bundle)){if(p.owned.includes(pack.id)){for(const id of pack.bundle)if(!p.owned.includes(id))p.owned.push(id)}}
  delete p.avatarPhoto;delete p.avatarEquip;delete p.avatarBase;
  p.stats=p.stats||{correct:0,wrong:0,sessions:0,masteredDecks:{}};p.stats.masteredDecks=p.stats.masteredDecks||{};p.stats.chestsClaimed=Number(p.stats.chestsClaimed||0);p.history=Array.isArray(p.history)?p.history:[];p.daily=p.daily&&typeof p.daily==='object'?p.daily:{progress:0,lastClaimDate:null,cycle:1};p.daily.progress=clamp(Number(p.daily.progress||0),0,29);p.daily.cycle=Math.max(1,Number(p.daily.cycle||1));delete p.flags.dailyClaimedToday;
  p.learning=p.learning&&typeof p.learning==='object'?p.learning:{tables:{}};p.learning.tables=p.learning.tables||{};
  for(let n=1;n<=10;n++){const k=String(n),legacy=p.stats.masteredDecks[k]||p.stats.masteredDecks[n],cur=p.learning.tables[k]||{};if(legacy&&!cur.masteredAt){cur.masteredAt=Number(legacy.at||Date.now());cur.reviewStage=0;cur.nextReviewAt=Date.now();cur.lastReviewAt=null;cur.reviewCount=0;cur.lapses=0}p.learning.tables[k]=cur}if(!p.learning.tables['1']?.masteredAt){const later=Object.entries(p.learning.tables).filter(([k,v])=>Number(k)>=2&&v?.masteredAt).map(([,v])=>Number(v.masteredAt)).filter(Boolean);if(later.length){p.learning.tables['1']={masteredAt:Math.min(...later),reviewStage:0,nextReviewAt:Date.now(),lastReviewAt:null,reviewCount:0,lapses:0,legacy:true};p.stats.masteredDecks[1]=p.stats.masteredDecks[1]||{at:p.learning.tables['1'].masteredAt,legacy:true}}}
  if(!p.owned.includes('fx_magic'))p.owned.push('fx_magic');
  if(!p.flags.v0924PapaiEffect){if(!p.owned.includes('fx_papai'))p.owned.push('fx_papai');p.equipped.effect='fx_papai';p.flags.v0924PapaiEffect=true}
  if(!p.equipped.effect)p.equipped.effect='fx_papai';
  syncTable2ChestEntitlements(p);syncTable3ChestEntitlements(p);if(tableMasteredRaw(p,2)&&!p.flags.table2PirateChestClaimed&&!p.flags.table2PirateChestPending)p.flags.table2PirateChestPending=true;if(tableMasteredRaw(p,3)&&!p.flags.table3InventorChestClaimed&&!p.flags.table3InventorChestPending)p.flags.table3InventorChestPending=true;
  p.flags.v09SpacedReview=true;p.flags.v08AvatarFixed=true;delete p.flags.v08AvatarV2;return p
}
function load(){try{const v=JSON.parse(localStorage.getItem(KEY));if(v&&Array.isArray(v.profiles)){v.profiles.forEach(migrateProfile);localStorage.setItem(KEY,JSON.stringify(v));return v}}catch(e){}return blank()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){console.warn('Storage indisponível; sessão continuará em memória.',e)}}
function normalizedName(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase()}
function ensureFamilyProfiles(){
  FAMILY_PLAYERS.forEach(def=>{
    let p=state.profiles.find(x=>normalizedName(x.name)===normalizedName(def.name));
    if(!p){p=profileDefaults(def.name);p.flags=p.flags||{};p.flags.familyEntry=true;state.profiles.push(p)}
    p.name=def.name;p.avatar={...(p.avatar||{}),id:def.avatar};migrateProfile(p);
  });
  save();
}
function familyProfile(def){return state.profiles.find(p=>normalizedName(p.name)===normalizedName(def.name))||null}
function active(){return state.profiles.find(p=>p.id===state.activeId)||null}
function esc(s){return String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]))}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function levelFor(xp){return Math.floor((xp||0)/100)+1}
function xpInto(xp){return (xp||0)%100}
function ensureActive(){if(!active()){showEntry();return false}return true}
function assetHTML(x,cls=''){return x?.asset?`<img class="${cls}" src="${x.asset}" alt="${esc(x.name)}">`:''}
function coinHTML(){return '<img class="coin-inline" src="coin.webp" alt="moeda">'}
function frameHTML(p){const fr=item(p?.equipped?.frame);return fr?.asset?`<img class="avatar-frame" src="${fr.asset}" alt="">`:''}
function avatarDef(p){const id=fixedAvatarForName(p?.name);return AVATAR_BASES.find(a=>a.id===id)||AVATAR_BASES[0]}
function avatarSkins(p){return AVATAR_SKINS[avatarDef(p).id]||[]}
function fashionOwned(p,skinId){return skinId==='original'||!!p?.fashionOwned?.includes(skinId)}
function fashionMissingForSource(p,source){return avatarSkins(p).filter(x=>x.id!=='original'&&!fashionOwned(p,x.id)&&(x.sources||[]).includes(source))}
function grantFashionReward(p,source){const pool=fashionMissingForSource(p,source);if(!pool.length)return null;const skin=pool[Math.floor(Math.random()*pool.length)];p.fashionOwned=p.fashionOwned||['original'];if(!p.fashionOwned.includes(skin.id))p.fashionOwned.push(skin.id);return skin}
function fashionSourceChips(skin){const chips=[];if((skin.sources||[]).includes('coins'))chips.push(`<span class="fashion-source-chip"><img src="fashion-icon-coin.png" alt="">Moedas</span>`);if((skin.sources||[]).includes('chest'))chips.push(`<span class="fashion-source-chip"><img src="fashion-icon-chest.png" alt="">Baú</span>`);if((skin.sources||[]).includes('daily'))chips.push(`<span class="fashion-source-chip"><img src="fashion-icon-daily.png" alt="">Diária</span>`);if((skin.sources||[]).includes('table2_chest'))chips.push(`<span class="fashion-source-chip"><img src="fashion-icon-chest.png" alt="">Domine ×2</span>`);if((skin.sources||[]).includes('table3_chest'))chips.push(`<span class="fashion-source-chip"><img src="fashion-icon-chest.png" alt="">Domine ×3</span>`);return chips.join('')}
function avatarSkin(p){const skins=avatarSkins(p),id=p?.avatar?.skinId||'original';return skins.find(x=>x.id===id)||skins[0]||{id:'original',name:'Original',asset:`avatar-${avatarDef(p).id}-neutral-base.png`,theme:'Original'}}
function avatarAsset(p){return avatarSkin(p).asset}
function avatarHTML(p,size='mini',showLevel=true){if(!p)return '<div class="avatar-wrap"><div class="avatar-portrait"></div></div>';return `<div class="avatar-composite size-${size}"><span class="avatar-glow"></span><div class="avatar-wrap"><div class="avatar-portrait"><img class="avatar-portrait-v2" src="${avatarAsset(p)}" alt="Avatar de ${esc(p.name)}"></div>${frameHTML(p)}</div>${showLevel?`<span class="avatar-level-seal">NV ${levelFor(p.xp)}</span>`:''}</div>`}
function avatarStageHTML(p){return `<div class="avatar-figure"><img class="avatar-main-v2" src="${avatarAsset(p)}" alt="Avatar de ${esc(p.name)}"></div>`}
function applyBackground(p){const bg=item(p?.equipped?.background),app=document.getElementById('app');app.classList.toggle('has-bg',!!bg);app.style.setProperty('--bg-img',bg?`url("${bg.asset}")`:'none')}
function equippedAny(p,id){if(!p)return false;return Object.values(p.equipped||{}).includes(id)}
function renderEntry(){
  try{ensureFamilyProfiles()}catch(e){console.error('Falha ao preparar perfis:',e)}
  const box=document.getElementById('entryPlayers'),start=document.getElementById('entryStart'),hint=document.getElementById('entryHint');
  if(!box||!start)return;
  const fallback={luna:'avatar-luna-neutral-base.png',sofia:'avatar-sofia-neutral-base.png',maya:'avatar-maya-neutral-base.png'};
  box.innerHTML=FAMILY_PLAYERS.map(def=>{const p=familyProfile(def),sel=!!(p&&p.id===entrySelectedId),src=p?avatarAsset(p):(fallback[def.avatar]||fallback.luna),click=p?`selectEntryPlayer('${p.id}')`:`selectEntryFamilyByName('${def.name.replace(/'/g,"\'")}')`;return `<button type="button" class="entry-player ${sel?'selected':''}" data-tone="${def.tone}" data-family-name="${esc(def.name)}" aria-pressed="${sel?'true':'false'}" onclick="${click}"><img class="entry-player-art" src="${src}" alt="Avatar de ${esc(def.name)}"><span class="entry-nameplate">${esc(def.name.toUpperCase())}</span></button>`}).join('');
  start.disabled=!entrySelectedId;
  if(hint)hint.textContent=entrySelectedId?'Pronto! Toque em INICIAR.':'Toque em um avatar para selecionar.';
}
function selectEntryPlayer(id){
  if(!FAMILY_PLAYERS.some(def=>familyProfile(def)?.id===id))return;
  entrySelectedId=id;renderEntry();
}
function selectEntryFamilyByName(name){
  const def=FAMILY_PLAYERS.find(x=>normalizedName(x.name)===normalizedName(name));if(!def)return;
  let p=familyProfile(def);
  if(!p){try{p=profileDefaults(def.name);p.name=def.name;p.avatar={id:def.avatar,skinId:'original'};state.profiles.push(p);save()}catch(e){console.error('Falha ao criar perfil inicial:',e);return}}
  entrySelectedId=p.id;renderEntry();
}
function startEntry(){
  if(!entrySelectedId)return;
  const chosen=state.profiles.find(p=>p.id===entrySelectedId);if(!chosen)return renderEntry();
  state.activeId=entrySelectedId;save();
  try{renderAll();showTab('home');document.getElementById('entryGate').style.display='none';document.getElementById('app').style.display='block'}catch(e){console.error('Falha ao abrir o jogo:',e);document.getElementById('entryGate').style.display='flex';document.getElementById('app').style.display='none';toast('Erro ao abrir o perfil. Tente novamente.')}
}
function showEntry(){
  entrySelectedId=null;
  document.getElementById('app').style.display='none';
  document.getElementById('game').style.display='none';
  document.getElementById('entryGate').style.display='flex';
  renderEntry();window.scrollTo(0,0);
}
function homeBackgroundAsset(p){const bg=item(p?.equipped?.background);return bg?.asset||'home-magical-bg.webp'}
function renderHome(){
  const p=active(),screen=document.getElementById('homeScreen');if(!p||!screen)return;
  screen.style.setProperty('--home-bg',`url("${homeBackgroundAsset(p)}")`);
  const xpNow=xpInto(p.xp),xpNeed=100,lvl=levelFor(p.xp),chest=chestProgressInfo(p),available=chest.available,progress=chest.into,requirement=chest.nextReq;
  document.getElementById('homeProfileBar').innerHTML=`<button class="home-css-avatar" type="button" onclick="showTab('profile')" aria-label="Abrir perfil de ${esc(p.name)}">${avatarHTML(p,'home',false)}</button><div class="home-css-profile-info"><div class="home-css-name-row"><strong>${esc(p.name)}</strong><span class="home-css-level">NÍVEL ${lvl}</span></div><div class="home-css-xpbar" role="progressbar" aria-label="Progresso de experiência" aria-valuemin="0" aria-valuemax="${xpNeed}" aria-valuenow="${xpNow}"><i style="width:${Math.max(0,Math.min(100,(xpNow/xpNeed)*100))}%"></i><span>${xpNow} / ${xpNeed}</span></div><div class="home-css-wallet"><span class="home-css-coin-icon">★</span><span class="home-css-coins">${p.coins}</span><small>OURO</small></div></div>`;
  const hero=document.getElementById('homeHeroAvatar');hero.src=avatarAsset(p);hero.alt=`Avatar de ${esc(p.name)}`;
  const fill=document.getElementById('homeChestFill'),txt=document.getElementById('homeChestText'),title=document.getElementById('homeChestTitle'),desc=document.getElementById('homeChestDesc'),art=document.getElementById('homeChestArt'),type=nextChestType(p),readyChests=chestGalleryReadyCount(p),defs=chestGalleryDefinitions(p),firstReady=defs.find(d=>chestGalleryState(p,d)==='ready'),nextDef=firstReady||activityChestDefinition(Number(p.stats?.chestsClaimed||0));
  if(art){art.src=chestClosedAsset(nextDef);art.alt=nextDef.name}
  title.textContent='Baús';
  if(readyChests>0){fill.style.width='100%';txt.textContent=`${readyChests} PRONTO${readyChests>1?'S':''}`;desc.textContent=`${readyChests} tesouro${readyChests>1?'s':''} esperando para abrir.`}
  else{fill.style.width=`${Math.round(progress/requirement*100)}%`;txt.textContent=`${progress}/${requirement}`;const left=requirement-progress;desc.textContent=`Próximo baú de aventura: faltam ${left} atividade${left===1?'':'s'}.`}
  const menuArt=document.getElementById('homeChestsMenuArt'),menuBadge=document.getElementById('homeChestsBadge');if(menuArt)menuArt.src=chestClosedAsset(nextDef);if(menuBadge){menuBadge.style.display=readyChests?'grid':'none';menuBadge.textContent=readyChests}
  document.getElementById('homeDailyBadge').style.display=canClaimDaily(p)?'grid':'none';
}
function homeSelectBackground(id){const p=active();if(!p)return;if(id&&!owns(p,id)){storeCat='background';showTab('store');return toast('Esse fundo ainda está bloqueado.')}p.equipped.background=id||null;save();renderHome();applyBackground(p);toast('Fundo atualizado!')}
function openBackgroundGallery(){inventoryCat='background';showTab('inventory')}

function backgroundOptions(){const p=active();return [{id:'__default__',cat:'background',asset:'home-magical-bg.webp',name:'Castelo dos Sonhos',price:0,rarity:'Inicial'},...CATALOG.filter(x=>x.cat==='background'&&(x.shop!==false||owns(p,x.id)))]}
function backgroundOwned(p,x){return x.id==='__default__'||owns(p,x.id)}
function backgroundEquipped(p,x){return x.id==='__default__'?!p.equipped.background:p.equipped.background===x.id}
function selectBackgroundPreview(id){if(!backgroundOptions().some(x=>x.id===id))return;backgroundPreviewId=id;renderBackgroundGallery()}
function backgroundGalleryAction(){const p=active(),x=backgroundOptions().find(v=>v.id===backgroundPreviewId);if(!p||!x)return;if(backgroundEquipped(p,x))return;if(x.id==='__default__'){p.equipped.background=null;save();renderAll();backgroundPreviewId='__default__';renderBackgroundGallery();return toast('Castelo dos Sonhos equipado!')}if(backgroundOwned(p,x)){p.equipped.background=x.id;save();renderAll();backgroundPreviewId=x.id;renderBackgroundGallery();return toast(`${x.name} equipado!`)}if(p.coins<x.price)return toast('Faltam moedas para desbloquear esse fundo.');p.coins-=x.price;if(!p.owned.includes(x.id))p.owned.push(x.id);p.equipped.background=x.id;save();showAssetBurst();renderAll();backgroundPreviewId=x.id;renderBackgroundGallery();toast(`${x.name} desbloqueado e equipado!`)}
function renderBackgroundGallery(){const p=active(),preview=document.getElementById('bgGalleryPreview'),grid=document.getElementById('bgGalleryGrid');if(!p||!preview||!grid)return;const all=backgroundOptions();if(!backgroundPreviewId||!all.some(x=>x.id===backgroundPreviewId))backgroundPreviewId=p.equipped.background||'__default__';const x=all.find(v=>v.id===backgroundPreviewId)||all[0],owned=backgroundOwned(p,x),equipped=backgroundEquipped(p,x);document.getElementById('bgGalleryWallet').innerHTML=coinHTML()+` ${p.coins}`;document.getElementById('bgGalleryCount').textContent=`${all.filter(v=>backgroundOwned(p,v)).length}/${all.length} desbloqueados`;const action=equipped?'Equipado':owned?'Equipar':`${coinHTML()} ${x.price} · Comprar`;preview.innerHTML=`<div class="bg-preview-art" style="--preview-bg:url('${x.asset}')"><span class="bg-preview-status">${equipped?'✓ EQUIPADO':owned?'DISPONÍVEL':'🔒 BLOQUEADO'}</span><img src="${x.asset}" alt="${esc(x.name)}"></div><div class="bg-preview-info"><div><div class="bg-preview-name">${esc(x.name)}</div><div class="bg-preview-rarity">${esc(x.rarity)}${x.id==='__default__'?' · Fundo inicial':''}</div></div><button type="button" class="bg-preview-action ${equipped?'equipped':''}" ${equipped?'disabled':''} onclick="backgroundGalleryAction()">${action}</button></div>`;grid.innerHTML=all.map(v=>{const own=backgroundOwned(p,v),eq=backgroundEquipped(p,v),sel=v.id===x.id,badge=eq?'EQUIPADO':own?'DISPONÍVEL':`${v.price} MOEDAS`;return `<button type="button" class="bg-card ${sel?'selected':''} ${own?'':'locked'}" onclick="selectBackgroundPreview('${v.id}')"><div class="bg-card-art"><span class="bg-card-badge ${eq?'equipped':own?'':'buy'}">${badge}</span><img src="${v.asset}" alt="${esc(v.name)}"></div><div class="bg-card-copy"><b>${esc(v.name)}</b><span>${own?(eq?'✓ Em uso':'Toque para ver'):`${coinHTML()} ${v.price}`}</span></div></button>`}).join('')}
const REVIEW_INTERVAL_DAYS=[2/24,3,7,14,30];
function tableLearning(p,n){migrateProfile(p);return p.learning.tables[String(n)]}
function tableMastered(p,n){return !!tableLearning(p,n)?.masteredAt}
function tableUnlocked(p,n){if(n===1)return true;if(tableMastered(p,n))return true;return tableMastered(p,n-1)}
function tableDue(p,n){const t=tableLearning(p,n);return !!t.masteredAt&&Number(t.nextReviewAt||0)<=Date.now()}
function daysUntil(ts){return Math.max(1,Math.ceil((Number(ts)-Date.now())/86400000))}
function tableStatus(p,n){const t=tableLearning(p,n);if(!tableUnlocked(p,n))return {id:'locked',label:'BLOQUEADA',note:`Domine a Tabuada do ${n-1}`};if(!t.masteredAt)return {id:'new',label:n===1&&!Object.values(p.learning.tables).some(v=>v.masteredAt)?'COMECE AQUI':'DISPONÍVEL',note:'Toque para começar'};if(tableDue(p,n))return {id:'due',label:'REVISAR',note:`Revisão ${Number(t.reviewCount||0)+1} disponível`};return {id:'scheduled',label:'DOMINADA',note:`Revisão em ${daysUntil(t.nextReviewAt)} dia${daysUntil(t.nextReviewAt)===1?'':'s'}`}}
function worldMeta(n){return WORLD_META[n]||{name:`Mundo ${n}`,card:'home-magical-bg.webp',practice:'home-magical-bg.webp'}}
const WORLD_MAP_POS={
  1:{x:48.9,y:94.1},
  2:{x:72.7,y:78.5},
  3:{x:20.7,y:78.4},
  4:{x:55.8,y:65.2},
  5:{x:78.2,y:52.0},
  6:{x:21.2,y:52.1},
  7:{x:48.5,y:44.1},
  8:{x:75.0,y:32.6},
  9:{x:21.9,y:32.4},
  10:{x:53.0,y:22.2}
};
function focusWorldMap(){/* O mapa completo permanece fixo; os hotspots nao deslocam a imagem. */}
function renderWorlds(){
  const p=active(),g=document.getElementById('worldGrid'),today=document.getElementById('worldToday');if(!p||!g||!today)return;
  const due=[];let nextNew=null;for(let n=1;n<=10;n++){if(tableDue(p,n))due.push(n);if(nextNew===null&&tableUnlocked(p,n)&&!tableMastered(p,n))nextNew=n}
  today.textContent=due.length?`${due.length} revisão${due.length===1?'':'ões'} disponível${due.length===1?'':'is'} hoje`:nextNew?`Próxima aventura: Tabuada ${nextNew}`:'Todos os mundos dominados';
  g.innerHTML='';
  for(let n=1;n<=10;n++){
    const st=tableStatus(p,n),pos=WORLD_MAP_POS[n],disabled=st.id==='locked'||st.id==='scheduled';
    const b=document.createElement('button');b.type='button';b.dataset.table=String(n);b.className=`world-map-node ${st.id}`;b.disabled=disabled;b.style.left=`${pos.x}%`;b.style.top=`${pos.y}%`;
    b.setAttribute('aria-label',`Tabuada ${n}: ${st.label}. ${st.note}`);
    b.innerHTML=st.id==='locked'?'':`<span class="world-map-state" aria-hidden="true">${st.id==='due'?'↻':st.id==='scheduled'?'✓':''}</span>`;
    if(!disabled)b.onclick=()=>startGame(n,st.id==='due'?'review':'learn');
    g.appendChild(b);
  }
  /* Sem rolagem automatica: a arte completa define o enquadramento dos dez mundos. */
}
function openHomeWorlds(){showTab('world')}

function localDayKey(){const d=new Date(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${d.getFullYear()}-${m}-${day}`}
function canClaimDaily(p){return !!p&&p.daily?.lastClaimDate!==localDayKey()}
function dailyRewardLabel(r){if(r.kind==='coins')return `${r.amount} moedas`;if(r.kind==='gems')return `${r.amount} gemas`;if(r.kind==='fashion')return 'Moda surpresa';return 'Baú raro'}
function dailyRewardIcon(r){if(r.kind==='coins')return coinHTML();if(r.kind==='gems')return '<span class="daily-gem">◆</span>';if(r.kind==='fashion')return '<img class="coin-inline" src="fashion-icon-star.png" alt="Moda">';return '<span class="daily-chest-icon">🎁</span>'}
function homeDailyReward(){const p=active();if(!p)return;renderDailyOverlay();document.getElementById('dailyOverlay').classList.add('open')}
function renderDailyOverlay(){const p=active();if(!p)return;const next=Number(p.daily?.progress||0),can=canClaimDaily(p),grid=document.getElementById('dailyGrid'),status=document.getElementById('dailyStatus'),btn=document.getElementById('dailyClaimBtn');grid.innerHTML=DAILY_REWARDS.map((r,i)=>`<div class="daily-day ${i<next?'claimed':''} ${i===next?'today':''}"><span>Dia ${i+1}</span><b>${dailyRewardIcon(r)}</b><small>${dailyRewardLabel(r)}</small>${i<next?'<em>✓</em>':''}</div>`).join('');status.innerHTML=can?`<b>Dia ${next+1} disponível!</b><span>Volte a cada dia para avançar no calendário.</span>`:`<b>Recompensa de hoje coletada</b><span>A próxima ficará disponível amanhã.</span>`;btn.disabled=!can;btn.textContent=can?`Coletar Dia ${next+1}`:'Volte amanhã'}
function applyDailyReward(p,r){if(r.kind==='coins'){p.coins+=r.amount;return `${r.amount} moedas`;}if(r.kind==='gems'){p.gems=(p.gems||0)+r.amount;return `${r.amount} gemas`;}if(r.kind==='fashion'){const skin=grantFashionReward(p,'daily');if(skin)return `Moda ${skin.name}`;p.coins+=300;return '300 moedas (guarda-roupa completo)';}const g=grantExclusiveChestReward(p);return g.label}
function claimDailyReward(){const p=active();if(!p||!canClaimDaily(p))return;const idx=Number(p.daily.progress||0),r=DAILY_REWARDS[idx],label=applyDailyReward(p,r);p.daily.lastClaimDate=localDayKey();p.daily.progress=(idx+1)%DAILY_REWARDS.length;if(idx===DAILY_REWARDS.length-1)p.daily.cycle=Number(p.daily.cycle||1)+1;save();showAssetBurst();renderAll();renderDailyOverlay();toast(`✨ Recompensa: ${label}`)}
function magicChestsAvailable(p){return chestProgressInfo(p).available}
function pickManyRandom(arr,count){const pool=[...arr],out=[];while(pool.length&&out.length<count){out.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0])}return out}
function takeChestItems(p,ids,count,type){const pool=ids.map(id=>item(id)).filter(x=>x&&!owns(p,x.id));const chosen=pickThemedItems(pool,count,type);for(const x of chosen)if(!p.owned.includes(x.id))p.owned.push(x.id);return chosen}
function previewChestItems(p,ids,count,type){const pool=ids.map(id=>item(id)).filter(x=>x&&!owns(p,x.id));return pickThemedItems(pool,count,type)}
function grantExclusiveChestReward(p,type){const rewards=[...takeChestItems(p,CHEST_FRAME_IDS,CHEST_CONTENT.frame,type),...takeChestItems(p,CHEST_BACKGROUND_IDS,CHEST_CONTENT.background,type),...takeChestItems(p,CHEST_EFFECT_IDS,CHEST_CONTENT.effect,type)];for(let i=0;i<CHEST_CONTENT.fashion;i++){const skin=grantFashionReward(p,'chest');if(skin)rewards.push({id:`fashion_${skin.id}`,name:`Moda ${skin.name}`,cat:'fashion',asset:skin.asset,rarity:type.rarity})}if(rewards.length)return {kind:'items',items:rewards,label:rewards.map(x=>x.name).join(' · '),type};const coins=250+Math.floor(Math.random()*151);p.coins+=coins;return {kind:'coins',coins,label:`${coins} moedas`,type}}
function renderChestTypeRow(current){const row=document.getElementById('chestTypeRow');if(!row)return;row.innerHTML=CHEST_TYPES.map(type=>`<div class="chest-type-pill ${type.id===current.id?'active':''}"><b>${type.name}</b><span>${type.rarity} · ${type.theme}</span></div>`).join('')}
function renderChestReveal(result){const stage=document.getElementById('chestOpenStage');if(!stage)return;if(!result){stage.className='chest-open-stage';stage.innerHTML='';return}if(result.phase==='opening'){stage.className='chest-open-stage show';stage.innerHTML=`<div class="chest-opening-card"><div class="chest-opening-title">ABRINDO AGORA</div><div class="chest-opening-name">${result.type.name}</div><span class="chest-opening-rarity">${result.type.rarity} · ${result.type.theme}</span><div class="chest-opening-art"><img src="${result.type.asset}" alt="${result.type.name}"></div><div class="chest-opening-sparkles">✦ ✧ ✦</div><div class="chest-opening-copy">Sacudindo os tesouros e preparando a revelação...</div></div>`;return}const rewardHtml=result.kind==='coins'?`<div class="chest-result-item"><img src="coin.webp" alt="Moedas"><b>${result.coins} moedas</b><span>Recompensa extra</span></div>`:result.items.map(x=>`<div class="chest-result-item"><img src="${x.asset||'coin.webp'}" alt="${esc(x.name)}"><b>${esc(x.name)}</b><span>${x.cat==='fashion'?'Moda':x.cat==='frame'?'Moldura':x.cat==='background'?'Fundo':'Efeito'}</span></div>`).join('');stage.className='chest-open-stage show';stage.innerHTML=`<div class="chest-reveal-card"><div class="chest-reveal-head"><div><b>${result.type.name} aberto!</b><span>${result.type.rarity} · ${result.type.theme}</span></div><span class="chest-reveal-badge">${result.kind==='coins'?'BÔNUS':'REVELADO'}</span></div><div class="chest-result-grid">${rewardHtml}</div></div>`}
function openMagicChest(){const p=active();if(!p)return;chestLastReveal=null;renderChestOverlay();document.getElementById('chestOverlay').classList.add('open')}
function renderChestOverlay(){const p=active();if(!p)return;const info=chestProgressInfo(p),available=info.available,box=document.getElementById('chestAvailability'),preview=document.getElementById('chestExclusivePreview'),btn=document.getElementById('chestClaimBtn'),type=nextChestType(p),hero=document.getElementById('chestHero'),heroArt=document.getElementById('chestHeroArt'),rarity=document.getElementById('chestHeroRarity'),kicker=document.getElementById('chestSheetKicker'),title=document.getElementById('chestSheetTitle'),desc=document.getElementById('chestSheetDesc'),previewBadge=document.getElementById('chestPreviewBadge');if(hero)hero.style.setProperty('--chest-gradient',type.gradient);if(heroArt){heroArt.src=type.asset;heroArt.alt=type.name}if(rarity)rarity.textContent=`${type.rarity.toUpperCase()} · ${type.theme.toUpperCase()}`;if(kicker)kicker.textContent=type.kicker;if(title)title.textContent=type.name;if(desc)desc.textContent=`${type.desc} Cada abertura entrega 1 Moda, 3 Molduras, 2 Fundos e 1 Efeito.`;if(previewBadge)previewBadge.textContent='7 ITENS';box.innerHTML=available>0?`<b>${available} baú${available>1?'s':''} pronto${available>1?'s':''}!</b><span>${type.rarity} · ${type.theme}. Toque para abrir este tipo agora.</span>`:`<b>${info.into}/${info.nextReq} atividades</b><span>Próximo tipo: ${type.name}. Faltam ${info.nextReq-info.into} para liberar.</span>`;renderChestTypeRow(type);const slots=[];const fashionSlots=fashionMissingForSource(p,'chest').slice(0,CHEST_CONTENT.fashion),frames=previewChestItems(p,CHEST_FRAME_IDS,CHEST_CONTENT.frame,type),bgs=previewChestItems(p,CHEST_BACKGROUND_IDS,CHEST_CONTENT.background,type),fxs=previewChestItems(p,CHEST_EFFECT_IDS,CHEST_CONTENT.effect,type);for(const skin of fashionSlots)slots.push(`<div class="chest-relic"><img src="${skin.asset}" alt="${esc(skin.name)}"><span>Moda surpresa</span></div>`);for(let i=fashionSlots.length;i<CHEST_CONTENT.fashion;i++)slots.push(`<div class="chest-relic owned"><img src="fashion-icon-star.png" alt=""><span>Moda: guarda-roupa completo</span></div>`);for(const x of frames)slots.push(`<div class="chest-relic">${assetHTML(x)}<span>Moldura exclusiva</span></div>`);for(let i=frames.length;i<CHEST_CONTENT.frame;i++)slots.push(`<div class="chest-relic owned"><img src="coin.webp" alt=""><span>Moldura: coleção completa</span></div>`);for(const x of bgs)slots.push(`<div class="chest-relic">${assetHTML(x)}<span>Fundo exclusivo</span></div>`);for(let i=bgs.length;i<CHEST_CONTENT.background;i++)slots.push(`<div class="chest-relic owned"><img src="coin.webp" alt=""><span>Fundo: coleção completa</span></div>`);for(const x of fxs)slots.push(`<div class="chest-relic">${assetHTML(x)}<span>Efeito exclusivo</span></div>`);for(let i=fxs.length;i<CHEST_CONTENT.effect;i++)slots.push(`<div class="chest-relic owned"><img src="coin.webp" alt=""><span>Efeito: coleção completa</span></div>`);preview.innerHTML=slots.join('');btn.disabled=available<=0||chestRevealBusy;btn.classList.toggle('opening',!!chestRevealBusy);btn.textContent=available>0?(chestRevealBusy?'Abrindo...':'Abrir Baú'):'Continue jogando';renderChestReveal(chestLastReveal)}
function claimMagicChest(){const p=active();if(!p||magicChestsAvailable(p)<=0||chestRevealBusy)return;const type=nextChestType(p);chestRevealBusy=true;chestLastReveal={phase:'opening',type};renderChestOverlay();setTimeout(()=>{const r=grantExclusiveChestReward(p,type);p.stats.chestsClaimed=Number(p.stats.chestsClaimed||0)+1;save();showAssetBurst();chestRevealBusy=false;chestLastReveal=r;renderAll();renderChestOverlay();toast(`🏆 ${r.label}`)},1550)}


function table2ChestFashion(p){return avatarSkins(p).find(x=>x.id==='navigator2')||null}
function table2ChestFrameSelection(p){const missing=TABLE2_CHEST_FRAME_IDS.filter(id=>!owns(p,id)),rest=TABLE2_CHEST_FRAME_IDS.filter(id=>owns(p,id));return shuffle([...missing,...rest]).slice(0,3)}
function renderTable2ChestReward(){const p=active(),preview=document.getElementById('table2ChestPreview'),btn=document.getElementById('table2ChestClaimBtn'),stage=document.getElementById('table2ChestStage');if(!p||!preview||!btn||!stage)return;const claimed=!!p.flags?.table2PirateChestClaimed,pending=!!p.flags?.table2PirateChestPending,fashion=table2ChestFashion(p),frames=table2ChestFrameSelection(p),bgs=TABLE2_CHEST_BACKGROUND_IDS.map(item),fx=item(TABLE2_CHEST_EFFECT_ID);const cards=[];if(fashion)cards.push(`<div class="chest-relic"><img src="${fashion.asset}" alt="${esc(fashion.name)}"><span>Moda exclusiva do perfil</span></div>`);for(const id of frames){const x=item(id);if(x)cards.push(`<div class="chest-relic">${assetHTML(x)}<span>Moldura dos Navegadores</span></div>`)}for(const x of bgs)if(x)cards.push(`<div class="chest-relic">${assetHTML(x)}<span>Fundo pirata</span></div>`);if(fx)cards.push(`<div class="chest-relic">${assetHTML(fx)}<span>Efeito náutico</span></div>`);preview.innerHTML=cards.join('');btn.disabled=claimed||!pending||table2ChestBusy;btn.classList.toggle('opening',table2ChestBusy);btn.textContent=claimed?'✓ Recompensa coletada':table2ChestBusy?'Abrindo...':'Abrir Baú da Tabuada 2';if(!table2ChestLastReveal){stage.className='chest-open-stage';stage.innerHTML='';return}if(table2ChestLastReveal.phase==='opening'){stage.className='chest-open-stage show';stage.innerHTML=`<div class="chest-opening-card"><div class="chest-opening-title">PRIMEIRO DOMÍNIO ×2</div><div class="chest-opening-name">${TABLE2_CHEST.name}</div><span class="chest-opening-rarity">${TABLE2_CHEST.rarity} · ${TABLE2_CHEST.theme}</span><div class="chest-opening-art"><img src="${TABLE2_CHEST.asset}" alt="${TABLE2_CHEST.name}"></div><div class="chest-opening-sparkles">✦ 2 ✦ 2 ✦</div><div class="chest-opening-copy">O tesouro dos Navegadores está sendo revelado...</div></div>`;return}const rewardHtml=table2ChestLastReveal.items.map(x=>`<div class="chest-result-item"><img src="${x.asset||'coin.webp'}" alt="${esc(x.name)}"><b>${esc(x.name)}</b><span>${x.cat==='fashion'?'Moda':x.cat==='frame'?'Moldura':x.cat==='background'?'Fundo':'Efeito'}</span></div>`).join('');stage.className='chest-open-stage show';stage.innerHTML=`<div class="chest-reveal-card"><div class="chest-reveal-head"><div><b>Baú da Tabuada do 2 aberto!</b><span>Coleção dos Navegadores conquistada</span></div><span class="chest-reveal-badge">7 ITENS</span></div><div class="chest-result-grid">${rewardHtml}</div></div>`}
function openTable2ChestReward(){const p=active();if(!p||p.flags?.table2PirateChestClaimed)return;if(!p.flags?.table2PirateChestPending)return toast('Domine a Tabuada do 2 para liberar este baú.');table2ChestLastReveal=null;renderTable2ChestReward();document.getElementById('table2ChestOverlay').classList.add('open')}
function grantTable2ChestReward(p){const items=[];const fashion=table2ChestFashion(p);if(fashion){p.fashionOwned=p.fashionOwned||['original'];if(!p.fashionOwned.includes(fashion.id))p.fashionOwned.push(fashion.id);items.push({id:`fashion_${fashion.id}`,name:`Moda ${fashion.name}`,cat:'fashion',asset:fashion.asset})}for(const id of table2ChestFrameSelection(p)){const x=item(id);if(x){if(!p.owned.includes(id))p.owned.push(id);items.push(x)}}for(const id of TABLE2_CHEST_BACKGROUND_IDS){const x=item(id);if(x){if(!p.owned.includes(id))p.owned.push(id);items.push(x)}}const fx=item(TABLE2_CHEST_EFFECT_ID);if(fx){if(!p.owned.includes(fx.id))p.owned.push(fx.id);items.push(fx)}return items.slice(0,7)}
function claimTable2ChestReward(){const p=active();if(!p||!p.flags?.table2PirateChestPending||p.flags?.table2PirateChestClaimed||table2ChestBusy)return;table2ChestBusy=true;table2ChestLastReveal={phase:'opening'};renderTable2ChestReward();setTimeout(()=>{const items=grantTable2ChestReward(p);p.flags.table2PirateChestClaimed=true;p.flags.table2PirateChestPending=false;p.flags.table2PirateChestRewardIds=items.map(x=>x.id).filter(Boolean);syncTable2ChestEntitlements(p);table2ChestBusy=false;table2ChestLastReveal={items};save();showAssetBurst();renderAll();renderTable2ChestReward();toast('🏴‍☠️ Baú dos Navegadores conquistado! Itens enviados ao perfil.')},1650)}
function table3ChestFashion(p){return avatarSkins(p).find(x=>x.id==='inventor3')||null}
function renderTable3ChestReward(){const p=active(),preview=document.getElementById('table3ChestPreview'),btn=document.getElementById('table3ChestClaimBtn'),stage=document.getElementById('table3ChestStage');if(!p||!preview||!btn||!stage)return;const claimed=!!p.flags?.table3InventorChestClaimed,pending=!!p.flags?.table3InventorChestPending,fashion=table3ChestFashion(p),bgs=TABLE3_CHEST_BACKGROUND_IDS.map(item),fx=item(TABLE3_CHEST_EFFECT_ID);const cards=[];if(fashion)cards.push(`<div class="chest-relic"><img src="${fashion.asset}" alt="${esc(fashion.name)}"><span>Moda exclusiva do perfil</span></div>`);for(const x of bgs)if(x)cards.push(`<div class="chest-relic">${assetHTML(x)}<span>Fundo inventor</span></div>`);if(fx)cards.push(`<div class="chest-relic">${assetHTML(fx)}<span>Efeito mecânico</span></div>`);preview.innerHTML=cards.join('');btn.disabled=claimed||!pending||table3ChestBusy;btn.classList.toggle('opening',table3ChestBusy);btn.textContent=claimed?'✓ Recompensa coletada':table3ChestBusy?'Abrindo...':'Abrir Baú da Tabuada 3';if(!table3ChestLastReveal){stage.className='chest-open-stage';stage.innerHTML='';return}if(table3ChestLastReveal.phase==='opening'){stage.className='chest-open-stage show';stage.innerHTML=`<div class="chest-opening-card"><div class="chest-opening-title">PRIMEIRO DOMÍNIO ×3</div><div class="chest-opening-name">${TABLE3_CHEST.name}</div><span class="chest-opening-rarity">${TABLE3_CHEST.rarity} · ${TABLE3_CHEST.theme}</span><div class="chest-opening-art"><img src="${TABLE3_CHEST.asset}" alt="${TABLE3_CHEST.name}"></div><div class="chest-opening-sparkles">✦ 3 ✦ 3 ✦</div><div class="chest-opening-copy">A oficina secreta está liberando suas invenções...</div></div>`;return}const rewardHtml=table3ChestLastReveal.items.map(x=>`<div class="chest-result-item"><img src="${x.asset||'coin.webp'}" alt="${esc(x.name)}"><b>${esc(x.name)}</b><span>${x.cat==='fashion'?'Moda':x.cat==='background'?'Fundo':'Efeito'}</span></div>`).join('');stage.className='chest-open-stage show';stage.innerHTML=`<div class="chest-reveal-card"><div class="chest-reveal-head"><div><b>Baú da Tabuada do 3 aberto!</b><span>Coleção dos Inventores conquistada</span></div><span class="chest-reveal-badge">4 ITENS</span></div><div class="chest-result-grid">${rewardHtml}</div></div>`}
function openTable3ChestReward(){const p=active();if(!p||p.flags?.table3InventorChestClaimed)return;if(!p.flags?.table3InventorChestPending)return toast('Domine a Tabuada do 3 para liberar este baú.');table3ChestLastReveal=null;renderTable3ChestReward();document.getElementById('table3ChestOverlay').classList.add('open')}
function grantTable3ChestReward(p){const items=[];const fashion=table3ChestFashion(p);if(fashion){p.fashionOwned=p.fashionOwned||['original'];if(!p.fashionOwned.includes(fashion.id))p.fashionOwned.push(fashion.id);items.push({id:`fashion_${fashion.id}`,name:`Moda ${fashion.name}`,cat:'fashion',asset:fashion.asset})}for(const id of TABLE3_CHEST_BACKGROUND_IDS){const x=item(id);if(x){if(!p.owned.includes(id))p.owned.push(id);items.push(x)}}const fx=item(TABLE3_CHEST_EFFECT_ID);if(fx){if(!p.owned.includes(fx.id))p.owned.push(fx.id);items.push(fx)}return items.slice(0,4)}
function claimTable3ChestReward(){const p=active();if(!p||!p.flags?.table3InventorChestPending||p.flags?.table3InventorChestClaimed||table3ChestBusy)return;table3ChestBusy=true;table3ChestLastReveal={phase:'opening'};renderTable3ChestReward();setTimeout(()=>{const items=grantTable3ChestReward(p);p.flags.table3InventorChestClaimed=true;p.flags.table3InventorChestPending=false;table3ChestBusy=false;table3ChestLastReveal={items};save();showAssetBurst();renderAll();renderTable3ChestReward();toast('🔧 Baú dos Inventores conquistado!')},1650)}

function renderChests(){
  const p=active(),grid=document.getElementById('chestsGrid'),summary=document.getElementById('chestsSummary');if(!grid||!summary)return;if(!p){summary.innerHTML='';grid.innerHTML='<div class="empty">Escolha um perfil para ver os baús.</div>';return}
  const defs=chestGalleryDefinitions(p),states=defs.map(d=>chestGalleryState(p,d)),ready=states.filter(s=>s==='ready').length,opened=states.filter(s=>s==='opened').length,locked=states.filter(s=>s==='locked').length;
  summary.innerHTML=`<div><b>${ready}</b><span>PRONTOS</span></div><div><b>${opened}</b><span>ABERTOS</span></div><div><b>${locked}</b><span>FECHADOS</span></div>`;
  grid.innerHTML=defs.map((def,i)=>{const state=states[i],status=state==='ready'?'PRONTO':state==='opened'?'ABERTO':'FECHADO',art=state==='opened'?chestOpenAsset(def):chestClosedAsset(def),action=state==='ready'?'TOQUE PARA ABRIR':state==='opened'?'✓ JÁ ABERTO':'AINDA FECHADO',note=chestGalleryUnlockText(p,def,state);return `<button type="button" class="chest-gallery-card ${state}" onclick="chestGalleryCardClick('${def.id}')"><span class="chest-gallery-status">${status}</span><div class="chest-gallery-art"><img src="${art}" alt="${esc(def.name)}"><span class="chest-gallery-lock">🔒</span></div><h3>${esc(def.name)}</h3><p>${esc(note)}</p><div class="chest-gallery-meta"><span class="chest-gallery-chip">${esc(def.rarity)}</span><span class="chest-gallery-chip">${def.kind==='mastery'?`TABUADA ×${def.table}`:'AVENTURA'}</span></div><div class="chest-gallery-action">${action}</div></button>`}).join('')
}
function chestGalleryFind(id,p=active()){return chestGalleryDefinitions(p).find(x=>x.id===id)||null}
function chestGalleryCardClick(id){const p=active(),def=chestGalleryFind(id,p);if(!p||!def)return;const state=chestGalleryState(p,def);if(state==='locked')return toast(chestGalleryUnlockText(p,def,state));if(state==='opened')return toast('Esse baú já foi aberto e os tesouros já estão no perfil.');playChestGalleryAnimation(def)}
function chestGalleryOverlayBg(e){if(chestGalleryBusy)return;if(e.target?.id==='chestGalleryOpenOverlay')closeChestGalleryReward()}
function closeChestGalleryReward(){if(chestGalleryBusy)return;document.getElementById('chestGalleryOpenOverlay')?.classList.remove('open');chestGalleryCurrent=null;renderChests();renderHome()}
function chestRewardTypeLabel(x){return x.cat==='fashion'?'Moda':x.cat==='frame'?'Moldura':x.cat==='background'?'Fundo':x.cat==='effect'?'Efeito':'Tesouro'}
function renderChestGalleryReward(result,def){const box=document.getElementById('chestGalleryReward'),grid=document.getElementById('chestGalleryRewardGrid'),title=document.getElementById('chestGalleryRewardTitle'),done=document.getElementById('chestGalleryDone');const items=result?.items||[];title.textContent=def.kind==='mastery'?`Coleção de ×${def.table} conquistada!`:'Tesouros enviados ao perfil';if(result?.kind==='coins')grid.innerHTML=`<div class="chest-gallery-reward-card"><img src="coin.webp" alt="Moedas"><b>${result.coins} moedas</b><span>Recompensa</span></div>`;else grid.innerHTML=items.map(x=>`<div class="chest-gallery-reward-card"><img src="${x.asset||'coin.webp'}" alt="${esc(x.name)}"><b>${esc(x.name)}</b><span>${chestRewardTypeLabel(x)}</span></div>`).join('');box.classList.add('show');done.classList.add('show')}
function grantChestGalleryDefinition(p,def){
  if(def.kind==='activity'){const claimed=Number(p.stats?.chestsClaimed||0),info=chestProgressInfo(p);if(def.activityIndex!==claimed||info.available<=0)return null;const result=grantExclusiveChestReward(p,chestTypeAt(def.activityIndex));p.stats.chestsClaimed=claimed+1;return result}
  if(def.rewardKind==='table2'){const items=grantTable2ChestReward(p);p.flags.table2PirateChestClaimed=true;p.flags.table2PirateChestPending=false;p.flags.table2PirateChestRewardIds=items.map(x=>x.id).filter(Boolean);syncTable2ChestEntitlements(p);return {kind:'items',items}}
  if(def.rewardKind==='table3'){const items=grantTable3ChestReward(p);p.flags.table3InventorChestClaimed=true;p.flags.table3InventorChestPending=false;syncTable3ChestEntitlements(p);return {kind:'items',items}}
  return null
}
function playChestGalleryAnimation(def){if(chestGalleryBusy)return;const p=active();if(!p||chestGalleryState(p,def)!=='ready')return;chestGalleryBusy=true;chestGalleryCurrent=def;const overlay=document.getElementById('chestGalleryOpenOverlay'),stage=document.getElementById('chestGalleryAnimation'),img=document.getElementById('chestGalleryFrame'),title=document.getElementById('chestGalleryOpenTitle'),kicker=document.getElementById('chestGalleryOpenKicker'),reward=document.getElementById('chestGalleryReward'),done=document.getElementById('chestGalleryDone');reward.classList.remove('show');done.classList.remove('show');title.textContent=def.name;kicker.textContent=def.kind==='mastery'?`RECOMPENSA DA TABUADA ×${def.table}`:'TESOURO DE AVENTURA';overlay.classList.add('open');stage.classList.add('running');const frames=chestSpriteFrames(def.sprite);let i=0;img.src=frames[0];img.alt=def.name;clearInterval(chestGalleryTimer);chestGalleryTimer=setInterval(()=>{i++;if(i<frames.length){img.src=frames[i];return}clearInterval(chestGalleryTimer);chestGalleryTimer=null;setTimeout(()=>{const result=grantChestGalleryDefinition(p,def);if(!result){chestGalleryBusy=false;stage.classList.remove('running');overlay.classList.remove('open');renderAll();return toast('Este baú ainda não pode ser aberto.')}save();showAssetBurst();chestGalleryBusy=false;stage.classList.remove('running');img.src=frames[frames.length-1];renderAll();renderChestGalleryReward(result,def);renderChests()},330)},175)}

function collectionItems(p=active()){
  const themed=CATALOG.filter(x=>x.cat==='collectible'||!!x.collection);
  const fashion=avatarSkins(p||{}).filter(s=>s.id!=='original'&&['navigator2','inventor3'].includes(s.id)).map(s=>({id:`fashion_${s.id}`,fashionId:s.id,cat:'fashion',asset:s.asset,name:`Moda ${s.name}`,rarity:s.id==='navigator2'?'Épico':'Épico',shop:false,source:s.id==='navigator2'?'table2_chest':'table3_chest',collection:s.id==='navigator2'?'aventura_pirata':'inventores_banana'}));
  return [...themed,...fashion]
}
function collectionOwns(p,x){return x?.cat==='fashion'?fashionOwned(p,x.fashionId):owns(p,x.id)}
function collectionItemById(id,p=active()){return collectionItems(p).find(x=>x.id===id)||null}
function collectionRarityClass(r){return String(r||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function collectionSourceLabel(x){if(x?.source==='table2_chest')return 'Baú da Tabuada do 2 · exclusivo';if(x?.source==='table3_chest')return 'Baú da Tabuada do 3 · exclusivo';if(x?.source==='mastery12')return 'Baú dos Navegadores · exclusivo';if(x?.source==='daily')return 'Baú da Recompensa Diária · exclusivo';if(x?.source==='chest'||x?.shop===false)return 'Baú Mágico · exclusivo';return 'Loja Mágica e Pacotes'}
function openCollectionStore(){storeCat='collectible';showTab('store')}
function selectCollectionItem(id){if(!collectionItems(active()).some(x=>x.id===id))return;collectionSelectedId=id;renderCollection()}
function setCollectionFilter(v){collectionFilter=v;renderCollection()}
function renderCollection(){
  const p=active(),grid=document.getElementById('collectionGrid'),tabs=document.getElementById('collectionTabs');if(!p||!grid||!tabs)return;
  const all=collectionItems(p),owned=all.filter(x=>collectionOwns(p,x)),pct=all.length?Math.round(owned.length/all.length*100):0;
  document.getElementById('collectionSummaryTitle').textContent=`${owned.length} de ${all.length} tesouros encontrados`;
  document.getElementById('collectionSummaryText').textContent=owned.length===all.length?'Galeria completa! Este perfil encontrou todos os tesouros disponíveis.':`Faltam ${all.length-owned.length} peça${all.length-owned.length===1?'':'s'} para completar a galeria.`;
  document.getElementById('collectionProgressPct').textContent=`${pct}%`;document.getElementById('collectionProgressRing').style.setProperty('--pct',pct+'%');
  tabs.innerHTML=COLLECTION_TABS.map(([id,label])=>`<button type="button" class="collection-tab ${collectionFilter===id?'active':''}" onclick="setCollectionFilter('${id}')">${label}</button>`).join('');
  const arr=collectionFilter==='all'?all:all.filter(x=>x.rarity===collectionFilter);
  if(!collectionSelectedId||!all.some(x=>x.id===collectionSelectedId))collectionSelectedId=(owned[0]||all[0])?.id||null;
  const chosen=collectionItemById(collectionSelectedId,p),has=chosen&&collectionOwns(p,chosen),stage=document.getElementById('collectionStageItem');
  if(chosen){stage.src=has?chosen.asset:'collection-locked-card.png';stage.alt=has?chosen.name:'Tesouro ainda não encontrado';stage.className='collection-stage-item'+(has?'':' locked');document.getElementById('collectionDetailName').textContent=has?chosen.name:'Tesouro misterioso';document.getElementById('collectionDetailMeta').textContent=has?`${chosen.rarity} · ${chosen.cat==='fashion'?'Moda':chosen.cat==='frame'?'Moldura':chosen.cat==='background'?'Fundo':chosen.cat==='effect'?'Efeito':'Tesouro'} conquistado`:`${chosen.rarity} · ainda não encontrado`;document.getElementById('collectionDetailSource').textContent=collectionSourceLabel(chosen);document.getElementById('collectionActions').innerHTML=!has&&chosen.shop!==false?'<button type="button" class="collection-shop-link" onclick="openCollectionStore()">Ver na Loja Mágica</button>':''}
  grid.innerHTML=arr.map(x=>{const has=collectionOwns(p,x),sel=x.id===collectionSelectedId,rc=collectionRarityClass(x.rarity);return `<button type="button" class="collection-card ${has?'':'locked'} ${sel?'selected':''}" onclick="selectCollectionItem('${x.id}')"><div class="collection-card-art">${has?`<img class="frame" src="collection-item-frame.png" alt=""><img class="treasure" src="${x.asset}" alt="${esc(x.name)}">`:`<img class="mystery" src="collection-locked-card.png" alt="Tesouro misterioso">`}</div><span class="collection-card-name">${has?esc(x.name):'???'}</span><div class="collection-card-meta"><span class="collection-rarity ${rc}">${esc(x.rarity)}</span><span class="${has?'owned':''}">${has?'✓ Encontrado':'🔒 Oculto'}</span></div></button>`}).join('');
}
function renderHeader(){const p=active(),el=document.getElementById('headerPlayer');if(!p){el.innerHTML='<div class="avatar-wrap"></div><div><div class="pname">Criar perfil</div><div class="level-line">Toque em Perfil para começar</div></div>';return}el.innerHTML=`${avatarHTML(p,'mini',false)}<div><div class="pname">${esc(p.name)}</div><div class="level-line"><span class="level-badge">Nível ${levelFor(p.xp)}</span><span class="xpbar"><i style="width:${xpInto(p.xp)}%"></i></span><span>${xpInto(p.xp)}/100 XP</span></div></div><div class="wallet">${coinHTML()} ${p.coins}</div>`;applyBackground(p)}
function renderDecks(){const g=document.getElementById('deckGrid');g.innerHTML='';for(let n=2;n<=10;n++){const b=document.createElement('button');b.className='deck';b.innerHTML=`<span class="ribbon">TABUADA DO</span><div class="num">${n}</div><div class="small">${n} ×</div>`;b.onclick=()=>startGame(n);g.appendChild(b)}}
function renderStats(){const p=active(),s=p?.stats||{};document.getElementById('stats').innerHTML=`<div class="stat"><b>${s.correct||0}</b><span>ACERTOS</span></div><div class="stat"><b>${s.sessions||0}</b><span>LIÇÕES</span></div><div class="stat"><b>${Object.keys(s.masteredDecks||{}).length}</b><span>TABUADAS</span></div>`}
function setAvatarSkin(skinId){const p=active();if(!p)return;const skin=avatarSkins(p).find(x=>x.id===skinId);if(!skin)return toast('Esse modelo não pertence a este perfil.');if(!fashionOwned(p,skin.id))return toast('🔒 Desbloqueie essa Moda primeiro.');p.avatar=p.avatar||{id:fixedAvatarForName(p.name)};p.avatar.id=fixedAvatarForName(p.name);p.avatar.skinId=skin.id;save();renderAll();toast(`✨ Visual ${skin.name} equipado!`)}
function fashionAction(skinId){const p=active();if(!p)return;const skin=avatarSkins(p).find(x=>x.id===skinId);if(!skin)return;if(fashionOwned(p,skin.id))return setAvatarSkin(skin.id);if(!(skin.sources||[]).includes('coins'))return toast('Essa Moda só pode ser conquistada no Baú ou na Recompensa Diária.');const price=Number(skin.price||0);if(p.coins<price)return toast(`Faltam ${price-p.coins} moedas para desbloquear ${skin.name}.`);p.coins-=price;p.fashionOwned=p.fashionOwned||['original'];if(!p.fashionOwned.includes(skin.id))p.fashionOwned.push(skin.id);p.avatar.skinId=skin.id;save();showAssetBurst();renderAll();toast(`👗 ${skin.name} desbloqueada e equipada!`)}
function fashionHelp(){const el=document.getElementById('fashionAcquireHelp');if(el)el.scrollIntoView({behavior:'smooth',block:'center'})}
function renderFashion(){const p=active(),preview=document.getElementById('fashionPreview'),grid=document.getElementById('fashionGrid'),count=document.getElementById('fashionCount'),note=document.getElementById('fashionNote'),wallet=document.getElementById('fashionWallet');if(!preview||!grid)return;if(!p){preview.innerHTML='';grid.innerHTML='<div class="empty">Escolha um perfil para continuar.</div>';if(count)count.textContent='';if(note)note.textContent='';if(wallet)wallet.innerHTML='';return}const skins=avatarSkins(p),current=avatarSkin(p),ownedCount=skins.filter(x=>fashionOwned(p,x.id)).length;if(wallet)wallet.innerHTML=`<img src="fashion-icon-coin.png" alt="Moedas"><div><small>SUAS MOEDAS</small>${p.coins.toLocaleString('pt-BR')}</div>`;preview.innerHTML=`<div class="fashion-preview-copy"><span>${esc(p.name)}</span><b class="fashion-current-badge">✓ ${esc(current.name)}</b></div><img src="${current.asset}" alt="${esc(current.name)} de ${esc(p.name)}">`;grid.innerHTML=skins.map(skin=>{const owned=fashionOwned(p,skin.id),selected=skin.id===current.id,canBuy=(skin.sources||[]).includes('coins'),price=Number(skin.price||0),action=selected?'✓ Em uso':owned?'Selecionar':canBuy?`<img src="fashion-icon-coin.png" alt="">${price.toLocaleString('pt-BR')}`:'Bloqueada';return `<article class="fashion-card ${selected?'selected':''} ${owned?'':'locked'}" aria-label="${esc(skin.name)}${owned?'':' bloqueada'}"><div class="fashion-card-art"><img class="avatar" src="${skin.asset}" alt="${esc(skin.name)} de ${esc(p.name)}"><div class="fashion-lock-layer"><img src="fashion-icon-lock.png" alt="Bloqueada"></div>${selected?'<span class="fashion-status-badge">✓</span>':owned?'<span class="fashion-status-badge">★</span>':'<span class="fashion-status-badge"><img src="fashion-icon-lock.png" alt=""></span>'}</div><b>${esc(skin.name)}</b><small>${esc(skin.theme||'Visual')}</small><div class="fashion-acquire">${owned?'<span class="fashion-source-chip">✓ Desbloqueada</span>':fashionSourceChips(skin)}</div><button type="button" class="fashion-action ${owned?'':'buy'}" ${selected?'disabled':''} onclick="fashionAction('${skin.id}')">${action}</button>${owned&&!selected?'<div class="fashion-owned-note">Pronta para usar</div>':''}</article>`}).join('');if(count)count.textContent=`${ownedCount}/${skins.length} DESBLOQUEADAS`;if(note)note.innerHTML=`<b>${esc(p.name)}</b> mantém o mesmo personagem. Modas bloqueadas não podem ser selecionadas: desbloqueie com moedas, encontre no Baú, ganhe na Recompensa Diária ou conquiste recompensas especiais de domínio.`}
function renderAvatarHome(){const p=active(),el=document.getElementById('avatarHome');if(!el)return;if(!p){el.innerHTML='';return}el.innerHTML=`<div class="avatar-home-card">${avatarHTML(p,'medium',true)}<div class="copy"><b>Avatar de ${esc(p.name)}</b><span>Personagem fixo · visual trocado no menu Moda.</span></div></div>`}
const STORE_TAB_META={all:{icon:'✨',subtitle:'Escolhas mágicas para começar.'},frame:{icon:'🖼️',subtitle:'Molduras para destacar seu perfil.'},background:{icon:'🏰',subtitle:'Cenários para transformar sua Home.'},collectible:{icon:'💎',subtitle:'Tesouros para completar sua coleção.'},effect:{icon:'🎆',subtitle:'Celebrações especiais para seus acertos.'},package:{icon:'🎁',subtitle:'Pacotes com várias recompensas.'}};
const STORE_TYPE_LABEL={frame:'Moldura',background:'Fundo',collectible:'Colecionável',effect:'Efeito',package:'Pacote'};
function renderTabs(){document.getElementById('storeTabs').innerHTML=STORE_TABS.map(([id,label])=>`<button type="button" class="tab ${storeCat===id?'active':''}" onclick="setStoreCat('${id}')"><span class="tab-icon">${STORE_TAB_META[id]?.icon||'✦'}</span><span>${label}</span></button>`).join('')}
function setStoreCat(c){storeCat=c;renderStore()}
function renderStore(){renderTabs();const p=active(),pack=item('pack_magic'),packOwned=!!(p&&owns(p,'pack_magic'));document.getElementById('storeWallet').innerHTML=coinHTML()+' '+(p?.coins||0);const rewards=document.getElementById('heroPackRewards');if(rewards)rewards.innerHTML=pack.bundle.map(id=>assetHTML(item(id))).join('');const packPrice=document.getElementById('heroPackPrice');if(packPrice)packPrice.innerHTML=packOwned?'✓ Na coleção':coinHTML()+' '+pack.price;const packAction=document.getElementById('heroPackAction');if(packAction){packAction.textContent=packOwned?'Pacote adquirido':'Abrir pacote';packAction.classList.toggle('owned',packOwned)}const sale=CATALOG.filter(x=>x.shop!==false);let arr;if(storeCat==='all'){arr=sale.filter(x=>['frame','background','collectible','effect'].includes(x.cat)).slice(0,12)}else{arr=sale.filter(x=>x.cat===storeCat)}const meta=STORE_TAB_META[storeCat]||STORE_TAB_META.all,tabLabel=(STORE_TABS.find(x=>x[0]===storeCat)||STORE_TABS[0])[1];const shelfTitle=document.getElementById('storeShelfTitle'),shelfSubtitle=document.getElementById('storeShelfSubtitle'),shelfCount=document.getElementById('storeShelfCount');if(shelfTitle)shelfTitle.textContent=tabLabel;if(shelfSubtitle)shelfSubtitle.textContent=meta.subtitle;if(shelfCount)shelfCount.textContent=`${arr.length} ${arr.length===1?'ITEM':'ITENS'}`;document.getElementById('shopGrid').innerHTML=arr.length?arr.map(x=>shopCard(x,p)).join(''):'<div class="store-empty">Nenhum item disponível nesta categoria.</div>';const countable=sale.filter(x=>!x.bundle),ownedCount=p?p.owned.filter(id=>countable.some(x=>x.id===id)).length:0,total=countable.length;document.getElementById('collectionCount').textContent=`${ownedCount}/${total}`;document.getElementById('collectionBar').style.width=`${total?ownedCount/total*100:0}%`}
function shopCard(x,p){const owned=!!(p&&owns(p,x.id));let label=owned?(x.cat==='collectible'?'Colecionado':x.bundle?'Pacote adquirido':'No Baú'):'Comprar';const bundle=x.bundle?`<div class="bundle-preview">${x.bundle.map(id=>assetHTML(item(id),'bundle-thumb')).join('')}</div>`:'';const rarityClass='rarity-'+String(x.rarity||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const price=owned&&!x.bundle?`<div class="price owned-price">✓ Comprado</div>`:`<div class="price">${coinHTML()} ${x.price}</div>`;return `<div class="item ${x.cat==='package'?'package':''} ${owned?'owned-card':''}"><span class="rarity ${rarityClass}">${x.rarity}</span>${owned?'<span class="owned-mark">✓</span>':''}<div class="item-art">${assetHTML(x)}</div><div class="item-name">${x.name}</div><div class="item-type">${STORE_TYPE_LABEL[x.cat]||'Tesouro mágico'}</div>${bundle}<div class="item-footer">${price}<button type="button" class="buy ${owned?'owned':''}" onclick="buyOrUse('${x.id}')">${label}</button></div></div>`}
function equip(p,x){if(x.cat==='frame')p.equipped.frame=x.id;else if(x.cat==='background')p.equipped.background=x.id;else if(x.cat==='effect')p.equipped.effect=x.id}
function buyOrUse(id){const p=active(),x=item(id);if(!p){showCreateProfile();return}if(!x)return;if(x.bundle&&owns(p,id))return toast('Esse pacote já foi adquirido.');if(owns(p,id)){if(x.cat==='collectible')return toast(`${x.name} já está na sua coleção.`);if(['frame','background','effect'].includes(x.cat)){inventoryCat=x.cat;showTab('inventory');return toast('Esse item já está no seu Baú.')}return toast('Esse item já foi adquirido.')}if(p.coins<x.price)return toast('Faltam moedas para esse item.');p.coins-=x.price;p.owned.push(id);if(x.bundle){for(const bid of x.bundle)if(!p.owned.includes(bid))p.owned.push(bid);toast('✨ Pacote aberto! Os itens foram enviados para sua coleção e para o Baú de Itens.');showAssetBurst()}else if(x.cat==='collectible'){toast('Novo colecionável adicionado à sua coleção!');showAssetBurst()}else{toast('Compra concluída! Item enviado para o Baú de Itens.');showAssetBurst()}save();renderAll()}
function renderProfileCustomizer(){const p=active(),box=document.getElementById('profileCustomizer');if(!box)return;if(!p){box.innerHTML='<div class="panel empty">Crie um perfil para continuar.</div>';return}const bg=item(p.equipped.background),mastered=Object.keys(p.stats?.masteredDecks||{}).length;box.innerHTML=`<div class="profile-hero-card" style="--profile-bg:${bg?`url('${bg.asset}')`:'linear-gradient(145deg,#8b47ec,#4d22af)'}"><div class="profile-hero-content"><div class="profile-big-avatar">${avatarHTML(p,'large',true)}</div><div class="profile-hero-name">${esc(p.name)}</div><div class="profile-hero-meta"><span class="profile-chip">Nível ${levelFor(p.xp)}</span><span class="profile-chip">${coinHTML()} ${p.coins}</span></div><div class="profile-xp-wrap"><span>XP</span><span class="xpbar"><i style="width:${xpInto(p.xp)}%"></i></span><span>${xpInto(p.xp)}/100</span></div><div class="profile-achievement-seal">⭐ ${mastered} tabuadas dominadas</div></div></div><div class="customizer-panel"><div class="alpha-note"><b>Personagem fixo</b><br>${esc(p.name)} usa apenas modelos de ${esc(p.name)}. O visual atual é <b>${esc(avatarSkin(p).name)}</b>.</div><button type="button" class="primary" style="width:100%;margin-top:10px" onclick="showTab('fashion')">Abrir Moda</button><button type="button" class="primary" style="width:100%;margin-top:10px" onclick="showTab('inventory')">Abrir Baú de Itens para equipar</button><div class="test-wallet-note">${coinHTML()}<span><b>Loja compra · Baús variam por tema e raridade.</b><br>Todo item adquirido aparece no Baú de Itens deste perfil.</span></div></div>`}
function setProfileFrame(id){const p=active();if(!p)return;if(id&&!owns(p,id)){storeCat='frame';showTab('store');return toast('Compre essa moldura primeiro.')}p.equipped.frame=id||null;save();renderAll();toast(id?'Moldura equipada!':'Moldura removida.')}
function setProfileBackground(id){const p=active();if(!p)return;if(id&&!owns(p,id)){storeCat='background';showTab('store');return toast('Compre esse fundo primeiro.')}p.equipped.background=id||null;save();renderAll();toast(id?'Fundo equipado!':'Fundo removido.')}
function renderProfiles(){const box=document.getElementById('profileList');if(!state.profiles.length){box.innerHTML='<div class="empty">Nenhum perfil criado.</div>';return}box.innerHTML=state.profiles.map(p=>`<div class="profile-card ${p.id===state.activeId?'active-card':''}"><div class="profile-row">${avatarHTML(p,'medium',true)}<div><h3>${esc(p.name)}</h3><p>Nível ${levelFor(p.xp)} · ${coinHTML()} ${p.coins} · Visual: ${esc(avatarSkin(p).name)}</p></div>${p.id===state.activeId?'<span class="profile-btn">ATIVO</span>':`<button class="profile-btn" onclick="selectProfile('${p.id}')">Jogar</button>`}</div></div>`).join('')}
function selectProfile(id){state.activeId=id;save();renderAll();showTab('home')}
const VAULT_TABS=[['frame','Molduras','🖼️'],['background','Fundos','🏰'],['effect','Efeitos','✨']];
function setInventoryCat(cat){inventoryCat=cat;vaultSelectedId=null;renderItemVault()}
function vaultSelectItem(id){vaultSelectedId=id;renderItemVault()}
function vaultResetCurrent(){const p=active();if(!p)return;if(inventoryCat==='frame')p.equipped.frame=null;else if(inventoryCat==='background')p.equipped.background=null;else return;vaultSelectedId=null;save();renderAll();renderItemVault();toast('Visual padrão restaurado!')}
function vaultSourceLabel(x){if(x?.source==='chest'||x?.shop===false)return 'RECOMPENSA DO BAÚ';if(String(x?.source||'').includes('table'))return 'MUNDO DA TABUADA';return 'LOJA MÁGICA'}
function vaultPreviewArt(p,x){
  if(!x)return `<div class="vault-preview-inner"><div class="vault-preview-stage"><img src="pack-magic.webp" alt="" style="width:82%;height:82%;object-fit:contain"></div><div class="vault-preview-info"><span class="vault-preview-kicker">COFRE VAZIO</span><h2>Novos tesouros virão!</h2><p>Visite a Loja ou conquiste baús para encontrar itens desta categoria.</p></div></div>`;
  const equippedId=p.equipped?.[inventoryCat],eq=x.id===equippedId,relic=x.source==='chest'||x.shop===false;
  let art='';
  if(x.cat==='frame')art=`<div class="vault-avatar-demo"><div class="vault-face-crop"><img src="${avatarAsset(p)}" alt="Rosto de ${esc(p.name)}"></div><img class="vault-demo-frame" src="${x.asset}" alt="${esc(x.name)}"></div>`;
  else if(x.cat==='background')art=`<div class="vault-bg-demo" style="background-image:url('${x.asset}')"><img src="${avatarAsset(p)}" alt="${esc(p.name)}"></div>`;
  else art=`<div class="vault-fx-demo ${x.fx==='papai'?'papai':''}"><img src="${x.asset}" alt="${esc(x.name)}"></div>`;
  const description=x.cat==='frame'?`Veja como a moldura envolve o retrato de ${esc(p.name)}.`:x.cat==='background'?'Este cenário será usado na HOME e nas telas compatíveis.':'Este efeito aparece durante as respostas e comemorações.';
  return `<div class="vault-preview-inner"><div class="vault-preview-stage">${art}</div><div class="vault-preview-info"><span class="vault-preview-kicker">PRÉVIA DO ITEM</span><h2>${esc(x.name)}</h2><p>${description}</p><div class="vault-preview-meta"><span class="vault-preview-chip">${esc(x.rarity||'Mágico')}</span><span class="vault-preview-chip">${vaultSourceLabel(x)}</span></div><button type="button" class="vault-preview-action ${eq?'equipped':''}" ${eq?'disabled':''} onclick="useOwnedItem('${x.id}')">${eq?'✓ EM USO':'EQUIPAR AGORA'}</button>${x.cat==='effect'?`<button type="button" class="vault-preview-play" onclick="vaultPlayPreview('${x.id}')">▶ VER EFEITO</button>`:''}</div></div>`;
}
function vaultPlayPreview(id){const x=item(id);if(!x||x.cat!=='effect')return;if(x.fx==='papai')return showPapaiMoodFX(true);if(x.fx==='asset'&&x.asset)return showEquippedAssetFX(x.asset);if(x.fx==='magic')return showIllustratedMagicFX(true);if(x.fx==='confetti')return showAssetBurst(1550);if(x.fx==='stars')return burst('stars',1550);if(['portal','crown'].includes(x.fx))return showGrandFX(x.fx,true);showMagicFX(x.fx||'magic',true)}
function syncVaultFixedHeight(){const shell=document.querySelector('.vault-v2-shell'),zone=document.querySelector('.vault-fixed-zone');if(!shell||!zone)return;requestAnimationFrame(()=>shell.style.setProperty('--vault-fixed-height',`${Math.ceil(zone.getBoundingClientRect().height)}px`))}
function renderItemVault(){
  const p=active(),tabs=document.getElementById('vaultTabs'),grid=document.getElementById('vaultGrid'),status=document.getElementById('vaultStatus'),preview=document.getElementById('vaultPreview'),profile=document.getElementById('vaultProfileMini'),wallet=document.getElementById('vaultWallet');if(!tabs||!grid||!status||!preview)return;
  if(!p){status.innerHTML='<div><b>Escolha um perfil</b><span>O Baú é individual para cada criança.</span></div>';tabs.innerHTML='';preview.innerHTML=vaultPreviewArt(null,null);grid.innerHTML='<div class="vault-empty">Nenhum perfil ativo.</div>';syncVaultFixedHeight();return}
  if(profile)profile.innerHTML=`${avatarHTML(p,'mini',false)}<div class="vault-profile-copy"><strong>${esc(p.name)}</strong><span>NÍVEL ${levelFor(p.xp)} · COFRE PESSOAL</span></div>`;
  if(wallet)wallet.innerHTML=`${coinHTML()} ${Number(p.coins||0).toLocaleString('pt-BR')}`;
  tabs.innerHTML=VAULT_TABS.map(([id,label,icon])=>`<button type="button" class="vault-tab ${inventoryCat===id?'active':''}" onclick="setInventoryCat('${id}')"><b>${icon}</b>${label}</button>`).join('');
  const all=p.owned.map(id=>item(id)).filter(x=>x&&x.cat===inventoryCat&&!x.bundle),equippedId=p.equipped?.[inventoryCat];
  if(!all.some(x=>x.id===vaultSelectedId))vaultSelectedId=(all.find(x=>x.id===equippedId)||all[0]||{}).id||null;
  const selected=all.find(x=>x.id===vaultSelectedId)||null,canReset=inventoryCat==='frame'||inventoryCat==='background';
  preview.innerHTML=vaultPreviewArt(p,selected);
  status.innerHTML=`<div><b>${VAULT_TABS.find(x=>x[0]===inventoryCat)?.[1]||'Itens'} de ${esc(p.name)}</b><span>Toque em um tesouro para experimentar antes de equipar.</span>${canReset?`<button type="button" class="vault-default" onclick="vaultResetCurrent()">Usar visual padrão</button>`:''}</div><div class="vault-count">${all.length} ITEM${all.length===1?'':'S'}</div>`;
  grid.innerHTML=all.length?all.map(x=>{const eq=x.id===equippedId,relic=x.source==='chest'||x.shop===false,selected=x.id===vaultSelectedId;return `<div class="vault-item ${eq?'equipped':''} ${relic?'rare-chest':''} ${selected?'selected':''}"><button class="vault-select" type="button" onclick="vaultSelectItem('${x.id}')" aria-label="Ver ${esc(x.name)}"></button><div class="vault-item-art">${assetHTML(x)}</div><span class="vault-name">${esc(x.name)}</span><div class="vault-meta"><span class="vault-chip ${relic?'relic':''}">${esc(x.rarity||'Mágico')}</span>${relic?'<span class="vault-chip relic">DO BAÚ</span>':''}</div><button type="button" class="vault-use" onclick="useOwnedItem('${x.id}')">${eq?'✓ Equipado':'Equipar'}</button></div>`}).join(''):'<div class="vault-empty">Você ainda não possui itens desta categoria. Compre na Loja Mágica ou encontre relíquias nos baús de aventura.</div>';
  syncVaultFixedHeight();
}
function renderInventory(){renderItemVault()}

function useOwnedItem(id){const p=active(),x=item(id);if(!p||!x||!owns(p,id)||!['frame','background','effect'].includes(x.cat))return;vaultSelectedId=id;equip(p,x);save();renderAll();renderItemVault();toast(`${x.name} equipado!`)}
function showCreateProfile(){document.getElementById('profileNameInput').value='';document.getElementById('createOverlay').classList.add('open')}
function createProfile(){const n=document.getElementById('profileNameInput').value.trim();if(!n)return toast('Digite um nome.');const p=profileDefaults(n);state.profiles.push(p);state.activeId=p.id;save();closeOverlay('createOverlay');renderAll();showTab('home')}
function closeOverlay(id){document.getElementById(id).classList.remove('open')}
function overlayBg(e){if(e.target.classList.contains('overlay'))e.target.classList.remove('open')}
function showTab(t){['home','chests','collection','world','background','fashion','store','inventory','profile'].forEach(x=>document.getElementById(x+'Screen').classList.toggle('active',x===t));const app=document.getElementById('app'),homeBtn=document.getElementById('homeReturnBtn');app.classList.toggle('home-mode',t==='home');app.classList.toggle('background-mode',t==='background');app.classList.toggle('fashion-mode',t==='fashion');app.classList.toggle('world-map-mode',t==='world');app.classList.toggle('vault-mode',t==='inventory');app.classList.toggle('internal-mode',t!=='home');if(homeBtn)homeBtn.classList.toggle('show',t!=='home'&&t!=='fashion'&&t!=='world'&&t!=='inventory');if(t==='home')renderHome();if(t==='chests')renderChests();if(t==='collection')renderCollection();if(t==='world')renderWorlds();if(t==='background')renderBackgroundGallery();if(t==='fashion')renderFashion();if(t==='store')renderStore();if(t==='inventory'){renderItemVault();const shell=document.querySelector('.vault-v2-shell');if(shell)shell.scrollTop=0}if(t==='profile'){renderProfileCustomizer();renderProfiles()}window.scrollTo(0,0)}
function renderAll(){state.profiles.forEach(migrateProfile);renderHeader();renderHome();renderChests();renderCollection();renderWorlds();renderBackgroundGallery();renderFashion();renderStore();renderProfileCustomizer();renderProfiles();renderItemVault();save()}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function makeChoices(answer,a){
  const correct=Number(answer),step=Math.max(1,Number(a)||1),pool=[correct-step,correct+step,correct-step*2,correct+step*2,correct-1,correct+1,correct-2,correct+2,correct-5,correct+5,correct-10,correct+10];
  const vals=[correct];shuffle(pool);
  for(const v of pool){if(vals.length>=4)break;if(Number.isInteger(v)&&v>0&&v<=100&&!vals.includes(v))vals.push(v)}
  let guard=0;while(vals.length<4&&guard++<100){const v=Math.max(1,Math.min(100,correct+(Math.floor(Math.random()*21)-10)));if(!vals.includes(v))vals.push(v)}
  shuffle(vals);return vals;
}
function startGame(n,mode=null){if(!ensureActive())return;const p=active(),st=tableStatus(p,n);if(st.id==='locked')return toast(`Complete primeiro a tabuada do ${n-1}.`);if(st.id==='scheduled')return toast(st.note+'.');mode=mode||(st.id==='due'?'review':'learn');const cards=[];for(let b=1;b<=10;b++)cards.push({a:n,b,answer:n*b,streak:0});shuffle(cards);const wm=worldMeta(n);session={n,mode,queue:cards,mastered:0,correct:0,wrong:0,coins:0,started:Date.now(),world:wm};document.getElementById('app').style.display='none';const game=document.getElementById('game');game.style.display='block';game.style.setProperty('--game-world-bg',`url("${wm.practice}")`);document.getElementById('gameWorldKicker').textContent=`MUNDO ${n} · TABUADA DO ${n}`;document.getElementById('gameTitle').textContent=wm.name;renderQuestion()}

function renderQuestion(){if(!session)return;if(session.queue.length===0)return finishGame();locked=false;const c=session.queue[0];document.getElementById('question').textContent=`${c.a} × ${c.b} = ?`;document.getElementById('gameSub').textContent=session.mode==='review'?'Revisão espaçada':'Aprender e dominar';document.getElementById('liveCoin').innerHTML=`${coinHTML()} +${session.coins}`;document.getElementById('gameMastered').textContent=`${session.mastered}/10 dominadas`;document.getElementById('gameProgress').style.width=`${session.mastered*10}%`;document.querySelectorAll('.pip').forEach((p,i)=>p.classList.toggle('on',i<c.streak));document.getElementById('choices').innerHTML=makeChoices(c.answer,c.a).map(v=>`<button class="practice-choice" onclick="answer(${v},this)">${v}</button>`).join('');const f=document.getElementById('feedback');f.className='practice-feedback';f.textContent=c.streak===1?'Mais um acerto para dominar esta conta!':'Escolha uma resposta.';document.getElementById('queueCards').innerHTML=session.queue.slice(0,7).map((q,i)=>`<div class="qmini">${i===0?'▶ ':''}${q.a}×${q.b}<br>${q.streak}/2</div>`).join('')}

function showWrongAnswerSignal(){
  document.querySelector('.wrong-answer-signal')?.remove();
  const card=document.querySelector('.practice-card');
  if(card){card.classList.remove('wrong-shake');void card.offsetWidth;card.classList.add('wrong-shake');setTimeout(()=>card.classList.remove('wrong-shake'),500)}
  const signal=document.createElement('div');signal.className='wrong-answer-signal';signal.innerHTML='<div class="wrong-answer-badge"><b>✕</b><span>OPS!</span></div>';document.body.appendChild(signal);setTimeout(()=>signal.remove(),650)
}
function answer(v,btn){if(locked)return;locked=true;const c=session.queue.shift(),p=active(),good=v===c.answer,f=document.getElementById('feedback'),papaiSelected=item(p?.equipped?.effect)?.fx==='papai';document.querySelectorAll('.practice-choice').forEach(b=>b.disabled=true);if(good){btn.classList.add('good');c.streak++;session.correct++;session.coins++;p.coins++;p.xp+=5;p.stats.correct=(p.stats.correct||0)+1;if(c.streak>=2){session.mastered++;p.xp+=5;f.textContent='⭐ Dominada! Dois acertos seguidos.'}else{session.queue.push(c);f.textContent='Muito bem! +1 moeda'}f.className='practice-feedback good';coinPop();playFX(true);beep(true)}else{btn.classList.add('bad');document.querySelectorAll('.practice-choice').forEach(b=>{if(Number(b.textContent)===c.answer)b.classList.add('good')});c.streak=0;session.wrong++;p.stats.wrong=(p.stats.wrong||0)+1;session.queue.push(c);f.textContent=`✕ Ops! ${c.a} × ${c.b} = ${c.answer}`;f.className='practice-feedback bad';showWrongAnswerSignal();beep(false);if(papaiSelected)setTimeout(()=>playFX(false),PAPAI_ERROR_ENTRANCE_DELAY);else playFX(false)}save();renderHeader();setTimeout(renderQuestion,good?FX_TIMING.good:(papaiSelected?FX_TIMING.papaiBad:FX_TIMING.bad))}

function finishGame(){const p=active(),seconds=Math.max(1,Math.round((Date.now()-session.started)/1000)),now=Date.now(),t=tableLearning(p,session.n),firstMastery=session.mode!=='review'&&!t.masteredAt;p.stats.sessions=(p.stats.sessions||0)+1;p.stats.masteredDecks[session.n]={at:now,correct:session.correct,wrong:session.wrong};p.xp+=50;let scheduleText='';if(session.mode==='review'&&t.masteredAt){const oldStage=Number(t.reviewStage||0);let stage=oldStage;if(session.wrong===0)stage=Math.min(REVIEW_INTERVAL_DAYS.length-1,oldStage+1);else if(session.wrong>=3)stage=Math.max(0,oldStage-1);t.reviewStage=stage;t.reviewCount=Number(t.reviewCount||0)+1;t.lastReviewAt=now;if(session.wrong>=3)t.lapses=Number(t.lapses||0)+1;const days=REVIEW_INTERVAL_DAYS[stage];t.nextReviewAt=now+days*86400000;scheduleText=`Revisão concluída. Próxima em ${days} dia${days===1?'':'s'}.`}else{t.masteredAt=t.masteredAt||now;t.reviewStage=0;t.reviewCount=Number(t.reviewCount||0);t.nextReviewAt=now+REVIEW_INTERVAL_DAYS[0]*86400000;t.lastReviewAt=now;const next=session.n<10?` A tabuada do ${session.n+1} foi desbloqueada!`:'';scheduleText=`Tabuada do ${session.n} dominada!${next} Revisão em 1 dia.`}if(firstMastery&&session.n===2&&!p.flags?.table2PirateChestClaimed){p.flags=p.flags||{};p.flags.table2PirateChestPending=true;scheduleText+=' 🏴‍☠️ Baú dos Navegadores desbloqueado!';}if(firstMastery&&session.n===3&&!p.flags?.table3InventorChestClaimed){p.flags=p.flags||{};p.flags.table3InventorChestPending=true;scheduleText+=' 🔧 Baú dos Inventores desbloqueado!';}p.history.unshift({deck:session.n,mode:session.mode,correct:session.correct,wrong:session.wrong,coins:session.coins,seconds,at:now});p.history=p.history.slice(0,40);save();document.getElementById('finishText').textContent=scheduleText;document.getElementById('results').innerHTML=`<div class="res"><b>${session.correct}</b><span>ACERTOS</span></div><div class="res"><b>${session.wrong}</b><span>ERROS</span></div><div class="res"><b>+${session.coins}</b><span>MOEDAS</span></div>`;document.getElementById('finish').classList.add('open');playFX(true);beep(true)}
function finishClose(){clearActiveFX();document.getElementById('finish').classList.remove('open');const p=active(),hasChest=!!(p&&(p.flags?.table2PirateChestPending||p.flags?.table3InventorChestPending));session=null;document.getElementById('game').style.display='none';document.getElementById('app').style.display='block';renderAll();showTab('world');if(hasChest)setTimeout(()=>toast('🎁 Novo baú disponível no menu Baús!'),260)}
function leaveGame(){clearActiveFX();session=null;document.getElementById('game').style.display='none';document.getElementById('app').style.display='block';renderAll();showTab('world')}
function coinPop(){const e=document.createElement('div');e.className='coin-pop';e.innerHTML=`+1 ${coinHTML()}`;document.body.appendChild(e);setTimeout(()=>e.remove(),900)}
function clearActiveFX(){document.querySelectorAll('.fx-spectacle,.fx-stage,.fx-illustrated,.fx-screen-flash,.fx-art-overlay,.confetti,.papai-celebration,.wrong-answer-signal').forEach(e=>e.remove())}
function playFX(good=true){const p=active(),equipped=item(p?.equipped?.effect),fx=equipped?.fx||'magic';if(!(fx==='papai'&&!good))clearActiveFX();else document.querySelectorAll('.fx-spectacle,.fx-stage,.fx-illustrated,.fx-screen-flash,.fx-art-overlay,.confetti,.papai-celebration').forEach(e=>e.remove());if(fx==='papai'){showPapaiMoodFX(good);return}if(!good){showIllustratedMagicFX(false);return}if(fx==='asset'&&equipped?.asset){showEquippedAssetFX(equipped.asset);return}if(fx==='magic'){showIllustratedMagicFX(true);return}if(fx==='confetti'){if(good)showAssetBurst(1550);else burst('error',1450);return}if(fx==='stars'){burst(good?'stars':'error-stars',good?1550:1450);return}if(['portal','crown'].includes(fx)){showGrandFX(fx,good);return}showMagicFX(fx,good)}
function showEquippedAssetFX(asset){const e=document.createElement('div');e.className='fx-art-overlay asset-effect';e.innerHTML=`<img src="${asset}" alt="">`;document.body.appendChild(e);const game=document.getElementById('game');if(game){game.classList.remove('fx-impact');void game.offsetWidth;game.classList.add('fx-impact');setTimeout(()=>game.classList.remove('fx-impact'),430)}setTimeout(()=>e.remove(),1650)}
function showAssetBurst(ms=1550){const e=document.createElement('div');e.className='fx-art-overlay';e.innerHTML='<img src="fx-confetti.webp" alt="">';document.body.appendChild(e);setTimeout(()=>e.remove(),ms)}
function showIllustratedMagicFX(good=true){const box=document.createElement('div');box.className='fx-illustrated'+(good?'':' error');box.innerHTML=`<div class="fx-caption"><b>${good?'INCRÍVEL!':'QUASE!'}</b><span>${good?'Explosão de magia dos números':'O X explosivo indica o erro — tente outra vez!'}</span></div><img src="${good?'fx-success-gems.png':'fx-error-broken.png'}" alt="">`;document.body.appendChild(box);const game=document.getElementById('game');if(game){game.classList.remove('fx-impact');void game.offsetWidth;game.classList.add('fx-impact');setTimeout(()=>game.classList.remove('fx-impact'),500)}setTimeout(()=>box.remove(),good?1750:1600)}
function showGrandFX(kind='magic',good=true){
  const p=active();
  const old=document.querySelector('.fx-spectacle');if(old)old.remove();
  const titles={magic:['INCRÍVEL!','Explosão de Magia'],portal:['PORTAL SUPREMO!','Energia dimensional liberada'],crown:['COROA DA VITÓRIA!','Uma resposta digna da realeza']};
  const err=['QUASE!','A magia continua com você'];
  const [title,sub]=good?(titles[kind]||titles.magic):err;
  const scene=document.createElement('div');scene.className=`fx-spectacle ${kind}${good?'':' error'}`;
  scene.innerHTML=`<span class="fx-rays"></span><span class="fx-ring r1"></span><span class="fx-ring r2"></span><span class="fx-ring r3"></span><span class="fx-vortex"></span><span class="fx-crown-big">♛</span><img class="fx-live-avatar" src="${avatarAsset(p)}" alt=""><div class="fx-title-card"><b>${title}</b><span>${sub}</span></div>${good?`<div class="fx-reward-pill">${coinHTML()} +1 moeda&nbsp;&nbsp;✦ +5 XP</div>`:''}`;
  const count=good?52:20,chars=kind==='crown'?['✦','★','✧','♛']:kind==='portal'?['✦','◆','✧','◈']:['✦','★','✧','◆'];
  for(let i=0;i<count;i++){
    const sp=document.createElement('i');sp.className='fx-spark'+(i%5===0?' gem':i%3===0?' gold':'');if(!sp.classList.contains('gem'))sp.textContent=chars[i%chars.length];
    const a=Math.random()*Math.PI*2,dist=(good?120:70)+Math.random()*(good?330:145);sp.style.setProperty('--x',`${Math.cos(a)*dist}px`);sp.style.setProperty('--y',`${Math.sin(a)*dist-(good?55:10)}px`);sp.style.setProperty('--rot',`${260+Math.random()*760}deg`);sp.style.setProperty('--delay',`${Math.random()*.15}s`);sp.style.setProperty('--dur',`${1.02+Math.random()*.48}s`);sp.style.setProperty('--scale',`${.65+Math.random()*1.1}`);sp.style.fontSize=`${12+Math.random()*21}px`;scene.appendChild(sp)
  }
  document.body.appendChild(scene);
  const game=document.getElementById('game');if(game){game.classList.remove('fx-impact');void game.offsetWidth;game.classList.add('fx-impact');setTimeout(()=>game.classList.remove('fx-impact'),430)}
  setTimeout(()=>scene.remove(),good?1780:1600)
}

function burst(type='confetti',ms=1500){const box=document.createElement('div');box.className='confetti';const chars=type==='stars'?['✨','⭐','✦']:type==='error-stars'?['✦','·','✧']:type==='error'?['💫','·','✦']:['🎉','⭐','♦','●','■'];for(let i=0;i<(type.startsWith('error')?14:24);i++){const e=document.createElement('i');e.textContent=chars[i%chars.length];e.style.setProperty('--x',`${(Math.random()-.5)*(type.startsWith('error')?220:380)}px`);e.style.setProperty('--y',`${(Math.random()-.55)*(type.startsWith('error')?280:470)}px`);e.style.left=(45+Math.random()*10)+'%';e.style.animationDelay=(Math.random()*.12)+'s';box.appendChild(e)}document.body.appendChild(box);setTimeout(()=>box.remove(),ms)}

function showMagicFX(kind='magic',good=true){const flash=document.createElement('div');flash.className='fx-screen-flash'+(good?'':' error');document.body.appendChild(flash);const box=document.createElement('div');box.className=`fx-stage ${kind}${good?'':' error'}`;box.innerHTML='<span class="fx-core"></span>';const count=kind==='rainbow'?32:kind==='phoenix'?40:36;const iconMap={rainbow:['✦','●','◆'],numbers:['2','×','7','+','9','='],constellation:['✦','★','8','×'],goldburst:['★','✦','10','+'],phoenix:['✦','7','×','♛']},icons=iconMap[kind]||['✦','★','✧'];for(let i=0;i<count;i++){const e=document.createElement('i');if(i%3===0){e.className='star';e.textContent=icons[i%icons.length]}else if(i%4===0)e.className='diamond';const a=Math.random()*Math.PI*2,dist=(good?95:52)+Math.random()*(good?195:105);e.style.setProperty('--x',`${Math.cos(a)*dist}px`);e.style.setProperty('--y',`${Math.sin(a)*dist-(good?30:5)}px`);e.style.setProperty('--rot',`${260+Math.random()*560}deg`);e.style.setProperty('--delay',`${Math.random()*.13}s`);e.style.setProperty('--dur',`${.9+Math.random()*.55}s`);box.appendChild(e)}document.body.appendChild(box);setTimeout(()=>{box.remove();flash.remove()},good?1650:1500)}

const PAPAI_CELEBRATION_SEQUENCES=[
  ['papai-celebrate-01.png','papai-celebrate-02.png','papai-celebrate-04.png'],
  ['papai-celebrate-05.png','papai-celebrate-06.png','papai-celebrate-08.png'],
  ['papai-celebrate-02.png','papai-celebrate-03.png','papai-celebrate-07.png']
];
function mountPapaiScene(scene,seq,{title,subtitle,alt='Papai',sad=false,symbols=['★','✦','⭐'],exitMs=1320,removeMs=1740,heart=false}={}){
  scene.innerHTML=`<div class="papai-aura"></div><div class="papai-speech"><b>${title}</b><span>${subtitle}</span></div><div class="papai-character"><img src="${seq[0]}" alt="${alt}"></div><div class="papai-stars" aria-hidden="true"></div>${heart?'<div class="papai-heart" aria-hidden="true">💛</div>':''}`;
  const stars=scene.querySelector('.papai-stars');
  for(let i=0;i<18;i++){
    const sp=document.createElement('i');sp.textContent=symbols[i%symbols.length];
    sp.style.setProperty('--sx',`${(Math.random()-.5)*(sad?180:220)}px`);
    sp.style.setProperty('--sy',`${-30-Math.random()*(sad?170:220)}px`);
    sp.style.setProperty('--sd',`${Math.random()*.18}s`);stars.appendChild(sp)
  }
  document.body.appendChild(scene);
  const img=scene.querySelector('.papai-character img');
  [1,2].forEach((idx)=>setTimeout(()=>{if(!img.isConnected)return;img.classList.remove('papai-swap');void img.offsetWidth;img.src=seq[idx];img.classList.add('papai-swap')},sad?420*idx:350*idx));
  setTimeout(()=>scene.classList.add('papai-exit'),exitMs);
  setTimeout(()=>scene.remove(),removeMs)
}
function showPapaiMoodFX(good=true){
  const old=document.querySelector('.papai-celebration');if(old)old.remove();
  if(good){
    const seq=PAPAI_CELEBRATION_SEQUENCES[Math.floor(Math.random()*PAPAI_CELEBRATION_SEQUENCES.length)];
    const scene=document.createElement('div');scene.className='papai-celebration';
    mountPapaiScene(scene,seq,{title:'ISSO!',subtitle:'Muito bem! ⭐',alt:'Papai comemorando'});
    return;
  }
  const seq=['papai-celebrate-08.png','papai-celebrate-03.png','papai-celebrate-01.png'];
  const scene=document.createElement('div');scene.className='papai-celebration sad';
  const profileName=esc(active()?.name||'campeã');
  const messages=[
    {title:'EI, TÁ TUDO BEM',subtitle:'Respira fundo... o papai tá com você.<br>Vamos tentar de novo? 💛'},
    {title:`QUASE, ${profileName.toUpperCase()}!`,subtitle:'Errar também faz parte.<br>Eu sei que você consegue! 💛'},
    {title:'NÃO DESISTE',subtitle:'Olha pra mim... tenta mais uma vez.<br>O papai tá torcendo por você! ⭐'}
  ];
  const msg=messages[Math.floor(Math.random()*messages.length)];
  mountPapaiScene(scene,seq,{title:msg.title,subtitle:msg.subtitle,alt:'Papai incentivando',sad:true,symbols:['💛','✦','·','★'],exitMs:1900,removeMs:2460,heart:true});
}
function showPapaiCelebration(){showPapaiMoodFX(true)}

let audioCtx;function beep(good){try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);o.frequency.value=good?700:230;g.gain.setValueAtTime(.08,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+.16);o.start();o.stop(audioCtx.currentTime+.17)}catch(e){}}
let toastTimer;function toast(msg){let e=document.getElementById('toast');if(!e){e=document.createElement('div');e.id='toast';e.style.cssText='position:fixed;z-index:180;left:50%;bottom:105px;transform:translateX(-50%);background:#3e1c71;color:white;border:2px solid rgba(255,255,255,.3);padding:11px 15px;border-radius:15px;font-size:12px;font-weight:900;box-shadow:0 10px 30px rgba(0,0,0,.25);max-width:88%;text-align:center';document.body.appendChild(e)}e.textContent=msg;e.style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.style.display='none',1900)}

/* FINAL PATCH v0.9.3.0 */
(function(){
  const FINAL_STORAGE_REV='tq.final.v0930';
  const STARTER_OWNED_IDS=['frame_star','bg_forest','fx_papai'];
  const PRICE_BY_RARITY={Comum:60,Raro:120,'Épico':180,'Lendário':260,Oculto:0,Inicial:0};
  const PACKAGE_PRICE_BY_RARITY={Raro:280,'Épico':420,'Lendário':620};
  const DAILY_CHEST_DAY_MARKS=[5,10,15,20,25,30];
  const DAILY_CHEST_ROTATION=['magic','pirate','starlight','royal','pirate','starlight'];
  const DAILY_FRAME_REWARD_IDS=['frame_adventure_02','frame_adventure_04','frame_adventure_06','frame_adventure_08','frame_adventure_09','frame_adventure_10'];
  const MASTERY_REWARD_MAP={
    pair12:['fashion:navigator2','chest_frame_pirate_golden_nautical','chest_frame_pirate_fantastic_treasures','frame_adventure_07','frame_panda_cosmic','frame_infinity_sensei','frame_infinity_crystal','table2_bg_pirate_bay','table2_bg_pirate_port','fx_papai_jjk','fx_lottie_rift_portal'],
    pair34:['fashion:inventor3','table3_bg_inventor_workshop','table3_bg_mechanical_square','fx_lottie_red_energy_beam','collect_bonus_08'],
    pair56:['fashion:coelhinha','frame_bonus_01','frame_bonus_02','bg_bonus_01','collect_bonus_08','fx_lottie_talisman_eruption'],
    pair78:['fashion:havaiana','frame_bonus_06','bg_bonus_06','collect_bonus_09','chest_frame_starfall_cascade'],
    pair910:['fashion:lbug','frame_bonus_04','bg_bonus_04','collect_bonus_10','frame_secret_royal']
  };

  function pushUnique(items){for(const it of items){if(!CATALOG.some(x=>x.id===it.id))CATALOG.push(it)}}
  pushUnique([
    {id:'fx_papai_jjk',cat:'effect',asset:'papai_correct_lottie/assets/papai_thumbsup.png',name:'Papai: Orgulho Infinito',rarity:'Oculto',shop:false,source:'mastery12',fx:'lottie',lottie:'papai_correct_lottie/papai_correct_effect_jjk_lottie.json',lottieAssets:'papai_correct_lottie/assets/'},
    {id:'fx_lottie_purple_domain',cat:'effect',asset:'papai_correct_lottie/assets/magic_swirl.png',name:'Vórtice do Domínio Roxo',rarity:'Épico',shop:true,source:'store',fx:'lottie',lottie:'effect-lottie-purple_domain_vortex.json'},
    {id:'fx_lottie_cursed_orb',cat:'effect',asset:'papai_correct_lottie/assets/magic_seal.png',name:'Expansão do Orbe Amaldiçoado',rarity:'Oculto',shop:false,source:'chest',fx:'lottie',lottie:'effect-lottie-cursed_orb_expansion.json'},
    {id:'fx_lottie_black_flash',cat:'effect',asset:'papai_correct_lottie/assets/magic_check.png',name:'Impacto do Flash Negro',rarity:'Lendário',shop:true,source:'store',fx:'lottie',lottie:'effect-lottie-black_flash_impact.json'},
    {id:'fx_lottie_blue_slash',cat:'effect',asset:'papai_correct_lottie/assets/magic_sparkles.png',name:'Corte de Energia Azul',rarity:'Épico',shop:true,source:'store',fx:'lottie',lottie:'effect-lottie-blue_cursed_slash.json'},
    {id:'fx_lottie_green_vortex',cat:'effect',asset:'papai_correct_lottie/assets/magic_swirl.png',name:'Espiral do Vórtice Verde',rarity:'Raro',shop:true,source:'store',fx:'lottie',lottie:'effect-lottie-green_vortex_spiral.json'},
    {id:'fx_lottie_rift_portal',cat:'effect',asset:'papai_correct_lottie/assets/magic_seal.png',name:'Portal da Fenda',rarity:'Oculto',shop:false,source:'mastery12',fx:'lottie',lottie:'effect-lottie-rift_portal.json'},
    {id:'fx_lottie_golden_seal',cat:'effect',asset:'papai_correct_lottie/assets/magic_seal.png',name:'Selo do Ritual Dourado',rarity:'Oculto',shop:false,source:'chest',fx:'lottie',lottie:'effect-lottie-golden_ritual_seal.json'},
    {id:'fx_lottie_red_energy_beam',cat:'effect',asset:'papai_correct_lottie/assets/magic_sparkles.png',name:'Raio de Energia Rubra',rarity:'Oculto',shop:false,source:'mastery34',fx:'lottie',lottie:'effect-lottie-red_energy_beam.json'},
    {id:'fx_lottie_celestial_pulse',cat:'effect',asset:'papai_correct_lottie/assets/magic_check.png',name:'Pulso Celestial',rarity:'Oculto',shop:false,source:'chest',fx:'lottie',lottie:'effect-lottie-celestial_pulse.json'},
    {id:'fx_lottie_talisman_eruption',cat:'effect',asset:'papai_correct_lottie/assets/magic_sparkles.png',name:'Erupção do Talismã',rarity:'Oculto',shop:false,source:'mastery56',fx:'lottie',lottie:'effect-lottie-talisman_eruption.json'},
    {id:'frame_adventure_01',cat:'frame',asset:'frame-adventure-01-strawhat.png',name:'Moldura Chapéu do Aventureiro',rarity:'Lendário',shop:true,source:'store',collection:'aventura_dos_mares'},
    {id:'frame_adventure_02',cat:'frame',asset:'frame-adventure-02-three-blades.png',name:'Moldura Três Lâminas',rarity:'Oculto',shop:false,source:'daily',collection:'aventura_dos_mares'},
    {id:'frame_adventure_03',cat:'frame',asset:'frame-adventure-03-tide-wheel.png',name:'Moldura Leme das Marés',rarity:'Épico',shop:true,source:'store',collection:'aventura_dos_mares'},
    {id:'frame_adventure_04',cat:'frame',asset:'frame-adventure-04-flame-chef.png',name:'Moldura Chef das Chamas',rarity:'Oculto',shop:false,source:'daily',collection:'aventura_dos_mares'},
    {id:'frame_adventure_05',cat:'frame',asset:'frame-adventure-05-rescue-bloom.png',name:'Moldura Guardião da Cura',rarity:'Lendário',shop:true,source:'store',collection:'aventura_dos_mares'},
    {id:'frame_adventure_06',cat:'frame',asset:'frame-adventure-06-sky-marksman.png',name:'Moldura Atirador dos Céus',rarity:'Oculto',shop:false,source:'daily',collection:'aventura_dos_mares'},
    {id:'frame_adventure_07',cat:'frame',asset:'frame-adventure-07-mecha-tide.png',name:'Moldura Maré Mecânica',rarity:'Oculto',shop:false,source:'mastery12',collection:'aventura_dos_mares'},
    {id:'frame_adventure_08',cat:'frame',asset:'frame-adventure-08-music-crown.png',name:'Moldura Rei da Música',rarity:'Oculto',shop:false,source:'daily',collection:'aventura_dos_mares'},
    {id:'frame_adventure_09',cat:'frame',asset:'frame-adventure-09-pirate-treasure.png',name:'Moldura Bandeira do Tesouro',rarity:'Oculto',shop:false,source:'daily',collection:'aventura_dos_mares'},
    {id:'frame_adventure_10',cat:'frame',asset:'frame-adventure-10-navigator-map.png',name:'Moldura Mapa do Navegador',rarity:'Oculto',shop:false,source:'daily',collection:'aventura_dos_mares'},
    {id:'frame_bonus_01',cat:'frame',asset:'bonus-frame-01.png',name:'Moldura Reino Rosa',rarity:'Raro',shop:true,source:'store',collection:'bonus_loja'},
    {id:'frame_bonus_02',cat:'frame',asset:'bonus-frame-02.png',name:'Moldura Princesa Violeta',rarity:'Raro',shop:true,source:'store',collection:'bonus_loja'},
    {id:'frame_bonus_03',cat:'frame',asset:'bonus-frame-03.png',name:'Moldura Jardim Real',rarity:'Épico',shop:true,source:'store',collection:'bonus_loja'},
    {id:'frame_bonus_04',cat:'frame',asset:'bonus-frame-04.png',name:'Moldura Joaninha Neon',rarity:'Épico',shop:true,source:'store',collection:'bonus_loja'},
    {id:'frame_bonus_05',cat:'frame',asset:'bonus-frame-05.png',name:'Moldura Joaninha Glam',rarity:'Lendário',shop:true,source:'store',collection:'bonus_loja'},
    {id:'frame_bonus_06',cat:'frame',asset:'bonus-frame-06.png',name:'Moldura Tropical Matemático',rarity:'Raro',shop:true,source:'store',collection:'bonus_loja'},
    {id:'frame_bonus_07',cat:'frame',asset:'bonus-frame-07.png',name:'Moldura Números Rosa',rarity:'Épico',shop:true,source:'store',collection:'bonus_loja'},
    {id:'frame_bonus_08',cat:'frame',asset:'bonus-frame-08.png',name:'Moldura Paraíso Tropical',rarity:'Épico',shop:true,source:'store',collection:'bonus_loja'},
    {id:'frame_bonus_09',cat:'frame',asset:'bonus-frame-09.png',name:'Moldura Boutique Matemática',rarity:'Lendário',shop:true,source:'store',collection:'bonus_loja'},
    {id:'frame_bonus_10',cat:'frame',asset:'bonus-frame-10.png',name:'Moldura Penelope Glam',rarity:'Lendário',shop:true,source:'store',collection:'bonus_loja'},
    {id:'bg_bonus_01',cat:'background',asset:'bonus-bg-01.png',name:'Fundo Jardim Rosa',rarity:'Raro',shop:true,source:'store',collection:'bonus_loja'},
    {id:'bg_bonus_02',cat:'background',asset:'bonus-bg-02.png',name:'Fundo Ponte dos Sonhos',rarity:'Épico',shop:true,source:'store',collection:'bonus_loja'},
    {id:'bg_bonus_03',cat:'background',asset:'bonus-bg-03.png',name:'Fundo Praça Encantada',rarity:'Épico',shop:true,source:'store',collection:'bonus_loja'},
    {id:'bg_bonus_04',cat:'background',asset:'bonus-bg-04.png',name:'Fundo Cidade Joaninha',rarity:'Raro',shop:true,source:'store',collection:'bonus_loja'},
    {id:'bg_bonus_05',cat:'background',asset:'bonus-bg-05.png',name:'Fundo Parque Joaninha',rarity:'Épico',shop:true,source:'store',collection:'bonus_loja'},
    {id:'bg_bonus_06',cat:'background',asset:'bonus-bg-06.png',name:'Fundo Praia Matemática',rarity:'Raro',shop:true,source:'store',collection:'bonus_loja'},
    {id:'bg_bonus_07',cat:'background',asset:'bonus-bg-07.png',name:'Fundo Cachoeira Tropical',rarity:'Épico',shop:true,source:'store',collection:'bonus_loja'},
    {id:'bg_bonus_08',cat:'background',asset:'bonus-bg-08.png',name:'Fundo Boutique Glam',rarity:'Épico',shop:true,source:'store',collection:'bonus_loja'},
    {id:'bg_bonus_09',cat:'background',asset:'bonus-bg-09.png',name:'Fundo Loja dos Corações',rarity:'Lendário',shop:true,source:'store',collection:'bonus_loja'},
    {id:'bg_bonus_10',cat:'background',asset:'bonus-bg-10.png',name:'Fundo Cidade Glam',rarity:'Lendário',shop:true,source:'store',collection:'bonus_loja'},
    {id:'bg_bonus_11',cat:'background',asset:'bonus-bg-11.png',name:'Reino da Coelhinha',rarity:'Oculto',shop:false,source:'daily',collection:'bonus_oculto'},
    {id:'bg_bonus_12',cat:'background',asset:'bonus-bg-12.png',name:'Cidade da Joaninha',rarity:'Oculto',shop:false,source:'daily',collection:'bonus_oculto'},
    {id:'bg_bonus_13',cat:'background',asset:'bonus-bg-13.png',name:'Paraíso Tropical Diário',rarity:'Oculto',shop:false,source:'daily',collection:'bonus_oculto'},
    {id:'bg_bonus_14',cat:'background',asset:'bonus-bg-14.png',name:'Boutique Matemática Diária',rarity:'Oculto',shop:false,source:'daily',collection:'bonus_oculto'},
    {id:'collect_bonus_01',cat:'collectible',asset:'bonus-collect-01.png',name:'Coração Coroado',rarity:'Raro',shop:true,source:'store',collection:'bonus_loja'},
    {id:'collect_bonus_02',cat:'collectible',asset:'bonus-collect-02.png',name:'Dragão Estrela',rarity:'Épico',shop:true,source:'store',collection:'bonus_loja'},
    {id:'collect_bonus_03',cat:'collectible',asset:'bonus-collect-03.png',name:'Baú de Gemas',rarity:'Raro',shop:true,source:'store',collection:'bonus_loja'},
    {id:'collect_bonus_04',cat:'collectible',asset:'bonus-collect-04.png',name:'Borboleta Cósmica',rarity:'Épico',shop:true,source:'store',collection:'bonus_loja'},
    {id:'collect_bonus_05',cat:'collectible',asset:'bonus-collect-05.png',name:'Gatinho Astronauta',rarity:'Lendário',shop:true,source:'store',collection:'bonus_loja'},
    {id:'collect_bonus_06',cat:'collectible',asset:'bonus-collect-06.png',name:'Poção Arco-Íris',rarity:'Raro',shop:true,source:'store',collection:'bonus_loja'},
    {id:'collect_bonus_07',cat:'collectible',asset:'bonus-collect-07.png',name:'Estrela Cometa',rarity:'Épico',shop:true,source:'store',collection:'bonus_loja'},
    {id:'collect_bonus_08',cat:'collectible',asset:'bonus-collect-08.png',name:'Unicórnio nas Nuvens',rarity:'Oculto',shop:false,source:'chest',collection:'bonus_oculto'},
    {id:'collect_bonus_09',cat:'collectible',asset:'bonus-collect-09.png',name:'Livro Mágico',rarity:'Oculto',shop:false,source:'chest',collection:'bonus_oculto'},
    {id:'collect_bonus_10',cat:'collectible',asset:'bonus-collect-10.png',name:'Castelo no Globo',rarity:'Oculto',shop:false,source:'chest',collection:'bonus_oculto'},
    {id:'pack_bonus_artes',cat:'package',asset:'pack-starlight.png',name:'Pacote Artes Mágicas',rarity:'Épico',shop:true,source:'store',bundle:['frame_bonus_01','frame_bonus_04','bg_bonus_03','collect_bonus_02','collect_bonus_06']},
    {id:'pack_bonus_fadas',cat:'package',asset:'pack-royal.png',name:'Pacote Reino Fantástico',rarity:'Lendário',shop:true,source:'store',bundle:['frame_bonus_07','frame_bonus_10','bg_bonus_09','collect_bonus_05','collect_bonus_07']}
  ]);

  // A coleção de efeitos foi refeita em Lottie. Papai e os novos efeitos são os únicos positivos válidos.
  const CURRENT_EFFECT_IDS=new Set(['fx_papai','fx_papai_jjk','fx_lottie_purple_domain','fx_lottie_cursed_orb','fx_lottie_black_flash','fx_lottie_blue_slash','fx_lottie_green_vortex','fx_lottie_rift_portal','fx_lottie_golden_seal','fx_lottie_red_energy_beam','fx_lottie_celestial_pulse','fx_lottie_talisman_eruption']);
  const LEGACY_EFFECT_IDS=new Set(CATALOG.filter(x=>x.cat==='effect'&&!CURRENT_EFFECT_IDS.has(x.id)).map(x=>x.id));
  for(let i=CATALOG.length-1;i>=0;i--)if(CATALOG[i].cat==='effect'&&!CURRENT_EFFECT_IDS.has(CATALOG[i].id))CATALOG.splice(i,1);
  for(const x of CATALOG)if(Array.isArray(x.bundle))x.bundle=x.bundle.filter(id=>!LEGACY_EFFECT_IDS.has(id));
  const packageEffectMap={pack_magic:'fx_lottie_green_vortex',pack_explorer:'fx_lottie_blue_slash',pack_starlight:'fx_lottie_purple_domain',pack_royal:'fx_lottie_black_flash'};
  for(const [packId,effectId] of Object.entries(packageEffectMap)){const pack=CATALOG.find(x=>x.id===packId);if(pack&&!pack.bundle.includes(effectId))pack.bundle.push(effectId)}

  // Normalize pricing + rarity economy
  for(const x of CATALOG){
    if(x.shop===false){x.price=0;x.rarity='Oculto'}
    else if(Number.isFinite(Number(x.fixedPrice)))x.price=Number(x.fixedPrice);
    else if(x.cat==='package')x.price=PACKAGE_PRICE_BY_RARITY[x.rarity]||420;
    else x.price=PRICE_BY_RARITY[x.rarity]??120;
  }
  for(const group of Object.values(AVATAR_SKINS)){
    for(const skin of group){
      if(skin.id==='original'){skin.sources=['starter'];skin.price=0;continue}
      if(['pirate','pirata1'].includes(skin.id)){skin.sources=['coins'];skin.price=180}
      if(skin.id==='navigator2'){skin.sources=['table2_chest'];skin.price=0}
      if(skin.id==='inventor3'){skin.sources=['table3_chest'];skin.price=0}
    }
  }

  function resetArray(target,values){target.splice(0,target.length,...values)}
  resetArray(CHEST_FRAME_IDS,CATALOG.filter(x=>x.source==='chest'&&x.cat==='frame').map(x=>x.id));
  resetArray(CHEST_COLLECTIBLE_IDS,CATALOG.filter(x=>x.source==='chest'&&x.cat==='collectible').map(x=>x.id));
  resetArray(CHEST_BACKGROUND_IDS,CATALOG.filter(x=>x.source==='chest'&&x.cat==='background').map(x=>x.id));
  resetArray(CHEST_EFFECT_IDS,CATALOG.filter(x=>x.source==='chest'&&x.cat==='effect').map(x=>x.id));
  resetArray(CHEST_EXCLUSIVE_IDS,[...CHEST_FRAME_IDS,...CHEST_COLLECTIBLE_IDS,...CHEST_BACKGROUND_IDS,...CHEST_EFFECT_IDS]);
  resetArray(COLLECTION_TABS,[['all','Todos'],['Comum','Comuns'],['Raro','Raros'],['Épico','Épicos'],['Lendário','Lendários'],['Oculto','Ocultos']]);
  resetArray(STORE_TABS,[['all','Destaques'],['frame','Molduras'],['background','Fundos'],['collectible','Colecionáveis'],['effect','Efeitos'],['package','Pacotes']]);
  resetArray(SPECIAL_CHEST_GALLERY,[
    {id:'mastery_12',kind:'mastery',table:2,rangeLabel:'1-2',name:'Baú dos Navegadores',rarity:'Épico',theme:'Tabuadas 1 e 2',sprite:'table2',pendingFlag:'mastery12Pending',claimedFlag:'mastery12Claimed',rewardKind:'pair12'},
    {id:'mastery_34',kind:'mastery',table:4,rangeLabel:'3-4',name:'Baú dos Inventores',rarity:'Épico',theme:'Tabuadas 3 e 4',sprite:'inventor',pendingFlag:'mastery34Pending',claimedFlag:'mastery34Claimed',rewardKind:'pair34'},
    {id:'mastery_56',kind:'mastery',table:6,rangeLabel:'5-6',name:'Baú Estelar',rarity:'Lendário',theme:'Tabuadas 5 e 6',sprite:'starlight',pendingFlag:'mastery56Pending',claimedFlag:'mastery56Claimed',rewardKind:'pair56'},
    {id:'mastery_78',kind:'mastery',table:8,rangeLabel:'7-8',name:'Baú das Maravilhas',rarity:'Lendário',theme:'Tabuadas 7 e 8',sprite:'magic',pendingFlag:'mastery78Pending',claimedFlag:'mastery78Claimed',rewardKind:'pair78'},
    {id:'mastery_910',kind:'mastery',table:10,rangeLabel:'9-10',name:'Baú da Realeza',rarity:'Lendário',theme:'Tabuadas 9 e 10',sprite:'royal',pendingFlag:'mastery910Pending',claimedFlag:'mastery910Claimed',rewardKind:'pair910'}
  ]);
  resetArray(DAILY_REWARDS,[
    {kind:'coins',amount:30},{kind:'coins',amount:30},{kind:'coins',amount:40},{kind:'coins',amount:40},{kind:'daily_chest'},
    {kind:'coins',amount:35},{kind:'coins',amount:35},{kind:'coins',amount:45},{kind:'coins',amount:45},{kind:'daily_chest'},
    {kind:'coins',amount:40},{kind:'coins',amount:40},{kind:'coins',amount:50},{kind:'coins',amount:50},{kind:'daily_chest'},
    {kind:'coins',amount:45},{kind:'coins',amount:45},{kind:'coins',amount:55},{kind:'coins',amount:55},{kind:'daily_chest'},
    {kind:'coins',amount:50},{kind:'coins',amount:50},{kind:'coins',amount:60},{kind:'coins',amount:60},{kind:'daily_chest'},
    {kind:'background',id:'bg_bonus_11'},{kind:'background',id:'bg_bonus_12'},{kind:'background',id:'bg_bonus_13'},{kind:'background',id:'bg_bonus_14'},{kind:'daily_chest'}
  ]);
  WORLD_META[1]={name:'Jardim do Primeiro Passo',card:'world_map_01.webp',practice:'world-practice-01.png'};

  function dailyChestTypeByIndex(index){const id=DAILY_CHEST_ROTATION[index%DAILY_CHEST_ROTATION.length];return CHEST_TYPES.find(x=>x.id===id)||CHEST_TYPES[0]}
  function dailyChestDefinition(index){const type=dailyChestTypeByIndex(index);return {id:`daily_${index}`,kind:'daily',dailyIndex:index,name:`${type.name} Diário ${index+1}`,rarity:type.rarity,theme:type.theme,sprite:type.sprite||type.id,rewardKind:'daily',day:DAILY_CHEST_DAY_MARKS[index]||((index+1)*5)}}
  function countMasteredTables(p){let c=0;for(let n=1;n<=10;n++)if(tableMasteredRaw(p,n)||tableMastered(p,n))c++;return c}
  function nextPendingMasteryDef(p){return SPECIAL_CHEST_GALLERY.find(def=>!p?.flags?.[def.claimedFlag])||null}
  function profileBase(name){return {id:uid(),name,coins:100,xp:0,owned:[...STARTER_OWNED_IDS],fashionOwned:['original'],quantities:{},equipped:{frame:'frame_star',background:'bg_forest',effect:'fx_papai'},avatar:{id:fixedAvatarForName(name),skinId:'original'},flags:{v0930FinalEconomy:true,v0924PapaiEffect:true},stats:{correct:0,wrong:0,sessions:0,masteredDecks:{},dailyChestTokens:0,dailyChestsClaimed:0},learning:{tables:{}},daily:{progress:0,lastClaimDate:null,cycle:1,completed:false},history:[]}}

  profileDefaults=function(name){return profileBase(name)};
  migrateProfile=function(p){
    if(!p||typeof p!=='object')return;
    p.id=p.id||uid();
    p.name=p.name||'Jogadora';
    p.coins=Number.isFinite(Number(p.coins))?Number(p.coins):100;
    if(!p.flags?.v0930FinalEconomy){
      p.coins=100;
      p.owned=[...STARTER_OWNED_IDS];
      p.fashionOwned=['original'];
      p.equipped={frame:'frame_star',background:'bg_forest',effect:'fx_papai'};
      p.avatar={id:fixedAvatarForName(p.name),skinId:'original'};
      p.daily={progress:0,lastClaimDate:null,cycle:1,completed:false};
      p.history=[];
      p.stats={correct:0,wrong:0,sessions:0,masteredDecks:{},dailyChestTokens:0,dailyChestsClaimed:0};
      p.learning={tables:{}};
      p.flags={...(p.flags||{}),v0930FinalEconomy:true,v0924PapaiEffect:true};
    }
    p.xp=Number(p.xp||0);p.owned=Array.isArray(p.owned)?p.owned:[];p.fashionOwned=Array.isArray(p.fashionOwned)?p.fashionOwned:['original'];
    p.owned=p.owned.filter(id=>!LEGACY_EFFECT_IDS.has(id));
    p.quantities=p.quantities||{};p.flags=p.flags||{};p.flags.v0930FinalEconomy=true;
    p.stats=p.stats||{};p.stats.correct=Number(p.stats.correct||0);p.stats.wrong=Number(p.stats.wrong||0);p.stats.sessions=Number(p.stats.sessions||0);p.stats.masteredDecks=p.stats.masteredDecks||{};p.stats.dailyChestTokens=Number(p.stats.dailyChestTokens||0);p.stats.dailyChestsClaimed=Number(p.stats.dailyChestsClaimed||0);
    p.learning=p.learning||{tables:{}};p.learning.tables=p.learning.tables||{};
    p.daily=p.daily&&typeof p.daily==='object'?p.daily:{progress:0,lastClaimDate:null,cycle:1,completed:false};p.daily.progress=clamp(Number(p.daily.progress||0),0,DAILY_REWARDS.length);p.daily.cycle=Math.max(1,Number(p.daily.cycle||1));p.daily.completed=!!p.daily.completed||p.daily.progress>=DAILY_REWARDS.length;
    for(const id of STARTER_OWNED_IDS)if(!p.owned.includes(id))p.owned.push(id);
    if(!p.fashionOwned.includes('original'))p.fashionOwned.unshift('original');
    p.avatar=p.avatar||{id:fixedAvatarForName(p.name),skinId:'original'};p.avatar.id=fixedAvatarForName(p.name);if(!fashionOwned(p,p.avatar.skinId))p.avatar.skinId='original';
    p.equipped=p.equipped||{};if(!p.equipped.frame||!owns(p,p.equipped.frame))p.equipped.frame='frame_star';if(!p.equipped.background||!owns(p,p.equipped.background))p.equipped.background='bg_forest';if(!p.equipped.effect||!owns(p,p.equipped.effect))p.equipped.effect='fx_papai';
    for(let n=1;n<=10;n++){const k=String(n),legacy=p.stats.masteredDecks[k]||p.stats.masteredDecks[n],cur=p.learning.tables[k]||{};if(legacy&&!cur.masteredAt){cur.masteredAt=Number(legacy.at||Date.now());cur.reviewStage=0;cur.nextReviewAt=Date.now();cur.lastReviewAt=null;cur.reviewCount=0;cur.lapses=0}p.learning.tables[k]=cur}
    if(!p.flags.v096Review2Hours){for(const cur of Object.values(p.learning.tables)){if(cur?.masteredAt&&Number(cur.reviewStage||0)===0){const base=Number(cur.lastReviewAt||cur.masteredAt||Date.now());cur.nextReviewAt=Math.min(Number(cur.nextReviewAt||Infinity),base+2*3600000)}}p.flags.v096Review2Hours=true}
    delete p.gems;delete p.flags.dailyClaimedToday;
    for(const def of SPECIAL_CHEST_GALLERY){if(tableMasteredRaw(p,def.table)&&!p.flags[def.claimedFlag]&&!p.flags[def.pendingFlag])p.flags[def.pendingFlag]=true}
    // v0.9.4.5 — sincroniza as novas molduras com baús já abertos em perfis existentes.
    if(p.flags.mastery12Claimed){for(const id of ['frame_adventure_07','frame_panda_cosmic','frame_infinity_sensei','frame_infinity_crystal'])if(!p.owned.includes(id))p.owned.push(id)}
    for(let i=0;i<Math.min(Number(p.stats.dailyChestsClaimed||0),DAILY_FRAME_REWARD_IDS.length);i++){const id=DAILY_FRAME_REWARD_IDS[i];if(id&&!p.owned.includes(id))p.owned.push(id)}
  };

  canClaimDaily=function(p){return !!p&&!p.daily?.completed&&p.daily?.lastClaimDate!==localDayKey()};
  dailyRewardLabel=function(r){if(r.kind==='coins')return `${r.amount} moedas`;if(r.kind==='background')return item(r.id)?.name||'Fundo especial';return 'Baú diário'};
  dailyRewardIcon=function(r){if(r.kind==='coins')return coinHTML();if(r.kind==='background'){const x=item(r.id);return x?.asset?`<img class="coin-inline" src="${x.asset}" alt="Fundo">`:'🖼️'}return '<span class="daily-chest-icon">🎁</span>'};
  applyDailyReward=function(p,r){if(r.kind==='coins'){p.coins+=r.amount;return `${r.amount} moedas`}if(r.kind==='background'){const x=item(r.id);if(x&&!p.owned.includes(x.id))p.owned.push(x.id);return x?.name||'Fundo especial'}p.stats.dailyChestTokens=Number(p.stats.dailyChestTokens||0)+1;const nextIndex=Math.max(0,Number(p.stats.dailyChestsClaimed||0));const nextType=dailyChestTypeByIndex(nextIndex);return `${nextType.name} liberado`};
  renderDailyOverlay=function(){const p=active();if(!p)return;const next=Number(p.daily?.progress||0),can=canClaimDaily(p),done=!!p.daily?.completed,grid=document.getElementById('dailyGrid'),status=document.getElementById('dailyStatus'),btn=document.getElementById('dailyClaimBtn');grid.innerHTML=DAILY_REWARDS.map((r,i)=>`<div class="daily-day ${i<next?'claimed':''} ${i===next&&!done?'today':''}"><span>Dia ${i+1}</span><b>${dailyRewardIcon(r)}</b><small>${dailyRewardLabel(r)}</small>${i<next?'<em>✓</em>':''}</div>`).join('');status.innerHTML=done?`<b>Calendário concluído!</b><span>As 30 recompensas diárias já foram coletadas para este perfil.</span>`:can?`<b>Dia ${next+1} disponível!</b><span>Volte a cada dia para avançar no calendário.</span>`:`<b>Recompensa de hoje coletada</b><span>A próxima ficará disponível amanhã.</span>`;btn.disabled=done||!can;btn.textContent=done?'Calendário finalizado':can?`Coletar Dia ${next+1}`:'Volte amanhã'};
  claimDailyReward=function(){const p=active();if(!p||!canClaimDaily(p))return;const idx=Number(p.daily.progress||0),r=DAILY_REWARDS[idx];if(!r)return toast('Calendário já concluído.');const label=applyDailyReward(p,r);p.daily.lastClaimDate=localDayKey();p.daily.progress=idx+1;if(p.daily.progress>=DAILY_REWARDS.length){p.daily.completed=true;p.daily.progress=DAILY_REWARDS.length}save();showAssetBurst();renderAll();renderDailyOverlay();toast(`✨ Recompensa: ${label}`)};

  chestGalleryDefinitions=function(p){return [...SPECIAL_CHEST_GALLERY,...DAILY_CHEST_DAY_MARKS.map((_,i)=>dailyChestDefinition(i))]};
  chestGalleryState=function(p,def){if(def.kind==='mastery'){if(p?.flags?.[def.claimedFlag])return 'opened';if(p?.flags?.[def.pendingFlag]||tableMastered(p,def.table))return 'ready';return 'locked'}const claimed=Number(p?.stats?.dailyChestsClaimed||0),tokens=Number(p?.stats?.dailyChestTokens||0);if(def.dailyIndex<claimed)return 'opened';if(def.dailyIndex===claimed&&tokens>0)return 'ready';return 'locked'};
  chestGalleryUnlockText=function(p,def,state){if(state==='opened')return 'Tesouro já conquistado';if(state==='ready')return 'Disponível para abrir agora';if(def.kind==='mastery')return `Domine as tabuadas ${def.rangeLabel}`;const need=def.day||((def.dailyIndex+1)*5),have=Number(p?.daily?.progress||0);return `Chegue ao Dia ${need} da recompensa diária (${have}/${need})`};
  chestGalleryReadyCount=function(p){return chestGalleryDefinitions(p).filter(def=>chestGalleryState(p,def)==='ready').length};
  grantMasteryReward=function(p,key){const list=MASTERY_REWARD_MAP[key]||[];const items=[];p.fashionOwned=p.fashionOwned||['original'];p.owned=p.owned||[];for(const entry of list){if(entry.startsWith('fashion:')){const id=entry.split(':')[1],skin=avatarSkins(p).find(x=>x.id===id);if(skin&&!p.fashionOwned.includes(id)){p.fashionOwned.push(id);items.push({id:`fashion_${skin.id}`,name:`Moda ${skin.name}`,cat:'fashion',asset:skin.asset,rarity:'Oculto',source:key})}continue}const x=item(entry);if(!x)continue;if(!p.owned.includes(x.id))p.owned.push(x.id);items.push(x)}return {kind:'items',items}};
  grantChestGalleryDefinition=function(p,def){if(def.kind==='daily'){const claimed=Number(p.stats?.dailyChestsClaimed||0),tokens=Number(p.stats?.dailyChestTokens||0);if(def.dailyIndex!==claimed||tokens<=0)return null;const type=dailyChestTypeByIndex(def.dailyIndex),result=grantExclusiveChestReward(p,type,DAILY_FRAME_REWARD_IDS[def.dailyIndex]);p.stats.dailyChestsClaimed=claimed+1;p.stats.dailyChestTokens=Math.max(0,tokens-1);return result}if(def.rewardKind==='pair12'){p.flags[def.claimedFlag]=true;p.flags[def.pendingFlag]=false;return grantMasteryReward(p,'pair12')}if(def.rewardKind==='pair34'){p.flags[def.claimedFlag]=true;p.flags[def.pendingFlag]=false;return grantMasteryReward(p,'pair34')}if(def.rewardKind==='pair56'){p.flags[def.claimedFlag]=true;p.flags[def.pendingFlag]=false;return grantMasteryReward(p,'pair56')}if(def.rewardKind==='pair78'){p.flags[def.claimedFlag]=true;p.flags[def.pendingFlag]=false;return grantMasteryReward(p,'pair78')}if(def.rewardKind==='pair910'){p.flags[def.claimedFlag]=true;p.flags[def.pendingFlag]=false;return grantMasteryReward(p,'pair910')}return null};
  renderChestGalleryReward=function(result,def){const box=document.getElementById('chestGalleryReward'),grid=document.getElementById('chestGalleryRewardGrid'),title=document.getElementById('chestGalleryRewardTitle'),done=document.getElementById('chestGalleryDone');const items=result?.items||[];title.textContent=def.kind==='mastery'?`${def.name} conquistado!`:'Baú diário aberto!';if(result?.kind==='coins')grid.innerHTML=`<div class="chest-gallery-reward-card"><img src="coin.webp" alt="Moedas"><b>${result.coins} moedas</b><span>Recompensa</span></div>`;else grid.innerHTML=items.map(x=>`<div class="chest-gallery-reward-card"><img src="${x.asset||'coin.webp'}" alt="${esc(x.name)}"><b>${esc(x.name)}</b><span>${chestRewardTypeLabel(x)}</span></div>`).join('');box.classList.add('show');done.classList.add('show')};
  playChestGalleryAnimation=function(def){if(chestGalleryBusy)return;const p=active();if(!p||chestGalleryState(p,def)!=='ready')return;chestGalleryBusy=true;chestGalleryCurrent=def;const overlay=document.getElementById('chestGalleryOpenOverlay'),stage=document.getElementById('chestGalleryAnimation'),img=document.getElementById('chestGalleryFrame'),title=document.getElementById('chestGalleryOpenTitle'),kicker=document.getElementById('chestGalleryOpenKicker'),reward=document.getElementById('chestGalleryReward'),done=document.getElementById('chestGalleryDone');reward.classList.remove('show');done.classList.remove('show');title.textContent=def.name;kicker.textContent=def.kind==='mastery'?`RECOMPENSA DAS TABUADAS ${def.rangeLabel}`:`TESOURO DIÁRIO · DIA ${def.day}`;overlay.classList.add('open');stage.classList.add('running');const frames=chestSpriteFrames(def.sprite);let i=0;img.src=frames[0];img.alt=def.name;clearInterval(chestGalleryTimer);chestGalleryTimer=setInterval(()=>{i++;if(i<frames.length){img.src=frames[i];return}clearInterval(chestGalleryTimer);chestGalleryTimer=null;setTimeout(()=>{const result=grantChestGalleryDefinition(p,def);if(!result){chestGalleryBusy=false;stage.classList.remove('running');overlay.classList.remove('open');renderAll();return toast('Este baú ainda não pode ser aberto.')}save();showAssetBurst();chestGalleryBusy=false;stage.classList.remove('running');img.src=frames[frames.length-1];renderAll();renderChestGalleryReward(result,def);renderChests()},330)},175)};
  renderChests=function(){const p=active(),grid=document.getElementById('chestsGrid'),summary=document.getElementById('chestsSummary');if(!grid||!summary)return;if(!p){summary.innerHTML='';grid.innerHTML='<div class="empty">Escolha um perfil para ver os baús.</div>';return}const defs=chestGalleryDefinitions(p),states=defs.map(d=>chestGalleryState(p,d)),ready=states.filter(s=>s==='ready').length,opened=states.filter(s=>s==='opened').length,locked=states.filter(s=>s==='locked').length;summary.innerHTML=`<div><b>${ready}</b><span>PRONTOS</span></div><div><b>${opened}</b><span>ABERTOS</span></div><div><b>${locked}</b><span>FECHADOS</span></div>`;grid.innerHTML=defs.map((def,i)=>{const state=states[i],status=state==='ready'?'PRONTO':state==='opened'?'ABERTO':'FECHADO',art=state==='opened'?chestOpenAsset(def):chestClosedAsset(def),action=state==='ready'?'TOQUE PARA ABRIR':state==='opened'?'✓ JÁ ABERTO':'AINDA FECHADO',note=chestGalleryUnlockText(p,def,state),chip=def.kind==='mastery'?`TABUADAS ${def.rangeLabel}`:`DIA ${def.day}`;return `<button type="button" class="chest-gallery-card ${state}" onclick="chestGalleryCardClick('${def.id}')"><span class="chest-gallery-status">${status}</span><div class="chest-gallery-art"><img src="${art}" alt="${esc(def.name)}"><span class="chest-gallery-lock">🔒</span></div><h3>${esc(def.name)}</h3><p>${esc(note)}</p><div class="chest-gallery-meta"><span class="chest-gallery-chip">${esc(def.rarity)}</span><span class="chest-gallery-chip">${chip}</span></div><div class="chest-gallery-action">${action}</div></button>`}).join('')};

  tableUnlocked=function(p,n){if(n===1)return true;if(tableMastered(p,n))return true;return tableMastered(p,n-1)};
  tableStatus=function(p,n){const t=tableLearning(p,n);if(!tableUnlocked(p,n))return {id:'locked',label:'BLOQUEADA',note:`Complete a tabuada do ${n-1}`};if(!t.masteredAt)return {id:'new',label:n===1&&!Object.values(p.learning.tables).some(v=>v.masteredAt)?'COMECE AQUI':'NOVO MUNDO',note:'Aprenda e domine as 10 cartas'};if(tableDue(p,n))return {id:'due',label:'REVISAR HOJE',note:`Revisão ${Number(t.reviewCount||0)+1} · pronta agora`};return {id:'scheduled',label:'ENERGIA BAIXA',note:'A sua energia está baixa e você não consegue se teleportar agora. Descanse um pouco'}};
  renderWorldsLegacy=function(){const p=active(),g=document.getElementById('worldGrid'),today=document.getElementById('worldToday');if(!p||!g||!today)return;const due=[];let nextNew=null;for(let n=1;n<=10;n++){if(tableDue(p,n))due.push(n);if(nextNew===null&&tableUnlocked(p,n)&&!tableMastered(p,n))nextNew=n}const readyDef=chestGalleryDefinitions(p).find(def=>chestGalleryState(p,def)==='ready');if(readyDef)today.innerHTML=`<div><b>🎁 ${esc(readyDef.name)} pronto!</b><span>${esc(chestGalleryUnlockText(p,readyDef,'ready'))}</span></div><button type="button" class="today-badge" onclick="showTab('chests')">VER BAÚS</button>`;else today.innerHTML=`<div><b>${due.length?`Você tem ${due.length} revisão${due.length===1?'':'ões'} hoje`:'Tudo em dia por aqui!'}</b><span>${due.length?`Priorize ${due.map(n=>'×'+n).join(', ')} antes de avançar.`:nextNew?`Próximo mundo disponível: ${worldMeta(nextNew).name}.`:'Todos os mundos já foram desbloqueados.'}</span></div><div class="today-badge">${due.length?due.length+' HOJE':'✓ OK'}</div>`;g.innerHTML='';for(let n=1;n<=10;n++){const st=tableStatus(p,n),disabled=st.id==='locked'||st.id==='scheduled',wm=worldMeta(n);const b=document.createElement('button');b.type='button';b.className=`world-card ${st.id}`;b.disabled=disabled;b.style.backgroundImage=`url("${wm.card}")`;const wait=st.id==='scheduled'?`<span class="world-wait-label">RECARGA MÁGICA<br>${st.note}</span><span class="world-wait" aria-hidden="true"><i>✦</i></span>`:'';b.innerHTML=`<span class="world-status">${st.id==='due'?'⏰ ':st.id==='locked'?'🔒 ':st.id==='scheduled'?'✨ ':'✨ '}${st.id==='scheduled'?'EM ESPERA':st.label}</span><span class="world-note">${st.id==='scheduled'?'Este mundo volta a abrir na próxima revisão.':st.note}</span>${st.id==='locked'?'<span class="world-lock">🔒</span>':''}${wait}`;b.onclick=()=>startGame(n,st.id==='due'?'review':'learn');g.appendChild(b)}};
  renderDecks=function(){const g=document.getElementById('deckGrid');if(!g)return;g.innerHTML='';for(let n=1;n<=10;n++){const b=document.createElement('button');b.className='deck';b.innerHTML=`<span class="ribbon">TABUADA DO</span><div class="num">${n}</div><div class="small">${n} ×</div>`;b.onclick=()=>startGame(n);g.appendChild(b)}};

  renderHome=function(){const p=active(),screen=document.getElementById('homeScreen');if(!p||!screen)return;screen.style.setProperty('--home-bg',`url("${homeBackgroundAsset(p)}")`);const xpNow=xpInto(p.xp),xpNeed=100,lvl=levelFor(p.xp),defs=chestGalleryDefinitions(p),readyChests=chestGalleryReadyCount(p),nextReady=defs.find(d=>chestGalleryState(p,d)==='ready'),nextMastery=nextPendingMasteryDef(p),homeDailyBtn=document.querySelector('.home-feature.daily');document.getElementById('homeProfileBar').innerHTML=`<button class="home-css-avatar" type="button" onclick="showTab('profile')" aria-label="Abrir perfil de ${esc(p.name)}">${avatarHTML(p,'home',false)}</button><div class="home-css-profile-info"><div class="home-css-name-row"><strong>${esc(p.name)}</strong><span class="home-css-level">NÍVEL ${lvl}</span></div><div class="home-css-xp-head"><span>XP</span><b>${p.xp||0}</b></div><div class="home-css-xpbar" role="progressbar" aria-label="Progresso de experiência" aria-valuemin="0" aria-valuemax="${xpNeed}" aria-valuenow="${xpNow}"><i style="width:${Math.max(0,Math.min(100,(xpNow/xpNeed)*100))}%"></i><span>${xpNow} / ${xpNeed}</span></div><div class="home-css-wallet"><span class="home-css-coin-icon">★</span><span class="home-css-coins">${p.coins}</span><small>OURO</small></div></div>`;const hero=document.getElementById('homeHeroAvatar');hero.src=avatarAsset(p);hero.alt=`Avatar de ${esc(p.name)}`;const fill=document.getElementById('homeChestFill'),txt=document.getElementById('homeChestText'),title=document.getElementById('homeChestTitle'),desc=document.getElementById('homeChestDesc'),art=document.getElementById('homeChestArt');const displayDef=nextReady||nextMastery||dailyChestDefinition(Math.min(Number(p.stats?.dailyChestsClaimed||0),DAILY_CHEST_DAY_MARKS.length-1));if(art){art.src=chestClosedAsset(displayDef);art.alt=displayDef.name}const chestCard=document.querySelector('.home-new-chest-card');if(chestCard)chestCard.classList.toggle('is-ready',readyChests>0);title.textContent='Baús';if(readyChests>0){fill.style.width='100%';txt.textContent=`${readyChests} PRONTO${readyChests>1?'S':''}`;desc.textContent=`${readyChests} tesouro${readyChests>1?'s':''} esperando para abrir.`}else if(nextMastery){const mastered=countMasteredTables(p),pairGoal=nextMastery.table,done=Math.min(mastered,pairGoal),pct=Math.max(8,Math.round(done/pairGoal*100));fill.style.width=`${pct}%`;txt.textContent=`${done}/${pairGoal}`;desc.textContent=`Próximo baú especial: domine as tabuadas ${nextMastery.rangeLabel}.`}else{const total=DAILY_REWARDS.length,done=Number(p.daily?.progress||0),pct=Math.round((done/total)*100);fill.style.width=`${pct}%`;txt.textContent=`${done}/${total}`;desc.textContent=p.daily?.completed?'Calendário diário concluído.':`Próximo baú diário no Dia ${DAILY_CHEST_DAY_MARKS[Math.min(Number(p.stats?.dailyChestsClaimed||0),DAILY_CHEST_DAY_MARKS.length-1)]}.`}const menuArt=document.getElementById('homeChestsMenuArt'),menuBadge=document.getElementById('homeChestsBadge');if(menuArt)menuArt.src=chestClosedAsset(displayDef);if(menuBadge){menuBadge.style.display=readyChests?'grid':'none';menuBadge.textContent=readyChests}const dailyBadge=document.getElementById('homeDailyBadge');if(dailyBadge)dailyBadge.style.display=canClaimDaily(p)?'grid':'none';if(homeDailyBtn)homeDailyBtn.style.display='block'};

  finishGame=function(){const p=active(),seconds=Math.max(1,Math.round((Date.now()-session.started)/1000)),now=Date.now(),t=tableLearning(p,session.n),firstMastery=session.mode!=='review'&&!t.masteredAt;p.stats.sessions=(p.stats.sessions||0)+1;p.stats.masteredDecks[session.n]={at:now,correct:session.correct,wrong:session.wrong};p.xp+=50;let scheduleText='';if(session.mode==='review'&&t.masteredAt){const oldStage=Number(t.reviewStage||0);let stage=oldStage;if(session.wrong===0)stage=Math.min(REVIEW_INTERVAL_DAYS.length-1,oldStage+1);else if(session.wrong>=3)stage=Math.max(0,oldStage-1);t.reviewStage=stage;t.reviewCount=Number(t.reviewCount||0)+1;t.lastReviewAt=now;if(session.wrong>=3)t.lapses=Number(t.lapses||0)+1;const days=REVIEW_INTERVAL_DAYS[stage];t.nextReviewAt=now+days*86400000;scheduleText=`Revisão concluída. Próxima em ${days} dia${days===1?'':'s'}.`}else{t.masteredAt=t.masteredAt||now;t.reviewStage=0;t.reviewCount=Number(t.reviewCount||0);t.nextReviewAt=now+REVIEW_INTERVAL_DAYS[0]*86400000;t.lastReviewAt=now;const next=session.n<10?` A tabuada do ${session.n+1} foi desbloqueada!`:'';scheduleText=`Tabuada do ${session.n} dominada!${next} Revisão em 1 dia.`}if(firstMastery){p.coins+=100;session.coins+=100;scheduleText+=' 🎉 +100 moedas pelo domínio!'}for(const def of SPECIAL_CHEST_GALLERY){if(firstMastery&&session.n===def.table&&!p.flags?.[def.claimedFlag]){p.flags=p.flags||{};p.flags[def.pendingFlag]=true;scheduleText+=` 🎁 ${def.name} desbloqueado!`}}p.history.unshift({deck:session.n,mode:session.mode,correct:session.correct,wrong:session.wrong,coins:session.coins,seconds,at:now});p.history=p.history.slice(0,40);save();document.getElementById('finishText').textContent=scheduleText;document.getElementById('results').innerHTML=`<div class="res"><b>${session.correct}</b><span>ACERTOS</span></div><div class="res"><b>${session.wrong}</b><span>ERROS</span></div><div class="res"><b>+${session.coins}</b><span>MOEDAS</span></div>`;document.getElementById('finish').classList.add('open');playFX(true);beep(true)};
  finishClose=function(){clearActiveFX();document.getElementById('finish').classList.remove('open');const p=active(),hasChest=!!(p&&chestGalleryDefinitions(p).some(def=>chestGalleryState(p,def)==='ready'));session=null;document.getElementById('game').style.display='none';document.getElementById('app').style.display='block';renderAll();showTab('world');if(hasChest)setTimeout(()=>toast('🎁 Novo baú disponível no menu Baús!'),260)};

  fashionSourceChips=function(skin){const chips=[];if((skin.sources||[]).includes('coins'))chips.push(`<span class="fashion-source-chip"><img src="fashion-icon-coin.png" alt="">Moedas</span>`);if((skin.sources||[]).includes('table2_chest'))chips.push(`<span class="fashion-source-chip"><img src="fashion-icon-chest.png" alt="">Domine 1-2</span>`);if((skin.sources||[]).includes('table3_chest'))chips.push(`<span class="fashion-source-chip"><img src="fashion-icon-chest.png" alt="">Domine 3-4</span>`);if((skin.sources||[]).includes('mastery56_chest'))chips.push(`<span class="fashion-source-chip"><img src="fashion-icon-chest.png" alt="">Domine 5-6</span>`);if((skin.sources||[]).includes('mastery78_chest'))chips.push(`<span class="fashion-source-chip"><img src="fashion-icon-chest.png" alt="">Domine 7-8</span>`);if((skin.sources||[]).includes('mastery910_chest'))chips.push(`<span class="fashion-source-chip"><img src="fashion-icon-chest.png" alt="">Domine 9-10</span>`);return chips.join('')};
  fashionAction=function(skinId){const p=active();if(!p)return;const skin=avatarSkins(p).find(x=>x.id===skinId);if(!skin)return;if(fashionOwned(p,skin.id))return setAvatarSkin(skin.id);if(!(skin.sources||[]).includes('coins'))return toast('Essa Moda é uma recompensa especial.');const price=Number(skin.price||0);if(p.coins<price)return toast(`Faltam ${price-p.coins} moedas para desbloquear ${skin.name}.`);p.coins-=price;p.fashionOwned=p.fashionOwned||['original'];if(!p.fashionOwned.includes(skin.id))p.fashionOwned.push(skin.id);p.avatar.skinId=skin.id;save();showAssetBurst();renderAll();toast(`👗 ${skin.name} desbloqueada e equipada!`)};
  renderFashion=function(){const p=active(),preview=document.getElementById('fashionPreview'),grid=document.getElementById('fashionGrid'),count=document.getElementById('fashionCount'),note=document.getElementById('fashionNote'),wallet=document.getElementById('fashionWallet');if(!preview||!grid)return;if(!p){preview.innerHTML='';grid.innerHTML='<div class="empty">Escolha um perfil para continuar.</div>';if(count)count.textContent='';if(note)note.textContent='';if(wallet)wallet.innerHTML='';return}const skins=avatarSkins(p),current=avatarSkin(p),ownedCount=skins.filter(x=>fashionOwned(p,x.id)).length;if(wallet)wallet.innerHTML=`<img src="fashion-icon-coin.png" alt="Moedas"><div><small>SUAS MOEDAS</small>${p.coins.toLocaleString('pt-BR')}</div>`;preview.innerHTML=`<div class="fashion-preview-copy"><span>${esc(p.name)}</span><b class="fashion-current-badge">✓ ${esc(current.name)}</b></div><img src="${current.asset}" alt="${esc(current.name)} de ${esc(p.name)}">`;grid.innerHTML=skins.map(skin=>{const owned=fashionOwned(p,skin.id),selected=skin.id===current.id,canBuy=(skin.sources||[]).includes('coins'),price=Number(skin.price||0),action=selected?'✓ Em uso':owned?'Selecionar':canBuy?`<img src="fashion-icon-coin.png" alt="">${price.toLocaleString('pt-BR')}`:'Bloqueada';return `<article class="fashion-card ${selected?'selected':''} ${owned?'':'locked'}" aria-label="${esc(skin.name)}${owned?'':' bloqueada'}"><div class="fashion-card-art"><img class="avatar" src="${skin.asset}" alt="${esc(skin.name)} de ${esc(p.name)}"><div class="fashion-lock-layer"><img src="fashion-icon-lock.png" alt="Bloqueada"></div>${selected?'<span class="fashion-status-badge">✓</span>':owned?'<span class="fashion-status-badge">★</span>':'<span class="fashion-status-badge"><img src="fashion-icon-lock.png" alt=""></span>'}</div><b>${esc(skin.name)}</b><small>${esc(skin.theme||'Visual')}</small><div class="fashion-acquire">${owned?'<span class="fashion-source-chip">✓ Desbloqueada</span>':fashionSourceChips(skin)}</div><button type="button" class="fashion-action ${owned?'':'buy'}" ${selected?'disabled':''} onclick="fashionAction('${skin.id}')">${action}</button>${owned&&!selected?'<div class="fashion-owned-note">Pronta para usar</div>':''}</article>`}).join('');if(count)count.textContent=`${ownedCount}/${skins.length} DESBLOQUEADAS`;if(note)note.innerHTML=`<b>${esc(p.name)}</b> mantém o mesmo personagem. Modas bloqueadas podem ser compradas com moedas ou liberadas nos baús especiais de domínio.`};
  collectionSourceLabel=function(x){if(x?.source==='table2_chest')return 'Recompensa das tabuadas 1-2';if(x?.source==='table3_chest')return 'Recompensa das tabuadas 3-4';if(x?.shop===false)return 'Recompensa oculta';return 'Loja Mágica e Pacotes'};

  if(localStorage.getItem('tabuadaquest.storage.rev')!==FINAL_STORAGE_REV){
    state=blank();
    localStorage.removeItem(KEY);
    localStorage.setItem('tabuadaquest.storage.rev',FINAL_STORAGE_REV);
  }
})();


/* COLLECTIBLE BONUS + XP FIX v0.9.3.5 */
(function(){
  const COLLECTIBLE_MAX_BONUS_PCT=8;
  const COLLECTIBLE_RARITY_WEIGHT={Comum:.75,Raro:1,'Épico':1.5,'Lendário':2,'Oculto':2.5,'Baú':2.5,'Relíquia':2.5,Especial:2};
  function collectibleAll(){return CATALOG.filter(x=>x.cat==='collectible')}
  function collectibleWeight(x){return Number(COLLECTIBLE_RARITY_WEIGHT[x?.rarity]||1)}
  function collectibleTotalWeight(){return collectibleAll().reduce((sum,x)=>sum+collectibleWeight(x),0)||1}
  function collectibleItemBonusPct(x){return x?.cat==='collectible'?COLLECTIBLE_MAX_BONUS_PCT*collectibleWeight(x)/collectibleTotalWeight():0}
  function collectibleOwnedItems(p){return collectibleAll().filter(x=>p?.owned?.includes(x.id))}
  function collectibleBonusPct(p){return Math.min(COLLECTIBLE_MAX_BONUS_PCT,collectibleOwnedItems(p).reduce((sum,x)=>sum+collectibleItemBonusPct(x),0))}
  function pctText(v){return Number(v||0).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'%'}
  function ensureBonusCarry(p){p.rewardBonusCarry=p.rewardBonusCarry||{xp:0,coins:0};p.rewardBonusCarry.xp=Number(p.rewardBonusCarry.xp||0);p.rewardBonusCarry.coins=Number(p.rewardBonusCarry.coins||0);return p.rewardBonusCarry}
  function awardWithCollectibleBonus(p,base,kind){
    base=Math.max(0,Number(base||0));if(!p||!base)return {base:0,bonus:0,total:0,pct:collectibleBonusPct(p)};
    const pct=collectibleBonusPct(p),carry=ensureBonusCarry(p),key=kind==='xp'?'xp':'coins';
    const exactBonus=base*(pct/100)+carry[key],bonus=Math.floor(exactBonus+1e-9);carry[key]=exactBonus-bonus;
    if(key==='xp')p.xp=Number(p.xp||0)+base+bonus;else p.coins=Number(p.coins||0)+base+bonus;
    return {base,bonus,total:base+bonus,pct};
  }
  window.collectibleBonusPct=collectibleBonusPct;
  window.collectibleItemBonusPct=collectibleItemBonusPct;
  window.awardXP=function(p,base){return awardWithCollectibleBonus(p,base,'xp')};
  window.awardCoins=function(p,base){return awardWithCollectibleBonus(p,base,'coins')};

  const previousMigrate=migrateProfile;
  migrateProfile=function(p){previousMigrate(p);if(!p)return;p.xp=Math.max(0,Number(p.xp||0));ensureBonusCarry(p)};

  const previousStartGame=startGame;
  startGame=function(n,mode=null){previousStartGame(n,mode);if(session){session.xp=0;session.bonusXp=0;session.bonusCoins=0}};

  coinPop=function(amount=1){const e=document.createElement('div');e.className='coin-pop';e.innerHTML=`+${amount} ${coinHTML()}`;document.body.appendChild(e);setTimeout(()=>e.remove(),900)};

  answer=function(v,btn){
    if(locked)return;locked=true;
    const c=session.queue.shift(),p=active(),good=v===c.answer,f=document.getElementById('feedback');
    document.querySelectorAll('.practice-choice').forEach(b=>b.disabled=true);
    if(good){
      btn.classList.add('good');c.streak++;session.correct++;
      const gold=awardCoins(p,1),xpHit=awardXP(p,5);session.coins+=gold.total;session.xp+=xpHit.total;session.bonusCoins+=gold.bonus;session.bonusXp+=xpHit.bonus;
      p.stats.correct=(p.stats.correct||0)+1;
      if(c.streak>=2){session.mastered++;const xpMaster=awardXP(p,5);session.xp+=xpMaster.total;session.bonusXp+=xpMaster.bonus;f.textContent=`⭐ Dominada! +${xpHit.total+xpMaster.total} XP${xpHit.bonus+xpMaster.bonus?` (${xpHit.bonus+xpMaster.bonus} bônus)`:''}`}
      else{session.queue.push(c);f.textContent=`Muito bem! +${gold.total} moeda${gold.total===1?'':'s'} · +${xpHit.total} XP`}
      f.className='practice-feedback good';coinPop(gold.total);playFX(true);beep(true)
    }else{
      btn.classList.add('bad');document.querySelectorAll('.practice-choice').forEach(b=>{if(Number(b.textContent)===c.answer)b.classList.add('good')});c.streak=0;session.wrong++;p.stats.wrong=(p.stats.wrong||0)+1;session.queue.push(c);f.textContent=`✕ Ops! ${c.a} × ${c.b} = ${c.answer}`;f.className='practice-feedback bad';showWrongAnswerSignal();beep(false);showVillainErrorAnimation()
    }
    save();renderHeader();setTimeout(renderQuestion,good?FX_TIMING.good:FX_TIMING.bad)
  };

  finishGame=function(){
    const p=active(),seconds=Math.max(1,Math.round((Date.now()-session.started)/1000)),now=Date.now(),t=tableLearning(p,session.n),firstMastery=session.mode!=='review'&&!t.masteredAt;
    p.stats.sessions=(p.stats.sessions||0)+1;p.stats.masteredDecks[session.n]={at:now,correct:session.correct,wrong:session.wrong};
    const xpFinish=awardXP(p,50);session.xp+=xpFinish.total;session.bonusXp+=xpFinish.bonus;
    let scheduleText='';
    if(session.mode==='review'&&t.masteredAt){const oldStage=Number(t.reviewStage||0);let stage=oldStage;if(session.wrong===0)stage=Math.min(REVIEW_INTERVAL_DAYS.length-1,oldStage+1);else if(session.wrong>=3)stage=Math.max(0,oldStage-1);t.reviewStage=stage;t.reviewCount=Number(t.reviewCount||0)+1;t.lastReviewAt=now;if(session.wrong>=3)t.lapses=Number(t.lapses||0)+1;const days=REVIEW_INTERVAL_DAYS[stage];t.nextReviewAt=now+days*86400000;scheduleText='Revisão concluída. A sua energia está baixa e você não consegue se teleportar agora. Descanse um pouco.'}
    else{t.masteredAt=t.masteredAt||now;t.reviewStage=0;t.reviewCount=Number(t.reviewCount||0);t.nextReviewAt=now+REVIEW_INTERVAL_DAYS[0]*86400000;t.lastReviewAt=now;const next=session.n<10?` A tabuada do ${session.n+1} foi desbloqueada!`:'';scheduleText=`Tabuada do ${session.n} dominada!${next} Sua energia precisa de 2 horas para se recuperar.`}
    if(firstMastery){const masteryGold=awardCoins(p,100);session.coins+=masteryGold.total;session.bonusCoins+=masteryGold.bonus;scheduleText+=` 🎉 +${masteryGold.total} moedas pelo domínio!`}
    for(const def of SPECIAL_CHEST_GALLERY){if(firstMastery&&session.n===def.table&&!p.flags?.[def.claimedFlag]){p.flags=p.flags||{};p.flags[def.pendingFlag]=true;scheduleText+=` 🎁 ${def.name} desbloqueado!`}}
    p.history.unshift({deck:session.n,mode:session.mode,correct:session.correct,wrong:session.wrong,coins:session.coins,xp:session.xp,bonusCoins:session.bonusCoins,bonusXp:session.bonusXp,seconds,at:now});p.history=p.history.slice(0,40);save();
    const bonusTxt=(session.bonusXp||session.bonusCoins)?` · bônus colecionáveis: +${session.bonusXp} XP / +${session.bonusCoins} Ouro`:'';
    document.getElementById('finishText').textContent=scheduleText+bonusTxt;
    document.getElementById('results').innerHTML=`<div class="res"><b>${session.correct}</b><span>ACERTOS</span></div><div class="res"><b>${session.wrong}</b><span>ERROS</span></div><div class="res"><b>+${session.coins}</b><span>OURO</span></div><div class="res"><b>+${session.xp}</b><span>XP</span></div>`;
    document.getElementById('finish').classList.add('open');playFX(true);beep(true)
  };

  applyDailyReward=function(p,r){if(r.kind==='coins'){const g=awardCoins(p,r.amount);return `${g.total} moedas${g.bonus?` (+${g.bonus} bônus)`:''}`}p.stats.dailyChestTokens=Number(p.stats.dailyChestTokens||0)+1;const nextIndex=Math.max(0,Number(p.stats.dailyChestsClaimed||0)),nextType=dailyChestTypeByIndex(nextIndex);return `${nextType.name} liberado`};

  grantExclusiveChestReward=function(p,type,forcedFrameId=null){
    const rewards=[],forced=forcedFrameId?item(forcedFrameId):null;
    if(forced&&!p.owned.includes(forced.id)){p.owned.push(forced.id);rewards.push(forced)}
    const frameSlots=Math.max(0,CHEST_CONTENT.frame-rewards.filter(x=>x.cat==='frame').length);
    rewards.push(...takeChestItems(p,CHEST_FRAME_IDS.filter(id=>id!==forcedFrameId),frameSlots,type));
    rewards.push(...takeChestItems(p,CHEST_BACKGROUND_IDS,CHEST_CONTENT.background,type));
    rewards.push(...takeChestItems(p,CHEST_EFFECT_IDS,CHEST_CONTENT.effect,type));
    for(let i=0;i<CHEST_CONTENT.fashion;i++){const skin=grantFashionReward(p,'chest');if(skin)rewards.push({id:`fashion_${skin.id}`,name:`Moda ${skin.name}`,cat:'fashion',asset:skin.asset,rarity:type.rarity})}
    if(rewards.length)return {kind:'items',items:rewards,label:rewards.map(x=>x.name).join(' · '),type};
    const base=250+Math.floor(Math.random()*151),g=awardCoins(p,base);return {kind:'coins',coins:g.total,label:`${g.total} moedas`,type}
  };

  const oldRenderCollection=renderCollection;
  renderCollection=function(){oldRenderCollection();const p=active();if(!p)return;const pct=collectibleBonusPct(p),owned=collectibleOwnedItems(p).length,total=collectibleAll().length,summary=document.getElementById('collectionSummaryText');if(summary)summary.textContent+=` Bônus passivo: +${pctText(pct)} XP e Ouro (${owned}/${total} colecionáveis).`;const chosen=collectionItemById(collectionSelectedId,p);if(chosen?.cat==='collectible'){const source=document.getElementById('collectionDetailSource');if(source)source.textContent+=` · Bônus deste item: +${pctText(collectibleItemBonusPct(chosen))} XP e Ouro`}};

  const oldShopCard=shopCard;
  shopCard=function(x,p){let html=oldShopCard(x,p);if(x?.cat==='collectible'){const pct=pctText(collectibleItemBonusPct(x));html=html.replace('<div class="item-type">Colecionável</div>',`<div class="item-type">Colecionável · +${pct} XP/Ouro</div>`)}return html};

  const oldRenderHome=renderHome;
  renderHome=function(){oldRenderHome();const p=active(),el=document.querySelector('.home-xptext');if(p&&el)el.textContent=`${xpInto(p.xp)} / 100 XP · ${p.xp} total`};

  const oldRenderHeader=renderHeader;
  renderHeader=function(){oldRenderHeader();const p=active(),line=document.querySelector('#headerPlayer .level-line');if(p&&line){const spans=line.querySelectorAll('span');const last=spans[spans.length-1];if(last)last.textContent=`${xpInto(p.xp)}/100 XP · ${p.xp} total`}};

  function refreshXPUI(p=active()) {
    if(!p)return;
    const pct=xpInto(p.xp),lvl=levelFor(p.xp);
    document.querySelectorAll('.home-xpbar i').forEach(el=>el.style.width=`${pct}%`);
    document.querySelectorAll('.home-xptext').forEach(el=>el.textContent=`${pct} / 100 XP · ${p.xp} total`);
    document.querySelectorAll('.home-level-star').forEach(el=>el.textContent=lvl);
    document.querySelectorAll('#headerPlayer .xpbar i').forEach(el=>el.style.width=`${pct}%`);
    const line=document.querySelector('#headerPlayer .level-line');
    if(line){
      const badge=line.querySelector('.level-badge');if(badge)badge.textContent=`Nível ${lvl}`;
      const spans=line.querySelectorAll('span'),last=spans[spans.length-1];if(last)last.textContent=`${pct}/100 XP · ${p.xp} total`;
    }
    document.querySelectorAll('.profile-xp-wrap .xpbar i').forEach(el=>el.style.width=`${pct}%`);
    const profileWrap=document.querySelector('.profile-xp-wrap');
    if(profileWrap){const spans=profileWrap.querySelectorAll(':scope > span');if(spans.length)spans[spans.length-1].textContent=`${pct}/100`;}
    document.querySelectorAll('.avatar-level-seal').forEach(el=>el.textContent=`NV ${lvl}`);
  }
  window.refreshXPUI=refreshXPUI;
  const awardXPBase=window.awardXP;
  window.awardXP=function(p,base){const result=awardXPBase(p,base);refreshXPUI(p);return result};
  const renderHomeXPBase=renderHome;
  renderHome=function(){renderHomeXPBase();refreshXPUI(active())};
  const renderHeaderXPBase=renderHeader;
  renderHeader=function(){renderHeaderXPBase();refreshXPUI(active())};
})();


/* v0.9.3.7 — normalização segura do ouro inicial */
(function(){
  const FLAG='v0937StarterCoinsFixed';
  const familyNames=new Set(['alana','thais','heloisa']);
  function isUntouchedFamilyProfile(p){
    if(!p||!familyNames.has(normalizedName(p.name)))return false;
    const stats=p.stats||{}, mastered=stats.masteredDecks||{};
    return Number(stats.sessions||0)===0&&Number(stats.correct||0)===0&&Number(stats.wrong||0)===0&&Object.keys(mastered).length===0&&(!Array.isArray(p.history)||p.history.length===0);
  }
  const previousMigrate0937=migrateProfile;
  migrateProfile=function(p){
    previousMigrate0937(p);
    if(!p)return p;
    p.flags=p.flags||{};
    if(!p.flags[FLAG]){
      if(isUntouchedFamilyProfile(p))p.coins=100;
      p.flags[FLAG]=true;
    }
    return p;
  };
  state.profiles.forEach(migrateProfile);
  save();
})();


/* v0.9.3.8 — normalização única do ouro dos 3 perfis */
(function(){
  const FLAG='v0938GoldNormalized';
  const familyNames=new Set(['alana','thais','heloisa']);
  for(const p of state.profiles){
    if(!p||!familyNames.has(normalizedName(p.name)))continue;
    p.flags=p.flags||{};
    if(!p.flags[FLAG]){
      p.coins=100;
      p.flags[FLAG]=true;
    }
  }
  save();
})();


/* v0.9.3.9 — sistema visual PETS (sem PNG do mockup; UI real + sprites) */
(function(){
  const PET_NAMES=['Axolote Pirata','Coelho Aquático','Kirin Celestial','Manta Celestial','Coruja-Lagarto','Koi Dragão de Fogo','Yokai Planador','Camaleão da Floresta','Ouriço Cristalino','Pangolim Fênix','Tanuki Místico','Tartaruga Samurai','Pet Alquimista','Oráculo Octópode','Cavalinho-Marinho Elétrico','Guardião Besouro','Alpaca Celestial','Lontra Celestial','Tamanduá Xamã','Capivara Lunar','Arara Solar','Narval Imperial','Pavão Astral','Preguiça Relíquia','Quokka Celestial','Louva-a-Deus Sagrada','Caranguejo do Tesouro','Libélula de Cristal','Foca Aurora','Tatu Solar'];
  const PETS=Array.from({length:10},(_,portal)=>[3,7,10].map((table,slot)=>{const spriteId=table===10?21+portal:portal*2+slot+1,rescueTable=portal===9&&slot===2?9:table;return {id:portal*3+slot+1,portal:portal+1,table:rescueTable,spriteId,name:PET_NAMES[spriteId-1],title:slot===2?'Lendário':slot===0?'Mágico':'Raro',desc:`Companheiro resgatado no Portal ${portal+1}, ao dominar o mapa ${rescueTable}.`}})).flat();
  window.PET_DEFS=PETS;
  let petSelectedId=1,petAnimTimer=null,petAmbientTimer=null,petAmbientFrame=0,petBurstTimer=null;
  function petFrames(id,animation='idle'){const pet=PETS.find(x=>x.id===Number(id)),sprite=pet?.spriteId||Number(id)||1;return Array.from({length:8},(_,i)=>`pet30-${String(sprite).padStart(2,'0')}-${animation}_${String(i).padStart(2,'0')}.png`)}
  window.petFrames=petFrames;
  function petRescued(p,pet){return !!p&&!!p.pets?.[String(pet.id)]?.rescued}
  function petsSaved(p=active()){return PETS.filter(x=>petRescued(p,x)).length}
  function selectedPet(){return PETS.find(x=>x.id===petSelectedId)||PETS[0]}
  window.petsInfo=function(){toast('🏴‍☠️ Cada portal possui PETs nas Tabuadas 3, 7 e 10. O PET da Tabuada 10 é lendário!')};
  window.selectPet=function(id){petSelectedId=Number(id)||1;renderPets();restartPetAmbientAnimation()};
  window.playSelectedPetAnimation=function(){const p=active(),pet=selectedPet();if(!p||!petRescued(p,pet))return toast(`🔒 Domine a Tabuada do ${pet.table} no Portal ${pet.portal} para resgatar este pet.`);const img=document.getElementById('petShowcaseImg'),frames=petFrames(pet.id,'happy');if(!img)return;clearInterval(petBurstTimer);let step=0;img.src=frames[0];petBurstTimer=setInterval(()=>{step++;img.src=frames[step%frames.length];if(step>=7){clearInterval(petBurstTimer);petBurstTimer=null}},95)};
  function renderPets(){
    const p=active(),grid=document.getElementById('petsGrid');if(!p||!grid)return;
    const saved=petsSaved(p),savedEl=document.getElementById('petsSavedCount'),homeCount=document.getElementById('homePetsCount');if(savedEl)savedEl.textContent=`${saved}/30`;if(homeCount)homeCount.textContent=`${saved}/30`;
    if(!PETS.some(x=>x.id===petSelectedId&&petRescued(p,x))){const last=[...PETS].reverse().find(x=>petRescued(p,x));if(last)petSelectedId=last.id}
    const pet=selectedPet(),rescued=petRescued(p,pet),img=document.getElementById('petShowcaseImg'),lock=document.getElementById('petShowcaseLock'),name=document.getElementById('petSelectedName'),status=document.getElementById('petSelectedStatus'),desc=document.getElementById('petSelectedDesc'),watch=document.getElementById('petWatchBtn');
    if(img){img.src=petFrames(pet.id)[0];img.alt=`${pet.name} ${pet.title}`;img.classList.toggle('locked',!rescued)}if(lock)lock.style.display=rescued?'none':'grid';if(name)name.innerHTML=`${esc(pet.name)} <span>${esc(pet.title)}</span>`;if(status){status.textContent=rescued?'RESGATADO':'SEQUESTRADO';status.className=`pet-status ${rescued?'rescued':'locked'}`};if(desc)desc.innerHTML=rescued?`<b>✨ Animado</b><br>${esc(pet.desc)}`:`<b>🔒 Portal ${pet.portal}</b><br>Domine o <b>mapa ${pet.table}</b>${pet.title==='Lendário'?' para libertar o PET lendário':''}.`;if(watch){watch.disabled=!rescued;watch.textContent=rescued?'🎮 Brincar':'🔒 Brincar bloqueado'}
    grid.innerHTML=PETS.map(x=>{const ok=petRescued(p,x),sel=x.id===petSelectedId;return `<button type="button" class="pet-card ${ok?'rescued':'locked'} ${sel?'selected':''}" onclick="selectPet(${x.id})"><span class="pet-card-number">P${x.portal}</span><div class="pet-card-art"><img class="pet-live-sprite" data-pet-id="${x.id}" src="${petFrames(x.id)[0]}" alt="${esc(x.name)}"><span class="pet-card-lock">🔒</span></div><span class="pet-card-status">${ok?'RESGATADO':`Tabuada ${x.table}`}</span><small>${ok?'✦ ANIMADO':x.table===10?'LENDÁRIO':'PET OCULTO'}</small></button>`}).join('');
  }
  function petAmbientTick(){const p=active();if(!p||!document.getElementById('petsScreen')?.classList.contains('active'))return;petAmbientFrame=(petAmbientFrame+1)%8;document.querySelectorAll('.pet-card.rescued .pet-live-sprite').forEach(img=>{const id=Number(img.dataset.petId);img.src=petFrames(id)[petAmbientFrame]});const pet=selectedPet(),show=document.getElementById('petShowcaseImg');if(show&&petRescued(p,pet)&&!petBurstTimer)show.src=petFrames(pet.id)[petAmbientFrame]}
  function restartPetAmbientAnimation(){clearInterval(petAmbientTimer);petAmbientFrame=0;petAmbientTimer=setInterval(petAmbientTick,120)}
  window.renderPets=renderPets;
  const oldShowTabPets=showTab;
  showTab=function(t){
    if(t==='pets'){
      ['home','chests','collection','pets','world','background','fashion','store','inventory','profile'].forEach(x=>document.getElementById(x+'Screen')?.classList.toggle('active',x==='pets'));
      const app=document.getElementById('app'),homeBtn=document.getElementById('homeReturnBtn');app.classList.remove('home-mode','background-mode','fashion-mode','vault-mode');app.classList.add('internal-mode','pets-mode');if(homeBtn)homeBtn.classList.remove('show');renderPets();restartPetAmbientAnimation();window.scrollTo(0,0);return;
    }
    document.getElementById('petsScreen')?.classList.remove('active');
    document.getElementById('app')?.classList.remove('pets-mode');clearInterval(petAmbientTimer);petAmbientTimer=null;oldShowTabPets(t)
  };
  const oldRenderAllPets=renderAll;
  renderAll=function(){oldRenderAllPets();renderPets()};
  const oldRenderHomePets=renderHome;
  renderHome=function(){oldRenderHomePets();const el=document.getElementById('homePetsCount'),p=active();if(el&&p)el.textContent=`${petsSaved(p)}/30`};
})();

/* v0.9.4.0 — história e resgate de PETS */
(function(){
  const VILLAIN_NAME='Capitão Corsário Arcano';
  let rescueRunning=false,rescueTimers=[],rescuePetTimer=null,rescueTable=0,rescuePetId=0;
  const later=(fn,ms)=>{const id=setTimeout(fn,ms);rescueTimers.push(id);return id};
  function clearRescueTimers(){rescueTimers.forEach(clearTimeout);rescueTimers=[];clearInterval(rescuePetTimer);rescuePetTimer=null}
  function petDefForTable(n,portal=1){return (window.PET_DEFS||[]).find(x=>x.table===Number(n)&&x.portal===Number(portal))}
  function villainFrames(){return Array.from({length:6},(_,i)=>`villain-frame-${i}.webp`)}
  function setVillainFrame(i){const img=document.getElementById('rescueVillainImg');if(img)img.src=villainFrames()[Math.max(0,Math.min(5,i))]}
  function setPetFrame(pet,i){const img=document.getElementById('rescuePetImg'),frames=window.petFrames?.(pet.id,'happy')||[];if(img&&frames.length)img.src=frames[i%frames.length]}
  function ensurePetState(p){p.flags=p.flags||{};if(!p.flags.pets30Migrated){p.pets={};p.flags.pets30Migrated=true}p.pets=p.pets||{};for(const pet of (window.PET_DEFS||[])){if(pet.portal===1&&[3,7,10].includes(pet.table)&&tableMasteredRaw(p,pet.table)&&!p.pets[String(pet.id)])p.pets[String(pet.id)]={rescued:true,rescuedAt:null,legacy:true,portal:1,table:pet.table}}}
  const priorMigratePetStory=migrateProfile;
  migrateProfile=function(p){priorMigratePetStory(p);if(p)ensurePetState(p)};

  const priorFinishGamePetStory=finishGame;
  finishGame=function(){
    const p=active(),n=Number(session?.n||0),portal=Number(session?.portal||1),pet=petDefForTable(n,portal),already=!!(pet&&p?.pets?.[String(pet.id)]?.rescued);
    priorFinishGamePetStory();
    if(pet&&!already){
      p.flags=p.flags||{};p.pets=p.pets||{};
      p.pets[String(pet.id)]={rescued:true,rescuedAt:Date.now(),portal,table:n};
      if(!p.flags.petRescueSeen?.[String(pet.id)])p.flags.petRescuePending=pet.id;
      save();
      const ft=document.getElementById('finishText');if(ft)ft.textContent+=` 🐾 Um filhote mágico pode ser resgatado!`;
    }
  };

  window.startPetRescue=function(petId){
    const p=active(),pet=(window.PET_DEFS||[]).find(x=>x.id===Number(petId)),overlay=document.getElementById('petRescueOverlay');
    if(!p||!pet||!overlay||rescueRunning)return false;
    rescueRunning=true;rescuePetId=pet.id;rescueTable=pet.table;clearRescueTimers();
    const hero=document.querySelector('.rescue-hero'),villain=document.querySelector('.rescue-villain'),prison=document.getElementById('rescuePetPrison'),blast=document.getElementById('rescueBlast'),cont=document.getElementById('petRescueContinue'),msg=document.getElementById('petRescueMessage'),title=document.getElementById('petRescueTitle'),kicker=document.getElementById('petRescueKicker'),powerFill=document.getElementById('villainPowerFill'),powerText=document.getElementById('villainPowerText'),heroImg=document.getElementById('rescueHeroAvatar');
    overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');
    hero?.classList.remove('attack');villain?.classList.remove('hit','defeated','final-defeat');prison?.classList.remove('broken');blast?.classList.remove('fire');if(cont){cont.disabled=true;cont.textContent='Aguarde...'};
    if(heroImg)heroImg.src=avatarAsset(p);setVillainFrame(0);setPetFrame(pet,0);
    if(title)title.textContent=`Tabuada do ${pet.table} dominada!`;if(kicker)kicker.textContent=`PORTAL ${pet.portal} · RESGATE ${pet.table===10?'LENDÁRIO':''}`;
    const beforePower=pet.table===3?3:pet.table===7?2:1;if(powerFill)powerFill.style.width=`${beforePower/3*100}%`;if(powerText)powerText.textContent=`${beforePower}/3`;
    if(msg)msg.innerHTML=`O <strong>${VILLAIN_NAME}</strong> ainda mantém ${pet.name} preso!`;
    later(()=>{if(msg)msg.textContent='Aventureira, use o poder da tabuada!';hero?.classList.add('attack');blast?.classList.add('fire');playFX?.(true);beep?.(true)},650);
    later(()=>{villain?.classList.add('hit');let f=0;const step=()=>{setVillainFrame(f);f++;if(f<6)later(step,135)};step()},910);
    later(()=>{
      const afterPower=Math.max(0,beforePower-1);if(powerFill)powerFill.style.width=`${afterPower/3*100}%`;if(powerText)powerText.textContent=`${afterPower}/3`;
      villain?.classList.add(pet.portal===10&&pet.id===30?'final-defeat':'defeated');prison?.classList.add('broken');if(msg)msg.innerHTML=`✨ <strong>${pet.name} ${pet.title}</strong> foi resgatado!`;
      let pf=0;rescuePetTimer=setInterval(()=>{setPetFrame(pet,pf++);if(pf>=12){clearInterval(rescuePetTimer);rescuePetTimer=null}},190);
      showAssetBurst?.();
    },1850);
    later(()=>{
      const saved=(window.PET_DEFS||[]).filter(x=>p.pets?.[String(x.id)]?.rescued).length;if(msg)msg.innerHTML=pet.portal===10&&pet.id===30?`🏆 <strong>Todos os 30 filhotes foram salvos!</strong><br>O ${VILLAIN_NAME} foi derrotado de vez.`:`🐾 ${pet.name} agora está seguro. <strong>${saved}/30</strong> PETs resgatados.`;
      if(cont){cont.disabled=false;cont.textContent=pet.portal===10&&pet.id===30?'Ver todos os PETS':'Ver pet resgatado'};
    },2850);
    return true;
  };
  window.finishPetRescue=function(){
    const p=active(),pet=(window.PET_DEFS||[]).find(x=>x.id===rescuePetId),overlay=document.getElementById('petRescueOverlay');
    if(!p||!pet)return;
    p.flags=p.flags||{};p.flags.petRescueSeen=p.flags.petRescueSeen||{};p.flags.petRescueSeen[String(rescuePetId)]=true;
    if(Number(p.flags.petRescuePending)===rescuePetId)delete p.flags.petRescuePending;
    save();clearRescueTimers();rescueRunning=false;overlay?.classList.remove('open');overlay?.setAttribute('aria-hidden','true');
    window.selectPet?.(pet.id);showTab('pets');
  };

  const priorFinishClosePetStory=finishClose;
  finishClose=function(){
    const p=active(),pending=Number(p?.flags?.petRescuePending||0);
    if(!pending)return priorFinishClosePetStory();
    clearActiveFX?.();document.getElementById('finish')?.classList.remove('open');session=null;document.getElementById('game').style.display='none';document.getElementById('app').style.display='block';renderAll();showTab('home');
    setTimeout(()=>window.startPetRescue(pending),120);
  };

  // If the app closed after mastery but before the rescue scene, resume it on Home.
  const priorRenderHomePetStory=renderHome;
  renderHome=function(){
    priorRenderHomePetStory();const p=active();if(!p)return;ensurePetState(p);
    const pending=Number(p.flags?.petRescuePending||0),art=document.getElementById('homePetsQuestArt');
    const saved=(window.PET_DEFS||[]).filter(x=>!!p.pets?.[String(x.id)]?.rescued).length;
    if(art){const next=(window.PET_DEFS||[]).find(x=>!p.pets?.[String(x.id)]?.rescued)||(window.PET_DEFS||[])[29];if(next)art.src=window.petFrames?.(next.id,'idle')?.[0]||''}
    if(pending&&!rescueRunning&&!document.getElementById('petRescueOverlay')?.classList.contains('open'))later(()=>{if(document.getElementById('homeScreen')?.classList.contains('active'))window.startPetRescue(pending)},500);
  };
})();

/* v0.9.4.8 — tela completa de Recompensas Diárias */
(function(){
  const DAILY_WEEK_SIZE=7;
  const DAILY_CHEST_DAYS=[5,10,15,20,25,30];
  const DAILY_CHEST_SPRITES=['magic','pirate','starlight','royal','pirate','starlight'];
  let dailyWeekPage=0;

  function currentDailyWeek(p){
    const progress=Math.max(0,Math.min(DAILY_REWARDS.length,Number(p?.daily?.progress||0)));
    return Math.min(Math.ceil(DAILY_REWARDS.length/DAILY_WEEK_SIZE)-1,Math.floor(Math.min(progress,DAILY_REWARDS.length-1)/DAILY_WEEK_SIZE));
  }
  function dailyChestAsset(day){
    const index=Math.max(0,DAILY_CHEST_DAYS.indexOf(day));
    return `chest-${DAILY_CHEST_SPRITES[index]||'magic'}-frame-0.webp`;
  }
  function dailyRewardArtV2(reward,day){
    if(reward.kind==='coins')return `<img src="coin.webp" alt="Moedas">`;
    if(reward.kind==='background'){
      const x=item(reward.id);
      return `<img class="daily-v2-bg-art" src="${x?.asset||'bg-kingdom.webp'}" alt="${esc(x?.name||'Fundo especial')}">`;
    }
    return `<img src="${dailyChestAsset(day)}" alt="Baú diário">`;
  }
  function dailyRewardLabelV2(reward){
    if(reward.kind==='coins')return `<strong>${Number(reward.amount||0)}</strong><span>MOEDAS</span>`;
    if(reward.kind==='background')return `<strong>FUNDO</strong><span>${esc(item(reward.id)?.name||'ESPECIAL')}</span>`;
    return `<strong>BAÚ DIÁRIO</strong><span>TESOURO + MOLDURA</span>`;
  }
  function dailyPageRange(page){
    const start=page*DAILY_WEEK_SIZE;
    return {start,end:Math.min(DAILY_REWARDS.length,start+DAILY_WEEK_SIZE)};
  }
  function setDailyPage(page){
    const max=Math.ceil(DAILY_REWARDS.length/DAILY_WEEK_SIZE)-1;
    dailyWeekPage=Math.max(0,Math.min(max,Number(page)||0));
    renderDailyOverlay();
  }

  window.changeDailyWeek=function(delta){setDailyPage(dailyWeekPage+Number(delta||0))};
  window.dailyPrimaryAction=function(){
    const p=active();if(!p)return;
    const target=currentDailyWeek(p);
    if(dailyWeekPage!==target)return setDailyPage(target);
    claimDailyReward();
  };

  homeDailyReward=function(){
    const p=active();if(!p)return;
    dailyWeekPage=currentDailyWeek(p);
    renderDailyOverlay();
    document.getElementById('dailyOverlay')?.classList.add('open');
  };

  applyDailyReward=function(p,reward){
    if(reward.kind==='coins'){
      const gain=typeof awardCoins==='function'?awardCoins(p,reward.amount):{total:Number(reward.amount||0),bonus:0};
      if(typeof awardCoins!=='function')p.coins=Number(p.coins||0)+gain.total;
      return `${gain.total} moedas${gain.bonus?` (+${gain.bonus} bônus)`:''}`;
    }
    if(reward.kind==='background'){
      const x=item(reward.id);p.owned=p.owned||[];
      if(x&&!p.owned.includes(x.id))p.owned.push(x.id);
      return x?.name||'Fundo especial';
    }
    p.stats=p.stats||{};
    p.stats.dailyChestTokens=Number(p.stats.dailyChestTokens||0)+1;
    const chestIndex=Math.max(0,Number(p.stats.dailyChestsClaimed||0));
    const names=['Baú Mágico','Baú Pirata','Baú Estelar','Baú Real','Baú Pirata','Baú Estelar'];
    return `${names[chestIndex]||'Baú diário'} liberado`;
  };

  renderDailyOverlay=function(){
    const p=active();if(!p)return;
    const progress=Math.max(0,Math.min(DAILY_REWARDS.length,Number(p.daily?.progress||0))),done=!!p.daily?.completed||progress>=DAILY_REWARDS.length,can=canClaimDaily(p),currentWeek=currentDailyWeek(p),pages=Math.ceil(DAILY_REWARDS.length/DAILY_WEEK_SIZE),range=dailyPageRange(dailyWeekPage),xpNow=xpInto(p.xp),lvl=levelFor(p.xp);
    const page=document.querySelector('#dailyOverlay .daily-v2-page');
    if(page)page.style.setProperty('--daily-bg',`url("${homeBackgroundAsset(p)}")`);
    const profile=document.getElementById('dailyProfile'),wallet=document.getElementById('dailyWallet');
    if(profile)profile.innerHTML=`${avatarHTML(p,'mini',false)}<div class="daily-v2-profile-copy"><strong>${esc(p.name)}</strong><small>NÍVEL ${lvl}</small><div class="daily-v2-profile-xp"><span><i style="width:${xpNow}%"></i></span><b>${xpNow}/100 XP</b></div></div>`;
    if(wallet)wallet.innerHTML=`${coinHTML()}<span>${Number(p.coins||0).toLocaleString('pt-BR')}</span>`;
    const cycle=document.getElementById('dailyCycleLabel'),week=document.getElementById('dailyWeekLabel');
    if(cycle)cycle.textContent=`CICLO ${Number(p.daily?.cycle||1)} · ${progress}/${DAILY_REWARDS.length} DIAS`;
    if(week)week.textContent=`SEMANA ${dailyWeekPage+1} DE ${pages}`;
    const prev=document.getElementById('dailyPrevWeek'),nextBtn=document.getElementById('dailyNextWeek');
    if(prev)prev.disabled=dailyWeekPage===0;if(nextBtn)nextBtn.disabled=dailyWeekPage===pages-1;

    const status=document.getElementById('dailyStatus');
    if(status){
      if(done)status.innerHTML='<i>🏆</i><div><b>Calendário concluído!</b><span>As 30 recompensas deste perfil foram conquistadas.</span></div>';
      else if(can)status.innerHTML=`<i>🎁</i><div><b>Dia ${progress+1} disponível!</b><span>Entre todos os dias para avançar e liberar tesouros.</span></div>`;
      else status.innerHTML='<i>✓</i><div><b>Recompensa de hoje coletada</b><span>A próxima recompensa ficará disponível amanhã.</span></div>';
    }

    const progressBox=document.getElementById('dailyProgress');
    if(progressBox){
      const nodes=[];let claimedInPage=0,realSlots=0;
      for(let slot=0;slot<DAILY_WEEK_SIZE;slot++){
        const index=range.start+slot,exists=index<DAILY_REWARDS.length,claimed=exists&&index<progress,today=exists&&index===progress&&!done;
        if(exists)realSlots++;if(claimed)claimedInPage++;
        nodes.push(`<span class="daily-v2-node ${!exists?'empty':claimed?'claimed':today?'today':''}">${!exists?'·':claimed?'✓':index+1}</span>`);
      }
      const denom=Math.max(1,realSlots-1),fill=Math.max(0,Math.min(88,claimedInPage/denom*88));
      progressBox.style.setProperty('--week-fill',`${fill}%`);progressBox.innerHTML=nodes.join('');
    }

    const grid=document.getElementById('dailyGrid');
    if(grid)grid.innerHTML=DAILY_REWARDS.slice(range.start,range.end).map((reward,offset)=>{
      const index=range.start+offset,day=index+1,claimed=index<progress,today=index===progress&&!done,locked=index>progress,special=reward.kind==='daily_chest';
      return `<article class="daily-v2-card ${claimed?'claimed':today?'today':locked?'locked':''} ${special?'special':''}">
        <div class="daily-v2-card-day">Dia ${day}</div>${special?'<div class="daily-v2-special-ribbon">RECOMPENSA ESPECIAL</div>':''}
        <div class="daily-v2-card-art">${dailyRewardArtV2(reward,day)}</div><div class="daily-v2-card-copy">${dailyRewardLabelV2(reward)}</div>
        ${claimed?'<span class="daily-v2-card-badge">✓</span>':locked?'<span class="daily-v2-card-lock">🔒</span>':''}</article>`;
    }).join('');

    const btn=document.getElementById('dailyClaimBtn');
    if(btn){
      if(dailyWeekPage!==currentWeek){btn.disabled=false;btn.textContent=done?'VER ÚLTIMA SEMANA':`IR PARA O DIA ${progress+1}`}
      else if(done){btn.disabled=true;btn.textContent='CALENDÁRIO CONCLUÍDO'}
      else if(can){btn.disabled=false;btn.textContent=`COLETAR DIA ${progress+1}`}
      else{btn.disabled=true;btn.textContent='VOLTE AMANHÃ'}
    }
  };

  claimDailyReward=function(){
    const p=active();if(!p||!canClaimDaily(p))return;
    const index=Number(p.daily?.progress||0),reward=DAILY_REWARDS[index];
    if(!reward)return toast('Calendário já concluído.');
    const label=applyDailyReward(p,reward);
    p.daily.lastClaimDate=localDayKey();p.daily.progress=index+1;
    if(p.daily.progress>=DAILY_REWARDS.length){p.daily.completed=true;p.daily.progress=DAILY_REWARDS.length}
    save();showAssetBurst();renderAll();renderDailyOverlay();toast(`✨ Recompensa: ${label}`);
  };
})();

/* v0.9.6.0 — portais independentes por tabuada e repetição espaçada */
(function(){
  const PORTAL_COUNT=10;
  const PORTAL_ENERGY_MAX=3,PORTAL_ENERGY_REGEN_MS=2*60*60*1000;
  const PORTAL_CAMPAIGN_STEPS=[
    {portal:1,target:3,next:2},{portal:2,target:5,next:3},{portal:3,target:3,next:1},
    {portal:1,target:5,next:4},{portal:4,target:3,next:2},{portal:2,target:7,next:5},
    {portal:5,target:3,next:3},{portal:3,target:5,next:6},{portal:6,target:3,next:1},
    {portal:1,target:7,next:7},{portal:7,target:3,next:4},{portal:4,target:5,next:8},
    {portal:8,target:3,next:2},{portal:2,target:10,next:9},{portal:9,target:3,next:null}
  ];
  const PORTAL_POS={1:[31.8,25.0],2:[68.4,25.0],3:[31.8,41.1],4:[68.4,41.1],5:[31.8,57.1],6:[68.4,57.1],7:[31.8,73.2],8:[68.4,73.2],9:[31.8,89.1],10:[68.4,89.1]};
  const PORTAL_MAPS={1:'portal-world-01-map.png',2:'portal-world-02-map.png',3:'portal-world-03-map.png',4:'portal-world-04-map.png',5:'portal-world-05-map.png',6:'portal-world-06-map.png',7:'portal-world-07-map.png',8:'portal-world-08-map.png',9:'portal-world-09-map.png',10:'portal-world-10-map.png'};
  const PORTAL_TABLE_POS={1:WORLD_MAP_POS,default:{1:{x:49,y:94.4},2:{x:75,y:79.5},3:{x:21,y:79.5},4:{x:49.5,y:66.3},5:{x:77.5,y:56.7},6:{x:20.5,y:56.7},7:{x:49,y:46},8:{x:75,y:35.5},9:{x:21.5,y:35.2},10:{x:50,y:23.4}}};
  let portalView='hub',selectedPortal=1;

  function ensurePortalCampaign(p){
    p.portalCampaign=p.portalCampaign&&typeof p.portalCampaign==='object'?p.portalCampaign:{step:0,completed:{},opened:[1],keys:[],energy:PORTAL_ENERGY_MAX,energyAt:Date.now(),letters:[1],unreadLetters:[1]};
    const c=p.portalCampaign;c.completed=c.completed&&typeof c.completed==='object'?c.completed:{};c.opened=Array.isArray(c.opened)?c.opened:[1];c.keys=Array.isArray(c.keys)?c.keys:[];c.letters=Array.isArray(c.letters)?c.letters:[1];c.unreadLetters=Array.isArray(c.unreadLetters)?c.unreadLetters:[1];
    if(!Number.isFinite(Number(c.energy))){c.energy=PORTAL_ENERGY_MAX;c.energyAt=Date.now()}
    c.energy=Math.max(0,Math.min(PORTAL_ENERGY_MAX,Number(c.energy)||0));c.energyAt=Number(c.energyAt||Date.now());
    recoverPortalEnergy(c);
    if(!p.flags?.portalCampaignMigrated){
      const first=c.completed['1']=c.completed['1']||{};
      for(let n=1;n<=10;n++)if(tableLearning(p,n)?.masteredAt)first[String(n)]=true;
      p.flags=p.flags||{};p.flags.portalCampaignMigrated=true;
    }
    c.step=Math.max(0,Math.min(PORTAL_CAMPAIGN_STEPS.length,Number(c.step)||0));
    let guard=0;
    while(c.step<PORTAL_CAMPAIGN_STEPS.length&&guard++<30){
      const gate=PORTAL_CAMPAIGN_STEPS[c.step];
      if(!c.completed[String(gate.portal)]?.[String(gate.target)])break;
      if(gate.next&&!c.opened.includes(gate.next)){c.opened.push(gate.next);deliverPortalLetter(c,gate.next)}
      if(gate.next&&!c.keys.includes(gate.next))c.keys.push(gate.next);
      c.step++;
    }
    return c;
  }
  function recoverPortalEnergy(c){const now=Date.now();if(c.energy>=PORTAL_ENERGY_MAX){c.energy=PORTAL_ENERGY_MAX;c.energyAt=now;return c.energy}const elapsed=Math.max(0,now-Number(c.energyAt||now)),gained=Math.floor(elapsed/PORTAL_ENERGY_REGEN_MS);if(gained>0){c.energy=Math.min(PORTAL_ENERGY_MAX,c.energy+gained);c.energyAt=c.energy>=PORTAL_ENERGY_MAX?now:Number(c.energyAt)+gained*PORTAL_ENERGY_REGEN_MS}return c.energy}
  function deliverPortalLetter(c,portal){if(!c.letters.includes(portal))c.letters.push(portal);if(!c.unreadLetters.includes(portal))c.unreadLetters.push(portal);c.energy=PORTAL_ENERGY_MAX;c.energyAt=Date.now();c.lastLetterPortal=portal}
  function consumePortalEnergy(c){recoverPortalEnergy(c);if(c.energy<1)return false;if(c.energy>=PORTAL_ENERGY_MAX)c.energyAt=Date.now();c.energy--;return true}
  function portalEnergyWait(c){recoverPortalEnergy(c);const left=Math.max(0,PORTAL_ENERGY_REGEN_MS-(Date.now()-Number(c.energyAt||Date.now())));return Math.max(1,Math.ceil(left/60000))}
  function portalMapDone(c,portal,n){return !!c.completed?.[String(portal)]?.[String(n)]}
  function portalComplete(c,portal){for(let n=1;n<=10;n++)if(!portalMapDone(c,portal,n))return false;return true}
  function activeCampaignGate(p){
    const c=ensurePortalCampaign(p);
    if(c.step<PORTAL_CAMPAIGN_STEPS.length)return {...PORTAL_CAMPAIGN_STEPS[c.step],phase:'keys',step:c.step};
    for(let portal=1;portal<=9;portal++)if(!portalComplete(c,portal))return {portal,target:10,next:null,phase:'convergence'};
    if(!c.opened.includes(10)){c.opened.push(10);c.keys.push(10);deliverPortalLetter(c,10)}
    if(!portalComplete(c,10))return {portal:10,target:10,next:null,phase:'final'};
    p.flags=p.flags||{};p.flags.finalPortalComplete=true;p.flags.finalRewardPending=true;
    return {portal:10,target:10,next:null,phase:'complete'};
  }
  function markPortalMapComplete(p,portal,n){
    const c=ensurePortalCampaign(p),bucket=c.completed[String(portal)]=c.completed[String(portal)]||{};
    bucket[String(n)]=true;
    const before=c.step;const gate=activeCampaignGate(p);
    return {advanced:c.step>before,gate,c};
  }
  function portalGuidance(gate){
    if(gate.phase==='convergence')return `As chaves detectaram mapas incompletos no Portal ${gate.portal}. Vá até lá para restaurar a energia da Convergência.`;
    if(gate.phase==='final')return 'As nove chaves se uniram e despertaram o Portal 10. O chamado final está vindo de lá.';
    if(gate.phase==='complete')return 'A rede de portais está em equilíbrio. Todos os caminhos mágicos foram concluídos.';
    const stories=[
      'A primeira chave começou a brilhar e apontou uma trilha de luz',
      'O mapa encantado revelou pegadas mágicas que atravessam',
      'Uma tempestade de números fechou os outros caminhos e deixou seguro apenas',
      'O cristal da bússola está vibrando e conduzindo você para',
      'O guardião das chaves ouviu um pedido de ajuda vindo de',
      'As estrelas reorganizaram a rota da missão e destacaram',
      'Um fragmento da próxima chave apareceu escondido em',
      'A energia dos PETS resgatados abriu uma passagem temporária em'
    ];
    return `${stories[Number(gate.step||0)%stories.length]} o Portal ${gate.portal}. Vá até lá para continuar a busca pela próxima chave.`;
  }
  function portalLearning(p,n){
    const t=tableLearning(p,n);
    if(!Number.isFinite(Number(t.portalStage))){
      t.portalStage=t.masteredAt?Math.min(PORTAL_COUNT,Number(t.reviewCount||0)+2):1;
    }
    t.portalStage=Math.max(1,Math.min(PORTAL_COUNT,Number(t.portalStage)||1));
    return t;
  }
  function tablePortal(p,n){return portalLearning(p,n).portalStage}
  function portalTableState(p,portal,n){
    const c=ensurePortalCampaign(p),gate=activeCampaignGate(p),done=portalMapDone(c,portal,n);
    if(done)return {id:'scheduled',label:'CONCLUÍDO',note:`Mapa ${n} concluído`,enabled:false};
    if(gate.phase==='complete')return {id:'scheduled',label:'CONCLUÍDO',note:'Campanha concluída',enabled:false};
    if(portal!==gate.portal)return {id:'locked',label:'SIGA O CHAMADO',note:portalGuidance(gate),enabled:false};
    let previousDone=true;for(let i=1;i<n;i++)if(!portalMapDone(c,portal,i)){previousDone=false;break}
    if(n>gate.target)return {id:'locked',label:'AGUARDE',note:`A etapa atual termina no mapa ${gate.target}`,enabled:false};
    if(!previousDone)return {id:'locked',label:'EM SEQUÊNCIA',note:`Conclua primeiro o mapa ${n-1}`,enabled:false};
    if(c.energy<1)return {id:'scheduled',label:'ENERGIA BAIXA',note:'A sua energia está baixa e você não consegue se teleportar agora. Descanse um pouco.',enabled:false};
    const phase=gate.phase==='convergence'?'CONVERGÊNCIA':gate.phase==='final'?'DESAFIO FINAL':'DISPONÍVEL';
    return {id:'due',label:phase,note:`Portal ${portal} · mapa ${n}`,enabled:true};
  }
  function portalSummary(p,portal){
    const states=Array.from({length:10},(_,i)=>portalTableState(p,portal,i+1));
    const c=ensurePortalCampaign(p),gate=activeCampaignGate(p),ready=states.filter(s=>s.enabled).length,passed=states.filter(s=>s.label==='CONCLUÍDO').length;
    const reached=c.opened.includes(portal),complete=portalComplete(c,portal),active=gate.phase!=='complete'&&gate.portal===portal;
    return {states,ready,waiting:reached&&!active&&!complete,passed,reached,status:active?'available':complete?'completed':reached?'waiting':'locked'};
  }
  function renderPortalHub(p,g,canvas,image){
    portalView='hub';canvas.classList.add('portal-hub');image.src='portals-map.png';image.alt='Seleção de portais dos Mundos da Tabuada';g.setAttribute('aria-label','Portais dos Mundos da Tabuada');g.innerHTML='';
    for(let portal=1;portal<=PORTAL_COUNT;portal++){
      const info=portalSummary(p,portal),[x,y]=PORTAL_POS[portal],b=document.createElement('button');
      b.type='button';b.className=`world-map-node ${info.status}`;b.style.left=`${x}%`;b.style.top=`${y}%`;
      b.setAttribute('aria-label',`Portal ${portal}: ${info.ready?info.ready+' atividades disponíveis':info.waiting?'revisões agendadas':'bloqueado'}`);
      const label=info.status==='completed'?'CONCLUÍDO':'';
      b.innerHTML=label?`<span class="world-map-state" aria-hidden="true">${label}</span>`:'';
      if(info.reached){b.onclick=()=>openPortal(portal)}else b.onclick=()=>toast('Encontre a chave deste portal para abri-lo.');
      g.appendChild(b);
    }
  }
  function renderPortalMap(p,g,canvas,image){
    canvas.classList.remove('portal-hub');image.src=PORTAL_MAPS[selectedPortal];image.alt=`Mapa do Portal ${selectedPortal}`;g.setAttribute('aria-label',`Tabuadas do Portal ${selectedPortal}`);g.innerHTML='';
    for(let n=1;n<=10;n++){
      const st=portalTableState(p,selectedPortal,n),pos=(PORTAL_TABLE_POS[selectedPortal]||PORTAL_TABLE_POS.default)[n],b=document.createElement('button');
      b.type='button';b.className=`world-map-node ${st.id}`;b.style.left=`${pos.x}%`;b.style.top=`${pos.y}%`;b.setAttribute('aria-label',`Tabuada ${n}: ${st.label}. ${st.note}`);
      b.innerHTML=st.id==='locked'?'':`<span class="world-map-state" aria-hidden="true">${st.id==='due'?'↻':st.id==='scheduled'?'✓':''}</span>`;
      if(st.enabled)b.onclick=()=>startGame(n,st.id==='due'?'review':'learn',selectedPortal);else b.onclick=()=>toast(st.note);
      g.appendChild(b);
    }
  }
  window.openPortal=function(portal){selectedPortal=Math.max(1,Math.min(PORTAL_COUNT,Number(portal)||1));portalView='map';renderWorlds()};
  window.worldBack=function(){if(portalView==='map'){portalView='hub';renderWorlds()}else showTab('home')};
  renderWorlds=function(){
    const p=active(),g=document.getElementById('worldGrid'),canvas=document.getElementById('worldMapCanvas'),image=document.getElementById('worldMapImage');if(!p||!g||!canvas||!image)return;
    const c=ensurePortalCampaign(p),energy=document.getElementById('worldToday');if(energy){const feathers='🪶'.repeat(c.energy)+'▫️'.repeat(PORTAL_ENERGY_MAX-c.energy);energy.innerHTML=`<b>Energia mágica ${feathers}</b><span>${c.energy}/${PORTAL_ENERGY_MAX}${c.energy<PORTAL_ENERGY_MAX?' · uma pena retorna a cada 2 horas':''}</span>`}
    if(portalView==='hub')renderPortalHub(p,g,canvas,image);else renderPortalMap(p,g,canvas,image);
  };
  openHomeWorlds=function(){portalView='hub';showTab('world')};

  const startGameBeforePortals=startGame;
  startGame=function(n,mode=null,portal=null){
    const p=active();if(!p)return;const chosen=Math.max(1,Math.min(PORTAL_COUNT,Number(portal)||activeCampaignGate(p).portal)),st=portalTableState(p,chosen,Number(n));
    if(!st.enabled)return toast(st.note);
    startGameBeforePortals(n,tableLearning(p,n).masteredAt?'review':'learn');
    if(!session)return;session.portal=chosen;session.portalEnergyCost=1;
    document.getElementById('gameWorldKicker').textContent=`PORTAL ${chosen} · TABUADA DO ${n}`;
  };
  const finishGameBeforePortals=finishGame;
  finishGame=function(){
    const p=active(),finished=session?{n:session.n,portal:Number(session.portal||1),wrong:Number(session.wrong||0)}:null;
    finishGameBeforePortals();
    if(!p||!finished)return;
    consumePortalEnergy(ensurePortalCampaign(p));
    const result=markPortalMapComplete(p,finished.portal,finished.n),next=activeCampaignGate(p);
    if(result.advanced&&next.phase==='keys')toast(`🗝️ Chave encontrada! Portal ${next.portal} liberado.`);
    else if(next.phase==='convergence')toast(`✨ Convergência: conclua o Portal ${next.portal}.`);
    else if(next.phase==='final')toast('🗝️ Todas as chaves reunidas! Portal 10 aberto.');
    else if(next.phase==='complete')toast('🏆 Todos os portais foram concluídos! Recompensa final liberada.');
    save();
  };
})();

/* v0.9.5.2 — o efeito equipado celebra acertos; o vilão assume todos os erros */
(function(){
  const effectStyle=document.createElement('style');
  effectStyle.textContent='.lottie-effect-stage{position:fixed;inset:0;z-index:260;display:grid;place-items:center;pointer-events:none;background:radial-gradient(circle,rgba(35,16,75,.12),transparent 64%)}.lottie-effect-host{width:min(92vw,560px);height:min(92vw,560px);filter:drop-shadow(0 14px 28px rgba(28,8,66,.3))}';
  document.head.appendChild(effectStyle);
  let activeLottieAnimation=null,activeLottieTimer=0;
  function clearLottieEffect(){clearTimeout(activeLottieTimer);if(activeLottieAnimation){try{activeLottieAnimation.destroy()}catch(e){}activeLottieAnimation=null}document.querySelector('.lottie-effect-stage')?.remove()}
  window.showLottieEffect=function(path,assetsPath=''){
    clearLottieEffect();
    if(!path||!window.lottie)return showPapaiMoodFX(true);
    const scene=document.createElement('div');scene.className='lottie-effect-stage';scene.setAttribute('aria-hidden','true');
    const host=document.createElement('div');host.className='lottie-effect-host';scene.appendChild(host);document.body.appendChild(scene);
    const embedded=window.TQ_LOTTIE_DATA?.[path];
    if(!embedded){clearLottieEffect();return showPapaiMoodFX(true)}
    activeLottieAnimation=lottie.loadAnimation({container:host,renderer:'svg',loop:false,autoplay:true,animationData:JSON.parse(JSON.stringify(embedded)),assetsPath});
    activeLottieAnimation.addEventListener('complete',clearLottieEffect);
    activeLottieAnimation.addEventListener('data_failed',()=>{clearLottieEffect();showPapaiMoodFX(true)});
    activeLottieTimer=setTimeout(clearLottieEffect,4200);
  };
  const previewBeforeLottie=vaultPlayPreview;
  vaultPlayPreview=function(id){const x=item(id);if(x?.cat==='effect'&&x.fx==='lottie'&&x.lottie)return showLottieEffect(x.lottie,x.lottieAssets||'');return previewBeforeLottie(id)};
  const VILLAIN_ERROR_FRAMES=[
    ['vilao_erro_lottie/images/villain_error_01.png',0],
    ['vilao_erro_lottie/images/villain_error_02.png',200],
    ['vilao_erro_lottie/images/villain_error_03.png',400],
    ['vilao_erro_lottie/images/villain_error_04.png',633],
    ['vilao_erro_lottie/images/villain_error_05.png',933],
    ['vilao_erro_lottie/images/villain_error_06.png',1200]
  ];
  VILLAIN_ERROR_FRAMES.forEach(([src])=>{const image=new Image();image.src=src});

  function clearVillainErrorAnimation(){
    document.querySelector('.villain-error-lottie')?.remove();
    document.getElementById('game')?.classList.remove('villain-error-impact');
  }

  window.showVillainErrorAnimation=function(){
    clearVillainErrorAnimation();
    const scene=document.createElement('div');
    scene.className='villain-error-lottie';
    scene.setAttribute('aria-hidden','true');
    const image=document.createElement('img');
    image.alt='';
    image.src=VILLAIN_ERROR_FRAMES[0][0];
    scene.appendChild(image);
    document.body.appendChild(scene);
    const game=document.getElementById('game');
    if(game){game.classList.add('villain-error-impact');setTimeout(()=>game.classList.remove('villain-error-impact'),520)}
    VILLAIN_ERROR_FRAMES.slice(1).forEach(([src,at])=>setTimeout(()=>{
      if(!scene.isConnected)return;
      image.classList.remove('frame-swap');
      image.src=src;
      void image.offsetWidth;
      image.classList.add('frame-swap');
    },at));
    setTimeout(clearVillainErrorAnimation,1500);
  };

  showWrongAnswerSignal=function(){
    const card=document.querySelector('.practice-card');
    if(card){card.classList.remove('wrong-shake');void card.offsetWidth;card.classList.add('wrong-shake');setTimeout(()=>card.classList.remove('wrong-shake'),500)}
  };

  playFX=function(good=true){
    clearLottieEffect();
    if(!good){clearActiveFX();showVillainErrorAnimation();return}
    const selected=item(active()?.equipped?.effect);
    if(selected?.fx==='lottie'&&selected.lottie)return showLottieEffect(selected.lottie,selected.lottieAssets||'');
    showPapaiMoodFX(true);
  };
})();

/* v0.9.7.0 — celebração, baú e carta da conclusão dos 100 mundos */
(function(){
  const css=document.createElement('style');
  css.textContent=`.final-journey{position:fixed;inset:0;z-index:420;display:none;place-items:center;overflow:hidden;background:radial-gradient(circle at 50% 42%,#7222b8 0,#2c0a61 42%,#09001d 100%);color:#fff}.final-journey.open{display:grid}.final-journey::before{content:'';position:absolute;inset:-30%;background:conic-gradient(from 0deg,transparent,#ffd44755,transparent,#ff63d955,transparent,#6adfff66,transparent);animation:finalAura 6s linear infinite}.final-journey-card{position:relative;z-index:2;width:min(94vw,520px);max-height:100dvh;overflow:auto;text-align:center;padding:12px 16px 22px}.final-journey-card h2{margin:0;color:#ffe57b;font-size:clamp(23px,6vw,38px);text-shadow:0 3px 0 #741d91,0 0 18px #ffb9ff}.final-journey-card p{margin:8px 0;font-weight:800;line-height:1.35}.final-chest-sprite{width:min(58vw,280px,24vh);aspect-ratio:362/724;margin:2px auto;background:url('final-chest-sequence.png') left center/600% 100% no-repeat;filter:drop-shadow(0 0 24px #ffd25c);transform:scale(.96)}.final-chest-sprite.opening{animation:finalChestOpen 3s steps(5,end) forwards,finalChestPulse .7s ease-in-out infinite alternate}.final-open-btn,.final-letter-close{border:2px solid #fff1a0;border-radius:18px;padding:14px 24px;background:linear-gradient(#ffd94f,#ec8b13);color:#441269;font-weight:1000;font-size:16px;box-shadow:0 8px 0 #8d3a18,0 0 24px #ffd55b}.final-open-btn:disabled{opacity:.7}.final-particle{position:absolute;z-index:3;left:50%;top:48%;font-size:clamp(20px,6vw,38px);pointer-events:none;animation:finalParticle 2.2s ease-out forwards}.final-letter-wrap{position:fixed;inset:0;z-index:440;display:none;background:rgba(16,2,38,.96);padding:12px;overflow:auto;text-align:center}.final-letter-wrap.open{display:block}.final-letter-wrap img{display:block;width:min(96vw,720px);height:auto;margin:0 auto 18px;border-radius:18px;box-shadow:0 0 34px #ffcb5b88}.final-letter-close{position:sticky;bottom:14px;z-index:2;margin:0 auto 24px}.final-reward-title{font-size:20px;color:#ffe37a;font-weight:1000;animation:finalRewardGlow .7s ease-in-out infinite alternate}@keyframes finalChestOpen{to{background-position:100% center}}@keyframes finalChestPulse{to{filter:drop-shadow(0 0 38px #fff) drop-shadow(0 0 54px #ff50d2);transform:scale(1.02)}}@keyframes finalAura{to{transform:rotate(360deg)}}@keyframes finalParticle{to{opacity:0;transform:translate(var(--x),var(--y)) rotate(var(--r)) scale(.4)}}@keyframes finalRewardGlow{to{text-shadow:0 0 18px #fff,0 0 30px #ffd43b;transform:scale(1.05)}}`;
  document.head.appendChild(css);
  let finalRunning=false;
  function ensureFinalDom(){
    if(document.getElementById('finalJourney'))return;
    const scene=document.createElement('div');scene.id='finalJourney';scene.className='final-journey';scene.innerHTML=`<div class="final-journey-card"><h2>🏆 OS 100 MUNDOS FORAM CONCLUÍDOS!</h2><p>As dez chaves se uniram. O tesouro que esperou por você durante toda a jornada finalmente despertou.</p><div id="finalChestSprite" class="final-chest-sprite" aria-label="Baú real da recompensa final"></div><div id="finalRewardTitle" class="final-reward-title">O BAÚ REAL DO PAPAI</div><button id="finalOpenBtn" class="final-open-btn" type="button">ABRIR RECOMPENSA FINAL</button></div>`;document.body.appendChild(scene);
    const letter=document.createElement('div');letter.id='finalLetter';letter.className='final-letter-wrap';letter.innerHTML=`<img src="final-letter-papai.png" alt="Carta do Papai: Minha filha, você conseguiu"><button class="final-letter-close" type="button">Guardar esta carta no coração</button>`;document.body.appendChild(letter);
    document.getElementById('finalOpenBtn').onclick=openFinalChest;letter.querySelector('button').onclick=closeFinalLetter;
  }
  function finalParticles(){const scene=document.getElementById('finalJourney'),icons=['🪙','💎','⭐','✨','💖','👑'];for(let i=0;i<54;i++){const s=document.createElement('span');s.className='final-particle';s.textContent=icons[i%icons.length];s.style.setProperty('--x',`${Math.round((Math.random()-.5)*110)}vw`);s.style.setProperty('--y',`${Math.round((Math.random()-.55)*105)}vh`);s.style.setProperty('--r',`${Math.round(Math.random()*720-360)}deg`);s.style.animationDelay=`${Math.random()*.7}s`;scene.appendChild(s);setTimeout(()=>s.remove(),3100)}}
  window.startFinalJourneyCelebration=function(){const p=active();if(!p||p.flags?.finalRewardClaimed||finalRunning)return;ensureFinalDom();finalRunning=true;document.getElementById('finalJourney').classList.add('open');document.getElementById('finalChestSprite').classList.remove('opening');const button=document.getElementById('finalOpenBtn');button.disabled=false;button.onclick=openFinalChest;button.textContent='ABRIR RECOMPENSA FINAL';delete button.dataset.opening};
  function revealFinalLetter(){ensureFinalDom();const letter=document.getElementById('finalLetter');if(letter)letter.classList.add('open')}
  function openFinalChest(){const p=active(),sprite=document.getElementById('finalChestSprite'),button=document.getElementById('finalOpenBtn');if(!p||!sprite||!button||button.dataset.opening==='1')return;button.dataset.opening='1';button.disabled=true;button.textContent='A MAGIA ESTÁ DESPERTANDO...';sprite.classList.remove('opening');void sprite.offsetWidth;sprite.classList.add('opening');finalParticles();try{if(typeof window.showLottieEffect==='function')window.showLottieEffect('effect-lottie-celestial_pulse.json')}catch(e){}const finish=()=>{p.flags=p.flags||{};if(!p.flags.finalRewardCoinsGranted){p.coins=Number(p.coins||0)+10000;p.flags.finalRewardCoinsGranted=true;save()}const title=document.getElementById('finalRewardTitle');if(title)title.textContent='✨ 10.000 MOEDAS + UMA CARTA DO PAPAI ✨';button.disabled=false;button.textContent='ABRIR A CARTA DO PAPAI';button.onclick=revealFinalLetter;delete button.dataset.opening;renderHome();setTimeout(revealFinalLetter,500)};setTimeout(finish,3000)}
  function closeFinalLetter(){const p=active();document.getElementById('finalLetter')?.classList.remove('open');document.getElementById('finalJourney')?.classList.remove('open');finalRunning=false;if(p){p.flags=p.flags||{};p.flags.finalRewardClaimed=true;delete p.flags.finalRewardPending;delete p.flags.finalCelebrationAfterPet;save();renderAll();toast('🏆 A carta e as 10.000 moedas agora pertencem a este perfil.')}}
  const finishCloseBeforeFinal=finishClose;
  finishClose=function(){const p=active(),ready=!!(p?.flags?.finalRewardPending&&!p.flags?.finalRewardClaimed),petPending=Number(p?.flags?.petRescuePending||0);finishCloseBeforeFinal();if(!ready)return;if(petPending){p.flags.finalCelebrationAfterPet=true;save()}else setTimeout(startFinalJourneyCelebration,500)};
  if(typeof finishPetRescue==='function'){const finishPetRescueBeforeFinal=finishPetRescue;finishPetRescue=function(){const p=active(),show=!!(p?.flags?.finalCelebrationAfterPet);finishPetRescueBeforeFinal();if(show)setTimeout(startFinalJourneyCelebration,650)}}
  const renderHomeBeforeFinal=renderHome;
  renderHome=function(){renderHomeBeforeFinal();const p=active();if(p?.flags?.finalRewardPending&&!p.flags?.finalRewardClaimed&&!p.flags?.petRescuePending&&!finalRunning)setTimeout(startFinalJourneyCelebration,700)};
})();

/* v0.9.7.1 — Pombo Correio animado e cartas dos portais */
(function(){
  const PAPA_PORTAL_LETTERS=[
    'Hoje você deu o primeiro passo. Não precisa saber tudo de uma vez; precisa apenas continuar tentando. O Portal 1 acredita em você — e eu também.',
    'Sua primeira chave respondeu à sua coragem. Quando um caminho se fecha, outro se abre para quem não desiste. Siga para o Portal 2.',
    'Você já provou que consegue aprender algo que antes parecia difícil. Leve essa certeza com você ao atravessar o Portal 3.',
    'A bússola mágica não aponta para quem é perfeito. Ela aponta para quem tenta novamente. O Portal 4 está esperando por você.',
    'Cada conta resolvida fortalece sua confiança. Talvez você não perceba, mas está ficando mais forte a cada mapa. Vá ao Portal 5.',
    'Metade da jornada ficou para trás. Pare um instante e veja o quanto você já avançou. Depois, atravesse o Portal 6 de cabeça erguida.',
    'Os desafios estão maiores porque você também cresceu. Use tudo o que aprendeu e deixe sua luz guiar o caminho pelo Portal 7.',
    'Até os grandes aventureiros erram. O segredo é não permitir que um erro decida onde a história termina. O Portal 8 chama por você.',
    'As chaves estão quase reunidas. Continue com calma, coragem e atenção. Há um último filhote esperando por você no Portal 9.',
    'Todas as chaves se uniram. Antes do desafio final, quero que saiba: chegar até aqui já é uma vitória enorme. Estarei esperando por você depois do Portal 10.'
  ];
  const PAPA_LETTER_GOLD={3:500,6:500,9:500};
const PAPA_LETTER_ART={1:'papa-letter-portal-01.png',2:'papa-letter-portal-02.png',3:'papa-letter-portal-03.png',4:'papa-letter-portal-04.png',5:'papa-letter-portal-05.png',6:'papa-letter-portal-06.png',7:'papa-letter-portal-07.png',8:'papa-letter-portal-08.png',9:'papa-letter-portal-09.png',10:'papa-letter-portal-10.png'};
  const letterArtStyle=document.createElement('style');letterArtStyle.textContent='.papa-letter-art{display:none;width:min(96vw,720px);height:auto;margin:0 auto 18px;border-radius:18px;box-shadow:0 14px 44px #08000d}.papa-letter-overlay.has-art .papa-letter-art{display:block}.papa-letter-overlay.has-art .papa-letter-paper{display:none}.papa-letter-overlay.has-art{padding-bottom:90px;text-align:center}.papa-letter-overlay.has-art .papa-letter-close{position:sticky;bottom:14px}';document.head.appendChild(letterArtStyle);
  const css=document.createElement('style');css.textContent=`.mail-pigeon-btn{position:absolute;z-index:12;right:-10px;top:5%;width:120px;height:120px;padding:0;background:transparent;border:0;filter:drop-shadow(0 7px 5px rgba(28,8,46,.35));animation:pigeonArrive 1.15s cubic-bezier(.18,.8,.24,1),pigeonHover 1.4s 1.15s ease-in-out infinite alternate}.mail-pigeon-btn img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.mail-pigeon-btn .pigeon-down{animation:pigeonPose 320ms steps(1,end) infinite}.mail-pigeon-btn .pigeon-up{animation:pigeonPose 320ms steps(1,end) infinite reverse}.mail-pigeon-badge{position:absolute;right:4px;top:4px;min-width:28px;height:28px;padding:0 6px;border-radius:999px;display:grid;place-items:center;background:#ef365d;color:#fff;border:2px solid #fff29a;font-size:12px;font-weight:1000;box-shadow:0 3px 0 #8b1737}.papa-letter-overlay{position:fixed;inset:0;z-index:470;display:none;overflow:auto;padding:18px 12px;background:radial-gradient(circle,#56208e,#17042f 72%)}.papa-letter-overlay.open{display:block}.papa-letter-paper{position:relative;width:min(94vw,650px);min-height:calc(100dvh - 36px);margin:0 auto;padding:76px 28px 30px;border:5px solid #d69b25;border-radius:24px;background:linear-gradient(rgba(255,247,211,.94),rgba(255,226,159,.97)),repeating-linear-gradient(0deg,transparent 0 34px,#d8ad6333 35px);box-shadow:0 0 0 5px #6d258e,0 16px 45px #08000d;color:#502710}.papa-letter-paper:before{content:'💖';position:absolute;left:50%;top:12px;transform:translateX(-50%);font-size:50px;filter:drop-shadow(0 4px 0 #9d551f)}.papa-letter-kicker{text-align:center;color:#8c3ab4;font-size:13px;font-weight:1000;letter-spacing:2px}.papa-letter-paper h2{text-align:center;margin:7px 0 26px;color:#d62467;font-size:clamp(30px,8vw,48px)}.papa-letter-paper p{font-size:clamp(18px,5vw,26px);line-height:1.55;font-weight:750}.papa-letter-sign{text-align:right!important;color:#d62467;font-size:30px!important;font-weight:1000!important}.papa-letter-close{display:block;margin:28px auto 0;padding:13px 22px;border-radius:18px;border:2px solid #fff0a0;background:linear-gradient(#ffd94e,#e99218);color:#4d1a67;font-weight:1000;box-shadow:0 5px 0 #9a551d}@media(max-width:390px){.mail-pigeon-btn{width:94px;height:94px;right:-6px;top:12%}.papa-letter-paper{padding-left:20px;padding-right:20px}}@keyframes pigeonArrive{from{opacity:0;transform:translate(120vw,-45vh) rotate(18deg) scale(.45)}70%{opacity:1;transform:translate(-10px,5px) rotate(-5deg) scale(1.08)}to{transform:none}}@keyframes pigeonHover{to{transform:translateY(-9px) rotate(2deg)}}@keyframes pigeonPose{0%,49%{opacity:1}50%,100%{opacity:0}}`;document.head.appendChild(css);
  const pigeonFit=document.createElement('style');pigeonFit.textContent='.home-play-row>.mail-pigeon-btn{left:20%!important;right:auto!important;top:3%!important;width:106px!important;height:106px!important;max-width:30vw!important;z-index:60!important}.home-play-row>.mail-pigeon-btn img{inset:3%!important;width:94%!important;height:94%!important}@media(max-width:390px),(max-height:760px){.home-play-row>.mail-pigeon-btn{left:19%!important;top:2%!important;width:88px!important;height:88px!important;max-width:27vw!important}}';document.head.appendChild(pigeonFit);
  const pigeonVisible=document.createElement('style');pigeonVisible.textContent='.mail-pigeon-btn .pigeon-static{opacity:1!important;animation:none!important}.pigeon-call{position:absolute;left:50%;bottom:-4px;transform:translateX(-50%);padding:3px 8px;border:2px solid #fff09b;border-radius:999px;background:#7130b7;color:#fff;font-size:9px;font-weight:1000;box-shadow:0 2px 0 #371069;z-index:4}';document.head.appendChild(pigeonVisible);
  function ensurePigeonDom(){let overlay=document.getElementById('papaLetterOverlay');if(!overlay){overlay=document.createElement('div');overlay.id='papaLetterOverlay';overlay.className='papa-letter-overlay';overlay.innerHTML=`<img id="papaLetterArt" class="papa-letter-art" alt="Carta do Papai"><article class="papa-letter-paper"><div id="papaLetterKicker" class="papa-letter-kicker"></div><h2 id="papaLetterTitle">Minha filha,</h2><p id="papaLetterText"></p><p class="papa-letter-sign">Com todo meu amor,<br>Papai 💖</p></article><button class="papa-letter-close" type="button">Guardar a carta</button>`;document.body.appendChild(overlay);overlay.querySelector('button').onclick=closePapaLetter}}
  function renderMailPigeon(){const p=active(),stage=document.querySelector('.home-play-row');document.querySelectorAll('.mail-pigeon-btn').forEach(x=>x.remove());if(!p||!stage)return;const c=p.portalCampaign||{},isPapa=!!p.flags?.papaTester;let unread=Array.isArray(c.unreadLetters)?c.unreadLetters:[];if(isPapa&&!unread.length){c.unreadLetters=[3];unread=c.unreadLetters}if(!unread.length)return;const b=document.createElement('button');b.type='button';b.className='mail-pigeon-btn';b.setAttribute('aria-label',`${unread.length} carta${unread.length===1?'':'s'} do Papai para ler`);b.innerHTML=`<img class="pigeon-static" src="mail-pigeon-up.png" alt="Pombo Correio"><img class="pigeon-up" src="mail-pigeon-up.png" alt=""><img class="pigeon-down" src="mail-pigeon-down.png" alt=""><span class="mail-pigeon-badge">${unread.length}</span><span class="pigeon-call">CARTA</span>`;b.onclick=()=>window.openPapaLetter();stage.appendChild(b)}
  window.renderMailPigeon=renderMailPigeon;
  window.openPapaLetter=function(){const p=active(),portal=Number(p?.portalCampaign?.unreadLetters?.[0]||0);if(!p||!portal)return;ensurePigeonDom();const reward=Number(PAPA_LETTER_GOLD[portal]||0),claimed=p.portalCampaign.letterGoldClaimed=p.portalCampaign.letterGoldClaimed||[];let rewardText='';if(reward&&!claimed.includes(portal)){p.coins=Number(p.coins||0)+reward;claimed.push(portal);save();renderAll();rewardText=`\n\n🎁 Junto desta carta, enviei ${reward} ouros para ajudar na sua aventura.`}const overlay=document.getElementById('papaLetterOverlay'),art=PAPA_LETTER_ART[portal],artEl=document.getElementById('papaLetterArt');overlay.dataset.portal=String(portal);overlay.classList.toggle('has-art',!!art);if(art){artEl.src=art;artEl.alt=`Carta do Papai entregue no Portal ${portal}`}document.getElementById('papaLetterKicker').textContent=`CARTA ENTREGUE AO ABRIR O PORTAL ${portal}${reward?' · PRESENTE ESPECIAL':''}`;document.getElementById('papaLetterTitle').textContent=`Minha filha, ${p.name}`;document.getElementById('papaLetterText').textContent=(PAPA_PORTAL_LETTERS[portal-1]||PAPA_PORTAL_LETTERS[0])+rewardText;overlay.classList.add('open');if(rewardText)setTimeout(()=>toast(`🪙 Presente do Papai: +${reward} ouros!`),350)};
  window.closePapaLetter=function(){const p=active(),overlay=document.getElementById('papaLetterOverlay'),portal=Number(overlay?.dataset?.portal||0);overlay?.classList.remove('open');if(p&&portal){const c=p.portalCampaign;c.unreadLetters=(c.unreadLetters||[]).filter(x=>Number(x)!==portal);c.readLetters=Array.isArray(c.readLetters)?c.readLetters:[];if(!c.readLetters.includes(portal))c.readLetters.push(portal);save();renderHome()}};
  const renderHomeBeforePigeon=renderHome;renderHome=function(){renderHomeBeforePigeon();ensurePigeonDom();renderMailPigeon()};
})();

/* v0.9.5.0 — simplificação final do perfil da HOME */
(function(){
  const renderHomeWithCompactProfile=renderHome;
  renderHome=function(){
    renderHomeWithCompactProfile();
    document.querySelector('#homeProfileBar .home-css-xp-head')?.remove();
  };
})();

/* Perfil técnico protegido do Papai */
(function(){
  const PAPA_TEST_PASSWORD='254685';
  function isPapaProfile(p){return !!p?.flags?.papaTester}
  const avatarAssetBeforePapa=avatarAsset;
  avatarAsset=function(p){return isPapaProfile(p)?'avatar-papai-exclusive.png':avatarAssetBeforePapa(p)};
  function configurePapaProfile(p){
    p.name='Papai';p.coins=Math.max(1000000,Number(p.coins||0));p.xp=Math.max(1000,Number(p.xp||0));p.flags=p.flags||{};
    Object.assign(p.flags,{papaTester:true,portalCampaignMigrated:true,pets30Migrated:true,v096Review2Hours:true,mastery12Claimed:true,mastery34Claimed:true,mastery56Claimed:true,mastery78Claimed:true,mastery910Claimed:true,finalPortalComplete:false,finalRewardPending:false,finalRewardClaimed:false,finalRewardCoinsGranted:false});
    delete p.flags.petRescuePending;delete p.flags.finalCelebrationAfterPet;
    const completed={};for(let portal=1;portal<=9;portal++){completed[String(portal)]={};for(let n=1;n<=10;n++)completed[String(portal)][String(n)]=true}completed['10']={};for(let n=1;n<=9;n++)completed['10'][String(n)]=true;
    p.portalCampaign={step:15,completed,opened:[1,2,3,4,5,6,7,8,9,10],keys:[2,3,4,5,6,7,8,9,10],energy:3,energyAt:Date.now(),letters:[1,2,3,4,5,6,7,8,9,10],unreadLetters:[3],readLetters:[1,2,4,5,6,7,8,9,10],letterGoldClaimed:[6,9],lastLetterPortal:3};
    p.learning=p.learning||{tables:{}};p.learning.tables=p.learning.tables||{};p.stats=p.stats||{};p.stats.masteredDecks=p.stats.masteredDecks||{};
    for(let n=1;n<=10;n++){p.learning.tables[String(n)]={masteredAt:Date.now()-86400000,reviewStage:0,nextReviewAt:Date.now(),lastReviewAt:null,reviewCount:0,lapses:0};p.stats.masteredDecks[String(n)]={at:Date.now()-86400000,correct:10,wrong:0}}
    p.pets={};for(let id=1;id<=30;id++)p.pets[String(id)]={rescued:true,rescuedAt:Date.now()-86400000,portal:Math.ceil(id/3)};
    p.flags.petRescueSeen={};for(let id=1;id<=30;id++)p.flags.petRescueSeen[String(id)]=true;
    return p;
  }
  window.openPapaTestProfile=function(){
    const password=window.prompt('Digite a senha do perfil Papai:');if(password===null)return;if(password!==PAPA_TEST_PASSWORD)return toast('Senha incorreta.');
    let p=state.profiles.find(isPapaProfile);if(!p){p=profileDefaults('Papai');p.flags=p.flags||{};p.flags.papaTester=true;state.profiles.push(p)}configurePapaProfile(p);state.activeId=p.id;save();showTab('home');renderAll();setTimeout(()=>{renderHome();window.renderMailPigeon?.()},120);toast('🧪 Perfil Papai ativado: uma carta está esperando no Pombo e falta somente o mapa 10.');
  };
  const renderProfilesBeforePapa=renderProfiles;
  const renderStoreBeforePapa=renderStore;
  const canClaimDailyBeforePapa=canClaimDaily;
  canClaimDaily=function(p){return isPapaProfile(p)?!!p&&!p.daily?.completed:canClaimDailyBeforePapa(p)};
  renderStore=function(){const p=active();if(!isPapaProfile(p))return renderStoreBeforePapa();const hidden=CATALOG.filter(x=>x.shop===false).map(x=>[x,x.shop]);for(const [x] of hidden)x.shop=true;try{return renderStoreBeforePapa()}finally{for(const [x,value] of hidden)x.shop=value}};
  renderProfiles=function(){
    const all=state.profiles,papa=all.find(isPapaProfile);state.profiles=all.filter(p=>!isPapaProfile(p));try{renderProfilesBeforePapa()}finally{state.profiles=all}
    const box=document.getElementById('profileList');if(!box)return;const access=document.createElement('button');access.type='button';access.className='primary';access.style.cssText='width:100%;margin-top:12px';access.textContent=papa&&papa.id===state.activeId?'🔒 Perfil Papai ativo':'🔒 Acesso do Papai';access.onclick=openPapaTestProfile;box.appendChild(access);
  };
})();

document.getElementById('entryStart').addEventListener('click',startEntry);showEntry();try{ensureFamilyProfiles();renderEntry();}catch(e){console.error('Boot inicial protegido:',e)}
