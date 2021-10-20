# ADVENTURE ACL
*Anti-corruption Layer*

### Allow to:
- Make connection to MongoDB
- Share MongoDM models
- Make connection to MQ

### Mongo
```js
const acl = require('advence-acl');

(async function() {
    // create connection with MongoDB
    const config = {
        url: 'mongodb://127.0.0.1:27017/adventure_game'
    };
    const mongoClient = new acl.MongoClient(config);
    await mongoClient.connect();

    // call to mongo models
    const UserModel = acl.mongoModels.UserModel;

    // perform some operations with models
    const condition = {telegramId: 'xxx'};
    await new UserModel(condition);
    const user = await UserModel.findOne(condition);
})()
```

### MQ
```js
const acl = require('advence-acl');

(async function() {
    // create connection with MQ
    const config = {
        url: 'amqp://127.0.0.1:5672'
    };
    const mqClient = new acl.MQClient(config);
    await mqClient.connect();
    const mqConnection = mqClient.connection;

    // create some test parameters
    const mqExchange = 'test-exchange';
    const mqQueue = 'test-queue';
    const mqRoutingKey = 'test-routing-key';

    // create channel
    const channel = await mqConnection.connection.createChannel();
    const message = {
        telegramId,
    }
    await channel.assertExchange(mqExchange, 'direct', {durable: true}).catch(console.error);
    await channel.assertQueue(mqQueue, {durable: true});
    await channel.bindQueue(mqQueue, mqExchange, mqRoutingKey);

    // publish new event
    await channel.publish(mqExchange, mqRoutingKey, Buffer.from(JSON.stringify(message)));
    setTimeout(function() {
        channel.close();
    });
})()
```