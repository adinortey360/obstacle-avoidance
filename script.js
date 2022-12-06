const canvas = document.getElementById("canvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");

const track = new Track(canvas.width / 2, canvas.width * 0.9);

N = 300;
const cars = generateCars(N);

var goodcar = cars[0];

if(localStorage.getItem("data")) {
    // loop cars
    for(let  i = 0; i < cars.length; i++) 
    {
        // load brain
        cars[i].brain = JSON.parse(localStorage.getItem("data"));

        if(i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.1);
        }
    }
}

const traffic = [
    new Car(track.getCenterofLane(1), -100, 30, 50, "traffic", 2),
    new Car(track.getCenterofLane(0), -300, 30, 50, "traffic", 2),
    new Car(track.getCenterofLane(2), -300, 30, 50, "traffic", 2),


    new Car(track.getCenterofLane(1), -300, 30, 50, "traffic", 2),

    new Car(track.getCenterofLane(1), -500, 30, 50, "traffic", 2),

    new Car(track.getCenterofLane(0), -2500, 30, 50, "traffic", 2),

    new Car(track.getCenterofLane(2), -300, 30, 50, "traffic", 2),


]

animate();

function save() {
    const json = JSON.stringify(goodcar.brain);

    localStorage.setItem("data", json);
}

function discard() {
    localStorage.removeItem("data");
}


function generateCars(N) {
    const cars = [];

    for (let i = 0; i < N; i++) {
        cars.push(
            new Car(
                track.getCenterofLane(1),
                100,
                30,
                50,
                "ai"
            )
        );
    }

    return cars;
}

function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(
            track.borders, []
        )
    }

    for (let i = 0; i < cars.length; i++) {

        cars[i].update(track.borders, traffic);

    }

    goodcar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        )
    );

    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -goodcar.y + canvas.height * 0.8);

    // for loop of traffic
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx);
    }

    track.draw(ctx);

    ctx.globalAlpha = 0.3;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(ctx);
    }
    ctx.globalAlpha = 1;

    goodcar.draw(ctx, true);

    ctx.restore();

    requestAnimationFrame(animate);
}