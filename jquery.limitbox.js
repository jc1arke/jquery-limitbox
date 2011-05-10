/**
 * Simple Text Limiting
 *
 * I recently had to write a little widget for the front-end wherein the user has to be able to type,copy&paste,etc etc some text
 * into a text area, but he/she need to be limited on the amount of characters that they can use. Yes, there are plenty of pre-existing
 * plugins etc that I could use, but I like demonstrating how one would go about doing something similar using just a bit of logic and jQuery :)
 *
 * @author JA Clarke
 * @since 2010/11/15
 * @version 1.0
 * 
 * For a demo of this plugin, goto http://cs.jc-interactive.co.za/jquery.limitbox/
 */

(function($,undefined){
	$.fn.limitBox = function(options){
		// Default settings (non-public)
		var settings = {
			limit: 							160,
			container: 					"limitBox-container",
			containerClass: 		"limitBox-container",
			limitCounter: 			"limit-box-count",
			limitCounterClass: 	"limit-box-count",
			createCss: 					true,
			errorClass: 				"box-error",
			warningClass: 			"box-warning",
			boxClass: 					"limit-box" 
		};
		
		// Iterate over the different boxes that it applies to
		return this.each(function(){
			var element = $(this);
			// Merge the options passed with the default settings
			if( options ) {
				$.extend( settings, options );
			}
			
			// Should the plugin create the CSS?
			if( settings.createCss ) {
				var limitCss = $("<style />").appendTo("head");
				limitCss.append("." + settings.boxClass + " { color: #626262; border:1px solid #0073ea; padding:7px; }");
				limitCss.append("." + settings.errorClass + " { background-color: #ffc7c7; color:#c81216; border:1px solid #c81216; padding:7px; }");
				limitCss.append("." + settings.warningClass + " { background-color: #ffffff; color: #626262; border:1px solid orange; padding:7px;  } ");
				limitCss.append("." + settings.limitCounterClass + " { text-align: right; width: 405px; }");
			}
			
			// Wrap the textarea/input and add the counter box
			element.addClass( settings.boxClass );
			element.wrap( $("<div />", { id: settings.container }).addClass( settings.containerClass ) );
			$("<div />", { html: settings.limit + " remaining", id: settings.limitCounter }).addClass( settings.limitCounterClass ).appendTo( "#" + settings.container );
			
			// Bind the key-events/special-events
			element.bind({
				keypress: function(e){ doLimit( e.target.value, settings, element ); },
				keyup: 		function(e){ doLimit( e.target.value, settings, element ); },
				paste: 		function(e){ doLimit( e.target.value, settings, element ); },
				copy: 		function(e){ doLimit( e.target.value, settings, element ); },
				cut: 			function(e){ doLimit( e.target.value, settings, element ); }
			});
			
			// Just a simple initialize of the counter :)
			doLimit( "", settings, element );
		});
	};
	
	function doLimit( text, settings, element ){
		var textLength	= text.length;
		if( textLength >= settings.limit ) {
			$( "#" + settings.limitCounter ).html( "<strong style='color:red;'>0</strong> characters left" );
			element.val( text.substr( 0, settings.limit ) ).removeClass( settings.warningClass ).addClass( settings.errorClass );
			return false;
		} else if( textLength > ( settings.limit / 2 ) ) {
			$( "#" + settings.limitCounter ).html( "<strong style='color:orange;'>" + ( settings.limit - textLength ) + "</strong> characters left" );
			element.addClass( settings.warningClass );
		} else {
			$( "#" + settings.limitCounter ).html( '<strong style="color:green;">' + ( settings.limit - textLength ) + '</strong> characters left' );
			element.removeClass( settings.warningClass ).removeClass( settings.errorClass );
			return true;
		}
	};
})(jQuery);