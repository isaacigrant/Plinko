//#region MatterJS Setup
var Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
//#endregion

//#region Global Variables
var engine;
var runner;
var world;

var circle1;
var pegs = [];
var pegRows = 5;
var pegColumns = 5;
//#endregion

//Runs once before draw
function setup() {
  createCanvas(400, 600);
  
  engine = Engine.create();
  runner = Runner.create();

  world = engine.world;

  circle1 = new Chip(200, 0, 6);

  var myCanvas = document.getElementById("defaultCanvas0");
  var pegSpacing = myCanvas.clientWidth / pegColumns;

  for (var i = 0; i < pegColumns; i++) {
    for (var j = 0; j < pegRows; j++) {
      var x = pegSpacing / 2 + i * pegSpacing;
      var y = pegSpacing + j * pegSpacing;
      var p = new Peg(x, y, 4)
      pegs.push(p);
    }
  }
}

//Game Loop
function draw() {
  background(22);

  circle1.Show();

  for (i = 0; i < pegs.length; i++) {
    pegs[i].Show();
  }

  Engine.update(engine);
}