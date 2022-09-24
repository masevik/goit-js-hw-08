import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import storageApi from './storage';

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const throtteledSaveCurrentTime = throttle(saveCurrentTime, 1000);

player.on('timeupdate', throtteledSaveCurrentTime);

function saveCurrentTime() {
  player.getCurrentTime().then(function (seconds) {
    storageApi.save(LOCAL_STORAGE_KEY, seconds);
  });
}

player.on('play', getCurrentTime);

function getCurrentTime() {
  const currentTime = storageApi.load(LOCAL_STORAGE_KEY);
  if (currentTime) {
    player.setCurrentTime(currentTime).then(function (seconds) {});
  } else {
    player.setCurrentTime(0).then(function (seconds) {});
  }
}

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
