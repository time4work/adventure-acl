const MQClient = require('./lib/mq');
const MongoClient = require('./lib/mongo');
const MongoModels = require('./models');

console.log('[ACL] Connected');

module.exports.MQClient = MQClient;
module.exports.MongoClient = MongoClient;
module.exports.MongoModels = MongoModels;