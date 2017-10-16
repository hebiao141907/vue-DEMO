<template>
  <div class="pos">
  	<div>
  		<el-row>
  		<!-- 订单展示 -->
		  <el-col :span="7" class="pos_order" id="order">
		  	 <el-tabs v-model="activeName">
			    <el-tab-pane label="点餐" name="first">
			    	<el-table  :data="tableData" border style="width: 100%">
				      <el-table-column prop="goodsName" label="商品名称">
				      </el-table-column>
				      <el-table-column prop="count" label="数量" width="70">
				      </el-table-column>
				      <el-table-column prop="price" label="金额" width="70">
				      </el-table-column>
				      <el-table-column label="操作" width="100" fixed="right">
				       	<template scope="scope">
				            <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
				            <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
				        </template>
				      </el-table-column>
				    </el-table>
          <div class="total">
            <span>数量：<strong>{{totalCount}}</strong></span>
            <span>金额：<strong>{{totalPrice}}</strong>元</span>
          </div> 
          <div class="btn">
            <el-button type="warning" @click="orderWait">挂单</el-button>
            <el-button type="danger" @click="delAllGoods">删除</el-button>
            <el-button type="success" @click="checkOut">结账</el-button>
          </div>
			    </el-tab-pane>
			    <el-tab-pane label="挂单" name="second">
			    	<div v-show="order">
              <el-table :data="tableData1" border style="width: 100%">
                <el-table-column prop="goodsName" label="商品名称">
                </el-table-column>
                <el-table-column prop="count" label="数量" width="70">
                </el-table-column>
                <el-table-column prop="price" label="金额" width="70">
                </el-table-column>
              </el-table>
              <div class="btn">
                <el-button type="danger" @click="delAllGoods1">删除</el-button>
                <el-button type="success" @click="checkOut1">结账</el-button>
              </div>
            </div>
            <div v-show="!order">
              暂无挂单
            </div>
			    </el-tab-pane>
			    <el-tab-pane label="外卖" name="third">
			    	暂无外卖
			    </el-tab-pane>
			  </el-tabs>
		  </el-col>
		  <!-- 商品展示 -->
		  <el-col :span="17">
		  	<div class="often_goods">
		  		<div class="title">常用商品</div>
		  		<div class="goods_list">
		  			<ul>
		  				<li v-for="goods in oftenGoods" @click="addOrderList(goods)">
		  					<span>{{goods.goodsName}}</span>
		  					<span class="o_price">￥{{goods.price}}元</span>
		  				</li>
		  			</ul>
		  		</div>
		  	</div>
		  	<div class="goods_type">
		  		 <el-tabs v-model="activeName2">
				    <el-tab-pane label="汉堡" name="first">
						<ul class='cookList'>
						    <li v-for="goods in type0Goods" @click="addOrderList(goods)">
						        <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
						        <span class="foodName">
						        	{{goods.goodsName}}
						        </span>
						        <span class="foodPrice">
						        	￥{{goods.price}}元
						        </span>
						    </li>
						</ul>
				    </el-tab-pane>
				    <el-tab-pane label="小吃" name="second">
				    	<ul class='cookList'>
                <li v-for="goods in type1Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">
                      {{goods.goodsName}}
                    </span>
                    <span class="foodPrice">
                      ￥{{goods.price}}元
                    </span>
                </li>
            </ul>
				    </el-tab-pane>
				    <el-tab-pane label="饮料" name="third">
				    	<ul class='cookList'>
                <li v-for="goods in type2Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">
                      {{goods.goodsName}}
                    </span>
                    <span class="foodPrice">
                      ￥{{goods.price}}元
                    </span>
                </li>
            </ul>
				    </el-tab-pane>
				    <el-tab-pane label="套餐" name="fourth">
				    	<ul class='cookList'>
                <li v-for="goods in type3Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">
                      {{goods.goodsName}}
                    </span>
                    <span class="foodPrice">
                      ￥{{goods.price}}元
                    </span>
                </li>
            </ul>
				    </el-tab-pane>
				  </el-tabs>
		  	</div>
		  </el-col>
		</el-row>
  	</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'pos',
  data() {
  	return {
  		activeName:'first',
  		activeName2:'first',
  		tableData:[],
      tableData1:[],
      totalCount:0,
      totalPrice:0,
      oftenGoods:[],
      type0Goods:[],
      type1Goods:[],
      type2Goods:[],
      type3Goods:[]
  	}
  },
  methods:{
    //添加订单列表的方法
    addOrderList(goods){
      let isHave = false //判断订单是否存在
      for(let i=0;i<this.tableData.length;i++){
        if(this.tableData[i].goodsId==goods.goodsId){
          isHave = true
        }
      }
      if(isHave){
        let arr = this.tableData.filter((a)=>{
          return a.goodsId == goods.goodsId
        })
        arr[0].count++
      }else{
        let newGoods = {goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1}
        this.tableData.push(newGoods)
      }

      //数量，金额汇总
      this.totalCount = 0
      this.totalPrice = 0
      this.tableData.forEach((val)=>{
        this.totalCount += val.count;
        this.totalPrice += val.price*val.count;
      })
    },
    delSingleGoods(goods){
      this.tableData = this.tableData.filter((a)=>{
        return a.goodsId!=goods.goodsId
      })
      //数量，金额汇总
      this.totalCount = 0
      this.totalPrice = 0
      this.tableData.forEach((val)=>{
        this.totalCount += val.count;
        this.totalPrice += val.price*val.count;
      })
    },
    delAllGoods(){
      this.totalCount = 0
      this.totalPrice = 0
      this.tableData = []
    },
    checkOut(){
      if(this.totalCount!=0){
        this.totalCount = 0
        this.totalPrice = 0
        this.tableData = []
        this.$message({
          type:'success',
          message:'结账成功，感谢你又为店里出了一份力!'
        })
      }else{
          this.$message.error('不能空结。老板了解你急切的心情！')
      }
    },
    orderWait(){
      if(this.totalCount!=0){
        this.tableData1 = this.tableData
        this.totalCount = 0
        this.totalPrice = 0
        this.tableData = []
        this.activeName = 'second'
        this.$message({
          type:'success',
          message:'挂单成功，请你继续收银!'
        })
      }else{
          this.$message.error('没有订单，不能挂单！')
      }
    },
    delAllGoods1(){
      this.tableData1 = []
    },
    checkOut1(){
      this.tableData1 = []
      this.activeName = 'first'
      this.$message({
        type:'success',
        message:'结账成功，感谢你又为店里出了一份力!'
      })
    }
  },
  computed:{
    order:function (){
      if(this.tableData1.length>0){
        return true
      }else{
        return false
      }
    }
  },
  mounted:function () {
  	var orderHeight = document.body.clientHeight;
  	document.getElementById('order').style.height = orderHeight + 'px';
  	window.onresize = function (){
  		let orderHeight = document.body.clientHeight;
  		document.getElementById('order').style.height = orderHeight + 'px';
  	}
  },
  created:function () {
     //读取常用商品列表
    axios.get('http://jspang.com/DemoApi/oftenGoods.php')
    .then(response=>{
      this.oftenGoods = response.data
    })
    .catch(error=>{
      alert('网络错误，无法访问')
    })
     //读取分类商品列表
     axios.get('http://jspang.com/DemoApi/typeGoods.php')
    .then(response=>{
      //console.log(response)
      this.type0Goods = response.data[0]
      this.type1Goods = response.data[1]
      this.type2Goods = response.data[2]
      this.type3Goods = response.data[3]
    })
    .catch(error=>{
      alert('网络错误，无法访问')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pos_order{
  	background-color: #f9fafc;
  	height: 100%;
  	border-right: 1px solid #c0ccda;
  }
  .btn{
    margin-top: 20px;
  }
  .total{
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid #D3DCE6;
  }
  .total span:nth-child(1){
    margin-right: 30px;
  }
  .title{
       height: 20px;
       border-bottom:1px solid #D3DCE6;
       background-color: #F9FAFC;
       padding:10px;
   }
   .goods_list ul li{
      list-style: none;
      float:left;
      border:1px solid #E5E9F2;
      padding:10px;
      margin:5px;
      background-color:#fff;
      cursor: pointer;
   }
  .o_price{
      color:#58B7FF; 
   }
   .goods_type{
   	clear: both;
   }
   .cookList li{
       list-style: none;
       width:23%;
       border:1px solid #E5E9F2;
       height: auto;
       overflow: hidden;
       background-color:#fff;
       padding: 2px;
       float:left;
       margin: 2px;
       cursor: pointer;
   }
   .cookList li span{
        display: block;
        float:left;
   }
   .foodImg{
       width: 40%;
   }
   .foodName{
       font-size: 18px;
       padding-left: 10px;
       color:brown;
       width: calc(60% - 10px);
       text-align: left;
   }
   .foodPrice{
       font-size: 16px;
       padding-left: 10px;
       padding-top:10px;
   }
</style>