const FOREST_CODES = {
  FOREST: 0,
  FIRE: 1,
  BURNT: 2,
  WATER: 3
}

const FOREST_COLOR = ["#248721", "#4a6741", "#3f5a36"];

const BURNT_TEXTURES = ["#393939", "#4a4a4a", "#303030"];

const WATER_TEXTURE = ["#3b9dff", "#416bdf", "#416bdf"];

function randomBurntTexture() {
  return BURNT_TEXTURES[randomNumber(3)];
}

class Forest {
  constructor(size) {
    this.map = [];
    for(let x = 0; x < size; x++) {
      const level = []
      for(let y = 0; y < size; y++) {
        level.push({
          code: FOREST_CODES.FOREST,
          color: FOREST_COLOR[randomNumber(3)]
        });
      }
      this.map.push(level);
    }
    this.fire = [];
    this.water = [];
    this.mapSize = size;
  }

  setFire(x, y) {
    if (this.isValidTile(x, y)) {
      this.map[x][y] = { code: FOREST_CODES.FIRE };
      this.fire.push({x: x, y: y});
    }
  }

  setBurn(x, y) {
    this.map[x][y] = { 
      code: FOREST_CODES.BURNT,
      color: randomBurntTexture()
    };
    const fireIndexToRemove = this.fire.findIndex(f => f.x === x && f.y ===y);
    if (fireIndexToRemove !== -1) {
      this.fire.splice(fireIndexToRemove, 1);
    }
  }

  setWater(x, y) {
    if (this.isValidTile(x, y)) {
      this.map[x][y] = { 
        code: FOREST_CODES.WATER,
        color: WATER_TEXTURE[randomNumber(3)]
      };
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
      if (this.map[n.x][n.y].code === FOREST_CODES.FIRE) {
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
      const neighbours = this.tileNeighbours(tile.x, tile.y);
      neighbours.forEach((v) => {
        const neighbourTile = this.map[v.x][v.y];
        if (neighbourTile.code === FOREST_CODES.FOREST) {
          if (Math.floor(randomNumber(3 / this.neighboursOnFire(v.x, v.y))) === 0) {
            this.setFire(v.x, v.y);
          }
        }
      })
      if (randomNumber(4) === 0) {
        this.setBurn(tile.x, tile.y);
      }
    }
  }

}


function randomNumber(maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
}
