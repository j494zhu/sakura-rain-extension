class SakuraManager {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.width = 0;
        this.height = 0;
        this.petals = [];
        this.animationId = null;
        this.windTime = 0; 

        // * from popup UPDATE_CONFIG
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.type === 'UPDATE_CONFIG') {
                this.updateConfig(request.data);
            }
        });
    }

    updateConfig(data) {
        let needRecreate = false;
        for (let key in data) {
            // update config if it differents from current user data
            if (Config[key] !== undefined && Config[key] !== data[key]) {
                Config[key] = data[key];

                // reset all petals if any of petalCount, useStaticSize, gravity, rotationSpeed, windVariance has been changed
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

        // start petal animations!
        this.animate();
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
    }

    createPetals() {
        this.petals = [];
        for (let i = 0; i < Config.petalCount; i++) {
            this.petals.push(new SakuraPetal(this.width, this.height));
        }
    }

    // mian loop
    animate() {
        // clear canvas
        // set transparancy
        // windspeed
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.globalAlpha = Config.globalAlpha;
        let currentWind = Config.baseWindSpeed;

        if (!Config.useStaticWind) {
            // gust wind if non-static wind speed
            this.windTime += Config.windChangeSpeed;
            const windVariation = Math.sin(this.windTime) * Config.windMaxRange;
            currentWind += windVariation;
        }

        // upd petals
        for (const petal of this.petals) {
            petal.update(currentWind);
            petal.draw(this.ctx);
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}