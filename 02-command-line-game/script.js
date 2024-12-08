function loadGame() {
  console.log(`   
    .---------------------------------------------------------------------.
    |                                                                     |
    |                                                                     |
    |     __        __   _                            _                   |
    |     \\ \\      / /__| | ___ ___  _ __ ___   ___  | |_ ___             |
    |      \\ \\ /\\ / / _ \\ |/ __/ _ \\| \'_ \` _ \\ / _ \\ | __/ _ \\            |
    |       \\ V  V /  __/ | (_| (_) | | | | | |  __/ | || (_) |           |
    |        \\_/\\_/ \\___|_|\\___\\___/|_|_|_| |_|\\___|  \\__\\___/            |
    |                                  _                         _        |
    |     __      _(_)______ _ _ __ __| |   __ _ _   _  ___  ___| |_      |
    |     \\ \\ /\\ / / |_  / _\` | \'__/ _\` |  / _\` | | | |/ _ \\/ __| __|     |
    |      \\ V  V /| |/ / (_| | | | (_| | | (_| | |_| |  __/\\__ \\ |_      |
    |       \\_/\\_/ |_/___\\__,_|_|  \\__,_|  \\__, |\\__,_|\\___||___/\\__|     |
    |                                         |_|                         |
    |                                                                     |
    |                                                                     |
    '---------------------------------------------------------------------'
                     
    `)
  bindInputs();
}

function bindInputs() {

  console.log(`
  To play the game use the following commands:
  • up - to move up.
  • down - to move down.
  • left - to move left.
  • right - to move down.
  • inven - Output your inventory.
  `);

  Object.defineProperty(window, 'where', {
    get: function () {
      console.log(map[currentMapLocation[0]][currentMapLocation[1]]);
    }
  });

  Object.defineProperty(window, 'up', {
    get: function () {
      move(Move.UP);
    }
  });

  Object.defineProperty(window, 'down', {
    get: function () {
      move(Move.DOWN);
    }
  });

  Object.defineProperty(window, 'left', {
    get: function () {
      move(Move.LEFT);
    }
  });

  Object.defineProperty(window, 'right', {
    get: function () {
      move(Move.RIGHT);
    }
  });

  const pickUpItem = (itemId) => {
    const currentRoom = map[currentMapLocation[0]][currentMapLocation[1]];
    const items = currentRoom.items ?? [];
    const item = items.filter(i => i.roomLabel === itemId);
    if (item) {
      const keyIndex = items.indexOf(item);
      items.splice(keyIndex, 1);
      characterIven.push(item[0]);
    }
    else {
      console.log(`There's no ${itemId} in this room!`)
    }
  }

  Object.defineProperty(window, 'key', {
    get: function () {
      pickUpItem("key")
    }
  });


  Object.defineProperty(window, 'spellbook', {
    get: function () {
      pickUpItem("spellbook")
    }
  });

  Object.defineProperty(window, 'inventory', {
    get: function () {
      outputInventory();
    }
  });

  Object.defineProperty(window, 'look', {
    get: function () {

      const currentRoom = map[currentMapLocation[0]][currentMapLocation[1]];

      console.log(currentRoom.label);
      const currentRoomItems = currentRoom.items;
      if (currentRoomItems && currentRoomItems.length > 0) {
        console.log("Which item do you want to pick up:")
        currentRoomItems.forEach(i => {
          console.log(`  • ${i.roomLabel}`)
        });
        console.log("Enter the item into the terminal to pick it up");
      }
    }
  });

  Object.defineProperty(window, 'help', {
    get: function () {
        console.log(" asdasd \n asdas");
    }
  });
  
}


const characterIven = [
  { ivenLabel: "Gold coin", amount: 0, id:"coin"}
]
function outputInventory() {
  console.log("You have the following items:")
  characterIven.forEach(i => {
    console.log(`  • ${i.ivenLabel}`)
  })
}

const SPELLBOOK = "spellbook";

const FLOOR_TWO_KEY = "floor2key";
const FLOOR_TWO_KEY_NEEDED = "You need a key to get onto floor two.";

const requireItem = (itemId, itemReason, passedMessage) => {
  console.log(characterIven)
  if (characterIven.filter(item => item.id === itemId).length > 0) {
    passedMessage !== undefined && console.log(passedMessage);
    return {
      allowed: true,
      reason: ""
    };
  }
  return {
    allowed: false,
    reason: itemReason
  };
}

const roomDanger = (itemId) => {
  console.log("characterIven", characterIven);
  console.log("characterIven", itemId);
  if (characterIven.filter(item => item.id === itemId)) { 
    return {
      dangerPassed: true,
    }
  }
  else {
    return {
      dangerPassed: false,
      message: "A evil wizard has cast a firebolt on you! Perhaps if you had a spell book you could defeat the wizard."
    }
  }
}
var currentMapLocation = [0,0];
const map = [
  [
    { label: "Ground floor - Room 1"}, 
    { label: "Ground floor - Room 2"}, 
    { label: "Ground floor - Room 3", items: [{roomLabel: "key", ivenLabel: "Key for floor 2", id: FLOOR_TWO_KEY}]}
  ],
  [
    { label: "Floor 1 - Room 1"}, 
    { label: "Floor 1 - Room 2"}, 
    { label: "Floor 1 - Room 3"}
  ],
  [
    { label: "Floor 2 - Room 1", roomRequirement: () => requireItem(FLOOR_TWO_KEY, FLOOR_TWO_KEY_NEEDED, "You used the room key to open the door"), items: [{roomLabel: "spellbook", ivenLabel: "spellbook", id: SPELLBOOK}]}, 
    { label: "Floor 2 - Room 2", roomRequirement: () => requireItem(FLOOR_TWO_KEY, FLOOR_TWO_KEY_NEEDED, "You used the room key to open the door") }, 
    { label: "Floor 2 - Room 3", roomRequirement: () => requireItem(FLOOR_TWO_KEY, FLOOR_TWO_KEY_NEEDED, "You used the room key to open the door") }
  ],
  [{ label: "Floor 3 - Room 1", defeatedRoomDanger: () => roomDanger(SPELLBOOK)}, { label: "Floor 3 - Room 2"}, { label: "Floor 3 - Room 3"}]
];



const move = (moveType) => {
  const nextLocation = getNextMove(currentMapLocation, moveType);
  if (isLegalMove(nextLocation)) {
    const nextRoom = map[nextLocation[0]][nextLocation[1]];

    if (nextRoom.roomDanger !== undefined) {
      if (nextRoom.roomDanger()) {
        wonEndGame("You cast firebolt on the evil wizard")
      }
      else {
        defeatEndGame("A evil wizard defeated you!");
      }

      return;
    }

    if (nextRoom.roomRequirement !== undefined) {
      const roomRequirement = nextRoom.roomRequirement();
      console.log("nextRoom.roomRequirement", roomRequirement)
      if (roomRequirement.allowed) {
        completeMove(nextLocation, nextRoom);
        return;
      } 
      else {
        console.log(roomRequirement.reason)
        return;
      }
    }

    completeMove(nextLocation, nextRoom);
  }
}

const completeMove = (nextLocation, nextRoom) => {
  currentMapLocation = nextLocation;
  console.log(nextRoom.label);
}

const isLegalMove = (address) => {
  const errorMessage = "Can not move there!"

  if (address[0] < 0 || address[0] >= map.length || address[1] < 0  || address[1] >= map[address[0]].length)  {
    console.log(errorMessage);
    return false;
  }

  return true;

}

const getNextMove = (address, moveType) => {
  switch(moveType) {
    case Move.UP:
      return [address[0] + 1, address[1]];
    case Move.DOWN:
      return [address[0] - 1, address[1]];
    case Move.LEFT:
      return [address[0], address[1] + 1];
    case Move.RIGHT:
      return [address[0], address[1] - 1];
  }
}

const defeatEndGame = (reason) => {
  console.log(
    "%cDefeated!",
    "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
  );

  console.log(reason);
}

const wonEndGame = (reason) => {
  console.log(
    "%You won!",
    "color:green;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
  );

  console.log(reason);
}



class Move {
  // Private Fields
  static #_UP = 0;
  static #_DOWN = 1;
  static #_LEFT = 2;
  static #_RIGHT = 3;

  // Accessors for "get" functions only (no "set" functions)
  static get UP() { return this.#_UP; }
  static get DOWN() { return this.#_DOWN; }
  static get LEFT() { return this.#_LEFT; }
  static get RIGHT() { return this.#_RIGHT; }
}
