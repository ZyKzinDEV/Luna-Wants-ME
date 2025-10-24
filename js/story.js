/* ==================== LUNA WANTS ME - STORY.JS ==================== */
/* História completa do jogo */

const STORY = {
    
    /* ==================== INICIAL: ENTRADA DO NOME ==================== */
    
    intro_askName: [
        {
            name: 'Sistema',
            text: 'O jogo pedirá para você escolher seu nome...',
            hidePortrait: true,
            minigame: {
                type: 'playerName',
                execute: () => {
                    UI.showPlayerNameScreen();
                },
                onComplete: () => {
                    game.loadScene('intro_greetings');
                }
            },
            skipDialogue: true // Não mostrar diálogo, apenas executar minijogo
        }
    ],
    
    intro_greetings: [
        {
            name: 'Luna',
            text: 'Olá, {playerName}! ♥ Que nome lindo...',
            portrait: 'feliz',
            character: 'luna',
            background: 'rua',
            music: 'normal',
            sanity: -2
        },
        {
            name: 'Luna',
            text: 'Meu nome é Luna. Eu sou... sua nova amiga.',
            portrait: 'normal'
        },
        {
            name: 'Narrador',
            text: 'Algo nesta voz soa estranho. Hipnotizante. Como se ela já conhecesse você a vida inteira.',
            hidePortrait: true,
            sanity: -3
        },
        {
            next: 'cap1_inicio'
        }
    ],
    
    /* ==================== CAPÍTULO 1: O COMEÇO ==================== */
    
    cap1_inicio: [
        {
            name: 'Narrador',
            text: 'Dia 1: Segunda-feira, 7h30 da manhã. Mais um dia comum.',
            background: 'rua',
            hidePortrait: true,
            music: 'normal'
        },
        {
            name: 'Você',
            text: '(Bocejando) Que sono... pelo menos hoje não tenho prova.',
            hidePortrait: true
        },
        {
            name: 'Narrador',
            text: 'Você caminha pela rua familiar em direção à escola. Tudo parece perfeitamente normal.',
            hidePortrait: true
        },
        {
            name: 'Narrador',
            text: 'Mas então... você sente algo estranho. Como se estivesse sendo observado.',
            hidePortrait: true,
            sanity: -2
        },
        {
            name: 'Luna',
            text: 'Olá! ♥',
            portrait: 'feliz',
            character: 'luna',
            sfx: 'text'
        },
        {
            name: 'Você',
            text: '(Virando-se) Ah! Luna! Você me assustou.',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Desculpa! Eu estava te seguindo... quer dizer, andando atrás de você desde sua casa!',
            portrait: 'feliz',
            sanity: -3
        },
        {
            name: 'Você',
            text: '(Pensamento) Desde minha casa? Mas eu moro a 10 minutos daqui...',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Que coincidência incrível nos encontrarmos, não é? ♥',
            portrait: 'normal'
        },
        {
            name: 'Você',
            text: '(Forçando um sorriso) É... que coincidência.',
            hidePortrait: true
        },
        {
            choice: true,
            options: [
                {
                    text: '😊 "Vamos juntos para a escola?"',
                    next: 'cap1_amigavel',
                    effect: (state) => state.flags.respondeuBem = true
                },
                {
                    text: '😐 "Tenho que ir. Até mais."',
                    next: 'cap1_distante',
                    sanity: -5
                }
            ]
        }
    ],
    
    cap1_amigavel: [
        {
            name: 'Luna',
            text: 'Sério?! Eu adoraria! ♥♥♥',
            portrait: 'feliz',
            music: 'normal'
        },
        {
            name: 'Luna',
            text: 'Eu estava esperando que você dissesse isso! Sonhei com esse momento!',
            portrait: 'feliz',
            sanity: -5
        },
        {
            name: 'Você',
            text: '(Nervoso) Você... sonhou com isso?',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Sim! Todo dia eu imagino nossos momentos juntos. Cada detalhe, cada palavra...',
            portrait: 'normal',
            sanity: -5
        },
        {
            name: 'Narrador',
            text: 'Vocês caminham juntos. Luna não para de olhar para você.',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Você sabia que seus olhos brilham de um jeito especial quando você sorri?',
            portrait: 'normal'
        },
        {
            name: 'Você',
            text: '(Desconfortável) Hã... obrigado?',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'E seu cabelo... posso tocar?',
            portrait: 'feliz'
        },
        {
            name: 'Você',
            text: 'Eu... prefiro que não.',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: '(Sorriso estranho) Tudo bem. Por enquanto. ♥',
            portrait: 'dark',
            sanity: -8
        },
        {
            next: 'cap1_escola'
        }
    ],
    
    cap1_distante: [
        {
            name: 'Luna',
            text: '...',
            portrait: 'triste',
            music: 'suspense'
        },
        {
            name: 'Luna',
            text: 'Ah. Entendo.',
            portrait: 'triste'
        },
        {
            name: 'Narrador',
            text: 'Você começa a caminhar, mas sente um arrepio na espinha.',
            hidePortrait: true,
            sanity: -5
        },
        {
            name: 'Luna',
            text: '(Sussurrando) Tudo bem... eu vou atrás de você de qualquer jeito.',
            portrait: 'dark',
            sanity: -10
        },
        {
            name: 'Narrador',
            text: 'Você acelera o passo, mas tem certeza de que ela está te seguindo.',
            hidePortrait: true
        },
        {
            name: 'Você',
            text: '(Pensamento) Isso não é normal...',
            hidePortrait: true
        },
        {
            next: 'cap1_escola'
        }
    ],
    
    cap1_escola: [
        {
            name: 'Narrador',
            text: 'Você chega à escola. A aula começa normalmente.',
            background: 'sala_aula',
            hidePortrait: true,
            music: 'normal'
        },
        {
            name: 'Narrador',
            text: 'Mas durante toda a aula, você sente alguém te observando intensamente.',
            hidePortrait: true,
            sanity: -5
        },
        {
            name: 'Narrador',
            text: 'Você olha para trás. Luna está encarando você fixamente, sem piscar.',
            hidePortrait: true,
            sanity: -10
        },
        {
            name: 'Luna',
            text: '(Acena e sorri)',
            portrait: 'feliz'
        },
        {
            name: 'Você',
            text: '(Pensamento) Ela não parou de me olhar nem por um segundo...',
            hidePortrait: true
        },
        {
            name: 'Professor',
            text: 'Atenção, turma! Amanhã teremos um feriado, então não haverá aula.',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: '(Sussurra) Um dia inteiro livre... para ficarmos juntos. ♥',
            portrait: 'dark',
            sanity: -10,
            visualEffect: 'vignette'
        },
        {
            next: 'cap1_fim_aula'
        }
    ],
    
    cap1_fim_aula: [
        {
            name: 'Narrador',
            text: 'Fim das aulas. Você arruma suas coisas rapidamente.',
            background: 'sala_aula',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Ei! Espera!',
            portrait: 'feliz'
        },
        {
            name: 'Você',
            text: '(Suspira) Sim, Luna?',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Meus pais não estão em casa hoje... quer que eu te dê uma carona? Podemos passar um tempo juntos. ♥',
            portrait: 'feliz'
        },
        {
            name: 'Você',
            text: '(Pensamento) Isso está ficando muito estranho...',
            hidePortrait: true,
            sanity: -5
        },
        {
            choice: true,
            options: [
                {
                    text: '✅ "Claro, obrigado pela carona."',
                    next: 'cap1_celular',
                    effect: (state) => {
                        state.flags.aceitouCarona = true;
                        game.advanceDay(true); // Avanço para o próximo dia com transição visual
                    },
                    sanity: -10
                },
                {
                    text: '❌ "Não, obrigado. Prefiro caminhar."',
                    next: 'cap2_recusa',
                    effect: (state) => game.advanceDay(true),
                    sanity: -5
                }
            ]
        }
    ],
    
    /* ==================== CENA INTERMEDIÁRIA: MINIJOGO DO CELULAR ==================== */
    
    cap1_celular: [
        {
            name: 'Narrador',
            text: 'Você entram no carro de Luna. Ela dirige com uma mão enquanto a outra fica pousada perto de você.',
            background: 'rua',
            hidePortrait: true,
            music: 'suspense'
        },
        {
            name: 'Luna',
            text: 'Ei, {playerName}... você poderia me mostrar seu celular?',
            portrait: 'normal',
            sanity: -10
        },
        {
            name: 'Você',
            text: 'Meu celular? Por quê?',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Eu só quero saber mais sobre você. Ver suas fotos, seus contatos, seus segredos...',
            portrait: 'dark',
            sanity: -15,
            visualEffect: 'vignette'
        },
        {
            name: 'Você',
            text: '(Pensamento) Não... de jeito nenhum.',
            hidePortrait: true
        },
        {
            choice: true,
            options: [
                {
                    text: '🚗 Chegar em um semáforo vermelho',
                    next: 'cap1_fuga_semaforo'
                },
                {
                    text: '😅 Mudar de assunto',
                    next: 'cap2_carona'
                }
            ]
        }
    ],
    
    cap1_fuga_semaforo: [
        {
            name: 'Narrador',
            text: 'O carro para no semáforo. Luna continua dirigindo, mas seus olhos estão fixos em você.',
            hidePortrait: true,
            background: 'rua'
        },
        {
            name: 'Luna',
            text: 'Então... você vai me mostrar ou não?',
            portrait: 'dark',
            sanity: -5
        },
        {
            name: 'Narrador',
            text: 'Você vê a porta do carro. Está destrancada.',
            hidePortrait: true
        },
        {
            minigame: {
                type: 'qte',
                prompt: 'ABRA A PORTA!',
                duration: 2500
            },
            skipDialogue: true
        },
        {
            // Esta linha é alcançada se o QTE for bem-sucedido
            name: 'Narrador',
            text: 'Em um reflexo de desespero, você abre a porta do carro!',
            hidePortrait: true,
            sanity: -10
        },
        {
            name: 'Luna',
            text: 'NÃO! {playerName}!',
            portrait: 'yandere',
            sanity: -20
        },
        {
            name: 'Narrador',
            text: 'Você salta do carro e corre pelas ruas. Luna grita seu nome.',
            hidePortrait: true,
            sanity: -15
        },
        {
            next: 'cap2_carro'
        }
    ],
    
    /* ==================== MINIJOGO: DESCOBRIR SEGREDOS DE LUNA ==================== */
    
    cap1_segredos: [
        {
            name: 'Narrador',
            text: 'Enquanto Luna está distraída, você vê seu diário aberto no banco de trás. Você consegue ver pistas sobre seus segredos.',
            hidePortrait: true,
            background: 'rua',
            sanity: -5
        },
        {
            minigame: {
                type: 'logicPuzzle',
                questions: [
                    {
                        question: 'Por quanto tempo Luna te observa?',
                        options: ['Alguns meses', 'Um ano inteiro', 'Desde o primeiro dia de aula'],
                        correctIndex: 2
                    },
                    {
                        question: 'O que Luna guarda em seu quarto?',
                        options: ['Diários', 'Seus pertences roubados', 'Fotos suas'],
                        correctIndex: 1
                    },
                    {
                        question: 'O que Luna realmente quer?',
                        options: ['Ser sua amiga', 'Controlar você completamente', 'Ir à escola']
                    }
                ]
            },
            skipDialogue: true
        },
        {
            name: 'Luna',
            text: '!! Você estava lendo meu diário?!',
            portrait: 'yandere',
            sanity: -20
        },
        {
            next: 'cap2_carro'
        }
    ],
    
    /* ==================== MINIJOGO: ESCOLHA SOBRE LUNA ==================== */
    
    cap1_relacionamento: [
        {
            name: 'Narrador',
            text: 'Luna olha para você com intensidade enquanto dirige. Suas mãos tremem.',
            hidePortrait: true,
            background: 'rua',
            sanity: -10
        },
        {
            name: 'Luna',
            text: 'Eu só quero que você entenda, {playerName}... Eu faço TUDO por você.',
            portrait: 'normal',
            sanity: -5
        },
        {
            minigame: {
                type: 'relationshipChoice',
                character: 'Luna',
                scenario: 'Como você responde a Luna?',
                options: [
                    {
                        text: '💕 "Eu entendo... e eu também gosto de você."',
                        effect: 15
                    },
                    {
                        text: '😐 "Isso não é amor, Luna. Isso é obsessão."',
                        effect: -20
                    },
                    {
                        text: '😟 "Deixa eu ir para casa primeiro, depois conversamos."',
                        effect: 5
                    }
                ]
            },
            skipDialogue: true
        },
        {
            next: 'cap2_carona'
        }
    ],
    
    /* ==================== CAPÍTULO 2: A OBSESSÃO ==================== */
    
    cap2_carona: [
        {
            name: 'Você',
            text: 'Tudo bem, aceito a carona.',
            background: 'rua',
            hidePortrait: true,
            music: 'suspense'
        },
        {
            name: 'Luna',
            text: 'ÓTIMO! Você não vai se arrepender! ♥♥♥',
            portrait: 'feliz'
        },
        {
            name: 'Narrador',
            text: 'Vocês caminham até o estacionamento. Luna abre o carro com um sorriso enorme.',
            hidePortrait: true
        },
        {
            name: 'Narrador',
            text: 'Ao entrar no carro, você nota algo... perturbador.',
            hidePortrait: true,
            sanity: -10
        },
        {
            name: 'Narrador',
            text: 'O painel está coberto de fotos. Fotos SUAS.',
            hidePortrait: true,
            sanity: -20,
            visualEffect: 'glitch',
            sfx: 'heartbeat'
        },
        {
            name: 'Você',
            text: 'Luna... essas fotos são...?',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Ah! Você gostou da minha coleção? ♥ Tenho centenas delas em casa!',
            portrait: 'feliz',
            sanity: -15
        },
        {
            name: 'Você',
            text: '(Suando frio) Quando... quando você tirou essas fotos?',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Durante seus treinos, no caminho para casa, na biblioteca, através da sua janela...',
            portrait: 'normal',
            sanity: -20
        },
        {
            name: 'Você',
            text: 'ATRAVÉS DA MINHA JANELA?!',
            hidePortrait: true,
            sanity: -15
        },
        {
            name: 'Luna',
            text: 'Você é tão lindo quando dorme... tão pacífico... tão MEU. ♥',
            portrait: 'yandere',
            sanity: -25,
            music: 'terror'
        },
        {
            next: 'cap2_carro'
        }
    ],
    
    cap2_carro: [
        {
            name: 'Narrador',
            text: 'Seu coração dispara. Você tenta abrir a porta, mas está trancada.',
            background: 'rua',
            hidePortrait: true,
            sanity: -10
        },
        {
            name: 'Luna',
            text: 'Não se preocupe, coloquei trava de segurança. Para sua proteção. ♥',
            portrait: 'yandere'
        },
        {
            name: 'Você',
            text: 'Luna, isso não é normal! Você precisa de ajuda!',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Ajuda? A ÚNICA AJUDA que eu preciso é VOCÊ ao meu lado. Para sempre.',
            portrait: 'dark',
            sanity: -15
        },
        {
            name: 'Narrador',
            text: 'O carro começa a se mover. Mas Luna não está indo para sua casa...',
            hidePortrait: true,
            sanity: -10
        },
        {
            name: 'Você',
            text: 'Para onde estamos indo?',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Para NOSSA casa. Preparei tudo para você. ♥',
            portrait: 'yandere',
            sanity: -20
        },
        {
            next: 'cap2_casa_luna'
        }
    ],
    
    cap2_recusa: [
        {
            name: 'Você',
            text: 'Não, obrigado. Prefiro caminhar.',
            background: 'rua',
            hidePortrait: true,
            music: 'suspense'
        },
        {
            name: 'Luna',
            text: '...',
            portrait: 'triste'
        },
        {
            name: 'Luna',
            text: 'Você sempre me rejeita.',
            portrait: 'triste'
        },
        {
            name: 'Luna',
            text: 'Mas tudo bem. Eu entendo. Por enquanto.',
            portrait: 'dark',
            sanity: -10
        },
        {
            name: 'Narrador',
            text: 'Você sai da escola rapidamente e começa a caminhar para casa.',
            hidePortrait: true
        },
        {
            name: 'Narrador',
            text: 'Mas a sensação de estar sendo seguido não vai embora.',
            hidePortrait: true,
            sanity: -10
        },
        {
            name: 'Narrador',
            text: 'Você olha para trás. Um carro se move lentamente atrás de você.',
            hidePortrait: true,
            sanity: -15
        },
        {
            name: 'Narrador',
            text: 'É o carro de Luna.',
            hidePortrait: true,
            sanity: -20,
            sfx: 'heartbeat'
        },
        {
            next: 'cap2_perseguicao'
        }
    ],
    
    cap2_perseguicao: [
        {
            name: 'Você',
            text: '(Pensamento) Ela está me seguindo!',
            background: 'rua',
            hidePortrait: true,
            music: 'terror'
        },
        {
            name: 'Narrador',
            text: 'Você acelera o passo. O carro também acelera.',
            hidePortrait: true,
            sanity: -10
        },
        {
            name: 'Luna',
            text: '(Pela janela) POR QUE VOCÊ ESTÁ FUGINDO DE MIM?!',
            portrait: 'nervosa',
            sanity: -20,
            visualEffect: 'shake'
        },
        {
            name: 'Você',
            text: 'Luna, você está me assustando!',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Assustando?! EU ESTOU TE AMANDO! NÃO ENTENDE?!',
            portrait: 'yandere',
            sanity: -20
        },
        {
            name: 'Luna',
            text: 'TUDO que eu faço é por você! TUDO!',
            portrait: 'yandere'
        },
        {
            name: 'Narrador',
            text: 'Você vê uma esquina e decide correr.',
            hidePortrait: true
        },
        {
            choice: true,
            options: [
                {
                    text: '🏃 Correr para um lugar público',
                    next: 'cap2_fuga_sucesso',
                    sanity: -5
                },
                {
                    text: '🚪 Entrar em um beco (atalho)',
                    next: 'cap2_beco',
                    sanity: -15,
                    effect: (state) => state.flags.tentouFugir = true
                }
            ]
        }
    ],
    
    cap2_casa_luna: [
        {
            name: 'Narrador',
            text: 'O carro para em frente a uma casa isolada.',
            background: 'casa_luna',
            hidePortrait: true,
            music: 'terror'
        },
        {
            name: 'Luna',
            text: 'Chegamos! Bem-vindo ao nosso lar. ♥',
            portrait: 'feliz'
        },
        {
            name: 'Narrador',
            text: 'As portas destravam. Você poderia tentar fugir agora...',
            hidePortrait: true
        },
        {
            choice: true,
            options: [
                {
                    text: '🚪 Entrar na casa (talvez consiga escapar depois)',
                    next: 'cap3_dentro_casa',
                    effect: (state) => state.flags.entrouCasa = true,
                    sanity: -20
                },
                {
                    text: '🏃 Tentar fugir AGORA',
                    next: 'cap3_fuga_imediata',
                    sanity: -15
                }
            ]
        }
    ],
    
    cap2_fuga_sucesso: [
        {
            name: 'Narrador',
            text: 'Você corre em direção a um shopping movimentado.',
            background: 'rua',
            hidePortrait: true,
            music: 'suspense'
        },
        {
            name: 'Narrador',
            text: 'Luna não pode te seguir com tantas testemunhas. Você está seguro... por enquanto.',
            hidePortrait: true
        },
        {
            name: 'Você',
            text: '(Ofegante) Preciso... chamar a polícia.',
            hidePortrait: true
        },
        {
            name: 'Narrador',
            text: 'Você pega seu celular. 15 mensagens não lidas. Todas de Luna.',
            hidePortrait: true,
            sanity: -10
        },
        {
            name: 'Luna',
            text: '(Mensagem) "Você vai se arrepender de ter fugido de mim."',
            portrait: 'dark',
            sanity: -15
        },
        {
            name: 'Luna',
            text: '(Mensagem) "Mas tudo bem. Eu sempre te encontro. ♥"',
            portrait: 'yandere',
            sanity: -10
        },
        {
            next: 'cap3_policia'
        }
    ],
    
    cap2_beco: [
        {
            name: 'Narrador',
            text: 'Você entra correndo no beco escuro.',
            background: 'rua',
            hidePortrait: true,
            music: 'terror',
            visualEffect: 'dark'
        },
        {
            name: 'Narrador',
            text: 'Erro. Beco sem saída.',
            hidePortrait: true,
            sanity: -20,
            sfx: 'heartbeat'
        },
        {
            name: 'Você',
            text: '(Pânico) Não, não, não!',
            hidePortrait: true
        },
        {
            name: 'Narrador',
            text: 'Você ouve passos atrás de você. Ela saiu do carro.',
            hidePortrait: true,
            sanity: -15
        },
        {
            name: 'Luna',
            text: 'Achou que poderia fugir de mim?',
            portrait: 'yandere',
            visualEffect: 'glitch'
        },
        {
            name: 'Luna',
            text: 'Eu SEMPRE te encontro. SEMPRE.',
            portrait: 'dark',
            sanity: -25
        },
        {
            next: 'final_ruim_1'
        }
    ],
    
    /* ==================== CAPÍTULO 3: SEM VOLTA ==================== */
    
    cap3_dentro_casa: [
        {
            name: 'Narrador',
            text: 'Você entra na casa. A porta se fecha atrás de você.',
            background: 'casa_luna',
            hidePortrait: true,
            music: 'terror'
        },
        {
            name: 'Narrador',
            text: 'E então... você vê.',
            hidePortrait: true,
            sanity: -20,
            visualEffect: 'glitch'
        },
        {
            name: 'Narrador',
            text: 'As paredes. Cobertas com fotos suas. Centenas. Milhares.',
            hidePortrait: true,
            sanity: -30,
            sfx: 'heartbeat'
        },
        {
            name: 'Você',
            text: '(Horror) Luna... o que... o que é isso?!',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'É meu santuário. NOSSO santuário. Cada foto é uma memória de você.',
            portrait: 'yandere'
        },
        {
            name: 'Luna',
            text: 'Cinco anos de fotos. Desde que te vi pela primeira vez.',
            portrait: 'feliz',
            sanity: -20
        },
        {
            name: 'Você',
            text: 'Cinco ANOS?! Mas nós só nos conhecemos há seis meses!',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Você não ME conhecia. Mas EU sempre te conheci. ♥',
            portrait: 'yandere',
            sanity: -25
        },
        {
            next: 'cap3_revelacao'
        }
    ],
    
    cap3_revelacao: [
        {
            name: 'Luna',
            text: 'Vem, deixa eu te mostrar mais.',
            background: 'casa_luna',
            portrait: 'feliz',
            music: 'terror'
        },
        {
            name: 'Narrador',
            text: 'Ela te leva para outro cômodo. Há objetos... objetos seus que você pensava ter perdido.',
            hidePortrait: true,
            sanity: -20
        },
        {
            name: 'Você',
            text: 'Minha caneta... meu casaco... meu DIÁRIO?!',
            hidePortrait: true,
            sanity: -25
        },
        {
            name: 'Luna',
            text: 'Eu li todas as páginas. Conheço cada pensamento seu, cada sonho, cada medo.',
            portrait: 'yandere'
        },
        {
            name: 'Luna',
            text: 'Inclusive aquele pesadelo recorrente que você tem. Com o monstro na sua janela.',
            portrait: 'dark',
            sanity: -30
        },
        {
            name: 'Você',
            text: '(Tremendo) Aquilo... aquilo era VOCÊ?!',
            hidePortrait: true,
            sanity: -35,
            visualEffect: 'shake'
        },
        {
            name: 'Luna',
            text: 'Eu precisava estar perto de você. Mesmo quando dormia. ♥',
            portrait: 'yandere'
        },
        {
            name: 'Narrador',
            text: 'Sua sanidade está no limite. Você precisa fazer algo.',
            hidePortrait: true
        },
        {
            choice: true,
            options: [
                {
                    text: '💭 Tentar manipulá-la: "Luna, eu entendo você..."',
                    next: 'cap4_manipulacao',
                    effect: (state) => state.flags.manipulou = true
                },
                {
                    text: '😱 Confrontá-la: "Você é louca!"',
                    next: 'cap4_confronto',
                    sanity: -20
                },
                {
                    text: '💔 Aceitar: "Tudo bem... eu fico com você."',
                    next: 'cap4_aceitacao'
                }
            ]
        }
    ],
    
    cap3_fuga_imediata: [
        {
            name: 'Narrador',
            text: 'Você abre a porta e corre!',
            background: 'rua',
            hidePortrait: true,
            music: 'terror'
        },
        {
            name: 'Luna',
            text: 'NÃO! VOCÊ NÃO VAI ME DEIXAR!',
            portrait: 'nervosa',
            sanity: -20
        },
        {
            name: 'Narrador',
            text: 'Você corre o mais rápido que pode, mas ela é surpreendentemente rápida.',
            hidePortrait: true,
            sanity: -15
        },
        {
            name: 'Luna',
            text: 'Se você não pode ser meu... NÃO VAI SER DE NINGUÉM!',
            portrait: 'yandere',
            sanity: -30,
            visualEffect: 'glitch'
        },
        {
            name: 'Narrador',
            text: 'Você vê um brilho metálico na mão dela...',
            hidePortrait: true,
            sanity: -40
        },
        {
            next: 'final_ruim_2'
        }
    ],
    
    cap3_policia: [
        {
            name: 'Narrador',
            text: 'Você liga para a polícia e explica tudo.',
            background: 'rua',
            hidePortrait: true,
            music: 'suspense'
        },
        {
            name: 'Policial',
            text: 'Entendo. Vamos investigar. Fique em um lugar seguro.',
            hidePortrait: true
        },
        {
            name: 'Narrador',
            text: 'Três dias depois...',
            hidePortrait: true
        },
        {
            name: 'Policial',
            text: 'Encontramos a casa dela. Estava... vazia. Mas havia sinais perturbadores.',
            hidePortrait: true,
            sanity: -15
        },
        {
            name: 'Você',
            text: 'Que tipo de sinais?',
            hidePortrait: true
        },
        {
            name: 'Policial',
            text: 'Fotos. Milhares delas. E... um porão equipado. Como uma prisão.',
            hidePortrait: true,
            sanity: -30
        },
        {
            name: 'Policial',
            text: 'Parece que ela estava planejando isso há anos.',
            hidePortrait: true,
            sanity: -20
        },
        {
            name: 'Narrador',
            text: 'Você recebe uma notificação no celular. Uma mensagem de número desconhecido.',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: '"Você pensou que me livraria de mim tão facilmente? Eu sempre volto. ♥"',
            portrait: 'dark',
            sanity: -35
        },
        {
            next: 'final_bom_vigilante'
        }
    ],
    
    /* ==================== CAPÍTULO 4: ESCOLHAS FINAIS ==================== */
    
    cap4_manipulacao: [
        {
            name: 'Você',
            text: '(Respirando fundo) Luna... eu entendo você.',
            background: 'casa_luna',
            hidePortrait: true,
            music: 'suspense'
        },
        {
            name: 'Luna',
            text: '(Surpresa) Entende?',
            portrait: 'surprised'
        },
        {
            name: 'Você',
            text: 'Sim. Você me ama. E eu... eu posso aprender a te amar também.',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: '(Lágrimas nos olhos) Você... você está falando sério?',
            portrait: 'triste'
        },
        {
            name: 'Você',
            text: 'Mas precisamos fazer isso do jeito certo. Sem correntes. Sem prisões. Confiança.',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Mas... e se você fugir?',
            portrait: 'triste',
            sanity: -10
        },
        {
            name: 'Você',
            text: 'Não vou fugir. Prometo. Mas você precisa confiar em mim.',
            hidePortrait: true
        },
        {
            name: 'Narrador',
            text: 'Luna hesita. Você vê a dúvida nos olhos dela.',
            hidePortrait: true
        },
        {
            choice: true,
            options: [
                {
                    text: '💋 Beijá-la para ganhar confiança',
                    next: 'cap4_beijo',
                    effect: (state) => state.flags.beijouLuna = true
                },
                {
                    text: '🤝 Estender a mão: "Confie em mim"',
                    next: 'cap4_confianca'
                }
            ]
        }
    ],
    
    cap4_beijo: [
        {
            name: 'Narrador',
            text: 'Você se aproxima lentamente e a beija.',
            background: 'casa_luna',
            hidePortrait: true,
            music: 'normal'
        },
        {
            name: 'Luna',
            text: '(Chocada e extasiada) Você... você me beijou...',
            portrait: 'feliz'
        },
        {
            name: 'Luna',
            text: 'EU SEMPRE SOUBE! Você me ama! VOCÊ ME AMA! ♥♥♥',
            portrait: 'feliz',
            sanity: -15
        },
        {
            name: 'Você',
            text: '(Forçando um sorriso) Sim... por isso preciso que você confie em mim.',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Tudo bem! Eu confio em você! Agora somos um casal DE VERDADE!',
            portrait: 'feliz'
        },
        {
            name: 'Narrador',
            text: 'Ela está tão empolgada que não percebe você pegando as chaves do carro.',
            hidePortrait: true
        },
        {
            next: 'final_fuga_sucesso'
        }
    ],
    
    cap4_confianca: [
        {
            name: 'Você',
            text: 'Confie em mim, Luna. Podemos fazer isso funcionar.',
            background: 'casa_luna',
            hidePortrait: true,
            music: 'suspense'
        },
        {
            name: 'Luna',
            text: '(Olhando para sua mão) Você... realmente quer isso?',
            portrait: 'triste'
        },
        {
            name: 'Você',
            text: 'Sim. Mas com respeito mútuo. Como relacionamentos de verdade.',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Relacionamentos de verdade...',
            portrait: 'normal'
        },
        {
            name: 'Luna',
            text: '(Sorriso gradual) Tudo bem. Eu tento. Por você. ♥',
            portrait: 'feliz'
        },
        {
            name: 'Narrador',
            text: 'Nos meses seguintes, com terapia intensiva e limites claros, Luna lentamente melhora.',
            hidePortrait: true
        },
        {
            next: 'final_bom_terapia'
        }
    ],
    
    cap4_confronto: [
        {
            name: 'Você',
            text: 'Você é LOUCA! Isso não é amor, é OBSESSÃO DOENTIA!',
            background: 'casa_luna',
            hidePortrait: true,
            music: 'terror',
            sanity: -20
        },
        {
            name: 'Luna',
            text: '...',
            portrait: 'triste'
        },
        {
            name: 'Luna',
            text: 'Louca?',
            portrait: 'nervosa'
        },
        {
            name: 'Luna',
            text: 'LOUCA?!',
            portrait: 'yandere',
            visualEffect: 'shake'
        },
        {
            name: 'Luna',
            text: 'EU DEDIQUEI MINHA VIDA INTEIRA A VOCÊ!',
            portrait: 'yandere',
            sanity: -25,
            visualEffect: 'glitch'
        },
        {
            name: 'Luna',
            text: 'Afastei pessoas que poderiam te machucar! Protegi você!',
            portrait: 'dark',
            sanity: -20
        },
        {
            name: 'Você',
            text: '(Horror) Afastar pessoas? O que você fez com meus amigos?',
            hidePortrait: true,
            sanity: -30
        },
        {
            name: 'Luna',
            text: 'O que era necessário. ♥',
            portrait: 'yandere',
            sanity: -40
        },
        {
            next: 'final_ruim_3'
        }
    ],
    
    cap4_aceitacao: [
        {
            name: 'Você',
            text: '(Derrotado) Tudo bem, Luna. Eu fico com você.',
            background: 'casa_luna',
            hidePortrait: true,
            music: 'normal'
        },
        {
            name: 'Luna',
            text: 'SÉRIO?! Você vai ficar?!',
            portrait: 'feliz'
        },
        {
            name: 'Você',
            text: 'Sim. Não tenho mais forças para lutar.',
            hidePortrait: true,
            sanity: -30
        },
        {
            name: 'Luna',
            text: 'Isso é tudo que eu sempre quis! Seremos felizes para sempre! ♥',
            portrait: 'feliz'
        },
        {
            name: 'Narrador',
            text: 'Seis meses depois...',
            hidePortrait: true
        },
        {
            name: 'Narrador',
            text: 'Você nunca mais saiu daquela casa.',
            hidePortrait: true,
            sanity: -50
        },
        {
            next: 'cap2_telefone'
        }
    ],
    
    /* ==================== MINIJOGO: HACKING DO TELEFONE DE LUNA ==================== */
    
    cap2_telefone: [
        {
            name: 'Narrador',
            text: 'Você consegue pegar o telefone de Luna de seu bolso quando ela não está olhando.',
            hidePortrait: true,
            background: 'rua',
            sanity: -5
        },
        {
            name: 'Narrador',
            text: 'O telefone está bloqueado, mas você se lembra: Luna mencionou sobre seus hobbies uma vez...',
            hidePortrait: true
        },
        {
            name: 'Narrador',
            text: 'Talvez o código seja a data de quando vocês se conheceram?',
            hidePortrait: true
        },
        {
            minigame: {
                type: 'phoneHacking',
                correctCode: '1104',
                hint: 'Data especial para Luna',
                execute: (success) => {
                    if (success) {
                        game.loadScene('cap2_telefone_sucesso');
                    } else {
                        game.loadScene('cap2_telefone_fracasso');
                    }
                }
            },
            skipDialogue: true
        }
    ],
    
    cap2_telefone_sucesso: [
        {
            name: 'Narrador',
            text: 'DESBLOQUEADO! Você consegue acessar o telefone de Luna!',
            hidePortrait: true,
            sanity: 10,
            visualEffect: 'vignette'
        },
        {
            name: 'Narrador',
            text: '10.000 fotos suas em diferentes pastas nomeadas "Meu Amor", "Meu Príncipe", "Somente Meu"...',
            hidePortrait: true,
            sanity: -25
        },
        {
            name: 'Luna',
            text: '{playerName}... meu telefone...?',
            portrait: 'triste',
            sanity: -10
        },
        {
            choice: true,
            options: [
                {
                    text: '📞 Ligar para polícia AGORA',
                    next: 'cap2_policia',
                    effect: (state) => state.flags.chamoPolicia = true
                },
                {
                    text: '😟 Confrontar Luna sobre as fotos',
                    next: 'cap2_confronto_fotos'
                }
            ]
        }
    ],
    
    cap2_telefone_fracasso: [
        {
            name: 'Luna',
            text: 'O QUÊ?! Você está mexendo no meu telefone?!',
            portrait: 'yandere',
            sanity: -20
        },
        {
            name: 'Narrador',
            text: 'Luna arranca o telefone de sua mão com raiva.',
            hidePortrait: true,
            sanity: -15
        },
        {
            name: 'Luna',
            text: 'Você não confia em mim, {playerName}? Depois de tudo que faço por você?',
            portrait: 'dark',
            sanity: -10
        },
        {
            next: 'cap2_carro'
        }
    ],
    
    /* ==================== CENA: CONFRONTAÇÃO SOBRE AS FOTOS ==================== */
    
    cap2_confronto_fotos: [
        {
            name: 'Você',
            text: 'Luna, isso é loucura! Fotos de mim? Constantemente me vigiando?',
            hidePortrait: true,
            background: 'rua'
        },
        {
            name: 'Luna',
            text: 'Não é vigilância! É AMOR, {playerName}! Amor puro e absoluto!',
            portrait: 'yandere',
            sanity: -15
        },
        {
            name: 'Narrador',
            text: 'Luna começa a chorar e rir ao mesmo tempo. Seu comportamento fica cada vez mais instável.',
            hidePortrait: true,
            sanity: -10
        },
        {
            name: 'Luna',
            text: 'Você quer sair daqui? Quer me deixar? NINGUÉM me deixa, {playerName}.',
            portrait: 'dark',
            sanity: -20,
            music: 'terror'
        },
        {
            choice: true,
            options: [
                {
                    text: '🏃 Tentar correr para a porta',
                    next: 'cap2_fuga_carro',
                    effect: (state) => state.flags.tentouFugir = true
                },
                {
                    text: '💬 Tentar acalmar Luna',
                    next: 'cap2_dialologo_battle'
                }
            ]
        }
    ],
    
    /* ==================== MINIJOGO: DIALOGUE BATTLE ==================== */
    
    cap2_dialologo_battle: [
        {
            name: 'Narrador',
            text: 'Você tenta argumentar com Luna, apontando as inconsistências em seu pensamento...',
            hidePortrait: true,
            background: 'rua'
        },
        {
            minigame: {
                type: 'dialogueBattle',
                arguments: [
                    {
                        luna: 'Você é MINHA propriedade. A lei não importa para o amor verdadeiro.',
                        options: [
                            { text: 'O amor verdadeiro envolve consentimento mútuo.', correct: true },
                            { text: 'Você é a rainha do meu coração!', correct: false }
                        ]
                    },
                    {
                        luna: 'Se você tentar me deixar, vou me machucar!',
                        options: [
                            { text: 'Isso é manipulação emocional, Luna.', correct: true },
                            { text: 'Farei qualquer coisa se isso me ajudar!', correct: false }
                        ]
                    },
                    {
                        luna: 'Ninguém mais vai te amar como eu!',
                        options: [
                            { text: 'Amor saudável não funciona assim. Isso é obsessão.', correct: true },
                            { text: 'Você é a única para mim.', correct: false }
                        ]
                    }
                ]
            },
            skipDialogue: true
        },
        {
            name: 'Luna',
            text: '...',
            portrait: 'triste'
        },
        {
            name: 'Narrador',
            text: 'Por um momento, Luna parece refletir sobre suas palavras.',
            hidePortrait: true,
            sanity: 15
        },
        {
            choice: true,
            options: [
                {
                    text: '🏃 Correr para a porta AGORA!',
                    next: 'cap2_fuga_carro',
                    effect: (state) => state.flags.tentouFugir = true
                },
                {
                    text: '💭 Deixar Luna processar suas palavras',
                    next: 'cap2_momento_paz'
                }
            ]
        }
    ],
    
    cap2_momento_paz: [
        {
            name: 'Narrador',
            text: 'Você senta ao lado de Luna, esperando ela processar o que foi dito.',
            hidePortrait: true,
            background: 'rua',
            sanity: -5
        },
        {
            name: 'Luna',
            text: 'Eu... eu só quero que você me ame, {playerName}... Como é possível que isso seja errado?',
            portrait: 'normal',
            sanity: -10
        },
        {
            name: 'Você',
            text: 'Porque o amor verdadeiro respeita o outro. Não controla.',
            hidePortrait: true
        },
        {
            name: 'Luna',
            text: 'Talvez... talvez eu tenha problemas. Talvez eu precise de ajuda.',
            portrait: 'normal',
            sanity: 5
        },
        {
            next: 'cap2_policia'
        }
    ],
    
    /* ==================== CENA: CHAMANDO A POLÍCIA ==================== */
    
    cap2_policia: [
        {
            name: 'Você',
            text: 'Vou chamar a polícia, Luna. Você precisa de ajuda profissional.',
            hidePortrait: true,
            background: 'rua'
        },
        {
            name: 'Luna',
            text: 'NÃO! VOCÊ NÃO PODE ME DEIXAR! EU VOU MORRER SEM VOCÊ!',
            portrait: 'yandere',
            sanity: -30,
            music: 'terror',
            visualEffect: 'shake'
        },
        {
            name: 'Narrador',
            text: 'A polícia chega 20 minutos depois. Luna é levada para avaliação psiquiátrica.',
            hidePortrait: true,
            sanity: 30
        },
        {
            name: 'Você',
            text: '(Respirando profundamente) Finalmente livre... ou será que?',
            hidePortrait: true,
            sanity: -10
        },
        {
            next: 'final_fuga_sucesso'
        }
    ],
    
    /* ==================== MINIJOGO: FUGA DO CARRO ==================== */
    
    cap2_fuga_carro: [
        {
            name: 'Narrador',
            text: 'Você vê a porta destrancada por um breve momento. Esta é sua chance!',
            hidePortrait: true,
            background: 'rua'
        },
        {
            minigame: {
                type: 'memoryGame',
                pairs: 4,
                execute: (success) => {
                    if (success) {
                        game.loadScene('cap2_fuga_carro_sucesso');
                    } else {
                        game.loadScene('cap2_fuga_carro_fracasso');
                    }
                }
            },
            skipDialogue: true
        }
    ],
    
    cap2_fuga_carro_sucesso: [
        {
            name: 'Narrador',
            text: 'Sua mente fica alerta! Você consegue se lembrar exatamente do caminho para a polícia!',
            hidePortrait: true,
            background: 'rua',
            sanity: 20,
            visualEffect: 'vignette'
        },
        {
            name: 'Você',
            text: 'AGORA!',
            hidePortrait: true
        },
        {
            name: 'Narrador',
            text: 'Você salta do carro e corre em direção à delegacia de polícia que fica a dois quarteirões dali.',
            hidePortrait: true,
            sanity: 10
        },
        {
            name: 'Luna',
            text: '{playerName}! NÃO! VOLTE!',
            portrait: 'yandere',
            sanity: -20
        },
        {
            next: 'final_fuga_sucesso'
        }
    ],
    
    cap2_fuga_carro_fracasso: [
        {
            name: 'Narrador',
            text: 'Sua mente está confusa. Você não consegue se concentrar no caminho...',
            hidePortrait: true,
            background: 'rua',
            sanity: -30
        },
        {
            name: 'Luna',
            text: 'Não se preocupe, {playerName}. Você não precisa se lembrar. Você só precisa de mim.',
            portrait: 'feliz',
            sanity: -20
        },
        {
            name: 'Narrador',
            text: 'Conforme Luna dirige, você sente seus pensamentos ficando cada vez mais nublados.',
            hidePortrait: true,
            sanity: -30
        },
        {
            next: 'cap2_carona'
        }
    ],
    
    /* ==================== MINIJOGO: PROCURAR PISTAS NA CASA DE LUNA ==================== */
    
    cap2_casa_pistas: [
        {
            name: 'Narrador',
            text: 'Você consegue entrar na casa de Luna. É hora de procurar evidências contra ela.',
            hidePortrait: true,
            background: 'casa_luna',
            music: 'suspense'
        },
        {
            minigame: {
                type: 'observationChallenge',
                items: [
                    { symbol: '📔', label: 'Diário', x: 10, y: 20 },
                    { symbol: '📷', label: 'Câmera', x: 30, y: 40 },
                    { symbol: '🖼️', label: 'Teu Retrato', x: 50, y: 30 },
                    { symbol: '💍', label: 'Anel', x: 70, y: 50 },
                    { symbol: '🔐', label: 'Caixa Trancada', x: 80, y: 20 }
                ]
            },
            skipDialogue: true
        },
        {
            name: 'Narrador',
            text: 'Você encontrou tudo! Evidências suficientes para apresentar à polícia!',
            hidePortrait: true,
            sanity: 20
        },
        {
            next: 'cap2_policia'
        }
    ],
    
    /* ==================== FINAIS ==================== */
    
    final_ruim_1: [
        {
            ending: true,
            id: 'bad_ending_1',
            title: 'Final Ruim: Capturado',
            text: 'Você acordou em um quarto escuro. Correntes nos pulsos. Luna está sentada ao seu lado, acariciando seu rosto com um sorriso perturbador. "Agora você nunca mais vai me deixar", ela sussurra. E você sabe que ela está certa.',
            music: 'final'
        }
    ],
    
    final_ruim_2: [
        {
            ending: true,
            id: 'bad_ending_2',
            title: 'Final Ruim: Tragédia',
            text: 'Se você não podia ser dela... não seria de mais ninguém. A última coisa que você viu foi o sorriso triste de Luna. "Nos encontramos na próxima vida, meu amor", ela sussurrou.',
            music: 'final'
        }
    ],
    
    final_ruim_3: [
        {
            ending: true,
            id: 'bad_ending_3',
            title: 'Final Ruim: Revelação',
            text: 'Luna te mostrou o porão. Lá estavam... seus amigos. Ou o que restou deles. "Eles iam te tirar de mim", ela explicou calmamente. Você percebe que nunca vai sair vivo daqui.',
            music: 'final'
        }
    ],
    
    final_neutro: [
        {
            ending: true,
            id: 'neutral_ending',
            title: 'Final Neutro: Prisioneiro',
            text: 'Você desistiu de lutar. A casa virou sua prisão, Luna sua guardiã. Às vezes ela é gentil. Às vezes, não. Mas você aprendeu a não resistir. Sua sanidade? Isso é coisa do passado. Agora você só... existe.',
            music: 'final'
        }
    ],
    
    final_bom_vigilante: [
        {
            ending: true,
            id: 'good_ending_vigilant',
            title: 'Final Bom: Vigilante',
            text: 'Luna desapareceu, mas você permanece vigilante. A polícia continua procurando. Você mudou de casa três vezes. Às vezes, tarde da noite, você sente que está sendo observado. Mas você está seguro. Por enquanto.',
            music: 'final'
        }
    ],
    
    final_bom_terapia: [
        {
            ending: true,
            id: 'good_ending_therapy',
            title: 'Final Bom: Redenção',
            text: 'Com anos de terapia intensiva, Luna aprendeu sobre limites saudáveis e consentimento. Vocês mantêm contato à distância. Às vezes ela envia mensagens normais. Você acha que ela pode estar melhorando. Talvez haja esperança.',
            music: 'final'
        }
    ],
    
    final_fuga_sucesso: [
        {
            ending: true,
            id: 'good_ending_escape',
            title: 'Final Verdadeiro: Fuga',
            text: 'Você conseguiu! Enquanto Luna estava distraída, você pegou as chaves e fugiu. Você ligou para a polícia imediatamente. Luna foi presa e receberá tratamento psiquiátrico. Você está livre. Finalmente livre.',
            music: 'final'
        }
    ],
    
    final_secreto: [
        {
            ending: true,
            id: 'secret_ending',
            title: 'Final Secreto: Obsessão Mútua',
            text: 'Algo estranho aconteceu. Você percebe que talvez... talvez Luna não fosse a única obcecada. Você olha para o espelho e vê suas próprias fotos de Luna coladas na parede do seu quarto. Quando isso aconteceu? Quem é realmente a vítima aqui? A obsessão virou um jogo sem vencedores. Apenas duas almas perdidas, presas em um ciclo do qual nenhum deles consegue escapar. Talvez seja isso que significa verdadeiro amor.',
            music: 'final'
        }
    ]
};

/* ==================== CONFIGURAÇÃO DE PERSONAGENS ==================== */

const CHARACTERS = {
    luna: {
        name: 'Luna',
        portraits: {
            normal: 'assets/images/characters/luna/luna_normal.png',
            feliz: 'assets/images/characters/luna/luna_feliz.png',
            triste: 'assets/images/characters/luna/luna_triste.png',
            nervosa: 'assets/images/characters/luna/luna_nervosa.png',
            yandere: 'assets/images/characters/luna/luna_yandere.png',
            dark: 'assets/images/characters/luna/luna_dark.png',
            surprised: 'assets/images/characters/luna/luna_normal.png'
        }
    }
};

/* ==================== CONFIGURAÇÃO DE BACKGROUNDS ==================== */

const BACKGROUNDS = {
    rua: 'assets/images/backgrounds/bg_rua.jpg',
    sala_aula: 'assets/images/backgrounds/bg_sala_aula.jpg',
    casa_luna: 'assets/images/backgrounds/bg_casa_luna.jpg',
    porao: 'assets/images/backgrounds/bg_porao.jpg'
};