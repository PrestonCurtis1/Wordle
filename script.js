var allowInput
document.addEventListener("DOMContentLoaded", () => {

	function readFile(filePath) {
		var request = new XMLHttpRequest();
		request.overrideMimeType("text/plain");
		request.open('GET', filePath, false);

		request.send();
		if (request.status === 200) {
			return request.responseText;
		}
		return null;
	}
	
	
	
	const filePath = "data.json";
	//const jsonData = readFile(filePath);
	const jsonData = readFile("data.json");
	const data = JSON.parse(jsonData);
	const dictionary = data.words
	const solutions = data.solutions
	var board,currentRow,currentColumn,randomWord,score;

	const alphabet = "abcdefghijklmnopqrstuvwxyz";

	//I provide how code works in the pseudo.txt file;
	function startGame(){
		allowInput = true;
		currentRow = 1;
		currentColumn = 1;
		randomWord = solutions[Math.floor(Math.random() * solutions.length)];
		//randomWord = "trail";
		board = [["?","?","?","?","?"],["?","?","?","?","?"],["?","?","?","?","?"],["?","?","?","?","?"],["?","?","?","?","?"],["?","?","?","?","?"]];

		rightSpotCounter = 0;
		foundInWordCounter = 0;
		document.getElementById("keyboard").style.display = "block";
		for (let letter = 0;letter < alphabet.length;letter++)document.getElementById(alphabet.charAt(letter)+"Button").style.backgroundColor = "rgb(60,60,60)";
	;	for (let row = 1;row < 7;row++){
			for (let column = 1;column < 6;column++){
				const box = document.getElementById("charBox"+row+""+column);
				box.style.backgroundColor = "rgb(255,255,255)";
				box.style.color = "rgb(0,0,0)";
				box.innerHTML = "?";
			}
		}
		document.getElementById("mainView").hidden = false;
		document.getElementById("keyboard").style.display = "block";
		document.getElementById("scoreView").hidden = true;
	}
	function addChar(char){
		if (allowInput){
			document.getElementById("charBox" + currentRow + "" + currentColumn + "").innerHTML = char;
			board[currentRow-1][currentColumn-1] = char;
			if (currentColumn != 5)currentColumn++;
		}
	}
	function submitWord(){
		let typedWord = board[currentRow-1].join("");
		let doneList = []
		if (!(board[currentRow-1].includes("?"))){

			if(dictionary.includes(typedWord)){
			for (let column = 0;column < 5;column++){
				//Correct spot
				var button = document.getElementById(board[currentRow-1][column]+"Button");
				document.getElementById("charBox" + currentRow + "" + (column+1)).style.color = "white";
				if (board[currentRow-1][column] == randomWord[column]){
					document.getElementById("charBox" + currentRow + "" + (column+1)).style.backgroundColor = "green";
					button.style.backgroundColor = "green";


				}
				//Wrong spot
				else if (randomWord.includes(board[currentRow-1][column])){
					if (doneList.includes(board[currentRow-1][column])){
						document.getElementById("charBox" + currentRow + "" + (column+1)).style.backgroundColor = "rgb(50,50,50)";
					if (button.style.backgroundColor != "green" && button.style.backgroundColor != "yellow")button.style.backgroundColor = "gray";
						continue;
					}
					doneList.push(board[currentRow-1][column])
					document.getElementById("charBox" + currentRow + "" + (column+1)).innerHTML += "<sup>" + (randomWord.split(board[currentRow-1][column]).length - 1) + "</sup>"
					document.getElementById("charBox" + currentRow + "" + (column+1)).style.backgroundColor = "yellow";
					if (button.style.backgroundColor != "green")button.style.backgroundColor = "yellow";

				}
				//Not in word
				else{
					document.getElementById("charBox" + currentRow + "" + (column+1)).style.backgroundColor = "rgb(50,50,50)";
					if (button.style.backgroundColor != "green" && button.style.backgroundColor != "yellow")button.style.backgroundColor = "gray";
				}
			}
			checkWin();
			}
			else{
				alert("Word not contained in dictionary")
			}
		}

		else{
			alert('Fill In all Boxes');
		}
	}
	function checkWin(){
		var typedWord = board[currentRow-1].join("");
		if (typedWord === randomWord){
			console.log(typedWord)
			endGame(true);
		}else{
			if (currentRow == 6){
				console.log("Lost on word",randomWord);
				endGame(false);
			}else{
				currentRow++;
				currentColumn = 1;
			}
		}

	}
	function delChar(){
		if(allowInput){
			if (board[currentRow-1][0] == "?")null;
			else if (board[currentRow-1][1] == "?"){
				currentColumn = 1;
				document.getElementById("charBox" + currentRow + "" + currentColumn).innerHTML = "?";
				board[currentRow-1][0] = "?";
			}
			else if (board[currentRow-1][2] == "?"){
				currentColumn = 2;
				document.getElementById("charBox" + currentRow + "" + currentColumn).innerHTML = "?";
				board[currentRow-1][1] = "?";
			}
			else if (board[currentRow-1][3] == "?"){
				currentColumn = 3;
				document.getElementById("charBox" + currentRow + "" + currentColumn).innerHTML = "?";
				board[currentRow-1][2] = "?";
			}
			else if (board[currentRow-1][4] == "?"){
				currentColumn = 4;
				document.getElementById("charBox" + currentRow + "" + currentColumn).innerHTML = "?";
				board[currentRow-1][3] = "?";
			}
			else{
				currentColumn = 5;
				document.getElementById("charBox" + currentRow + "" + currentColumn).innerHTML = "?";
				board[currentRow-1][4] = "?";
			}
		}
	}
	function clearRow(){
		if(allowInput){
			for (let column = 0;column < 5;column++){
				document.getElementById("charBox" + currentRow + "" + (column+1)).innerHTML = "?";
				board[currentRow-1][column] = "?";
			}
			currentColumn = 1;
		}
	}
	function endGame(didWin){
		allowInput = false;
		score = 7 - currentRow;
		let greetings,greeting,status,summary;
		if (!(didWin)){
			greetings = ["Too Bad!","Ah Shucks!"];
			greeting = greetings[Math.floor(Math.random() * greetings.length)];
			status = "You Lost";
			summary  = "You Where unable to guess the word " + randomWord + " and got a score of  " + score;
		}
		else if(didWin){
			greetings = ["Congrats!","Good Job!"];
			greeting = greetings[Math.floor(Math.random() * greetings.length)];
			status = "You Won";
			summary = "You guessed the word " + randomWord + " in " + currentRow + " tries with a score of  " + score;

		}
		document.getElementById("mainView").hidden = true;
		document.getElementById("keyboard").style.display = "none";
		document.getElementById("scoreView").hidden = false;
		document.getElementById("scoreViewHeader").innerHTML = greeting + " " + status;
		document.getElementById("scoreViewScore").innerHTML = "Your score is:  " + score;
		document.getElementById("scoreViewSummary").innerHTML = summary;
	}
	document.addEventListener("keydown",function(event){
		if (alphabet.includes(event.key.toLowerCase()))addChar(event.key.toLowerCase());
		if (event.key == "Enter"){
			if (allowInput){
				submitWord();
			}
			else if(event.ctrlKey){
				startGame();
			}
		};
		if (event.key == "Backspace")
			if(event.ctrlKey){
				clearRow();
			}else{
				delChar();
			}
	})
	startGame();
	if (window.innerHeight > window.innerWidth){
		//using to change keyboard size 
	}
	var buttons = document.querySelectorAll("button.keyboard")
	for (let button = 0;button < buttons.length;button++){
		buttons[button].addEventListener('click', () => {
			console.log(this.innerHTML);
		})
	}
})
var aiIsPlaying = false;
async function playAI(){
	if (aiIsPlaying)return;
	aiIsPlaying = true;
	for (let rounds = 0; rounds < 6; rounds++) {
		if(!allowInput)break;
		await wait(2000);
		typeWord(hint()["Word"]);
	}
	aiIsPlaying = false;
}
var stopAI = false;
async function AIMode(){
	await playAI();
	await wait(5000);
	if (!stopAI){
		send('Enter',true);
		AIMode()
	}else{
		stopAI = false;
	}
}
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function sendData(data) {
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "http://10.0.0.175:5000/getWord",false); // false = synchronous
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Access-Control-Allow-Origin","*");
  
	xhr.send(JSON.stringify({ JSONData: data }));
  
	if (xhr.status === 200) {
	  return JSON.parse(xhr.responseText);
	} else {
	  console.error("❌ Request failed with status:", xhr.status);
	  return null;
	}
}
function hint(){
	var foundList = []
	var containedList = []
	var excludedString = ""
	var amount = [];
	var nonexcluded = ""
	for (let row = 1; row < 7; row++){
		for(let column = 1; column < 6;column++){
			const box = document.getElementById(`charBox${row}${column}`);
			const color = box.style.backgroundColor//getComputedStyle(box).backgroundColor;
			switch(color){
				case "green":
					foundList.push({"letter":box.innerText,"spot":column});
					nonexcluded += box.innerText;
					break;
				case "yellow":
					containedList.push({"letter":box.innerText[0],"location":column});
					const suptext = document.querySelector(`#charBox${row}${column} sup`).innerText;
					amount.push({"letter":box.innerText[0],"amount":parseInt(suptext,10)});
					nonexcluded += box.innerText[0]
					break;
				case "rgb(50, 50, 50)":
					if(nonexcluded.includes(box.innerText)){
						break;
					} else{
						excludedString += box.innerText;
					}
					
			}
		}
	}
	var content = {"contains":containedList,"excludes":excludedString,"found":foundList,"amount":amount};
	chosenWord = sendData(content);
	return chosenWord;
}
var typing = false//so it doesn't start typing more than one word at same time
async function typeWord(word){
	if(typing)return;
	typing = true;
	send('Backspace',true)
	for (let letter = 0; letter < 5;letter++){
		await wait(200)
		send(word[letter],false);
	}
	await wait(200)
	send("Enter",false);
	typing = false;
}

function send(key, ctrlPressed) {
    var eventOptions = { key: key, ctrlKey: ctrlPressed };
    var event = new KeyboardEvent('keydown', eventOptions);
    document.dispatchEvent(event);
}