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
// red enemy (i, j, k, l)
`

 rrrr 
 rllr
 rllr
 rrrr

`,
`

  rr 
 rllr
 rllr
  rr

`,
`

 rrrr
 rllr
 rllr
 rrrr

`,
`
 rrrr 
rrrrrr
rrllrr
rrllrr
rrrrrr
 rrrr 
`,
// cyan enemy (m, n, o, p)
`

 CCCC 
 CllC
 CllC
 CCCC

`,
`

  CC 
 CllC
 CllC
  CC

`,
`

 CCCC
 CllC
 CllC
 CCCC

`,
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
	HEIGHT: 150
};

options = {
	viewSize: vec(G.WIDTH, G.HEIGHT),
	theme: "pixel"
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


let count;
let rndColor;
let currColor;
let direction;
let spawn;
let spawnVec;

//========= Game Function ========//
function update() {
	if (!ticks) {

		enemies = [];
		currColor = true;
		direction = rndi(0,4);
		spawn = true;

		// Init the character
		player = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
			color: "red"
		};
	}

	// Enemy Spawn
	if (spawn) {

		// Choose a random color (Blue / Red)
		if (rndi(0,1)) rndColor = "red";
		else rndColor = "blue"

		if (direction == 0) {
			spawnVec = vec(75, 3);
			enemies.push({ pos: spawnVec, color: rndColor, dir: vec(1,0) });
		}
		if (direction == 1) {
			spawnVec = vec(75, 147);
			enemies.push({ pos: spawnVec, color: rndColor, dir: vec(-1,0) });
		}
		if (direction == 2) {
			spawnVec = vec(3, 75);
			enemies.push({ pos: spawnVec, color: rndColor, dir: vec(0,1) });
		}
		if (direction == 3) {
			spawnVec = vec(147, 75);
			enemies.push({ pos: spawnVec, color: rndColor, dir: vec(0,-1) });
		}

		console.log(enemies.length + " (" + enemies[0].pos.x + "," + enemies[0].pos.y + ")");
		// Turn off spawn until need to spawn again
		spawn = !spawn;
	}
	
	// Draw Enemies
	remove(enemies, (e) => {
		e.pos.x += e.dir.x;
		e.pos.y += e.pos.y;
		if (e.color == "red")  color("red");
		if (e.color == "blue") color ("blue")
		box(e.pos, 6);
		return (!(e.pos.x < 74 || e.pos.x > 76 || e.pos.y < 74 || e.pos.y > 76))
	})

	// Draw Player and Player Color Change
	if (input.isJustPressed) {
		currColor = !currColor;
		spawn != spawn;
	}
	if (currColor) {
		color("black");
		player.color = "red";
		char(addWithCharCode("a", floor(ticks/10) % 4), player.pos);
	}
	if (!currColor) {
		color("black");
		player.color = "blue";
		char(addWithCharCode("e", floor(ticks/10) % 4), player.pos);
	}
	// box(player.pos, 6);
	
	// Game Border (KEEP AT THE END!!!)
	// color("light_blue");
	// rect(0, 0, 150, 8);
	// rect(0, 142, 150, 8);
	// rect(0, 0, 8, 150);
	// rect(142, 0, 8, 150);
}

// drawing enemy/circles

