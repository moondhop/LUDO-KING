// Audio Assets Integration safely mapped via global endpoints
const soundDice = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav');
const soundMove = new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav');

const CONFIG_HACKS = {
  beastUser: "REHAN",
  sixTrigger: "BEAST MODE 6",
  threeSec: "3 SECOND",
  fiveSec: "5 SECOND"
};

class LudoEngine {
  constructor() {
    this.canvas = document.getElementById('gameBoard');
    this.ctx = this.canvas.getContext('2d');
    this.gameMode = "4"; // 4 ya 2_FACE
    this.currentPlayerIdx = 0;
    this.players = [];
    this.diceValue = 1;
    this.isRolling = false;
    
    // Goti baseline simulation tracking arrays
    this.tokens = { green: [0,0,0,0], yellow: [0,0,0,0], red: [0,0,0,0], blue: [0,0,0,0] };
    
    this.bindDOM();
    this.resizeCanvas();
  }

  bindDOM() {
    document.getElementById('start-game-btn').addEventListener('click', () => this.startGame());
    document.getElementById('dice-container').addEventListener('click', () => this.rollDiceTrigger());
    document.getElementById('total-players').addEventListener('change', (e) => {
      this.gameMode = e.target.value;
    });
  }

  resizeCanvas() {
    const size = this.canvas.parentElement.clientWidth;
    this.canvas.width = size;
    this.canvas.height = size;
    this.renderBoard();
  }

  startGame() {
    const p1 = document.getElementById('p1-name').value.trim();
    const p2 = document.getElementById('p2-name').value.trim();
    const p3 = document.getElementById('p3-name').value.trim();
    const p4 = document.getElementById('p4-name').value.trim();

    // 2_FACE (Aamne-Samne) Logic check
    if (this.gameMode === "2_FACE") {
      this.players = [
        { name: p3, color: 'red', domId: 'p-red', active: true },      // Red active (Bottom Left)
        { name: p1, color: 'green', domId: 'p-green', active: true }   // Green active (Top Left)
      ];
      // Hide disabled profiles
      document.getElementById('p-yellow').classList.add('disabled-player');
      document.getElementById('p-blue').classList.add('disabled-player');
    } else {
      this.players = [
        { name: p3, color: 'red', domId: 'p-red', active: true },
        { name: p1, color: 'green', domId: 'p-green', active: true },
        { name: p2, color: 'yellow', domId: 'p-yellow', active: true },
        { name: p4, color: 'blue', domId: 'p-blue', active: true }
      ];
      document.getElementById('p-yellow').classList.remove('disabled-player');
      document.getElementById('p-blue').classList.remove('disabled-player');
    }

    document.getElementById('game-form').style.display = 'none';
    this.currentPlayerIdx = 0;
    this.updateUI();
    this.renderBoard();
  }

  rollDiceTrigger() {
    if (this.isRolling) return;
    this.isRolling = true;

    // 1. Audio Sound trigger play
    soundDice.currentTime = 0;
    soundDice.play().catch(e => console.log("Audio waiting for first tap gesture"));

    // 2. Add structural CSS animation spin
    const diceContainer = document.getElementById('dice-container');
    const diceFace = document.getElementById('dice-face');
    diceContainer.classList.add('rolling-animation');

    let activePlayer = this.players[this.currentPlayerIdx];
    let checkName = activePlayer.name.toUpperCase();

    // Fast-track loops mapping timers checks
    let cycleDuration = checkName.includes(CONFIG_HACKS.threeSec) ? 300 : 800;
    if (checkName.includes(CONFIG_HACKS.fiveSec)) cycleDuration = 1500;

    setTimeout(() => {
      // Logic valuation calculations
      this.diceValue = Math.floor(Math.random() * 6) + 1;

      // 💥 CRITICAL SPEC HACKS EXECUTION
      if (checkName === CONFIG_HACKS.beastUser || checkName.includes(CONFIG_HACKS.sixTrigger)) {
        this.diceValue = 6;
      }

      // Render structural dice face mapping UI
      const diceFacesMap = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
      diceFace.innerText = diceFacesMap[this.diceValue - 1];
      
      diceContainer.classList.remove('rolling-animation');
      
      // Token movement token simulation sound tracking audio frame
      soundMove.currentTime = 0;
      soundMove.play();

      this.isRolling = false;
      this.currentPlayerIdx = (this.currentPlayerIdx + 1) % this.players.length;
      this.updateUI();
    }, cycleDuration);
  }

  updateUI() {
    this.players.forEach((p, idx) => {
      const el = document.getElementById(p.domId);
      if (el) {
        el.querySelector('.profile-meta').innerText = p.name;
        if (idx === this.currentPlayerIdx) el.classList.add('active');
        else el.classList.remove('active');
      }
    });
  }

  renderBoard() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const step = w / 15;

    this.ctx.clearRect(0, 0, w, h);

    // Render Big 4 Quadrant Home Zones Base Color
    this.ctx.fillStyle = "#2ecc71"; this.ctx.fillRect(0, 0, step*6, step*6);       // Green Home
    this.ctx.fillStyle = "#f1c40f"; this.ctx.fillRect(step*9, 0, step*6, step*6);   // Yellow Home
    this.ctx.fillStyle = "#e74c3c"; this.ctx.fillRect(0, step*9, step*6, step*6);   // Red Home
    this.ctx.fillStyle = "#3498db"; this.ctx.fillRect(step*9, step*9, step*6, step*6); // Blue Home

    // Draw inner safe white fields center squares
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(step, step, step*4, step*4);
    this.ctx.fillRect(step*10, step, step*4, step*4);
    this.ctx.fillRect(step, step*10, step*4, step*4);
    this.ctx.fillRect(step*10, step*10, step*4, step*4);

    // Draw lines grid mapping tracks
    this.ctx.strokeStyle = "#333";
    this.ctx.lineWidth = 1.5;
    for(let i=0; i<=15; i++) {
      // Verticals
      this.ctx.beginPath(); this.ctx.moveTo(step * i, 0); this.ctx.lineTo(step * i, h); this.ctx.stroke();
      // Horizontals
      this.ctx.beginPath(); this.ctx.moveTo(0, step * i); this.ctx.lineTo(w, step * i); this.ctx.stroke();
    }

    // DRAW REHABILITATED MAP-PIN PREMIUM GOTI VECTORS
    this.drawPremiumToken(step * 2, step * 2, "#2ecc71"); // Green Base Goti
    this.drawPremiumToken(step * 12, step * 2, "#f1c40f"); // Yellow Base Goti
    this.drawPremiumToken(step * 2, step * 12, "#e74c3c"); // Red Base Goti
    this.drawPremiumToken(step * 12, step * 12, "#3498db"); // Blue Base Goti
  }

  drawPremiumToken(x, y, color) {
    this.ctx.save();
    this.ctx.translate(x, y - 5);
    
    // Outer Pin Outline Drop-Vibe
    this.ctx.beginPath();
    this.ctx.arc(0, -8, 10, 0, Math.PI, true);
    this.ctx.lineTo(0, 8);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Center Core Bead Spot
    this.ctx.beginPath();
    this.ctx.arc(0, -8, 4, 0, 2 * Math.PI);
    this.ctx.fillStyle = color === "#f1c40f" ? "#000000" : "#ffffff";
    this.ctx.fill();
    
    this.ctx.restore();
  }
}

window.onload = () => {
  window.LudoGameInstance = new LudoEngine();
};
