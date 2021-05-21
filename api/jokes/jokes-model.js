const jokes = require('./jokes-data')

function find() {
    return jokes
}

module.exports = {
    find,
    findById
}