const MQCient = require('./lib/mq');
const MongoClient = require('./lib/mongo');

console.log('[ACL] Connected');

module.exports.MQCient = MQCient;
module.exports.MongoClient = MongoClient;