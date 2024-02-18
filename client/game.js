import Phaser from 'phaser';
import io from 'socket.io-client';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js';
import TextEditPlugin from 'phaser3-rex-plugins/plugins/textedit-plugin.js';

// Create a socket instance
const socket = io({ reconnection: true });

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
                console.log('Reconnected to server');
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

        const myText = this.add.text(800, 200, 'yippee!', { fontSize: '50px', fill: '#000000' })

        const textBox = this.rexUI.add.textBox({
            width: 1000,
            height: 1000,
            text: myText,
        });

        const editor = this.plugins.get('rexTextEdit').add(myText, {});

        this.updateConnectedUsersListener = (count) => {
            usersText.setText(`Connected Users: ${count}`);
        };
        socket.on('updateConnectedUsers', this.updateConnectedUsersListener);

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            socket.off('disconnect');
            socket.off('updateConnectedUsers', this.updateConnectedUsersListener);
            this.scene.start('Disconnected');
        });
    }

    update() {

    }
}
const plugins = {
    global: [
        {
            key: 'rexTextEdit',
            plugin: TextEditPlugin,
            start: true
        },
    ],
    scene: [
        {
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }
    ]
}

const config = {
    type: Phaser.WEBGL,
    plugins,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    backgroundColor: '#ffffff',
    scene: [Loading, Disconnected, Title],
    parent: 'bsd-game',
    dom: { createContainer: true },
    input: {
        mouse: { target: 'bsd-game' },
        touch: { target: 'bsd-game' },
    }
};

const game = new Phaser.Game(config);
