const mongoose = require('mongoose');

const DEFAULT_CONFIG = {
    reconnect: false,
    retryConnectionTime: 3000,
};

const DEFAULT_MONGO_Options = {
    useNewUrlParser: true,
};

class MongoClient {
    constructor(config, mongoOptions = {}) {
        if (MongoClient.instance) {
            return MongoClient.instance;
        }

        this.config = Object.assign(DEFAULT_CONFIG, config);
        this.mongoOptions = Object.assign(DEFAULT_MONGO_Options, mongoOptions);

        mongoose.connection.on('open', function callback () {
            console.error('[Mongo] Connected');
        });
        mongoose.connection.on('error', error => {
            console.error('[Mongo] Error', error);
        });

        const isReconnectEnabled = this.config.reconnect;
        mongoose.connection.on('close', async function () {
            if (!isReconnectEnabled) {
                console.error('[Mongo] Closing connection');
                return;
            }
            console.error('[Mongo] Reconnecting');
            await getConnection(this.config, this.mongoOptions);
        });
    }

    get connection() {
        return mongoose.connection;
    }

    async connect() {
        await getConnection(this.config, this.mongoOptions);
    }
};
module.exports = MongoClient;

async function getConnection(config, mongoOptions) {
    return new Promise(resolve => {
        getConnectionMethod(config, mongoOptions, resolve);
    });
}

async function getConnectionMethod(config, mongoOptions, next) {
    try {
        await mongoose.connect(config.url, mongoOptions);
        next();
    } catch (error) {
        console.error('[Mongo] Connection error', error);
        setTimeout(function() {
            getConnectionMethod(config, mongoOptions, next);
        }, config.retryConnectionTime);
    }
}