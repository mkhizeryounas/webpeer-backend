var crypto = require('crypto');

module.exports = {
    log: (msg) => {
        console.log(JSON.stringify(msg));
    },
    time: () => {
        return Math.floor(new Date() / 1000);
    },
    hash: (str) => {
        var crypto = require('crypto');
        var name = 'secret-top-secret';
        var hash = crypto.createHash('sha256').update(name).digest('hex');
        return hash;
    }
}