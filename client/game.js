// Create a socket instance
const socket = io();

class Loading extends Phaser.Scene {
    constructor() {
        super({ key: 'Loading' });
    }

    preload() {

    }

    create() {
        const loadingText = this.add.text(960, 540, 
            'Loading...', {
                fontSize: '96px',
                fill: '#000000',
            }
        ).setOrigin(0.5, 0.5);
    }

    update() {
        socket.on('connect', () => {
            console.log('Connected to server');
            this.scene.start('Title');
        });
    }
}

class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'Title' });
    }

    preload() {

    }

    create() {
        const welcomeText = this.add.text(960, 360, 
            'Welcome to the Multiplayer Game!', {
                fontSize: '72px',
                fill: '#000000',
            }
        ).setOrigin(0.5, 0.5);

        const usersText = this.add.text(960, 720, 
            'Connected Users: x', {
                fontSize: '96px',
                fill: '#000000',
            }
        ).setOrigin(0.5, 0.5);

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
        width: 1920,
        height: 1080,
    },
    backgroundColor: '#ffffff',
    scene: [Loading, Title]
};

const game = new Phaser.Game(config);
