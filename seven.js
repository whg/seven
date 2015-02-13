paper.install(window);

// (function main() {

var segmentColour = "#eee";
var backgroundColour = "#111";

var canvas = document.getElementById("myCanvas");

paper.setup('myCanvas');

project.activeLayer.transformContent = true;

// var path = new Path();
// path.strokeColor = 'black';
// var start = new Point(100, 100);
// path.moveTo(start);
// path.lineTo(start.add([ 200, -50 ]));
// view.draw();
var digit = project.importSVG(document.getElementById("digit"), {
    expandShapes: true
});

digit.children[0].name = "box";
digit.children[1].name = "segments";
// digit.position = new Point(0, 0);
// digit.scale(0.7, new Point(0, 0));


var a = "A".charCodeAt();
digit.children["segments"].children.forEach(function(segment) {
    segment.name = String.fromCharCode(a++);
    segment.reverse();
    // segment.scale(0.7)
});


digit.strokeColor = null;
digit.children["segments"].fillColor = segmentColour;
digit.children["box"].fillColor = backgroundColour;
digit.children["box"].strokeColor = backgroundColour;
// digit.scale(0.7);
// digit.visible = false;


var tbt = new Group();
// tbt.strokeColor = null;
var dbounds = digit.getBounds();
var n = 5;
for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
        var d = digit.clone();
        // d.translate(dbounds.width * i, dbounds.height * j);
        // d.strokeColor = "black"; //null;
        d.children["box"].translate(dbounds.width * i, dbounds.height * j);

        d.children["segments"].children.forEach(function(segment) {
            segment.translate(dbounds.width * i, dbounds.height * j);
        });

                           
        // d.children["box"].fillColor = "yellow";
        // d.children
        tbt.addChild(d);
    }
}


// var r = new Path.Rectangle(dbounds);
// r.fillColor = "white";
// r.strokeColor = "yellow";
// r.moveBelow(tbt);
// view.draw();
digit.visible = false;
// asdf

var five = project.importSVG(document.getElementById("five"), {
    // expandShapes: true
});

var letter = project.importSVG(document.getElementById("letter"), {
    // expandShapes: true
}).children[0];

// c.segments = letter.children[0].children[0].segments.map(function(e) { for (var i = 0; i < 3; i++) { e[atts[i]] = e[atts[i]].multiply(0.2); } return e; })


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
letter.fillColor = null; new Color(0, 0, 0, 0.25);

// five.scale(2.6);
// five.translate(new Point(95, 100));
// five.strokeColor = null;
// console.log(s._children[0]._children[0].style);

// var c = new Path.Circle(new Point(50, 50), 40);
// c.fillColor = "red";

// s.children[0].children.forEach(function(e){
//     // console.log(e.area);
//     var i = e.intersect(c);
//     i.fillColor = "#0f0";
//     // i.strokeColor = null;
//     // console.log(i);
// });

// s.bringToFront();
// console.log(t);

// var path = new Path({
//     segments: [[0, 35], [170, 35]]
// });

// path.strokeWidth = 15;

var q =0;
var start = performance.now();
tbt.children.forEach(function(d) {
    // console.log(d.bounds);
    d.children["segments"].children.forEach(function(segment){
        segment.fillColor = null;        // console.log(e.bounds);
        var isect = segment.intersect(letter);
        if (isect.children !== undefined && isect.children.length === 0) {
            return;
        }
        isect.fillColor = null; "#666";
        isect.strokeColor = null; "red";

        
        if (isect.area > segment.area*0.5) {
            segment.fillColor = segmentColour;
            q++;
        }
        // else {
        //     segment.fillColor = "green"; 
        // }
        // console.log(segment.id + ": " + segment.area + ", " + isect.area);
        // console.log(segment.bounds);
    });
});
console.log("took:" + (performance.now() - start));
// return;

// console.time("asf");
// t.position.y = 100;
// console.log(t.position);
// s._children[0]._children[0].style = {
//     fillColor: "#000"
// };

// s.children[0].children.forEach(function(e) {
//     var i = e.intersect(t.children[0]);
//     console.log(t.children);
// });
// var c = s.children[0].clone();

// var i = s.children.intersect(t.children);
// console.log(s.children);

// console.timeEnd("asf");

// var h = handler();
// console.log(h);
// five.visible = false;
// digit.visible = false;
// s._children[0]._children[0].fillColor(255, 0, 0);
    view.draw();
// })();



project.activeLayer.scale(1.5, new Point(0,0))

view.draw();
