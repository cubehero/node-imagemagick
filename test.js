var fs = require('fs'),
    im = require('./imagemagick');

var path = __dirname+'/sample-images/blue-bottle-coffee.jpg';
var imdata = fs.readFileSync(path, 'binary');
var gifpath = __dirname + '/sample-images/clap.gif';

im.identify(gifpath, function(err, features){
    if(err) return console.error('error',err.stack || err);
    console.log(features);
});

im.identify(path, function(err, features){
    if(err) return console.error(err.stack || err);
    console.log(features);
});

im.identify(path, function (err, features){
  if (err) return console.error(err.stack || err);
  console.log('identify(path) ->', features);
})

im.identify({data:imdata}, function (err, features){
  if (err) return console.error(err.stack || err);
  console.log('identify({data:imdata}) ->', features);
})

im.readMetadata(path, function (err, metadata){
  if (err) return console.error(err.stack || err);
  console.log('readMetadata(path) ->', metadata);
})

im.readMetadata({data:imdata}, function (err, metadata){
  if (err) return console.error(err.stack || err);
  console.log('readMetadata({data:imdata} ->', metadata);
})

var timeStarted = new Date;
im.resize({
  srcPath: gifpath,
  dstPath: 'test-resized.jpg',
  width: 92
}, function (err, stdout, stderr){
  if (err) return console.error(err.stack || err);
  console.log('resize(...) wrote "test-resized.jpg"');
  console.log('real time taken for convert: '+((new Date)-timeStarted)+' ms');
  im.identify(['-format', '%b', 'test-resized.jpg'], function (err, r){
    if (err) throw err;
    console.log("identify(['-format', '%b', 'test-resized.jpg']) ->", r);
  })
})

timeStarted = new Date;
im.resize({
  srcData: imdata,
  width: 256
}, function (err, stdout, stderr){
  if (err) return console.error(err.stack || err);
  console.log('real time taken for convert (with buffers): '+
              ((new Date)-timeStarted)+' ms');
  fs.writeFileSync('test-resized-io.jpg', stdout, 'binary');
  console.log('resize(...) wrote "test-resized.jpg" ('+stdout.length+' Bytes)');
})
