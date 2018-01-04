<template>
  <div id="app">
    <header id="head" @click="showModal()">
        <div class="main">
            <img class="avatar" src="../static/images/seller_avatar_256px.jpg"/>
            <div class="head-right">
                <p class="title"> 粥品香坊(回龙观)</p>
                <p class="send">蜂鸟转送/ 38分钟送达</p>
                <p class="pay">在线支付满 28减5 </p>
            </div>
            <div class="pay-count">
              <span> 5个</span>
              <i class="iconfont icon-arrow"></i>
            </div>
        </div>
        <p class="shop-tip">
               <img src="../static/images/bulletin@2x.png"/> <span>粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</span>
                <i class="iconfont icon-arrow1"></i>
         </p>
        <div class="head-bg"><img src="../static/images/seller_avatar_256px.jpg" /></div>
    </header>
    <ul class="nav-bar">
        <router-link to="/good" active-class="active" tag="li">商品</router-link>
        <router-link to="/rate" active-class="active" tag="li">评论</router-link>
        <router-link to="/seller" active-class="active" tag="li">商家</router-link>   
    </ul>
    <div class="content">
      <router-view></router-view>
    </div>
    <transition name="scale">
    <div class="pop" v-show="show" @click="hidModal()">
        <div class="main"  >
            <h1>{{data.seller.name}}</h1>
            <div class="star">
                
            </div>
            <div class="discount-msg">
              <p class="name">
                <span class="line"></span>
                <span class="tit">优惠信息</span>
                <span class="line"></span>
              </p>
            </div>
            <div>
              <p class="seller">
                  粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
                  粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
              </p>
            </div>
            <div>
                <span style="color:#fff;font-size:18px;">X</span>
            </div>
        </div>
    </div>
   </transition> 
  </div>
</template>

<script>

import data from '../data.json'
export default {
  data(){
    return{
      data:{},
      show:false
    }
  },
  created(){
    this.data=data;
  },
  methods:{
    showModal(){
      this.show=true;
    },
    hidModal(){
      this.show=false;
    }
  },
  components:{
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
 $defaultColor:#fff;
 $border:1px solid #f1f1f1;
.active{
  color:#f00;
}
#head{
  width:100%;
  height:140px;
  position:relative;
  overflow: hidden;
  .head-bg{
     filter:blur(10px);
     position:absolute;
     top:0;
     left:0;
     width:100%;
     height:100%;
     z-index:-1;
     img{
       width:100%;
       height:100%;
     }
  }
  .main{
        padding:20px;
        overflow: hidden;
        background:rgba(55,55,55,0.5);
      .avatar{
        width:64px;
        float: left;
      }
      .head-right{
          float: left;
          margin-left:15px;
          color:#fff;
          font-size: 12px;
          .title{
            padding-left:40px;
            background:url("../static/images/brand@2x.png") no-repeat center  left;
            background-size:30px 18px;
            color:#fff;
            font-size: 18px;
            font-weight: bold;
          }
          .send{
            margin: 5px 0;
            color:#fff;
          }
          .pay{
            padding-left:20px;
            background:url("../static/images/decrease_1@2x.png") no-repeat center left;
            background-size:12px 12px;
            color:$defaultColor;
          }
         
      }
       .pay-count{
            float: right;
            margin-top: 50px;
            width:50px;
            height:24px;
            text-align: center;
            line-height: 20px;
            border-radius: 15px;
            background:rgba(0,0,0,0.3);
            span{
              font-size: 12px;
              color:$defaultColor;
              margin-right:-5px;
            }
            i{
              color:$defaultColor;
            }

          }  
  }
      .shop-tip{
        height:28px;
        padding:0 15px;
        line-height: 28px;
        background:rgba(0,0,0,0.5);
        position:relative;
        font-size: 12px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: normal;
        img{
          width:25px;
          display: inline;
          margin-top:-3px; 
          margin-right:5px;
          vertical-align: middle;
        }
        span{
            color:#fff;          
        }
        i{
          color:#fff;
          position:absolute;
          top:0;
          right:10px;
          font-size: 12px;
        }
      }
}
.nav-bar{
  height:40px;
  display: flex;
  line-height: 40px;
  text-align: center;
  border-bottom:$border;
  li{
    flex:1;
  }
}
.pop{
  position:absolute;
  right:0;
  left:0;
  bottom:0;
  top:0;
  background:rgba(7,17,27,0.8);
  z-index: 1000;
  padding:40px 20px;
  color:#fff;
  text-align: center;
  .star{
    margin-right:-20px;
    span{

      margin-right: 20px;
    }
    .iconfont{
      font-size: 24px;
    }
    
  }
  .discount-msg{
    margin-top:20px;
    .name{
      color:#fff;
      .tit{
        color:#fff;
        font-size:18px;
        margin:0 10px;
      }
      .line{
        display: inline-block;
        width:30%;
        height: 1px;
        border-bottom:1px solid #ddd;
        position:relative;
        top:-6px;
      }
    }
  }
  .seller{
    line-height: 20px;
    color:#fff;
  }
}
.scale-enter-active{
  animation:bounce-in 0.5s;
}
.scale-leave-active{
 animation:bounce-out 0.5s;
}
@keyframes bounce-in {
  0%{
    transform: scale(0)
  }
  50%{
    transform:scale(1.5)
  }
  100%{
    transform: scale(1)
  }
}
@keyframes bounce-out {
  0%{
    transform: scale(1)
  }
  50%{
    transform:scale(1.5)
  }
  100%{
    transform: scale(0)
  }
}
</style>
