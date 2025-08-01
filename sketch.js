var Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

var engine;
var runner;
var world;
var circle1;

function setup() {
  createCanvas(400, 600);
  
  engine = Engine.create();
  runner = Runner.create();

  world = engine.world;

  circle1 = new Ball(200, 50, 6);
}

function draw() {
  background(22);

  circle1.Show();

  Engine.update(engine);
}