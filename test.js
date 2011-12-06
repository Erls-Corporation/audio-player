describe("audioPlayer.js", function() {
    var player;
    beforeEach(function() {
        player = new $.audioPlayer();
        this.addMatchers({
            toBePlaying: function() {
                var past = this.actual.element.currentTime;
                return setTimeout(function() {
                    return this.actual.element.currentTime > past;
                }, 1100);
            },
            toBeStopped: function() {
                var past = this.actual.element.currentTime;
                return setTimeout(function() {
                    return this.actual.element.currentTime == past;
                }, 1100);
            },
            toBeReset: function() {
                return this.actual.element.currentTime == 0;
            }
        });
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
        expect(player.element.src).toContain('my_track');
        expect(player).toBePlaying();
    });
});
