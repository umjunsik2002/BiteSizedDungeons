const Phaser = require('phaser');
const io = require('socket.io-client');

// Create a socket instance
const socket = io();

class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'Title' });
    }

    preload() {

    }

    create() {
        const welcomeText = this.add.text(640, 240, 'Welcome to the Multiplayer Game!', { fontSize: '48px', fill: '#ffffff' }).setOrigin(0.5, 0.5);
        const usersText = this.add.text(640, 480, 'Connected Users: x', { fontSize: '72px', fill: '#ffffff' }).setOrigin(0.5, 0.5);

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('updateConnectedUsers', (count) => {
            usersText.setText(`Connected Users: ${count}`);
        });
    }

    update() {

    }
}

const config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
    },
    backgroundColor: '#000000',
    scene: [Title]
};

const game = new Phaser.Game(config);