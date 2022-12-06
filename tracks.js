class Track{
    constructor(x, width,lanes = 3) {
        this.x = x;
        this.width = width;
        this.lanes = lanes;

        this.left = x -  width/2;
        this.right = x + width/2;

        const infinity = 1000000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = {
            x: this.left,
            y: this.top
        };

        const bottomLeft = {
            x: this.left,
            y: this.bottom
        };

        const topRight = {
            x: this.right,
            y: this.top
        };

        const bottomRignt = {
            x: this.right,
            y: this.bottom
        };

        this.borders = [
            [topLeft, bottomLeft],
            [topRight,bottomRignt]
        ];
    }

    getCenterofLane(i) {
        const lanewidth = this.width / this.lanes;
        return this.left + lanewidth / 2 + i * lanewidth;
        }

    draw(ctx) {
        ctx.linewidth = 5;
        ctx.strokeStyle = "white";



        for(let i = 1; i <= this.lanes - 1; i++ ) {
            const x = lerp(
                this.left,
                this.right,
                i / this.lanes
            );

            if(i > 0 && i < this.lanes) {   
                // ctx.setLineDash([10,10]);
            } else {
                ctx.setLineDash([]);
            }

            
            

            ctx.beginPath();
            
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();

            
        }

        ctx.setLineDash([]);
        this.borders.forEach(border => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
        

    }   
}

