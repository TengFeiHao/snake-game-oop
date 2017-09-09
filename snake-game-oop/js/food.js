define(function (require,exports,module) {
    var Super = require('./super.js');
    var util = require('./util.js');
    function Food(options) {
        options = options || {};
        Super.call(this,options);
        this.color = options.color || 'rgb(' + util.getRandomIntInclusive(0, 255) + ',' + util.getRandomIntInclusive(0, 255) + ',' + util.getRandomIntInclusive(0, 255) + ')';
        this.element = document.createElement('div');
        this.init();
    }

    //初始化功能 根据参数生成div  添加到地图  map  容器中
    Food.prototype = {
        constructor: Food,
        init: function () {
            var div = this.element;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.backgroundColor = this.color;
            div.style.position = 'absolute';
            //随机数（0-19）*this.width
            this.render();
            this.map.appendChild(div);
        },
        //随机改变事物的坐标
        render: function () {
            var div = this.element;
            var randomLeft = util.getRandomIntInclusive(0, this.map.offsetWidth / this.width - 1);
            var randomTop = util.getRandomIntInclusive(0, this.map.offsetHeight / this.height - 1);
            div.style.left = randomLeft * this.width + 'px';
            div.style.top = randomTop * this.height + 'px';
            div.style.backgroundColor =  'rgb(' + util.getRandomIntInclusive(0, 255) + ',' + util.getRandomIntInclusive(0, 255) + ',' + util.getRandomIntInclusive(0, 255) + ')';
        }
    };
    //将内部的Food导出到全局  外部就可以访问了
    //如果希望单独导出一个函数，就给module。exports赋值即可
    module.exports = Food;
});

//(function (window,Super,util) {
//
//    function Food(options) {
//        options = options || {};
//        Super.call(this,options);
//        this.color = options.color || 'rgb(' + util.getRandomIntInclusive(0, 255) + ',' + util.getRandomIntInclusive(0, 255) + ',' + util.getRandomIntInclusive(0, 255) + ')';
//        this.element = document.createElement('div');
//        this.init();
//    }
//
//    //初始化功能 根据参数生成div  添加到地图  map  容器中
//    Food.prototype = {
//        constructor: Food,
//        init: function () {
//            var div = this.element;
//            div.style.width = this.width + 'px';
//            div.style.height = this.height + 'px';
//            div.style.backgroundColor = this.color;
//            div.style.position = 'absolute';
//            //随机数（0-19）*this.width
//            this.render();
//            this.map.appendChild(div);
//        },
//        //随机改变事物的坐标
//        render: function () {
//            var div = this.element;
//            var randomLeft = util.getRandomIntInclusive(0, this.map.offsetWidth / this.width - 1);
//            var randomTop = util.getRandomIntInclusive(0, this.map.offsetHeight / this.height - 1);
//            div.style.left = randomLeft * this.width + 'px';
//            div.style.top = randomTop * this.height + 'px';
//            div.style.backgroundColor =  'rgb(' + util.getRandomIntInclusive(0, 255) + ',' + util.getRandomIntInclusive(0, 255) + ',' + util.getRandomIntInclusive(0, 255) + ')';
//        }
//    };
//    //将内部的Food导出到全局  外部就可以访问了
//    window.Food = Food;
//})(window,Super,util);
