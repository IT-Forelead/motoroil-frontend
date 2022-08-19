<template>
	<div class="main-container container">
		<ul class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i></a></li>
			<li><a href="#">Blogs</a></li>
			<li><a href="#">Kire tuma demonstraverunt lector</a></li>
		</ul>
		
		<div class="row">
            <Sidebar />
            
			<div id="content" class="col-md-9 col-sm-8">
				<div class="article-info">
					<div class="blog-header">
						<h3>Kire tuma demonstraverunt lector</h3>
					</div>
					<div class="article-sub-title">
						<span class="article-author">Post by: <a href="#"> Admin</a></span>
						<span class="article-date">Created Date: Tue, Feb 16, 2016</span>
						<span class="article-comment">0  Comments</span>
					</div>
					<div class="form-group">
						<a href="#" class="image-popup">
                            <img src="/src/assets/image/catalog/blog/1.jpg" alt="#">
                        </a>
					</div>
					
					<div class="article-description">
						<p>Morbi tempus, non ullamcorper euismod, erat odio suscipit purus, nec ornare lacus turpis ac purus. Mauris cursus in mi vel dignissim. Morbi mollis elit ipsum, a feugiat lectus gravida non. Aenean molestie justo sed aliquam euismod. Maecenas laoreet bibendum laoreet. Morbi tempor massa sit amet purus lobortis, non porta tellus dignissim. </p>
						<p>Proin dictum justo a nisl pellentesque egestas.Nulla commodo euismod nisi ac bibendum. Mauris in pellentesque tellus, in cursus magna. Sed volutpat dui bibendum mi molestie, at volutpat nunc dictum. Fusce sagittis massa id eros scelerisque, eget accumsan magna lacinia. Nullam posuere neque at neque dictum interdum</p>
						<p> Mauris cursus in mi vel dignissim. Morbi mollis elit ipsum, a feugiat lectus gravida non. Aenean molestie justo sed aliquam euismod. Maecenas laoreet bibendum laoreet. Morbi tempor massa sit amet purus lobortis, non porta tellus dignissim. Proin dictum justo a nisl pellentesque egestas.Nulla commodo euismod nisi ac bibendum. Mauris in pellentesque tellus, in cursus magna. Sed volutpat dui bibendum mi molestie, at volutpat nunc dictum. Fusce sagittis massa id eros scelerisque, eget accumsan magna lacinia. Nullam posuere neque at neque dictum interdum</p>
					</div>
					
					<div class="panel panel-default related-comment">
						<div class="panel-body">
							<div class="form-group">
								<div id="comments" class="blog-comment-info">
									
									<h3 id="review-title">Leave your comment  </h3>
									<input type="hidden" name="blog_article_reply_id" value="0" id="blog-reply-id">
									<div class="comment-left contacts-form row">
										<div class="col-md-6">
											<b>Your Name:</b>
											<br>
											<input type="text" name="name" value="" class="form-control">
											<br>
										</div>
										<div class="col-md-12">
											<b>Your Comment:</b>
											<br>
											<textarea rows="6" cols="50" name="text" class="form-control"></textarea>
											<span style="font-size: 11px;">Note: HTML is not translated!</span>
											<br>
										</div>
									</div>
									<br>
									<div class="text-left"><a id="button-comment"
										class="btn buttonGray"><span>Submit</span></a>
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
import Sidebar from '../../layout/Sidebar/Sidebar.vue';
</script>

<style scoped>
</style>