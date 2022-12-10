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
		setTimeout(() =>alert("Ganador"), 1);
	}

  currentLetter = (currentLetter === "X") ? "O" : "X";
}

function checkWinner(){
	//Esto revisa en horizontal
  let numX = 0;
  for(let i = 0; i<3; i++) {
		for(let j = 0; j<3; j++) {
			console.log(currentLetter);
      if(arr[i][j] === currentLetter) {
        numX +=1;
      }
			if (numX === 3) {
				return true;
			}
		}
		 numX = 0;
	}
	//Esto revisa en vertical
	for(let i = 0; i<3; i++) {
		for(let j = 0; j<3; j++) {
			if(arr[j][i] === currentLetter) {
				numX +=1;
			}
			if (numX === 3) {
				return true;
			}
		}
		numX = 0;
	}
	//Esto revisa en diagonal -> \
	for(let j = 0; j<3; j++) {
		if(arr[j][j] === currentLetter) {
			numX +=1;
		}
		if (numX === 3) {
			return true;
		}
	}
	numX = 0;
	//Esto revisa en diagonal -> /
	for(let i = 0; i<3; i++) {
		for(let j = 0; j<3; j++) {
			if(arr[j][i-j] === currentLetter) {
				numX +=1;
			}
			if (numX === 3) {
				return true;
			}
		}
		numX = 0;
	}
  return false;
}