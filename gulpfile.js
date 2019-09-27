const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpAutoPrefix = require('gulp-autoprefixer');
const gulpCssMin = require('gulp-cssmin');
const gulpConcat = require('gulp-concat');
const gulpSourceMap = require('gulp-sourcemaps');

gulp.task('copy', function () {
  return gulp.src('./src/lib/assets/**/*').pipe(gulp.dest('./bundles/scss/'));
});

gulp.task('default', gulp.series('copy'));
