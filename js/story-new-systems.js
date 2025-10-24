/* ==================== STORY - NOVAS CENAS COM NOVOS SISTEMAS ==================== */
/* Exemplos de cenas que usam exploração, inventário e achievements */
/* VERSÃO EXPANDIDA: 25+ CENAS DE EXEMPLO */

// Adicionar novas cenas ao STORY object
const STORY_NEW_SYSTEMS = {
    
    /* ==================== EXPLORAÇÃO: INVESTIGAÇÕES ==================== */
    
    // Cena 1: Investigar Quarto de Luna
    cap1_investigation_room: [
        {
            name: 'Narrador',
            text: 'Você está no quarto de Luna. Há coisas estranhas por todos os lados... Investigue cada detalhe.',
            hidePortrait: true,
            background: 'quarto',
            minigame: {
                type: 'exploration',
                data: {
                    name: 'Quarto de Luna',
                    items: [
                        { x: 20, y: 30, size: 40, item: '📔 Diário Pessoal', callback: () => InventorySystem.addItem('luna_diary', { name: 'Diário de Luna', description: 'Diário pessoal com segredos perturbadores', icon: '📔', rarity: 'raro', usable: false }) },
                        { x: 70, y: 25, size: 40, item: '💍 Anel Estranho', callback: () => InventorySystem.addItem('mysterious_ring', { name: 'Anel Misterioso', description: 'Um anel que brilha no escuro. Quente ao toque.', icon: '💍', rarity: 'épico', usable: true }) },
                        { x: 45, y: 65, size: 40, item: '🖼️ Foto Antiga', callback: () => InventorySystem.addItem('old_photo', { name: 'Foto Antiga', description: 'Você em uma foto... mas Luna tirou hoje? Impossível.', icon: '🖼️', rarity: 'épico', usable: false }) },
                        { x: 30, y: 50, size: 35, item: '🔑 Chave Dourada', callback: () => InventorySystem.addItem('golden_key', { name: 'Chave Dourada', description: 'Abre algo importante. Mas o quê?', icon: '🔑', rarity: 'lendário', usable: false }) },
                        { x: 80, y: 60, size: 30, item: '💄 Batom Vermelho', callback: () => InventorySystem.addItem('red_lipstick', { name: 'Batom Vermelho', description: 'Marca de beijo em todos os seus itens pessoais', icon: '💄', rarity: 'incomum', usable: false }) }
                    ]
                },
                onComplete: () => {
                    AchievementSystem.unlock('detective');
                    game.loadScene('cap1_investigation_end');
                }
            }
        }
    ],

    cap1_investigation_end: [
        {
            name: 'Narrador',
            text: 'Você descobriu os segredos de Luna. Mas ela sabe que você esteve aqui... e parece estar esperando por você.',
            hidePortrait: true,
            sanity: -5
        },
        {
            name: 'Luna',
            text: 'Você encontrou as coisas que separei para você... ♥ Ninguém mais pode ter você.',
            portrait: 'possessivo',
            character: 'luna',
            sanity: -8,
            relationship: { luna: 5 }
        },
        {
            next: 'cap1_choice_after_discovery'
        }
    ],

    // Cena 2: Investigar Sala de Aula
    cap1_investigation_classroom: [
        {
            name: 'Narrador',
            text: 'A sala de aula está vazia. Mas há pistas sobre Luna espalhadas pelo ambiente...',
            hidePortrait: true,
            background: 'classroom',
            minigame: {
                type: 'exploration',
                data: {
                    name: 'Sala de Aula',
                    items: [
                        { x: 25, y: 40, size: 35, item: '📝 Cartas de Luna', callback: () => InventorySystem.addItem('love_letters', { name: 'Cartas de Luna', description: 'Dezenas de cartas de amor nunca enviadas', icon: '📝', rarity: 'raro', usable: false }) },
                        { x: 65, y: 35, size: 40, item: '🔍 Binoculares', callback: () => InventorySystem.addItem('binoculars', { name: 'Binoculares', description: 'Luna os usava para observá-lo da janela', icon: '🔍', rarity: 'incomum', usable: true }) },
                        { x: 50, y: 70, size: 30, item: '📸 Fotos Secretas', callback: () => InventorySystem.addItem('secret_photos', { name: 'Fotos Secretas', description: '47 fotos suas tiradas sem consentimento', icon: '📸', rarity: 'épico', usable: false }) }
                    ]
                },
                onComplete: () => {
                    game.modifyRelationship('luna', 10);
                    game.loadScene('cap1_classroom_reaction');
                }
            }
        }
    ],

    cap1_classroom_reaction: [
        {
            name: 'Luna',
            text: 'Você achou... minhas coisas. Tudo que coleciono de você é tão precioso.',
            portrait: 'obsessivo',
            character: 'luna',
            sanity: -12
        },
        {
            next: 'cap1_fim_aula'
        }
    ],

    /* ==================== INVENTÁRIO: USAR ITENS ==================== */
    
    // Usar Anel Misterioso
    cap1_use_mysterious_ring: [
        {
            name: 'Narrador',
            text: 'Você coloca o anel estranho em seu dedo. Começa a brilhar...',
            hidePortrait: true,
            minigame: {
                type: 'sequence',
                sequence: ['🔴', '🔴', '🔵', '🔴', '🔵', '🔵'],
                onComplete: () => {
                    game.state.flags.ringUsed = true;
                    game.loadScene('cap1_ring_effect');
                }
            }
        }
    ],

    cap1_ring_effect: [
        {
            name: 'Narrador',
            text: 'O anel esquenta na sua mão. Você começa a ouvir vozes... As vozes de Luna? Não. São várias Lunas.',
            hidePortrait: true,
            sanity: -15
        },
        {
            name: 'Luna',
            text: 'Agora você pode me ouvir... sempre, em qualquer lugar... em todos os lugares. Você é meu agora. ♥',
            portrait: 'feliz',
            character: 'luna',
            background: 'distorted'
        },
        {
            next: 'cap1_fim_aula'
        }
    ],

    // Usar Diário de Luna
    cap1_read_luna_diary: [
        {
            name: 'Narrador',
            text: 'Você abre o diário de Luna com as mãos tremendo...',
            hidePortrait: true,
            sanity: -8
        },
        {
            name: 'Narrador',
            text: 'Página 1: "Hoje conheci ele. Meu propósito está cumprido. Vou tê-lo. Por qualquer meio necessário."\nPágina 50: "Ele sorriu para mim hoje. Vou guardar esse dia para sempre."\nÚltima página: "Em breve, seremos um. Nada nos separará. Ninguém nos separará."',
            hidePortrait: true,
            sanity: -20,
            effect: (state) => {
                AchievementSystem.unlock('first_steps');
            }
        },
        {
            next: 'cap1_fim_aula'
        }
    ],

    // Usar Chave Dourada
    cap1_use_golden_key: [
        {
            name: 'Narrador',
            text: 'Você encontra uma porta escondida. A chave encaixa perfeitamente...',
            hidePortrait: true,
            background: 'secret_room'
        },
        {
            name: 'Narrador',
            text: 'A porta se abre para revelar um quarto secreto. Dentro, há um altar dedicado completamente a você. Fotos, desenhos, itens roubados... e uma nota:',
            hidePortrait: true,
            sanity: -25
        },
        {
            name: 'Narrador',
            text: '"Você é minha vida. Você é minha morte. Você é tudo que importa. E em breve, você será inteiramente meu. Luna ♥"',
            hidePortrait: true,
            sanity: -15,
            effect: (state) => {
                AchievementSystem.unlock('detective');
                game.state.flags.foundSecretRoom = true;
            }
        },
        {
            next: 'cap1_secret_room_choice'
        }
    ],

    cap1_secret_room_choice: [
        {
            choice: true,
            options: [
                {
                    text: 'Sair discretamente e fingir que não viu nada',
                    next: 'cap1_fim_aula',
                    effect: (state) => {
                        state.flags.ignoredSecretRoom = true;
                    }
                },
                {
                    text: 'Confrontar Luna sobre isso',
                    next: 'cap1_confront_luna',
                    effect: (state) => {
                        state.flags.confrontedLuna = true;
                    }
                },
                {
                    text: 'Destruir tudo dentro do quarto',
                    next: 'cap1_destroy_altar',
                    effect: (state) => {
                        state.flags.destroyedAltar = true;
                        game.modifyRelationship('luna', -50);
                    }
                }
            ]
        }
    ],

    cap1_confront_luna: [
        {
            name: 'Luna',
            text: 'Você viu... Meu presente para você. Não é lindo? Tudo feito com amor.',
            portrait: 'obsessivo',
            character: 'luna',
            sanity: -10
        },
        {
            next: 'cap1_fim_aula'
        }
    ],

    cap1_destroy_altar: [
        {
            name: 'Narrador',
            text: 'Você começa a destruir tudo. Luna aparece na porta, seus olhos pretos de fúria.',
            hidePortrait: true,
            sanity: -30
        },
        {
            name: 'Luna',
            text: 'VOCÊ NÃO DEVERIA TER FEITO ISSO! VOCÊ PERTENCE A MIM! TUDO O QUE VOCÊ FAZ PERTENCE A MIM!',
            portrait: 'ira',
            character: 'luna',
            sanity: -20
        },
        {
            next: 'cap1_fim_aula'
        }
    ],

    /* ==================== PUZZLES & LÓGICA ==================== */
    
    // Desafio de Lógica
    cap1_puzzle_sequence: [
        {
            name: 'Luna',
            text: 'Você quer entender a mim? Responda às minhas perguntas corretamente, então.',
            hidePortrait: true,
            portrait: 'neutra',
            character: 'luna',
            minigame: {
                type: 'logicPuzzle',
                questions: [
                    {
                        question: 'Se Luna te ama 100%, e você a ama 0%, qual é o desequilíbrio?',
                        options: ['100%', '50% (média)', 'Infinito', 'Não existe equilíbrio'],
                        correct: 'Não existe equilíbrio'
                    },
                    {
                        question: 'Por quantos anos Luna mantém registros sobre você?',
                        options: ['Alguns meses', 'Um ano', 'Desde que nos conhecemos', 'Desde antes de nos conhecermos'],
                        correct: 'Desde antes de nos conhecermos'
                    },
                    {
                        question: 'Qual é a melhor forma de fugir de Luna?',
                        options: ['Mudança de país', 'Policia', 'Confessar seus sentimentos', 'Não existe fuga'],
                        correct: 'Não existe fuga'
                    }
                ],
                onComplete: (success) => {
                    if (success) {
                        AchievementSystem.unlock('choice_master');
                        game.state.flags.puzzleSuccess = true;
                        game.modifyRelationship('luna', 10);
                        game.loadScene('cap1_puzzle_success');
                    } else {
                        game.modifyRelationship('luna', -5);
                        game.loadScene('cap1_puzzle_fail');
                    }
                }
            }
        }
    ],

    cap1_puzzle_success: [
        {
            name: 'Luna',
            text: 'Perfeito... você me entende. Você é perfeito. Sempre soube que éramos feitos um para o outro. ♥',
            portrait: 'feliz',
            character: 'luna'
        },
        {
            next: 'cap1_fim_aula'
        }
    ],

    cap1_puzzle_fail: [
        {
            name: 'Luna',
            text: 'Você não entende. Você ainda não entende que nós somos feitos um para o outro. Deixa eu mostrar mais...',
            portrait: 'obsessivo',
            character: 'luna',
            sanity: -10
        },
        {
            next: 'cap1_fim_aula'
        }
    ],

    /* ==================== AÇÕES RÁPIDAS (QTE) ==================== */
    
    // Sequência de Fuga
    cap1_chase_sequence: [
        {
            name: 'Narrador',
            text: 'Luna te persegue! Você precisa se mover RÁPIDO! Pressione ESPAÇO repetidamente!',
            hidePortrait: true,
            background: 'rua_noturna',
            music: 'tense',
            sanity: -10,
            minigame: {
                type: 'qte',
                prompt: 'ESPAÇO RÁPIDO! 10x!',
                duration: 15000,
                onComplete: (success) => {
                    if (success) {
                        game.state.flags.escapedLuna = true;
                        game.loadScene('cap1_escaped');
                    } else {
                        game.loadScene('cap1_caught');
                    }
                }
            }
        }
    ],

    cap1_escaped: [
        {
            name: 'Narrador',
            text: 'Você conseguiu escapar! Seus pulmões queimam. Seu coração bate acelerado. Por quanto tempo você conseguirá fugir?',
            hidePortrait: true,
            sanity: -3,
            effect: (state) => {
                AchievementSystem.checkAchievements();
            }
        },
        {
            next: 'cap1_fim_aula'
        }
    ],

    cap1_caught: [
        {
            name: 'Narrador',
            text: 'Você não foi rápido o suficiente. Luna te alcança, sua respiração suave contra seu pescoço.',
            hidePortrait: true,
            sanity: -20
        },
        {
            name: 'Luna',
            text: 'Por que você tenta fugir? Nós somos a mesma pessoa. Um coração, um corpo, uma alma. ♥',
            portrait: 'obsessivo',
            character: 'luna',
            sanity: -5
        },
        {
            choice: true,
            options: [
                {
                    text: 'Abraçar Luna',
                    next: 'cap1_embrace',
                    effect: (state) => {
                        state.flags.embracedLuna = true;
                        game.modifyRelationship('luna', 15);
                    }
                },
                {
                    text: 'Empurrar Luna e correr',
                    next: 'cap1_fim_aula',
                    effect: (state) => {
                        state.flags.rejectedLuna = true;
                        game.modifyRelationship('luna', -20);
                    }
                },
                {
                    text: 'Ficar imóvel',
                    next: 'cap1_submission',
                    effect: (state) => {
                        state.flags.submittedToLuna = true;
                        game.modifyRelationship('luna', 25);
                        game.changeSanity(-15);
                    }
                }
            ]
        }
    ],

    cap1_embrace: [
        {
            name: 'Narrador',
            text: 'Você abraça Luna. Ela sorri, um sorriso que não toca seus olhos. Um sorriso que promete tudo e ameaça tudo.',
            hidePortrait: true,
            sanity: -8
        },
        {
            name: 'Luna',
            text: 'Sempre soube que você me amava... Agora você finalmente admite. ♥',
            portrait: 'feliz_perturbador',
            character: 'luna'
        },
        {
            next: 'cap1_fim_aula'
        }
    ],

    cap1_submission: [
        {
            name: 'Narrador',
            text: 'Você desiste. Completamente. Luna vence. Você vence. Ou você perde?',
            hidePortrait: true,
            sanity: -20,
            effect: (state) => {
                AchievementSystem.unlock('luna_lover');
            }
        },
        {
            next: 'cap1_fim_aula'
        }
    ],

    /* ==================== INVESTIGAÇÃO COM MINIGAME ==================== */
    
    // Investigar Evidências
    cap1_investigate_evidence: [
        {
            name: 'Narrador',
            text: 'Há uma cena do crime. Você precisa examinar cuidadosamente cada evidência.',
            hidePortrait: true,
            background: 'crime_scene',
            minigame: {
                type: 'investigation',
                items: ['📌 Nota Raspadinha', '🩸 Mancha de Sangue', '📷 Câmera Escondida', '💌 Letra de Luna'],
                callback: () => {
                    game.state.stats.minigamesCompleted++;
                    AchievementSystem.unlock('detective');
                    game.loadScene('cap1_investigation_conclusion');
                }
            }
        }
    ],

    cap1_investigation_conclusion: [
        {
            name: 'Narrador',
            text: 'Todas as evidências apontam para uma conclusão terrível: Luna planejou tudo. Desde o começo. Desde antes de vocês se conhecerem.',
            hidePortrait: true,
            sanity: -25
        },
        {
            next: 'cap1_fim_aula'
        }
    ],

    /* ==================== MINIGAMES RITMADOS ==================== */
    
    // Jogo de Ritmo
    cap1_rhythm_challenge: [
        {
            name: 'Luna',
            text: 'Ouça o ritmo do meu coração batendo por você. Acompanhe. Seja um comigo.',
            hidePortrait: true,
            portrait: 'obsessivo',
            character: 'luna',
            minigame: {
                type: 'rhythmGame',
                onComplete: (success) => {
                    if (success) {
                        AchievementSystem.unlock('minigame_master');
                        game.state.stats.correctAnswers++;
                    }
                    game.loadScene('cap1_rhythm_result');
                }
            }
        }
    ],

    cap1_rhythm_result: [
        {
            name: 'Luna',
            text: 'Perfeito... nosso ritmo é o mesmo. Sempre foi. ♥',
            hidePortrait: true,
            portrait: 'feliz',
            character: 'luna'
        },
        {
            next: 'cap1_fim_aula'
        }
    ],

    /* ==================== ACHIEVEMENTS ESPECIAIS ==================== */
    
    // Final Verdadeiro - Achievement Mastery
    cap1_true_ending_setup: [
        {
            name: 'Narrador',
            text: 'Você chegou ao final verdadeiro. Todas as suas escolhas, cada decisão, cada ação levou a este exato momento. Você e Luna. Para sempre.',
            hidePortrait: true,
            background: 'final_scene',
            music: 'ending_true',
            effect: (state) => {
                AchievementSystem.unlock('perfect_game');
                AchievementSystem.unlock('luna_lover');
                AchievementSystem.unlock('explorer');
                game.state.flags.trueEnding = true;
            }
        },
        {
            name: 'Luna',
            text: 'Obrigada... por finalmente me pertencer. ♥♥♥',
            hidePortrait: true,
            portrait: 'feliz_verdadeiro',
            character: 'luna'
        }
    ],

    // Final Alternativo - Sanity 0
    cap1_insanity_ending: [
        {
            name: 'Narrador',
            text: 'Você perdeu a razão. Completamente. Luna é tudo o que resta em sua mente. Você é seu, e ela é sua, e nada mais importa.',
            hidePortrait: true,
            background: 'distorted_reality',
            music: 'horror',
            effect: (state) => {
                AchievementSystem.unlock('sanity_tester');
                AchievementSystem.unlock('luna_lover');
                game.state.flags.insanityEnding = true;
            }
        }
    ],

    /* ==================== CENAS EXPLORAÇÃO EXPLORATÓRIA ==================== */
    
    // Explorar Parque Abandonado
    cap1_explore_abandoned_park: [
        {
            name: 'Narrador',
            text: 'O parque está abandonado. Mas há marcas... pegadas. Todas levam a um único lugar.',
            hidePortrait: true,
            background: 'abandoned_park',
            minigame: {
                type: 'exploration',
                data: {
                    name: 'Parque Abandonado',
                    items: [
                        { x: 35, y: 45, size: 40, item: '🎠 Cavalo de Carrossel Partido', callback: () => InventorySystem.addItem('broken_carousel', { name: 'Cavalo de Carrossel Partido', description: 'Onde vocês tiveram o primeiro encontro', icon: '🎠', rarity: 'incomum', usable: false }) },
                        { x: 70, y: 55, size: 35, item: '💐 Flores Murchas', callback: () => InventorySystem.addItem('wilted_flowers', { name: 'Flores Murchas', description: 'Flores que Luna colheu para você. Há 3 anos.', icon: '💐', rarity: 'raro', usable: false }) },
                        { x: 25, y: 70, size: 30, item: '🎀 Fita Vermelha', callback: () => InventorySystem.addItem('red_ribbon', { name: 'Fita Vermelha', description: 'Luna a usava em seu cabelo. Agora está presa em um galho.', icon: '🎀', rarity: 'comum', usable: false }) }
                    ]
                },
                onComplete: () => {
                    game.loadScene('cap1_park_memory');
                }
            }
        }
    ],

    cap1_park_memory: [
        {
            name: 'Narrador',
            text: 'De repente, você se lembra. Você estava aqui com Luna. Vocês sempre estavam aqui. Você sente a mão dela na sua.',
            hidePortrait: true,
            sanity: -12
        },
        {
            next: 'cap1_fim_aula'
        }
    ]
};

// Função para integrar novas cenas ao STORY existente
function addNewStoryScenes() {
    console.log('📖 Adicionando 25+ novas cenas ao STORY...');
    
    let added = 0;
    Object.keys(STORY_NEW_SYSTEMS).forEach(key => {
        if (!STORY[key]) {
            STORY[key] = STORY_NEW_SYSTEMS[key];
            added++;
        }
    });
    
    console.log(`✅ ${added} novas cenas adicionadas ao STORY!`);
}

// Chamar quando o jogo inicializa
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof STORY !== 'undefined') {
            addNewStoryScenes();
        }
    });
} else {
    if (typeof STORY !== 'undefined') {
        addNewStoryScenes();
    }
}

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { STORY_NEW_SYSTEMS, addNewStoryScenes };
}