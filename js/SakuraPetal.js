class SakuraPetal {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.reset(true); 
    }

    reset(initial = false) {
        // make sure there are petals on the corners even if the wind is fast
        const buffer = 500; 
        this.x = randomRange(-buffer, this.canvasWidth + buffer);

        if (initial) {
            this.y = randomRange(0, this.canvasHeight);
        } else {
            // when reset: 
            // If x is generated far to the left or right of the screen, -500 ~ -100 or width + 100 ~ width + 500:
            // allow it to  randomly in the height direction
            if (this.x < -100 || this.x > this.canvasWidth + 100) {
                this.y = randomRange(0, this.canvasHeight);
            } else {
                // fall from the top
                this.y = -Config.staticSize; 
            }
        }

        if (Config.useStaticSize) {
            this.size = Config.staticSize;
        } else {
            this.size = randomChoice(Config.sizeVariants);
        }

        this.color = randomChoice(Config.colors);

        this.gravity = Config.gravity * (this.size / 20);
        
        this.windDelta = randomRange(-Config.windVariance, Config.windVariance);

        this.rotation = randomRange(0, Math.PI * 2);

        this.rotationSpeed = randomRange(Config.rotationSpeed * 0.5, Config.rotationSpeed * 1.5);
        
        this.flip = 0;
        this.flipSpeed = randomRange(0.01, 0.03);

        // set initial phase for each petal
        this.swayPhase = randomRange(0, Math.PI * 2);
    }

    update(currentWind) {
        // swaying
        this.swayPhase += 0.02; 
        const sway = Math.sin(this.swayPhase) * Config.swayAmplitude;

        // upd position
        this.x += currentWind + this.windDelta + sway;
        this.y += this.gravity;

        this.rotation += this.rotationSpeed;
        this.flip += this.flipSpeed;

        if (this.y > this.canvasHeight + 50 || 
            this.x > this.canvasWidth + 550 || 
            this.x < -550) {
            this.reset(false);
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(1, Math.sin(this.flip)); // ~ 3D flip
        ctx.rotate(this.rotation); // ~ 2d flip
        ctx.beginPath();
        
        
        const s = this.size; // petal size
        ctx.moveTo(0, s); 

        // left: bottom to top left
        ctx.bezierCurveTo(-s * 1.2, s * 0.4, -s, -s * 0.8, -s * 0.4, -s);

        // create notch at the bottom of the petal
        ctx.quadraticCurveTo(0, -s * 0.6, s * 0.4, -s);

        // right: top right to bottom
        ctx.bezierCurveTo(s, -s * 0.8, s * 1.2, s * 0.4, 0, s);

        // define gradient style
        const gradient = ctx.createLinearGradient(0, s, 0, -s);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

        ctx.fillStyle = gradient;

        ctx.fill();
        ctx.restore();
    }
}