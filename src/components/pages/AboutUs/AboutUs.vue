<template>
	<div class="main-container container" style="margin-bottom: 3rem;">
		<ul class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i></a></li>
			<li><a href="#">{{$t('aboutUs')}}</a></li>
		</ul>
		
		<div class="row">			
      <div id="content" class="col-sm-12 item-article">
        <div class="row box-1-about">
          <div class="col-md-9 welcome-about-us">
            <div class="title-about-us">
              <h2>{{$t('welcomeToShop')}}</h2>
            </div>
            <div class="content-about-us">
              <div class="image-about-us">
                <img src="/src/assets/image/catalog/about/about-us.jpg" alt="Image Client">
              </div>
              <div class="des-about-us">
                Nulla auctor mauris ut dui luctus semper. In hac habitasse platea dictumst. Duis pellentesque ligula a risus suscipit dignissim. Nunc non nisl lacus. Integer pharetra lacinia dapibus. Donec eu dolor dui, vel posuere mauris.
                <br>
                <br>Pellentesque semper congue sodales. In consequat, metus eget con sequat ornare, augue dolor blandit purus, vitae lacinia nisi tellus in erat. Nulla ac justo eget massa aliquet sodales. Maecenas mattis male suada sem, in fringilla massa dapibus quis. Suspendisse aliquam leo id neque auctor molestie. Etiam at nulla tellus.
                <br>
                <br>Nulla auctor mauris ut dui luctus semper. In hac habitasse platea dictumst. Duis pellentesque ligula a risus suscipit dignissim.
              </div>
            </div>
          </div>
          <div class="col-md-3 why-choose-us">
            <div class="title-about-us">
              <h2>{{$t('whyChooseUs')}}</h2>
            </div>
            <div class="content-why">
              <ul class="why-list">
                <li><a title="Shipping &amp; Returns" href="#">{{$t('shippingAndReturns')}}</a></li>
                <li><a title="Secure Shopping" href="#">{{$t('secureShopping')}}</a></li>
                <li><a title="International Shipping" href="#">{{$t('internationalShipping')}}</a></li>
                <li><a title="Affiliates" href="#">{{$t('affiliates')}}</a></li>
                <li><a title="Group Sales" href="#">{{$t('groupSales')}}</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md-12 our-member">
            <div class="title-about-us">
              <h2>{{$t('ourMember')}}</h2>
            </div>
            <div class="short-des">
              Consectetur adipiscing elit. Donec pellentesque venenatis elit, quis aliquet mauris malesuada vel. Donec vitae libero dolor, eget dapibus justo.
              <br>Aenean facilisis aliquet feugiat. Suspendisse lacinia congue est ac semper. Nulla ut elit magna, vitae volutpat magna.
            </div>
            <div class="overflow-owl-slider1">
              <div class="wrapper-owl-slider1">
                <div class="row slider-ourmember">
                  <MemberItem />
                  <MemberItem />
                  <MemberItem />
                  <MemberItem />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 happy-about-us">
            <div id="slider-happy-about-us" class="happy-ab">
              <div class="title-happy-about">
                <h2>{{$t('happyCustomerSays')}}</h2>
              </div>
              <div class="yt-content-slider sm_imageslider slider-happy-client" data-rtl="yes" data-autoplay="no" data-autoheight="no" data-delay="4" data-speed="0.6" data-margin="0" data-items_column00="1" data-items_column0="1" data-items_column1="1" data-items_column2="1"  data-items_column3="1" data-items_column4="1" data-arrows="yes" data-pagination="no" data-lazyload="yes" data-loop="no" data-hoverpause="yes">
                <div class="item">
                  <div class="ct-why">
                    <div class="client-say">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue, justo non cursus adipiscing, dui nibh scelerisque justo, quis pretium turpis neque eget nulla. Curabitur dictum consectetur metus nec dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue, justo non cursus adipiscing, dui nibh scelerisque justo non cursus adipiscing, dui nibh scelerisque justo, quis pretium turpis.</div>
                    <p class="client-info-about"><span class="name">- Mama Duo - </span>Social Media Strategist</p>
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

<script setup>
import MemberItem from './parts/MemberItem.vue';

</script>

<style scoped>
</style>