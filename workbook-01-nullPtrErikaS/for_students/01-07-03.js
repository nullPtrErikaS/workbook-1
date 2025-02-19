// put some code here
document.addEventListener('DOMContentLoaded', () => {
    const span = document.getElementById('ex3-span');
    const colors = {
        red: [255, 0, 0],
        yellow: [255, 255, 0],
        green: [0, 255, 0],
        blue: [0, 0, 255],
        purple: [128, 0, 128]
    };
    const colorNames = Object.keys(colors);
    let animationFrameId;
    let lastTimestamp;
    let t = 0; // interpolation parameter
    let phase = 0; // 0: to white, 1: to color, 2: hold color
    let startColor = [255, 255, 255]; // default white
    let targetColor = [255, 255, 255]; // default white
    let nextColors = [];

    function updateColor(timestamp) {
        if (lastTimestamp !== undefined) {
            const delta = (timestamp - lastTimestamp) / 500; // convert to seconds, 0.5 seconds duration
            t += delta;

            if (t >= 1) {
                t = 0;
                phase = (phase + 1) % 3;

                if (phase === 0) {
                    startColor = targetColor;
                    targetColor = [255, 255, 255]; // transition to white
                } else if (phase === 1) {
                    startColor = [255, 255, 255]; // transition from white
                    if (nextColors.length > 0) {
                        targetColor = nextColors.shift();
                    } else {
                        targetColor = colors[colorNames[Math.floor(Math.random() * colorNames.length)]];
                    }
                } else if (phase === 2) {
                    setTimeout(() => {
                        animationFrameId = window.requestAnimationFrame(updateColor);
                    }, 1000); // hold color for 1 second
                    return;
                }
            }

            const currentColor = startColor.map((start, index) => {
                return Math.round(start + t * (targetColor[index] - start));
            });

            const color = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
            span.style.backgroundColor = color;
        }
        lastTimestamp = timestamp;
        animationFrameId = window.requestAnimationFrame(updateColor);
    }

    function addColorToQueue(color) {
        nextColors.push(color);
    }

    document.getElementById('red-button').addEventListener('click', () => addColorToQueue(colors.red));
    document.getElementById('yellow-button').addEventListener('click', () => addColorToQueue(colors.yellow));
    document.getElementById('green-button').addEventListener('click', () => addColorToQueue(colors.green));
    document.getElementById('blue-button').addEventListener('click', () => addColorToQueue(colors.blue));
    document.getElementById('purple-button').addEventListener('click', () => addColorToQueue(colors.purple));

    animationFrameId = window.requestAnimationFrame(updateColor);
});