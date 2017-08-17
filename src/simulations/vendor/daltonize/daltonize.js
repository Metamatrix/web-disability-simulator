
// Input parameter color must be a string parsable by d3.rgb
// returns string in the form "rgb(r,g,b)"

// TODO:
// Ideally it should be seamlessly integrated with d3, by overriding and wrapping
// so that one could call, to set the daltonized scale

//    (d3scale).daltonize(d3.daltonize.protanope)
// Reset it
//    (d3scale).daltonize(null).
// Get the output daltonized range
//    (d3scale).daltonizeRange()
// but that remains to be implemented

// Daltonize a single color
//    d3.daltonize(color_as_string [, anomaly ])
// Return list of anomalies
//    d3.daltonize.anomalies()

/*************************************************/

/* Code adapted from http://web.archive.org/web/20081014161121/http://www.colorjack.com/labs/colormatrix/ */

/* Usage:

in D3:
element.style("background-color", function(d) {return dalto(d, anomaly);});


// DEBUG
anomaly = 'Deuteranomaly';
anomaly = 'Tritanopia';
console.log(Blind[anomaly]);
console.log(ColorMatrix({R:255, G:0, B:0, A:255}, Blind[anomaly]));
console.log(ColorMatrix({R:12, G:100, B:26, A:255}, Blind[anomaly]));

*/


var Anomalies={
  'Normal':[1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,1,0, 0,0,0,0,1],
  'Protanopia':[0.567,0.433,0,0,0, 0.558,0.442,0,0,0, 0,0.242,0.758,0,0, 0,0,0,1,0, 0,0,0,0,1],
  'Protanomaly':[0.817,0.183,0,0,0, 0.333,0.667,0,0,0, 0,0.125,0.875,0,0, 0,0,0,1,0, 0,0,0,0,1],
  'Deuteranopia':[0.625,0.375,0,0,0, 0.7,0.3,0,0,0, 0,0.3,0.7,0,0, 0,0,0,1,0, 0,0,0,0,1],
  'Deuteranomaly':[0.8,0.2,0,0,0, 0.258,0.742,0,0,0, 0,0.142,0.858,0,0, 0,0,0,1,0, 0,0,0,0,1],
  'Tritanopia':[0.95,0.05,0,0,0, 0,0.433,0.567,0,0, 0,0.475,0.525,0,0, 0,0,0,1,0, 0,0,0,0,1],
  'Tritanomaly':[0.967,0.033,0,0,0, 0,0.733,0.267,0,0, 0,0.183,0.817,0,0, 0,0,0,1,0, 0,0,0,0,1],
  'Achromatopsia':[0.299,0.587,0.114,0,0, 0.299,0.587,0.114,0,0, 0.299,0.587,0.114,0,0, 0,0,0,1,0, 0,0,0,0,1],
  'Achromatomaly':[0.618,0.320,0.062,0,0, 0.163,0.775,0.062,0,0, 0.163,0.320,0.516,0,0,0,0,0,1,0,0,0,0,0]
};

var fu = function(n) { var nn = Math.round(n); return(nn<0?0:(nn<255?nn:255)); }

var ColorMatrix = function(o,m) { // takes: RGBA object, Matrix array
    var r=((o.R*m[0])+(o.G*m[1])+(o.B*m[2])+(o.A*m[3])+m[4]);
    var g=((o.R*m[5])+(o.G*m[6])+(o.B*m[7])+(o.A*m[8])+m[9]);
    var b=((o.R*m[10])+(o.G*m[11])+(o.B*m[12])+(o.A*m[13])+m[14]);
    var a=((o.R*m[15])+(o.G*m[16])+(o.B*m[17])+(o.A*m[18])+m[19]);
    return({'R':fu(r), 'G':fu(g), 'B':fu(b), 'A':fu(a)});
};

function dalto(color, anomaly) {
  var c  = d3.rgb(color),
      newC = ColorMatrix({R:c.r, G:c.g, B:c.b, A:255}, Anomalies[anomaly]),
      s = 'rgb('+newC.R+','+newC.G+','+newC.B+')';
  //console.log(s);
  return s;
}

//console.log(Anomalies);

// ...
// 2h + 1h = env. 3h au total avec le test
// 3h nouveaux filtres + adaptation + colorbrewer