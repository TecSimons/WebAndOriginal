<template>
  <div class="wrappers">
      <div :class='[themeMode==0x10? "frame_fuc" :"frame_fuc_night"]'>
      <div class="nick_view">
        <input
          id="textSize"
          type="text"
          placeholder="请输入昵称"
          class="titles"
          :style="{'color':setTextColor()}"
          v-model="nickName"
          @input="changeInput()"
        />
        <img class="img_clear" src="../../assets/clear.png" @click="clearName()" />
      </div>
    </div>
    <label
      ref="remind_text"
      id="textSize"
      class="remind_text"
      :style="{'color':setRemindTextColor()}"
      @click="modifyNickName()"
    >{{remind}}</label>
  </div>
</template>

<script>

import eventBus from '../utils/resetMessage.js';
export default {
  data() {
    return {
      nickName: "",
      originalName: "",
      remind: "输入您的昵称，昵称不可为空",
      themeMode: 0x10,
      textRate: 1.0,
      isTextBold: false,
      userId: ""
    };
  },
  mounted() {
    window.callJsFunction = this.callJsFunction;
    window.modifyNickName = this.modifyNickName;
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
      // console.log("dataIndex.length555=="+this.nickName);
      $App.changeNickName(this.nickName);
    },
    clearName() {
      this.nickName = "";
    },
    modifyNickName() {
       
      if(this.nickName==this.originalName){
         this.$message.warning('昵称没有被修改');
         return;
      }
       if(this.nickName==""){
         this.$message.warning('昵称不能为空');
         return;
      }
      var pararmItem = { DisplayName: this.nickName, ID: this.userId };
      console.log("pararmItem==" + pararmItem);
      axios.put("/User", pararmItem).then(res => {
        console.log(res);
        if (res.data.Status == 0) {
          this.$message.success('修改成功');
           $App.success(this.nickName);
          //  eventBus.$emit('nickName',this.nickName); 
           this.$router.go(-1);
        } else {
            this.$message.error(res.data.Msg)
          $App.error(res.data.Msg);
        }
      });
    },
    updated(isTextBold) {
      var textResize = this.textRate * 15;
      var labelResize = this.textRate * 12;
      //获得id=textSize的所有标签
      let dataIndex = document.querySelectorAll("#textSize");
      // let dataIndex = $(".nick_view");
      // console.log("dataIndex.length555=="+dataIndex.length);
      for (let i = 0; i < dataIndex.length; i++) {
        dataIndex[i].style.fontSize = textResize + "px";
        if (isTextBold) {
          dataIndex[i].style.fontWeight = "bold";
        } else {
          dataIndex[i].style.fontWeight = "normal";
        }
      }
      this.$refs.remind_text.style.fontSize = labelResize + "px";
      // document.querySelector(".remind_text").style.fontSize= labelResize + 'px';
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
    }
  },
  created() {
    this.nickName = this.$route.query.nickName;
    this.originalName=this.$route.query.nickName;
    this.themeMode = this.$route.query.themeMode;
    this.textRate = this.$route.query.textRate;
    this.isTextBold = this.$route.query.isTextBold;
    this.userId = this.$route.query.userId;
   
    setTimeout(() => {
      this.updated(this.isTextBold);
    }, 1);
  }
};
</script>

<style scoped >
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

.nick_view {
  width: 100%;
  padding: 5px;
  display: inline-block;
  position: relative;
}

.img_clear {
  height: 20px;
  width: 20px;
  position: absolute;
  right: 13px;
  top: 5px;
}

.frame_fuc {
  height: auto;
  padding: 8px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  /* border: 1px solid #999999; */
  margin: 20px 20px auto;
  box-shadow: 0px 0px 8px 2px #eeeeee;
  z-index: 99;
}

.frame_fuc_night {
  height: auto;
  padding: 8px;
  background: #011515;
  border-radius: 10px;
  /* border: 1px solid #999999; */
  margin: 20px 20px auto;
  box-shadow: 0px 0px 8px 2px #eeeeee44;
  z-index: 99;
}
</style>




