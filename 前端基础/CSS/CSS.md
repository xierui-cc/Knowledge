★盒子模型，以及标准情况和IE下的区别

    ie的盒子模型包括（margin(外边距)，padding(内边距)，边框(border）,内容(content) (ie的width=content+padding+borde)
    w3c的盒子模型包括（margin(外边距)，padding(内边距)，边框(border）,内容(content) w3c的width=content）

    可以通过box-sizing属性控制元素的盒子模型的解析模式，默认为content-box
        context-box：W3C的标准盒子模型
        border-box：IE传统盒子模型

★BFC

    简单的理解就是: 爸爸管儿子 兄弟之间划清界限

    内部的Box会在垂直方向上一个接一个放置。
    Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。
    每个元素的margin box 的左边，与包含块border box的左边相接触。
    BFC的区域不会与float box重叠。
    BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
    计算BFC的高度时，浮动元素也会参与计算。

    满足下列条件之一就可触发BFC
        根元素，即html （就是浏览器窗口你可以看成是一个bfc）
        float的值不为none（默认）
        overflow的值不为visible（默认）
        display的值为inline-block、table-cell、table-caption
        position的值为absolute或fixed

★介绍position

    static（默认）
    relative（相对定位）一般为绝对定位服务
    absolute(绝对定位)：参考距其最近一个不为static的父级元素通过top, bottom, left, right 定位；
    fixed(固定定位) 相对与浏览器来说
    inherit: 继承父级属性
    (css3)
    sticky：兼容性差，粘贴定位。它的解释是，监听页面的srcoll 事件，当元素超过视图区块顶部、左边、右边、下边距离后，添加 fixed，反之，则去掉。
    注意：1.优先级：top>left>right>bottom。 2. 祖父元素必须设置 overflow: visible。

★脱离文档流

    absolute(绝对定位)可以脱离文档流，也会脱离文本流
    float会脱离文档流，而不会脱离文本流

★CSS选择器有哪些

    元素选择器(标签元素)(伪元素选择器)(派生选择器(后代 子元素 兄弟))
    类选择器(class)(伪类选择器)(属性选择器(直接指定某个标签的某个属性))
    ID选择器(id)
    内联样式 权重最高

★rem,em和px的区别

    px：跟屏幕硬件标准有关系
    em：相对长度单位，相对于当前对象内文本的字体尺寸font-size，通常1em=16px。主要是会被父级的font-size影响到。
    rem：em的改版，只会相对于根的font-size做改变。

★清除浮动

    最后一个浮动元素后加空div标签 并添加样式clear:both。
        lear：both：本质就是闭合浮动， 就是让父盒子闭合出口和入口，不让子盒子出来（一般用伪元素而不是div）
    包含浮动元素的父标签添加样式overflow为hidden或auto。 通过触发BFC方式，实现清除浮动
        缺点：内容增多的时候容易造成不会自动换行导致内容被隐藏掉，无法显示要溢出的元素
    父级div定义zoom
    父级div定义height


★transform动画和直接使用left、top改变位置有什么优缺点

    top / left 对布局属性进行动画，浏览器需要为每一帧进行重绘并上传到GPU中,说白了影响性能
    transform 对合成属性进行动画，浏览器会为元素创建一个独立的复合层，当元素内容没有发生改变，该层就不会被重绘，浏览器会通过重新复合来创建动画帧

★CSS优化、提高性能的方法有哪些？

    避免过度约束
    避免后代选择符
    避免链式选择符
    使用紧凑的语法
    避免不必要的命名空间
    避免不必要的重复
    最好使用表示语义的名字。一个好的类名应该是描述他是什么而不是像什么
    避免！important，可以选择其他选择器
    尽可能的精简规则，你可以合并不同类里的重复规则

★浏览器是怎样解析CSS选择器的？

    CSS选择器的解析是从右向左解析的。若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面。
    而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 Render Tree。

★动画的了解