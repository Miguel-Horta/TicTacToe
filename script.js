class Tablero {
  constructor(size) {
    this.size = size;
    this.fillArray();
  }

  fillArray() {
    const arr = [];
    for(let i=0; i<this.size; i++) {
      const newArr = [];
      for(let j=0; j<this.size; j++) {
        newArr.push("");
      }
      arr.push(newArr);
    }
    this.arr = arr;
  }

  addLetter(x, y, letter) {
        console.log(this.arr);
    this.arr[x][y] = letter;
  }

  hasWinner(currentLetter) {
      //Esto revisa en horizontal
    let num = 0;
    for(let i = 0; i<this.size; i++) {
      for(let j = 0; j<this.size; j++) {
        if(this.arr[i][j] === currentLetter) {
          num +=1;
        }
        if (num === this.size) {
          return true;
        }
      }
       num = 0;
    }
    //Esto revisa en vertical
    for(let i = 0; i<this.size; i++) {
      for(let j = 0; j<this.size; j++) {
        if(this.arr[j][i] === currentLetter) {
          num +=1;
        }
        if (num === this.size) {
          return true;
        }
      }
      num = 0;
    }
    //Esto revisa en diagonal -> \
    for(let j = 0; j<this.size; j++) {
      if(this.arr[j][j] === currentLetter) {
        num +=1;
      }
      if (num === this.size) {
        return true;
      }
    }
    num = 0;
    //Esto revisa en diagonal -> /
    for(let i = 0; i<this.size; i++) {
      for(let j = 0; j<this.size; j++) {
        if(this.arr[j][i-j] === currentLetter) {
          num +=1;
        }
        if (num === this.size) {
          return true;
        }
      }
      num = 0;
    }
    return false;
  }
}

class Player {
  constructor(letter) {
    this.letter = letter;
  }

  getLetter() {
    return this.letter;
  }
}

class ControladorVisual {
  constructor() {
    this.cellElements = document.querySelectorAll(".cell");
    this.titleElement = document.getElementById("newtitle");
  }

  setupListeners(callbackFn) {
    this.cellElements.forEach((cellElement) => {
      cellElement.textContent = "";
      cellElement.onclick = (() => {
        const id = cellElement.id;
        let newcell = id.match(/\d/g);
        const x = parseInt(newcell[0]);
        const y = parseInt(newcell[1]);
        cellElement.onclick = false;

        callbackFn(x, y, id);
      });
    });
  }

  setTitle(title) {
    this.titleElement.textContent = title;
  }

  setLetter(x, y, currentLetter) {
    const id = "c" + x + y;
    document.getElementById(id).textContent = currentLetter;
  }

  removeListeners() {
    this.cellElements.forEach((cellElement) => {
      cellElement.onclick = undefined;
    });
  }
}

class ControladorJuego {
  constructor() {
    this.startGame();
  }

  startGame() {
   this.tablero = new Tablero(3);
   this.player1 = new Player("X");
   this.player2 = new Player("O");
   this.controladorVisual = new ControladorVisual();
   this.currentTurn = 1;
   this.setupListeners();
   this.announceTurn();
  }

  playTurn(x, y, id) {
    let currentLetter;
    if (this.currentTurn === 1) {
      currentLetter = this.player1.getLetter();
    } else {
      currentLetter = this.player2.getLetter();
    }

    this.tablero.addLetter(x, y, currentLetter);
    this.controladorVisual.setLetter(x, y, currentLetter);
    if (this.tablero.hasWinner(currentLetter)) {
      this.announceWinner();
    } else {
      this.currentTurn = (this.currentTurn === 1) ? 2 : 1;
      this.announceTurn();
    }
  }

  announceWinner() {
    this.controladorVisual.setTitle("El jugador " + this.currentTurn + " ha ganado");
    this.controladorVisual.removeListeners();
  }

  announceTurn() {
    this.controladorVisual.setTitle("Es turno del jugador " + this.currentTurn);
  }

  setupListeners() {
    this.controladorVisual.setupListeners((x, y) => {
      this.playTurn(x, y);
    });
  }
}

let controladorJuego = new ControladorJuego();
controladorJuego.startGame();

document.getElementById("restart").onclick = (() => {
  let controladorJuego = new ControladorJuego()
  controladorJuego.startGame();
});