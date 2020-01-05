let width = 800;
let height = 800;

let strokeRatio = 0.06;

let cols = 21;
let rows = 21;

let blockWidth = width/cols;
let blockHeight = height/rows;


let initSnakeLength = 4;


var blocks;
var snake;

let started;

let currentKey = null;

let startTime;
let time = 0;
let time2 = 0;


let cakeImage;

function setup() {
	cakeImage = loadImage("cake.png");
	createCanvas(width, height);
	background(0);
	noSmooth()
	textFont("Roboto");
	textSize(200);
	strokeWeight(width/cols*strokeRatio);
	
	blocks = [];
	
	let blockColor = [random(0, 255), random(0, 255), random(0, 255)];
	
	for (let i = 0; i < cols; i++) {
		blocks[i] = [];
		for (let j = 0; j < rows; j++) {
			b = new Block(i*blockWidth, j*blockHeight, blockWidth, blockHeight, j, i, blockColor, [0, 0, 0]);
			blocks[i][j] = b;
		}
	}
	
	
	shape = [];
	for (i = 0; i < initSnakeLength; i++) {
		shape[i] = [initSnakeLength-1-i, Math.floor(rows/2)];
	}
	
	snakeColor = ((blockColor[0] * 0.299 + blockColor[1] * 0.587 + blockColor[2] * 0.114) > 127) ? [0, 0, 0] : [255, 255, 255];
	snake = new Snake(
		shape,
		[[1, 0], [1, 0], [1, 0], [1, 0]],
		blocks,
		snakeColor,
		snakeColor,
		cakeImage
		);
		
		startTime = new Date().getTime();
	}
	
	
	
	function keyPressed() {
		currentKey = key;
	}
	
	
	
	function draw() {
		background(0);
		if (!started) {
			let hovered = (mouseX > width/7 && mouseY > height/4 && mouseX < width/7*6 && mouseY < height/4*3);
			if (hovered) {
				if (mouseIsPressed || keyCode === 32) {
					started = true;
				}
				fill("#2e2e99");
			} else {
				fill("#030975");
			}
			stroke(0);
			rect(width/7, height/4, width/7*5, height/2);
			textAlign(CENTER, CENTER);
			fill(255);
			text("PLAY", width/2, height/2+15);
			return;
		}

	time = new Date().getTime() - startTime;
	let speed = 1/document.getElementById("speedSlider").value*1000;
	
	if ((Math.ceil(time/speed)*speed) > (Math.ceil(time2/speed)*speed)) {
		if (snake.tick(currentKey) === -1) {
			setup();
			started = false;
		}
		currentKey = null;
	}
	time2 = time;


	for (row of blocks) {
		for (block of row) {
			block.draw();
		}
	}

	snake.draw();
}
