<template>
  <div class="" id="app">

    <div class="head ">幼儿园管理系统</div>
    <div class="message"> <div class="left"></div>
      <router-view></router-view>
    </div>

    <div class="footerbox">

      www.zqz.com


    </div>
  </div>

</template>

<script>
  export default {
    name: 'app',
    components: {


    }
  }
</script>

<style>

  #app {

    margin: auto;
    min-width: 1200px;
    width: 100%;
    height: 100%;
    min-height: 800px;
    background-image:url('./assets/bg.jpg');
    background-size: 100%;
    color: azure;
  }
  .head{

    width: 100%;
    height: 50px;
    font-weight: bolder;
    line-height: 50px;
    font-size: 25px;
    text-align: center;
    margin-bottom: 10px;
    background: rgb(47, 52, 68);
  }

  .footerbox{


    width: 100%;
    height: 50px;
    font-weight: bolder;
    line-height: 50px;
    font-size: 10px;
    text-align: center;
    position: absolute;

    background:rgb(47, 52, 68);
  }
  .message{
    min-width: 1200px;
    width: 100%;
    height: 100%;
    min-height: 800px;
  }

</style>

