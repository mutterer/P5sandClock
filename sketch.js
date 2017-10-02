// building on lesson 5.18
// a sand clock.

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/uITcoKpbQq4

// module aliases
var Engine = Matter.Engine,
World = Matter.World,
Bodies = Matter.Bodies;

var engine;
var world;
var circles = [];
var hands = [];
var boundaries = [];
var lastSec = 0;
var ground;
var start = 0;

function setup() {

	createCanvas(400, 400);
	engine = Engine.create();
	world = engine.world;
	boundaries.push(new Boundary(145, 320, 100, 10, 0.4));
	boundaries.push(new Boundary(255, 320, 100, 10, -0.4));
	boundaries.push(new Boundary(300, 230, 150, 10, -PI/2));
	boundaries.push(new Boundary(100, 230, 150, 10, -PI/2));
	start=millis();
}

function draw() {
	let hr = hour();
	let mn = minute();
	let sc = second();
	if (millis()-start>1000){
		start = millis();
		circles.push(new Circle(110+random(180), 150+random(100), random(5, 10), 12, 50, 100));
	} else {
		circles.push(new Circle(110+random(180), 160+random(50), 2.5, millis()%100, 50, 64));
	}
	background(0);
	textSize(38);
	textStyle(BOLD);
	textFont("Courier New");
	fill(140, 140, 90,140);
	text(nf(hr,2)+":"+nf(mn,2)+":"+nf(sc,2), 110, 180);
	Engine.update(engine);
	for (var i = 0; i < circles.length; i++) {
		circles[i].show();
		if (circles[i].isOffScreen()){
			circles[i].removeFromWorld();
			circles.splice(i, 1);
			i--;
		}
	}
	for (var i = 0; i < boundaries.length; i++) {
		boundaries[i].show();
	}
}
