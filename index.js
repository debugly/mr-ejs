const ejs = require('ejs');
const fs = require("fs")
const exec = require('child_process').exec;

const data = {
    title: 'EJS Demo',
    nav_title: 'EJS 入门',
    contents: [
        {
            title: '安装',
            desc: 'npm install ejs --save-dev'
        },
        {
            title: '使用',
            desc: "\
//需要将打印出来的HTML标签和特殊含义的字符转义才能正常显示出来，否则会被浏览器解析！\n\
data.contents = data.contents.map((content, index) => {\n\
    let title = (index + 1) + '、' + content.title;\n\
    let desc = content.desc;\n\
    desc = desc.replace(/</g, '&lt;');\n\
    desc = desc.replace(/>/g, '&gt;');\n\
    desc = desc.replace(/\\n/g, '<br/>');\n\
    desc = desc.replace(/ /g, '&nbsp;');\n\
    return { 'title': title, 'desc': desc };\n\
});\n\
//创建ejs然后渲染模板文件，并把我们的JSON数据传进去！\n\
const ejs = require('ejs');\n\
ejs.renderFile('template.ejs', data, (err, str) => {\n\
if(err) {\n\
    console.error('模板渲染失败:' + err);\n\
} else {\n\
    console.log('编译成功');\n\
}"
        },
        {
            title: '布局',
            desc: "\
//使用 include 指令导入其他 ejs 模板，相对路径即可，不需要带后缀名！\n\
<%- include('componments/header') %>\n\
<%- include('componments/contents') %>\n\
<%- include('componments/footer') %>\n\
"
        },
        {
            title: 'contents模板',
            desc: "\
//本Demo页面的内容模板如下:\n\
<% contents.forEach((content => { %>\n\
    <ul class= \"contents\" >\n\
        <li>\n\
            <div class=\"content\">\n\
                <div class=\"title\">\n\
                    <h3>\n\
                        <%=content.title %>\n\
                    </h3>\n\
                </div>\n\
                <div class=\"desc\">\n\
                    <pre><%- content.desc %></pre>\n\
                </div>\n\
            </div>\n\
        </li>\n\
    </ul>\n\
<% })); %>\n\
            "
        },
        {
            title: "美化",
            desc: "\
<style>\n\
    html body {\n\
        margin: 0px;\n\
        padding: 0px;\n\
        background-color: bisque;\n\
    }\n\
\n\
    .header {\n\
        background-color: brown;\n\
        color: white;\n\
        /* 解决子元素H1的margin穿透父元素！！*/\n\
        overflow: hidden;\n\
        text-align: center;\n\
    }\n\
\n\
    .contents {\n\
        list-style: none;\n\
        padding: 0 2rem;\n\
        overflow: hidden;\n\
        /* background-color: blueviolet; */\n\
    }\n\
\n\
    .contents.content {\n\
        /* background-color: blue; */\n\
        overflow: hidden;\n\
    }\n\
\n\
    .contents.desc {\n\
        border: 2px solid gray;\n\
        background-color: aquamarine;\n\
        margin: 1rem 2rem;\n\
    }\n\
\n\
    .contents.desc pre {\n\
        padding: 15px;\n\
        line-height: 1.7;\n\
        margin: 0px;\n\
        word-wrap: break-word;\n\
        /* overflow-x: scroll; */\n\
    }\n\
\n\
    .footer {\n\
        border-top: 1px solid gray;\n\
        padding: 25px;\n\
        text-align: center;\n\
    }\n\
</style >"
        },
        {
            title: "参考",
            desc: "\
//编写这个demo时遇到了几个问题，解决方法如下:\n\
1.https://github.com/tj/ejs/issues/187\n\
2.https://stackoverflow.com/questions/31313920/html-br-tag-in-text-element-how-to-display-it-as-text\n\
3.https://stackoverflow.com/questions/17427713/how-to-write-out-html-entity-name-nbsp-lt-gt-etc\n\
4.https://www.jb51.net/css/75789.html\n\
"
        }, {
            title: '后话',
            desc: "本人的博客引擎使用的是Hexo，她也是使用 EJS 模板，突然有了一个闭门造车的想法，何不自己撸一个静态博客引擎呢，自娱自乐也好！"
        }
    ],
    author: 'qianlong Xu'
};

data.contents = data.contents.map((content, index) => {
    let title = (index + 1) + '、' + content.title;
    let desc = content.desc;

    desc = desc.replace(/</g, '&lt;');
    desc = desc.replace(/>/g, '&gt;');
    desc = desc.replace(/\n/g, '<br/>');
    desc = desc.replace(/ /g, '&nbsp;');

    return { 'title': title, 'desc': desc };
});

ejs.renderFile('template.ejs', data, (err, str) => {
    if (err) {
        console.error('模板渲染失败:' + err);
    } else {
        // console.log(str);
        fs.writeFile('index.html', str, (err) => {
            if (err) {
                console.error('文件写入失败:' + err);
            } else {
                console.log('编译成功');
                exec('open index.html');
            }
        })
    }
});