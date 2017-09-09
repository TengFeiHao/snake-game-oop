define(function (require,exports,module) {
    var Super = require('./super.js');
    var util = require('./util.js');
    var self;
    var content = 0;

    function Snake(options) {
        self = this;
        options = options || {};
        Super.call(self, options);
        self.direction = 'right';    //默认蛇的运动方向
        self.currentDirection = 'right';      //当前蛇的真实运动方向
        self.body = [
            {x: 1, y: 1, color: 'yellow', element: document.createElement('div')},
            {x: 2, y: 1, color: 'green', element: document.createElement('div')},
            {x: 3, y: 1, color: 'red', element: document.createElement('div')}
        ];
        //当数据初始化完毕，调用init初始化蛇的构造
        self.init();
    }

    Snake.prototype = {
        constructor: Snake,
        init: function () {
            self.body.forEach(function (item) {
                var div = item.element;
                div.style.width = self.width + 'px';
                div.style.height = self.height + 'px';
                div.style.backgroundColor = item.color;
                div.style.position = 'absolute';
                div.style.left = item.x * self.width + 'px';
                div.style.top = item.y * self.height + 'px';
                div.style.borderRadius = '10px';
                self.map.appendChild(div)
            });
        },
        move: function (food, game) {
            //反方向校验
            self.checkDirection();
            var head = self.body[self.body.length - 1];
            //碰壁检测
            if (self.direction === 'right' && (head.x + 1) * self.width >= 800) {
                game.stop();
                alert('game over ! ');
                return;
            } else if (self.direction === 'left' && (head.x - 1) * self.width < 0) {
                game.stop();
                alert('game over ! ');
                return;
            }
            else if (self.direction === 'up' && (head.y - 1) * self.height < 0) {
                game.stop();
                alert('game over ! ');
                return;
            }
            else if (self.direction === 'down' && (head.y + 1) * self.height >= 600) {
                game.stop();
                alert('game over ! ');
                return;
            }
            //先让所有的子节点都等于前面的节点（除了头以外）
            for (var i = 0; i < self.body.length - 1; i++) {
                var item = self.body[i];
                item.x = self.body[i + 1].x;
                item.y = self.body[i + 1].y;
                item.element.style.left = item.x * self.width + 'px';
                item.element.style.top = item.y * self.height + 'px';
            }
            //然后根据方向处理蛇头 的坐标
            switch (self.direction) {
                case 'left':
                    head.x -= 1;
                    head.element.style.left = head.x * self.width + 'px';
                    break;
                case 'right':
                    head.x += 1;
                    head.element.style.left = head.x * self.width + 'px';
                    break;
                case 'up':
                    head.y -= 1;
                    head.element.style.top = head.y * self.height + 'px';
                    break;
                case 'down':
                    head.y += 1;
                    head.element.style.top = head.y * self.height + 'px';
                    break;
            }
            var foodLeft = food.element.offsetLeft;
            var foodTop = food.element.offsetTop;
//自己吃到自己
            for (var i = 0; i < self.body.length - 1; i++) {
                if (head.x * self.width === self.body[i].x * self.width && head.y * self.height === self.body[i].y * self.height) {
                    game.stop();
                    alert('game over ! ');
                    return;
                }
            }
            //如果蛇头的坐标等于食物的坐标 则表示蛇吃到了食物
            if (head.x * self.width === foodLeft && head.y * self.height === foodTop) {
                //重新渲染食物坐标
                food.render();
                content++;
                var score = document.querySelector('#score');
                score.innerHTML = content;
                var last = self.body[0];
                //吃到食物 创建一个div，然后把节点添加到map地图中
                self.body.unshift({
                    x: last.x,
                    y: last.y,
                    color: 'rgb(' + util.getRandomIntInclusive(0, 255) + ',' + util.getRandomIntInclusive(0, 255) + ',' + util.getRandomIntInclusive(0, 255) + ')',
                    element: document.createElement('div')
                });
                self.init();
            }
        },
        checkDirection: function () {
            if (self.currentDirection === 'right' && self.direction === 'left') {
                self.direction = 'right';
            } else if (self.currentDirection === 'left' && self.direction === 'right') {
                self.direction = 'left';
            }
            else if (self.currentDirection === 'up' && self.direction === 'down') {
                self.direction = 'up';
            }
            else if (self.currentDirection === 'down' && self.direction === 'up') {
                self.direction = 'down';
            }
            //反方向校验完毕后，要让当前的运动方向等于现在的 direction
            self.currentDirection = self.direction;
        }
    };
    module.exports = Snake;
});



//(function (window) {
//    var self;
//    var content = 0;
//
//    function Snake(options) {
//        self = this;
//        options = options || {};
//        Super.call(self, options);
//        self.direction = 'right';    //默认蛇的运动方向
//        self.currentDirection = 'right';      //当前蛇的真实运动方向
//        self.body = [
//            {x: 1, y: 1, color: 'yellow', element: document.createElement('div')},
//            {x: 2, y: 1, color: 'green', element: document.createElement('div')},
//            {x: 3, y: 1, color: 'red', element: document.createElement('div')}
//        ];
//        //当数据初始化完毕，调用init初始化蛇的构造
//        self.init();
//    }
//
//    Snake.prototype = {
//        constructor: Snake,
//        init: function () {
//            self.body.forEach(function (item) {
//                var div = item.element;
//                div.style.width = self.width + 'px';
//                div.style.height = self.height + 'px';
//                div.style.backgroundColor = item.color;
//                div.style.position = 'absolute';
//                div.style.left = item.x * self.width + 'px';
//                div.style.top = item.y * self.height + 'px';
//                div.style.borderRadius = '10px';
//                self.map.appendChild(div)
//            });
//        },
//        move: function (food, game) {
//            //反方向校验
//            self.checkDirection();
//            var head = self.body[self.body.length - 1];
//            //碰壁检测
//            if (self.direction === 'right' && (head.x + 1) * self.width >= 800) {
//                game.stop();
//                alert('game over ! ');
//                return;
//            } else if (self.direction === 'left' && (head.x - 1) * self.width < 0) {
//                game.stop();
//                alert('game over ! ');
//                return;
//            }
//            else if (self.direction === 'up' && (head.y - 1) * self.height < 0) {
//                game.stop();
//                alert('game over ! ');
//                return;
//            }
//            else if (self.direction === 'down' && (head.y + 1) * self.height >= 600) {
//                game.stop();
//                alert('game over ! ');
//                return;
//            }
//            //先让所有的子节点都等于前面的节点（除了头以外）
//            for (var i = 0; i < self.body.length - 1; i++) {
//                var item = self.body[i];
//                item.x = self.body[i + 1].x;
//                item.y = self.body[i + 1].y;
//                item.element.style.left = item.x * self.width + 'px';
//                item.element.style.top = item.y * self.height + 'px';
//            }
//            //然后根据方向处理蛇头 的坐标
//            switch (self.direction) {
//                case 'left':
//                    head.x -= 1;
//                    head.element.style.left = head.x * self.width + 'px';
//                    break;
//                case 'right':
//                    head.x += 1;
//                    head.element.style.left = head.x * self.width + 'px';
//                    break;
//                case 'up':
//                    head.y -= 1;
//                    head.element.style.top = head.y * self.height + 'px';
//                    break;
//                case 'down':
//                    head.y += 1;
//                    head.element.style.top = head.y * self.height + 'px';
//                    break;
//            }
//            var foodLeft = food.element.offsetLeft;
//            var foodTop = food.element.offsetTop;
////自己吃到自己
//            for (var i = 0; i < self.body.length - 1; i++) {
//                if (head.x * self.width === self.body[i].x * self.width && head.y * self.height === self.body[i].y * self.height) {
//                    game.stop();
//                    alert('game over ! ');
//                    return;
//                }
//            }
//            //如果蛇头的坐标等于食物的坐标 则表示蛇吃到了食物
//            if (head.x * self.width === foodLeft && head.y * self.height === foodTop) {
//                //重新渲染食物坐标
//                food.render();
//                content++;
//                var score = document.querySelector('#score');
//                score.innerHTML = content;
//                var last = self.body[0];
//                //吃到食物 创建一个div，然后把节点添加到map地图中
//                self.body.unshift({
//                    x: last.x,
//                    y: last.y,
//                    color: 'rgb(' + util.getRandomIntInclusive(0, 255) + ',' + util.getRandomIntInclusive(0, 255) + ',' + util.getRandomIntInclusive(0, 255) + ')',
//                    element: document.createElement('div')
//                });
//                self.init();
//            }
//        },
//        checkDirection: function () {
//            if (self.currentDirection === 'right' && self.direction === 'left') {
//                self.direction = 'right';
//            } else if (self.currentDirection === 'left' && self.direction === 'right') {
//                self.direction = 'left';
//            }
//            else if (self.currentDirection === 'up' && self.direction === 'down') {
//                self.direction = 'up';
//            }
//            else if (self.currentDirection === 'down' && self.direction === 'up') {
//                self.direction = 'down';
//            }
//            //反方向校验完毕后，要让当前的运动方向等于现在的 direction
//            self.currentDirection = self.direction;
//        }
//    };
//    window.Snake = Snake;
//})(window);



