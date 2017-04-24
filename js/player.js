function Player(options){
    var options = options || {};
    this.options = options;
    this.container = this.options.container && document.getElementsByClassName(this.options.container)[0] || document.getElementsByClassName('audio-container')[0];
    this.btnPlay = this.container.getElementsByClassName('icon-bofang')[0];
    this.progressContainerELe = this.container.getElementsByClassName('progress-container')[0];
    this.progressEle = this.container.getElementsByClassName('progress')[0];
    this.progressCircle = this.progressContainerELe.getElementsByClassName('circle')[0];
    this.volumeContainerELe = this.container.getElementsByClassName('volume-container')[0];
    this.volumeEle = this.container.getElementsByClassName('volume')[0];
    this.volumeCircle = this.volumeContainerELe.getElementsByClassName('circle')[0];
    this.startTime = this.container.getElementsByClassName('time')[0];
    this.endTime = this.container.getElementsByClassName('time')[1];

    this.init();
}

Player.prototype.init = function() {
    var _this = this;

    var audio = document.createElement('audio');
    audio.src = this.options.url;
    audio.preload = 'meta';

    _this.btnPlay.addEventListener('click', function(){
        if (_this.ele.paused) {
            _this.play();
            this.className = 'iconfont icon-zanting';
        }else{
            _this.pause();
            this.className = 'iconfont icon-bofang';
        }
    })

    _this.ele = audio;
    document.body.append(audio);

    _this.startTime.innerText = '00:00';
    _this.ele.onloadedmetadata = function(){
        _this.endTime.innerText = second2minute(_this.ele.duration);
    }

    _this.volume();
    _this.skin();
};

Player.prototype.skin = function() {
    if (this.options.skin) {
        this.container.className = this.container.className + ' audio-skin-' + this.options.skin;
    }
}

Player.prototype.play = function() {
    this.ele.play();
    this.progress();
};

Player.prototype.pause = function() {
    this.ele.pause();
    clearInterval(this.progressTimer);
};

Player.prototype.progress = function() {
    var _this = this;
    var progressLeft = _this.progressContainerELe.offsetLeft;
    var progressWidth = Number(getComputedStyle(_this.progressContainerELe).width.replace('px', ''));

    var timer = setInterval(function(){
        var pW = (_this.ele.currentTime / _this.ele.duration * progressWidth) + 'px'
        _this.progressEle.style.width = pW;
        _this.progressCircle.style.left = pW;
        _this.startTime.innerText = second2minute(_this.ele.currentTime);
    }, 500);


    _this.progressContainerELe.addEventListener('click', function(e){
        var paused = _this.ele.paused;
        var pW = (_this.ele.currentTime / _this.ele.duration * progressWidth) + 'px'
        var cT = (e.pageX - progressLeft) / progressWidth * _this.ele.duration;

        _this.pause();
        _this.ele.currentTime = cT;
        _this.progressEle.style.width = pW;
        _this.progressCircle.style.left = pW;
        
        if (!paused) {
            setTimeout(function(){
                _this.play();
            }, 500)
        }
    })

    _this.progressTimer = timer;
};

Player.prototype.volume = function() {
    var _this = this;
    var volumeLeft = _this.volumeContainerELe.offsetLeft;
    var volumeWidth = Number(getComputedStyle(_this.volumeContainerELe).width.replace('px', ''));

    _this.volumeContainerELe.addEventListener('click', function(e){
        _this.ele.volume = (e.pageX - volumeLeft) / volumeWidth;
        _this.volumeEle.style.width = (_this.ele.volume * volumeWidth) + 'px';
        _this.volumeCircle.style.left = (_this.ele.volume * volumeWidth) + 'px';
    })
};

/**
 * [second2minute 秒转分]
 * @param  {[type]} seconds [秒数]
 * @return {[type]}         [04:15 格式的分钟]
 */
function second2minute(seconds){
    return [
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
    ]
    .join(":")
    .replace(/\b(\d)\b/g, "0$1");
}