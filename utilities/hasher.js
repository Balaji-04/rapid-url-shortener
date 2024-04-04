const crypto = require('crypto');

function getHash(str){
    const sha256 = crypto.createHash('sha256');
    return sha256.update(str).digest('hex').toString();
}

module.exports = getHash;