<?php
/**
* Dynamic Block Template.
*	@param   array $attributes - A clean associative array of block attributes.
* @param   array $block - All the block settings and attributes.
* @param   string $content - The block inner HTML (usually empty unless using inner blocks).
*/

$heading = $attributes["heading"];
	$body = $attributes["body"];
	$image_id = $attributes["image_id"];
	$link = $attributes["link"];
	$layout_text_variant = $attributes["layout_text_variant"];
	$layout_image_variant = $attributes["layout_image_variant"];
	$theme_color = $attributes["theme_color"];
	$animation_enabled = $attributes["animation_enabled"] == 1 ? "true" : "false";
?>

<div <?php echo get_block_wrapper_attributes(["component-animation" => $animation_enabled, "component-is-animating" => 'false', "component-layout-text" => $layout_text_variant, "component-layout-image" => $layout_image_variant, "component-theme" => $theme_color]); ?>>
	<?php if (isset($attributes["image_id"])): ?>
		<div class="cta__image-container">
			<?php echo wp_get_attachment_image( $image_id, "large" ); ?>
		</div>
	<?php endif; ?>

	<?php if (isset($attributes["heading"]) || isset($attributes["body"]) || isset($attributes["link"])): ?>
		<div class="cta__text-container">
			<h2 class="cta__heading">
				<?php echo $heading ?>
			</h2>
			<p>
				<?php echo $body ?>
			</p>
			<a target="<?php echo $link["opensInNewTab"] ? '_blank' : '_self' ?>" href="<?php echo $link["url"] ?>" class="cta__button">
				<?php echo $link["title"] ?>
			</a>
		</div>
	<?php endif; ?>
</div>
