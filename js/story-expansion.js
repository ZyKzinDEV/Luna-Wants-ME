/* ==================== LUNA WANTS ME - STORY EXPANSION ==================== */
/* Expansão massiva com 40+ novas cenas, 8 finais e múltiplos branchings */

// Adicionar TODAS as novas cenas ao STORY
const STORY_EXPANSION = {
    
    /* ==================== CAPÍTULO 2 EXPANDIDO: OBSESSÃO CRESCENTE ==================== */
    
    cap2_mensagens_obsessivas: [
        {
            name: 'Luna (Mensagem 1)',
            text: 'Oi {playerName}! 💕 Acordei pensando em você...',
            hidePortrait: true,
            background: 'rua',
            sanity: -2
        },
        {
            name: 'Luna (Mensagem 2)',
            text: 'Você dormiu bem? Me manda uma foto pra eu ver que você tá bonito hoje 🖤',
            hidePortrait: true,
            sanity: -3
        },
        {
            name: 'Luna (Mensagem 3)',
            text: '{playerName}... por que você não responde? 😔',
            hidePortrait: true,
            sanity: -4
        },
        {
            name: 'Luna (Mensagem 4)',
            text: 'Aonde você tá? Com quem você tá? POR QUE NÃO RESPONDE???',
            hidePortrait: true,
            sanity: -8
        },
        {
            choice: true,
            options: [
                { text: 'Responder que está ocupado', next: 'cap2_justificativa_fria' },
                { text: 'Ignorar completamente', next: 'cap2_perseguicao_aumenta' },
                { text: 'Tentar ser gentil', next: 'cap2_falsa_calma_luna' }
            ]
        }
    ],
    
    cap2_justificativa_fria: [
        {
            name: '{playerName}',
            text: 'Luna, estou ocupado. Preciso de espaço.',
            hidePortrait: true,
            sanity: 0
        },
        {
            name: 'Luna (Chamada)',
            text: 'OCUPADO?! {playerName}, você PREFERE estar ocupado do que comigo?!',
            portrait: 'inimigo',
            character: 'luna',
            sanity: -15
        },
        {
            name: 'Narrador',
            text: 'Você pode ouvir a respiração acelerada de Luna pelo telefone. Isso foi um erro.',
            hidePortrait: true,
            sanity: -10
        },
        {
            next: 'cap2_confronto_casa'
        }
    ],
    
    cap2_perseguicao_aumenta: [
        {
            name: 'Narrador',
            text: 'Você desliga o telefone. Alguns minutos depois, há batidas na sua porta. Muitas batidas.',
            hidePortrait: true,
            background: 'quarto',
            sanity: -25,
            music: 'suspense'
        },
        {
            name: 'Luna (Atrás da porta)',
            text: 'ABRA! {playerName}! ABRA AGORA! Eu PRECISO te ver! EU PRECISO!',
            hidePortrait: true,
            sanity: -20
        },
        {
            choice: true,
            options: [
                { text: 'Abrir a porta', next: 'cap2_luna_em_casa' },
                { text: 'Ligar para a polícia', next: 'cap2_policia_ameaca' },
                { text: 'Pular pela janela', next: 'cap2_fuga_urgente' }
            ]
        }
    ],
    
    cap2_falsa_calma_luna: [
        {
            name: '{playerName}',
            text: 'Luna, tudo bem. Desculpa! Estou aqui. Você tá bem?',
            hidePortrait: true,
            sanity: -5
        },
        {
            name: 'Luna (Voz Doce)',
            text: 'Ohhhh {playerName}... claro que estou bem agora que você respondeu. 💕',
            portrait: 'feliz',
            character: 'luna',
            sanity: -8
        },
        {
            name: 'Luna',
            text: 'Você quer me ver? Estou aqui perto... bem perto mesmo...',
            portrait: 'normal',
            sanity: -10
        },
        {
            name: 'Narrador',
            text: 'Você olha pela janela e vê uma figura familiar em pé na rua em frente à sua casa. Parada. Esperando.',
            hidePortrait: true,
            sanity: -20,
            music: 'suspense'
        },
        {
            next: 'cap2_luna_esperando'
        }
    ],
    
    cap2_luna_esperando: [
        {
            name: 'Narrador',
            text: '{playerName}, ela está aqui há horas. Apenas... esperando. Seus olhos fixos na sua janela.',
            hidePortrait: true,
            background: 'quarto',
            sanity: -30,
            music: 'horror'
        },
        {
            choice: true,
            options: [
                { text: 'Descer e falar com ela', next: 'cap2_confronto_rua' },
                { text: 'Chamar os pais/polícia', next: 'cap2_intervencao_externa' },
                { text: 'Tentar sair pela porta de trás', next: 'cap2_armadilha_porta_trás' }
            ]
        }
    ],
    
    /* ==================== CENÁRIOS DE PERSEGUIÇÃO ==================== */
    
    cap2_luna_em_casa: [
        {
            name: 'Narrador',
            text: 'Você abre a porta. Luna está ali, os olhos vermelhos, maquiagem manchada, suando. Seus lábios tremem.',
            portrait: 'inimigo',
            character: 'luna',
            background: 'quarto',
            sanity: -20,
            music: 'horror'
        },
        {
            name: 'Luna',
            text: 'POR QUE você não respondeu? COMO você ousa me ignorar?',
            portrait: 'hostil',
            sanity: -25
        },
        {
            name: 'Luna',
            text: 'Você sabe o que eu faria por você, {playerName}? TUDO! Mas você... você me trata como se eu fosse NINGUÉM!',
            sanity: -20
        },
        {
            minigame: {
                type: 'dialogueBattle',
                arguments: [
                    { argument: 'Você merecia ignorância?', correct: 'Ninguém merece ser ignorado, mas também ninguém merece ser perseguido.' },
                    { argument: 'Eu SOU amor puro!', correct: 'Amor não é controle, obsessão ou ameaça.' },
                    { argument: 'Você é MEU!', correct: 'Ninguém pertence a ninguém. Isso é desumanizador.' }
                ],
                onComplete: (success) => {
                    if (success) {
                        game.loadScene('cap2_luna_reflexao');
                    } else {
                        game.loadScene('cap2_luna_domina');
                    }
                }
            },
            skipDialogue: true
        }
    ],
    
    cap2_luna_reflexao: [
        {
            name: 'Luna',
            text: 'Eu... você tem razão. Eu estou sendo estranha. Obsessiva. Mas é porque... é porque eu não consigo imaginar a vida sem você.',
            portrait: 'triste',
            character: 'luna',
            sanity: 15
        },
        {
            name: '{playerName}',
            text: 'Luna, você precisa de ajuda profissional. Isso não é saudável para você nem para mim.',
            hidePortrait: true,
            sanity: 10
        },
        {
            name: 'Luna',
            text: 'Você tem razão. Eu... eu vou procurar ajuda.',
            portrait: 'desconfiado',
            sanity: 5
        },
        {
            next: 'final_esperanca'
        }
    ],
    
    cap2_luna_domina: [
        {
            name: 'Luna',
            text: 'Você vê? Você SABE que eu estou certa! Nós somos feitos um para o outro!',
            portrait: 'hostil',
            character: 'luna',
            sanity: -40
        },
        {
            name: 'Narrador',
            text: 'Luna pega sua mão com força. Muito força.',
            hidePortrait: true,
            sanity: -25
        },
        {
            next: 'cap2_captura'
        }
    ],
    
    cap2_policia_ameaca: [
        {
            name: '{playerName}',
            text: 'Luna, você está me perseguindo. Vou chamar a polícia se você não sair daqui.',
            hidePortrait: true,
            background: 'quarto',
            sanity: -5
        },
        {
            name: 'Luna (Atrás da porta)',
            text: 'A POLÍCIA?! Você teria CORAGEM de chamar a polícia em MIM?!',
            hidePortrait: true,
            sanity: -30
        },
        {
            name: 'Luna',
            text: 'Tudo bem. Chama a polícia. Mas quem você acha que eles vão acreditar? Na menina fofa e adorável ou no cara que me abandonou?',
            hidePortrait: true,
            sanity: -20
        },
        {
            name: 'Narrador',
            text: 'Você gela. Luna tem um ponto. O que você fez para parecer como o vilão aqui?',
            hidePortrait: true,
            sanity: -15,
            music: 'suspense'
        },
        {
            choice: true,
            options: [
                { text: 'Chamar mesmo assim', next: 'cap2_policia_real' },
                { text: 'Tentar negociar', next: 'cap2_negociacao_falhada' },
                { text: 'Escapar pela janela', next: 'cap2_fuga_janela' }
            ]
        }
    ],
    
    cap2_policia_real: [
        {
            name: 'Operadora',
            text: 'Emergência! Qual é o seu problema?',
            hidePortrait: true,
            background: 'quarto',
            sanity: 0
        },
        {
            name: '{playerName}',
            text: 'Há uma garota aqui me perseguindo! Ela não sai de perto de mim! Estou com medo!',
            hidePortrait: true,
            sanity: 5
        },
        {
            name: 'Narrador',
            text: 'Luna para de bater. Você ouve o barulho de seus passos descendo. Ela sabia que você falaria sério.',
            hidePortrait: true,
            sanity: 20,
            music: 'normal'
        },
        {
            next: 'cap2_policia_chega'
        }
    ],
    
    cap2_policia_chega: [
        {
            name: 'Policial',
            text: 'Nós temos um relatório de perseguição. Há uma Luna <last_name> aqui?',
            hidePortrait: true,
            background: 'rua',
            sanity: 25,
            music: 'normal'
        },
        {
            name: 'Narrador',
            text: 'Luna é levada para a delegacia. Ela grita seu nome. Promete voltar. Jura que você vai pagar.',
            hidePortrait: true,
            sanity: 30
        },
        {
            next: 'final_liberdade_fria'
        }
    ],
    
    cap2_negociacao_falhada: [
        {
            name: '{playerName}',
            text: 'Tudo bem Luna. Vamos conversar. Você quer entrar?',
            hidePortrait: true,
            background: 'quarto',
            sanity: -5
        },
        {
            name: 'Narrador',
            text: 'Você abre a porta. Grande erro.',
            hidePortrait: true,
            sanity: -20,
            music: 'horror'
        },
        {
            name: 'Luna',
            text: 'Finalmente! Você me deixa entrar!',
            portrait: 'normal',
            character: 'luna',
            sanity: -30
        },
        {
            name: 'Narrador',
            text: 'Luna entra e transtranca a porta atrás dela. Você ouve o barulho das chaves. Suas chaves. Das SUAS costas.',
            hidePortrait: true,
            sanity: -40
        },
        {
            next: 'cap2_captura_completa'
        }
    ],
    
    cap2_fuga_janela: [
        {
            name: 'Narrador',
            text: 'Você abre a janela. Não é alto demais. Você pode pular.',
            hidePortrait: true,
            background: 'quarto',
            sanity: -10,
            music: 'suspense'
        },
        {
            minigame: {
                type: 'memoryGame',
                difficulty: 'hard',
                onComplete: (success) => {
                    if (success) {
                        game.loadScene('cap2_fuga_sucesso_janela');
                    } else {
                        game.loadScene('cap2_luna_alcanca');
                    }
                }
            },
            skipDialogue: true
        }
    ],
    
    cap2_fuga_sucesso_janela: [
        {
            name: 'Narrador',
            text: 'Sua mente está clara! Você consegue fugir na confusão! Luna grita lá para cima, mas você já está longe.',
            hidePortrait: true,
            background: 'rua',
            sanity: 20,
            music: 'normal'
        },
        {
            next: 'cap2_vida_apos_fuga'
        }
    ],
    
    cap2_luna_alcanca: [
        {
            name: 'Narrador',
            text: 'Você pula, mas sua mente nublada faz você perder o equilíbrio no ar. Luna o pega.',
            hidePortrait: true,
            sanity: -50,
            music: 'horror'
        },
        {
            next: 'cap2_captura'
        }
    ],
    
    cap2_confronto_rua: [
        {
            name: '{playerName}',
            text: 'Luna, você precisa parar com isso. Agora.',
            hidePortrait: true,
            background: 'rua',
            sanity: -10
        },
        {
            name: 'Luna',
            text: 'Parar? {playerName}, isso é apenas o começo. Eu esperei TANTO tempo por você...',
            portrait: 'hostil',
            character: 'luna',
            sanity: -30
        },
        {
            minigame: {
                type: 'rhythmGame',
                onComplete: (success) => {
                    if (success) {
                        game.loadScene('cap2_escape_rhythm_sucesso');
                    } else {
                        game.loadScene('cap2_captura_rua');
                    }
                }
            },
            skipDialogue: true
        }
    ],
    
    cap2_intervencao_externa: [
        {
            name: 'Voz (Pela janela)',
            text: 'Oiii! Tudo bem aí? Seu pai me ligou! Ele está vindo pra cá!',
            hidePortrait: true,
            background: 'quarto',
            sanity: 40,
            music: 'normal'
        },
        {
            name: 'Narrador',
            text: 'É seu amigo! Luna vira para ir embora, mas os pais chegam minutos depois.',
            hidePortrait: true,
            sanity: 50
        },
        {
            next: 'final_protegido'
        }
    ],
    
    cap2_armadilha_porta_trás: [
        {
            name: 'Narrador',
            text: 'Você tenta a porta de trás. Já está trancada. E há uma figura esperando lá também.',
            hidePortrait: true,
            background: 'quarto',
            sanity: -40,
            music: 'horror'
        },
        {
            name: 'Luna (Atrás da casa)',
            text: 'Você realmente achou que eu não seria inteligente o suficiente para me preparar?',
            portrait: 'hostil',
            character: 'luna',
            sanity: -50
        },
        {
            next: 'cap2_captura'
        }
    ],
    
    /* ==================== CENÁRIOS CAPTURA ==================== */
    
    cap2_captura: [
        {
            name: 'Narrador',
            text: 'Tudo fica escuro. Os últimos sons que você ouve são os sussurros de Luna: "Agora você é só meu... para sempre..."',
            hidePortrait: true,
            background: 'preto',
            sanity: 0,
            music: 'horror'
        },
        {
            next: 'final_ruim_captura'
        }
    ],
    
    cap2_captura_completa: [
        {
            name: 'Luna',
            text: 'Você finalmente entende? Você vai passar o resto da vida comigo. E você vai ser FELIZ. Eu vou me certificar disso.',
            portrait: 'hostil',
            character: 'luna',
            background: 'casa_luna',
            sanity: -100,
            music: 'horror'
        },
        {
            next: 'final_ruim_prisioneiro'
        }
    ],
    
    cap2_vida_apos_fuga: [
        {
            name: 'Narrador',
            text: 'Você conseguiu escapar. Luna desapareceu por um tempo. Mas você nunca esquece aquele olhar. Aquele olhar que dizia: "Eu vou encontrar você de novo".',
            hidePortrait: true,
            background: 'rua',
            sanity: 50,
            music: 'suspense'
        },
        {
            next: 'final_liberdade_paranoia'
        }
    ],
    
    cap2_escape_rhythm_sucesso: [
        {
            name: 'Narrador',
            text: 'Você usa a confusão de Luna para correr! Você corre sem olhar para trás!',
            hidePortrait: true,
            background: 'rua',
            sanity: 30,
            music: 'ação'
        },
        {
            next: 'cap2_vida_apos_fuga'
        }
    ],
    
    cap2_captura_rua: [
        {
            name: 'Luna',
            text: 'Você não consegue escapar de mim, {playerName}. Você NUNCA vai conseguir.',
            portrait: 'hostil',
            character: 'luna',
            sanity: -40
        },
        {
            next: 'cap2_captura'
        }
    ],
    
    cap2_confronto_casa: [
        {
            name: 'Narrador',
            text: 'Luna aparece na sua casa aquela noite. Você sente mais medo do que nunca sentiu.',
            hidePortrait: true,
            background: 'quarto',
            sanity: -50,
            music: 'horror'
        },
        {
            choice: true,
            options: [
                { text: 'Confrontá-la diretamente', next: 'cap2_confronto_direto' },
                { text: 'Usar algum objeto para se defender', next: 'cap2_autodefesa' },
                { text: 'Tentar negociar', next: 'cap2_negociacao_desesperada' }
            ]
        }
    ],
    
    cap2_confronto_direto: [
        {
            name: '{playerName}',
            text: 'Chega! Luna, você precisa reconhecer o que está fazendo! Isso é doença! Você não está bem!',
            hidePortrait: true,
            background: 'quarto',
            sanity: 0
        },
        {
            name: 'Luna',
            text: 'NÃO estou doente! Estou APAIXONADA! Existe diferença!',
            portrait: 'inimigo',
            character: 'luna',
            sanity: -30
        },
        {
            minigame: {
                type: 'phoneHacking',
                correctCode: '0000', // Novo
                hint: 'Data do seu nascimento (MMDD)',
                onComplete: (success) => {
                    if (success) {
                        game.loadScene('cap2_telefonazo_policia');
                    } else {
                        game.loadScene('cap2_luna_furioso');
                    }
                }
            },
            skipDialogue: true
        }
    ],
    
    cap2_telefonazo_policia: [
        {
            name: 'Narrador',
            text: 'Você consegue chamar a polícia antes que Luna o impeça!',
            hidePortrait: true,
            background: 'quarto',
            sanity: 40,
            music: 'normal'
        },
        {
            next: 'cap2_policia_chega'
        }
    ],
    
    cap2_luna_furioso: [
        {
            name: 'Luna',
            text: 'Você ia ME DENUNCIAR?! Depois de tudo que eu fiz por você?!',
            portrait: 'hostil',
            character: 'luna',
            sanity: -60,
            music: 'horror'
        },
        {
            next: 'cap2_captura'
        }
    ],
    
    cap2_autodefesa: [
        {
            name: 'Narrador',
            text: 'Você pega qualquer coisa - um lampião, uma cadeira - e coloca na frente de você.',
            hidePortrait: true,
            background: 'quarto',
            sanity: -20
        },
        {
            name: 'Luna',
            text: 'Você... você ia me MACHUCAR?! Depois de tudo?',
            portrait: 'triste',
            character: 'luna',
            sanity: -50
        },
        {
            name: 'Luna',
            text: 'Tudo bem. Você não quer isso do jeito fácil? Tudo bem. Vamos fazer do jeito difícil.',
            portrait: 'hostil',
            sanity: -30
        },
        {
            next: 'cap2_captura'
        }
    ],
    
    cap2_negociacao_desesperada: [
        {
            name: '{playerName}',
            text: 'Luna... porfavor. Vamos conversar. Calmamente. Você quer café? Chá?',
            hidePortrait: true,
            background: 'quarto',
            sanity: -10
        },
        {
            name: 'Luna',
            text: 'Você acha que eu sou idiota? Você está tentando ganhar tempo.',
            portrait: 'desconfiado',
            character: 'luna',
            sanity: -25
        },
        {
            name: 'Narrador',
            text: 'Ela tem razão. Ela SEMPRE parece ter razão.',
            hidePortrait: true,
            sanity: -20
        },
        {
            next: 'cap2_captura'
        }
    ],
    
    /* ==================== FINAIS BONS ==================== */
    
    final_esperanca: [
        {
            name: 'Narrador',
            text: 'Seis meses depois...',
            hidePortrait: true,
            background: 'rua',
            sanity: 50,
            music: 'normal'
        },
        {
            name: 'Narrador',
            text: 'Luna se recuperou em uma instituição. Com tempo, paciência e terapia, ela aprendeu a entender seus sentimentos obsessivos.',
            hidePortrait: true,
            sanity: 60
        },
        {
            name: 'Narrador',
            text: 'Ela ainda te envia mensagens ocasionalmente. Mas são mensagens de uma pessoa curada. De alguém que aprendeu.',
            hidePortrait: true,
            sanity: 70
        },
        {
            name: 'Narrador',
            text: 'Você percebeu que às vezes as pessoas que mais nos machucam não fazem por maldade. Fazem por ignorância. E a ignorância pode ser curada.',
            hidePortrait: true,
            sanity: 80,
            ending: {
                title: '✨ FINAL BOM - ESPERANÇA ✨',
                text: 'Você ajudou Luna a se curar. Ambos seguiram vidas novas, sem obsessão, apenas com a lembrança de que o amor verdadeiro nunca deveria ferir.',
                imageUrl: 'assets/images/ending-hope.png'
            }
        }
    ],
    
    final_liberdade_fria: [
        {
            name: 'Narrador',
            text: 'Meses passaram. Luna foi processada por perseguição criminosa.',
            hidePortrait: true,
            background: 'rua',
            sanity: 60,
            music: 'normal'
        },
        {
            name: 'Narrador',
            text: 'Você teve que testemunhar em tribunal. Todos os detalhes da perseguição foram revelados. Você foi acreditado.',
            hidePortrait: true,
            sanity: 70
        },
        {
            name: 'Narrador',
            text: 'Luna está na prisão agora. Você está livre. Mas às vezes ainda sonha com aquele rosto, naqueles olhos...',
            hidePortrait: true,
            sanity: 50,
            ending: {
                title: '❄️ FINAL NEUTRO - LIBERDADE FRIA ❄️',
                text: 'Você escapou de Luna juridicamente. Mas a cicatriz permanece. Você está vivo, mas não inteiramente livre do medo.',
                imageUrl: 'assets/images/ending-freedom.png'
            }
        }
    ],
    
    final_liberdade_paranoia: [
        {
            name: 'Narrador',
            text: 'Anos passaram. Você constantemente olha para trás.',
            hidePortrait: true,
            background: 'rua',
            sanity: 40,
            music: 'suspense'
        },
        {
            name: 'Narrador',
            text: 'Você nunca mais se relacionou seriamente. Sempre com medo. Sempre esperando Luna aparecer novamente.',
            hidePortrait: true,
            sanity: 35
        },
        {
            name: 'Narrador',
            text: 'Então, um dia, você recebe uma mensagem...',
            hidePortrait: true,
            sanity: 20,
            music: 'horror'
        },
        {
            name: 'Mensagem',
            text: 'Olá, {playerName}. Fui libertada mais cedo por bom comportamento. Você lembrou de mim?',
            hidePortrait: true,
            sanity: 0,
            ending: {
                title: '😰 FINAL RUIM - PARANOIA ETERNA 😰',
                text: 'Você escapou, mas Luna nunca deixou de perseguir você. Seu medo agora é eterno.',
                imageUrl: 'assets/images/ending-paranoia.png'
            }
        }
    ],
    
    final_protegido: [
        {
            name: 'Narrador',
            text: 'Seus pais ajudaram você. Mudança de escola, mudança de casa, novo número de telefone.',
            hidePortrait: true,
            background: 'rua',
            sanity: 70,
            music: 'normal'
        },
        {
            name: 'Narrador',
            text: 'Luna nunca mais conseguiu te encontrar. Você cresceu e se desenvolveu longe da obsessão dela.',
            hidePortrait: true,
            sanity: 80
        },
        {
            name: 'Narrador',
            text: 'Você aprendeu uma lição valiosa: às vezes, pedir ajuda não é fraqueza. É sabedoria.',
            hidePortrait: true,
            sanity: 90,
            ending: {
                title: '💙 FINAL BOM - PROTEGIDO 💙',
                text: 'Com ajuda de quem ama você, conseguiu escapar de Luna completamente. Você cresceu mais forte.',
                imageUrl: 'assets/images/ending-protected.png'
            }
        }
    ],
    
    final_ruim_captura: [
        {
            name: 'Narrador',
            text: 'Você despertou em um lugar desconhecido. Escuro. Há cordas.',
            hidePortrait: true,
            background: 'preto',
            sanity: 0,
            music: 'horror'
        },
        {
            name: 'Luna',
            text: 'Bom dia, {playerName}. Você dormiu bem? Eu preparei café para nós...',
            portrait: 'normal',
            character: 'luna',
            sanity: -50
        },
        {
            ending: {
                title: '💀 FINAL RUIM - CAPTURA 💀',
                text: 'Você se tornou prisioneiro de Luna. Sem esperança de fuga. O amor dela não conhece limites... nem respeito pela sua vida.',
                imageUrl: 'assets/images/ending-capture.png'
            }
        }
    ],
    
    final_ruim_prisioneiro: [
        {
            name: 'Narrador',
            text: 'Meses passam. Você é alimentado mas não é livre. Luna te trata como um boneco de brinquedo. Seu brinquedo pessoal.',
            hidePortrait: true,
            background: 'preto',
            sanity: -100,
            music: 'horror'
        },
        {
            ending: {
                title: '🔓 FINAL TRÁGICO - PRISIONEIRO ETERNO 🔓',
                text: 'Você perdeu sua liberdade, sua identidade e sua humanidade. Luna "ama" você tanto que não deixará você viver.',
                imageUrl: 'assets/images/ending-prisoner.png'
            }
        }
    ],
    
    final_ruim_1: [
        {
            ending: {
                title: '💔 FINAL RUIM - OBSESSÃO 💔',
                text: 'Você desapareceu. Ninguém sabe aonde você foi. Apenas Luna sabe. E ela nunca dirá.',
                imageUrl: 'assets/images/ending-obsession.png'
            }
        }
    ],
    
    final_neutro_distancia: [
        {
            name: 'Narrador',
            text: 'Você mudou para outra cidade. Longe de Luna. Longe da obsessão.',
            hidePortrait: true,
            background: 'rua',
            sanity: 60,
            music: 'normal'
        },
        {
            name: 'Narrador',
            text: 'Sua vida não é ruim. Mas também nunca é completamente boa. Você sempre carrega aquela memória com você.',
            hidePortrait: true,
            sanity: 55,
            ending: {
                title: '🌙 FINAL NEUTRO - DISTÂNCIA 🌙',
                text: 'Você fugiu. Você sobreviveu. Mas a cicatriz do encontro com Luna nunca cicatriza completamente.',
                imageUrl: 'assets/images/ending-distance.png'
            }
        }
    ],
    
    /* ==================== CAPÍTULO 3: REVELAÇÕES PERIGOSAS ==================== */
    
    cap3_segredo_luna: [
        {
            name: 'Luna',
            text: '{playerName}... há algo que eu preciso te contar. Algo que ninguém sabe.',
            portrait: 'serio',
            character: 'luna',
            sanity: -5,
            music: 'suspense'
        },
        {
            name: 'Luna',
            text: 'Eu não sou... normal. Você já notou como você sempre pensa em mim? Como eu consigo entrar em seus pensamentos?',
            portrait: 'misterioso',
            sanity: -8
        },
        {
            choice: true,
            options: [
                { text: 'Questionar Luna sobre isso', next: 'cap3_questionar_luna' },
                { text: 'Tentar fugir', next: 'cap3_tentativa_fuga' },
                { text: 'Aceitar o que ela diz', next: 'cap3_aceitacao_obsessao' }
            ]
        }
    ],
    
    cap3_questionar_luna: [
        {
            name: '{playerName}',
            text: 'O que você quer dizer com "entrar em meus pensamentos"?',
            hidePortrait: true,
            sanity: 0
        },
        {
            name: 'Luna',
            text: 'Você realmente não vê? Você realmente não entende o que estou fazendo com você?',
            portrait: 'inimigo',
            character: 'luna',
            sanity: -12,
            minigame: {
                type: 'simonGame',
                onComplete: (success) => {
                    if (success) {
                        game.loadScene('cap3_luna_responde');
                    } else {
                        game.loadScene('cap3_luna_raiva');
                    }
                }
            }
        }
    ],
    
    cap3_luna_responde: [
        {
            name: 'Luna',
            text: 'Impressionante... você conseguiu seguir meu padrão. Talvez você não seja tão fraco assim.',
            portrait: 'apaixonado',
            character: 'luna',
            sanity: -3,
            relationship: 5
        },
        {
            name: 'Luna',
            text: 'Eu sou como um vírus, {playerName}. Contagioso. Irremovível. Eu me infiltro na mente das pessoas e fico lá para sempre.',
            portrait: 'serio',
            sanity: -8
        },
        {
            next: 'cap3_escolha_final'
        }
    ],
    
    cap3_luna_raiva: [
        {
            name: 'Luna',
            text: 'INCOMPETENTE! Como você OUSA não conseguir me seguir?!',
            portrait: 'raiva',
            character: 'luna',
            sanity: -20,
            music: 'horror'
        },
        {
            name: 'Narrador',
            text: 'Os olhos de Luna brilham com uma cor que não é natural. Vermelho. Puro vermelho.',
            hidePortrait: true,
            sanity: -15
        },
        {
            next: 'cap3_tentativa_fuga'
        }
    ],
    
    cap3_tentativa_fuga: [
        {
            name: 'Narrador',
            text: 'Você tenta correr. Tenta escapar da casa. Tenta colocar distância entre você e Luna.',
            hidePortrait: true,
            background: 'rua',
            sanity: -10,
            minigame: {
                type: 'hackingGame',
                code: '1337',
                attempts: 4,
                onComplete: (success) => {
                    if (success) {
                        game.loadScene('cap3_fuga_bem_sucedida');
                    } else {
                        game.loadScene('cap3_luna_alcanca');
                    }
                }
            }
        }
    ],
    
    cap3_fuga_bem_sucedida: [
        {
            name: 'Narrador',
            text: 'Você consegue! Você quebra a barreira invisível que Luna colocou ao seu redor.',
            hidePortrait: true,
            sanity: 40,
            music: 'action'
        },
        {
            name: 'Luna (Mensagem)',
            text: '{playerName}... você não conseguirá se afastar de mim. Não importa o quão longe você vá.',
            hidePortrait: true,
            sanity: -5,
            music: 'suspense'
        },
        {
            choice: true,
            options: [
                { text: 'Pedir ajuda profissional', next: 'cap4_procurar_psiclogo' },
                { text: 'Tentar viver uma vida normal', next: 'cap4_vida_normal' },
                { text: 'Investigar o que Luna é', next: 'cap4_investigacao' }
            ]
        }
    ],
    
    cap3_luna_alcanca: [
        {
            name: 'Luna',
            text: 'Você realmente pensou que poderia me deixar?',
            portrait: 'possessivo',
            character: 'luna',
            sanity: -25,
            music: 'horror'
        },
        {
            name: 'Narrador',
            text: 'Ela te puxa de volta. Seus braços são tão frios. Tão possessivos.',
            hidePortrait: true,
            sanity: -20
        },
        {
            next: 'cap3_aceitacao_obsessao'
        }
    ],
    
    cap3_aceitacao_obsessao: [
        {
            name: 'Luna',
            text: 'Bom garoto. Você finalmente entende. Você é meu. Agora e para sempre.',
            portrait: 'obsessivo',
            character: 'luna',
            sanity: -30,
            music: 'horror',
            relationship: 20
        },
        {
            name: 'Narrador',
            text: 'Você sente sua mente se dissolvendo. Seus pensamentos se misturando com os dela.',
            hidePortrait: true,
            sanity: -25
        },
        {
            name: 'Narrador',
            text: 'Você não sabe mais onde você termina e onde ela começa.',
            hidePortrait: true,
            sanity: -30,
            ending: {
                title: '👁️ FINAL SECRETO II - A FUSÃO 👁️',
                text: 'Você e Luna se tornaram um. Não há mais separação entre sua mente e a dela. Você é Luna. Luna é você. A obsessão atingiu seu pico. Você já não é mais você mesmo.',
                imageUrl: 'assets/images/ending-fusion.png'
            }
        }
    ],
    
    cap3_escolha_final: [
        {
            choice: true,
            options: [
                { text: 'Aceitar Luna', next: 'cap3_aceitacao_obsessao' },
                { text: 'Tentar escapar', next: 'cap3_tentativa_fuga' },
                { text: 'Fazer um acordo com ela', next: 'cap3_acordo_luna' }
            ]
        }
    ],
    
    cap3_acordo_luna: [
        {
            name: '{playerName}',
            text: 'Luna, e se fizéssemos um acordo? Você me deixa viver minha vida, e eu sempre voltarei para você.',
            hidePortrait: true,
            sanity: 0
        },
        {
            name: 'Luna',
            text: '... Um acordo? Você me interessa. Mas como posso confiar em você?',
            portrait: 'pensativa',
            character: 'luna',
            sanity: -5,
            minigame: {
                type: 'moralChoice',
                scenario: 'Luna quer prova de sua lealdade. Qual atitude faria ela acreditar em você?',
                options: [
                    {
                        icon: '💍',
                        text: 'Fazer uma promessa formal e gravada',
                        consequence: { relationshipChange: 10, flag: 'promiseToLuna' }
                    },
                    {
                        icon: '🩸',
                        text: 'Oferecer algo extremo como prova',
                        consequence: { relationshipChange: 20, sanityChange: -20, flag: 'extremeCommitment' }
                    },
                    {
                        icon: '⏰',
                        text: 'Propor que ela te monitore pelo celular',
                        consequence: { relationshipChange: 5, sanityChange: -10, flag: 'monitoring' }
                    }
                ],
                onComplete: (consequence) => {
                    game.loadScene('cap3_acordo_aceito');
                }
            }
        }
    ],
    
    cap3_acordo_aceito: [
        {
            name: 'Luna',
            text: 'Você realmente faria tudo por mim? Então nosso acordo está selado. Você será meu... por enquanto.',
            portrait: 'apaixonado',
            character: 'luna',
            sanity: -5
        },
        {
            name: 'Narrador',
            text: 'Você não sabe se fez a coisa certa ou errada. Mas pelo menos agora você está vivo.',
            hidePortrait: true,
            sanity: 50,
            ending: {
                title: '📜 FINAL ALTERNATIVO - O ACORDO 📜',
                text: 'Você e Luna chegaram a um acordo. Uma relação estranha, mas estável. Você é livre, mas nunca completamente. Luna é satisfeita, mas nunca completamente. É um equilíbrio frágil entre dois seres perdidos.',
                imageUrl: 'assets/images/ending-agreement.png'
            }
        }
    ],
    
    /* ==================== CAPÍTULO 4: ALÉM DA OBSESSÃO ==================== */
    
    cap4_procurar_psiclogo: [
        {
            name: 'Psicólogo',
            text: 'Você acredita sinceramente que uma pessoa conseguiu se infiltrar em sua mente?',
            hidePortrait: true,
            background: 'escritorio',
            sanity: 5,
            music: 'calma'
        },
        {
            name: '{playerName}',
            text: 'Sim! Eu sei que soa loucura, mas-',
            hidePortrait: true,
            sanity: -2
        },
        {
            name: 'Psicólogo',
            text: 'Você pode estar experimentando delírios. Vou prescrever alguns medicamentos.',
            hidePortrait: true,
            sanity: 10,
            minigame: {
                type: 'hackingGame',
                code: 'SANIDADE',
                attempts: 3,
                onComplete: (success) => {
                    if (success) {
                        game.loadScene('cap4_cura_medicina');
                    } else {
                        game.loadScene('cap4_luna_volta');
                    }
                }
            }
        }
    ],
    
    cap4_cura_medicina: [
        {
            name: 'Narrador',
            text: 'Os medicamentos ajudam. A voz de Luna em sua cabeça fica cada vez mais silenciosa.',
            hidePortrait: true,
            sanity: 75,
            music: 'calma'
        },
        {
            name: 'Narrador',
            text: 'Você começa a viver uma vida normal. Faz amigos. Encontra alguém novo.',
            hidePortrait: true,
            sanity: 85,
            ending: {
                title: '🌟 FINAL BOM - A CURA 🌟',
                text: 'Você conseguiu escapar. Os medicamentos, a terapia e a distância a afastaram de sua mente. Luna é apenas uma memória agora. Uma cicatriz que cicatriza com o tempo. Você é livre.',
                imageUrl: 'assets/images/ending-healing.png'
            }
        }
    ],
    
    cap4_luna_volta: [
        {
            name: 'Narrador',
            text: 'Mas os medicamentos não funcionam. Luna é muito forte. Muito real.',
            hidePortrait: true,
            sanity: -30,
            music: 'horror'
        },
        {
            name: 'Luna (Em Seus Pensamentos)',
            text: '{playerName}... você realmente pensou que podia se medicar para se livrar de mim?',
            hidePortrait: true,
            sanity: -40,
            ending: {
                title: '🌙 FINAL RUIM II - MEDICAMENTOS SÃO INÚTEIS 🌙',
                text: 'Luna é mais do que uma obsessão. Ela é parte de você. Os medicamentos não conseguem tirar o que está na sua alma. Você ainda é dela.',
                imageUrl: 'assets/images/ending-medication-fails.png'
            }
        }
    ],
    
    cap4_vida_normal: [
        {
            name: 'Narrador',
            text: 'Você tenta fingir que tudo é normal. Tenta viver uma vida comum.',
            hidePortrait: true,
            sanity: 50,
            music: 'normal'
        },
        {
            name: 'Narrador',
            text: 'Você consegue um emprego. Faz novas amizades. Mas nada preenche o vazio que Luna deixou.',
            hidePortrait: true,
            sanity: 40
        },
        {
            name: 'Narrador',
            text: 'A cada noite, você sonha com ela. A cada dia, você pensa nela.',
            hidePortrait: true,
            sanity: 30,
            ending: {
                title: '🌚 FINAL MELANCÓLICO - CICATRIZ ETERNA 🌚',
                text: 'Você viveu. Você sobreviveu. Mas Luna nunca saiu de você. Ela é a cicatriz que nunca cicatriza completamente. A lembrança que nunca desaparece. Você continua vivo, mas nunca realmente feliz.',
                imageUrl: 'assets/images/ending-eternal-scar.png'
            }
        }
    ],
    
    cap4_investigacao: [
        {
            name: 'Narrador',
            text: 'Você começa a investigar. Quem é Luna? De onde ela vem? Como ela consegue fazer essas coisas?',
            hidePortrait: true,
            background: 'biblioteca',
            sanity: -5,
            music: 'suspense',
            minigame: {
                type: 'hackingGame',
                code: 'VERDADE',
                attempts: 5,
                onComplete: (success) => {
                    if (success) {
                        game.loadScene('cap4_verdade_encontrada');
                    } else {
                        game.loadScene('cap4_luna_descobre');
                    }
                }
            }
        }
    ],
    
    cap4_verdade_encontrada: [
        {
            name: 'Narrador',
            text: 'Você encontra arquivos antigos. Luna aparece em múltiplos registros. Décadas. Séculos?',
            hidePortrait: true,
            sanity: -20
        },
        {
            name: 'Narrador',
            text: 'Ela não é humana. Ela nunca foi humana. Ela é algo muito mais antigo. Muito mais perigoso.',
            hidePortrait: true,
            sanity: -30,
            ending: {
                title: '👹 FINAL HORROR - A VERDADE INSUPORTÁVEL 👹',
                text: 'Você descobriu a verdade. Luna não é obsessão. Luna é um predador. Um ser sobrenatural que se alimenta de almas humanas. E agora que você sabe, você está ainda mais preso a ela. Porque ela não permitirá que viva sabendo seu segredo.',
                imageUrl: 'assets/images/ending-horror-truth.png'
            }
        }
    ],
    
    cap4_luna_descobre: [
        {
            name: 'Luna',
            text: '{playerName}... você está investigando? Você está tentando me entender?',
            portrait: 'raiva',
            character: 'luna',
            sanity: -50,
            music: 'horror'
        },
        {
            name: 'Luna',
            text: 'Que pena. E aqui eu pensava que você me amava.',
            portrait: 'possessivo',
            sanity: -30,
            ending: {
                title: '😈 FINAL TRÁGICO - PUNIÇÃO 😈',
                text: 'Sua investigação foi um erro fatal. Luna descobriu. Luna não gosta de ser estudada como um espécime. Sua punição será pior que qualquer morte. Será uma eternidade de sofrimento em seus braços possessivos.',
                imageUrl: 'assets/images/ending-punishment.png'
            }
        }
    ]
};

// Mesclar todas as novas cenas ao objeto STORY original
Object.assign(STORY, STORY_EXPANSION);