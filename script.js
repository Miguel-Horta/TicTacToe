const arr = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
let currentLetter = "X";

function turn(cell){
	let newcell = cell.match(/\d/g);
	const x = parseInt(newcell[0]);
	const y = parseInt(newcell[1]);
	document.getElementById(cell).onclick = false;

  arr[x][y] = currentLetter;
  document.getElementById(cell).textContent = currentLetter;

  if(checkWinner()) {
    alert("Ganador")
  };

  currentLetter = (currentLetter === "X") ? "O" : "X";
}

function checkWinner(){
	//Esto revisa en horizontal
  let numX = 0, numO = 0;
  for(let i = 0; i<3; i++) {
		for(let j = 0; j<3; j++) {
      if(arr[i][j] === "X") {
        numX +=1;
      }
			if(arr[i][j] === "O") {
        numO +=1;
      }
			if (numX === 3 || numO === 3) {
				return true;
			}
		}
		numO = 0; numX = 0;
	}
	//Esto revisa en vertical
	for(let i = 0; i<3; i++) {
		for(let j = 0; j<3; j++) {
			if(arr[j][i] === "X") {
				numX +=1;
			}
			if(arr[j][i] === "O") {
				numO +=1;
			}
			if (numX === 3 || numO === 3) {
				return true;
			}
		}
		numO = 0; numX = 0;
	}
	//Esto revisa en diagonal -> \
	for(let j = 0; j<3; j++) {
		if(arr[j][j] === "X") {
			numX +=1;
		}
		if(arr[j][j] === "O") {
			numO +=1;
		}
		if (numX === 3 || numO === 3) {
			return true;
		}
	}
	numO = 0; numX = 0;
	//Esto revisa en diagonal -> /
	for(let i = 0; i<3; i++) {
		for(let j = 0; j<3; j++) {
			if(arr[j][i-j] === "X") {
				numX +=1;
			}
			if(arr[j][i-j] === "O") {
				numO +=1;
			}
			if (numX === 3 || numO === 3) {
				return true;
			}
		}
		numO = 0; numX = 0;
	}
  return false;
}