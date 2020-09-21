<template>
  <div class="wrapper" >
    <div :class='[themeMode==0x10? "frame_fuc" :"frame_fuc_night"]'>
      <div class="nick_view" @click="modifyNickName()">
        <span id="textSize" class="titles"   :style="{'color':setTextColor()}">昵称</span>
        <label
          ref="nick"
          id="textSize"
          class="nick"
          :style="{'color':setNickNameColor()}"
        >{{nickName}}</label>
      </div>
      <div class="line" />
      <div class="nick_view" @click="modifyPsd()">
        <span id="textSize" class="titles" :style="{'color':setTextColor()}">修改密码</span>
        <img class="img_right" src="../../assets/right_arrow.png" />
      </div>
      <div class="line" />
      <div class="nick_view" @click="exitLogin()">
        <span id="textSize" class="titles_exit">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { JSToNativeAPP } from "../utils/DataUtils";

 import eventBus from '../utils/resetMessage.js';
export default {
  data() {
    return {
      nickName: "winoble",
      themeMode: 0x10,
      textRate: 1.0,
      isTextBold: false,
      userId: "",
      token: ""
    };
  },

  mounted() {
    window.callJsFunction = this.callJsFunction;
    // let that = this;
    // window.NativeToJS = function (res) {//res 原生APP给的数据
    //   // console.log(JSON.parse(res));
    //   let data = JSON.parse(res)
    //   if(data.code == 3){//获取cookie  code 为H5与app协商自定义，代表不同含义
    //     if(data.data.cookie){
    //       that.$cookies.set('SESSION',data.data.cookie,0);
    //     }else{
    //       JSToNativeAPP({
    //         "code": 401,
    //         "msg": '登录失效',
    //         "data": null
    //       })
    //     }
    //   }
    // }
  },
  //  activated(){
  // //根据key名获取传递回来的参数，data就是map中对应的key'id'的值  
  //   eventBus.$on('nickName', function(data){
  //   console.log("dataIndex.length5556=="+ this.nickName); 
  //   this.nickName=data;
  // }.bind(this));
  // },
  methods: {
    callJsFunction(str) {
      var data = JSON.parse(str);
      this.nickName = data.nickName;
      this.themeMode = data.themeMode;
      this.textRate = data.textRate;
      this.isTextBold = data.isTextBold;
      this.token = data.token;
      this.userId = data.userId;
      this.updated();
      return "";
    },
    exitLogin() {
      try {
        $App.exitLogin();
      } catch (error) {
         
      }
      
      
    },
    modifyPsd() {
      try {
        $App.modifyPsd();
      } catch (error) {}

      this.$router.push({
        path: "/ModifyPSD",
        query: {
          themeMode: this.themeMode,
          isTextBold: this.isTextBold,
          textRate: this.textRate
        }
      });
    },
    modifyNickName() {
      try {
        $App.modifyNickName();
      } catch (error) {}
      this.$router.push({
        path: "/ModifyNickName",
        query: {
          nickName: this.nickName,
          themeMode: this.themeMode,
          isTextBold: this.isTextBold,
          textRate: this.textRate,
          userId: this.userId
        }
      });
    },
    updated() {
      var textResize = this.textRate * 15;
      var labelResize = this.textRate * 17;
      //获得所有class="J_menuItem"的标签
      let dataIndex = document.querySelectorAll("#textSize");
      // let dataIndex = $(".nick_view");
      // console.log("dataIndex.length=="+dataIndex.length);
      for (let i = 0; i < dataIndex.length; i++) {
        dataIndex[i].style.fontSize = textResize + "px";
        if (this.isTextBold) {
          dataIndex[i].style.fontWeight = "bold";
        } else {
          dataIndex[i].style.fontWeight = "normal";
        }
      }
       if (this.themeMode === 0x10) {
            document.body.style.backgroundColor = "#ffffff00";
       }else{
            document.body.style.backgroundColor = "#01151500";
       }
      this.$refs.nick.style.fontSize = labelResize + "px";
      window.localStorage.setItem("token", this.token);
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
    setNickNameColor() {
      let color = "";
      if (this.themeMode === 0x10) {
        color = "#999999";
     

        let dataIndex = document.querySelectorAll(".line");
        for (let i = 0; i < dataIndex.length; i++) {
          dataIndex[i].style.backgroundColor = "#e5e5e5";
        }
      } else {
        color = "#ffffff";


        let dataIndex = document.querySelectorAll(".line");
        for (let i = 0; i < dataIndex.length; i++) {
          dataIndex[i].style.backgroundColor = "#ffffff";
        }
      }
      return color;
    }
  },
  created() {
  
  }
}  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.titles {
  font-weight: normal;
  color: #333333;
  font-size: 15px;
}

.titles_exit {
  font-weight: normal;
  color: #ff4545;
  font-size: 15px;
}

.nick_view {
  width: 100%;
  padding: 13px;
  display: inline-block;
  position: relative;
}

.nick {
  color: #999999;
  font-size: 17px;
  /* float:right; */
  /* padding-right: 20px; */
  position: absolute;
  right: 36px;
}

.img_right {
  height: 20px;
  width: 12px;
  position: absolute;
  right: 36px;
}

.line {
  width: auto;
  height: 1px;
  background: #ffffffd3;
  margin-left: 13px;
  margin-right: 13px;
}

.frame_fuc {
  height: auto;
  padding: 10px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  /* border: 1px solid #999999; */
  margin: 20px 20px  auto;
  margin-bottom: 25px;
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
  margin-bottom: 25px;
  box-shadow: 0px 0px 8px 2px #eeeeee44;
  z-index: 99;
}


</style>




