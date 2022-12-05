class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;

        this.maxspeed = 3;
        this.friction = 0.04;

        this.angle = 0;

        this.steering = new Steering();
    }

    update() {
        this.movements();
    }

    movements() {
        if (this.steering.drive) {
            this.speed -= this.acceleration;
        }

        if (this.steering.reverse) {
            this.speed += this.acceleration;
        }

        if (this.speed > this.maxspeed) {
            this.speed = this.maxspeed;
        }

        if (this.speed < -this.maxspeed / 2) {
            this.speed = -this.maxspeed / 2;
        }

        if (this.speed > 0) {
            this.speed -= this.friction;
        }

        if (this.speed < 0) {
            this.speed += this.friction;
        }

        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;


            if (this.steering.left) {
                this.angle += 0.04 * flip;
            }

            if (this.steering.right) {
                this.angle -= 0.04 * flip;
            }
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }


    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        ctx.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.fillStyle = "yellow";
        ctx.fill();

        ctx.restore();
    }


}