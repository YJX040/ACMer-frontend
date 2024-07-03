<template>
  <!-- 头部导航 -->
  <div class="header w">
    <!-- logo部分 -->
    <div class="logo">buctoj</div>

    <!-- 导航 -->
    <div class="nav">
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">用户列表</a></li>
        <li><a href="#">codeforces</a></li>
        <li><a href="#">智能推荐</a></li>

      </ul>
    </div>

    <!-- 登录部分 -->
    <div class="user">
      <ul>
        <li><a href="#">登录</a></li>
        <li><a href="#">注册</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
}

.w{
  width: 1400px;
  margin:auto;
}

body {
    background-color:#ffffff;
}
li {
    list-style: none;
}
a {
    text-decoration: none;
}

/* 头部导航 */
.header {
  display: flex;
  height: 60px;
  /* background-color: pink; */
  /* 注意此地方会层叠 w 里面的margin */
  margin: 0 auto;
  border-bottom: 1px solid #dcdfe6;
}

.logo {

  width: 198px;
  height: 60px;
  /* background-color:yellow; */
  text-align: center;
  line-height: 60px;
}

.header .nav {
  flex:1;
  margin-left: 60px;
}

.header .nav ul li {

  margin:0 30px;
}
.header .nav a {
  display: block;
  height: 60px;
  padding: 0 10px;
  line-height: 60px;
  font-size: 18px;
  color: #050505;
}
.header .nav a:hover {
  border-bottom: 2px solid #409eff;
  background-color: #ecf5ff;
  color:#409eff;
}
/* 登录注册 */
.user ul li{

  line-height: 60px;
  margin-right: 10px;
  font-size: 14px;
  color: #666;
}

.user a{
  display: block;
  height: 60px;
  padding: 0 10px;
  line-height: 60px;
  font-size: 18px;
  color: #050505;
}
</style>