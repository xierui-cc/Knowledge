★介绍暂时性死区 let、const以及var的区别
    var会找到所有的var并进行【创建create】【初始化initialize】，执行的时候才会【赋值assign】 
    
    let/const 声明的变量的作用域是块级的；
    let会找到所有的let并进行【创建create】，执行的时候才会【初始化initialize】【赋值assign】，所谓暂时性死区，就是不能在【初始化initialize】之前使用变量。const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。

    由于js是静态作用域，在代码编译的时候就会去分析各作用域的变量对象，因此「创建」过程一定是在代码执行前完成，也就是一定会被提升。

    (function是JS一等公民，编译器先会找到所有的function并进行【创建create】【初始化initialize 】【赋值assign】，所以写function随便写哪里都可以)

★ES6中let块作用域是怎么实现的
    应为js只有全局作用域 和 函数作用域，而let/const会有一个块级作用域，其实这个块级作用域是函数作用域模拟出来的

★ES6新的特性 ES6使用的语法

★介绍class和ES5的类以及区别

ES6中的map和原生的对象有什么区别
some、every、find、filter、map、forEach有什么区别
取数组的最大值（ES5、ES6）

ES5和ES6有什么区别