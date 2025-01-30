let title = document.title;

window.addEventListener('blur', () => {
    title = document.title;
    document.title = "Don't leave, come back :(";
});

window.addEventListener('focus', () => {
    document.title = title;
});

let titleElement = document.getElementById("title");
let oneFlowerButton = document.getElementById("oneFlowerButton");

oneFlowerButton.addEventListener('click', function() {
    const buttonsContainer = document.querySelector(".buttons-container");
    document.querySelector(".text-container").style.display = "block";
    buttonsContainer.style.display = "none";
    drawFlower(400, 100, 6, 30, 100, 200);
    titleElement.remove();
});

document.getElementById("twelveFlowersButton").addEventListener('click', function() {
    const buttonsContainer = document.querySelector(".buttons-container");
    buttonsContainer.style.display = "none";
    document.querySelector(".text-container").style.display = "block";
    createMultipleFlowers();
    titleElement.remove();
});

const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

function drawPetal(x, y, radiusX, scale, rotation, color, steps) {
    const angleIncrement = (Math.PI / steps) * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(1, scale);
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
        const currentAngle = i * angleIncrement;
        const currentRadius = Math.sin(currentAngle) * radiusX;
        const pointY = Math.sin(currentAngle) * currentRadius;
        const pointX = Math.cos(currentAngle) * currentRadius;
        if (i === 0) {
            ctx.moveTo(pointX, pointY);
        } else {
            ctx.lineTo(pointX, pointY);
        }
    }
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawFlower(x, y, petalCount, petalRadiusX, petalRadiusY, stemHeight) {
    const stemSteps = 50;
    const stemHeightStep = stemHeight / stemSteps;
    let newY = y;

    const drawStem = () => {
        if (newY < y + stemHeight) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, newY);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            newY += stemHeightStep;
            setTimeout(drawStem, 100);
        } else {
            const steps = 50;
            let stepCount = 0;
            function drawStemPetals() {
                if (stepCount <= steps) {
                    const petalY = y + 250 - petalRadiusY;
                    const petalY2 = y + 200 - petalRadiusY;
                    drawPetal(400, petalY, 15, 2, 300, 'green', stepCount);
                    drawPetal(370, petalY2, 15, 2, 300, 'green', stepCount);
                    stepCount++;
                    setTimeout(drawStemPetals, 100);
                }
            }
            drawStemPetals();
        }
    };
    drawStem();

    const angleIncrement = (Math.PI * 2) / petalCount;

    let petalCountDrawn = 0;
    function drawNextPetal() {
        if (petalCountDrawn <= petalCount) {
            const angle = petalCountDrawn * angleIncrement;
            drawPetal(x, y, petalRadiusX, 2, angle, 'yellow', 100);
            petalCountDrawn++;
            setTimeout(drawNextPetal, 1000);
        }
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
    drawNextPetal();
}

function drawFlowerWithoutStem(x, y, petalCount, petalRadiusX, petalRadiusY, stemHeight) {
    const stemSteps = 50;
    const stemHeightStep = stemHeight / stemSteps;
    let newY = y;

    const drawStem = () => {
        if (newY < y + stemHeight) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, newY);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            newY += stemHeightStep;
            setTimeout(drawStem, 100);
        }
    };
    drawStem();

    const angleIncrement = (Math.PI * 2) / petalCount;

    let petalCountDrawn = 0;
    function drawNextPetal() {
        if (petalCountDrawn <= petalCount) {
            const angle = petalCountDrawn * angleIncrement;
            drawPetal(x, y, petalRadiusX, 2, angle, 'yellow', 100);
            petalCountDrawn++;
            setTimeout(drawNextPetal, 1000);
        }
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
    drawNextPetal();
}

function createMultipleFlowers() {
    const numFlowers = 12;
    const spaceX = canvas.width / 4;
    const spaceY = canvas.height / 3;
    const flowerSize = 130;

    for (let i = 0; i <= numFlowers; i++) {
        const row = Math.floor(i / 4);
        const column = i % 4;
        const x = spaceX * column + spaceX / 2;
        const y = spaceY * row + spaceY / 2;

        drawFlowerWithoutStem(x, y, 8, 30, 80, flowerSize);
    }
}

function createRandomFlower() {
    const flowerContainer = document.querySelector(".flower-container");
    const maxFlowersOnScreen = 10;

    if (document.querySelectorAll(".flower").length >= maxFlowersOnScreen) {
        return;
    }

    const maxFlowers = Math.ceil(Math.random() * 5 + 1);
    const flowerSize = 100;

    const existingPositions = [];

    for (let j = 0; j < maxFlowers; j++) {
        let positionValid = false;
        let randomX, randomY;

        while (!positionValid) {
            randomX = Math.random() * (window.innerWidth - flowerSize);
            randomY = Math.random() * (window.innerHeight - flowerSize);

            positionValid = true;

            for (const position of existingPositions) {
                const distance = Math.sqrt(Math.pow(position.x - randomX, 2) + Math.pow(position.y - randomY, 2));
                if (distance < 100) {
                    positionValid = false;
                    break;
                }
            }
        }

        existingPositions.push({ x: randomX, y: randomY });

        const flower = document.createElement("div");
        flower.classList.add("flower");
        flower.style.animation = "fadeInFlower 1s ease-in-out both";

        for (let i = 1; i <= 10; i++) {
            const petal = document.createElement("div");
            petal.classList.add("petal", `p${i}`);
            flower.appendChild(petal);

            const disappearanceTime = Math.random() * 3000 + 2000;
            petal.style.animation = `fadeOutPetal 0.5s ease-in-out both ${i * 0.1}s, fadeOutFlower 0.5s ease-in-out both ${disappearanceTime}s`;
        }

        flower.style.position = "fixed";
        flower.style.left = `${randomX}px`;
        flower.style.top = `${randomY}px`;

        flowerContainer.appendChild(flower);

        const disappearanceTime = Math.random() * 3000 + 2000;

        setTimeout(() => {
            flowerContainer.removeChild(flower);
            existingPositions.splice(existingPositions.findIndex(pos => pos.x === randomX && pos.y === randomY), 1);
        }, disappearanceTime);
    }
}

setInterval(createRandomFlower, 3000);