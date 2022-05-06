const program = require('commander')

// 增加自己的options
const helpOptions = () => {
  program.option(
    '-d --dest <dest>',
    'a destination folder, 例如: -d src/components'
  )
}

module.exports = helpOptions
