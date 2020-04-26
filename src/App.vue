<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>

    <div>
      <img
        id="img"
        class="musicIcon"
        :class="[StatePlay?'music_rotating':'music_implicit']"
        :src="sound"
        @click="musicSwitch"
      />
      <div class="audio">
        <!--隐藏audio标签 -->
        <audio autoplay="false" loop="loop" id="music">
          <source src="static/audios/ThankYou.mp3" />
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
function onBridgeReady() {
  WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
    document.getElementById("music").play();
  });
}

if (typeof WeixinJSBridge === "undefined") {
  document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
} else {
  onBridgeReady();
}

export default {
  name: "App",
  data() {
    return {
      sound: "static/images/pause2.png",
      StatePlay: true,
      isPlay: true
    };
  },

  created() {},

  methods: {
    musicSwitch() {
      var audio = document.getElementById("music");

      if (this.sound == "static/images/pause2.png") {
        this.sound = "static/images/play.png";
        this.StatePlay = false;
        audio.pause(); // 暂停
      } else {
        this.sound = "static/images/pause2.png";
        this.StatePlay = true;
        audio.play(); // 播放
      }
    }
  }
};
</script>

<style>
.musicIcon {
  width: 35px;
  height: 35px;
  position: fixed;
  top: 30px;
  right: 20px;
  opacity: 1;
  border-radius: 5000px;
}

.music_rotating {
  -webkit-animation: rotating-animation 4s linear infinite;
}

@-webkit-keyframes rotating-animation {
  0% {
    -webkit-transform: rotate(0deg);
    box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
  }

  25% {
    -webkit-transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
    box-shadow: 0 1px 30px #e8e8e8;
  }

  75% {
    -webkit-transform: rotate(270deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
  }
}

.music_implicit {
  -webkit-animation: implicit-animation 0.5s linear 1;
}

@-webkit-keyframes implicit-animation {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.fade-enter {
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s;
}
</style>
