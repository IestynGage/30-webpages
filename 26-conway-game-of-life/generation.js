class Generation {
  constructor(size) {
    this.map = [];
    for(let x = 0; x < size; x++) {
      const level = []
      for(let y = 0; y < size; y++) {
        level.push(0);
      }
      this.map.push(level);
    }
    this.alive = [];
    this.mapSize = size;
  }

  setAlive(x, y) {
    if (this.isValidTile(x, y)) {
      this.map[x][y] = 1;
      this.alive.push({x, y});
    }
  }

  tileNeighbours(x, y) {
    const theXs = [x - 1, x, x + 1];
    const theYs = [y - 1, y, y + 1];
    const neighbours = [];
    theXs.forEach(newX => {
      theYs.forEach(newY => {
        if (this.isValidTile(newX, newY) && !(x === newX && y === newY)) {
          neighbours.push({x: newX, y: newY});
        }
      })
    });

    return neighbours;
  }

  isValidTile(x, y) {
    return y >= 0 && y < this.mapSize && x >= 0 && x < this.mapSize;
  }
  
  nextGeneration() {
    const nextGen = new Generation(this.mapSize);

    const visited = new Map();
    let tilesToCheck = [].concat(this.alive);
    while (tilesToCheck.length > 0) {
      const tile = tilesToCheck.pop();
      if (!visited.has(`${tile.x}${tile.y}`)) {
        let tileScore = this.tileScore(tile.x, tile.y);
        const isAlive = this.map[tile.x][tile.y] === 1;
        if (
          (isAlive && (tileScore === 2 || tileScore === 3)) 
          || (!isAlive && tileScore === 3)) {
          nextGen.setAlive(tile.x, tile.y);
          tilesToCheck = tilesToCheck.concat(this.tileNeighbours(tile.x, tile.y));
        }

        visited.set(`${tile.x}${tile.y}`, tile);
      }
    }

    return nextGen;
  }

  tileScore(x, y) {
    let score = 0;
    const a = this.tileNeighbours(x, y);
    a.forEach(neighbour => {
      score = score + this.map[neighbour.x][neighbour.y];
    })
    return score;
  }
}

function createRandomGeneration(mapsize, initAliveAmount) {
  let currentGen = new Generation(mapsize);
  for (let i=0; i < initAliveAmount; i++) {
    const x = randomNumber(mapsize);
    const y = randomNumber(mapsize);
    console.log(x);
    if(currentGen.map[x][y] === 0) {
      currentGen.setAlive(x, y);
    }
  }

  return currentGen;
}

function randomNumber(maxInt) {
  return Math.floor(Math.random() * maxInt);
}
