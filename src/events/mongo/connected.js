const chalk = require('chalk');

module.exports = {
    name: 'connected', 
    execute(err) {
        console.log(
            chalk.green('[Database Status]: Connected')
        )
    }
}