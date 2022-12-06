const canvas = document.getElementById("canvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const track = new Track(canvas.width/2, canvas.width * 0.9);
const car = new Car( track.getCenterofLane(2), 100, 30, 50);

animate();

function animate() {
    car.update(track.borders);
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.8);


    track.draw(ctx);
    car.draw(ctx);

    ctx.restore();

    requestAnimationFrame(animate);
}