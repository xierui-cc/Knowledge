★对React看法，它的优缺点

    优点：虚拟dom 组件化 兼容性 函数式 单向数据流
    缺点：react本身只是一个U的库需要配合其他库
    
★react的理念是什么

    函数式
    不直接操作dom

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

--------------------------------------------------------------------------------------------------------------React16.x
★介绍下React的Fiber架构 画Fiber渲染树（异步渲染架构）
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

★Time Slicing(时间分片)
★Suspense(懒加载)+lazy

