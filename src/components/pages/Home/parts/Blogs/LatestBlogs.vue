<script setup>

</script>
<template>
  <div class="module so-latest-blog blog-home">
    <div class="pre_text">Our recent posts</div>
    <h3 class="modtitle"><span>Latest blogs</span></h3>
    <div class="clearfix modcontent">
      <div class="so-blog-external buttom-type1 button-type1">
        <div class="blog-external yt-content-slider row">
          <div class="col-md-4" v-for="i in 3" :key="i">
            <div class="media">
              <div class="item head-button">
                <div class="media-left so-block">
                  <a class="imag" href="#"><img src="/src/assets/image/catalog/blog/1.jpg" alt="image" /></a>
                </div>
                <div class="media-body">
                  <div class="media-content so-block">
                    <div class="infos"><span class="media-date-added"> March 6th, 2019</span>By <span
                        class="media-author">Wash upito</span></div>
                    <h4 class="media-heading font-title head-item">
                      <a href="#" title="Biten demons lector in henderit in vulp no sea takimata sanctus est"
                        target="_self">Biten demons lector in henderit in ..</a>
                    </h4>
                    <div class="readmore font-title">
                      <a href="#" target="_self"><span>Read more</span> </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>