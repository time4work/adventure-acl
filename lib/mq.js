const amqplib = require('amqplib');

const DEFAULT_CONFIG = {
    reconnect: false,
    retryConnectionTime: 3000,
};

class MQClient {
    constructor(config) {
        if (MQClient.instance) {
            return MQClient.instance;
        }

        MQClient.instance = this
        this.config = Object.assign(DEFAULT_CONFIG, config);
        this._connection = null;
    }

    get connection() {
        return this._connection;
    }

    async connect() {
        if (this._connection) {
            return;
        }
        this._connection = await getConnection(this.config);
        console.log('[MQ] Connected');

        this._connection.on('error', error => {
            if (error.message !== 'Connection closing') {
                console.error('[MQ] Error', error.message);
            } else {
                console.error('[MQ] Connection closing');
            }
        });

        const isReconnectEnabled = this.config.reconnect;
        this._connection.on('close', async function () {
            if (!isReconnectEnabled) {
                console.error('[MQ] Closing connection');
                return;
            }
            console.error('[MQ] Reconnecting');
            this._connection = await getConnection(this.config);
        });
    }
};
module.exports = MQClient;

async function getConnection(config) {
    return new Promise(resolve => {
        getConnectionMethod(config, resolve);
    })
}

async function getConnectionMethod(config, next) {
    try {
        const connection = await amqplib.connect(config.url);
        next(connection);
    } catch (error) {
        console.error('[MQ] Connection error', error);
        setTimeout(function() {
            getConnectionMethod(config, next);
        }, config.retryConnectionTime);
    }
}