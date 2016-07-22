Node REST
===
Quick setup REST server with admin interface for more intuitive data manipulation.

Get it as a node module `npm install mean-street`
You may have to `bower_install` inside `app/`

=OR=

Make sure to run `npm install` to get all the dependencies.
Make sure you run `bower install` inside of the `/app` folder

Run `npm start [, --port=3000, --secret=MadeUpSecretKeyGoesHere --database=``{"name": "myNewTestDatabaseName"}``, --env=dev, ]` and the server is set up!
Notice the `=` between flags ( for when running with npm ).
For more available flags check `config/config.json` for the `flags` parameter

To setup admin, go to `/signup`. Signup with your custom username / password then edit the
entry to have `"admin" : true` for admin privileges

[View a list of available api endpoints](https://github.com/hemstreet/MEAN-Street/blob/master/docs/routes.md)
[View a list of available CRUD endpoints](https://github.com/hemstreet/MEAN-Street/blob/master/docs/CRUD.md)

Search
===
This search uses solr. To run Solr
    `bin/solr start` ( you may need to chmod 775 bin/solr ) and run it via `./solr start`
    `bin/solr create -c <coreName>`` ( if this does not work than try ``./solr create -c <coreName>`

Troubleshooting
===
*Make sure to have mongo running*

@TODO
===
* [x] Breakout functionality from Server.js
* [ ] move /lib/*.js files to a better place
* [x] Front End
* [x] Authentication
* [x] Password hashing
* [x] Register / Sign up
* [ ] Module loader
* [x] Auto loader
* [ ] Form render from Schema
* [x] Dynamic routes
* [ ] View Templates
* [ ] Server prototype type instantiation for quick deploy `new Server({ port: 3001 });
* [x] implement /schema/:model route to dynamically get a models schema
* [ ] Ability to pass express object to extend existing projects
* [ ] Argv to accept custom schema / model paths outside of node module
* [x] Update user password
* [ ] Update Role from admin area
* [ ] Integrate search w/ setup guide

Helpful Resources
===
* [http://mongoosejs.com/docs/2.7.x/docs/schematypes.html](http://mongoosejs.com/docs/2.7.x/docs/schematypes.html)
