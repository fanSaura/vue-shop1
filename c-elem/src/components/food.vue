<template>
	<div class="food" v-show="showFood" ref="foodw">
	<div>
		<div class="page-top">
			<i class="iconfont icon-arrow-ll" @click="hidFood()"></i>
			<img src="static/images/caipin2.jpg"/>
			<div class="top-detail">
				<p class="name">{{selectFood.name}}</p>
				<div class="fl">
					<p class="compare">月售{{selectFood.sellCount}}份 好评率{{selectFood.rating}}%</p>
					<p class="price">￥{{selectFood.price}}</p>
				</div>
				<span class="addCart fr" v-if="!selectFood.count" @click="addCart()">加入购物车</span>
				<mcart :food="selectFood" @trigger="trigger()"  ref="cartw" v-show="selectFood.count"></mcart>
			</div>
		</div>
		<div class="intro">
			<p>{{selectFood.info}}</p>
		</div>
		<div class="rating">
			<p class="tit">商品评价</p>
			<div class="showRating">
				<div class="type all">全部{{allNum}}</div>
				<div class="type zan">推荐{{goodNum}}</div>
				<div class="type">吐槽{{allNum-goodNum}}</div>
			</div>
			<p class="showText" @click="showText()">
				<i class="iconfont icon-duihao high" ref="icon"></i>
				<span>只显示有内容</span>
			</p>
			<ul class="content-main">
				<li v-for="rating in Ratings" class="main-item">
					<p class="author_info">
						<span class="fl">{{rating.rateTime}}</span>
						<span class="fr">{{rating.username}}</span>
						<img class="fr" src="../../static/images/default_header.png"/>
					</p>
					<p class="text">
						<i class="iconfont icon-icorategood high" v-show="rating.rateType==0"></i>
						<i  class="iconfont icon-buzan" v-show="rating.rateType==1"></i>
						<span>{{rating.text}}</span>
					</p>
				</li>
			</ul>
		</div>
	</div>
	</div>	
</template>
<script type="text/javascript">
import mcart from './cart.vue'
import Bscroll from 'better-scroll'
	export default{
		data(){
			return {
				Ratings:[],
				Class:'',
				Name:'',
				scrollYY:0
			}
		},
		computed:{	
			goodNum(){
				var total=0;
				if(this.selectFood.name){
					this.selectFood.ratings.forEach((food)=>{
						if(food.rateType==1){
							total++
						}
					})
				}
				return total
			},
			allNum(){
				this.Name=this.selectFood.name
				if(this.selectFood.name){
					return this.selectFood.ratings.length
				}
				
			}
		},
		watch:{
			showFood:'scroll',
			Class:'foodRate',
			Name:'foodRate'
		},
		mounted(){
			console.log(33)
			this.foodRate()
		},
		props:{
			selectFood:Object,
			showFood:Boolean
		},
		components:{
			mcart
		},
		methods:{
			foodRate(){
				this.Ratings=[]
				if($(this.$refs.icon).hasClass('high') && this.Name){
					this.selectFood.ratings.forEach((rating)=>{
						if(rating.text){
							this.Ratings.push(rating)	
						}
					})
					
				}else{
					
					this.Ratings=this.selectFood.ratings
				}
			},
			scroll(){
				this.$nextTick(()=>{
					this.scroll2=new Bscroll(this.$refs.foodw,{
						click:true,
					})
					console.log(this.scroll2)
					this.scroll2.on('scroll',(pos)=>{
						this.scrollYY=Math.abs(Math.round(pos.y))
						console.log(this.scrollYY)
					})
					
				})				
			},
			hidFood(){
				this.$emit('hidden')
			},
			addCart(){
				this.$refs.cartw.add(this.selectFood);
				// this.$refs.cartw.minus(this.selectFood);
			},
			trigger(){
				this.$emit('chooseFood',this.selectFood)
			},
			showText(){

				if($(this.$refs.icon).hasClass('high')){
					$(this.$refs.icon).removeClass('high');
					this.Class=$(this.$refs.icon).attr('class');
					this.scroll()
				}else{
					$(this.$refs.icon).addClass('high');
					this.Class=$(this.$refs.icon).attr('class');

				}

			}
		}
	}
</script>
<style lang="scss" scoped>
	.food{
		position:fixed;
		bottom:46px;
		top:0;
		left:0;
		right: 0;
		z-index: 20;
		overflow: hidden;
		background:#fff;
		.fl{
			float: left;
		}
		.fr{
			float: right
		}
		.page-top{
			img{
				width:100%;
				vertical-align: bottom;
			}
			.iconfont{
				position:absolute;
				top:30px;
				left:20px;
				color: #fff;
			}
			.top-detail{
				background: #fff;
				padding:15px;
				overflow:hidden;
				.name{
					line-height: 30px;
					color:#333;
					font-weight: 600;
					font-size: 14px;
					margin-bottom: 10px;
				}
				.price{
					    font-size: 14px;
    					color: #f01414;
				}
				
			}
			.addCart{
				padding:3px 10px;
				background:#00a0dc;
				border-radius:12px;
				color:#fff;
				line-height: 18px;
			}
			.cart{
					float: right;
					position:relative;
					top:0px;
				}

		}
		.intro{
			background:#F3F5F7;
			padding:20px 0;
			p{
				padding:15px;
				background:#fff;
				line-height: 20px;
				text-indent:15px;
			}
		}
		.rating{
			background:#fff;
			.tit{
				padding:15px;
				padding-bottom:5px;
				font-size: 14px;
			}
			.showRating{
				padding:15px;
				.type{
					display: inline-block;
					padding:8px 15px;
					background:rgba(77, 85, 93, 0.2);
					margin-left: 6px;
				}
				.all{
						background:#00a0dc;
						color:#fff;
					}
				.zan{
						background:rgba(0, 160, 220, 0.2);
					}
			}
			.showText{
				border-bottom:1px solid #ddd;
				border-top:1px solid #ddd;
				padding:15px;
				line-height: 15px;
				span{
					font-size: 14px;
				}
				.iconfont{
					font-size:20px;
					margin-right:5px;
					&.high{
						color:#00C850
					}
				}
			},
			.content-main{
				padding-bottom:20px;
				.main-item{
					border-bottom:1px solid #dfdfdf;
						padding:10px;
					.author_info{
					overflow:hidden;
					img{
						width:15px;
						height: 15px;
						border-radius:50%;
						}
					}
					.text{
						line-height: 32px;
						.high{
							color:#00A0DC;
						}
					}
				}
				
			}
		}
	}
</style>