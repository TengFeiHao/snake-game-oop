define(function (require,exports,module) {
    //һ����������طŵ� function ��ǰ��
    //�ѵ����Ĵ���ŵ������
    var Food = require('./food.js');
    var Snake = require('./snake.js');
    var cal = require('./calculator.js');
    //console.log(cal(10, 20));
    console.log(cal.add(10,20));
    /*
     * self������Game��ʵ����Ŀ�����ڿ����ڵ�ǰ�����������λ�úܷ�����õ�Game��ʵ��
     * */
    var self;
    /*
     * ��Ϸ���󣬹�������������󼰿�ʼ����ͣ��ֹͣ��Ϸ��
     * */
    function Game(){
        /*
         * ����Game�е�thisʵ������
         * @type{[Game]}
         * */
        self = this;
        /*
         * ʵ������ʳ�����
         * @type{Food}
         * */
        self.food = new Food();
        /*
         * ʵ�������߶���
         * @type{snake}
         * */
        self.snake = new Snake();
        /*
         * ��ʱ��ID
         * @type{Number}
         * */
        self.timer = 0;
        /*
         * �˶����ʱ��
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
                //self����Ϸʵ������
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
    //ÿһ��define ��󶼻�Ĭ�� return exports
    //�����Ҫ����������������Ϊ��module.exports��ֵ�Ϳ�����
    module.exports = Game;
})


//(function (window,document,Food,Snake) {
//    /*
//    * self������Game��ʵ����Ŀ�����ڿ����ڵ�ǰ�����������λ�úܷ�����õ�Game��ʵ��
//    * */
//    var self;
//    /*
//    * ��Ϸ���󣬹�������������󼰿�ʼ����ͣ��ֹͣ��Ϸ��
//    * */
//    function Game(){
//        /*
//        * ����Game�е�thisʵ������
//        * @type{[Game]}
//        * */
//        self = this;
//       /*
//       * ʵ������ʳ�����
//       * @type{Food}
//       * */
//        self.food = new Food();
//        /*
//        * ʵ�������߶���
//        * @type{snake}
//        * */
//        self.snake = new Snake();
//        /*
//        * ��ʱ��ID
//        * @type{Number}
//        * */
//        self.timer = 0;
//        /*
//        * �˶����ʱ��
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
//                //self����Ϸʵ������
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















