(function($, undefined) {

    $.audioPlayer = function audioPlayer(options) {

        options = options || {};

        for (var name in this.options)
            if (options[name]) this.options[name] = options[name];

        this.element = $(this.options.audio)[0];
        this.trackList = [];

        return this;
    }

    $.audioPlayer.prototype.options = {
        audio: 'audio'
    };

    $.audioPlayer.prototype.onPlay  = function(player) {};
    $.audioPlayer.prototype.onPause = function(player) {};
    $.audioPlayer.prototype.onStop  = function(player) {};
    $.audioPlayer.prototype.onLoad  = function(player, track) {};
    $.audioPlayer.prototype.onAdd   = function(player, track) {};

    /* --- Audio controlls --- */

    // play the current track
    $.audioPlayer.prototype.play = function() {
        this.onPlay(this);
        this.element.play();
    }

    // pause the player
    $.audioPlayer.prototype.pause = function() {
        this.onPause(this);
        this.element.pause();
    }

    // stop the player
    $.audioPlayer.prototype.stop = function() {
        this.onStop(this);
        this.element.pause();
    }

    // change the current track playing
    $.audioPlayer.prototype.load = function(track) {
        this.onLoad(this, track);
        this.current = track;
        this.element.src = track;
        this.element.load();
    }

    /* --- Playlist controlls --- */

    // add a track to the end of the playlist
    $.audioPlayer.prototype.add = function(track) {
        this.onAdd(this, track);
        this.trackList.push(track);
    }

    $.audioPlayer.prototype.prev = function() {
        var track;
        var prevPos = this.trackList.indexOf(this.current) - 1;

        if (this.trackList[prevPos]) {
            track = this.trackList[prevPos];
        } else if (prevPos == -2) {
            track = this.trackList.pop();
        }

        this.load(track);
    }

    $.audioPlayer.prototype.next = function() {
        var track;
        var nextPos = this.trackList.indexOf(this.current) + 1;

        if (this.trackList[nextPos]) {
            track = this.trackList[nextPos];
        }

        this.load(track);
    }

})(Zepto);
