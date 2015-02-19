paper.install(window);

// (function main() {

var characterPaths = null;
$.getJSON("fonts/Courier_Prime.json", function(data) {
    // charData = data;
    characterPaths = {};
    for (var key in data) {
        var cp  = new CompoundPath(data[key].data);
        cp.scale(1, -1);
        characterPaths[key] = cp;
    }
    console.log("done");
});

var segmentColour = "#eee";
var backgroundColour = "#1a1a1a";

var canvas = document.getElementById("myCanvas");

paper.setup(canvas);

project.activeLayer.transformContent = true;

var digit = project.importSVG(document.getElementById("digit"), {
    expandShapes: true
});

digit.children[0].name = "box";
digit.children[1].name = "segments";

var a = "A".charCodeAt();
digit.children["segments"].children.forEach(function(segment) {
    segment.name = String.fromCharCode(a++);
    // segment.reverse();
});

var dpoint = digit.position.clone();
digit.position = new Point(0, 0);
digit.strokeColor = null;
digit.children["segments"].fillColor = segmentColour;
digit.children["box"].fillColor = backgroundColour;
digit.children["box"].strokeColor = backgroundColour;

var tbt = new Group();
var dbounds = digit.getBounds();
var trans = new Point();
var nx = 3;
var ny = 3;
for (var i = 0; i < ny; i++) {
    for (var j = 0; j < nx; j++) {
        var d = digit.clone();

        trans.x = dbounds.width * j + dpoint.x;
        trans.y = dbounds.height * i + dpoint.y;
        d.children["box"].translate(trans);

        d.children["segments"].children.forEach(function(segment) {
            segment.translate(trans);
        });

        tbt.addChild(d);
    }
}

digit.visible = false;



// var letters = project.importSVG(document.getElementById("letter"), {
    // expandShapes: true
// });
var letter = null; //new CompoundPath(charData["S"].data);

function fitLetter(letter, toGroup) {
    
    var letterPoints = [].concat.apply([], letter.children.map(function(path) {
        return path.segments.map(function(segment) {
            return segment.point;
        });
    }));

    function getBounds(list) {
        var min = Math.min.apply(null, list);
        var max = Math.max.apply(null, list);
        return {
            min: min,
            max: max,
            range: max - min,
        };
    }

    var bounds = {
        x: getBounds(letterPoints.map(function(point) { return point.x; })),
        y: getBounds(letterPoints.map(function(point) { return point.y; })),
    };

    // console.log(JSON.stringify(bounds));
    // bounds = {"x":{"min":80,"max":904,"range":824},"y":{"min":-25,"max":1490,"range":1515}};


    var aspectRatio = bounds.x.range / bounds.y.range;

    var wantedSize = new Size(toGroup.bounds.size);
    var shift = new Point(bounds.x.min, bounds.y.min);
    var scale = new Point(wantedSize.width/bounds.x.range, wantedSize.height/bounds.y.range);

    var wantedAspectRatio = wantedSize.width / wantedSize.height;

    // console.log(wantedAspectRatio > aspectRatio);
    if (wantedAspectRatio > aspectRatio) {
        scale = scale.y;
    }
    else {
        scale = scale.x;
    }

    var atts = ["_point", "_handleIn", "_handleOut"];
    for (var j = 0; j < letter.children.length; j++) {
        var segs = letter.children[j].segments;
        letter.children[j].segments = segs.map(function(e) {
            e["_point"] = e["_point"].subtract(shift);
            for (var i = 0; i < 3; i++) {
                // e[atts[i]] = e[atts[i]].multiply(0.2);
                e[atts[i]] = e[atts[i]].multiply(scale, scale);
                // e[atts[i]] = e[atts[i]].subtract(shift);
            }
            return e;
        });
    }

    letter.position = toGroup.position;
    letter.fillColor = null; new Color(1, 1, 0, 0.25);

    return letter;
}

var start = performance.now();
function lightDigits(digitGroup, character) {
    digitGroup.children.forEach(function(d) {
        d.children["segments"].children.forEach(function(segment){
            segment.fillColor = null; "green";        // console.log(e.bounds);

            var isect = segment.intersect(character);
            segment.on = false;
            if (isect.children !== undefined && isect.children.length === 0) {
                return;
            }

            // isect.fillColor = "yellow"; "#666";
            // isect.strokeColor = "red";


            // console.log(isect.area + " -> " + segment.area)
            if (isect.area > segment.area*0.6) {
                segment.fillColor = segmentColour;
                segment.on = true;
            }
        });
    });
}

// lightDigits(tbt, letter);
console.log("took:" + (performance.now() - start));


project.activeLayer.scale(1.2, new Point(0,0))
view.draw();

var gr = new Group();
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
        var k = j * nx + i;
        gr.children.push(tbt.children[k]);
    }
}

// gr.fillColor = "red";

// var tool = new Tool();
function Action() {
    var tool = new Tool();
    
    tool.onKeyDown = function(event) {

        try {
            // var glyph = $("#letters [unicode="+event.character+"]");
            if (letter) {
                // letter.visible = false;
            }
            // letter = new CompoundPath(charData[event.character].data);
            // letter.visible = true;
            // console.log(charData[event.character].data);
            lightDigits(tbt, fitLetter(characterPaths[event.character], gr));

            function getVal(digit) {
                var c = digit.children["segments"].children.map(function(segment) {
                    return segment.on;
                });
                
                var powers = [0,1,2,3,4,5,6,7].map(function (e) {
                    return Math.pow(2, e);
                });

                var pandv = _.zip(powers, c);
                var mapped = _.map(pandv, function(e) {
                    return e[0] * e[1];
                });
                var ans = _.reduce(mapped, function(a, b) {
                    return a+b;
                }, 0);

                return ans;
            }

            var vals = _.map(tbt.children, getVal);
            console.log(vals);

            // console.log(ans);
        }
        catch(err) {
            console.log(err);
        }
        // console.log(event);
    }
    
}

var action = new Action();
