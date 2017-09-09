// 1 加匿名函数自执行的目的是为了最大化的避免全局空间污染
// 2 保护内部成员防止被外部修改
// 3 把window传进去的目的是为了减少内部使用window的作用域查找范围
//      如果使用的是Math、array、字符串这样的代码，也就是非DOM、BOM操作代码都会直接解析
//而对于BOM、DOM操作、例如window、document都会进行作用域的查找
//4 写文件模块代码的时候，通过给函数传递一些参数的真正目的是在于声明当前文件对外部成员的依赖
//这样做的话别人或者你自己在阅读这个代码的时候就很明确的知道当前文件对哪些成员有依赖
//如果当前文件想要正常执行，则必须先加载到依赖的成员模块
//文件代码建议 将所有代码都运行到匿名函数自执行的私有空间
//对外部的依赖都通过匿名函数的参数传进来，用来明确当前文件模块代码对外部的依赖

define(function (require, exports, module) {
    var util = {
        getRandomIntInclusive: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random()*(max-min+1))+min;
    }
};
    module.exports = util;
});


//;(function (window) {
//    var util = {
//        getRandomIntInclusive: function (min, max) {
//            min = Math.ceil(min);
//            max = Math.floor(max);
//            return Math.floor(Math.random()*(max-min+1))+min;
//        }
//    };
//    //现在内部的util 外部无法访问的到
//    //这里可以通过window把until暴漏到全局  外部就可以访问到了
//    window.util = util;
//})(window); //把window传进去的目的就是减少作用域的查找范围