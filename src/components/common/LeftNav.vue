<template>
	<div class="left_nav">
		<ul>
			<li>
				<router-link to="/">
					<i class="icon iconfont icon-goumai"></i>
					<div>收银</div>
				</router-link> 
			</li>
			<li>
				<router-link to="/store">
					<i class="icon iconfont icon-jinrudianpu"></i>
					<div>店铺</div>
				</router-link> 
			</li>
			<li>
				<router-link to="/goods">
					<i class="icon iconfont icon-hanbao"></i>
					<div>商品</div>
				</router-link>
			</li>
			<li>
				<router-link to="/member">
					<i class="icon iconfont icon-huiyuanqia"></i>
					<div>会员</div>
				</router-link>
			</li>
			<li>
				<router-link to="/count">
					<i class="icon iconfont icon-zuanshi"></i>
					<div>统计</div>
				</router-link>
			</li>
			<li>
				<router-link to="/set">
					<i class="icon iconfont icon-gongnengjianyi"></i>
					<div>设置</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name:'leftNav'
}
</script>
<style>
	.left_nav{
		color: #fff;
		font-size: 10px;
		height: 100%;
		background-color: #1D8ce0;
        float:left;
        width:5%;
	}
	.iconfont{
       font-size:24px;
    }
    .left_nav ul{
        padding:0px;
        margin: 0px;
    }
    .left_nav li{
        list-style: none;
        text-align: center;
        border-bottom:1px solid #20a0ff;
        padding:10px;
    }
    .left_nav a{
    	color: #fff;
    	display: block;
    	text-decoration: none;
    }
</style>