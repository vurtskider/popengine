'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var POPEngine = function () {
    function POPEngine(id, content, options) {
        _classCallCheck(this, POPEngine);

        var pop = this;
        this.id = id;
        this.pop = document.getElementById(id);
        this.cont = content;
        this.options = {
            animation: 'instant',
            autoclose: '5s',
            buttons: [],
            class: 'nc',
            cross: true,
            direction: 'top',
            duration: '1s',
            ground: true,
            header: '',
            height: '230px',
            left: 'center',
            position: 'fixed',
            sideKeyThick: '28px',
            top: 'center',
            template: 'default',
            width: '350px'
        };
        if(Object.assign){
            this.options = Object.assign(this.options, options);
        } else {
            for(var i in options){
                this.options[i]=options[i];
            }
        }
        this.pop.innerHTML = this.init();
        this.prepareAnimation();
        this.contEl = this.pop.getElementsByClassName('pop-content')[0];
        var closer = [];
        if (this.options.cross) closer.push('a.close-pop');
        if (this.options.closer) closer.push(this.options.closer);
        var key;
        if (key = this.pop.getElementsByClassName('pop-side-key')[0]) {
            switch (this.options.direction) {
                case 'left':
                    key.style.cssText = 'width:' + this.options.sideKeyThick + ';height:' + this.options.height + ';right:-' + this.options.sideKeyThick;
                    break;
                case 'right':
                    key.style.cssText = 'width:' + this.options.sideKeyThick + ';height:' + this.options.height + ';left:-' + this.options.sideKeyThick;
                    break;
                case 'top':
                    key.style.cssText = 'width:' + this.options.width + ';height:' + this.options.sideKeyThick + ';bottom:-' + this.options.sideKeyThick;
                    break;
                case 'bottom':
                    key.style.cssText = 'width:' + this.options.width + ';height:' + this.options.sideKeyThick + ';top:-' + this.options.sideKeyThick;
                    break;
            }
            if (this.options.template == 'sideblock') {}
            key.addEventListener('click', function () {
                pop.sideKey();
            });
        }
        if (closer.length) {
            this.closeButton = this.pop.querySelectorAll(closer.join(','));
            Array.prototype.forEach.call(this.closeButton, function (item) {
                item.addEventListener('click', function () {
                    pop.close();
                });
            });
        }
        if (this.options.activator) {
            this.activator = document.querySelectorAll(this.options.activator);
            Array.prototype.forEach.call(this.activator, function (item) {
                item.addEventListener('click', function () {
                    pop.open();
                });
            });
        }
        this.buttons = this.pop.querySelectorAll('button');
        Array.prototype.forEach.call(this.buttons, function (item) {
            item.addEventListener('click', function () {
                Array.prototype.forEach.call(pop.options.buttons, function (btn) {
                    if (item.id == btn.id) {
                        var ret = true;
                        if (btn.function && isFunction(btn.function)) {
                            var temp;
                            if ((temp = btn.function()) === false) ret = temp;
                        }
                        if (ret) pop.close();
                    }
                });
            });
        });
    }

    POPEngine.prototype.init = function init() {
        if (this.options.width.indexOf('px') >= 0) {
            if (this.options.left == 'center') this.options.left = (window.innerWidth - parseInt(this.options.width)) / 2 + 'px';
        } else if (this.options.width.indexOf('%') >= 0) {
            if (this.options.left == 'center') this.options.left = (window.innerWidth - window.innerWidth * parseFloat(this.options.width) / 100) / 2 + 'px';
        }
        if (this.options.height.indexOf('px') >= 0) {
            if (this.options.top == 'center') this.options.top = (window.innerHeight - parseInt(this.options.height)) / 2 + 'px';
        } else if (this.options.height.indexOf('%') >= 0) {
            if (this.options.top == 'center') this.options.top = (window.innerHeight - window.innerWidth * parseFloat(this.options.height) / 100) / 2 + 'px';
        }
        this.pop.style.cssText = 'height:' + this.options.height + ';width:' + this.options.width + ';position:' + this.options.position;
        var html = this.template();
        this.pop.style.top = this.options.top;
        this.pop.style.left = this.options.left;
        return html;
    };

    POPEngine.prototype.template = function template() {
        var pop = this;
        var html = '';
        this.pop.classList.add('pop', 'pop-' + this.options.template, this.options.class);
        switch (this.options.template) {
            case 'default':
                if (this.options.header.length) {
                    html += "<span class='pop-header'>" + this.options.header + "</span>";
                }
                if (this.options.cross) {
                    html += "<a class='close-pop'>⨯</a>";
                }
                if (Array.isArray(this.options.buttons) && this.options.buttons.length) {
                    this.pop.style.paddingBottom = '48px';
                    var buttons = this.options.buttons;
                    html += "<div class='buttons'>";
                    for (var ind in buttons) {
                        html += "<button id='" + buttons[ind].id + "'>" + buttons[ind].title + "</button>";
                    }
                    html += "</div>";
                }
                break;
            case 'sideblock':
                this.options.animation = 'slide';
                this.options.ground = false;
                html += "<div class='pop-side-key " + this.options.direction + "'></div>";
                this.pop.classList.add(this.options.direction);
                switch (this.options.direction) {
                    case 'top':
                        this.options.top = 0;
                        break;
                    case 'bottom':
                        this.options.top = window.innerHeight - this.pop.offsetHeight + 'px';
                        break;
                    case 'left':
                        this.options.left = 0;
                        break;
                    case 'right':
                        this.options.left = window.innerWidth - this.pop.offsetWidth + 'px';
                        break;
                }
                this.options.cross = false;
                this.options.ground = false;
                if (Array.isArray(this.options.buttons) && this.options.buttons.length) {
                    this.pop.style.paddingBottom = '48px';
                    var buttons = this.options.buttons;
                    html += "<div class='buttons'>";
                    for (var ind in buttons) {
                        html += "<button id='" + buttons[ind].id + "'>" + buttons[ind].title + "</button>";
                    }
                    html += "</div>";
                }
                break;
            case 'notice':
                this.options.ground = false;
                if (this.options.cross) {
                    html += "<a class='close-pop'>❌</a>";
                }
                html += "<div class='notice-status'></div>";
                break;
        }
        if (this.options.ground) {
            var parent = this.pop.parentNode;
            this.ground = document.createElement('div');
            this.ground.classList.add('pop-ground');
            parent.insertBefore(this.ground, this.pop);
            this.ground.addEventListener('click', function () {
                pop.close();
            });
        }
        html += "<div class='pop-content'>" + this.content + "</div>";
        return html;
    };

    POPEngine.prototype.prepareAnimation = function prepareAnimation() {
        var pop = this;
        switch (this.options.animation) {
            case 'instant':
                this.options.duration = '0';
                break;
            case 'slide':
                var direct = this.options.direction;
                if (direct == 'bottom') {
                    direct = 'top';
                } else if (direct == 'right') {
                    direct = 'left';
                }
                setTimeout(function () {
                    pop.pop.style.transition = direct + ' ' + pop.options.duration;
                }, 50);
                this.slideoff();
                break;
            case 'fade':
                this.pop.style.transition = 'opacity ' + this.options.duration;
                this.pop.style.opacity = 0;
                break;
        }
        if (this.options.ground) {
            this.ground.style.transition = 'opacity ' + this.options.duration;
            this.ground.style.opacity = 0;
        }
    };

    POPEngine.prototype.sideKey = function sideKey() {
        var key = this.pop.getElementsByClassName('pop-side-key')[0];
        key.classList.toggle('opened');
        if (key.classList.contains('opened')) {
            this.open();
        } else {
            this.close();
        }
    };

    POPEngine.prototype.slideon = function slideon() {
        this.pop.style.top = this.options.top;
        this.pop.style.left = this.options.left;
    };

    POPEngine.prototype.slideoff = function slideoff() {
        switch (this.options.direction) {
            case 'top':
                this.pop.style.top = '-' + this.pop.offsetHeight + 'px';
                break;
            case 'bottom':
                this.pop.style.top = window.innerHeight + 'px';
                break;
            case 'left':
                this.pop.style.left = '-' + this.pop.offsetWidth + 'px';
                break;
            case 'right':
                this.pop.style.left = window.innerWidth + 'px';
                break;
        }
    };

    POPEngine.prototype.onclick = function onclick() {
        alert("ID: " + this.id);
    };

    POPEngine.prototype.onAnimate = function onAnimate() {
        var pop = this;
        if (pop.options.ground) {
            pop.ground.style.opacity = 1;
        }
        switch (this.options.animation) {
            case 'slide':
                pop.slideon();
                break;
            case 'fade':
                this.pop.style.opacity = 1;
                break;
        }
        if (pop.options.template == 'notice') {
            var noticeStatus = pop.pop.getElementsByClassName('notice-status')[0];
            var time = this.timeParse(this.options.autoclose);
            var temp = 0;
            pop.timer = setTimeout(function () {
                pop.close();
            }, pop.timeParse(pop.options.autoclose));
            pop.interv = setInterval(function () {
                temp += 10;
                var percent = temp / time * 100;
                if (percent > 100) {
                    percent = 100;
                }
                noticeStatus.style.width = percent + '%';
                if (percent == 100) {
                    clearInterval(pop.interv);
                }
            }, 10);
        }
    };

    POPEngine.prototype.offAnimate = function offAnimate() {
        var pop = this;
        if (pop.options.ground) {
            pop.ground.style.opacity = 0;
        }
        switch (this.options.animation) {
            case 'slide':
                pop.slideoff();
                break;
            case 'fade':
                this.pop.style.opacity = 0;
                break;
        }
        if (pop.options.template == 'notice') {
            clearInterval(pop.interv);
            clearTimeout(pop.timer);
        }
    };

    POPEngine.prototype.open = function open() {
        var pop = this;
        pop.pop.classList.add(pop.options.animation);
        if (pop.options.ground) {
            pop.ground.style.display = 'block';
        }
        setTimeout(function () {
            pop.onAnimate();
        }, 50);
    };

    POPEngine.prototype.close = function close() {
        var pop = this;
        pop.offAnimate();
        setTimeout(function () {
            if (pop.options.ground) {
                pop.ground.style.display = 'none';
            }
            pop.pop.classList.remove(pop.options.animation);
        }, pop.timeParse(pop.options.duration));
    };

    POPEngine.prototype.timeParse = function timeParse(time) {
        if (time.indexOf('ms') > 0) {
            return parseFloat(time);
        } else if (time.indexOf('s') > 0) {
            return parseFloat(time) * 1000;
        } else {
            return parseFloat(time);
        }
    };

    _createClass(POPEngine, [{
        key: 'content',
        set: function set(content) {
            this.cont = content;
            this.contEl.innerHTML = content;
        },
        get: function get() {
            return this.cont;
        }
    }]);

    return POPEngine;
}();

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}