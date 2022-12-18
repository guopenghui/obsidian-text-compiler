## Obsidian Text Compiler

把你的文本转换为另一种格式。
你可以添加自己的转换函数，从而可以方便的用简单的表示生成复杂的文本，加快记笔记的速度。


[English Readme](https://github.com/guopenghui/obsidian-text-compiler/blob/master/README.md)

**你需要懂一点javascript**.

### 使用方法
1. 在设置面板添加你的编辑器函数，这个函数接收一个字符串参数，返回一个字符串。
2. 在命令面板中触发`get compiler`命令。
3. 输入名字选择你的编译器函数。
4. 在输入框内输入文字，预览右边的结果。点击`Copy`将输出内容复制到剪贴板

### 例子
插件中有一个内置的例子，这个例子无法被删除

选择 `list to text`，可以得到: 

![List to Tree](https://raw.githubusercontent.com/guopenghui/obsidian-text-compiler/master/public/list_to_tree.png)

### 安装方法
1. 直接在release里面下载.
2. 用BRAT插件.