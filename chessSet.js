import { setShaderAttributes, loadTexture } from "./helpers.js";

class ChessSet {
    constructor(gl) {
        this.pieceList = [];
    }
    async init(gl) {
        this.blackTexture = loadTexture(gl, 'pieces/PiezasAjedrezDiffuseMarmolBlackBrighter.png', [80, 80, 80, 255]);
        this.whiteTexture = loadTexture(gl, 'pieces/PiezasAjedrezDiffuseMarmol.png', [220, 220, 220, 255]);
        this.boardTexture = loadTexture(gl, 'pieces/TableroDiffuse01.png', [255, 171, 0, 255]);
        this.buffers = {};
        await readObj(gl, "pieces/PiezasAjedrezAdjusted.obj", this.buffers);
        /*
                const vertices = [];
                this.vertexBufferObject = gl.createBuffer();
                this.vertexBufferObject.vertexCount = vertices.length / 8;
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        */
    }

    // try to make two modelviewmatrix
    drawPiece(gl, shaderProgram, buffer, tx, ty, tz, sx=1, sy=1, sz=1, rx=1, ry=0, rz=0, degrees=0, tx2=0, ty2=0, tz2=0) {
        const modelViewMatrix = mat4.create();
    
        // Initial translation, rotation, and scaling
        mat4.translate(modelViewMatrix, modelViewMatrix, [tx, ty, tz]);
        mat4.rotate(modelViewMatrix, modelViewMatrix, degrees * Math.PI / 180, [rx, ry, rz]);
        mat4.scale(modelViewMatrix, modelViewMatrix, [sx, sy, sz]);
    
        // Second translation
        mat4.translate(modelViewMatrix, modelViewMatrix, [tx2, ty2, tz2]);
    
        gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "uModelViewMatrix"), false, modelViewMatrix);
    
        const normalMatrix = mat3.create();
        mat3.normalFromMat4(normalMatrix, modelViewMatrix);
        gl.uniformMatrix3fv(gl.getUniformLocation(shaderProgram, "uNormalMatrix"), false, normalMatrix);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[buffer]);
        setShaderAttributes(gl, shaderProgram);
        gl.drawArrays(gl.TRIANGLES, 0, this.buffers[buffer].vertexCount);
    }
    
    interpolate(t, t0, t1, v0, v1) {
        let ratio = (t - t0)/(t1 - t0);
        ratio = Math.max(ratio, 0);
        ratio = Math.min(ratio, 1.0);
        const v = v0 + (v1 - v0) * ratio;
        return v;
    }

    draw(gl, shaderProgram, currentTime) {





         // draw the board
       gl.bindTexture(gl.TEXTURE_2D, this.boardTexture);
       this.drawPiece(gl, shaderProgram, "cube", 0,0,0);


        // draw white pieces
        gl.bindTexture(gl.TEXTURE_2D, this.whiteTexture);
       
      //  interpolate makes the bishop shrink down
    //  this.drawPiece(gl, shaderProgram, "bishop",-1.5, 0, 3.5, 1, this.interpolate(currentTime, 5, 7, 1, .01), 1);
    //  this.drawPiece(gl, shaderProgram, "bishop",-1.5, 0, 3.5, 1, this.interpolate(currentTime, 5, 7, 1, .01), 1);

    // this interpolate makes the pawn move forward
    //  this.drawPiece(gl, shaderProgram, "pawn",-0.5, 0, this.interpolate(currentTime, 2, 4, 2.5, .5), 1 , 1, 1);

       // i had this one too 
   //  this.drawPiece(gl, shaderProgram, "pawn",this.interpolate(currentTime, 2,4,-0.5, 0.5), 0,this.interpolate(currentTime, 2,4,2.5, 1.5));
   

  // this one i had
    //  this.drawPiece(gl, shaderProgram, "pawn",this.interpolate(currentTime, 6,8,-1.5, -2.5), 0,this.interpolate(currentTime, 6,8,2.5, 1.5));

   // this one was commented out
      
 //  this.drawPiece(gl, shaderProgram, "pawn",-1.5, 0,2.5);



        //
        // EXAMPLE OF MOVING PIECE TWICE
        //
/* 
        let tx1 = this.interpolate(currentTime, 4,6,-0.5, -2.5);
        let ty1 = 0; // Assuming movement is only on the X-axis for simplification
        let tz1 = this.interpolate(currentTime, 4,6,2.5, 0.5);

        let tx2 = this.interpolate(currentTime, 10,12,2.5, 1.5);
        let ty2 = 0;
        let tz2 = this.interpolate(currentTime, 10,12,-1.5, -2.5);

        this.drawPiece(gl, shaderProgram, "pawn", tx1, ty1, tz1, 1, 1, 1, 0, 0, 0, 0, tx2, ty2, tz2); */



   
 
 	//this.drawPiece(gl, shaderProgram, "pawn",this.interpolate(currentTime, 4,6,-0.5, -2.5), 0,this.interpolate(currentTime, 4,6,2.5, 0.5));

      //  this.drawPiece(gl, shaderProgram, "pawn",this.interpolate(currentTime, 6,8,-1.5, -2.5), 0,this.interpolate(currentTime, 6,8,2.5, 1.5));
	//this.drawPiece(gl, shaderProgram, "pawn",this.interpolate(currentTime, 8,10,-1.5, -2.5), 0,this.interpolate(currentTime, 8,10,2.5, 1.5));

    //this.drawPiece(gl, shaderProgram, "pawn",this.interpolate(currentTime, 8,10,-1.5, -2.5), 0,this.interpolate(currentTime, 8,10,2.5, 1.5));

    
    // this is the piece i need to interpolate
    // drawPiece(gl, shaderProgram, buffer, tx, ty, tz, sx=1, sy=1, sz=1, rx=1, ry=0, rz=0, degrees=0, tx2, ty2, tz2) 
   // this.drawPiece(gl, shaderProgram, "pawn", this.interpolate(1, 3, 0.5, 0.5), 0,this.interpolate(1, 3, 1.5, 1.5));


   
    this.drawPiece(gl, shaderProgram, "pawn", -1.5, 0, 2.5);


    // MOVE THIS PIECE FORWARD TWO SQUARES!!!
   this.drawPiece(gl, shaderProgram, "pawn", this.interpolate(currentTime, 1, 3, 1.5, 1.5), 0, this.interpolate(currentTime, 1, 3, 2.5, 0.5));

    // i think this is a bishop?
    this.drawPiece(gl, shaderProgram, "bishop", -1.5, 0, 3.5);

    this.drawPiece(gl, shaderProgram, "pawn",-2.5, 0,2.5);


      this.drawPiece(gl, shaderProgram, "pawn",-3.5, 0,2.5);
      this.drawPiece(gl, shaderProgram, "pawn",0.5, 0,2.5);
    //  this.drawPiece(gl, shaderProgram, "pawn",1.5, 0,2.5);
      this.drawPiece(gl, shaderProgram, "pawn",2.5, 0,2.5);
      this.drawPiece(gl, shaderProgram, "pawn",3.5, 0,2.5);

      this.drawPiece(gl, shaderProgram, "pawn",-0.5, 0,2.5);


        // I AM GOING TO SCALE THIS PIECE
        // drawPiece(gl, shaderProgram, buffer, tx, ty, tz, sx=1, sy=1, sz=1, rx=1, ry=0, rz=0, degrees=0, tx2, ty2, tz2) 
      
      
      

      
        // weird im trying to scale it and its weird
        this.drawPiece(gl, shaderProgram, "rook",3.5, 0, 3.5, this.interpolate(currentTime, 4, 6, 1, 0.1), 1, this.interpolate(currentTime, 4, 6, 1, 0.1));





      this.drawPiece(gl, shaderProgram, "rook",-3.5, 0, 3.5);

      // i had this commented out
      this.drawPiece(gl, shaderProgram, "queen",-0.5, 0, 3.5);

      this.drawPiece(gl, shaderProgram, "king",0.5, 0, 3.5);

         // interpolate the bishop to capture pawn
      this.drawPiece(gl, shaderProgram, "bishop",1.5, 0, 3.5);
    //  this.drawPiece(gl, shaderProgram, "bishop",-1.5, 0, 3.5);
   // this.drawPiece(gl, shaderProgram, "bishop", this.interpolate(currentTime, 12, 14, -1.5, 2.5), 0, this.interpolate(currentTime, 12, 14, 3.5, -0.5));

      this.drawPiece(gl, shaderProgram, "knight",2.5, 0,3.5, 1, 1, 1, 0, 1, 0, 180);
      this.drawPiece(gl, shaderProgram, "knight",-2.5, 0,3.5, 1, 1, 1, 0, 1, 0, 180);

      gl.bindTexture(gl.TEXTURE_2D, this.blackTexture);

      // black pieces

// i edited this
// drawPiece(gl, shaderProgram, buffer, tx, ty, tz, sx=1, sy=1, sz=1, rx=1, ry=0, rz=0, degrees=0, tx2, ty2, tz2) 

//this.drawPiece(gl, shaderProgram, "pawn",this.interpolate(currentTime, 2,4,-3.5, -3.5), 0,this.interpolate(currentTime, 2,4,-2.5, -0.5), 1,1,1,1,0,0,0);



        // black pieces
this.drawPiece(gl, shaderProgram, "pawn",-0.5, 0, -2.5, 1, 1, 1, 1, 0, 0, this.interpolate(currentTime, 7, 9, 0, 90));
    //  this.drawPiece(gl, shaderProgram, "pawn",-0.5, 0,-2.5);
      this.drawPiece(gl, shaderProgram, "pawn",-1.5, 0,-2.5);
      this.drawPiece(gl, shaderProgram, "pawn",-2.5, 0,-2.5);
      this.drawPiece(gl, shaderProgram, "pawn",-3.5, 0,-2.5);
  
  // this 2 was commented out
    this.drawPiece(gl, shaderProgram, "pawn",0.5, 0,-2.5);
     this.drawPiece(gl, shaderProgram, "pawn",1.5, 0,-2.5);

      this.drawPiece(gl, shaderProgram, "pawn",2.5, 0,-2.5);
     this.drawPiece(gl, shaderProgram, "pawn",3.5, 0,-2.5);

      // and this one
   //   this.drawPiece(gl, shaderProgram, "pawn",this.interpolate(currentTime, 6,8,0.5, -0.5), 0,this.interpolate(currentTime, 6,8,-2.5, -1.5));
  //    this.drawPiece(gl, shaderProgram, "pawn",this.interpolate(currentTime, 10,12,3.5, 3.5), 0,this.interpolate(currentTime, 10,12,-2.5, -1.5));


  // add to this for ppiece capture (gl, shaderProgram, buffer, tx, ty, tz, sx=1, sy=1, sz=1, rx=1, ry=0, rz=0, degrees=0)
    // this.drawPiece(gl, shaderProgram, "pawn",1.5, 0,-2.5);
  //  this.drawPiece(gl, shaderProgram, "pawn",this.interpolate(currentTime, 10, 12, 2.5, 2.5),0, this.interpolate(currentTime, 10, 12, -2.5, -0.5), 1, 1, 1, 0, 0,1, this.interpolate(currentTime, 14, 16, 0, 90) );

      this.drawPiece(gl, shaderProgram, "rook",3.5, 0, -3.5);
      this.drawPiece(gl, shaderProgram, "rook",-3.5, 0, -3.5);

     
     this.drawPiece(gl, shaderProgram, "queen",-0.5, 0, -3.5);


// NEED TO ROTATE THIS ONE FORWARD
     this.drawPiece(gl, shaderProgram, "king",0.5, 0, -3.5);
     //this.drawPiece(gl, shaderProgram, "king",0.5, 0, -3.5, 1, 1, 1, 1, 0, 0, this.interpolate(currentTime, 7, 9, 0, 90));




      this.drawPiece(gl, shaderProgram, "bishop",1.5, 0, -3.5);
      this.drawPiece(gl, shaderProgram, "bishop",-1.5, 0, -3.5);

        


      this.drawPiece(gl, shaderProgram, "knight",2.5, 0,-3.5, 1, 1, 1, 0, 0, 0);
      this.drawPiece(gl, shaderProgram, "knight",-2.5, 0,-3.5, 1, 1, 1, 0, 0, 0);  


        
        // king will tip over
  //    this.drawPiece(gl, shaderProgram, "king",0.5, 0, 3.5, 1, 1, 1, 0, 0, 1, this.interpolate(currentTime, 8, 10, 0, 90)); 


 
    }
}

// filename to dictionary this.buffers
async function readObj(gl, filename, buffers) {
    const response = await fetch(filename);
    const text = await response.text()

    //    const output = {};
    const lines = text.split("\n");
    let objectName = "";
    const vertexList = [];
    const normalList = [];
    const uvList = [];
    let currentFaceList = [];
    //    output.objectList = {};

    for (const line of lines) {
        const values = line.split(' ');
        if (values[0] == 'o') {
            if (currentFaceList.length > 0) {
                //output.objectList[objectName] = currentFaceList
                AddVertexBufferObject(gl, buffers, objectName, vertexList, uvList, normalList, currentFaceList)
                currentFaceList = []
            }
            objectName = values[1];
        }
        else if (values[0] == 'v') {
            vertexList.push(parseFloat(values[1]), parseFloat(values[2]), parseFloat(values[3]))
        }
        else if (values[0] == 'vn') {
            normalList.push(parseFloat(values[1]), parseFloat(values[2]), parseFloat(values[3]))
        }
        else if (values[0] == 'vt') {
            uvList.push(parseFloat(values[1]), 1 - parseFloat(values[2]))
        }
        else if (values[0] == 'f') {
            const numVerts = values.length - 1;
            const fieldsV0 = values[1].split('/');
            for (let i = 2; i < numVerts; i++) {
                const fieldsV1 = values[i].split('/');
                const fieldsV2 = values[i + 1].split('/');
                currentFaceList.push(parseInt(fieldsV0[0]) - 1, parseInt(fieldsV0[1]) - 1, parseInt(fieldsV0[2]) - 1);
                currentFaceList.push(parseInt(fieldsV1[0]) - 1, parseInt(fieldsV1[1]) - 1, parseInt(fieldsV1[2]) - 1);
                currentFaceList.push(parseInt(fieldsV2[0]) - 1, parseInt(fieldsV2[1]) - 1, parseInt(fieldsV2[2]) - 1);
            }
        }
    }
    if (currentFaceList.length > 0) {
        //output.objectList[objectName] = currentFaceList
        AddVertexBufferObject(gl, buffers, objectName, vertexList, uvList, normalList, currentFaceList)
    }
    //    output.vertexList = vertexList;
    //    output.normalList = normalList;
    //    output.uvList = uvList;
    //    return output;
}


function AddVertexBufferObject(gl, buffers, objectName, vertexList, uvList, normalList, currentFaceList) {
    const vertices = [];
    for (let i = 0; i < currentFaceList.length; i += 3) {
        const vertexIndex = currentFaceList[i] * 3;
        const uvIndex = currentFaceList[i + 1] * 2;
        const normalIndex = currentFaceList[i + 2] * 3;
        vertices.push(vertexList[vertexIndex + 0], vertexList[vertexIndex + 1], vertexList[vertexIndex + 2], // x,y,x
            uvList[uvIndex + 0], uvList[uvIndex + 1], // u,v
            normalList[normalIndex + 0], normalList[normalIndex + 1], normalList[normalIndex + 2] // nx,ny,nz
        );
    }

    const vertexBufferObject = gl.createBuffer();
    vertexBufferObject.vertexCount = vertices.length / 8;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    buffers[objectName] = vertexBufferObject;
}

export { ChessSet };