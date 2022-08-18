<script setup>

</script>
<template>
  <div class="header-top hidden-compact">
    <div class="container">
      <div class="row">
        <div class="header-top-left col-lg-3 col-md-4 col-sm-5 hidden-xs">
          <div class="telephone ">
            <ul class="socials">
              <li class="facebook"><a href="https://www.facebook.com/smartaddons.page" target="_blank"><i
                    class="fa fa-facebook"></i></a></li>
              <li class="twitter"><a href="https://twitter.com/smartaddons" target="_blank"><i
                    class="fa fa-twitter"></i></a></li>
              <li class="google_plus"><a href="https://plus.google.com/u/0/+Smartaddons/posts" target="_blank"><i
                    class="fa fa-google-plus"></i></a></li>
              <li class="pinterest"><a href="https://www.pinterest.com/smartaddons/" target="_blank"><i
                    class="fa fa-pinterest-p"></i></a></li>
              <li class="instagram"><a href="#" target="_blank"><i class="fa fa-instagram"></i></a></li>
              <li class="linkedin"><a href="#" target="_blank"><i class="fa fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
        <div class="header-top-right col-lg-9 col-md-8 col-sm-7 col-xs-12">
          <ul class="top-link list-inline lang-curr">
            <li class="currency">
              <div class="btn-group currencies-block">
                <form action="index.html" method="post" enctype="multipart/form-data" id="currency">
                  <a class="btn btn-link dropdown-toggle" data-toggle="dropdown">
                    <span class="icon icon-credit "></span> $ US Dollar <span class="fa fa-angle-down"></span>
                  </a>
                  <ul class="dropdown-menu btn-xs">
                    <li> <a href="#">(€)&nbsp;Euro</a></li>
                    <li> <a href="#">(£)&nbsp;Pounds </a></li>
                    <li> <a href="#">($)&nbsp;US Dollar </a></li>
                  </ul>
                </form>
              </div>
            </li>
            <li class="language">
              <div class="btn-group languages-block ">
                <form action="index.html" method="post" enctype="multipart/form-data" id="bt-language">
                  <a class="btn btn-link dropdown-toggle" data-toggle="dropdown">
                    <img src="/src/assets/image/catalog/flags/gb.png" alt="English" title="English">
                    <span class="eng">English</span>
                    <span class="fa fa-angle-down"></span>
                  </a>
                  <ul class="dropdown-menu">
                    <li><a href="index.html"><img class="image_flag" src="/src/assets/image/catalog/flags/gb.png" alt="English"
                          title="English" /> English </a></li>
                    <li> <a href="html_with_RTL/index.html"> <img class="image_flag" src="/src/assets/image/catalog/flags/ar.png"
                          alt="Arabic" title="Arabic" /> Arabic </a> </li>
                  </ul>
                </form>
              </div>
            </li>
          </ul>
          <ul class="top-log list-inline">
            <li><i class="fa fa-lock"></i><a href="login.html">Login</a> / </li>
            <li><a href="register.html">Register</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>