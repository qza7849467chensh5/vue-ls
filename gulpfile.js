var gulp = require('gulp');
var babel = require('rollup-plugin-babel');
var rename = require('gulp-rename');
var rollup = require('gulp-rollup');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function () {
  return gulp.src('./src/index.js')
    .pipe(rollup({
      allowRealFiles: true,
      entry: './src/index.js',
      format: 'umd',
      moduleName: 'vue-ls',
      plugins: [
        babel({
          runtimeHelpers: true,
          externalHelpers: false,
          exclude: 'node_modules/**'
        })
      ]
    }))
    .pipe(rename('vue-ls.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename('vue-ls.min.js'))
    .pipe(sourcemaps.write('.', {includeContent: false}))
    .pipe(gulp.dest('./dist'))
  ;
});

gulp.task('watch', function () {
  gulp.watch('./src/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('js'));
