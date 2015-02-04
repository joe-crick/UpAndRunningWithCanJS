# Setup <a name="setup"></a>

The first thing we need to do is make sure we have everything we need to make our application. If you haven't done so already, download [Node.js](http://nodejs.org/). Follow the instructions to install and configure Node for your machine.
	
##Folder Structure

A lot of frameworks recommend a structure that has separate JS, CSS, and HTML folders. When building a CanJS app, because our application will be built off of components, we use a component-based folder structure. Off of a root folder called "PlaceMyOrder", create the following subfolders:

- PlaceMyOrder
	- app
        - components
    	   - models
    	   - site-css
	- build

Copy the CSS file that accompanies this eBook into your CSS folder. We won't be covering any of the CSS here.

Now, you'll need to install Gulp, Browserify, and Vinyl using npm. Make sure you install everything from within your build directory (/PlaceMyOrder/build). If you need instructions on installing Gulp, Mark Goodyear has put together an excellent guide. You can read it here: [Getting Started with Gulp](http://markgoodyear.com/2014/01/getting-started-with-gulp/). Installing Browserify and Vinyl is as easy as typing "npm i browserify vinyl-source-stream vinyl-buffer".

Once your installs are complete, create a file called "gulpfile.js" in the build folder. We'll run Gulp from that folder when compiling the application. Your gulpfile.js should look something like this:

    var gulp = require('gulp');
    var jshint = require('gulp-jshint');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var browserify = require('browserify');
    var jsdoc = require("gulp-jsdoc");
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var sourcemaps = require('gulp-sourcemaps');
    var documentationRootPath = '../build/documentation/';
    
    var jsPaths = ['../app/components/**/*.js', '../app/models/**/*.js'];
    
    gulp.task('lint', function () {
        return gulp.src(jsPaths)
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });
    
    gulp.task('scripts', function () {
    
        browserify({
            entries: ['../app/appBootstrap.js'],
            standalone: 'place-my-order'
        })
            .bundle()
            .pipe(source('PlaceMyOrder.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('../app/dist'));
    
        gulp.src('../app/dist/PlaceMyOrder.js')
            .pipe(rename('PlaceMyOrderProduction.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('../app/dist'));
    
        return gulp.src(jsPaths)
            .pipe(jsdoc(documentationRootPath + 'PlaceMyOrderDocs'));
    
    });
    
    // Watch Files For Changes
    gulp.task('watch', function () {
        var watchPaths = jsPaths.concat(['../app/appBootstrap.js']);
        gulp.watch(watchPaths, ['lint', 'scripts']);
    });
    
    // Default Task
    gulp.task('default', ['lint', 'scripts', 'watch']);
    
We're not going to go into a detailed analysis of the gulpfile, or Gulp. The goal, here, is to get you up and running. If you want more information, you can visit the Gulp site at [www.gulpjs.com](www.gulpjs.com)

At this point, you should be able to run a successful build. Open up your Node terminal, making sure you run it from your build folder. The output of your build should look something like this:

    [14:04:11] Using gulpfile ~/Projects/PlaceMyOrder/build/gulpfile.js
    [14:04:11] Starting 'lint'...
    [14:04:11] Starting 'scripts'...
    [14:04:11] Starting 'watch'...
    [14:04:11] Finished 'watch' after 3.75 ms
    [14:04:11] Finished 'lint' after 58 ms
    [14:04:11] Finished 'scripts' after 52 ms
    [14:04:11] Starting 'default'...
    [14:04:11] Finished 'default' after 4.34 μs
    
If the build is successful, a dist folder will be added to your app folder, and it will contain two files:

- app
    - dist
        - PlaceMyOrder.js
        - PlaceMyOrderProduction.min.js

There will be contents in both of these files---the output of the Browserify task---but they will be effectively blank[^blank].

[^blank]: They won't actually be blank. They'll contain what looks like garbled JavaScript; but they won't contain any usable code.