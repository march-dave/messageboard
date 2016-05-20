'use strict';

// http://localhost:3000/?theme=cosmo

const PORT = process.env.PORT || 3000;

let jade = require('jade');
let http = require('http');
let qs = require('qs');
let moment = require('moment');

let nodeStatic = require('node-static');
let file = new nodeStatic.Server('./public')

http.createServer((req, res) => {

let html;
let qsParts = req.url.split('?');
let path  = qsParts[0];
var query = qs.parse(qsParts[1]);

  switch(path) {
    case '/':
      {
        html = jade.renderFile('./views/index.jade', {
          title: 'Home'
          ,theme: validateTheme(query.theme)

        });
        res.end(html);
        break;
      }
  case '/input':
      {
        html = jade.renderFile('./views/input.jade', {
          title: 'Input'
          ,theme: validateTheme(query.theme)
        });
        res.end(html);
      }
  case '/contact':
      {
        html = jade.renderFile('./views/contact.jade', {
          title: 'Contact App'
          ,theme: validateTheme(query.theme)
        });
        res.end(html);
      }

  }

  file.serve(req, res);

})
.listen(PORT, err => {
  if(err) return console.log(err);
  console.log(`Node server listening on port ${PORT}`);
});

function validateTheme(theme) {

  if(theme) {
    theme = theme.toLowerCase();
  }
  let themes =  [
    'cerulean','cosmo','cyborg','flatly','darkly','cosmo','cyborg','darkly','flatly','journal','lumen','paper','readable','sandstone','simplex','slate','spacelab','superhero','united','yeti'];

  if(themes.indexOf(theme) !== -1) {
    return theme;
  } else {
    return 'sandstone';
  }

}