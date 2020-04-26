<template>
  <div>
    <van-swipe class="my-swipe" :loop="false" indicator-color="white" @change="onChange">
      <van-swipe-item>
        <div id="imgHeight" class="bgImg" style></div>
      </van-swipe-item>
      <van-swipe-item>
        <div id="imgHeight" class="bgImg2" style></div>
      </van-swipe-item>
      <van-swipe-item>
        <div id="imgHeight" class="bgImg3" style></div>
      </van-swipe-item>

      <van-swipe-item>
        <div class="imgLogo">
          <img src="static/images/logo3.png" alt="error" />
        </div>

        <div class="FillBox">
          <div class="text_title">填写信息</div>

          <van-form @submit="onSubmit">
            <van-field
              v-model="userName"
              name="userName"
              label="姓名"
              label-class="leftText-stlye"
              placeholder="姓名"
              :rules="[{ required: true, message: '请填写姓名' }]"
              class="flatStyleInput"
            />

            <van-field
              v-model="userTel"
              type="tel"
              name="userTel"
              label="电话"
              placeholder="电话"
              maxlength="11"
              :rules="[{ required: true,validator, message: '请填写电话' }]"
              class="flatStyleInput"
            />

            <van-field
              v-model="userHospital"
              name="userHospital"
              label="医院名称"
              placeholder="医院名称"
              :rules="[{ required: true, message: '请填写医院名称' }]"
              class="flatStyleInput"
            />

            <van-field
              v-model="userDepartment"
              name="userDepartment"
              label="科室"
              placeholder="科室"
              :rules="[{ required: true, message: '请填写科室' }]"
              class="flatStyleInput"
            />

            <van-field
              readonly
              clickable
              name="picker"
              :value="address"
              label="预约门店"
              placeholder="点击选择门店"
              :rules="[{ required: true, message: '请点击选择门店' }]"
              @click="showPicker = true"
              class="flatStyleInput"
            />

            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                title="门店选择"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
              />
            </van-popup>

            <div style="position: absolute;width: 90%;margin-top: 50px;">
              <van-button round block type="info" native-type="submit" class="flatStylebtn">
                <img src="static/images/butn1.png" alt class="buts_img" />
              </van-button>
            </div>

            <van-popup v-model="show" :close-on-click-overlay="false" class="barBox">
              <div class="value">
                <span class="counter">
                  <span style="font-size: 0.7em;">{{barText}}</span>
                  {{barNum}}%
                </span>
              </div>
            </van-popup>
          </van-form>

          <div class="telBox">
            <div class="telPhone">
              <a href="tel://95026">
                <img src="static/images/phone.png" alt class="buts_img" />
              </a>
            </div>
          </div>

          <van-popup
            v-model="loading"
            :close-on-click-overlay="false"
            class="loadingBox"
            style="left: 88%;"
          >
            <div class="cp-spinner cp-round"></div>
          </van-popup>
        </div>
      </van-swipe-item>
    </van-swipe>

    <div class="sharebtn" v-show="hideShare">
      <div @click="showPopupShare">我要分享</div>
    </div>

    <van-popup v-model="showShare" class="shareImg">
      <img :src="codeImg" alt="二维码图片" />
      <div>长按图片保存</div>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";

export default {
  data() {
    return {
      showShare: false, //分享图弹框状态
      codeImg: 'https://hgh-file.tangdadatech.com/H5/share.jpg', //分享图
      userName: "", //填写姓名
      userTel: "", //填写电话
      userHospital: "", //填写医院
      userDepartment: "", //填写科室
      address: "", //填写预约门诊
      showPicker: false, //预约门诊弹框状态
      columns: [
        {
          text: "江岸区",
          children: [
            { text: "三眼桥店" },
            { text: "六合路店" },
            { text: "球场街店" },
            { text: "二七店" },
            { text: "后湖店" },
            { text: "三阳路店" },
            { text: "花桥店" }
          ]
        },
        {
          text: "武昌区",
          children: [
            { text: "才华街店" },
            { text: "水果湖店" },
            { text: "凤凰城店" },
            { text: "中南店" },
            { text: "徐东大街店" },
            { text: "三角路店" },
            { text: "积玉桥店" },
            { text: "复地东湖国际店" }
          ]
        },
        {
          text: "江汉区",
          children: [
            { text: "青年路店" },
            { text: "马场角店" },
            { text: "常青店" },
            { text: "前进路店" },
            { text: "新华家园店" },
            { text: "万达" }
          ]
        },
        {
          text: "青山区",
          children: [{ text: "红纲城店" }, { text: "建三店" }]
        },
        {
          text: "硚口区",
          children: [{ text: "古田四路店" }, { text: "体育馆店" }]
        },
        { text: "经济技术开发区", children: [{ text: "沌口店" }] },
        {
          text: "东西湖区",
          children: [{ text: "吴家山店" }, { text: "常青花园店" }]
        },
        {
          text: "汉阳区",
          children: [
            { text: "钟家村店" },
            { text: "十里铺店" },
            { text: "马沧湖店" },
            { text: "杨泗庙店" }
          ]
        },
        {
          text: "洪山区",
          children: [
            { text: "街道口店" },
            { text: "鲁巷店" },
            { text: "南湖搬迁店" },
            { text: "卓刀泉新店" },
            { text: "关山店" }
          ]
        }
      ], //预约门诊数据
      typeSub: true, //防误触提交按钮状态
      barNum: 0, //进度条
      show: false, //进度条弹框状态
      barText: "", //进度条加载文本
      hideShare: true, //填写页隐藏‘我要分享’
      loading: false, //提交时的加载

      current: 3 //

      // -----------------------------------
    };
  },
  created() {
    var that = this;

    if (!localStorage.getItem("openId")) {
      location.replace("http://showyu.tangdadatech.com/h5/dhr/wxlogin.html");
    }

    if (JSON.parse(localStorage.getItem("InfoValues"))) {
      var InfoValues = JSON.parse(localStorage.getItem("InfoValues"));
      that.userName = InfoValues.userName;
      that.userTel = InfoValues.userTel;
      that.userHospital = InfoValues.userHospital; //医院名称
      that.userDepartment = InfoValues.userDepartment; //科室（部门）
      that.address = InfoValues.picker; //预约门店
    }
  },

  methods: {
    showPopupShare() {
      this.showShare = true;
    },

    onChange(index) {
      console.log("当前 Swipe 索引：" + index);
      if (index == 3) {
        this.hideShare = false;
      } else {
        this.hideShare = true;
      }
    },

    onConfirm(address) {
      var data = address.toString(); //把数组转换为字符串
      this.address = data;
      this.showPicker = false;
    },

    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(tel) {
      return /^1(3|4|5|7|8)\d{9}$/.test(tel);
    },

    onSubmit(values) {
      console.log("submit", values);
      this.typeSub = false;
      this.loading = true;
      axios
        .post("https://showyu.tangdadatech.com/promotion-2019/api/v1/dhr/add", {
          name: values.userName,
          phone: Number(values.userTel),
          hospitalName: values.userHospital, //医院名称
          department: values.userDepartment, //科室（部门）
          bookingStore: values.picker, //预约门店
          openId: localStorage.getItem("openId")
        })
        .then(response => {
          console.log(response);

          if (response.data.result.code == 0) {
            localStorage.setItem("InfoValues", JSON.stringify(values));

            var that = this;
            that.loading = false;
            that.show = true;
            var barNumtime = setInterval(function() {
              console.log(that.barNum);
              if (that.barNum <= 99) {
                that.barNum++;

                switch (that.barNum) {
                  case 1:
                    //语句
                    that.barText = "审核中..";
                    break; //可选
                  case 79:
                    //语句
                    that.barText = "审核中..";
                    break; //可选
                  case 99:
                    //语句
                    that.barText = "审核完成";
                    break; //可选
                  //你可以有任意数量的case语句
                  default: //可选
                  //语句
                }
              } else {
                clearInterval(barNumtime);
              }
            }, 50);

            setTimeout(function() {
              Toast("提交成功");
              that.show = true;
              that.$router.push("/h5/dhr/endShare");
            }, 5000);
          } else {
            this.typeSub = true;
            this.loading = false;
            Toast(response.data.result.message);
          }
        })
        .catch(error => {
          console.log(error);
          this.typeSub = true;
          this.loading = false;
          Toast("提交失败");
        });
    }
  },

  mounted: function() {}
};
</script>

<style scoped>
@media screen and (max-width: 375px) {
  .bgImg {
    background-image: url("https://hgh-file.tangdadatech.com/H5/01-8-s.jpg");
  }
  .bgImg2 {
    background-image: url("https://hgh-file.tangdadatech.com/H5/02-8-s.jpg");
  }
  .bgImg3 {
    background-image: url("https://hgh-file.tangdadatech.com/H5/03-8-s.jpg");
  }
}

@media screen and (min-width: 375px) and (max-width: 562.5px) {
  .bgImg {
    background-image: url("https://hgh-file.tangdadatech.com/H5/01-8P-s.jpg");
  }
  .bgImg2 {
    background-image: url("https://hgh-file.tangdadatech.com/H5/02-8p-s.jpg");
  }
  .bgImg3 {
    background-image: url("https://hgh-file.tangdadatech.com/H5/03-8P-s.jpg");
  }
}

@media only screen and (device-width: 375px) and (min-height: 780px) and (-webkit-device-pixel-ratio: 3) {
  .bgImg {
    background-image: url("https://hgh-file.tangdadatech.com/H5/01-x-.jpg");
  }
  .bgImg2 {
    background-image: url("https://hgh-file.tangdadatech.com/H5/02-x.jpg");
  }
  .bgImg3 {
    background-image: url("https://hgh-file.tangdadatech.com/H5/03-x.jpg");
  }
}

@media screen and (min-width: 562.5px) {
  .bgImg {
    background-image: url("https://hgh-file.tangdadatech.com/H5/01-x-.jpg");
  }
  .bgImg2 {
    background-image: url("https://hgh-file.tangdadatech.com/H5/02-x.jpg");
  }
  .bgImg3 {
    background-image: url("https://hgh-file.tangdadatech.com/H5/03-x.jpg");
  }
}

/* 我要分享按钮 */
.sharebtn {
  height: 30px;
  width: 100%;
  line-height: 30px;
  text-align: center;
  color: #fff;
  position: fixed;
  bottom: 30px;
  left: 0;
  text-decoration: underline;
}

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
/* 我要分享按钮 end */

.bgImg {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  margin: 0px;
  padding: 0px;
}

.bgImg2 {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  margin: 0px;
  padding: 0px;
}

.bgImg3 {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  margin: 0px;
  padding: 0px;
}

/* .flatStylebtn {
  background-image: linear-gradient(top, #6eb6de, #4a77d4);
  border: 1px solid #3762bc;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.5);
} */

/* 炫彩 */

.flatStyleInput {
  width: 96%;
  margin-left: 2%;
  outline: none;
  padding: 8px;
  font-size: 13px;
  color: #1ba9d6;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.2),
    0 1px 1px rgba(255, 255, 255, 0.2);
  transition: box-shadow 0.5s ease;
  border-bottom: none;
  margin-top: 12px;
}

.flatStyleInput:active {
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.4),
    0 1px 1px rgba(255, 255, 255, 0.2);
}

.van-hairline--bottom::after {
  border-bottom-width: 0;
}

.van-cell:not(:last-child)::after {
  border-bottom: 1px solid rgba(0, 0, 0, 0);
}

.flatStylebtn {
  height: 37px;
  padding: 0;
  background-image: linear-gradient(top, #6eb6de, #4a77d4);
  border: 1px solid #3762bc;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.5);
}

.flatStylebtn:hover,
.flatStylebtn:active,
.flatStylebtn.active,
.flatStylebtn.disabled,
.flatStylebtn[disabled] {
  background-color: #e6e6e6;
}
.flatStylebtn:hover {
  color: #333333;
  text-decoration: none;
  background-color: #e6e6e6;
  background-position: 0 -15px;
  -webkit-transition: background-position 0.1s linear;
  -moz-transition: background-position 0.1s linear;
  -ms-transition: background-position 0.1s linear;
  -o-transition: background-position 0.1s linear;
  transition: background-position 0.1s linear;
}
.flatStylebtn,
.flatStylebtn:hover {
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  color: #ffffff;
}
.flatStylebtn.active {
  color: rgba(255, 255, 255, 0.75);
}
.flatStylebtn {
  background-color: #4a77d4;
  background-image: -moz-linear-gradient(top, #6eb6de, #4a77d4);
  background-image: -ms-linear-gradient(top, #6eb6de, #4a77d4);
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    from(#6eb6de),
    to(#4a77d4)
  );
  background-image: -webkit-linear-gradient(top, #6eb6de, #4a77d4);
  background-image: -o-linear-gradient(top, #6eb6de, #4a77d4);
  background-image: linear-gradient(top, #6eb6de, #4a77d4);
  background-repeat: repeat-x;
  filter: progid:dximagetransform.microsoft.gradient(startColorstr=#6eb6de, endColorstr=#4a77d4, GradientType=0);
  border: 1px solid #3762bc;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.5);
}
.flatStylebtn:hover,
.flatStylebtn:active,
.flatStylebtn.active,
.flatStylebtn.disabled,
.flatStylebtn[disabled] {
  filter: none;
  background-color: #4a77d4;
}

/* Animation 进度条 */
@keyframes grow {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.barBox {
  width: 100%;
  padding: 10% 0;
  margin-left: 76%;
  background: rgba(255, 255, 255, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Open Sans", sans-serif;
}

.value {
  width: 100%;
  margin-right: 77%;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  position: relative;
}

.value:before {
  content: "";
  width: 100%;
  height: 3px;
  background: #ff1ead;
  position: absolute;
  left: 0px;
  top: -1px;
  animation: grow 5s;
}

.value .counter {
  color: #fff;
  font-size: 1em;
  right: 5%;
  top: -12px;
  font-weight: 700;
  position: absolute;
}
/* Animation 进度条 end */

/* 填写完加载 */
.loadingBox {
  background: rgba(255, 255, 255, 0);
}

.cp-spinner {
  width: 48px;
  height: 48px;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
}

/*Round Spinner*/
.cp-round:before {
  border-radius: 50%;
  content: " ";
  width: 48px;
  height: 48px;
  display: inline-block;
  box-sizing: border-box;
  border-top: solid 6px #bababa;
  border-right: solid 6px #bababa;
  border-bottom: solid 6px #bababa;
  border-left: solid 6px #bababa;
  position: absolute;
  top: 0;
  left: 0;
}
.cp-round:after {
  border-radius: 50%;
  content: " ";
  width: 48px;
  height: 48px;
  display: inline-block;
  box-sizing: border-box;
  border-top: solid 6px #f56151;
  border-right: solid 6px transparent;
  border-bottom: solid 6px transparent;
  border-left: solid 6px transparent;
  position: absolute;
  top: 0;
  left: 0;
  animation: cp-round-animate 1s ease-in-out infinite;
}
/*Round Spinner Animation*/
@keyframes cp-round-animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 填写完加载 end */

/* 填写页标题 及logo */
.text_title {
  color: #ffffff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  line-height: 50px;
  text-align: center;
  font-size: 16px;
}

.FillBox {
  width: 90%;
  margin-left: 5%;
  background-color: #1ba9d6;
  border-radius: 15px;
  padding-bottom: 25px;
}

.imgLogo {
  width: 90%;
  margin-bottom: 30px;
  padding-top: 20px;
  padding-left: 5%;
}

.imgLogo img {
  height: 40px;
  width: 76px;
}

/* 填写页标题 及logo end */

/* 填写提交按钮 */
.buts_img {
  height: 37px;
  width: 100%;
}

.van-popup--bottom {
  bottom: 0;
  right: 0;
  width: 100vw;
}

/* 填写提交按钮 end */

/* 拨打电话 */
.telBox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: 130px;
  position: absolute; */
}

.telPhone {
  position: fixed;
  bottom: 30px;
}

.telPhone img {
  height: 15px;
  width: 266px;
}
/* 拨打电话 end */
</style>