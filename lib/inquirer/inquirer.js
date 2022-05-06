const inquirer = require('inquirer')

const prompt = () =>
  inquirer.prompt([
    {
      type: 'list',
      message: '请选择框架',
      name: 'framework',
      default: 0,
      choices: [
        {
          value: 1,
          name: 'vue + vite + ts + vue-router + pinia',
        },
        {
          value: 2,
          name: 'react + ts + Ant Design',
        },
      ],
      pageSize: 2,
    },
  ])

module.exports = prompt
