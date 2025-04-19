const FOREST_CODES = {
  FOREST_LIGHT: -2,
  FOREST_MEDIUEM: -1,
  FOREST_DARK: 0,
  FIRE: 1,
  BURNT: 2,
  WATER: 3
}

class Forest {
  constructor(size) {
    this.map = [];
    for(let x = 0; x < size; x++) {
      const level = []
      for(let y = 0; y < size; y++) {
        level.push(randomNumber(3) * -1);
      }
      this.map.push(level);
    }
    this.fire = [];
    this.water = [];
    this.mapSize = size;
  }

  setFire(x, y) {
    if (this.isValidTile(x, y)) {
      this.map[x][y] = FOREST_CODES.FIRE;
      this.fire.push({x: x, y: y});
    }
  }

  setWater(x, y) {
    if (this.isValidTile(x, y)) {
      this.map[x][y] = FOREST_CODES.WATER;
      this.water.push({x: x, y: y});
    }
  }

  tileNeighbours(x, y) {
    const neighbours = [];
    const possibleNeighbours = [
      {x: x + 1, y: y}, {x: x - 1, y: y},
      {x: x, y: y + 1}, {x: x, y: y - 1}
    ];
    possibleNeighbours.forEach((n) => {
      if (this.isValidTile(n.x, n.y)) {
        neighbours.push(n);
      }
    })

    return neighbours;
  }

  neighboursOnFire(x, y) {
    let fireScore = 0;
    this.tileNeighbours(x, y).forEach(n => {
      if (this.map[n.x][n.y] === FOREST_CODES.FIRE) {
        fireScore = fireScore + 1;
      }
    });

    return fireScore;
  }

  isValidTile(x, y) {
    // TODO replace forest fire with a HashMap
    return y >= 0 && y < this.mapSize && x >= 0 && x < this.mapSize;
  }
  
  next() {
    let tilesToCheck = [].concat(this.fire);
    while (tilesToCheck.length > 0) {
      const tile = tilesToCheck.pop();
      // console.log(tile);
      const neighbours = this.tileNeighbours(tile.x, tile.y);
      neighbours.forEach((v) => {
        const neighbourTile = this.map[v.x][v.y];
        if (neighbourTile <= FOREST_CODES.FOREST_DARK) {
          if (Math.floor(randomNumber(3 / this.neighboursOnFire(v.x, v.y))) === 0) {
            this.setFire(v.x, v.y);
          }
        }
      })
      // console.log(tile);
      if (randomNumber(4) === 0) {
        this.map[tile.x][tile.y] = FOREST_CODES.BURNT;
      }
    }
  }

}


function randomNumber(maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
}
