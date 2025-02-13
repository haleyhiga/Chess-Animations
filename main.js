import { initShaderProgram } from "./shader.js";
import { ChessSet } from "./chessSet.js";
import { Sandra } from "./sandra.js";
import { Granite } from "./granite.js";

main();
async function main() {
	console.log('This is working');

	//
	// start gl
	// 
	const canvas = document.getElementById('glcanvas');
	const gl = canvas.getContext('webgl');
	if (!gl) {
		alert('Your browser does not support WebGL');
	}
	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.enable(gl.DEPTH_TEST); // Enable depth testing
	gl.depthFunc(gl.LEQUAL); // Near things obscure far things
	gl.enable(gl.CULL_FACE);

	//
	// Setup keyboard events:
	//

	window.addEventListener("keydown", keyDown);
	function keyDown(event) {
	}
	window.addEventListener("keyup", keyUp);
	function keyUp(event) {
	}

	//
	// Create shader
	// 
	const shaderProgram = initShaderProgram(gl, await (await fetch("textureNormalTriangles.vs")).text(), await (await fetch("textureNormalTriangles.fs")).text());
	//	SetShaderAttributes(gl, shaderProgram);

	gl.activeTexture(gl.TEXTURE0);
	gl.uniform1i(gl.getUniformLocation(shaderProgram, "uTexture"), 0);
	// const blackTexture = loadTexture(gl, 'pieces/PiezasAjedrezDiffuseMarmolBlackBrighter.png', [80, 80, 80, 255]);
	// const whiteTexture = loadTexture(gl, 'pieces/PiezasAjedrezDiffuseMarmol.png', [220, 220, 220, 255]);
	// const boardTexture = loadTexture(gl, 'pieces/TableroDiffuse01.png', [255, 171, 0, 255]);


	//
	// load a modelview matrix and normatMatrixonto the shader
	// 


	//
	// Other shader variables:
	// 
	function setLightDirection(x, y, z) {
		gl.uniform3fv(
			gl.getUniformLocation(shaderProgram, "uLightDirection"),
			[x, y, z]
		);
	}
	//setLightDirection(0, -1, -1);
	setLightDirection(1, -1, -1);

	// this one works
	const eye = [0, 6, 6];
	
	
	
	//const eye = [0, 6, 6];




	const at = [0, 1.5, 2.3]


	//const eye = [0, 6, 6];
	//const at = [0, c.WIDTH/2, c.HEIGHT/2];
	const up = [0, 1, 0];
	setObservationView(gl, shaderProgram, eye, at, up, canvas.clientWidth / canvas.clientHeight)


	//
	// Create content to display
	//

	const c = new ChessSet(gl);
	await c.init(gl);

	const c1 = new ChessSet(gl);
	await c1.init(gl);

	const c2 = new ChessSet(gl);
	await c2.init(gl);

	const c3 = new ChessSet(gl);
	await c3.init(gl);

	const c4 = new ChessSet(gl);
	await c4.init(gl);

	const c5 = new ChessSet(gl);
	await c5.init(gl);

	const c6 = new ChessSet(gl);
	await c6.init(gl);







	const s = new Sandra(gl);
	const g = new Granite(gl);

	window.addEventListener("resize", reportWindowSize);
	function reportWindowSize() {
		const clarity = 1.0; // use 4.0 for better looking textures
		gl.canvas.width = gl.canvas.clientWidth * clarity;
		gl.canvas.height = gl.canvas.clientHeight * clarity;
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	}
	reportWindowSize();


	let observe = false;
	let left = false;





	window.addEventListener("keydown", keyDown);
	function keyDown(event) {
	  if (event.code == 'KeyO') {
		observe = true;
		left = false;
	
	  }
	  if (event.code == 'KeyL') {
		left = true;
		observe = true;
	  }
	}


	//
	// Main render loop
	//
	let previousTime = 0;
	let frameCounter = 0;
	function redraw(currentTime) {
		currentTime *= .001; // milliseconds to seconds
		let DT = currentTime - previousTime;
		if (DT > .5)
			DT = .5;
		frameCounter += 1;
		if (Math.floor(currentTime) != Math.floor(previousTime)) {
			console.log(frameCounter);
			frameCounter = 0;
		}
		previousTime = currentTime;

		//
		// Draw
		//
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		if (observe) {
			setObservationView(gl, shaderProgram, eye, at, up, canvas.clientWidth / canvas.clientHeight);
		}
		if (left) {
			setLeftView(gl, shaderProgram, eye, at, up, canvas.clientWidth / canvas.clientHeight)
		}

		// draw most of the pieces
		c.draw(gl, shaderProgram, currentTime);



		requestAnimationFrame(redraw);
	}
	requestAnimationFrame(redraw);
};

function setObservationView(gl, shaderProgram, eye, at, up, canvasAspect) {
	const projectionMatrix = mat4.create();
	const fov = 60 * Math.PI / 180;
	const near = 1;
	const far = 100;
	mat4.perspective(projectionMatrix, fov, canvasAspect, near, far);

	const lookAtMatrix = mat4.create();
	mat4.lookAt(lookAtMatrix, eye, at, up);
	mat4.multiply(projectionMatrix, projectionMatrix, lookAtMatrix);

	const projectionMatrixUniformLocation = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
	gl.uniformMatrix4fv(projectionMatrixUniformLocation, false, projectionMatrix);

	gl.uniform3fv(
		gl.getUniformLocation(shaderProgram, "uEyePosition"),
		eye
	);
}

/* 
function setLeftView(gl, shaderProgram, eye, at, up, canvasAspect) {
	const projectionMatrix = mat4.create();
	const fov = 60 * Math.PI / 180;
	const canvasAspect = canvas.clientWidth / canvas.clientHeight;
	const near = 1;
	const far = 100;
	mat4.perspective(projectionMatrix, fov, canvasAspect, near, far);

	const lookAtMatrix = mat4.create();
	

	eye = [0, 6, 6];
	at = [0, 1.5, 2.3]
	mat4.lookAt(lookAtMatrix, eye, at, up);
	mat4.multiply(projectionMatrix, projectionMatrix, lookAtMatrix);

	const projectionMatrixUniformLocation = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
	gl.uniformMatrix4fv(projectionMatrixUniformLocation, false, projectionMatrix);

	gl.uniform3fv(
		gl.getUniformLocation(shaderProgram, "uEyePosition"),
		eye
	);
}
 */

/* function setLeftView(gl, shaderProgram, eye, at, up, canvasAspect){
	const projectionMatrix = mat4.create();
	const fov = 60 *Math.PI/180;
	//const canvasAspect = canvas.clientWidth / canvas.clientHeight;
	const near = 1;
	const far = 100;
	mat4.perspective(projectionMatrix, fov, canvasAspect, near, far);

	const lookAtMatrix = mat4.create();
	const eye = [0, 6, 6];
	const at = [0, 1.5, 2.3];
	const up = [0,0,1];
	mat4.lookAt(lookAtMatrix, eye, at, up);
	mat4.multiply(projectionMatrix, projectionMatrix, lookAtMatrix);
	const projectionMatrixUniformLocation = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
	gl.uniformMatrix4fv(projectionMatrixUniformLocation, false, projectionMatrix);
}
 */