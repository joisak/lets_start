<?php
add_theme_support( 'post-thumbnails' );
add_theme_support( 'custom-logo' );
add_action('acf/init', 'my_acf_init');
add_filter('upload_mimes', 'cc_mime_types');

function my_acf_init() {
	acf_update_setting('google_api_key', 'AIzaSyBjEOCtSLQsEKUk7XnQ3p6G8f5jI8baaRA');
}

function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
