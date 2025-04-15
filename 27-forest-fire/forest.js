class Forest {
  constructor(size) {
    this.map = [];
    for(let x = 0; x < size; x++) {
      const level = []
      for(let y = 0; y < size; y++) {
        level.push(0);
      }
      this.map.push(level);
    }
    this.fire = [];
    this.mapSize = size;
  }

  setFire(x, y) {
    if (this.isValidTile(x, y)) {
      this.map[x][y] = 1;
      this.fire.push({x: x, y: y});
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

  isValidTile(x, y) {
    // TODO replace forest fire with a HashMap
    return y >= 0 && y < this.mapSize && x >= 0 && x < this.mapSize;
  }
  
  next() {
    let tilesToCheck = [].concat(this.fire);
    while (tilesToCheck.length > 0) {
      const tile = tilesToCheck.pop();
      console.log(tile);
      const neighbours = this.tileNeighbours(tile.x, tile.y);
      neighbours.forEach((v) => {
        const neighbourTile = this.map[v.x][v.y];
        if (neighbourTile === 0) {
          this.setFire(v.x, v.y);
        }
      })
      // console.log(tile);
      this.map[tile.x][tile.y] = 2;
    }
  }

}


function randomNumber(maxInt) {
  return Math.floor(Math.random() * maxInt);
}
