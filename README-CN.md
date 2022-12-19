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

### 一个交互式书写和测试你的函数的playground
+ [playground](https://sfc.vuejs.org/#eNqNVMFu3CAQ/ZURVdVN1DWbqr24TqQqp9zbQyUuxMZrUhvQMN5ku/K/d8BeaxMpUi8WMI/3Hm8wJ/EjhOIwGlGKKtZoA0E0NIY75ewQPBKcAE0LE7ToB/jE0E/K9YbAujDST/NCcJsQGyWUuFJOOSnhtx8Raj8E2xuEdnQ1We8KuPfhCJaAPBwThKXIun2h3BkDhNrF1uOwIea+gpNyAEkPTWSlpJJWCI+5Iq8XsTES+6t9YyCSRorQGTRwLRMKlt2JsiD/KwSD9zqaDRsGmBHvsRnXvOKaoNZUdxuzeEvcNKJjaw/uoHvbwEOKZvY5pc8CYA/K8QIvVXIOm2NWriIzhF6T4RlA1d3csQlW4TBMpDmpNZ/kpKgkgzK4sQewza0StXekrTOoRK4stbrXMXI5cCQcY8u2ljIDUhwajYbDduCj9oxbu6oEsKfadL5vDHIlH2o2k/YpIc86koXe1US7716JBjR3p9NFn1fJK5imSqb6W+LzqJIXUfE00rGf0dfnZjz6l220f/lWlTxG9r7lpe9rLz6sQZ13PNuGuhJudruPGQaccTJdwtfdLsxbE2/iKuFLeIHoU5f3qI+5qKixkV0dS2h7c6FV5AQWmUHj3roSvv0PJWQmNnVBlrqXo88tW1hX5cfe13/e+L840ttDMiXfwRyf+CzmX3076FA8Re/4Mcj0fB1yISpRngWV4CcgzZXoiEIspYxtnZ6Qp1h43EseFTg6soMpTBy2j+ifo0EmXv+ISUz/ADLZe2I=)

### 例子
插件中有一个内置的例子，这个例子无法被删除

选择 `list to text`，可以得到: 

![List to Tree](https://raw.githubusercontent.com/guopenghui/obsidian-text-compiler/master/public/list_to_tree.png)

![List to Tree](https://raw.githubusercontent.com/guopenghui/obsidian-text-compiler/master/public/list_to_tree.gif)

### 安装方法
1. 直接在release里面下载.
2. 用BRAT插件.