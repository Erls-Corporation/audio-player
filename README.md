## Javascript API arround HTML5 audio element


### Introduction

```javascript
var player = new $.audioPlayer(
    audio: '.my_audio audio'
);
```

### Controll your audio element

```javascript
player.play();
player.pause();
player.stop();
player.load('my_track.mp3');
```

### Manage playlist

```javascipt
player.add('next_track.mp3');
player.next();
player.prev();
```

### Register listeners

List of events:

- `onPlay`
- `onPause`
- `onStop`
- `onLoad`
- `onAdd`


```javascipt
player.onPlay(function(player) {
    alert('now playing : ' + player.element.currentSrc);
});

/* OR */

player.prototype.onPlay(function(player) {
    alert('now playing : ' + player.element.currentSrc);
});



player.play(); // alert
```
