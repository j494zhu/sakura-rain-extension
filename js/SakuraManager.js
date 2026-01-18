class SakuraManager {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.width = 0;
        this.height = 0;
        this.petals = [];
        this.animationId = null;
        this.windTime = 0;
        this.noise = new Noise();

        // * from popup UPDATE_CONFIG
        if (typeof chrome !== 'undefined' && chrome.runtime) {
             chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                if (request.type === 'UPDATE_CONFIG') {
                    this.updateConfig(request.data);
                }
            });
        }
    }

    updateConfig(data) {
        let needRecreate = false;
        for (let key in data) {
            if (Config[key] !== undefined && Config[key] !== data[key]) {
                Config[key] = data[key];

                if (['petalCount', 'useStaticSize', 'staticSize', 'gravity', 'rotationSpeed', 'windVariance'].includes(key)) {
                    needRecreate = true;
                }
            }
        }

        if (data.globalAlpha !== undefined) {
            Config.globalAlpha = data.globalAlpha;
        }

        if (needRecreate) {
            this.createPetals();
        }
    }

    init() {
        this.createCanvas();
        this.resize();
        this.createPetals();

        window.addEventListener('resize', () => {
            this.resize();
        });

        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';

        document.body.appendChild(this.canvas);
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        if (this.petals) {
            for (const petal of this.petals) {
                petal.canvasWidth = this.width;
                petal.canvasHeight = this.height;
            }
        }
    }

    createPetals() {
        this.petals = [];
        for (let i = 0; i < Config.petalCount; i++) {
            this.petals.push(new SakuraPetal(this.width, this.height));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.globalAlpha = Config.globalAlpha;
        
        let currentWind = Config.baseWindSpeed;

        if (!Config.useStaticWind) {
            this.windTime += Config.windChangeSpeed;
            
            // Noise Logic Starts
            const rawNoise = this.noise.get_value(this.windTime); // 0 to 1
            let windDirection = (rawNoise * 2) - 1;  // -1 to 1
            
            // Apply Power Curve (Gustiness)
            const mi = 1.6;
            windDirection = Math.sign(windDirection) * Math.pow(Math.abs(windDirection), mi);
            
            const windVar = windDirection * Config.windMaxRange;
            currentWind += windVar;
        }

        for (const petal of this.petals) {
            petal.update(currentWind);
            petal.draw(this.ctx);
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}