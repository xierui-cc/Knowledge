dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

增加了一个 Subscriptions, 用于收集其他来源的 action, eg: 键盘操作、滚动条、websocket、路由等

app = dva(opts)

    创建应用，返回 dva 实例。(注：dva 支持多实例)。

    const app = dva({
        history, // 指定给路由用的 history，默认是 hashHistory
        initialState,  // 指定初始数据，优先级高于 model 中的 state
        onError, // effect 执行错误或 subscription 通过 done 主动抛错时触发，可用于管理全局出错状态。
        onAction, // 在 action 被 dispatch 时触发
        onStateChange, // state 改变时触发，可用于同步 state 到 localStorage，服务器端等
        onReducer, // 封装 reducer 执行。比如借助 redux-undo 实现 redo/undo
        onEffect, // 封装 effect
        onHmr, // 热替换相关
        extraReducers, // 指定额外的 reducer，比如 redux-form 需要指定额外的 form reducer
        extraEnhancers, // 指定额外的 StoreEnhancer ，比如结合 redux-persist 的使用
    });

app.use(hooks)

    同样可以配置hooks以及注册其他插件

app.model

    namespace 唯一命名

    state  当前model的初始状态 优先级低于initialState

    subscriptions  这里处理订阅一些东西

    reducer - Action 处理器，处理同步动作

    effect - Action 处理器，处理异步动作 不直接修改 state 基于 Redux-saga 实现
    通过generate yield以及saga里面的常用call、put、takeEvery、takeLatest、take实现触发 action，可以和服务器交互，可以获取全局 state 的数据等等

    call 进行触发异步操作
    put 相当于dispatch 触发reducer改变state
    - takeEvery监听action的每次变化执行（默认）
    - takeLatest监听action最近一次的变化
    - take监听一次action留着，后面执行动作

app.router

app.start

dva/dynamic（懒加载）

    就是打包会打成多个文件

https://blog.csdn.net/weixin_38398698/article/details/93387757