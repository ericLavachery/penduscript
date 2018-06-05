
// create cookie function
function createCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// get cookie function
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// get cookie with done words
var dwJSON = getCookie('dwCookie');
if (dwJSON !== '') {
    var doneWords = JSON.parse(dwJSON);
} else {
    var doneWords = [];
}

// console.log(doneWords);

// reset
var goodLetters = [];
var foundLetters = [];
var restLetters = [];

// prompt for new word
var yourInput = prompt("Add your own word, or leave empty for a random word", "");

// capitalize the new word if there is one
if (typeof yourInput !== 'object') {
    if (!/[^a-z]/i.test(yourInput)) {
        yourEntry = yourInput.toUpperCase();
    } else {
        yourEntry = '';
    }
} else {
    yourEntry = '';
}

// console.log("your entry = " + yourEntry);

// take a random word in an array if no word was entered
if (yourEntry == '' || yourEntry == null) {
    var myWords = [
        "BONJOUR",
        "TYRANNOSAURE",
        "CAOUTCHOUC",
        "OISEAU",
        "HYDROPHOBE",
        "SCHISME",
        "COCCYX",
        "WHISKY",
        "CABINET",
        "PLAFOND",
        "JALOUX",
        "JAVASCRIPT",
        "SCHTROUMPF",
        "FLUORESCENCE",
        "PARTITION",
        "SULTAN",
        "DILIGENCE",
        "PATAGONIE",
        "MALOTRU",
        "TRIANGLE",
        "PERDITION",
        "NOMENCLATURE",
        "DESHABILLER",
        "CRAYON",
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
        "APPUYER",
        "DUPLEX",
        "ZERO",
        "USURPER",
        "AMYGDALES",
        "ASTHME",
        "GNOU",
        "YGTHOMURAJADOLUW"
    ];

    // take a random word and repeat if word is already done
    var ii = 0;
    while (ii <= 200) {
        var myWord = myWords[Math.floor(Math.random()*myWords.length)];
        // console.log(myWord);
        if (doneWords.includes(myWord) == false) {break;}
        ii = ii + 1;
    }

    // choose a word
    // var myWord = myWords[Math.floor(Math.random()*myWords.length)];
    // console.log("Word = " + myWord);

} else {
    var myWord = yourEntry;
}

// console.log(myWord);

// makes goodLetters, restLetters and foundLetters arrays
var i = 0;
while (i != myWord.length) {
    goodLetters.push(myWord.substr(i, 1));
    restLetters.push(myWord.substr(i, 1));
    foundLetters.push("_");
    i = i + 1;
}

// reset testedLetters and potence
var testedLetters = [];
var potence = 0;

// Print the word
document.getElementById("wordpart").innerHTML = foundLetters.join(" ");
document.getElementById("tested").innerHTML = "Tested letters: /";

// THE GAME
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
            // Rajouter le mot trouvé dans le cookie
            doneWords.push(myWord);
            var dwJSON = JSON.stringify(doneWords);
            createCookie('dwCookie', dwJSON, 60);
        }

    document.getElementById("tell").innerHTML = response;
    }
}
