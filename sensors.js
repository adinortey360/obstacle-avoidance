class Sensor {
    constructor(car) {
        this.car = car;
        this.raycount = 20;
        this.lengthofray = 300;
        this.rayspread = Math.PI / 2;

        this.rays = [];
        this.sensorreadings = [];
    }

    update(bordersofroad, traffic) {
        this.castrays();
        this.sensorreadings = [];

        for (let i = 0; i < this.rays.length; i++) {

            this.sensorreadings.push(
                this.getReadings(this.rays[i], bordersofroad, traffic)
            );
        }

    }

    getReadings(ray, bordersofroad, traffic) {
        let contacts=[];

        for(let i = 0; i < bordersofroad.length; i++) {
            const intersection = getIntersection(ray[0], ray[1], bordersofroad[i][0], bordersofroad[i][1]);

            if(intersection) {
                contacts.push(intersection);
            }
        }

        for(let i = 0; i < traffic.length; i++) {
            const poly = traffic[i].polygon;

            for(let j = 0; j < poly.length; j++) {
                const value = getIntersection(ray[0], ray[1], poly[j], poly[(j + 1) % poly.length]);

                if(value) {
                    contacts.push(value);
                }
            }
        }


        if(contacts.length == 0) {
            return null;
        } else {
            const offsets = contacts.map(e => e.offset);
            const min = Math.min(...offsets);

            return contacts.find(e => e.offset == min);
        }

    }


    castrays() {
        this.rays = [];

        for (let i = 0; i < this.raycount; i++) {
            const angle = lerp(
                this.rayspread / 2,
                -this.rayspread / 2,
                i / (this.raycount - 1)
            ) + this.car.angle;

            const start = { x: this.car.x, y: this.car.y };

            const end = {
                x: this.car.x - Math.sin(angle) * this.lengthofray,
                y: this.car.y - Math.cos(angle) * this.lengthofray
            };

            this.rays.push([start, end]);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.raycount; i++) {
            let end = this.rays[i][1];

            if(this.sensorreadings[i]) {
                end = this.sensorreadings[i];
            }

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "white";
            // turn opacity on and off every 1 second
            ctx.globalAlpha = Math.floor(Date.now() / 1000) % 2 ? 0.5 : 0.8;


            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();


            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
}