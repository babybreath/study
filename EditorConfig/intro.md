# EditorConfig使用介绍

## EditorConfig是什么

EditorConfig帮助开发者在不同的编辑器或开发工具之间定义相同的代码风格。它包含一个定义文件和一批编辑器插件，这些插件使编辑器读取配置文件格式化代码。

## 配置文件

    # http://EditorConfig.org
	root = true

	[*]
	charset = utf-8
	indent_size = 4
	indent_style = tab
	insert_final_newline = true
	trim_trailing_whitespace = true

配置文件 .editorconfig 放置在项目根目录下。当编辑器打开一个文件时，插件会在打开文件的目录和其每一级父目录查找.editorconfig文件，直到找到root=true
**windows资源管理器无法直接创建.editorconfig文件，可以创建.editorconfig.文件，系统会自动重命名为.editroconfig**

### 通配符

- * 匹配除/之外的任意字符串
- ** 匹配任意字符串
- ? 匹配任意单个字符
- [name] 匹配name字符
- [!name] 匹配非name字符
- {s1, s2, s3} 匹配任意给定的字符串
**支持的特殊字符可以使用\转义变成普通字符**

### 属性

#### root

- true 表明是顶层的配置文件

#### charset

编码格式
- utf-8
- utf-16be
- utf-16le
- latin1

#### indent_style

缩进方式
- tab
- space

#### indent_size

缩进宽度 一般设置为 4 或 2

#### tab_width

设置代替tab的宽度，默认为indent_size的值，一般无需设置

#### end_of_line

换行符定义
- lf
- cr
- crlf

#### trim_trailing_whitespace

- true 除去换行行首的任意空白字符
- false 反之

#### insert_final_newline

- true 使文件以一个空白行结尾
- false 反之