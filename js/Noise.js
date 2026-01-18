class Noise {
    constructor() {
        this.maxVertices = 256;
        this.maxVerticesMask = this.maxVertices - 1;
        this.amplitude = 1;
        this.scale = 1;
        this.r = [];

        for (let i = 0; i < this.maxVertices; i++) {
            this.r.push(Math.random());
        }
    }

    get_value(x) { 
        const scaledX = x * this.scale;
        const xFloor = Math.floor(scaledX);
        const t = scaledX - xFloor;

        const tSmooth = t * t * (3 - 2 * t);
        const xMin = xFloor & this.maxVerticesMask;
        const xMax = (xMin + 1) & this.maxVerticesMask;

        const y = this.lerp(this.r[xMin], this.r[xMax], tSmooth);

        return y * this.amplitude;
    }

    lerp(a, b, t) { 
        return a * (1 - t) + b * t;
    }
}