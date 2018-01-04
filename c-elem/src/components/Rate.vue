<template>
	<div id="rate">
		<draggable v-model="tags" element="ul"  :move="getdata" @update="datadragEnd" :options="{animation: 500,handle:'.list-complete-item'}">
			<transition-group type="transition"  name="list-complete">
		            <li v-for="(element,index) in tags" :key="index" class="list-complete-item" style="min-height:20px;">
		               <p class="styleclass">{{element}}</p> 
		            </li>      
		    </transition-group>           
		</draggable>
	</div>
</template>
<script type="text/javascript">
import vuedraggable from 'vuedraggable'
	export default{
		data(){
			return{
				tags:['qq1','ww2','rr3','tt4','yy5'],
			}
		},
		components:{
			draggable:vuedraggable
		},
		methods:{
			  getdata (evt) {
		        console.log(evt.draggedContext)
		      },
		      datadragEnd (evt) {
		        console.log('拖动前的索引 :' + evt.oldIndex)
		        console.log('拖动后的索引 :' + evt.newIndex)
		        console.log(this.tags)
		      }
		}
	}
</script>
<style scoped>
.list-complete-item {
 transition: all 3s;
  height:50px;
  line-height: 50px;
  color:#fff;
  text-align: center;
  font-size:24px;
  margin-top:10px;
  cursor:move;
}
.styleclass{
  width:200px;
  float:left;
  background: #fe5;
}
.list-complete-enter, .list-complete-leave-active {
 opacity: 0;
 height: 0px;
 margin-top: 0px;
 padding: 0px;
 border: solid 0px;
}
.list-complete-sortable-chosen,.list-complete-sortable-ghost{
 opacity: 0;
 height: 0px;
 margin-top: 0px;
 padding: 0px;
 border: solid 0px;
}
.dargDiv{
  cursor:move;
  background:#fe4;
}
.wrods{
  margin-top:50px;
}
</style>