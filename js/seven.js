paper.install(window);

// (function main() {

var segmentColour = "#eee";
var backgroundColour = "#111";

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
    segment.reverse();
});


digit.strokeColor = null;
digit.children["segments"].fillColor = segmentColour;
digit.children["box"].fillColor = backgroundColour;
digit.children["box"].strokeColor = backgroundColour;

var tbt = new Group();
var dbounds = digit.getBounds();
var n = 5;
for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
        var d = digit.clone();

        d.children["box"].translate(dbounds.width * i, dbounds.height * j);

        d.children["segments"].children.forEach(function(segment) {
            segment.translate(dbounds.width * i, dbounds.height * j);
        });

        tbt.addChild(d);
    }
}

digit.visible = false;



// var letters = project.importSVG(document.getElementById("letter"), {
    // expandShapes: true
// });
var letter = new CompoundPath($("#letters [unicode=s]").attr("d"));

function fitLetter(letter) {
    
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

    // bounds = {"x":{"min":80,"max":904,"range":824},"y":{"min":-25,"max":1490,"range":1515}};


    var aspectRatio = bounds.x.range / bounds.y.range;


    var shift = new Point(bounds.x.min, bounds.y.min);
    var wantedSize = new Size(tbt.bounds.size);
    var scale = new Point(wantedSize.width/bounds.x.range, wantedSize.height/bounds.y.range);

    var wantedAspectRatio = wantedSize.width / wantedSize.height;

    console.log(wantedAspectRatio > aspectRatio);
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
                e[atts[i]] = e[atts[i]].multiply(scale, -scale);
                // e[atts[i]] = e[atts[i]].subtract(shift);
            }
            return e;
        });
    }

    letter.position = tbt.position;
    letter.fillColor = null; new Color(1, 1, 0, 0.25);

    return letter;
}

var start = performance.now();
function lightDigits(digitGroup, character) {
    digitGroup.children.forEach(function(d) {
        d.children["segments"].children.forEach(function(segment){
            segment.fillColor = null;        // console.log(e.bounds);

            var isect = segment.intersect(character);
            if (isect.children !== undefined && isect.children.length === 0) {
                return;
            }

            isect.fillColor = null; "#666";
            isect.strokeColor = null; "red";


            if (isect.area > segment.area*0.5) {
                segment.fillColor = segmentColour;
            }
        });
    });
}

lightDigits(tbt, letter);
console.log("took:" + (performance.now() - start));


project.activeLayer.scale(1.5, new Point(0,0))
view.draw();

// var tool = new Tool();
function Action() {
    var tool = new Tool();
    
    tool.onKeyDown = function(event) {

        try {
            var glyph = $("#letters [unicode="+event.character+"]");
            var letter = new CompoundPath(glyph.attr("d"));
            lightDigits(tbt, fitLetter(letter));   
        }
        catch(err) {}
        console.log(event);
    }
    
}

var action = new Action();
