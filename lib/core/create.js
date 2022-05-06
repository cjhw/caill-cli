const program = require('commander')

const {
  createProjectAction,
  addComponentAction,
  addViewAndRouteAction,
  addStoreAction,
} = require('./actions.js')

const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone repository into a fodler')
    .action(createProjectAction)

  program
    .command('addcpn <name>')
    .description(
      'add vue component, 例如: cai addcpn HelloWorld [-d src/components]'
    )
    .action((name) => {
      addComponentAction(name, program.opts().dest || 'src/components')
    })

  program
    .command('addview <view>')
    .description(
      'add vue view and router config, 例如: cai addview Home [-d src/page]'
    )
    .action((view) => {
      addViewAndRouteAction(view, program.opts().dest || 'src/views')
    })

  program
    .command('addstore <store>')
    .description(
      'add vue view and router config, 例如: cai addview Home [-d src/page]'
    )
    .action((store) => {
      addStoreAction(store, program.opts().dest || 'src/stores/modules')
    })
}

module.exports = createCommands
