

const models = {
    usersModel: require('./mysql/users'),
    almacenModel: require('./nosql/almacen'),
    storageModel: require('./mysql/storage')
}

module.exports = models;