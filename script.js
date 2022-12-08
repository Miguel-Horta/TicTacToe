arr = [[],[],[]];
let value = "O";
const winningCombination = [
	['c00', 'c01', 'c02'], 
	['c10', 'c11', 'c12'], 
	['c20', 'c21', 'c22'], 
	['c00', 'c10', 'c20'], 
	['c01', 'c11', 'c21'], 
	['c02', 'c12', 'c22'], 
	['c00', 'c11', 'c22'], 
	['c02', 'c11', 'c20']
	];

function turn(cell){
	let newcell = cell.match(/\d/g);
	newcell = newcell.join("");
	const x = parseInt(newcell[0]);
	const y = parseInt(newcell[1]);
	document.getElementById(cell).onclick = false;
	if(arr.length < 9){
			
		if(value === 'O'){
				value = document.getElementById(cell).textContent = "X";
		}
		else{
				value = document.getElementById(cell).textContent = "O";
		}
		arr[x][y] = cell;
		console.log(arr[x][y]);
		console.log(arr);
	}
	checkWinner();
}

function checkWinner(){

}