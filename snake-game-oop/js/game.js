define(function (require,exports,module) {
    //一般把依赖加载放到 function 最前面
    //把导出的代码放到最后面
    var Food = require('./food.js');
    var Snake = require('./snake.js');
    var cal = require('./calculator.js');
    //console.log(cal(10, 20));
    console.log(cal.add(10,20));
    /*
     * self备份了Game的实例，目的在于可以在当前作用域的其他位置很方便的拿到Game的实例
     * */
    var self;
    /*
     * 游戏对象，管理调度其他对象及开始，暂停，停止游戏等
     * */
    function Game(){
        /*
         * 备份Game中的this实例对象
         * @type{[Game]}
         * */
        self = this;
        /*
         * 实例化的食物对象
         * @type{Food}
         * */
        self.food = new Food();
        /*
         * 实例化的蛇对象
         * @type{snake}
         * */
        self.snake = new Snake();
        /*
         * 定时器ID
         * @type{Number}
         * */
        self.timer = 0;
        /*
         * 运动间隔时间
         * @type{Number}
         * */
        self.interval = 200;
    }
    Game.prototype = {
        constructor:Game,
        init:function(){
            var btnPause = document.querySelector('#btn_pause');
            var btnStart = document.querySelector('#btn_start');
            var btnRefresh = document.querySelector('#btn_refresh');
            var speed = document.querySelector('#speed');
            btnStart.addEventListener('click',self.start);
            btnPause.addEventListener('click',self.pause);
            btnRefresh.addEventListener('click',self.refresh);
            document.addEventListener('keydown',self.handleKeyDown);
        },
        stop: function () {
            window.clearInterval(self.timer);
        },
        pause: function () {
            window.clearInterval(self.timer);
        },
        refresh: function () {
            window.location.reload();
        },
        Speed: function () {
            console.log(self.interval);
        },
        start: function (e) {
            self.stop();
            self.timer = window.setInterval(function () {
                //self是游戏实例对象
                self.snake.move(self.food,self)
            },self.interval);
        },
        handleKeyDown : function (e) {
            switch (e.keyCode){
                case 37:
                    self.snake.direction = 'left';
                    break;
                case 38:
                    self.snake.direction = 'up';
                    break;
                case 39:
                    self.snake.direction = 'right';
                    break;
                case 40:
                    self.snake.direction = 'down';
                    break;
            }
        }
    };
    //每一个define 最后都会默认 return exports
    //如果需要单独导出函数，就为了module.exports赋值就可以了
    module.exports = Game;
})


//(function (window,document,Food,Snake) {
//    /*
//    * self备份了Game的实例，目的在于可以在当前作用域的其他位置很方便的拿到Game的实例
//    * */
//    var self;
//    /*
//    * 游戏对象，管理调度其他对象及开始，暂停，停止游戏等
//    * */
//    function Game(){
//        /*
//        * 备份Game中的this实例对象
//        * @type{[Game]}
//        * */
//        self = this;
//       /*
//       * 实例化的食物对象
//       * @type{Food}
//       * */
//        self.food = new Food();
//        /*
//        * 实例化的蛇对象
//        * @type{snake}
//        * */
//        self.snake = new Snake();
//        /*
//        * 定时器ID
//        * @type{Number}
//        * */
//        self.timer = 0;
//        /*
//        * 运动间隔时间
//        * @type{Number}
//        * */
//        self.interval = 200;
//    }
//    Game.prototype = {
//        constructor:Game,
//        init:function(){
//            var btnPause = document.querySelector('#btn_pause');
//            var btnStart = document.querySelector('#btn_start');
//            var btnRefresh = document.querySelector('#btn_refresh');
//            var speed = document.querySelector('#speed');
//            btnStart.addEventListener('click',self.start);
//            btnPause.addEventListener('click',self.pause);
//            btnRefresh.addEventListener('click',self.refresh);
//            document.addEventListener('keydown',self.handleKeyDown);
//        },
//        stop: function () {
//            window.clearInterval(self.timer);
//        },
//        pause: function () {
//            window.clearInterval(self.timer);
//        },
//        refresh: function () {
//            window.location.reload();
//        },
//        Speed: function () {
//            console.log(self.interval);
//        },
//        start: function (e) {
//            self.stop();
//            self.timer = window.setInterval(function () {
//                //self是游戏实例对象
//                self.snake.move(self.food,self)
//            },self.interval);
//        },
//        handleKeyDown : function (e) {
//            switch (e.keyCode){
//                case 37:
//                    self.snake.direction = 'left';
//                    break;
//                case 38:
//                    self.snake.direction = 'up';
//                    break;
//                case 39:
//                    self.snake.direction = 'right';
//                    break;
//                case 40:
//                    self.snake.direction = 'down';
//                    break;
//            }
//        }
//    };
//    window.Game = Game;
//})(window,document,Food,Snake);















