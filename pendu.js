
var goodLetters = [];
var foundLetters = [];
var restLetters = [];

var yourEntry = prompt("Add your own word, or leave empty for a random word", "");

if (!/[^a-z]/i.test(yourEntry)) {
    yourEntry = yourEntry.toUpperCase();
} else {
    yourEntry = '';
}


// console.log("your entry = " + yourEntry);

if (yourEntry === '') {
    var myWords = [
        "BONJOUR",
        "CAOUTCHOUC",
        "OISEAU",
        "JAVASCRIPT",
        "SCHTROUMPF",
        "TYRANNOSAURE",
        "FLUORESCENCE",
        "PARTITION",
        "SULTAN",
        "DILIGENCE",
        "PATAGONIE",
        "MALOTRU",
        "TRIANGLE",
        "PERDITION",
        "NOMENCLATURE",
        "FILANDREUX",
        "FASTOCHE",
        "MICROBIOTIQUE",
        "BOA",
        "BARBITURIQUE",
        "ESCALADE",
        "PLASTIQUE",
        "MYRIADE",
        "ORNITHOPTERE",
        "SALTIMBANQUE",
        "DUPLEX",
        "ZERO",
        "USURPER",
        "AMYGDALES",
        "ASTHME",
        "GNOU",
        "YGTHOMURAJODOLUW"
    ];
    // choose a word
    var myWord = myWords[Math.floor(Math.random()*myWords.length)];
} else {
    var myWord = yourEntry;
}

// console.log(myWord);

var i = 0;
while (i != myWord.length) {
    goodLetters.push(myWord.substr(i, 1));
    restLetters.push(myWord.substr(i, 1));
    foundLetters.push("_");
    i = i + 1;
}

var testedLetters = [];
var potence = 0;

// Print the word
document.getElementById("wordpart").innerHTML = foundLetters.join(" ");
document.getElementById("tested").innerHTML = "Tested letters: /";

function guessLetter() {
    var inLetter = prompt("Please type a letter", "");
    var yourLetter = inLetter.toUpperCase();
    if (yourLetter != null) {
        document.getElementById("took").innerHTML = "You took " + yourLetter + ", and ";

        if (goodLetters.includes(yourLetter)) {

            if (restLetters.includes(yourLetter)){
                var index = restLetters.indexOf(yourLetter);
                if (index !== -1) {
                    foundLetters[index] = yourLetter;
                    restLetters[index] = "_"
                }

// un faux loop, la honte
                if (restLetters.includes(yourLetter)){
                    var index = restLetters.indexOf(yourLetter);
                    if (index !== -1) {
                        foundLetters[index] = yourLetter;
                        restLetters[index] = "_"
                    }
                    if (restLetters.includes(yourLetter)){
                        var index = restLetters.indexOf(yourLetter);
                        if (index !== -1) {
                            foundLetters[index] = yourLetter;
                            restLetters[index] = "_"
                        }
                        if (restLetters.includes(yourLetter)){
                            var index = restLetters.indexOf(yourLetter);
                            if (index !== -1) {
                                foundLetters[index] = yourLetter;
                                restLetters[index] = "_"
                            }
                        }
                    }
                }
// fin du faux loop

                var response = '<span style="color: blue;">' + yourLetter + ' is in my word!</span>';
            } else {
                var response = "There's no more " + yourLetter + " in my word...";
            }

            // re-Print the word
            document.getElementById("wordpart").innerHTML = foundLetters.join(" ");

        } else {
            potence = potence + 1;
            if (testedLetters.includes(yourLetter)) {
                var response = '<span style="color: red;">' + yourLetter + ' is <strong>still</strong> not in my word!</span>';
            } else {
                var response = '<span style="color: red;">' + yourLetter + ' is not in my word...</span>';
            }
        }

        if (testedLetters.includes(yourLetter)) {
        } else {
            testedLetters.push(yourLetter);
            document.getElementById("tested").innerHTML = "Tested letters: " + testedLetters.join(".");
        }

        if (foundLetters.includes("_")) {
            if (potence >= 7) {
                document.getElementById("won").innerHTML = '<span style="color: red;">YOU ARE DEAD</span>';
            }
            document.getElementById("pendu").innerHTML = '<img src="img/pendu' + potence + '.png" alt="">';
        } else {
            document.getElementById("won").innerHTML = '<span style="color: blue;">YEEEEHEEEEE!!!</span>';
        }

    document.getElementById("tell").innerHTML = response;
    }
}
