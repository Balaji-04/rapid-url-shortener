const getHash = require('./hasher');

function getKey(url){
    const hashedVal = getHash(url);
    return hashedVal.substring(0, 5);
}

module.exports = getKey;