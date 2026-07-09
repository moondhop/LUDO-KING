class Token {

    constructor(color, homeX, homeY) {

        this.color = color;

        this.homeX = homeX;

        this.homeY = homeY;

        this.x = homeX;

        this.y = homeY;

        this.step = -1;

        this.finished = false;

    }

    draw() {

        ctx.beginPath();

        ctx.arc(

            this.x * CELL + CELL / 2,

            this.y * CELL + CELL / 2,

            CELL / 3,

            0,

            Math.PI * 2

        );

        ctx.fillStyle = this.color;

        ctx.fill();

        ctx.lineWidth = 3;

        ctx.strokeStyle = "#111";

        ctx.stroke();

    }

}

const tokens = [

new Token("#ff3b30",1.5,1.5),

new Token("#ff3b30",4.5,1.5),

new Token("#ff3b30",1.5,4.5),

new Token("#ff3b30",4.5,4.5),

new Token("#34c759",10.5,1.5),

new Token("#34c759",13.5,1.5),

new Token("#34c759",10.5,4.5),

new Token("#34c759",13.5,4.5),

new Token("#007aff",1.5,10.5),

new Token("#007aff",4.5,10.5),

new Token("#007aff",1.5,13.5),

new Token("#007aff",4.5,13.5),

new Token("#ffcc00",10.5,10.5),

new Token("#ffcc00",13.5,10.5),

new Token("#ffcc00",10.5,13.5),

new Token("#ffcc00",13.5,13.5)

];

function drawTokens(){

for(let t of tokens){

t.draw();

}

}
