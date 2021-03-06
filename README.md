## Transportation - San Francisco Bay BART

This second Udacity Senior Web Developer Nanodegree project will allow you to look up your train any time. This application is written in [Mithril](https://github.com/lhorie/mithril.js/tree/master) and completely offline first with comple accses to train times. Data have been acquired via GTFS file from BART transportation data provider. The app is working fully offline while it fetches real time updates when online using BART train update GTFS file format.

This application is using the Flux methodology for manipulation of data and applications' state.

### Prerequisites.

This project is assuming you are running node v5.3.0 since we are using the --harmony_destructuring flag.

Get started by intalling npm; please follow this tutorial -> [http://blog.npmjs.org/post/85484771375/how-to-install-npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm)


After installing npm, you are prepared to install gulp so you can test the application; please follow this tutorial -> [https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

Next go to the containing folder and run:

```
'npm install'
```

Lastly run:

```
npm run serve
```

Please note when running the app with command npm run dev .. the backend server needs to run before this command. So please run ```node --harmony_destructuring server.js``` first

### Technologies Used.


[Mithril](https://github.com/lhorie/mithril.js/tree/master) for it being amazing front end javascript library
* [Bloodhound](https://github.com/pqx/bloodhound) for station search autocomplete
* HTML5
* CSS3
* Javascript
* SCSS
* Gulp
* Webpack
* Written in ES6
