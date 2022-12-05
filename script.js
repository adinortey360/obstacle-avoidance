const canvas = document.getElementById("canvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const track = new Track(canvas.width/2, canvas.width * 0.9);
const car = new Car( 100, 100, 30, 50);

animate();

function animate() {
    car.update();
    canvas.height = window.innerHeight;
    track.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);
}