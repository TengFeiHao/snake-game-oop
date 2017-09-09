define(function (require, exports, module) {
    function Super(options) {
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.map = document.querySelector('.map')
    }
    module.exports = Super;
});


//(function (window) {
//    function Super(options) {
//        options = options || {};
//        this.width = options.width || 20;
//        this.height = options.height || 20;
//        this.map = document.querySelector('.map')
//    }
//
//    window.Super = Super;
//})(window);
