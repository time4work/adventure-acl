const MQClient = require('./lib/mq');
const MongoClient = require('./lib/mongo');

console.log('[ACL] Connected');

module.exports.MQClient = MQClient;
module.exports.MongoClient = MongoClient;