<template>
  <div class="good">
      <div class="menu-wrapper" ref="menuWrapper">
          <ul >
            <li v-for="(item,index) in data" :class="[{active:index==indexw},getType(item.type,false)]" @click="getActive(index)"><span>{{item.name}}</span></li>
          </ul>
      </div>
      <div class="food-wrapper" ref="foodWrapper">
          <ul>
              <li v-for="item in data" class="food-item" >
                    <p class="title">{{item.name}}</p>
                    <div class="contain"> 
                        <div class="detail"  v-for="food in item.foods" @click="foodShow(food)">
                            <div>
                                <img src="static/images/caipin1.jpg"/>
                            </div>
                            <div class="right-side">
                                <p class="tit">{{food.name}}</p>
                                <p class="muted">{{food.description}}</p>
                                <p class="rat"><span>销量  {{food.sellCount}}</span><span class="rating">好评率 {{food.rating}}</span></p>
                                <p class="price">￥ {{food.price}}</p>
                            </div>
                            <mcart :food='food' @increament="totalDrop"  @chooseFood="chooseFood"></mcart>
                           
                        </div>
                    </div>
                    
              </li>
          </ul>
      </div>
      <mshopCart :seller='seller' :choseFoods="choseFoods" ref="shopcart" @emptyData="emptyData()"></mshopCart>
      <mfood :selectFood='selectFood' :showFood='showFood' @hidden="hidden()" @chooseFood="chooseFood"></mfood> 
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import data from '../../static/data.json'
import mshopCart from './shopCart.vue'
import mcart from './cart.vue'
import mfood from './food.vue'
export default {
  data () {
    return {
        data:{},
        init_Height:[],
        scrollY:0,
        seller:{},
        choseFoods:[],
        showFood:false,
        selectFood:{}
    }
  },
  components:{
      mshopCart,
      mcart,
      mfood
  },
  computed:{
       indexw(){
        var  totalHeight=0;
        for(var i=0;i<this.init_Height.length;i++){
            totalHeight+=this.init_Height[i]
            if(this.scrollY<totalHeight && this.scrollY+8>totalHeight-this.init_Height[i]){
              return i
            }
        }
    }
  },
  created(){
      this.data=data.goods; 
      this.seller=data.seller;    
  },
  mounted(){
    this.$nextTick(()=>{
       this.initHeight()
        this.initScroll()
    })
  },
  methods:{
    getType(type,bool){
      var stye='';
      var str='';
      switch(type){
        case 2:
          str='特';
          stye="special";
          break;
        case 1:
          str="折";
          stye="minus"
          break;
        
      }
       return bool?str:stye
    },
    getActive(index){
       var foodwrap=this.$refs.foodWrapper.getElementsByClassName('food-item');
       var type=foodwrap[index];
       this.foodScroll.scrollToElement(type,300)
    },
    initHeight(){
      var food=$('.food-wrapper ul').children('li');
      for(var i=0;i<food.length;i++){
        this.init_Height.push(food[i].clientHeight)
      }
    },
    initScroll(){
          this.foodScroll=new Bscroll(this.$refs.foodWrapper,{
             click:true,
             probeType:3
          });
          this.menuScroll=new Bscroll(this.$refs.menuWrapper,{
              click:true
          });
         this.foodScroll.on('scroll',(pos)=>{
              this.scrollY = Math.abs(Math.round(pos.y));
        })
    },
    emptyData(){
      this.choseFoods=[];
    },
    foodShow(food){
      this.showFood=true;
      this.selectFood=food;
    },
    hidden(){
      this.showFood=false;
    },
    chooseFood(food){
      if(this.choseFoods.indexOf(food)==-1){
         this.choseFoods.push(food);

      }
      if(food.count==0){
        let index= this.choseFoods.indexOf(food)
        this.choseFoods.splice(index,1);
      }
    },
    totalDrop(target){
        this.$refs.shopcart.drop(target)
    },
  }
}
</script>


<style lang="scss" scoped>
    .good{
      display: flex;
      position: absolute;
      top: 181px;
      bottom:46px;
      overflow: hidden;

        .menu-wrapper{
               width: 80px;            
                background: rgb(243, 245, 247);
            ul {
              li{
                display: table;
                height: 56px;
                width: 56px;
                padding:0 12px;
                &.special{
                    text-indent: 14px;
                    background:url(../../static/images/special_3@2x.png) no-repeat 10px 12px;
                    background-size:15%;
                }
                &.minus{
                    text-indent: 12px;
                    background:url(../../static/images/discount_3@2x.png) no-repeat 8px 5px;
                    background-size:15%;
                }
                &.active{
                  background:#fff;
                  margin-top: -1px;
                  span{
                    border-bottom:none;
                  }
                }
                span{
                  display:table-cell;
                  vertical-align: middle;
                   border-bottom:1px solid #dfdfdf;
                }
              }
            }
        }
        .food-wrapper{
          flex: 1;
           ul{padding-bottom: 54px;}
          .food-item{
             .title{
                height: 28px;
                text-indent:12px;
                line-height: 28px;
                border-left:3px solid #ddd;
                background:rgb(243, 245, 247);
             }
             .contain{
               padding:0 10px;
                .detail{
                  &:last-child{
                    border-bottom:none;
                  }
                  padding:10px 0;
                 display: flex;
                 border-bottom:1px solid #ddd;
                  img{
                    width: 60px;
                  }
                .right-side{
                    margin-left: 12px;
                    flex: 1;
                    .muted{
                      color:#c0c0c0;
                    }
                    .tit{
                      font-size:14px;
                      color:#333;
                      line-height: 24px;
                    }
                    .rat{
                      color:#c5c2c2;
                      .rating{
                          margin-left:10px;
                        }
                    }
                    .price{
                      color:#f00;
                    }
                        }
                 

            }
             }

          }
            
        }
    }
</style>
