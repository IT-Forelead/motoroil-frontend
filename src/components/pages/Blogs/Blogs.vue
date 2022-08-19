<template>
	<div class="main-container container">
		<ul class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i></a></li>
			<li><a href="#">Blog</a></li>
		</ul>
		
		<div class="row">
			<Sidebar />
            
			<div id="content" class="col-md-9 col-sm-8">
				<div class="blog-header"><h3>Our Blog</h3></div>

				<div class="blog-category clearfix">
                    <div class="blog-listitem row">
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                    </div>
                    <div class="product-filter product-filter-bottom filters-panel clearfix">
                        <div class="row">
                            <div class="col-md-12">
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
    
</template>

<script setup>
import BlogItem from './parts/BlogItem.vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue';

</script>

<style scoped>
</style>