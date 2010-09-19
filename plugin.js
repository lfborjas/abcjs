ABCUtils = function (options){
    $.extend(this, options);
    this.errors = "";
};

ABCUtils.prototype.render = function(contextnode, abcstring){
      var abcdiv = $("<div class='"+this.render_classname+"'></div>");
      if (this.render_before) {
        contextnode.before(abcdiv);
      } else {
        contextnode.after(abcdiv);
      }
      var self = this;
      try {
        var tunebook = new AbcTuneBook(abcstring);
        var abcParser = new AbcParse();
        abcParser.parse(tunebook.tunes[0].abc);
        var tune = abcParser.getTune();

        var doPrint = function() {
                try {
                  var paper = Raphael(abcdiv.get(0), 800, 400);
                  var printer = new ABCPrinter(paper,self.render_options);
                  printer.printABC(tune);
                } catch (ex) { // f*** internet explorer doesn't like innerHTML in weird situations
                  // can't remember why we don't do this in the general case, but there was a good reason
                  abcdiv.remove();
                  abcdiv = $("<div class='"+self.render_classname+"'></div>");
                  paper = Raphael(abcdiv.get(0), 800, 400);
                  printer = new ABCPrinter(paper);
                  printer.printABC(tune);
                  if (self.render_before) {
                    contextnode.before(abcdiv);
                  } else {
                    contextnode.after(abcdiv);
                  }
                }
                if (ABCMidiWriter && self.show_midi) {
                  midiwriter = new ABCMidiWriter(abcdiv.get(0),self.midi_options);
                  midiwriter.writeABC(tune);
                }
          };

        
        if (this.auto_render) {
          doPrint();
        } else {
          var showtext = "<a class='abcshow' href='#'>"+this.show_text+(tune.metaText.title||"untitled")+"</a>";
          var showspan = $(showtext);
          showspan.click(function(){
              doPrint();
              showspan.hide();
              return false;
          });
          abcdiv.before(showspan);
        }

        } catch (e) {
        this.errors+=e;
       }
};

(function($){
    var methods = {
        init : function(options){
            return this.each(function(){
                settings = {
                    show_midi: false,
                    hide_abc: true, //remove the original code from the div
                    render_before: false,
                    midi_options: {},
                    parse_options: {},
                    render_options: {},
                    render_classname: "abcrendered",
                    text_classname: "abctext",
                    show_text: "show score for: ",
                    hide_text: "hide score for: ",
                    show_source: true, //show the source in a separate paragraph
                    auto_render: true,
                };
                if(options){
                    $.extend(true, settings, options);
                }
                $this = $(this);

                var abc = new ABCUtils(settings);
                var code = $this.text();
                $this.data("code", code);
                $this.data("initialized", true);
                $this.data("scoremachine", abc);
                if(settings.hide_abc){
                    if(settings.show_source){
                        $this.after("<p class='abc-code'></p>").text(code).hide();
                    }
                    $this.empty();
                }
                abc.render($this, code);                
            });
        }, //end of init

        setCode : function(text){
            return this.each(function(){
                $this = $(this);
                if($this.data("initialized")){
                    var abc = $this.data("scoremachine");
                    $this.data("code", text);
                    abc.render($this, text);
                    //TODO: update the hidden source
                }
            });
        },//end of setCode
        getCode: function(){
            return this.data("code");
        }//end of getCode
    };

    $.fn.abcjs = function(method){
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.abcjs' );
            return false;
        } 
    };
})(jQuery);
