/* ==================== LUNA WANTS ME - AUDIO.JS ==================== */
/* Sistema de Áudio */

class AudioManager {
    static init() {
        console.log('🎵 Inicializando sistema de áudio...');
        
        this.bgm = null;
        this.currentMusic = '';
        this.sfxPool = {};
        
        this.config = {
            musicVolume: 0.5,
            sfxVolume: 0.7,
            musicEnabled: true,
            sfxEnabled: true
        };
        
        // Carregar configurações salvas
        this.loadConfig();
        
        console.log('✅ Sistema de áudio inicializado!');
    }
    
    /* ==================== MÚSICA DE FUNDO ==================== */
    
    static playMusic(musicName) {
        if (!this.config.musicEnabled) return;
        
        // Não recarregar a mesma música
        if (this.currentMusic === musicName && this.bgm && !this.bgm.paused) {
            return;
        }
        
        console.log(`🎵 Tocando música: ${musicName}`);
        
        // Parar música anterior
        if (this.bgm) {
            this.bgm.pause();
            this.bgm.currentTime = 0;
        }
        
        // Criar novo elemento de áudio
        const musicPath = this.getMusicPath(musicName);
        this.bgm = new Audio(musicPath);
        this.bgm.volume = this.config.musicVolume;
        this.bgm.loop = true;
        this.currentMusic = musicName;
        
        // Tentar tocar (vai falhar até o usuário interagir com a página)
        const playPromise = this.bgm.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Aguardar interação do usuário antes de reproduzir áudio
                const playOnUserInteraction = () => {
                    if (this.bgm && this.bgm.paused) {
                        this.bgm.play().catch(() => {
                            // Ignorar se ainda não puder reproduzir
                        });
                    }
                    document.removeEventListener('click', playOnUserInteraction);
                };
                document.addEventListener('click', playOnUserInteraction, { once: true });
            });
        }
    }
    
    static pauseMusic() {
        if (this.bgm && !this.bgm.paused) {
            this.bgm.pause();
        }
    }
    
    static resumeMusic() {
        if (this.bgm && this.bgm.paused) {
            this.bgm.play().catch(() => {
                // Ignorar erro - música será reproduzida quando o usuário interagir
            });
        }
    }
    
    static stopMusic() {
        if (this.bgm) {
            this.bgm.pause();
            this.bgm.currentTime = 0;
            this.currentMusic = '';
        }
    }
    
    static setMusicVolume(volume) {
        this.config.musicVolume = volume / 100;
        
        if (this.bgm) {
            this.bgm.volume = this.config.musicVolume;
        }
        
        this.saveConfig();
        console.log(`🔊 Volume da música: ${volume}%`);
    }
    
    /* ==================== EFEITOS SONOROS ==================== */
    
    static playSFX(sfxName) {
        if (!this.config.sfxEnabled) return;
        
        const sfxPath = this.getSFXPath(sfxName);
        
        // Criar novo elemento de áudio para SFX
        const sfx = new Audio(sfxPath);
        sfx.volume = this.config.sfxVolume;
        
        // Tocar e remover quando terminar
        sfx.play().catch(() => {
            // Ignorar erro - arquivo pode não existir ou política do navegador
        });
        
        sfx.addEventListener('ended', () => {
            sfx.remove();
        });
    }
    
    static setSfxVolume(volume) {
        this.config.sfxVolume = volume / 100;
        this.saveConfig();
        console.log(`🔊 Volume dos efeitos: ${volume}%`);
        
        // Tocar som de teste
        this.playSFX('click');
    }
    
    /* ==================== CAMINHOS DOS ARQUIVOS ==================== */
    
    static getMusicPath(musicName) {
        const musicPaths = {
            menu: 'assets/audio/music/bgm_menu.mp3',
            normal: 'assets/audio/music/bgm_normal.mp3',
            suspense: 'assets/audio/music/bgm_suspense.mp3',
            terror: 'assets/audio/music/bgm_terror.mp3',
            final: 'assets/audio/music/bgm_final.mp3'
        };
        
        // Retornar caminho ou placeholder
        return musicPaths[musicName] || this.createPlaceholderAudio();
    }
    
    static getSFXPath(sfxName) {
        const sfxPaths = {
            click: 'assets/audio/sfx/click.mp3',
            text: 'assets/audio/sfx/text_beep.mp3',
            heartbeat: 'assets/audio/sfx/heartbeat.mp3',
            door: 'assets/audio/sfx/door.mp3',
            footsteps: 'assets/audio/sfx/footsteps.mp3',
            glitch: 'assets/audio/sfx/glitch.mp3',
            scream: 'assets/audio/sfx/scream.mp3'
        };
        
        // Retornar caminho ou placeholder
        return sfxPaths[sfxName] || this.createPlaceholderAudio();
    }
    
    /* ==================== PLACEHOLDER PARA ÁUDIO AUSENTE ==================== */
    
    static createPlaceholderAudio() {
        // Criar um áudio silencioso como placeholder
        // Isso evita erros quando os arquivos de áudio não existem
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        gainNode.gain.value = 0; // Silencioso
        oscillator.frequency.value = 440;
        oscillator.type = 'sine';
        
        // Retornar data URL vazio
        return 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
    }
    
    /* ==================== CONFIGURAÇÕES ==================== */
    
    static toggleMusic() {
        this.config.musicEnabled = !this.config.musicEnabled;
        
        if (!this.config.musicEnabled) {
            this.pauseMusic();
        } else {
            this.resumeMusic();
        }
        
        this.saveConfig();
        console.log(`🎵 Música: ${this.config.musicEnabled ? 'Ativada' : 'Desativada'}`);
    }
    
    static toggleSFX() {
        this.config.sfxEnabled = !this.config.sfxEnabled;
        this.saveConfig();
        console.log(`🔊 Efeitos sonoros: ${this.config.sfxEnabled ? 'Ativados' : 'Desativados'}`);
    }
    
    static loadConfig() {
        const saved = localStorage.getItem('luna_audio_config');
        if (saved) {
            this.config = { ...this.config, ...JSON.parse(saved) };
            console.log('⚙️ Configurações de áudio carregadas');
        }
    }
    
    static saveConfig() {
        localStorage.setItem('luna_audio_config', JSON.stringify(this.config));
    }
    
    /* ==================== UTILITÁRIOS ==================== */
    
    static fadeOut(duration = 1000) {
        if (!this.bgm) return;
        
        const startVolume = this.bgm.volume;
        const fadeStep = startVolume / (duration / 50);
        
        const fadeInterval = setInterval(() => {
            if (this.bgm.volume > fadeStep) {
                this.bgm.volume -= fadeStep;
            } else {
                this.bgm.volume = 0;
                clearInterval(fadeInterval);
                this.stopMusic();
            }
        }, 50);
    }
    
    static fadeIn(duration = 1000) {
        if (!this.bgm) return;
        
        this.bgm.volume = 0;
        const targetVolume = this.config.musicVolume;
        const fadeStep = targetVolume / (duration / 50);
        
        const fadeInterval = setInterval(() => {
            if (this.bgm.volume < targetVolume - fadeStep) {
                this.bgm.volume += fadeStep;
            } else {
                this.bgm.volume = targetVolume;
                clearInterval(fadeInterval);
            }
        }, 50);
    }
    
    static crossfade(newMusicName, duration = 1000) {
        const oldBgm = this.bgm;
        
        // Fade out da música atual
        if (oldBgm) {
            const startVolume = oldBgm.volume;
            const fadeStep = startVolume / (duration / 50);
            
            const fadeOutInterval = setInterval(() => {
                if (oldBgm.volume > fadeStep) {
                    oldBgm.volume -= fadeStep;
                } else {
                    oldBgm.pause();
                    clearInterval(fadeOutInterval);
                }
            }, 50);
        }
        
        // Iniciar nova música com fade in
        setTimeout(() => {
            this.playMusic(newMusicName);
            this.fadeIn(duration);
        }, duration / 2);
    }
}