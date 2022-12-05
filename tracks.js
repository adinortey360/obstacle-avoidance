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
    }

    draw(ctx) {
        ctx.linewidth = 5;
        ctx.strokeStyle = "white";

        for(let i = 0; i <= this.lanes; i++ ) {
            const x = lerp(
                this.left,
                this.right,
                i / this.lanes
            );

            if(i > 0 && i < this.lanes) {   
                ctx.setLineDash([20, 20]);
            } else {
                ctx.setLineDash([]);
            }

            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
        

    }   
}

