<?php
/**
 * Plugin Name:       CTA Block
 * Description:       CTA Block with theme color, alignment, and options
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Joe Tower
 * License:           GPL-2.0-or-later
 * License URI:       https://joetower.com
 * Text Domain:       cta-block
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_cta_block_block_init() {
	register_block_type( __DIR__ . '/build/cta-block' );
}
add_action( 'init', 'create_block_cta_block_block_init' );
