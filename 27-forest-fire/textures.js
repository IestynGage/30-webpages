const FOREST_COLOR = ["#248721", "#4a6741", "#3f5a36"];

const BURNT_TEXTURES = ["#393939", "#4a4a4a", "#303030"];

const WATER_TEXTURE = ["#3b9dff", "#416bdf", "#416bdf"];

const FIRE_TEXTURE = ["#ff0000", "#ff5a00", "#ff9a00",  "#ffce00",  "#CF1020"];

export function randomForestTexture() {
  return FOREST_COLOR[randomNumber(3)];
}

export function randomBurntTexture() {
  return BURNT_TEXTURES[randomNumber(3)];
}

export function randomWaterTexture() {
  return WATER_TEXTURE[randomNumber(3)];
}

export function randomFireTexture() {
  return FIRE_TEXTURE[randomNumber(5)]
}

function randomNumber(maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
}


