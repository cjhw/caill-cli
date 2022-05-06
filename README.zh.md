## 这是一个快速生成项目模板的脚手架，支持vue和react，其中vue集成了vite,axios,typescript,pinia,react集成了typescript和Ant Design

- ### 安装

  - ```
    npm install caill-cli -g
    ```



- ### 创建一个项目

  - ##### cai create <project> [others...] 

  - 例如：cai create my-app 

  - 可以选择创建vue或react项目

- ### 添加一个组件

  - ##### cai addcpn <name>

  - 例如：cai addcpn HelloWorld [-d src/components]

  - 默认目录为：src/component

  - ### 添加一个页面

- ##### cai addview <view>

  - 例如：cai addview Home [-d src/page]
  - 默认目录为：src/views
  - 会生成一个文件夹，文件夹里有组件和对应的路由配置

- ### 添加一个基于pinia的仓库

  - ##### cai addstore <store>

  - 例如：cai addview Home [-d src/page]

  - 默认目录为：src/stores/modules

- ### 提示:react目前只支持创建基本的项目，不支持上述的操作，后面可能会完善







