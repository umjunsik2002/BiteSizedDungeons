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
            'Loading...\n\nConnecting you to the server!', {
                fontSize: '72px',
                fill: '#000000',
                align: 'center',
            }
        ).setOrigin(0.5, 0.5);

        const checkConnection = () => {
            if (socket.connected) {
                console.log('Connected to server');
                clearInterval(connectionInterval);
                this.scene.start('Title');
            }
        };
        const connectionInterval = setInterval(checkConnection, 100);
    }

    update() {

    }
}

class Disconnected extends Phaser.Scene {
    constructor() {
        super({ key: 'Disconnected' });
    }

    preload() {

    }

    create() {
        const disconnectedText = this.add.text(960, 540, 
            'Disconnected!\n\nConnecting you to the server again...', {
                fontSize: '72px',
                fill: '#000000',
                align: 'center',
                fill: 'red',
            }
        ).setOrigin(0.5, 0.5);

        const checkConnection = () => {
            if (socket.connected) {
                console.log('Connected to server');
                clearInterval(connectionInterval);
                this.scene.start('Title');
            }
        };
        const connectionInterval = setInterval(checkConnection, 100);
    }

    update() {

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

        this.updateConnectedUsersListener = (count) => {
            usersText.setText(`Connected Users: ${count}`);
        };
        socket.on('updateConnectedUsers', this.updateConnectedUsersListener);

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            socket.off('updateConnectedUsers', this.updateConnectedUsersListener);
            this.scene.start('Disconnected');
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
    scene: [Loading, Disconnected, Title]
};

const game = new Phaser.Game(config);
