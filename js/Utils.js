const randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};

const randomChoice = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};