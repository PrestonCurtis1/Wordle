# hint function
- must be running my <a href="https://github.com/PrestonCurtis1/wordle-answer-finder">Wordle Answer Finder</a> flask app. on localhost:5000
- can be use if you are stuck.
- build the data that will be sent to the <a href="https://github.com/PrestonCurtis1/wordle-answer-finder">Wordle Answer Finder</a> API in **sendData**
# playAI function
- plays the round as an AI.
- just uses **hint** 6 times in a row
# typeWord function
- can be used to type a whole word rather than using **send** 5 times
# sendData function
- makes the request to the <a href="https://github.com/PrestonCurtis1/wordle-answer-finder">Wordle Answer Finder</a> API. and sends back the best most probable word. using the data built by hint() function;
# startGame function
- set **currentRow** to 1
- set **currentColumn** to 1
- pick a **randomWord**
- set up a 2d dimensional array with 6 lists and 5 chars in each list
- set the backgroundColor of each box to white

# addChar function
- place the given character at that location in the array **board[currentRow][currentColumn]**
- change the innerHTML attribute of the given location on the game board
- increment the *currentColumn* if the *currentColumn* is inequal to 6

# submitWord Function
- make sure all 5 characters have been given alert the user if not
- if a character is in the same spot change the background color of that cell to green and increment **rightSpotCounter**
- if the character is not in the same spot check if its in the word if it is change the background color to yellow and increment **foundInWordCounter**
- if the character is not in the word change the background color to gray
- call the **checkWin function**

# checkWin function
- check if the word is the correct word
- if the word is correct take 7 and minus the **currentRow** variable from it - to get the score then call **endGame function**
-if the word is incorrect and theyre on theyre six try notify them of
their loss then call **endGame function**
if the word is incorrect and there not on there 6th trie increment **currentRow** and set **currentColumn** to 1



# delChar function
- check which index the first question mark appears
- set the cell before it to a question mark unless its the first one
- if theyre are no checkmarks set the 5th cell to a checkMark


# clearRow function
- loop through each cell in the **currentRow** and set the innerHTML to a ?
- set the **currentColumn** to 1

# calculateSore function
- take 7 and minus the **currentRow**

# endGame function
- hide the **keyboard** and **gameBoard**
- unhide **scoreView**
- Tell the user whether they won or lost
- show them their **score**

<a href="https://docs.google.com/forms/d/e/1FAIpQLSfYcE6lkHFAm6eyPcMayc6V49NjjVjgblwVyxvr0A3T5ZQVjQ/viewform?usp=sf_link">Send Feedback</a>
