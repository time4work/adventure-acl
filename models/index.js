const UserModel = require('./UserModel')

class MongoModels {
    constructor() {
        this._models = {
            UserModel,
        }
    }
    get models() {
        return this._models
    }
}

module.exports = MongoModels