<template>
  <div>

    <div id="imgHeight" class="bgImg" style>
      <div class="btnBox" >
        <img class="btnBoxImg" @click="showPopup" src="static/images/buts.png" alt />
      </div>
    </div>

    <van-popup v-model="show" class="shareImg">
      <img :src="codeImg" alt="二维码图片" />
      <div>长按图片保存</div>
    </van-popup>

  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      codeImg: 'https://hgh-file.tangdadatech.com/H5/share.jpg', //分享图
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    }
  }
};
</script>

<style scoped>

@media screen and (max-width: 375px) {
  .bgImg {
    background-image: url("/h5/dhr/static/images/8-s.jpg");
  }
}

@media screen and (min-width: 375px) and (max-width: 562.5px) {
  .bgImg {
    background-image: url("/h5/dhr/static/images/8p-s-.jpg");
  }
}

@media only screen and (device-width: 375px) and (min-height: 780px) and (-webkit-device-pixel-ratio: 3) {
  .bgImg {
    background-image: url("/h5/dhr/static/images/x-s.jpg");
  }
}

@media screen and (min-width: 562.5px) {
  .bgImg {
    background-image: url("/h5/dhr/static/images/x-s.jpg");
  }
}

.bgImg {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  margin: 0px;
  padding: 0px;
}

.btnBox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 110%;
}

.btnBoxImg {
  height: 35px;
  width: 306px;
}

/* 分享 */
.shareImg {
  height: 485px;
  width: 250px;
}

.shareImg img {
  height: 444px;
  width: 250px;
}

.shareImg div {
  line-height: 37px;
  text-align: center;
}
</style>