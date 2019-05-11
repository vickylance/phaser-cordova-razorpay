

import Phaser, { Game } from 'phaser';
import LoadGame from './scenes/LoadGame';

let game = ''
function initGame() {
  game = new Game({
    width: 640,
    height: 360,
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    scene: [LoadGame],
    title: 'Treasure Hunt',
    parent: 'game'
  });

  return game;
}

function resize() {
  const canvas = document.querySelector('canvas');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = windowWidth / gameRatio + 'px';
  } else {
    canvas.style.width = windowHeight * gameRatio + 'px';
    canvas.style.height = windowHeight + 'px';
  }
}

window.onload = () => {
  resize();
  window.addEventListener('resize', resize, false);
};

var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    initGame();
  },
};

app.initialize();
