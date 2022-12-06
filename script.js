const canvas = document.getElementById("canvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const track = new Track(canvas.width / 2, canvas.width * 0.9);
const car = new Car(track.getCenterofLane(2), 100, 30, 50, "player");
const traffic = [
    new Car(track.getCenterofLane(2), -100, 30, 50, "traffic", 2)
]

animate();

function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(
            track.borders, []
        )
    }
    car.update(track.borders, traffic);
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.8);

    // for loop of traffic
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx);
    }

    track.draw(ctx);
    car.draw(ctx);

    ctx.restore();

    requestAnimationFrame(animate);
}