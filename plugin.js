(function($){
    var methods = {
        init : function(options){
            return this.each(function(){
                settings = {
                    show_midi: false,
                    hide_abc: true,
                    render_before: false,
                    midi_options: {},
                    parse_options: {},
                    render_options: {},
                    render_classname: "abcrendered",
                    text_classname: "abctext",
                    auto_render_treshold: 20,
                    show_text: "show score for: ",
                    hide_text: "hide score for: "
                };
                if(options){
                    $.extend(settings, options);
                }
            });
        }, //end of init

        setCode : function(text){
        
        },//end of setCode
        getCode: function(){
        
        }//end of getCode
    };

    $.fn.abcjs = function(method){
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
            return false;
        } 
    };
})(jQuery);
