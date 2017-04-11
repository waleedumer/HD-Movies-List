var cheerio = require('cheerio');
var cheerio2 = require('cheerio');
var request = require('request');
var request2 = require('request');
var fs      = require('fs');
var fs2      = require('fs');
var http = require('http');
var http2 = require('http');
var express = require('express'),
    path = require('path');
    var title;
    var image;
var link;
var src;
    var json = [];
var json2 = [];
    var tempdata={
      title:title,
      image:image,
        link:link
    }
    var tempdata2={
        src:src
    }
// request ('https://yesmovies.to/',
    request ('https://yesmovies.to/movie/life-2017-20051/607931-8/watching.html',
  function (error, response, html){
    if(!error && response.statusCode == 200){
          console.log('page loaded');

      var $ = cheerio.load(html);
        
        



        var allRecords = $('.jwplayer');
        allRecords.each(function(index, element){
      //link = $(this).attr('src');
      //title = $(element).find('.mli-info').children().first().text();
      //image = $(element).find('img.thumb.mli-thumb.lazy').attr('data-original');
           
            title = $(element).find('.jw-media').children().first().attr('src');
     tempdata={
        title:title,
        image:image,
         link:link
      }
       console.log(image);

        json.push(tempdata);

      });
  //  console.log('all records: ' + allRecords);
  function saveData(){
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

      //console.log('File successfully written! - Check your project directory for the output.json file');

  });
  }
  saveData();
  }
});
       
var app = express();
// var server = http.createServer(function(req, res){
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   fs.createReadStream(__dirname + '/views/index.html').pipe(res);
  // app.get('/', function(req,res){
  // res.sendFile(__dirname + '/views/index.html');
  // });



  //server.use(express.static(path.join(__dirname, 'public')));
// })


// //setup our app to use handlebars.js for templating

// //routes



var express =require('express');

var app = express();

var port=process.env.PORT || 8087;

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// //add some standard express middleware
app.configure(function() {
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.static('static'));
});

app.get('/', function(req, res) {
    res.render('index', {json: json});
});

app.get('/single?', function(req, res) {
    request ('https://yesmovies.to/movie/life-2017-20051/607931-8/watching.html',
  function (error, response, html){
    if(!error && response.statusCode == 200){
          console.log('page loaded');

      var $ = cheerio.load(html);
        
        var allRecords = $('jw-video');
        allRecords.each(function(index, element){
      src = $(this).attr('href');
      
           
     tempdata2={
         src:src
      }
       

        json2.push(tempdata);

      });
  //  console.log('all records: ' + allRecords);
  function saveData(){
    fs.writeFile('click.json', JSON.stringify(json2, null, 4), function(err){

      //console.log('File successfully written! - Check your project directory for the output.json file');

  });
  }
  saveData();
  }
});
    res.render('single', {json2: json2});
});




app.listen(port);

console.log('Server Listening at port '+port);
