const Config = {
    petalCount: 300, // # of petals on the screen
    colors: [ // # petal colors
        'rgba(255, 183, 197, 0.9)', 
        'rgba(255, 220, 230, 0.9)', 
        'rgba(255, 255, 255, 0.9)', 
        'rgba(240, 150, 150, 0.9)'
    ],

    useStaticSize: true, // static petal size
    staticSize: 10, // petal size
    sizeVariants: [10, 15, 12, 8], // if the useStaticSize = false, petal size will be randomly selected from this array

    useStaticWind: true, // static wind speed
    baseWindSpeed: 0, // base wind speed, min = -10, max = 10
    windVariance: 0.5, // speed virance on the petal
    
    windChangeSpeed: 0.005, // if wind speed is not static, change wind speed at this rate
    windMaxRange: 3, // ~

    gravity: 1.5, // ~
    rotationSpeed: 0.02, // petal's self-rotation speed
    swayAmplitude: 1, // petal sway amplitude
    globalAlpha: 0.9,  // petal transparency (set as global)
};