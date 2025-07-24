var Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

var engine;
var runner;
var world;
var box1;

function setup() {
  createCanvas(400, 400);
  
  engine = Engine.create();
  runner = Runner.create();
  world = engine.world;

  box1 = Bodies.rectangle(160, 0, 80, 80);
  
  Runner.run(runner, engine);
  
  Composite.add(world, [box1]);
}


function draw() {
  background(22);
  rect(box1.position.x, box1.position.y, 80, 80);
}