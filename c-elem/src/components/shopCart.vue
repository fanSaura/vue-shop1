<template>
	<div class="shopCart">
		<div @click="showList()" class="shopBar">
			<div class="cart-bg">
				<div class="cart-box" :class='{active:sum}'>
					<i class="iconfont icon-shopcart" :class="{active:sum}"></i>
					<b v-show="sum" v-text="sum"></b>
				</div>
			</div>
			<span class="total-price">￥ {{totalPrice }}</span>
			<span class="send-price">
				另需付配送费 ￥ {{seller.deliveryPrice}} 元
			</span>
			<div class="closePay" :class='{active:seller.minPrice<totalPrice}'>
				<b  v-if="seller.minPrice>totalPrice">{{seller.minPrice}} 元起送</b>
				<b v-else class="sendTo">去结算</b>
			</div>
		</div>
		<div class="ball-container">
		        <div v-for="ball in balls">
			          <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
			            <div v-show="ball.show" class="ball">
			              <div class="inner inner-hook">
			              </div>
			            </div>
			          </transition>
			    </div>
	    </div>

	    <!-- 购物车列表 清单 -->
	    <transition name="fold">
	    	<div v-show='show && choseFoods.length>0' class="cart-list">
	    		<p class="list-top" v-show="show && choseFoods.length>0">
	    			<span>购物车</span>
	    			<span class="empty" @click="empty()">清空</span>
	    		</p>
	    		<ul class="list-main">
	    			<li v-for="food in choseFoods" class="list-item" v-if="food.count">
	    				<span class="name">{{food.name}}</span>
	    				<div class="fr">
	    					<span　class="red"> ￥{{food.count*food.price}}</span>
	    					<mcart :food='food'  @chooseFood="chooseFood" @hid='hid()'></mcart>
	    				</div>
	    			</li>
	    		</ul>
	    	</div>
	    </transition>
	    <div class="cover" v-show="show && choseFoods.length>0"></div>
	</div>
</template>
<script>
import mcart from './cart.vue'
	export default{
		data(){
			return {
				show:false,
				balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
       			dropBalls: [],
			}
		},
		computed:{
			sum(){
				var total=0;
				this.choseFoods.forEach((food)=>{
					if(food.count){
						total+=food.count;		
					}				
				})
				return total
			},
			totalPrice(){
				var totalPrice=0;
				this.choseFoods.forEach((food)=>{
					if(food.count){
						totalPrice+=food.count*food.price
						}					
					})
				return this.choseFoods.length==0? 0 :totalPrice+this.seller.deliveryPrice
			}
		},
		components:{
			mcart
		},
		methods:{
			 chooseFood(food){
			      if(this.choseFoods.indexOf(food)==-1){
			         this.choseFoods.push(food);
			      }
			      if(food.count==0){
			        let index= this.choseFoods.indexOf(food)
			        this.choseFoods.splice(index,1);
			      }
			    },
			empty(){
				this.show=false;
				this.choseFoods.forEach((food)=>{
					food.count=0
				})
				this.$emit('emptyData')
			},
			showList(){
				this.show=!this.show
			},
			drop(el) {
		        for (let i = 0; i < this.balls.length; i++) {
		          let ball = this.balls[i];
		          if (!ball.show) {
		            ball.show = true;
		            ball.el = el;
		            this.dropBalls.push(ball);
		            return;
		          }
		        }
		      },
		     beforeEnter(el) {
		        let count = this.balls.length;
		        while (count--) {
		          let ball = this.balls[count];
		          if (ball.show) {
		            let rect = ball.el.getBoundingClientRect();
		            let x = rect.left - 32;
		            let y = -(window.innerHeight - rect.top - 22);
		            el.style.display = '';
		            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
		            el.style.transform = `translate3d(0,${y}px,0)`;
		            let inner = el.getElementsByClassName('inner-hook')[0];
		            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
		            inner.style.transform = `translate3d(${x}px,0,0)`;
		          }
		        }
		      },
		      enter(el) {
		//          let rf = el.offestHeight;
		        this.$nextTick(() => {
		          el.style.webkitTransform = 'translate3d(0,0,0)';
		          el.style.transform = 'translate3d(0,0,0)';
		          let inner = el.getElementsByClassName('inner-hook')[0];
		          inner.style.webkitTransform = 'translate3d(0,0,0)';
		          inner.style.transform = 'translate3d(0,0,0)';
		        });
		      },
		      afterEnter(el) {
		        let ball = this.dropBalls.shift();
		        if (ball) {
		          ball.show = false;
		          el.style.display = 'none';
		        }
      		},
      		hid(){
      			this.show=false;
      		}
		},
			props:['seller','choseFoods']
	}
</script>
<style lang="scss" scoped> 
.shopCart{
	position: fixed;
	bottom:0;
	z-index:100;
}
	.shopBar{
		position: fixed;
		height: 46px;
		width:100%;
		background: #141D27;
		line-height: 46px;
		bottom:0;
		z-index: 100;
		.cart-bg{
			display: inline-block;
			width:60px;
			height: 60px;
			border-radius: 50%;
			background: #141D27;
			position:absolute;
			top: -12px;
			left:30px;
			z-index: 50;
			padding-top: 5px;
			.cart-box{
				width:46px;
				height: 46px;
				border-radius:50%;
				background:#2B343C;
				margin:0 auto;
				line-height: 46px;
				text-align: center;
				&.active{
					background:#00A0DC;
				}
				.iconfont{
					font-size: 26px ;
					&.active{
						color:#fff;
					}
				}
				b{
					display: inline-block;
					width:22px;
					height: 22px;
					background:#f23;
					border-radius:50%;
					color:#fff;
					line-height: 20px;
					text-align:center;
					position: absolute;
					top:-5px;
					right:2px;
					box-shadow: 0 4px 8px rgba(0,0,0,0.4);
				}
			}
		}
		.total-price{
			    margin-left: 90px;
			    margin-right: 15px;
			    display: inline-block;
			    height: 28px;
			    padding-right:8px;
			    line-height: 28px;
			    border-right: 1px solid #2B343C;
		}
		.closePay{
			   display: inline-block;
			   background:#2B343C;
			   line-height: 46px; 
			   position: absolute;
			   right: 0;
			   width:90px;
			   text-align: center;
			   &.active{
			   	b{
			   		color: #fff;	
			   	}
			   	background:#00B43C
			   }
		}
	}	
		.cart-list{
			position: fixed;
			bottom: 46px;
			left:0;
			width:100%;
			background:#fff;
			z-index: 10;
			.list-top{
				background:#F3F5F7;
				padding:15px;
				.empty{
					float: right;
					color: #00A0DC;
				}
			}
			.list-main{
				padding:0 15px;
				.list-item{
					line-height: 50px;
					border-bottom:1px solid #dfdfdf;
					.fr{
					 	float: right;
					}
					.cart{
						top:5px;
					}
					.red{
						color:#f01414;
						font-size: 14px;
						margin-right:10px;
					}
				}
				
			}
		
		
	}
	.cover{
			position: fixed;
			top:0;
			left:0;
			bottom:0;
			right: 0;
			background:rgba(0,0,0,0.5);
			z-index: 0;
		}
	.fold-enter-active,.fold-leave-active{
		transition: all 0.5s;
	}
	.fold-enter,.fold-leave-active{
		opacity: 0;
		transform: translateY(120px)
	}
	.ball-container{
      .ball{
        position:fixed;
        left: 48px;
        bottom: 20px;
        z-index:200;
        transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
          width :16px;
          height :16px;
          border-radius:50%;
          background: rgb(0,160,220);
          transition: all 0.6s linear;
     	 }
      }
    }
</style>