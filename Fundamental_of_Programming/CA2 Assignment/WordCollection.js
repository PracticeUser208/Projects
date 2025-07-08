const Word = require('./Word');
const getAllForGuess = require('./getAllForGuess');
var getWords = getAllForGuess.getWords;
var getDefinitions = getAllForGuess.getDefinitions;

class WordCollection {
    constructor() {
        this.pool = [];
        for (var p = 0; p < 40; p++) {
            this.pool.push(new Word(getWords()[p], getDefinitions()[p]));
        }
    }

    selectWord() {
        this.selectedWord = [];
        this.num = [];
        this.filtered = [];
        while (this.filtered.length < 10) {
            var idx = Math.floor(Math.random() * 40);
            this.num.push(idx);
            this.filtered = this.num.filter((value, index) => this.num.indexOf(value) === index);
        }
        for (var i = 0; i < this.filtered.length; i++) {
            this.selectedWord.push(this.pool[this.filtered[i]]);
        }
        return this.selectedWord;
    }

    numberOfBlanks(currentWord) {
        this.line = [];
        for (var j = 0; j < currentWord.length; j++) {
            var symbol = "_ ";
            this.line += symbol;
        }
        return this.line;
    }

    checkGuess(letter, word, filter) {
        this.occurence = 0;

        if (filter.length > 0) {
            for (var k = 0; k < word.length; k++) {
                if (letter.toUpperCase() == filter[k]) {
                    return 3;
                }
            }
        }

        for (var k = 0; k < word.length; k++) {
            if (letter.toUpperCase() == (word[k]).toUpperCase()) {
                this.occurence += 1;
            }
        }

        if (this.occurence > 0) {
            return 1;
        } else {
            return 4;
        }
    }

    numOfOccurence(actualLetter) {
        var occur = 0;
        for (var i = 0; i < actualLetter.length; i++) {
            if (actualLetter[i] != undefined) {
                occur++;
            }
        } return occur;
    }

    replaceLetters(blanks, correctLetters, arrayFilter) {
        if (arrayFilter.length != 0) {
            for (var i = 0; i < blanks.length; i++) {
                var j = 0;
                while (j < arrayFilter.length) {
                    if (arrayFilter[j] == blanks[i].toUpperCase()) {
                        correctLetters[i] = arrayFilter[j].toUpperCase();
                        j++;
                        break;
                    } else {
                        correctLetters[i] = "_";
                        j++
                    }
                }
            }
        } else {
            correctLetters = this.numberOfBlanks(blanks);
        } return correctLetters;
    }

    totalLife(life) {
        switch (life) {
            case 1:
                console.log("__|__")
                console.log("|    |________")
                console.log("|             |")
                console.log("|_____________|")
                console.log();
                break;
            case 2:
                console.log("   _____")
                console.log("  |     |")
                console.log("  |  ")
                console.log("  |  ")
                console.log("  |  ")
                console.log("  |  ")
                console.log("__|__")
                console.log("|    |________")
                console.log("|             |")
                console.log("|_____________|")
                console.log();
                break;
            case 3:
                console.log("   _____")
                console.log("  |     |")
                console.log("  |     O")
                console.log("  |  ")
                console.log("  |  ")
                console.log("  |  ")
                console.log("__|__")
                console.log("|    |________")
                console.log("|             |")
                console.log("|_____________|")
                console.log();
                break;
            case 4:
                console.log("   _____")
                console.log("  |     |")
                console.log("  |     O")
                console.log("  |     |")
                console.log("  |     |")
                console.log("  |  ")
                console.log("__|__")
                console.log("|    |________")
                console.log("|             |")
                console.log("|_____________|")
                console.log();
                break;
            case 5:
                console.log("   _____")
                console.log("  |     |")
                console.log("  |     O")
                console.log("  |    /|")
                console.log("  |     |")
                console.log("  |  ")
                console.log("__|__")
                console.log("|    |________")
                console.log("|             |")
                console.log("|_____________|")
                console.log();
                break;
            case 6:
                console.log("   _____")
                console.log("  |     |")
                console.log("  |     O")
                console.log("  |    /|\\")
                console.log("  |     |")
                console.log("  |  ")
                console.log("__|__")
                console.log("|    |________")
                console.log("|             |")
                console.log("|_____________|")
                console.log();
                break;
            case 7:
                console.log("   _____")
                console.log("  |     |")
                console.log("  |     O")
                console.log("  |    /|\\")
                console.log("  |     |")
                console.log("  |    / ")
                console.log("__|__")
                console.log("|    |________")
                console.log("|             |")
                console.log("|_____________|")
                console.log();
                break;
            case 8:
                console.log("   _____")
                console.log("  |     |")
                console.log("  |     O")
                console.log("  |    /|\\")
                console.log("  |     |")
                console.log("  |    / \\")
                console.log("__|__")
                console.log("|    |________")
                console.log("|             |")
                console.log("|_____________|")
                console.log();
                break;
        }
    }

    lifeLines(option, vowels, actualVowels, word) {
        var count = 0;
        if (option == 1) {
            for (var i = 0; i < actualVowels.length; i++) {
                if (vowels[i] == actualVowels[i]) {
                    count++;
                }
            } if (count == 5) {
                return "used";
            } else {
                return "not-used"
            }
        }
        else if (option == 2) {}
        else {
            return "The answer is " + word;
        }
    }

    trackScore(scoreArr) {
        var sum = 0;
        for (var i = 0; i < scoreArr.length; i++) {
            sum += scoreArr[i];
        }
        return sum;
    }
}

module.exports = WordCollection;   