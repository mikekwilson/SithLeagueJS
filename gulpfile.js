var gulp = require('gulp'),

    // Invoke Karma API
    Server = require('karma').Server;

    // Load all plugins
    // Usage $.{plugin-name}
    $ = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'gulp.*', 'main-bower-files']
    });

var paths = {
  build:    './build/',

  source:   './app/',
};

// Cleans build folder
gulp.task('clean', function() {
  return gulp.src(paths.build)
    .pipe($.clean());
});

/**
 * Bower task
 *
 * Runs bower install
 */
gulp.task('bower', function() {
  return $.bower();
});

/**
 * Vendor task
 *
 * fetch and concatenate CSS and JS from installed
 * bower packages
 */
gulp.task('vendor', ['bower'],  function() {
  var jsFilter = $.filter('**/*.js', {restore: true});
  var cssFilter = $.filter('**/*.css');

  return gulp.src($.mainBowerFiles())
    .pipe(jsFilter)
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest(paths.build + 'js'))

    .pipe(
      jsFilter.restore)

    .pipe(cssFilter)
    .pipe($.concat('vendor.css'))
    .pipe(gulp.dest(paths.build + 'css'));
});


/**
* Test task
*
* Runs Unit Tests on all JS file in source directory
*/
gulp.task('test', function(done) {
  new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
  }, function(exitCode) {
    done();
//    process.exit(exitCode);
  })
  .on('error', function(err) {
    console.log(err.toString());
    this.emit('end');
  })
  .start();
});

/**
 * Scripts Task
 *
 * Moves all JS files from app directory to
 * build directory
 */
gulp.task('scripts', ['test'],  function() {
  return gulp.src(paths.source + '**/*.js')
    .pipe(gulp.dest(paths.build));
});

/**
* HTML task
*
* Moves html files to build directory
*/
gulp.task('html', function() {
  return gulp.src(paths.source + '**/*.html')
    .pipe(gulp.dest(paths.build));
})

/**
* Build task
*
* Inserts script tag into index.html for each file in the project
* ignores `app.js` and `vendor.js` which are loaded in specific order.
*/
gulp.task('build', ['vendor', 'html', 'scripts'],  function() {
  var target = gulp.src(paths.build + 'index.html'),
      source = gulp.src([
        paths.build + '**/*.js', 
        '!'+paths.build+'app.js',
        '!'+paths.build+'js/vendor.js'], 
        {read: false}
        );

  return target.pipe($.inject(source, {relative: true}))
    .pipe(gulp.dest(paths.build));
});

/**
* Watch task
*
* Watches for changes to JS or html files and runs the build script
*/
gulp.task('watch',['build'], function() {
  gulp.watch([paths.source + '**/*.js', 
              paths.source + '**/*.html'],
         ['build']);
});

/**
* Default task
*
* Builds app then watches for changes.
*/
gulp.task('default', ['build', 'watch'])
