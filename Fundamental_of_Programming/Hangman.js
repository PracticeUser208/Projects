var input = require("readline-sync");

const Word = require("./Word");
const WordCollection = require("./WordCollection");
var toWordCollection = new WordCollection;
var wordSelectedToGuess = toWordCollection.selectWord();
var scoreArr = []; // STORE THE SCORE OF THE GAME
var attempt = 10; // NUMBER OF COMPLETED QUESTION
var tryleft1 = 1;
var tryleft2 = 1;
var tryleft3 = 1;
var used = 1;
var name = ""
var guess = ""

// Main Program
console.clear();
console.log("-= Welcome to Hangman =-\n\nThe Theme is on Colour, Animals, Shapes and Everyday Items\n");
console.log("How score is given:\n1) 10 marks would be given if you answered the question correctly.");
console.log("2) 5 marks would be awarded if you use the lifeline that shows the answer.");
console.log("3) If you pass the question or when the 8 lifes per question are used up, no marks would be awarded.\n");

do {
    name = input.question("Please enter your name: ");
    if (name === "") {
        console.log("Name field is empty");
    }
} while (name === "")

for (var i = 0; i < 10; i++) {
    console.log();
    console.log("Word " + (i + 1) + " / 10\n");
    conductGuessRound();
}

var totalScore = toWordCollection.trackScore(scoreArr);
console.log("\n================================RESULTS================================");
console.log(`Congratulation you answered ${attempt} questions!`);
console.log(`Your total score for the game is ${100 + totalScore} / 100`);
console.log("See you next time!")
console.log("=======================================================================");

function conductGuessRound() {
    var blanks = wordSelectedToGuess[i].word; // WORD TO GUESS
    var define = wordSelectedToGuess[i].definition // DEFINITION OF WORD
    var lettersUserInput = []; // ALL LETTERS ENTERED
    var lettersUserInputFilter = []; // REMOVE DUPLICATE FROM LETTER ENTERED
    var vowels = new Array(5); // TO STORE VOWELS WHEN ENTERED BY USER
    var actualVowels = new Array(5) // STORE THE VOWELS IN THE WORD
    var actualLetters = new Array(blanks.length); // STORE ALL THE LETTER THAT IS IN THE WORD
    var actualWord = new Array(blanks.length); // ACTUAL WORD IN ARRAY FORM
    var correctLetters = []; // NEW ARRAY AND DISPLAY WHEN A correctLetters LETTER IS ENTERED
    var correctLetterGuessed = 0; // RESET THE LIFE OF THE WORD
    var lifes = 0; // LIFE FOR THE GAME
    var valuesToReturn = []; // RETURN MULTIPLE VALUES
    var str = "";
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "\nN", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X", "Y", "Z"];
    str += letters;
    alphabet = str.replace(new RegExp(",", 'g'), " ");
    console.log(toWordCollection.numberOfBlanks(blanks) + "\n");
    console.log(alphabet);

    // CHECK WHAT VOWELS ARE THERE IN THE WORD
    for (var j = 0; j < blanks.length; j++) {
        if (blanks[j] == "A" || blanks[j] == "E" || blanks[j] == "I" || blanks[j] == "O" || blanks[j] == "U") {
            switch (blanks[j]) {
                case 'A': actualVowels[0] = (blanks[j].toUpperCase());
                    break;
                case 'E': actualVowels[1] = (blanks[j].toUpperCase());
                    break;
                case 'I': actualVowels[2] = (blanks[j].toUpperCase());
                    break;
                case 'O': actualVowels[3] = (blanks[j].toUpperCase());
                    break;
                case 'U': actualVowels[4] = (blanks[j].toUpperCase());
                    break;
            }
        }
    }

    // Store the individual letter into actualWord Array in order
    for (var m = 0; m < blanks.length; m++) {
        actualWord[m] = blanks[m];
    }

    // Loop Each Word
    while (correctLetterGuessed < blanks.length) {
        correctLetterGuessed = 0;
        do {
            guess = input.question("\n" + name + "'s guess (Enter 9 for lifelines or 0 to pass): ");
            if (guess === "") {
                console.log("\nInput cannot be empty. Please try again.\n");
                if (lettersUserInput.length == 0) {
                    console.log(toWordCollection.numberOfBlanks(blanks) + "\n");
                    console.log(alphabet);
                } else {
                    guessingForBlanksRemain(correctLetters, alphabet);
                }
            }
        } while (guess === "" && guess.length == 0);   
        guess = guess.toUpperCase();
        console.log();

        // Adds in guess if it is a vowel
        for (var n = 0; n < actualVowels.length; n++) {
            if (guess.toUpperCase() == actualVowels[n]) {
                vowels[n] = guess.toUpperCase();
            }
        }

        if (guess == 0 || guess == 9 || allLetters(guess, letters) == true) {
            if (guess == 0 || guess == 9) {
                if (guess == 0) {
                    var confirm = input.question("Are you sure you want to skip this word? (y for Yes, n for No) >> ")
                    while (confirm.toUpperCase() != "Y" && confirm.toUpperCase() != "N") {
                        console.log("Invalid Input\n");
                        confirm = input.question("Are you sure you want to skip this word? (y for Yes, n for No) >> ");
                    } 
                    if (confirm.toUpperCase() == "Y") {
                        attempt = skipWord(attempt, scoreArr);
                        break;
                    }
                }

                else {
                    console.log("1. Show Vowels\n2. Show Definition\n3. Score and move to next word\n4. Exit");
                    var option = input.questionInt(">> ");
                    console.log();
                    while (option != 1 && option != 2 && option != 3 && option != 4) {
                        console.log("Invalid Input! Please enter a valid choice!\n");
                        console.log("1. Show Vowels\n2. Show Definition\n3. Score and move to next word\n4. Exit");
                        option = input.questionInt(">> ");
                        console.log();
                    }
                    switch (option) {
                        case 1: valuesToReturn = hint(option, tryleft1, tryleft2, tryleft3, actualVowels, actualWord, actualLetters,
                            lettersUserInput, correctLetterGuessed, lettersUserInputFilter, vowels, blanks, correctLetters, define, guess);
                            tryleft1 = valuesToReturn[0];
                            lettersUserInputFilter = valuesToReturn[1];
                            break;
                        case 2: tryleft2 = hint(option, tryleft1, tryleft2, tryleft3, actualVowels, actualWord, actualLetters,
                            lettersUserInput, correctLetterGuessed, lettersUserInputFilter, vowels, blanks, correctLetters, define, guess);
                            break;
                        case 3: tryleft3 = hint(option, tryleft1, tryleft2, tryleft3, actualVowels, actualWord, actualLetters,
                            lettersUserInput, correctLetterGuessed, lettersUserInputFilter, vowels, blanks, correctLetters, define, guess);
                    }
                    if (tryleft3 == 0 && used == 1) {
                        used--;
                        scoreArr.push(-5)
                        break;
                    }
                    for (var k = 0; k < blanks.length; k++) {
                        if (correctLetters[k] == undefined) {
                            console.log(toWordCollection.numberOfBlanks(blanks) + "\n\n" + alphabet);
                            break;
                        }
                    }
                }
            } else {
                // When letter entered is correct
                if (toWordCollection.checkGuess(guess, blanks, lettersUserInputFilter) == 1) {
                    valuesToReturn = correctLetterEntered(guess, lettersUserInput, lettersUserInputFilter, actualWord, actualLetters, 
                    blanks, correctLetters);
                    correctLetterGuessed = valuesToReturn[0];
                    lettersUserInputFilter = valuesToReturn[1];
                    alphabet = valuesToReturn[2];
                }
                // When the letter is entered before
                else if (toWordCollection.checkGuess(guess, blanks, lettersUserInputFilter) == 3) {
                    console.log("You have entered this letter before!\n");
                    guessingForBlanksRemain(correctLetters, alphabet);
                }
                // When letter entered is wrong
                else if (toWordCollection.checkGuess(guess, blanks, lettersUserInputFilter) == 4) {
                    valuesToReturn = wrongLetterEntered(guess, blanks, actualLetters, lettersUserInput, lettersUserInputFilter, 
                    lifes, attempt, scoreArr, alphabet, correctLetters)
                    lifes = valuesToReturn[0];
                    lettersUserInputFilter = valuesToReturn[1];
                    alphabet = valuesToReturn[2];
                    if (lifes == 8) {
                        break;
                    }
                }
            }
        }
        else {
            console.log("Invalid Input\n");
            if (correctLetters.length == 0) {
                console.log(toWordCollection.numberOfBlanks(blanks) + "\n");
                alphabet = alphabet.replace(new RegExp(guess.toUpperCase(), 'g'), " ");
                console.log(alphabet);
                console.log()
            } else {
                guessingForBlanksRemain(correctLetters, alphabet);
            }

        }
    }
}

function skipWord(attempt, scoreArr) {
    attempt--;
    scoreArr.push(-10);
    console.log("You skipped this question! The answer is " + wordSelectedToGuess[i].word)
    return attempt;
}

function hint(option, tryleft1, tryleft2, tryleft3, actualVowels, actualWord, actualLetters, lettersUserInput, correctLetterGuessed, 
    lettersUserInputFilter, vowels, blanks, correctLetters, define, filtered, guess) {
    // Option 1 to show vowels
    var c = 0;
    if (option == 1) {
        if (tryleft1 == 1) {
            while (c < actualVowels.length) {
                if (actualVowels[c] != undefined) {
                    for (var k = 0; k < actualWord.length; k++) {
                        if (actualVowels[c].toUpperCase() == actualWord[k].toUpperCase()) {
                            actualLetters[k] = actualVowels[c].toUpperCase();
                            lettersUserInput.push(actualVowels[c].toUpperCase());
                        }
                    }
                } c++;
            }
            correctLetterGuessed = toWordCollection.numOfOccurence(actualLetters);
            lettersUserInputFilter = lettersUserInput.filter((value, index) => lettersUserInput.indexOf(value) === index);
            tryleft1--;
            var valuesToReturn = [tryleft1, lettersUserInputFilter];
            if (toWordCollection.lifeLines(option, vowels, actualVowels, blanks) == "used") {
                console.log("You have used all the vowels\n");
                tryleft1++;
                valuesToReturn = [tryleft1, lettersUserInputFilter];
                guessingForBlanksRemain(correctLetters, alphabet);
            }
            else {
                filtered = toWordCollection.replaceLetters(blanks, correctLetters, lettersUserInputFilter) + "\n";
                filtered = filtered.replace(new RegExp(",", 'g'), " ");
                console.log(filtered);
                alphabet = alphabet.replace(new RegExp("A", 'g'), " ");
                alphabet = alphabet.replace(new RegExp("E", 'g'), " ");
                alphabet = alphabet.replace(new RegExp("I", 'g'), " ");
                alphabet = alphabet.replace(new RegExp("O", 'g'), " ");
                alphabet = alphabet.replace(new RegExp("U", 'g'), " ");
                console.log(alphabet);
                lettersUserInputFilter.push("A");
                lettersUserInputFilter.push("E");
                lettersUserInputFilter.push("I");
                lettersUserInputFilter.push("O");
                lettersUserInputFilter.push("U");
                lettersUserInputFilter = lettersUserInput.filter((value, index) => lettersUserInput.indexOf(value) === index);
            }
        } else {
            console.log("You have used this hint before!\n");
            guessingForBlanksRemain(correctLetters, alphabet);
            tryleft1 = 0;
            valuesToReturn = [tryleft1, lettersUserInputFilter];
        }
        return valuesToReturn;
    }

    // Option 2 to show definition of word
    else if (option == 2) {
        if (tryleft2 == 1) {
            console.log(define + "\n");
            for (var i = 0; i < 1; i++) {
                if (correctLetters[i] != undefined) {
                    guessingForBlanksRemain(correctLetters, alphabet);
                } 
            }
            tryleft2--;
        } else {
            console.log("You have used this hint before!\n");
            if (lettersUserInputFilter != 0) {
                for (var i = 0; i < 1; i++) {
                    if (correctLetters[i] == undefined) {
                        console.log(toWordCollection.numberOfBlanks(blanks) + "\n");
                        console.log(alphabet);
                    } else {
                        guessingForBlanksRemain(correctLetters, alphabet);
                    }
                }
            }
        }
        return tryleft2;
    }

    // Option 3 to show the answer
    else if (option == 3) {
        if (tryleft3 == 1) {
            console.log(toWordCollection.lifeLines(option, vowels, actualVowels, blanks) + "\n");
            tryleft3--;
        } else {
            console.log("You have used this hint before!\n");
        }
    }
    // Option 4
    else {
        filtered = toWordCollection.replaceLetters(blanks, correctLetters, lettersUserInputFilter) + "\n";
        filtered = filtered.replace(new RegExp(",", 'g'), " ");
        console.log(fil);
        console.log(alphabet);
    }
    return tryleft3;
}

function correctLetterEntered(guess, lettersUserInput, lettersUserInputFilter, actualWord, actualLetters, blanks, correctLetters) {
    console.log("Good job! " + guess.toUpperCase() + " is one of the letters!\n");
    lettersUserInput.push(guess.toUpperCase());
    lettersUserInputFilter = lettersUserInput.filter((value, index) => lettersUserInput.indexOf(value) === index);
    for (var d = 0; d < actualWord.length; d++) {
        if (guess.toUpperCase() == actualWord[d].toUpperCase()) {
            actualLetters[d] = guess.toUpperCase();
        }
    }
    correctLetterGuessed = toWordCollection.numOfOccurence(actualLetters);
    var filtered = toWordCollection.replaceLetters(blanks, correctLetters, actualLetters) + "\n";
    alphabet = newSetofBlanksandAlphabets(filtered, alphabet, guess);
    var valuesToReturn = [correctLetterGuessed, lettersUserInputFilter, alphabet]
    return valuesToReturn;
}

function wrongLetterEntered(guess, blanks, actualLetters, lettersUserInput, lettersUserInputFilter, lifes, attempt, scoreArr, alphabet, 
    correctLetters) {
    console.log(`Sorry. ${guess.toUpperCase()} is not part of the word.`)
    lettersUserInput.push(guess.toUpperCase());
    lettersUserInputFilter = lettersUserInput.filter((value, index) => lettersUserInput.indexOf(value) === index);
    lifes++;
    toWordCollection.totalLife(lifes);
    if (lifes == 8) {
        console.log("You lost all your life!\n");
        attempt--;
        scoreArr.push(-10);
    }
    var filtered = toWordCollection.replaceLetters(blanks, correctLetters, actualLetters) + "\n";
    alphabet = newSetofBlanksandAlphabets(filtered, alphabet, guess);
    var valuesToReturn = [lifes, lettersUserInputFilter, alphabet];
    return valuesToReturn;
}

function newSetofBlanksandAlphabets(filtered, alphabet, guess) {
    filtered = filtered.replace(new RegExp(",", 'g'), " ");
    console.log(filtered);
    alphabet = alphabet.replace(new RegExp(guess.toUpperCase(), 'g'), " ");
    console.log(alphabet);
    return alphabet;
}

function allLetters(guess, letters) {
    for (var m = 0; m < letters.length; m++) {
        if (guess.toUpperCase() == letters[m] || guess.toUpperCase() == "N") {
            return true;
        }
    }
}

function guessingForBlanksRemain(correctLetters, alphabet) {
    var str = "";
    str += correctLetters;
    str = str.replace(new RegExp(",", 'g'), " ");
    console.log(str + "\n");
    console.log(alphabet);
}
