<?php /* Template Name: Main */ ?>
<?php get_header(); ?>

<?php

  setup_postdata( $post );
  $attachment_id = get_post_thumbnail_id( $post->ID );

  $components = ['header_menu','hero','menu','gallery','events','about','contact'];

  foreach ($components as $component) {
     get_template_part( 'components/' . $component);
  }

?>
<?php get_footer(); ?>
