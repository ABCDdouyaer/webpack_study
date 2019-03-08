const pluginName = 'WebpackDispatchChunkPlugin';

module.exports = class WebpackDispatchChunkPlugin{
  apply(compiler){
    compiler.hooks.compilation.tap(pluginName, function(compilation){
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(pluginName, (data, callback)=>{
        const checkMap = {
          'entry1.html': 'main',
          'entry2.html': 'page',
          'entry3.html': 'about'
        }

        data.body.forEach((script, index)=>{
          var name = script.attributes.src;
          var keywords = checkMap[data.outputName];
          if(name.indexOf('vendors') >= 0 && name.indexOf(keywords) <=0 ){
            data.body.splice(index, 1);
          }
        })
        
        callback(null, data);

      })
    })
  }
}

