title = "";

description = `
`;

characters = [
// red player frames (a, b, c, d)
`
      
 rrrr 
rrrrrr
rlrrlr
rrrrrr
r    r
`,
`
      
 lrrl 
rlrrlr
rrrrrr
rrrrrr
r    r
`,
`
 rrrr 
rlrrlr
rrrrrr
rrrrrr
rrrrrr
r    r
`,
`
 rrrr
rrrrrr
rlrrlr
rlrrlr
rrrrrr
r    r
`, 
// cyan player frames (e, f, g, h)
`
      
 CCCC 
CCCCCC
ClCClC
CCCCCC
C    C
`,
`
      
 lCCl 
ClCClC
CCCCCC
CCCCCC
C    C
`,
`
 CCCC 
ClCClC
CCCCCC
CCCCCC
CCCCCC
C    C
`,
`
 CCCC
CCCCCC
ClCClC
ClCClC
CCCCCC
C    C
`, 
// red enemy (i)
`
 rrrr 
rrrrrr
rrllrr
rrllrr
rrrrrr
 rrrr 
`,
// cyan enemy (j)
`
 CCCC 
CCCCCC
CCllCC
CCllCC
CCCCCC
 CCCC 
`
];

const G = {
	WIDTH: 150,
	HEIGHT: 150,
	STAR_SPEED_MIN: 0.5,
	STAR_SPEED_MAX: 1.0
};

options = {
	viewSize: vec(G.WIDTH, G.HEIGHT),
	theme: "pixel",
	seed: 99,
	isPlayingBgm: true
};

//======== GAME OBJECTS ========//
/**
 * @typedef {{
 * pos: Vector,
 * color: string
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

/**
 * @typedef {{
 * pos: Vector,
 * color: string,
 * dir: Vector
 * }} Enemy
 */

/**
 * @type { Enemy [] }
 */
let enemies;

/**
 * @typedef {{ 
 * pos: Vector,
 * speed: number 
 * }} Star
 * 
 * @type { Star [] }
 */
 let stars;




let gameScore;
let rndColor;
let currColor;
let direction;
let spawn;
let spawnVec;
let speed;
let spawnRate;

//========= Game Function ========//
function update() {
	if (!ticks) {
		gameScore = 0;
		spawnRate = 18;
		speed = 1;
		enemies = [];
		currColor = true;
		spawn = true;

		// Init the character
		player = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
			color: "red"
		};

		// star background
		stars = times(20, () => {
			const posX = rnd(0, G.WIDTH);
			const posY = rnd(0, G.HEIGHT);
			return {
				pos: vec(posX, posY),
				speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
			}
		});
	}

	// star background
	stars.forEach((s) => {
		s.pos.y += s.speed;
		s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
		color("light_black");
		box(s.pos, 1);
	})

	// Increase Spawnrate by Score
	if ( 9 > gameScore && gameScore > 5 ) spawnRate = 15;
	else if ( 13 > gameScore && gameScore >= 9 ) spawnRate = 13;
	else if ( 17 > gameScore && gameScore >= 13 ) spawnRate = 10;
	else if ( 30 > gameScore && gameScore >= 17 ) spawnRate = 7;
	else if ( gameScore >= 30 ) spawnRate = 5;

	// Enemy Spawn
	if (spawn) {

		// Choose a random color (Blue / Red)
		if (rndi(0,2)) rndColor = "red";
		else rndColor = "blue"
		direction = rndi(0,4);

		if (direction == 0) {
			spawnVec = vec(75, -5);
			enemies.push({ pos: spawnVec, color: rndColor, dir: vec(0,1) });
		}
		if (direction == 1) {
			spawnVec = vec(75, 155);
			enemies.push({ pos: spawnVec, color: rndColor, dir: vec(0,-1) });
		}
		if (direction == 2) {
			spawnVec = vec(-5, 75);
			enemies.push({ pos: spawnVec, color: rndColor, dir: vec(1,0) });
		}
		if (direction == 3) {
			spawnVec = vec(155, 75);
			enemies.push({ pos: spawnVec, color: rndColor, dir: vec(-1,0) });
		}

		// console.log(enemies.length + " (" + enemies[0].pos.x + "," + enemies[0].pos.y + ")");
		// Turn off spawn until need to spawn again
		spawn = !spawn;
	}

	// Draw Enemies
	remove(enemies, (e) => {
		e.pos.x += e.dir.x * speed;
		e.pos.y += e.dir.y * speed;
		color("black");
		if (e.color == "red")  char("i", e.pos);
		if (e.color == "blue") char("j", e.pos);
		if (e.pos.x == 75 && e.pos.y == 75) {
			gameScore++;
			addScore(1);
			play("select");
		}
		return (e.pos.x == 75 && e.pos.y == 75);
	})

	// Draw Player and Player Color Change
	if (input.isJustPressed) {
		currColor = !currColor;
		// spawn != spawn;
	}
	if (currColor) {
		color("black");
		player.color = "red";
		const x = addWithCharCode("a", floor(ticks/10) % 4);
		if (char(x, 75, 75).isColliding.char.j)	{
			play("hit");
			end();
		}
	}
	if (!currColor) {
		color("black");
		player.color = "blue";
		const x = addWithCharCode("e", floor(ticks/10) % 4);
		if (char(x, 75, 75).isColliding.char.i) {
			play("hit");
			end();
		}
	}
	// box(player.pos, 6);
	
	// Game Border (KEEP AT THE END!!!)
	color("light_blue");
	rect(0, 0, 150, 8);
	rect(0, 142, 150, 8);
	rect(0, 0, 8, 150);
	rect(142, 0, 8, 150);

	if (ticks/spawnRate % 5 == 0 && ticks != 0) {
		spawn = !spawn;
	}
	// console.log(gameScore +":" + spawnRate);
}

// drawing enemy/circles

