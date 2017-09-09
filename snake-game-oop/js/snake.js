define(function (require,exports,module) {
    var Super = require('./super.js');
    var util = require('./util.js');
    var self;
    var content = 0;

    function Snake(options) {
        self = this;
        options = options || {};
        Super.call(self, options);
        self.direction = 'right';    //Ĭ���ߵ��˶�����
        self.currentDirection = 'right';      //��ǰ�ߵ���ʵ�˶�����
        self.body = [
            {x: 1, y: 1, color: 'yellow', element: document.createElement('div')},
            {x: 2, y: 1, color: 'green', element: document.createElement('div')},
            {x: 3, y: 1, color: 'red', element: document.createElement('div')}
        ];
        //�����ݳ�ʼ����ϣ�����init��ʼ���ߵĹ���
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
            //������У��
            self.checkDirection();
            var head = self.body[self.body.length - 1];
            //���ڼ��
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
            //�������е��ӽڵ㶼����ǰ��Ľڵ㣨����ͷ���⣩
            for (var i = 0; i < self.body.length - 1; i++) {
                var item = self.body[i];
                item.x = self.body[i + 1].x;
                item.y = self.body[i + 1].y;
                item.element.style.left = item.x * self.width + 'px';
                item.element.style.top = item.y * self.height + 'px';
            }
            //Ȼ����ݷ�������ͷ ������
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
//�Լ��Ե��Լ�
            for (var i = 0; i < self.body.length - 1; i++) {
                if (head.x * self.width === self.body[i].x * self.width && head.y * self.height === self.body[i].y * self.height) {
                    game.stop();
                    alert('game over ! ');
                    return;
                }
            }
            //�����ͷ���������ʳ������� ���ʾ�߳Ե���ʳ��
            if (head.x * self.width === foodLeft && head.y * self.height === foodTop) {
                //������Ⱦʳ������
                food.render();
                content++;
                var score = document.querySelector('#score');
                score.innerHTML = content;
                var last = self.body[0];
                //�Ե�ʳ�� ����һ��div��Ȼ��ѽڵ���ӵ�map��ͼ��
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
            //������У����Ϻ�Ҫ�õ�ǰ���˶�����������ڵ� direction
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
//        self.direction = 'right';    //Ĭ���ߵ��˶�����
//        self.currentDirection = 'right';      //��ǰ�ߵ���ʵ�˶�����
//        self.body = [
//            {x: 1, y: 1, color: 'yellow', element: document.createElement('div')},
//            {x: 2, y: 1, color: 'green', element: document.createElement('div')},
//            {x: 3, y: 1, color: 'red', element: document.createElement('div')}
//        ];
//        //�����ݳ�ʼ����ϣ�����init��ʼ���ߵĹ���
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
//            //������У��
//            self.checkDirection();
//            var head = self.body[self.body.length - 1];
//            //���ڼ��
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
//            //�������е��ӽڵ㶼����ǰ��Ľڵ㣨����ͷ���⣩
//            for (var i = 0; i < self.body.length - 1; i++) {
//                var item = self.body[i];
//                item.x = self.body[i + 1].x;
//                item.y = self.body[i + 1].y;
//                item.element.style.left = item.x * self.width + 'px';
//                item.element.style.top = item.y * self.height + 'px';
//            }
//            //Ȼ����ݷ�������ͷ ������
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
////�Լ��Ե��Լ�
//            for (var i = 0; i < self.body.length - 1; i++) {
//                if (head.x * self.width === self.body[i].x * self.width && head.y * self.height === self.body[i].y * self.height) {
//                    game.stop();
//                    alert('game over ! ');
//                    return;
//                }
//            }
//            //�����ͷ���������ʳ������� ���ʾ�߳Ե���ʳ��
//            if (head.x * self.width === foodLeft && head.y * self.height === foodTop) {
//                //������Ⱦʳ������
//                food.render();
//                content++;
//                var score = document.querySelector('#score');
//                score.innerHTML = content;
//                var last = self.body[0];
//                //�Ե�ʳ�� ����һ��div��Ȼ��ѽڵ���ӵ�map��ͼ��
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
//            //������У����Ϻ�Ҫ�õ�ǰ���˶�����������ڵ� direction
//            self.currentDirection = self.direction;
//        }
//    };
//    window.Snake = Snake;
//})(window);



