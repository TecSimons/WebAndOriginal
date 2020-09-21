<template>
  <div class="wrapper">
      <div :class='[themeMode==0x10? "frame_fuc" :"frame_fuc_night"]'>
      <div class="nick_view_start">
        <input
          id="textSize"
          type="password"
          placeholder="请输原始密码"
          class="titles"
          :style="{'color':setNickNameColor()}"
          v-model="originalPSD"
          @input="changeInput()"
        />
        <img
          v-show="originalPSDShow"
          id="clear_original"
          class="img_clear_first"
          src="../../assets/clear.png"
          @click="clearOriginalPSD()"
        
        />
        <div class="line" />
      </div>

      <div class="nick_view">
        <input
          id="textSize"
          type="password"
          placeholder="请输新密码"
          class="titles"
          :style="{'color':setNickNameColor()}"
          v-model="newPSD"
          @input="changeInput()"
        />
        <img
          v-show="newPSDShow"
          id="clear_new"
          class="img_clear"
          src="../../assets/clear.png"
          @click="clearNewPSD()"
        />
        <div class="line" />
      </div>

      <div class="nick_view_end">
        <input
          id="textSize"
          type="password"
          placeholder="确认新密码"
          class="titles"
          :style="{'color':setNickNameColor()}"
          v-model="confirmPSD"
          @input="changeInput()"
        />
        <img
          v-show="confirmPSDShow"
          id="clear_confirm"
          class="img_clear"
          src="../../assets/clear.png"
          @click="clearConfirmPSD()"
        />
        <div class="line" />
      </div>
    </div>
    <label
      ref="remind_text"
      id="textSize"
      class="remind_text"
      :style="{'color':setRemindTextColor()}"
      @click="confimModify()"
    >{{remind}}</label>
  </div>
</template>

<script>
// import { JSToNativeAPP } from "../utils/DataUtils";
export default {
  name: "app",
  data() {
    return {
      remind: "请输入至少由6个数字，字母组成的密码",
      originalPSDShow: false,
      newPSDShow: false,
      confirmPSDShow: false,
      originalPSD: "",
      newPSD: "",
      confirmPSD: "",
      themeMode: 0x10,
      textRate: 1.0,
      isTextBold: true
    };
  },

  mounted() {
    window.callJsFunction = this.callJsFunction;
    window.confimModify = this.confimModify;
  },
  methods: {
    callJsFunction(str) {
      var fromPage = JSON.parse(str).fromPage;
      if (fromPage == 1) {
        this.$router.push("/");
      }
      return "";
    }, 
    changeInput() {
      if (this.originalPSD.length > 0) {
        this.originalPSDShow = true;
      } else {
        this.originalPSDShow = false;
      }

      if (this.newPSD.length > 0) {
        this.newPSDShow = true;
      } else {
        this.newPSDShow = false;
      }

      if (this.confirmPSD.length > 0) {
        this.confirmPSDShow = true;
      } else {
        this.confirmPSDShow = false;
      }

      $App.monitorPsd(this.originalPSD, this.newPSD, this.confirmPSD);
    },
    clearOriginalPSD() {
      this.originalPSD = "";
      this.originalPSDShow = false;
    },
    clearNewPSD() {
      this.newPSD = "";
      this.newPSDShow = false;
    },
    clearConfirmPSD() {
      this.confirmPSD = "";
      this.confirmPSDShow = false;
    },
    confimModify() {
      // console.log("pararmItem==" + this.originalPSD);
      // console.log("pararmItem1==" + this.confirmPSD);
      axios
        .put(
          "/User/ChangePassword?oldPwd=" +
            this.originalPSD +
            "&newPwd=" +
            this.confirmPSD
        )
        .then(res => {
          // console.log(res);
          if (res.data.Status == 0) {
            this.$message.success('修改成功');
            $App.modifySuccessOfPSD();
            this.$router.back();
          } else {
            this.$message.error(res.data.Msg);
            $App.error(res.data.Msg);
           
          }
        });
    },
    updated(isTextBold) {
      var textResize = this.textRate * 15;
      var labelResize = this.textRate * 12;
      //获得所有class="J_menuItem"的标签
      let dataIndex = document.querySelectorAll("#textSize");
      // let dataIndex = $(".nick_view");
      // console.log("dataIndex.length=="+dataIndex.length);
      for (let i = 0; i < dataIndex.length; i++) {
        dataIndex[i].style.fontSize = textResize + "px";
        if (isTextBold) {
          dataIndex[i].style.fontWeight = "bold";
        } else {
          dataIndex[i].style.fontWeight = "normal";
        }
      }

      this.$refs.remind_text.style.fontSize = labelResize + "px";
    },
    setTextColor() {
      let color = "";
      if (this.themeMode === 0x10) {
        color = "#333333";
      } else {
        color = "#ffffff";
      }
      return color;
    },
    setRemindTextColor() {
      let color = "";
      if (this.themeMode === 0x10) {
        color = "#cccccc";
        document.body.style.backgroundColor = "#ffffff00";
      } else {
        color = "#ffffff";
        document.body.style.backgroundColor = "#01151500";
      }
      return color;
    },
    setNickNameColor() {
      let color = "";
      if (this.themeMode === 0x10) {
        color = "#333333";
      } else {
        color = "#ffffff";
      }
      return color;
    }
  },
  created() {
    this.themeMode = this.$route.query.themeMode;
    this.textRate = this.$route.query.textRate;
    this.isTextBold = this.$route.query.isTextBold;
    // console.log("dataIndex.length555=="+ this.originalPSDShow+'<------>'+this.newPSDShow); 
    setTimeout(() => {
      this.updated(this.isTextBold);
    }, 1);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.titles {
  width: 100%;
  height: auto;
  font-weight: normal;
  color: #333333;
  font-size: 15px;
  padding-top: 2px;
  padding-bottom: 2px;
  border: 0;
  outline: none;
  caret-color: red;
  background-color: rgba(0, 0, 0, 0);
}

.remind_text {
  font-weight: normal;
  color: #cccccc;
  font-size: 12px;
  margin-left: 30px;
  margin-top: 20px;
  position: relative;
  display: inline-block;
}

input::-webkit-input-placeholder {
  color: #bbbbbb;
}

.remind_text {
  font-weight: normal;
  color: #aaaaaa;
  font-size: 12px;
  margin-left: 30px;
  margin-top: 20px;
  position: relative;
  display: inline-block;
}

.nick_view_start {
  width: 100%;
  padding-left: 13px;
  padding-right: 13px;
  padding-top: 15px;
  display: inline-block;
  position: relative;
}

.nick_view {
  width: 100%;
  /* padding: 13px; */
  padding-left: 13px;
  padding-right: 13px;
  padding-top: 20px;
  display: inline-block;
  position: relative;
}
.nick_view_end {
  width: 100%;
  /* padding: 13px; */
  padding-left: 13px;
  padding-right: 13px;
  padding-top: 20px;
  padding-bottom: 15px;
  display: inline-block;
  position: relative;
}

.img_clear {
  height: 20px;
  width: 20px;
  position: absolute;
  right: 35px;
  top: 15px;
}

.img_clear_first {
  height: 20px;
  width: 20px;
  position: absolute;
  right: 35px;
  top: 10px;
}

.line {
  width: auto;
  height: 1px;
  background: #eeeeee;
  margin-right: 23px;
}

.frame_fuc {
  height: auto;
  padding: 10px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  /* border: 1px solid #999999; */
  margin: 20px 20px auto;
  box-shadow: 0px 0px 8px 2px #eeeeee;
  z-index: 99;
}

.frame_fuc_night {
  height: auto;
  padding: 10px;
  background: #011515;
  border-radius: 10px;
  /* border: 1px solid #999999; */
  margin: 20px 20px auto;
  box-shadow: 0px 0px 8px 2px#eeeeee44;
  z-index: 99;
}
</style>




