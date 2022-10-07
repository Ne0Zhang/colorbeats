title = "";

description = `
`;

characters = [];

const G = {
	WIDTH: 100,
	HEIGHT: 100
};

options = {
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
let count;
let currColor;

//========= Game Function ========//
function update() {
	if (!ticks) {
		currColor = true;
		// Init the character
		player = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
			color: "red"
		};
	}
	
	if (input.isJustPressed) currColor = !currColor;
	if (currColor) color("red");
	if (!currColor) color("blue");
	box(player.pos, 4);
}
