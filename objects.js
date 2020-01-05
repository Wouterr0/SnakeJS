class Block {
	constructor(x, y, w, h, col, row, color, edgeColor) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.column = col;
		this.row = row;
		this.color = color;
		this.edgeColor = edgeColor;
	}

	draw() {
		fill(this.color);
		stroke(this.edgeColor);
		rect(this.x, this.y, this.width, this.height);
	}
}




class Food {
	constructor(col, row, blocks, img) {
		this.column = col;
		this.row = row;
		this.blocks = blocks;
		this.image = img;
	}



	draw() {
		let b = this.blocks[this.column][this.row];
		image(this.image, b.x, b.y, b.width, b.height);
	}
}



class Snake {
	constructor(shape, directions, blocks, color, edgeColor, foodImage) {
		this.shape = shape;
		this.directions = directions;

		this.blocks = blocks;
		this.score = 0;

		this.color = color;
		this.edgeColor = edgeColor;

		this.foodImage = foodImage;
		this.generateFood();
	}


	generateFood() {
		checkFood:
		while (true) {
			let b = random(random(this.blocks))
			this.food = new Food(b.column, b.row, this.blocks, this.foodImage);

			let spawnedInSnake = false;
			for (i = 0; i < this.shape.length; i++) {
				if ((this.shape[i][0] === this.food.column) && (this.shape[i][1] === this.food.row)) {
					print(`food spawned inside snake at ${[this.food.column, this.food.row]}`);
					spawnedInSnake = true;
				}
			}
			if (!spawnedInSnake) {
				break checkFood;
			}
		}
	}


	grow() {
		let pos = this.shape[this.shape.length-1];
		let dir = this.directions[this.directions.length-1];
		this.shape.push([pos[0] - dir[0], pos[1] - dir[1]]);
		this.directions.push(this.directions[this.directions.length-1]);
		console.log("growing");
	}


	draw() {
		if (!(this.shape.length == this.directions.length)) {
			console.log(`length this.shape(${this.shape.length}) != length this.directions(${this.directions.length})`);
		}

		for (i = 0; i < this.shape.length; i++) {
			let b = this.blocks[this.shape[i][0]][this.shape[i][1]];
			let newBlock = new Block(b.x, b.y, b.width, b.height, b.column, b.row, this.color, this.edgeColor);
			newBlock.draw();
		}

		this.food.draw();
	}


	tick(key) {
		switch (key) {
			case "ArrowUp":
			case "w":
				if (!(this.directions[0][0] == 0 && this.directions[0][1] == 1)) {
					this.directions[0] = [0, -1]
				}
				break;
			case "ArrowDown":
			case "s":
				if (!(this.directions[0][0] == 0 && this.directions[0][1] == -1)) {
					this.directions[0] = [0, 1]
				}
				break;
			case "ArrowLeft":
			case "a":
				if (!(this.directions[0][0] == 1 && this.directions[0][1] == 0)) {
					this.directions[0] = [-1, 0]
				}
				break;
			case "ArrowRight":
			case "d":
				if (!(this.directions[0][0] == -1 && this.directions[0][1] == 0)) {
					this.directions[0] = [1, 0]
				}
				break;
		}

		// push the snake one step further
		for (i = 0; i < this.shape.length; i++) {
			this.shape[i][0] += this.directions[i][0];
			this.shape[i][1] += this.directions[i][1];
		}
		
		// check if the snake touched the food
		for (i = 0; i < this.shape.length; i++) {
			if ((this.shape[i][0] === this.food.column) && (this.shape[i][1] === this.food.row)) {
				this.score++;
				this.grow();
				this.generateFood();
			}
		}
		
		// check if the snake touches itself or the wall
		let strPos = []
		for (i = 0; i < this.shape.length; i++) {
			if ((this.shape[i][0] < 0) || (this.shape[i][1] < 0) || (this.shape[i][0] > this.blocks.length-1) || (this.shape[i][1] > this.blocks[0].length-1)) {
				return -1;
			}

			let pos = JSON.stringify(this.shape[i])
			if (strPos.indexOf(pos) != -1) {
				return -1;
			}
			else {
				strPos.push(pos);
			}
			
		}

		// update directions
		for (i = this.directions.length-1; i > 0; i--) {
			this.directions[i] = this.directions[i-1];
		}

		
	}
}