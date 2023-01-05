const chalk = require('chalk');

module.exports = {
    name: 'connecting', 
    execute(err) {
        console.log(
            chalk.cyan('[Database Status]: Connecting...')
        )
    }
}