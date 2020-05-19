★对React看法，它的优缺点
    优点：虚拟dom 组件化 兼容性 函数式 单向数据流
    缺点：react本身只是一个U的库需要配合其他库
    
★React生命周期
    constructor() 初始化数据
    componentWillMount() 服务端渲染
    componentDidMount() 异步拿数据
    componentWillReceiveProps (nextProps) 触发在传递props的时候，一般用来props变化导致state变化 
    shouldComponentUpdate(nextProps,nextState) 性能优化 可以去掉由父组件渲染引起的子组件没必要的渲染
    componentWillUpdate (nextProps,nextState) 根据props state变化导致得业务需求变化
    render()
    componentDidUpdate(prevProps,prevState)
    componentWillUnmount () 卸载掉引用 防止内存泄露

★react的理念是什么
    拿函数式
    不直接操作dom

★介绍虚拟DOM 虚拟DOM主要做了什么 虚拟DOM本身是什么（JS对象）为什么虚拟DOM比真实DOM性能好
    主要是浏览器的DOM属性太多,多次操作性能差。
    虚拟don用js对象实现,把中间的DOM变化都算好,只需要浏览器改变最少的DOM

★介绍DOM树对比(diff) React中Dom结构发生变化后内部经历了哪些变化 jsx的key的作用
    Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计。(不考虑跨层情况就是改卸载卸载，该创建创建)
    拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。(意思就是同一个组件执行更新操作，不同的组件 直接卸载再加载新的组件)
    对于同一层级的一组子节点，它们可以通过唯一 key 进行区分(不加的化暴力比较)

★React层面的性能优化
    shouldComponentUpdate(nextProps,nextState)
    jsx加key
    异步加载组件

★介绍下React高阶组件，和Render props有什么区别
    高阶组件本质是函数 接受一个组件作为入参，返回也是一个组件，思想是把组件再包一层一般用来添加一些功能，一种设计模式
    Render props改变了高阶组件命名冲突,难以溯源。完全可以显示HOC的功能，更灵活

★介绍FunctionComponent与pureComponet
    pureComponet浅比较state props
    FunctionComponent函数组件没有副作用(有状态组件state props虽然是不可变的但是this是可变的,在一些异步渲染的情况下会有点问题)

★React怎么做数据的检查和变化
★React中setState后发生了什么

★react常见的通信方式
    context props和state

★如何解决props层级过深的问题（就是不想一级一级的传下去）
    Content
    Redux(状态提升)
    React.createContext(高级API)

★setState是同步还是异步 setState为什么默认是异步 setState什么时候是同步的
    异步：
        在合成事件中触发setState。如 onClick 等。
        在生命周期钩子函数中触发setState。
    同步：
        在setTimeout函数中触发setState
        在原生事件中触发setState，如document.addEventListener('click',function(){...})

★重新渲染render会做些什么 

★哪些方法会触发react重新渲染
    setstate
    传递props

★React的事件机制，React组件中怎么做事件代理
    合成事件的卸载交给react，不用做事件代理
    合成事件全部会被react代理到document上面的dispatchEvent方法里面去,当一个类型的事件触发后dispatchEvent会在document上面模拟冒泡
    react将浏览器Event封装成SyntheticEvent，e.stopPropagation只是react用来禁止模拟冒泡的，e.nativeEvent才是原生的Event
    e.stopPropagation → 用来阻止 React 模拟的事件冒泡
    e.nativeEvent.stopPropagation → 原生事件对象的用于阻止 DOM 事件的进一步捕获或者冒泡
    e.nativeEvent.stopImmediatePropagation → 原生事件对象的用于阻止 DOM 事件的进一步捕获或者冒泡，且该元素的后续绑定的相同事件类型的事件也被一并阻止。

React挂载的时候有3个组件，textComponent、composeComponent、domComponent，区别和关系，Dom结构发生变化时怎么区分data的变化，怎么更新，更新怎么调度，如果更新的时候还有其他任务存在怎么处理
    textComponent 文本类型的节点

React使用过的一些组件 (应该是 第三方的库)

--------------------------------------------------------------------------------------------------------------
★React16.x
    介绍下React的Fiber架构 画Fiber渲染树（异步渲染架构）
        一个基于优先级和 requestIdleCallback 的循环任务调度算法
            将组件的更新分为两个阶段
            phase1：componentWillMount()
                    componentWillReceiveProps (nextProps)
                    shouldComponentUpdate(nextProps,nextState)
                    componentWillUpdate (nextProps,nextState)
                    阶段1代表将要生成Fiber树,这一阶段可以被高优先级的任务打断
            phase2：componentDidMount()
                    componentDidUpdate(prevProps,prevState)
                    componentWillUnmount ()
                    阶段2代表Fiber树快更新完了,不能被打断
        Fiber渲染树
            基于虚拟DOM树变成链表的形式，最开始的dom更新是一步到位的,从根节点深度更新。而Fiber渲染树在渲染每个节点完成的时候 都会控制权交回给主线程取检查有没有高优先级的任务，没有就继续更新节点

    Time Slicing(时间分片)
    Suspense(懒加载)+lazy

    16.X声明周期的改变
        getDerivedStateFromProps(prevProps, prevState)
        getSnapshotBeforeUpdate(prevProps, prevState)

