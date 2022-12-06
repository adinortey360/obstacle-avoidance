class Car {
    constructor(x, y, width, height, type, maxspeed = 3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;

        this.maxspeed = maxspeed;
        this.friction = 0.04;

        this.angle = 0;

        this.crashed = false;

        this.useAI = type == "ai";

        if(type != "traffic") {
            this.sensor = new Sensor(this);
            this.brain = new NeuralNetwork(
                [this.sensor.raycount, 6,4]
            );
        }
            
        this.steering = new Steering(type);
    }

    update(bordersofroad, traffic) {
        if(!this.crashed) {
            this.movements();
            this.polygon = this.createPolygon();
            this.crashed = this.checkCrashed(bordersofroad, traffic);
        }

        if(this.sensor) {
            this.sensor.update(bordersofroad, traffic);
            const offsets = this.sensor.sensorreadings.map(
                e => e == null ? 0 : 1 - e.offset
            )
            const output = NeuralNetwork.feedforward(offsets, this.brain);
            console.log(output);

            if(this.useAI) {
                this.steering.drive = output[0];
                this.steering.left = output[1];
                this.steering.right = output[2];
                this.steering.reverse = output[3];
            }
        }
      
    }

    checkCrashed(bordersofroad, traffic) {
        for (let i = 0; i < bordersofroad.length; i++) {
            if (getPolygonIntersections(this.polygon, bordersofroad[i])) {
                return true;
            }
        }


        for (let i = 0; i < traffic.length; i++) {
            if (getPolygonIntersections(this.polygon, traffic[i].polygon)) {
                return true;
            }
        }


        return false;
    }

    createPolygon() {
        const points = [];
        const radius = Math.hypot(this.width, this.width)/2;

        const alpha = Math.atan2(
            this.width,
            this.height
        )

        points.push({
            x: this.x - Math.sin(this.angle - alpha) * radius,
            y: this.y - Math.cos(this.angle - alpha) * radius
        });

        points.push({
            x: this.x - Math.sin(this.angle + alpha) * radius,
            y: this.y - Math.cos(this.angle + alpha) * radius
        });

        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * radius,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * radius
        });

        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * radius,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * radius
        });

        return points;



    }

    movements() {
        if (this.steering.drive) {
            this.speed += this.acceleration;
        }

        if (this.steering.reverse) {
            this.speed -= this.acceleration;
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
                this.angle += 0.03 * flip;
            }

            if (this.steering.right) {
                this.angle -= 0.03 * flip;
            }
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }


    draw(ctx,showsensor=false) {
        if(this.crashed) {
            ctx.fillStyle = "red";
        } else {
            ctx.fillStyle = "black";
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);

        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }

        ctx.fill();


        if(this.sensor && showsensor) {
          this.sensor.draw(ctx);
        }
    }


}