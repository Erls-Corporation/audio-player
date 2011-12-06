(function($, undefined) {

    $.audioPlayer = function audioPlayer(options) {

        options = options || {};

        for (var name in this.options)
            if (options[name]) this.options[name] = options[name];

        this.element = $(this.options.audio).hide()[0];

        return this;
    }


    $.audioPlayer.prototype.options = {
        container: $('.ap_container')
      , progress: $('.ap_progress div')
      , audio: '.ap_audio audio'

      , btn_start: $('.ap_btn_start')
      , btn_pause: $('.ap_btn_pause')
      , btn_stop: $('.ap_btn_stop')

    };

    $.audioPlayer.prototype.play = function() {
        this.element.play();
        console.log(this.element);
    }

    $.audioPlayer.prototype.pause = function() {
        this.element.pause();
    }

    $.audioPlayer.prototype.stop = function() {
        this.element.pause();
    }

    $.audioPlayer.prototype.load = function(track) {
        this.element.src = track;
        this.element.load();
    }

})(Zepto);
