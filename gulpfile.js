var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'gulp.*']
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
 * Scripts Task
 *
 * Moves all JS files from app directory to
 * build directory
 */
gulp.task('scripts', function() {
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
* ignores `app.js` which is loaded first.
*/
gulp.task('build', ['html', 'scripts'],  function() {
  gulp.src(paths.source + 'index.html').pipe(gulp.dest(paths.build));

  var target = gulp.src(paths.build + 'index.html'),
      source = gulp.src([
        paths.build + '**/*.js', 
        '!'+paths.build+'app.js'], 
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
  //watch js files
  gulp.watch(paths.source + '**/*.js', ['build']);
 
  // watch index.html
  gulp.watch(paths.source + 'index.html', ['build']);

  // watch html files
  gulp.watch(paths.source + '**/*.html', ['html']);
});

/**
* Default task
*
* Builds app then watches for changes.
*/
gulp.task('default', ['build', 'watch'])
