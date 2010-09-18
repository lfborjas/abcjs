cat proto.js sprintf.js abc_glyphs.js abc_graphelements.js abc_layout.js abc_write.js abc_tunebook.js abc_parse_header.js abc_tune.js abc_tokenizer.js abc_parse.js abc_midiwriter.js > build/abcjs-no-raphael.js
cat raphael.js build/abcjs-no-raphael.js > build/abcjs_all.js
cat build/abcjs_all.js abc_editor.js > build/abcjs_editor.js
cat build/abcjs_all.js abc_plugin.js > build/abcjs_plugin.js
java -jar yuicompressor-2.4.2.jar  --line-break 7000 -o build/abcjs_basic_$1-min.js build/abcjs_all.js
java -jar yuicompressor-2.4.2.jar  --line-break 7000 -o build/abcjs_editor_$1-min.js build/abcjs_editor.js
java -jar yuicompressor-2.4.2.jar  --line-break 7000 -o build/abcjs_plugin-nojquery_$1-min.js build/abcjs_plugin.js
cat jquery-1.4.2.min.js build/abcjs_plugin-nojquery_$1-min.js > build/abcjs_plugin_$1-min.js

