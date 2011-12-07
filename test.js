describe("audioPlayer.js", function() {

    var player;
    var matchers = {
        toBePlaying: function() {
            var self = this;
            var past = this.actual.element.currentTime;
            return setTimeout(function() {
                return self.actual.element.currentTime > past;
            }, 1100);
        },
        toBeStopped: function() {
            var self = this;
            var past = this.actual.element.currentTime;
            return setTimeout(function() {
                return self.actual.element.currentTime == past;
            }, 1100);
        },
        toPlay: function(track) {
            var src = this.actual.element.src;
            return src.lastIndexOf(track) == (src.length - track.length);
        },
        toBeReset: function() {
            return this.actual.element.currentTime == 0;
        }
    };

    describe("audio controlls", function() {

        beforeEach(function() {
            player = new $.audioPlayer();
            this.addMatchers(matchers);
        });

        it("play() should play the current track", function() {
            expect(player).toBeStopped();
            player.play();
            expect(player).toBePlaying();
        });

        it("pause() should pause the track", function() {
            expect(player).toBePlaying();
            player.pause();
            expect(player).toBeStopped();
        });

        it("load() should change the track", function() {
            expect(player).toBeStopped();
            player.load('my_track');
            expect(player).toPlay('my_track');
            expect(player).toBePlaying();
        });
    });

    describe('events', function() {
        it("play() should dispatch 'onPlay' event", function() {
            player.onPlay = function(player) { player.onPlayCalled = true };
            player.play();
            expect(player.onPlayCalled).toBe(true);
        });

        it("pause() should dispatch 'onPause' event", function() {
            player.onPause = function(player) { player.onPauseCalled = true };
            player.pause();
            expect(player.onPauseCalled).toBe(true);
        });

        it("stop() should dispatch 'onStop' event", function() {
            player.onStop = function(player) { player.onStopCalled = true };
            player.stop();
            expect(player.onStopCalled).toBe(true);
        });

        it("load() should dispatch 'onLoad' event", function() {
            player.onLoad = function(player) { player.onLoadCalled = true };
            player.load();
            expect(player.onLoadCalled).toBe(true);
        });
    });

    describe('playlist', function() {

        beforeEach(function() {
            player = new $.audioPlayer();
            player.element.src = undefined;
            this.addMatchers(matchers);
        });

        it("add() should add a track at the end of the playlsit", function() {
            player.add('my_track');
            player.add('my_second_track');

            expect(player.trackList[0]).toBe('my_track');
            expect(player.trackList[1]).toBe('my_second_track');
        });

        it("next() play nothing if there's not track", function() {
            player.next();
            expect(player).toPlay('undefined');
        });

        it("next() play nothing if it is the end of the playlist", function() {
            player.add('my_track_1');
            player.add('my_track_2');
            player.add('my_track_3');
            player.load('my_track_3');

            player.next();
            expect(player).toPlay('undefined');
        });

        it("next() play the first track if there's not current track playing", function() {
            player.add('my_track');
            player.next();
            expect(player).toPlay('my_track');
        });

        it("next() play the next track", function() {
            player.add('my_track');
            player.load('my_track');

            player.add('my_track_after');
            player.next();
            expect(player).toPlay('my_track_after');
        });

        it("prev() play nothing if there's not track in the playlist", function() {
            player.prev();
            expect(player).toPlay('undefined');
        });

        it("prev() play nothing if it is the start of the playlist", function() {
            player.add('my_track_1');
            player.load('my_track_1');
            player.prev();
            expect(player).toPlay('undefined');
        });

        it("prev() play the last if there's not current track playing", function() {
            player.add('my_track');
            player.add('my_track_end');
            player.prev();
            expect(player).toPlay('my_track_end');
        });

        it("prev() play the previous track", function() {
            player.add('my_track_prev');
            player.add('my_track');
            player.load('my_track');

            player.prev();
            expect(player).toPlay('my_track_prev');
        });
    });
});
