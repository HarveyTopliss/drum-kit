'use strict';

const audio = document.querySelectorAll('audio');
const keys = document.querySelectorAll('.key[data-key]');
const cymbal = document.querySelector('#crash-cymbal');
const topCymbal = document.querySelector('#hi-hat-top-cymbal');
//////////////////////////////////////////////////////////////////

window.addEventListener('keydown', function (e) {
  const originalCymbal = getComputedStyle(cymbal).transform;
  const originalTopCymbal = getComputedStyle(topCymbal).top;
  const htmlEffects = {
    //reposition cymbal to original position
    resetCymbal() {
      cymbal.addEventListener('transitionend', function () {
        if (cymbal.style.transform !== '') {
          cymbal.style.transform = originalCymbal;
        }
      });
    },
    //reposition top cymbal to original position
    resetTopCymbal() {
      topCymbal.addEventListener('transitionend', function () {
        if (topCymbal.style.top !== '') {
          topCymbal.style.top = originalTopCymbal;
        }
      });
    },
    //add effects to pressed keys
    selectkey() {
      keys.forEach(key => {
        const originalKey = getComputedStyle(key).scale;
        if (key.dataset.key === e.key) {
          key.style.scale = parseFloat(originalKey) + 0.2;
          key.addEventListener('transitionend', function () {
            if (key.style.scale !== '') {
              key.style.scale = originalKey;
            }
          });
        } else {
          return;
        }
      });
    },
    //play sound according to pressed key
    selectSound() {
      audio.forEach(sound => {
        if (sound.dataset.key === e.key) {
          sound.play();
          this.selectkey();
        } else {
          return;
        }
        //affect symbal when according key is pressed
        if (e.key === 'a' || e.key === 's') {
          cymbal.style.transform = 'rotate(5deg)';
          this.resetCymbal();
        }
        //affect top symbal when according key is pressed
        if (e.key === 'l') {
          topCymbal.style.top = parseInt(originalTopCymbal) + 5 + 'px';
          this.resetTopCymbal();
        }
      });
    },
  };
  htmlEffects.selectSound();
});
