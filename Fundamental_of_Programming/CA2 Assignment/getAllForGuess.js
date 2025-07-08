var fs = require('fs');

function getWords() {
    var worddata = fs.readFileSync('./getWords.txt', 'utf8'); 
    var wordList = worddata.split("\r\n");
    return wordList;
}

function getDefinitions() {
    var definitiondata = fs.readFileSync('./Definition.txt', 'utf8'); 
    var definitionList = definitiondata.split("\r\n");
    return definitionList;
}


module.exports = {
    getWords,
    getDefinitions
}
