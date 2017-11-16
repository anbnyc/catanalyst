function Cube(x,y,z){
	this.x = x;
	this.y = y;
	this.z = z;
}

const flatCube = cube => "x"+cube.x+"y"+cube.y+"z"+cube.z;

function cubeCoordinates(hex, hexPerSide){
	let { cell, row } = hex
	var x = cell - Math.min(hexPerSide - 1, row)
	var z = row + 1 - hexPerSide
	var y = -x-z
	return new Cube(x,y,z)
}

const cubeDirections = [
	new Cube(1, -1, 0),
	new Cube(1, 0, -1),
	new Cube(0, 1, -1),
	new Cube(-1, 1, 0),
	new Cube(-1, 0, 1),
	new Cube(0, -1, 1)
]

function cubeAdd(a, b){
	return new Cube(
		a.x + b.x,
		a.y + b.y,
		a.z + b.z
	)
}

function cubeEqual(a,b){
	return a.x === b.x && a.y === b.y && a.z === b.z
}

function cubeScale(cube, radius){
	return new Cube(radius*cube.x, radius*cube.y, radius*cube.z)
}

function cubeNeighbor(cube, direction){
	return cubeAdd(cube, cubeDirections[(direction + 6) % 6]) //offset based on RedHexGames
}

function cubeRing(center, radius, corner = 4){
  var results = []
  var cube = cubeAdd(
  	center, 
	  cubeScale(cubeDirections[corner], radius)
	)
	for(var i = 0; i < 6; i++){
		for(var j = 0; j < radius; j++){
			results.push(cube);
			cube = cubeNeighbor(cube, i + corner - 4) //offset based on RedHexGames
		}		
	}
  return results
}

function cubeSpiral(center, radius, corner = 4){
	var results = [center]
	for(var k = 0; k < radius; k++){
		let adds = cubeRing(center, k, corner)
		if(k > 1){
			adds = [ ...adds.slice(adds.length - 1 - (k - 2)), ...adds.slice(0, adds.length - 1 - (k - 2)) ]
		}
		results = [ ...results, ...adds ]
	}
	return results
}

module.exports = {
	cubeCoordinates,
	cubeSpiral,
	Cube,
	cubeScale,
	cubeEqual,
	cubeNeighbor,
	flatCube,
	cubeDirections
}