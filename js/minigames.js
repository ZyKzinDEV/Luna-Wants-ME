/* ==================== LUNA WANTS ME - MINIGAMES.JS ==================== */
/* Sistema de Minijogos e Interações */

class MiniGames {
    
    /* ==================== INVESTIGAÇÃO - ENCONTRAR ITENS ==================== */
    
    static investigationGame(items, callback) {
        console.log('🔍 Iniciando jogo de investigação com', items.length, 'itens');
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'investigation-board';
        
        const title = document.createElement('h3');
        title.textContent = 'Procure pelos itens importantes!';
        gameBoard.appendChild(title);
        
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'investigation-items';
        
        let found = 0;
        
        items.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'investigation-item';
            itemEl.innerHTML = `
                <div class="item-placeholder">❓</div>
                <p class="item-hint">${item.hint}</p>
            `;
            
            itemEl.style.opacity = '0.7';
            let isFound = false;
            
            itemEl.onclick = () => {
                if (!isFound) {
                    isFound = true;
                    found++;
                    itemEl.style.opacity = '1';
                    itemEl.classList.add('found');
                    itemEl.innerHTML = `
                        <div class="item-found">${item.emoji}</div>
                        <p class="item-name">${item.name}</p>
                    `;
                    AudioManager.playSFX('click');
                    
                    // Mostrar descrição
                    UI.showDialogue(item.name, item.description);
                    
                    if (found === items.length) {
                        setTimeout(() => {
                            gameContainer.style.display = 'none';
                            if (callback) callback(true);
                        }, 1000);
                    }
                }
            };
            
            itemsContainer.appendChild(itemEl);
        });
        
        gameBoard.appendChild(itemsContainer);
        
        const progress = document.createElement('p');
        progress.className = 'investigation-progress';
        progress.textContent = `Encontrados: ${found}/${items.length}`;
        gameBoard.appendChild(progress);
        
        gameContainer.appendChild(gameBoard);
    }
    
    /* ==================== PUZZLE - SEQUÊNCIA DE CLIQUES ==================== */
    
    static sequencePuzzle(sequence, callback) {
        console.log('🎮 Iniciando puzzle de sequência com', sequence.length, 'passos');
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'sequence-puzzle-board';
        
        const title = document.createElement('h3');
        title.textContent = 'Reproduza a sequência!';
        gameBoard.appendChild(title);
        
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'sequence-buttons';
        
        let userSequence = [];
        let gameActive = true;
        
        const playSequence = async () => {
            gameActive = false;
            await new Promise(resolve => setTimeout(resolve, 500));
            
            for (let i = 0; i < sequence.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 600));
                const btn = buttonsContainer.children[sequence[i]];
                btn.classList.add('active');
                AudioManager.playSFX('click');
                await new Promise(resolve => setTimeout(resolve, 300));
                btn.classList.remove('active');
            }
            
            gameActive = true;
            userSequence = [];
        };
        
        sequence.forEach((_, index) => {
            const btn = document.createElement('button');
            btn.className = 'sequence-btn';
            btn.textContent = index + 1;
            btn.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa502'][index % 4];
            
            btn.onclick = () => {
                if (!gameActive) return;
                
                btn.classList.add('active');
                AudioManager.playSFX('click');
                userSequence.push(index);
                
                setTimeout(() => btn.classList.remove('active'), 200);
                
                // Verificar se está correto
                if (userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]) {
                    console.log('❌ Sequência errada!');
                    AudioManager.playSFX('error');
                    userSequence = [];
                    playSequence();
                    return;
                }
                
                // Se completou a sequência
                if (userSequence.length === sequence.length) {
                    console.log('✅ Sequência completa!');
                    gameActive = false;
                    AudioManager.playSFX('success');
                    
                    setTimeout(() => {
                        gameContainer.style.display = 'none';
                        if (callback) callback(true);
                    }, 500);
                }
            };
            
            buttonsContainer.appendChild(btn);
        });
        
        gameBoard.appendChild(buttonsContainer);
        gameContainer.appendChild(gameBoard);
        
        playSequence();
    }
    
    /* ==================== TESTE DE REFLEXOS ==================== */
    
    static reflexGame(duration = 10, callback) {
        console.log('⚡ Iniciando teste de reflexos por', duration, 'segundos');
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'reflex-game-board';
        
        const title = document.createElement('h3');
        title.textContent = 'Clique no alvo quando aparecer!';
        gameBoard.appendChild(title);
        
        const targetArea = document.createElement('div');
        targetArea.className = 'reflex-target-area';
        gameBoard.appendChild(targetArea);
        
        let score = 0;
        let timeLeft = duration;
        const timerDisplay = document.createElement('p');
        timerDisplay.className = 'reflex-timer';
        timerDisplay.textContent = `Tempo: ${timeLeft}s`;
        gameBoard.appendChild(timerDisplay);
        
        const scoreDisplay = document.createElement('p');
        scoreDisplay.className = 'reflex-score';
        scoreDisplay.textContent = `Pontos: ${score}`;
        gameBoard.appendChild(scoreDisplay);
        
        let gameActive = true;
        
        const spawnTarget = () => {
            if (!gameActive) return;
            
            const target = document.createElement('button');
            target.className = 'reflex-target';
            target.textContent = '●';
            
            const x = Math.random() * (targetArea.clientWidth - 50);
            const y = Math.random() * (targetArea.clientHeight - 50);
            target.style.left = x + 'px';
            target.style.top = y + 'px';
            
            targetArea.appendChild(target);
            
            target.onclick = (e) => {
                e.stopPropagation();
                score++;
                scoreDisplay.textContent = `Pontos: ${score}`;
                AudioManager.playSFX('click');
                target.remove();
                setTimeout(spawnTarget, 500);
            };
            
            setTimeout(() => {
                if (target.parentNode) target.remove();
                spawnTarget();
            }, 2000);
        };
        
        const timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Tempo: ${timeLeft}s`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                gameActive = false;
                targetArea.innerHTML = '';
                
                const result = document.createElement('p');
                result.textContent = `Seu Score: ${score}`;
                result.style.fontSize = '20px';
                result.style.marginTop = '20px';
                gameBoard.appendChild(result);
                
                setTimeout(() => {
                    gameContainer.style.display = 'none';
                    if (callback) callback(score >= 5);
                }, 1500);
            }
        }, 1000);
        
        gameContainer.appendChild(gameBoard);
        spawnTarget();
    }
    
    /* ==================== DECODIFICADOR - ANAGRAMA ==================== */
    
    static anagramGame(word, hint, callback) {
        console.log('🔤 Iniciando jogo de anagrama:', word);
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'anagram-board';
        
        const title = document.createElement('h3');
        title.textContent = 'Decodifique a palavra!';
        gameBoard.appendChild(title);
        
        const hintEl = document.createElement('p');
        hintEl.className = 'anagram-hint';
        hintEl.textContent = `Dica: ${hint}`;
        gameBoard.appendChild(hintEl);
        
        // Embaralhar a palavra
        const shuffled = word.split('').sort(() => Math.random() - 0.5).join('');
        
        const inputArea = document.createElement('div');
        inputArea.className = 'anagram-input';
        
        const scrambledEl = document.createElement('p');
        scrambledEl.textContent = `Letras: ${shuffled}`;
        scrambledEl.style.fontSize = '24px';
        scrambledEl.style.letterSpacing = '5px';
        inputArea.appendChild(scrambledEl);
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Digite a palavra...';
        input.className = 'anagram-input-field';
        inputArea.appendChild(input);
        
        gameBoard.appendChild(inputArea);
        
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Verificar';
        submitBtn.className = 'anagram-submit';
        
        submitBtn.onclick = () => {
            if (input.value.toLowerCase() === word.toLowerCase()) {
                console.log('✅ Resposta correta!');
                AudioManager.playSFX('success');
                gameContainer.style.display = 'none';
                if (callback) callback(true);
            } else {
                console.log('❌ Resposta errada');
                AudioManager.playSFX('error');
                input.style.borderColor = 'red';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 500);
            }
        };
        
        input.onkeypress = (e) => {
            if (e.key === 'Enter') submitBtn.click();
        };
        
        gameBoard.appendChild(submitBtn);
        gameContainer.appendChild(gameBoard);
        
        input.focus();
    }
    
    /* ==================== SANIDADE - TESTE DE ESCOLHAS ==================== */
    
    static sanityTest(scenario, options, callback) {
        console.log('🧠 Iniciando teste de sanidade');
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'sanity-test-board';
        
        const title = document.createElement('h3');
        title.textContent = 'Teste de Sanidade';
        gameBoard.appendChild(title);
        
        const scenarioEl = document.createElement('p');
        scenarioEl.className = 'sanity-scenario';
        scenarioEl.textContent = scenario;
        gameBoard.appendChild(scenarioEl);
        
        const choicesContainer = document.createElement('div');
        choicesContainer.className = 'sanity-choices';
        
        options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'sanity-choice-btn';
            btn.textContent = option.text;
            
            btn.onclick = () => {
                console.log('Escolha selecionada:', option.text);
                AudioManager.playSFX('click');
                gameContainer.style.display = 'none';
                if (callback) callback(option.sanityChange, option);
            };
            
            choicesContainer.appendChild(btn);
        });
        
        gameBoard.appendChild(choicesContainer);
        gameContainer.appendChild(gameBoard);
    }
    
    /* ==================== QTE - QUICK TIME EVENT ==================== */
    
    static quickTimeEvent(prompt, duration = 3000, callback) {
        console.log('⚡ QTE iniciado:', prompt);
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'qte-board';
        
        const promptEl = document.createElement('h2');
        promptEl.textContent = prompt;
        promptEl.className = 'qte-prompt';
        gameBoard.appendChild(promptEl);
        
        const timerEl = document.createElement('div');
        timerEl.className = 'qte-timer';
        gameBoard.appendChild(timerEl);
        
        const targetEl = document.createElement('div');
        targetEl.className = 'qte-target';
        targetEl.textContent = 'CLIQUE AQUI!';
        gameBoard.appendChild(targetEl);
        
        let succeeded = false;
        let timeLeft = duration;
        
        targetEl.onclick = () => {
            if (!succeeded) {
                succeeded = true;
                AudioManager.playSFX('click');
                targetEl.style.backgroundColor = '#2ecc71';
                targetEl.textContent = '✓ SUCESSO!';
                
                setTimeout(() => {
                    gameContainer.style.display = 'none';
                    if (callback) callback(true);
                }, 500);
            }
        };
        
        const timerInterval = setInterval(() => {
            timeLeft -= 100;
            const percent = Math.max(0, (timeLeft / duration) * 100);
            timerEl.style.width = percent + '%';
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                if (!succeeded) {
                    AudioManager.playSFX('error');
                    targetEl.style.backgroundColor = '#e74c3c';
                    targetEl.textContent = '✗ FALHOU!';
                    
                    setTimeout(() => {
                        gameContainer.style.display = 'none';
                        if (callback) callback(false);
                    }, 500);
                }
            }
        }, 100);
        
        gameContainer.appendChild(gameBoard);
    }
    
    /* ==================== LOGIC PUZZLE - ADIVINHAÇÃO ==================== */
    
    static logicPuzzle(puzzles, callback) {
        console.log('🧩 Iniciando puzzle lógico com', puzzles.length, 'perguntas');
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'logic-puzzle-board';
        
        let currentIndex = 0;
        let correctAnswers = 0;
        
        const showPuzzle = (index) => {
            if (index >= puzzles.length) {
                // Concluído
                gameContainer.innerHTML = '';
                const resultEl = document.createElement('div');
                resultEl.className = 'puzzle-result';
                resultEl.innerHTML = `
                    <h2>Resultado</h2>
                    <p>Você acertou ${correctAnswers}/${puzzles.length}</p>
                    <button onclick="document.getElementById('minigame-container').style.display = 'none'; if(window._puzzleCallback) window._puzzleCallback(${correctAnswers >= puzzles.length * 0.7})">Continuar</button>
                `;
                gameContainer.appendChild(resultEl);
                window._puzzleCallback = callback;
                return;
            }
            
            const puzzle = puzzles[index];
            gameBoard.innerHTML = `
                <div class="puzzle-progress">${index + 1}/${puzzles.length}</div>
                <h3>${puzzle.question}</h3>
                <div class="puzzle-options"></div>
            `;
            
            const optionsEl = gameBoard.querySelector('.puzzle-options');
            puzzle.options.forEach((option, optIndex) => {
                const btn = document.createElement('button');
                btn.className = 'puzzle-option-btn';
                btn.textContent = option;
                
                btn.onclick = () => {
                    if (optIndex === puzzle.correctIndex) {
                        correctAnswers++;
                        btn.style.backgroundColor = '#2ecc71';
                        AudioManager.playSFX('click');
                    } else {
                        btn.style.backgroundColor = '#e74c3c';
                        AudioManager.playSFX('error');
                    }
                    
                    // Desabilitar todos botões
                    document.querySelectorAll('.puzzle-option-btn').forEach(b => b.disabled = true);
                    
                    setTimeout(() => {
                        showPuzzle(index + 1);
                    }, 800);
                };
                
                optionsEl.appendChild(btn);
            });
        };
        
        showPuzzle(0);
        gameContainer.appendChild(gameBoard);
    }
    
    /* ==================== DIALOGUE CHOICE - RELACIONAMENTO ==================== */
    
    static relationshipChoice(character, scenario, options, callback) {
        console.log('💬 Escolha de relacionamento com', character);
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'relationship-choice-board';
        
        const characterEl = document.createElement('h2');
        characterEl.textContent = character;
        gameBoard.appendChild(characterEl);
        
        const scenarioEl = document.createElement('p');
        scenarioEl.className = 'relationship-scenario';
        scenarioEl.textContent = scenario;
        gameBoard.appendChild(scenarioEl);
        
        const optionsEl = document.createElement('div');
        optionsEl.className = 'relationship-options';
        
        options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'relationship-option-btn';
            
            const effectClass = option.effect > 0 ? 'positive' : option.effect < 0 ? 'negative' : 'neutral';
            const effectText = `${option.effect > 0 ? '+' : ''}${option.effect}`;
            
            btn.innerHTML = `
                <div class="option-text">${option.text}</div>
                <div class="option-effect effect-${effectClass}">${effectText}</div>
            `;
            
            btn.onclick = () => {
                AudioManager.playSFX('click');
                const relationshipChange = option.effect;
                game.modifyRelationship(character, relationshipChange);
                
                setTimeout(() => {
                    gameContainer.style.display = 'none';
                    if (callback) callback(option, relationshipChange);
                }, 500);
            };
            
            optionsEl.appendChild(btn);
        });
        
        gameBoard.appendChild(optionsEl);
        gameContainer.appendChild(gameBoard);
    }
    
    /* ==================== MEMORY GAME - MEMORIZAR PADRÕES ==================== */
    
    static memoryGame(pairs = 6, callback) {
        console.log('🧠 Memory Game iniciado com', pairs, 'pares');
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'memory-game-board';
        
        const title = document.createElement('h3');
        title.textContent = 'Encontre os Pares!';
        gameBoard.appendChild(title);
        
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'memory-cards';
        
        // Criar pares de cards
        const symbols = ['🌙', '💔', '👁️', '🖤', '✨', '⚡', '🔮', '💀'];
        const cards = [];
        for (let i = 0; i < pairs; i++) {
            cards.push(symbols[i]);
            cards.push(symbols[i]);
        }
        
        // Embaralhar
        cards.sort(() => Math.random() - 0.5);
        
        let flipped = [];
        let matched = 0;
        let gameActive = true;
        
        cards.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.innerHTML = '?';
            card.style.cursor = 'pointer';
            
            card.onclick = () => {
                if (!gameActive || flipped.length >= 2 || flipped.includes(index)) return;
                
                card.innerHTML = symbol;
                card.classList.add('flipped');
                flipped.push(index);
                AudioManager.playSFX('click');
                
                if (flipped.length === 2) {
                    gameActive = false;
                    const [first, second] = flipped;
                    
                    if (cards[first] === cards[second]) {
                        matched++;
                        AudioManager.playSFX('success');
                        
                        document.querySelectorAll('.memory-card').forEach(c => {
                            if (c.innerHTML !== '?' && c !== card) c.style.opacity = '0.5';
                        });
                        
                        if (matched === pairs) {
                            setTimeout(() => {
                                gameContainer.style.display = 'none';
                                if (callback) callback(true);
                            }, 500);
                            return;
                        }
                        
                        flipped = [];
                        gameActive = true;
                    } else {
                        AudioManager.playSFX('error');
                        setTimeout(() => {
                            cards.forEach((_, i) => {
                                if (!flipped.includes(i)) return;
                                const c = cardsContainer.children[i];
                                c.innerHTML = '?';
                                c.classList.remove('flipped');
                            });
                            flipped = [];
                            gameActive = true;
                        }, 1000);
                    }
                }
            };
            
            cardsContainer.appendChild(card);
        });
        
        gameBoard.appendChild(cardsContainer);
        gameContainer.appendChild(gameBoard);
    }
    
    /* ==================== DIALOGUE BATTLE - ARGUMENTAÇÃO ==================== */
    
    static dialogueBattle(arguments_list, callback) {
        console.log('⚔️ Dialogue Battle iniciado');
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'dialogue-battle-board';
        
        const title = document.createElement('h3');
        title.textContent = 'Refute os Argumentos!';
        gameBoard.appendChild(title);
        
        const scenarioEl = document.createElement('p');
        scenarioEl.className = 'battle-scenario';
        scenarioEl.style.fontSize = '16px';
        scenarioEl.style.marginBottom = '20px';
        gameBoard.appendChild(scenarioEl);
        
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'battle-options';
        gameBoard.appendChild(buttonsContainer);
        
        let currentIndex = 0;
        let correctAnswers = 0;
        let gameActive = true;
        
        const showArgument = (index) => {
            if (index >= arguments_list.length) {
                gameActive = false;
                buttonsContainer.innerHTML = '';
                
                const resultEl = document.createElement('div');
                resultEl.className = 'battle-result';
                resultEl.innerHTML = `
                    <h3>Resultado da Discussão</h3>
                    <p>Você refutou ${correctAnswers}/${arguments_list.length} argumentos!</p>
                    <button onclick="document.getElementById('minigame-container').style.display = 'none'; if(window._battleCallback) window._battleCallback(${correctAnswers >= arguments_list.length * 0.6})">Continuar</button>
                `;
                gameBoard.appendChild(resultEl);
                window._battleCallback = callback;
                return;
            }
            
            const arg = arguments_list[index];
            scenarioEl.textContent = `Luna diz: "${arg.luna}"`;
            buttonsContainer.innerHTML = '';
            
            arg.options.forEach((option, optIndex) => {
                const btn = document.createElement('button');
                btn.className = 'battle-option-btn';
                btn.textContent = option.text;
                
                btn.onclick = () => {
                    if (option.correct) {
                        correctAnswers++;
                        btn.style.backgroundColor = '#2ecc71';
                        btn.style.color = '#fff';
                        AudioManager.playSFX('success');
                    } else {
                        btn.style.backgroundColor = '#e74c3c';
                        btn.style.color = '#fff';
                        AudioManager.playSFX('error');
                    }
                    
                    document.querySelectorAll('.battle-option-btn').forEach(b => b.disabled = true);
                    
                    setTimeout(() => {
                        showArgument(index + 1);
                    }, 900);
                };
                
                buttonsContainer.appendChild(btn);
            });
        };
        
        showArgument(0);
    }
    
    /* ==================== OBSERVATION CHALLENGE - ENCONTRAR DIFERENÇAS ==================== */
    
    static observationChallenge(items, callback) {
        console.log('🔍 Observation Challenge com', items.length, 'itens');
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'observation-board';
        
        const title = document.createElement('h3');
        title.textContent = 'Encontre o que mudou!';
        gameBoard.appendChild(title);
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'observation-images';
        
        // Imagem base
        const baseImg = document.createElement('div');
        baseImg.className = 'base-image';
        baseImg.innerHTML = items.map(item => `
            <div class="observation-item" style="position: absolute; left: ${item.x}%; top: ${item.y}%;">
                ${item.symbol} ${item.label}
            </div>
        `).join('');
        
        imageContainer.appendChild(baseImg);
        
        // Imagem com diferenças
        const diffImg = document.createElement('div');
        diffImg.className = 'diff-image';
        const changedItems = items.map((item, idx) => {
            const changed = Math.random() > 0.5;
            return {
                ...item,
                changed,
                original_symbol: item.symbol,
                symbol: changed ? '❓' : item.symbol
            };
        });
        
        diffImg.innerHTML = changedItems.map(item => `
            <div class="observation-item" style="position: absolute; left: ${item.x}%; top: ${item.y}%;">
                ${item.symbol} ${item.label}
            </div>
        `).join('');
        
        let found = 0;
        const totalDifferences = changedItems.filter(i => i.changed).length;
        
        // Adicionar clicáveis à imagem de diferenças
        diffImg.querySelectorAll('.observation-item').forEach((element, index) => {
            if (changedItems[index].changed) {
                element.style.cursor = 'pointer';
                element.onclick = (e) => {
                    e.stopPropagation();
                    element.innerHTML = changedItems[index].original_symbol + ' ' + changedItems[index].label;
                    element.style.cursor = 'default';
                    element.onclick = null;
                    found++;
                    AudioManager.playSFX('click');
                    
                    if (found === totalDifferences) {
                        setTimeout(() => {
                            gameContainer.style.display = 'none';
                            if (callback) callback(true);
                        }, 500);
                    }
                };
            }
        });
        
        imageContainer.appendChild(diffImg);
        gameBoard.appendChild(imageContainer);
        
        const infoEl = document.createElement('p');
        infoEl.textContent = `Diferenças encontradas: ${found}/${totalDifferences}`;
        gameBoard.appendChild(infoEl);
        
        gameContainer.appendChild(gameBoard);
    }
    
    /* ==================== PHONE HACKING - DECODIFICADOR ==================== */
    
    static phoneHacking(correctCode, hint, callback) {
        console.log('📱 Phone Hacking iniciado. Código:', correctCode);
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'phone-hacking-board';
        
        const title = document.createElement('h3');
        title.textContent = 'Desbloqueie o Telefone!';
        gameBoard.appendChild(title);
        
        const hintEl = document.createElement('p');
        hintEl.className = 'phone-hint';
        hintEl.textContent = `Dica: ${hint}`;
        gameBoard.appendChild(hintEl);
        
        // Simulação de tela de telefone
        const screenEl = document.createElement('div');
        screenEl.className = 'phone-screen';
        screenEl.textContent = '🔒 BLOQUEADO';
        gameBoard.appendChild(screenEl);
        
        const codeInputEl = document.createElement('input');
        codeInputEl.type = 'password';
        codeInputEl.placeholder = 'Digite o código...';
        codeInputEl.className = 'phone-code-input';
        codeInputEl.maxLength = correctCode.length;
        gameBoard.appendChild(codeInputEl);
        
        const keypadContainer = document.createElement('div');
        keypadContainer.className = 'phone-keypad';
        
        // Criar teclado
        for (let i = 0; i <= 9; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = 'phone-key';
            btn.onclick = () => {
                if (codeInputEl.value.length < correctCode.length) {
                    codeInputEl.value += i;
                    AudioManager.playSFX('click');
                    checkCode();
                }
            };
            keypadContainer.appendChild(btn);
        }
        
        gameBoard.appendChild(keypadContainer);
        
        const clearBtn = document.createElement('button');
        clearBtn.textContent = 'LIMPAR';
        clearBtn.className = 'phone-clear-btn';
        clearBtn.onclick = () => {
            codeInputEl.value = '';
            screenEl.textContent = '🔒 BLOQUEADO';
            screenEl.style.color = '#fff';
            AudioManager.playSFX('click');
        };
        gameBoard.appendChild(clearBtn);
        
        const checkCode = () => {
            if (codeInputEl.value.length === correctCode.length) {
                if (codeInputEl.value === correctCode) {
                    screenEl.textContent = '✓ DESBLOQUEADO';
                    screenEl.style.color = '#2ecc71';
                    codeInputEl.disabled = true;
                    document.querySelectorAll('.phone-key').forEach(btn => btn.disabled = true);
                    clearBtn.disabled = true;
                    AudioManager.playSFX('success');
                    
                    setTimeout(() => {
                        gameContainer.style.display = 'none';
                        if (callback) callback(true);
                    }, 1000);
                } else {
                    screenEl.textContent = '✗ ERRO!';
                    screenEl.style.color = '#e74c3c';
                    codeInputEl.value = '';
                    AudioManager.playSFX('error');
                    
                    setTimeout(() => {
                        screenEl.textContent = '🔒 BLOQUEADO';
                        screenEl.style.color = '#fff';
                    }, 800);
                }
            }
        };
        
        gameContainer.appendChild(gameBoard);
        codeInputEl.focus();
    }
    
    /* ==================== RHYTHM GAME - ESCAPE DO PERIGO ==================== */
    
    static rhythmGame(callback) {
        console.log('🎵 Iniciando Rhythm Game - Fuga!');
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'flex';
        gameContainer.style.flexDirection = 'column';
        gameContainer.style.alignItems = 'center';
        gameContainer.style.justifyContent = 'center';
        gameContainer.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        gameContainer.style.color = '#fff';
        gameContainer.style.padding = '40px';
        gameContainer.style.minHeight = '400px';
        
        const gameBoard = document.createElement('div');
        gameBoard.style.textAlign = 'center';
        gameBoard.style.color = '#fff';
        
        const title = document.createElement('h2');
        title.textContent = '🎵 ESCAPE! ACOMPANHE O RITMO!';
        title.style.marginBottom = '30px';
        title.style.fontSize = '24px';
        title.style.color = '#00ff00';
        gameBoard.appendChild(title);
        
        const instruction = document.createElement('p');
        instruction.textContent = 'Pressione as teclas quando o símbolo aparecer: ⬆️ (W), ⬇️ (S), ⬅️ (A), ➡️ (D)';
        instruction.style.marginBottom = '40px';
        instruction.style.fontSize = '14px';
        gameBoard.appendChild(instruction);
        
        const rhythmContainer = document.createElement('div');
        rhythmContainer.style.display = 'flex';
        rhythmContainer.style.justifyContent = 'space-around';
        rhythmContainer.style.alignItems = 'flex-end';
        rhythmContainer.style.height = '200px';
        rhythmContainer.style.marginBottom = '40px';
        rhythmContainer.style.backgroundColor = '#0a0e27';
        rhythmContainer.style.borderRadius = '10px';
        rhythmContainer.style.padding = '20px';
        
        const lanes = { up: [], down: [], left: [], right: [] };
        const laneKeys = { w: 'up', s: 'down', a: 'left', d: 'right' };
        const directionSymbols = { up: '⬆️', down: '⬇️', left: '⬅️', right: '➡️' };
        
        // Criar lanes
        Object.keys(lanes).forEach(direction => {
            const lane = document.createElement('div');
            lane.style.width = '60px';
            lane.style.height = '150px';
            lane.style.backgroundColor = '#1e3a5f';
            lane.style.borderRadius = '5px';
            lane.style.border = '2px solid #00ff00';
            lane.style.position = 'relative';
            lane.style.overflow = 'hidden';
            lane.dataset.direction = direction;
            rhythmContainer.appendChild(lane);
        });
        
        gameBoard.appendChild(rhythmContainer);
        
        const scoreEl = document.createElement('div');
        scoreEl.style.fontSize = '20px';
        scoreEl.style.marginBottom = '20px';
        scoreEl.innerHTML = `<span style="color: #00ff00;">✓ Acertos: 0</span> | <span style="color: #ff0000;">✗ Erros: 0</span>`;
        gameBoard.appendChild(scoreEl);
        
        let score = 0;
        let errors = 0;
        let totalNotes = 8;
        let notesHit = 0;
        let maxErrors = 3;
        
        const notes = [];
        let timeOffset = 0;
        
        // Gerar notas do ritmo
        const generateNotes = () => {
            const directions = ['up', 'down', 'left', 'right'];
            for (let i = 0; i < totalNotes; i++) {
                notes.push({
                    direction: directions[Math.floor(Math.random() * directions.length)],
                    time: i * 500 + 300,
                    hit: false
                });
            }
        };
        
        generateNotes();
        
        const createNoteElement = (direction, time) => {
            setTimeout(() => {
                const lanes = rhythmContainer.querySelectorAll('div');
                let targetLane = null;
                lanes.forEach(lane => {
                    if (lane.dataset.direction === direction) {
                        targetLane = lane;
                    }
                });
                
                if (targetLane) {
                    const note = document.createElement('div');
                    note.style.width = '50px';
                    note.style.height = '50px';
                    note.style.backgroundColor = '#00ff00';
                    note.style.borderRadius = '50%';
                    note.style.position = 'absolute';
                    note.style.top = '0';
                    note.style.left = '5px';
                    note.style.fontSize = '20px';
                    note.style.display = 'flex';
                    note.style.alignItems = 'center';
                    note.style.justifyContent = 'center';
                    note.textContent = directionSymbols[direction];
                    note.className = 'rhythm-note';
                    note.dataset.direction = direction;
                    note.dataset.hit = 'false';
                    
                    targetLane.appendChild(note);
                    
                    // Animar falling
                    let position = 0;
                    const moveInterval = setInterval(() => {
                        position += 3;
                        note.style.top = position + 'px';
                        
                        if (position > 150) {
                            clearInterval(moveInterval);
                            if (note.dataset.hit === 'false') {
                                errors++;
                                scoreEl.innerHTML = `<span style="color: #00ff00;">✓ Acertos: ${score}</span> | <span style="color: #ff0000;">✗ Erros: ${errors}</span>`;
                                if (errors >= maxErrors) {
                                    endGame(false);
                                }
                            }
                            note.remove();
                        }
                    }, 10);
                }
            }, time);
        };
        
        // Gerar todas as notas
        notes.forEach(note => {
            createNoteElement(note.direction, note.time);
        });
        
        // Event listeners para input
        const handleKeyPress = (e) => {
            const key = e.key.toLowerCase();
            if (laneKeys[key]) {
                const direction = laneKeys[key];
                const hitNotes = rhythmContainer.querySelectorAll(`.rhythm-note[data-direction="${direction}"][data-hit="false"]`);
                
                if (hitNotes.length > 0) {
                    const note = hitNotes[0];
                    const notePosition = parseInt(note.style.top);
                    
                    // Verificar se está na zona de acerto (125-175px)
                    if (notePosition > 100 && notePosition < 180) {
                        note.dataset.hit = 'true';
                        note.style.backgroundColor = '#ffff00';
                        note.style.boxShadow = '0 0 20px #ffff00';
                        score++;
                        notesHit++;
                        scoreEl.innerHTML = `<span style="color: #00ff00;">✓ Acertos: ${score}</span> | <span style="color: #ff0000;">✗ Erros: ${errors}</span>`;
                        AudioManager.playSFX('success');
                        
                        setTimeout(() => note.remove(), 200);
                        
                        if (notesHit >= totalNotes) {
                            endGame(true);
                        }
                    } else {
                        errors++;
                        scoreEl.innerHTML = `<span style="color: #00ff00;">✓ Acertos: ${score}</span> | <span style="color: #ff0000;">✗ Erros: ${errors}</span>`;
                        AudioManager.playSFX('error');
                        if (errors >= maxErrors) {
                            endGame(false);
                        }
                    }
                }
            }
        };
        
        const endGame = (success) => {
            document.removeEventListener('keypress', handleKeyPress);
            gameContainer.style.display = 'none';
            if (callback) callback(success);
        };
        
        document.addEventListener('keypress', handleKeyPress);
        gameContainer.appendChild(gameBoard);
    }
    
    /* ==================== HACKING GAME - QUEBRAR SENHA ==================== */
    
    static hackingGame(correctCode, attempts = 5, callback) {
        console.log('🔓 Hacking Game iniciado');
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'hacking-board';
        gameBoard.style.cssText = `
            background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
            border: 2px solid #00ff00;
            border-radius: 10px;
            padding: 30px;
            text-align: center;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.5), inset 0 0 20px rgba(0, 255, 0, 0.1);
        `;
        
        const title = document.createElement('h3');
        title.textContent = '⚙️ SISTEMA DE ACESSO BLOQUEADO';
        title.style.cssText = 'color: #00ff00; margin-bottom: 20px; text-shadow: 0 0 10px #00ff00;';
        gameBoard.appendChild(title);
        
        const hint = document.createElement('p');
        hint.textContent = `Insira a senha correta (${correctCode.length} dígitos)`;
        hint.style.cssText = 'color: #00ff00; margin-bottom: 20px; font-size: 14px;';
        gameBoard.appendChild(hint);
        
        const inputDiv = document.createElement('div');
        inputDiv.style.cssText = 'margin: 20px 0;';
        
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.maxLength = correctCode.length;
        inputField.style.cssText = `
            background: rgba(0, 255, 0, 0.1);
            border: 2px solid #00ff00;
            color: #00ff00;
            padding: 12px;
            font-size: 18px;
            text-align: center;
            font-family: 'Courier New', monospace;
            width: 200px;
            border-radius: 5px;
            font-weight: bold;
            letter-spacing: 3px;
        `;
        inputDiv.appendChild(inputField);
        gameBoard.appendChild(inputDiv);
        
        const attemptsEl = document.createElement('p');
        attemptsEl.style.cssText = 'color: #ff6600; font-size: 14px; margin: 10px 0;';
        attemptsEl.textContent = `Tentativas restantes: ${attempts}`;
        gameBoard.appendChild(attemptsEl);
        
        const feedbackEl = document.createElement('p');
        feedbackEl.style.cssText = 'color: #ffff00; margin-top: 15px; min-height: 20px; font-size: 14px;';
        gameBoard.appendChild(feedbackEl);
        
        let attemptsLeft = attempts;
        
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const input = inputField.value.trim();
                
                if (input === correctCode) {
                    feedbackEl.textContent = '✓ SENHA CORRETA! Acesso concedido!';
                    feedbackEl.style.color = '#00ff00';
                    inputField.disabled = true;
                    AudioManager.playSFX('success');
                    
                    setTimeout(() => {
                        gameContainer.style.display = 'none';
                        if (callback) callback(true);
                    }, 1500);
                } else {
                    attemptsLeft--;
                    attemptsEl.textContent = `Tentativas restantes: ${attemptsLeft}`;
                    feedbackEl.textContent = '✗ Senha incorreta!';
                    feedbackEl.style.color = '#ff0000';
                    inputField.value = '';
                    AudioManager.playSFX('error');
                    
                    if (attemptsLeft <= 0) {
                        feedbackEl.textContent = '✗ Sistema bloqueado!';
                        inputField.disabled = true;
                        
                        setTimeout(() => {
                            gameContainer.style.display = 'none';
                            if (callback) callback(false);
                        }, 1500);
                    }
                }
            }
        });
        
        gameContainer.appendChild(gameBoard);
        inputField.focus();
    }
    
    /* ==================== SIMON GAME - PADRÃO LUMINOSO ==================== */
    
    static simonGame(callback) {
        console.log('🎨 Simon Game iniciado');
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.className = 'simon-board';
        gameBoard.style.cssText = `
            background: radial-gradient(circle, #2a2a4a 0%, #1a1a2a 100%);
            border: 3px solid #ff00ff;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 0 30px rgba(255, 0, 255, 0.5), inset 0 0 20px rgba(255, 0, 255, 0.1);
        `;
        
        const title = document.createElement('h3');
        title.textContent = '🎮 SIMON - Siga o Padrão';
        title.style.cssText = 'color: #ff00ff; margin-bottom: 30px; text-shadow: 0 0 10px #ff00ff;';
        gameBoard.appendChild(title);
        
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(2, 80px);
            gap: 15px;
            justify-content: center;
            margin-bottom: 30px;
        `;
        
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
        const buttons = [];
        
        colors.forEach((color) => {
            const btn = document.createElement('button');
            btn.style.cssText = `
                width: 80px;
                height: 80px;
                border-radius: 50%;
                border: 2px solid ${color};
                background: rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.3);
                cursor: pointer;
                transition: all 0.1s;
                box-shadow: 0 0 10px ${color};
            `;
            
            btn.addEventListener('click', () => {
                btn.style.background = color;
                btn.style.boxShadow = `0 0 20px ${color}`;
                AudioManager.playSFX('click');
                userSequence.push(color);
                checkSequence();
                
                setTimeout(() => {
                    btn.style.background = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.3)`;
                    btn.style.boxShadow = `0 0 10px ${color}`;
                }, 200);
            });
            
            buttons.push(btn);
            buttonsContainer.appendChild(btn);
        });
        
        gameBoard.appendChild(buttonsContainer);
        
        const levelEl = document.createElement('p');
        levelEl.style.cssText = 'color: #00ff00; font-size: 18px; margin: 10px 0;';
        gameBoard.appendChild(levelEl);
        
        const statusEl = document.createElement('p');
        statusEl.style.cssText = 'color: #ffff00; font-size: 14px;';
        statusEl.textContent = 'Observe a sequência...';
        gameBoard.appendChild(statusEl);
        
        let sequence = [];
        let userSequence = [];
        let level = 1;
        let gameActive = false;
        
        const playColor = async (color) => {
            const btn = buttons[colors.indexOf(color)];
            btn.style.background = color;
            btn.style.boxShadow = `0 0 30px ${color}`;
            AudioManager.playSFX('click');
            await new Promise(r => setTimeout(r, 400));
            btn.style.background = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.3)`;
            btn.style.boxShadow = `0 0 10px ${color}`;
            await new Promise(r => setTimeout(r, 200));
        };
        
        const playSequence = async () => {
            gameActive = false;
            for (let color of sequence) {
                await playColor(color);
            }
            gameActive = true;
            userSequence = [];
            statusEl.textContent = 'Sua vez! Clique nos botões';
        };
        
        const checkSequence = () => {
            if (userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]) {
                statusEl.textContent = `✗ Game Over! Nível: ${level}`;
                statusEl.style.color = '#ff0000';
                gameActive = false;
                setTimeout(() => {
                    gameContainer.style.display = 'none';
                    if (callback) callback(level > 2);
                }, 1500);
                return;
            }
            
            if (userSequence.length === sequence.length) {
                level++;
                sequence.push(colors[Math.floor(Math.random() * colors.length)]);
                levelEl.textContent = `Nível: ${level}`;
                setTimeout(playSequence, 800);
            }
        };
        
        gameContainer.appendChild(gameBoard);
        
        // Iniciar jogo
        sequence.push(colors[Math.floor(Math.random() * colors.length)]);
        levelEl.textContent = `Nível: ${level}`;
        playSequence();
    }
    
    /* ==================== CHOICE CONSEQUENCE - EFEITO NA HISTÓRIA ==================== */
    
    static moralChoice(scenario, options, callback) {
        console.log('⚖️ Moral Choice iniciado');
        
        const gameContainer = document.getElementById('minigame-container');
        gameContainer.innerHTML = '';
        gameContainer.style.display = 'block';
        
        const gameBoard = document.createElement('div');
        gameBoard.style.cssText = `
            background: linear-gradient(135deg, rgba(10, 0, 20, 0.98), rgba(30, 5, 25, 0.95));
            border: 2px solid rgba(255, 0, 110, 0.6);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 0, 110, 0.3);
            backdrop-filter: blur(10px);
        `;
        
        const title = document.createElement('h3');
        title.textContent = '⚖️ ESCOLHA IMPORTANTE';
        title.style.cssText = `
            color: #ff006e;
            font-size: 24px;
            margin-bottom: 20px;
            text-shadow: 0 0 10px rgba(255, 0, 110, 0.8);
        `;
        gameBoard.appendChild(title);
        
        const scenarioEl = document.createElement('p');
        scenarioEl.textContent = scenario;
        scenarioEl.style.cssText = `
            color: #ffffff;
            font-size: 16px;
            margin-bottom: 30px;
            line-height: 1.6;
        `;
        gameBoard.appendChild(scenarioEl);
        
        const optionsContainer = document.createElement('div');
        optionsContainer.style.cssText = 'display: flex; flex-direction: column; gap: 15px;';
        
        options.forEach((option, idx) => {
            const btn = document.createElement('button');
            btn.style.cssText = `
                padding: 18px 25px;
                font-size: 16px;
                background: linear-gradient(90deg, rgba(255, 0, 110, 0.25), rgba(255, 0, 110, 0.1));
                border: 2px solid rgba(255, 0, 110, 0.6);
                color: #ffffff;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                font-weight: 600;
            `;
            
            btn.textContent = `${option.icon} ${option.text}`;
            
            btn.addEventListener('mouseover', () => {
                btn.style.background = 'linear-gradient(90deg, rgba(255, 0, 110, 0.45), rgba(255, 0, 110, 0.25))';
                btn.style.boxShadow = '0 0 30px rgba(255, 0, 110, 0.6)';
                btn.style.transform = 'translateX(10px)';
            });
            
            btn.addEventListener('mouseout', () => {
                btn.style.background = 'linear-gradient(90deg, rgba(255, 0, 110, 0.25), rgba(255, 0, 110, 0.1))';
                btn.style.boxShadow = 'none';
                btn.style.transform = 'translateX(0)';
            });
            
            btn.addEventListener('click', () => {
                btn.disabled = true;
                btn.style.background = 'rgba(255, 0, 110, 0.5)';
                AudioManager.playSFX('click');
                
                setTimeout(() => {
                    gameContainer.style.display = 'none';
                    if (callback) callback(option.consequence);
                }, 800);
            });
            
            optionsContainer.appendChild(btn);
        });
        
        gameBoard.appendChild(optionsContainer);
        gameContainer.appendChild(gameBoard);
    }
}

// Verificar se o AudioManager existe (para compatibilidade)
if (typeof AudioManager === 'undefined') {
    console.warn('⚠️ AudioManager não carregado ainda');
}