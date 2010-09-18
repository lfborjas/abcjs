#abcjs: ABC music notation parser, renderer and editor in javascript and html

*Note: this is an unofficial clone of the original project, with support for diff coloring*

The [original project](http://code.google.com/p/abcjs/) is authored by Gregory Dyke and Paul Rosen.

##abcjs editor
The abcjs editor transforms an html textarea into an area for editing abc. See: http://drawthedots.com/abcjs

Typical usage would be:

    <script src="abcjs_editor-min.js" type="text/javascript"></script>
    <script type="text/javascript">
            window.onload = function() {
                    abc_editor = new ABCEditor("abc", { canvas_id: "canvas0", midi_id:"midi", warnings_id:"warnings" });
            }
    </script>
The ABCEditor constructor takes the following parameters:

* `textarea_id` -- the id of the textarea to be converted
* `options` -- a hashtable which may include some, all or none of the following options:
    * `canvas_id` -- the id of the html element within which the abc should be rendered (when absent, it is rendered immediately above the textarea)
    * `generate_midi` -- boolean indicating whether a midi player should be generated (by default it is assumed to be false; if no midi_id is present, the player will be generated above the rendered score)
    * `midi_id` -- the id of the html element within which the midi player should be added (if this key is present, generate_midi is assumed to be true)
    * `generate_warnings` -- boolean indicating whether abc syntax warnings should be shown (by default it is assumed to be false; if no warnings_id is present, they are shown above the rendered score)
    * `warnings_id` -- the id of the html element within which abc syntax warnings should be added (if this key is present, generate_warnings is assumed to be true)
    * `parser_options` -- a hashtable of options to pass to the parser
    * `midi_options` -- a hashtable of options to pass to the midi creator (see MidiOptions) since 1.0.2

##abcjs plugin
The abcjs plugin renders all the abc in a page (determined as a new line beginning with X:). See: http://drawthedots.com/abcplugin

To use, include the abcplugin.js file in the page.

    <script src="abcjs_plugin-min.js" type="text/javascript"></script>
The abcjs plugin currently uses the JQuery library and may conflict with other libraries. If you are using other libraries which expose a $ function, you can include (since 1.0.2):

    <script type="text/javascript">
      jQuery.noConflict();
    </script>
Certain options for the plugin can be changed

    <script type="text/javascript">
      abc_plugin["show_midi"] = false;
      abc_plugin["hide_abc"] = true;
    </script>
The options available in abc_plugin are:

* `show_midi` -- whether midi should be rendered or not (true by default)
* `hide_abc` -- whether the abc text should be hidden or not (false by default) since 1.0.2
* `render_before` - whether the rendered score should appear before the abc text (false by default) since 1.0.2
* `midi_options` -- a hashtable of options to pass to the midi creator (see MidiOptions) since 1.0.2
* `auto_render_threshold` -- number of tunes beyond which auto rendering is disabled; instead, each tune is accompanied by a "show" button (default value is 20) since 1.0.2
* `show_text` -- text to be included on the "show" button before the tune title (default value is "show score for: ") since 1.0.2

When abcjs plugin finds an abctune, it wraps a div.abctext around it and renders it into a div.abcrendered. The show button is an a.abcshow. These hooks can be used for styling. since 1.0.2

##Basic abcjs
You can also run your own abcjs webapp using the abcjs_basic.js lib.

To use the ABCParser and ABCWriter constructors independently of the abcjs editor and abcjs plugin, see how they are used in abcjs editor.

##Using abcjs without bundled libraries
* `abcjs_editor` comes already bundled with `raphael.js` [more about raphaël.js](http://raphaeljs.com/)
* `abcjs_plugin` includes raphael.js and jquery.
* `abcjs_plugin-nojquery` is a standalone version of the abcjs plugin.


