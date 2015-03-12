#!/usr/local/bin/node

if (process.argv.length < 3) {
    console.log("no file passed, exiting.");
    process.exit();
}


var fs = require('fs');
var cheerio = require('cheerio');

var charData = { "!": { "name" : "exclam" }, "\"": { "name" : "quotedbl" }, "#": { "name" : "numbersign" }, "$": { "name" : "dollar" }, "%": { "name" : "percent" }, "&": { "name" : "ampersand" }, "'": { "name" : "quotesingle" }, "(": { "name" : "parenleft" }, ")": { "name" : "parenright" }, "*": { "name" : "asterisk" }, "+": { "name" : "plus" }, ",": { "name" : "comma" }, "-": { "name" : "hyphen" }, ".": { "name" : "period" }, "/": { "name" : "slash" },"0": { "name" : "zero" }, "1": { "name" : "one" }, "2": { "name" : "two" }, "3": { "name" : "three" }, "4": { "name" : "four" }, "5": { "name" : "five" }, "6": { "name" : "six" }, "7": { "name" : "seven" }, "8": { "name" : "eight" }, "9": { "name" : "nine" }, ":": { "name" : "colon" }, ";": { "name" : "semicolon" }, "<": { "name" : "less" }, "=": { "name" : "equal" }, ">": { "name" : "greater" }, "?": { "name" : "question" }, "@": { "name" : "at" }, "A": { "name" : "A" }, "B": { "name" : "B" }, "C": { "name" : "C" }, "D": { "name" : "D" }, "E": { "name" : "E" }, "F": { "name" : "F" }, "G": { "name" : "G" }, "H": { "name" : "H" }, "I": { "name" : "I" }, "J": { "name" : "J" }, "K": { "name" : "K" }, "L": { "name" : "L" }, "M": { "name" : "M" }, "N": { "name" : "N" }, "O": { "name" : "O" }, "P": { "name" : "P" }, "Q": { "name" : "Q" }, "R": { "name" : "R" }, "S": { "name" : "S" }, "T": { "name" : "T" }, "U": { "name" : "U" }, "V": { "name" : "V" }, "W": { "name" : "W" }, "X": { "name" : "X" }, "Y": { "name" : "Y" }, "Z": { "name" : "Z" }, "[": { "name" : "bracketleft" }, "\\": { "name" : "backslash" }, "]": { "name" : "bracketright" }, "^": { "name" : "asciicircum" }, "_": { "name" : "underscore" }, "`": { "name" : "grave" }, "a": { "name" : "a" }, "b": { "name" : "b" }, "c": { "name" : "c" }, "d": { "name" : "d" }, "e": { "name" : "e" }, "f": { "name" : "f" }, "g": { "name" : "g" }, "h": { "name" : "h" }, "i": { "name" : "i" }, "j": { "name" : "j" }, "k": { "name" : "k" }, "l": { "name" : "l" }, "m": { "name" : "m" }, "n": { "name" : "n" }, "o": { "name" : "o" }, "p": { "name" : "p" }, "q": { "name" : "q" }, "r": { "name" : "r" }, "s": { "name" : "s" }, "t": { "name" : "t" }, "u": { "name" : "u" }, "v": { "name" : "v" }, "w": { "name" : "w" }, "x": { "name" : "x" }, "y": { "name" : "y" }, "z": { "name" : "z" }, "{": { "name" : "braceleft" }, "|": { "name" : "bar" }, "}": { "name" : "braceright" }, "~": { "name" : "asciitilde" } };

var infile = process.argv[2];
var outfile = infile.replace(".svg", ".json");
if (process.argv[3] !== undefined) {
    outfile = process.argv[3];
}

fs.readFile(infile, function (rerr, data) {
    if (rerr) {
        throw rerr; 
    }
    
    $ = cheerio.load(data.toString());

    var chars = Object.keys(charData);

    chars.forEach(function(char){
        var d = $("glyph [glyph-name='" + charData[char].name + "']").attr("d");
        charData[char].data = d;
    });
   

    fs.writeFile(outfile, JSON.stringify(charData), function(werr) {
        if(werr) {
            throw werr;
        }
    });
}); 
    

