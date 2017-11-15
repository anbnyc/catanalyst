function hexPath(s,r3o2s){
  return "0,0"+
    " -"+r3o2s+","+(s/2)+
    " -"+r3o2s+","+(3*s/2)+
    " 0,"+(2*s)+
    " "+r3o2s+","+(3*s/2)+
    " "+r3o2s+","+(s/2);
}

const flatCube = cube => "x"+cube.x+"y"+cube.y+"z"+cube.z;

const odds = {
	A: [5,4],
	B: [2,1],
	C: [6,5],
	D: [3,2],
	E: [8,5],
	F: [10,3],
	G: [9,4],
	H: [12,1],
	I: [11,2],
	J: [4,3],
	K: [8,5],
	L: [10,3],
	M: [9,4],
	N: [4,3],
	O: [5,4],
	P: [6,5],
	Q: [3,2],
	R: [11,2],
	desert: [7,6],
}

function getAllTiles() {
	const tileDistribution = {
		sheep: 4,
		wood: 4,
		wheat: 4,
		ore: 3,
		brick: 3,
		desert: 1,
	};

	return Object.keys(tileDistribution)
		.reduce((t,v) => {
			const next = []
			for(var i = 0; i < tileDistribution[v]; i++){
				next.push(v)
			}
			return [...t, ...next]
		}, [])
		.sort((a,b) => .5 - Math.random())
}

module.exports = {
	hexPath,
	odds,
	getAllTiles,
	flatCube,
}