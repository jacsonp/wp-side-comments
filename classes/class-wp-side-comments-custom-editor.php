<?php

// PHP 5.3 and later:
namespace Delibera\Includes\SideComments;

class CustomEditor
{
	public function __construct()
	{
		add_action( 'init', array($this, 'buttons') );
	}
	function buttons() {
		add_filter( "mce_external_plugins", array($this, "add_buttons" ) );
		add_filter( 'mce_buttons', array($this, 'register_buttons' ) );
	}
	function add_buttons( $plugin_array ) {
		$plugin_array['delibera'] = plugin_dir_url(__FILE__) . '../includes/js/CustomEditor.js';
		return $plugin_array;
	}
	function register_buttons( $buttons ) {
		array_push( $buttons, 'sidecommentparagraph', 'sidecommentallparagraphs' ); // dropcap', 'recentposts
		return $buttons;
	}
}

new \Delibera\Includes\SideComments\CustomEditor();
