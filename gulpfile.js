var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();


var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});


gulp.task('compress-js', function() {
  gulp.src(['bower_components/jquery/dist/jquery.min.js', 'bower_components/vue/dist/vue.min.js', 'js/_*.js'])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:8888"
    });
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: "localhost:8888"
    });

    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("css/app.css").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("scss/components/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("scss/app.scss"))
        .pipe(browserSync.stream());
});



gulp.task('default', ['sass', 'compress-js', 'serve'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch('js/_*.js', ['compress-js']);
});
