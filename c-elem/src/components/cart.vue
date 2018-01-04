<template>
	<div class="cart">
	<transition name="move">
	<span v-show="food.count">
		 <i class="iconfont icon-offline_fill" @click.stop="minus(food)"></i>
		 <span class="count">{{food.count}}</span>
	</span>
	</transition>			 
		 <i class="iconfont  icon-addition_fill" @click.stop="add(food)"></i>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				
			}
		},
		created(){
			
		},
		mounted(){
			if(!this.food.count){
					this.$set(this.food,'count',0)
				}
		},
		props:['food'],
		methods:{
			add(food){
				if(!this.food.count){
					this.$set(this.food,'count',0)
				}
				this.food.count+=1;

				this.$emit('chooseFood',food);
				/*单独食物页触发*/
				this.$emit('trigger')
				this.$emit('increament',event.target);
			},
			minus(food){
				this.food.count<1? 0 : this.food.count--;
				
				this.$emit('chooseFood',food);
				/*单独食物页触发*/
				this.$emit('trigger')
				if(this.food.count==0) this.$emit('hid');
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	.cart{
		 position: relative;
         top:38px;
         line-height: 30px;
         display: inline-block;
		.iconfont{
                font-size: 24px;
                color:#00A0DC; 
              }
        .count{
        	position: relative;
        	top:-5px;
        }
	}
	.move-enter-active,.move-leave-active{
		transition:all 0.5s ease;
	}
	.move-enter,.move-leave-active{
		opacity:0;
		transform:translateX(20px)
		
	}
</style>