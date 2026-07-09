const loading = document.getElementById("loading");
const menu = document.getElementById("menu");
const game = document.getElementById("game");

const passBtn = document.getElementById("passplay");
const aiBtn = document.getElementById("computer");
const rollBtn = document.getElementById("roll");

const dice = document.getElementById("dice");
const turn = document.getElementById("turn");

let currentPlayer = 0;

const players = [
{
name:"RED",
color:"#ff3b30"
},
{
name:"GREEN",
color:"#34c759"
},
{
name:"YELLOW",
color:"#ffcc00"
},
{
name:"BLUE",
color:"#007aff"
}
];

setTimeout(()=>{
loading.classList.add("hide");
menu.classList.remove("hide");
},2000);

passBtn.onclick=()=>{

menu.classList.add("hide");

game.classList.remove("hide");

startGame(false);

};

aiBtn.onclick=()=>{

menu.classList.add("hide");

game.classList.remove("hide");

startGame(true);

};

function startGame(ai){

turn.innerHTML=players[currentPlayer].name+" TURN";

turn.style.color=players[currentPlayer].color;

drawBoard();

}

rollBtn.onclick=()=>{

let value=Math.floor(Math.random()*6)+1;

dice.innerHTML=value;

nextTurn();

};

function nextTurn(){

currentPlayer++;

if(currentPlayer>3){

currentPlayer=0;

}

turn.innerHTML=players[currentPlayer].name+" TURN";

turn.style.color=players[currentPlayer].color;

}
