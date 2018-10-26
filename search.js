
  if(process.argv.length < 4)
    {
        console.log("USAGE: node search [EXT] [TEXT]");
        process.exit();
    }
    
    var args = process.argv.slice(2);
    var ext = args[0];
    var searchedText  = args[1];
    
    var fs = require('fs');  //require node filesystem module
    var path = require('path'); //require node path module (a couple of tools for reading path names)
    
    var walk = function(dir) {
        var results = [];
        var list = fs.readdirSync(dir);
        list.forEach(function(file) {
            file = dir + '/' + file;
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) { 
                /* Recurse into a subdirectory */
                results = results.concat(walk(file));
            }
             else { 
            
                file_type = file.split(".").pop();
                /* Is a file */
                if (file_type == ext)
                {
                    fs.readFile(file, function(err, content) {
    
                        if (err) throw err;
    
                         if(content.indexOf(searchedText)>-1 ) results.push(file);
    
                    });				
                    results.push(file);
                }
            }
        });
        return results;
    }
    
    var files = walk(__dirname);
    if(files.length > 0)
        console.log(files);
    else
        console.log("No file was found");