**This project is a work in progress**

Node REST
===

*Make sure to have mongo running.*

Make sure to run `npm install` to get all the dependencies.
Make sure you run `bower install` inside of the `/app` folder

Run `node server.js --secret MadeUpSecretKeyGoesHere [,--database databasePath, --port 3000, --baseUrl rest, --env dev, ]` and the server is set up!

To setup admin, go to `/signup`. Signup with your custom username / password then edit the
entry to have `"admin" : true` for admin privileges


* [x] Breakout functionality from server.js
* [ ] move /lib/*.js files to a better place
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
