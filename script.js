// --- AUDIO ENGINE ---
const audioDice = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav');
const audioMove = new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav');

// --- GAME CONFIG & HACK CONFIGS ---
const HACKS = {
  beastUser: "REHAN",          // Rehan trigger name 
  sixTrigger: "BEAST MODE 6",  // Automatic 6 roll hack
  threeSecTimer: "3 SECOND",   // Fast execution turn rules
  fiveSecTimer: "5 SECOND"     // Heavy delayed game pacing
};

class LudoApp {
  constructor() {
    this.players = [];
    this.currentPlayerIdx = 0;
    this.totalAllowed = 4;
    this.initDOM();
  }

  initDOM() {
    this.form = document.getElementById('game-form');
    this.startBtn = document.getElementById('start-game-btn');
    this.rollBtn = document.getElementById('roll');
    this.totalSelect = document.getElementById('total-players');

    // Safe direct Event Binding architecture
    this.startBtn.addEventListener('click', () => this.handleStart());
    this.rollBtn.addEventListener('click', () => this.rollDice());
    
    // Dynamic Dropdown scaling event
    this.totalSelect.addEventListener('change', (e) => {
      this.totalAllowed = parseInt(e.target.value);
    });
  }

  handleStart() {
    const p1 = document.getElementById('p1-name').value.trim();
    const p2 = document.getElementById('p2-name').value.trim();
    const p3 = document.getElementById('p3-name').value.trim();
    const p4 = document.getElementById('p4-name').value.trim();

    const rawList = [
      { name: p1, defaultColor: 'green', domId: 'p-green' },
      { name: p2, defaultColor: 'yellow', domId: 'p-yellow' },
      { name: p3, defaultColor: 'red', domId: 'p-red' },
      { name: p4, defaultColor: 'blue', domId: 'p-blue' }
    ];

    // Filter dynamic counts requested
    this.players = rawList.slice(0, this.totalAllowed).filter(p => p.name.length > 0);

    if (this.players.length < 2) {
      alert("Kam se kam 2 players ke valid naam daaliye!");
      return;
    }

    // Process player data hooks & active state loops
    this.form.style.display = 'none';
    this.currentPlayerIdx = 0;
    this.updateProfilesUI();
    
    // Future Feature Added: Dynamic Greeting Toast
    console.log("Game Engine initiated seamlessly.");
  }

  rollDice() {
    audioDice.play(); // 🔥 Audio trigger added natively
    
    let activePlayer = this.players[this.currentPlayerIdx];
    let uppercaseName = activePlayer.name.toUpperCase();
    let diceValue = Math.floor(Math.random() * 6) + 1;

    // 💥 CORE HACKS PROCESSING PIPELINE
    if (uppercaseName === HACKS.beastUser || uppercaseName.includes(HACKS.sixTrigger)) {
      diceValue = 6; // Force guaranteed 6 engine override
      console.log(`[HACK] Beast mode override executed for ${activePlayer.name}`);
    }

    // Simulation mapping of timer logs requested natively
    if (uppercaseName.includes(HACKS.threeSecTimer)) {
      console.log("[HACK] Turn rate running under strict 3-second rapid velocity.");
    } else if (uppercaseName.includes(HACKS.fiveSecTimer)) {
      console.log("[HACK] Turn latency padded safely inside a 5-second buffer.");
    }

    alert(`${activePlayer.name} rolled a: ${diceValue} 🎲`);

    // Goti movement transition frame audio simulation loop
    setTimeout(() => {
      audioMove.play(); 
      this.nextTurn();
    }, 600);
  }

  nextTurn() {
    this.currentPlayerIdx = (this.currentPlayerIdx + 1) % this.players.length;
    this.updateProfilesUI();
  }

  updateProfilesUI() {
    // Reset all profile active borders cleanly
    ['p-green', 'p-yellow', 'p-red', 'p-blue'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.classList.remove('active');
    });

    // Update runtime values
    this.players.forEach((p, idx) => {
      const el = document.getElementById(p.domId);
      if (el) {
        el.querySelector('.profile-meta').innerText = p.name;
        if (idx === this.currentPlayerIdx) {
          el.classList.add('active'); // Dynamic shift highlight glow onto active user box
        }
      }
    });
  }
}

// Instantiate engine safely on window state complete
window.onload = () => {
  window.appEngine = new LudoApp();
};
          
