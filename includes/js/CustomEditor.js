(function() {
    tinymce.create('tinymce.plugins.delibera', {
        /**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
        init : function(ed, url) {
        	ed.addButton('sidecommentparagraph', {
                title : 'Parágrafo Comentável',
                cmd : 'sidecommentparagraph',
                image : url + '/../images/paragraph-left.png',
                onPostRender: function() {
                    var _this = this;   // reference to the button itself
                    ed.on('NodeChange', function(e) {
                        //activate the button if this parent has this class
                        //var is_active = jQuery( ed.selection.getNode() ).hasClass('commentable-section');
                    	var blocks = ed.selection.getSelectedBlocks();
                    	var is_active = true;
                    	var has_p = false;
                    	tinyMCE.each( blocks ,function(block){
                    		if( block.nodeName === 'P')
                    		{
                    			is_active = is_active && jQuery( block ).hasClass('commentable-section');
                    			has_p = true;
                    		}
                    	});
                    	if(! has_p) is_active = false;
                        _this.active( is_active );
                    })
                }
            });
 
            ed.addButton('sidecommentallparagraphs', {
                title : 'Todos Parágrafos Comentáveis',
                cmd : 'sidecommentallparagraphs',
                image : url + '/../images/paragraph-full.png',
                onPostRender: function() {
                    var _this = this;   // reference to the button itself
                    ed.on('NodeChange', function(e) {
                    	var is_active = ! jQuery(tinyMCE.activeEditor.dom.select('p')).not(".commentable-section").length > 0;
                        _this.active( is_active );
                    })
                }
            });
            
            ed.addCommand('sidecommentparagraph', function() {
            	var blocks = ed.selection.getSelectedBlocks();
            	tinyMCE.each( blocks ,function(block){
        			if(block.nodeName == 'P' || block.nodeName == 'p')
                	{
                		if(tinyMCE.activeEditor.dom.hasClass(block, 'commentable-section'))
                		{
                			tinyMCE.activeEditor.dom.setAttrib(block, 'data-section-id', null);
                			tinyMCE.activeEditor.dom.removeClass(block, 'commentable-section');
                		}
                		else
                		{
                			tinyMCE.activeEditor.dom.setAttrib(block, 'data-section-id', '0');
                			tinyMCE.activeEditor.dom.addClass(block, 'commentable-section');
                		}
                	}
            	})
            });
            
            ed.addCommand('sidecommentallparagraphs', function() {
            	if(! jQuery(tinyMCE.activeEditor.dom.select('p')).not(".commentable-section").length > 0 )
            	{
            		tinyMCE.activeEditor.dom.setAttrib(tinyMCE.activeEditor.dom.select('p'), 'data-section-id', null);
            		tinyMCE.activeEditor.dom.removeClass(tinyMCE.activeEditor.dom.select('p'), 'commentable-section');
            	}
            	else
            	{
            		tinyMCE.activeEditor.dom.removeClass(tinyMCE.activeEditor.dom.select('p'), 'commentable-section');
            		tinyMCE.activeEditor.dom.setAttrib(tinyMCE.activeEditor.dom.select('p'), 'data-section-id', null);
            		tinyMCE.activeEditor.dom.addClass(tinyMCE.activeEditor.dom.select('p'), 'commentable-section');
            		tinyMCE.activeEditor.dom.setAttrib(tinyMCE.activeEditor.dom.select('p'), 'data-section-id', '0');
            	}
            });
            
        	jQuery(document).on('change','#discussion_type', function()
        	{
        		ed.dom.removeClass(ed.dom.select('p'), 'commentable-section');
        		ed.dom.setAttrib(ed.dom.select('p'), 'data-section-id', null);
        		
        		if(this.value == 'side')
        		{
        			ed.dom.addClass(ed.dom.select('p'), 'commentable-section');
        			ed.dom.setAttrib(ed.dom.select('p'), 'data-section-id', '0');
            		jQuery(".label_delibera_show_default_comment_form").show();
        		}
        		else
        		{
        			jQuery(".label_delibera_show_default_comment_form").hide();
        		}
        	});
        },
 
        /**
         * Creates control instances based in the incomming name. This method is normally not
         * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
         * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
         * method can be used to create those.
         *
         * @param {String} n Name of the control to create.
         * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
         * @return {tinymce.ui.Control} New control instance or null if no control was created.
         */
        createControl : function(n, cm) {
            return null;
        },
 
        /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
        getInfo : function() {
            return {
                longname : 'Delibera Buttons',
                author : '#redelivre',
                authorurl : 'http://redelivre.org.br',
                infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/example',
                version : "0.1"
            };
        }
    });
 
    // Register plugin
    tinymce.PluginManager.add( 'delibera', tinymce.plugins.delibera );
})();