const MQClient = require('./lib/mq');
const MongoClient = require('./lib/mongo');
const models = require('./models');

console.log('[ACL] Connected');

module.exports.MQClient = MQClient;
module.exports.MongoClient = MongoClient;
module.exports.models = models;