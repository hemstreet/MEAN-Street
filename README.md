* This project is a work in progress *

Node REST
===

*Make sure to have mongo running.*

Create a config inside of `config/config.json`. Use the `_config.json` as a template.
Make sure to run `npm install` to get all the dependencies.
Make sure you run `bower install` inside of the `/app` folder

Run `node server.js` and the server is set up!

* [ ] Breakout functionality from server.js
* [ ] Front End
* [x] Authentication
* [x] Password hashing
* [x] Register / Sign up
* [ ] Module loader
* [x] Auto loader
* [ ] Form render from Schema
* [x] Dynamic routes
* [ ] View Templates
* [ ] Server prototype type instantiation for quick deploy `new Server({ port: 3001 }); 
* [ ] implement /schema/:model route to dynamically get a models schema  


Models
===
* [http://mongoosejs.com/docs/2.7.x/docs/schematypes.html](http://mongoosejs.com/docs/2.7.x/docs/schematypes.html)