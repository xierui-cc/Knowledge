★盒子模型，以及标准情况和IE下的区别
    ie的盒子模型包括（margin(外边距)，padding(内边距)，边框(border）,内容(content) (ie的width=content+padding+borde)
    w3c的盒子模型包括（margin(外边距)，padding(内边距)，边框(border）,内容(content) w3c的width=content）

    可以通过box-sizing属性控制元素的盒子模型的解析模式，默认为content-box
        context-box：W3C的标准盒子模型，设置元素的 height/width 属性指的是content部分的高/宽
        border-box：IE传统盒子模型。设置元素的height/width属性指的是border + padding + content部分的高/宽

★BFC
    BFC规定了内部的Block Box如何布局。
    定位方案：

    内部的Box会在垂直方向上一个接一个放置。
    Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。
    每个元素的margin box 的左边，与包含块border box的左边相接触。
    BFC的区域不会与float box重叠。
    BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
    计算BFC的高度时，浮动元素也会参与计算。

    满足下列条件之一就可触发BFC
    根元素，即html
    float的值不为none（默认）
    overflow的值不为visible（默认）
    display的值为inline-block、table-cell、table-caption
    position的值为absolute或fixed

★介绍flex布局

★介绍position

    static（默认）
    relative（相对定位）一般为绝对定位服务
    absolute(绝对定位)：参考距其最近一个不为static的父级元素通过top, bottom, left, right 定位；
    fixed(固定定位) 相对与浏览器来说
    inherit: 继承父级属性
    (css3)
    sticky：兼容性差，粘贴定位。它的解释是，监听页面的srcoll 事件，当元素超过视图区块顶部、左边、右边、下边距离后，添加 fixed，反之，则去掉。
    注意：1.优先级：top>left>right>bottom。 2. 祖父元素必须设置 overflow: visible。

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
    浮动元素碰到包含它的边框或者浮动元素的边框停留。由于浮动元素不在文档流中，所以文档流的块框表现得就像浮动框不存在一样。浮动元素会漂浮在文档流的块框上。
    浮动带来的问题：
        父元素的高度无法被撑开，影响与父元素同级的元素
        与浮动元素同级的非浮动元素（内联元素）会跟随其后
        若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。
    清除浮动的方式：
        父级div定义height
        最后一个浮动元素后加空div标签 并添加样式clear:both。
        包含浮动元素的父标签添加样式overflow为hidden或auto。
        父级div定义zoom


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

如何实现高度自适应
两个元素块，一左一右，中间相距10像素
上下固定，中间滚动布局如何实现
div垂直水平居中
动画的了解