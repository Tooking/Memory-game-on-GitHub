const {
    src,
    dest,
    series,
    parallel,
    watch,
    task
  } = require('gulp')
  const sass = require('gulp-sass')
  const cleanCss = require('gulp-clean-css')
  const rename = require('gulp-rename')
  const fileSize = require('gulp-filesize')
  const babel = require("gulp-babel")
  const uglify = require('gulp-uglify')
  const concat = require('gulp-concat')
  const plumber = require('gulp-plumber')
  const browserSync = require('browser-sync').create()
  const htmlmin = require('gulp-htmlmin')
  
  // Static server
  task('bsync', function () {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
    watch('*.html').on('change', browserSync.reload);
    watch('assets/sass/**/*.scss', cssMin).on('change', browserSync.reload);
    watch('assets/js/**/*.js', jsMin).on('change', browserSync.reload);
  });
  
  
  
  // Transpile Bootstrap sass files into css and minify them
  // (you should run it manually)
  function bootstrap() {
    return src('assets/sass/bootstrap/bootstrap.scss')
      .pipe(sass())
      .pipe(dest('css'))
      .pipe(fileSize())
  }
  
  // Copy Bootstrap js files into working directory
  function bootstrapjs() {
    return src('node_modules/bootstrap/dist/js/bootstrap.min.js')
      .pipe(dest('js'))
      .pipe(fileSize())
  }
  
  // Tasks for building
  
  // Minify HTML for building
  async function htmlMin() {
    return src('./*.html')
      .pipe(htmlmin({
        collapseWhitespace: true
      }))
      .pipe(dest('html-min'))
  }
  
  // Minify CSS for building
  async function cssMin() {
    return src('assets/sass/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(plumber.stop())
      .pipe(dest('css'))
      .pipe(cleanCss())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(dest('css'))
      .pipe(fileSize())
  }
  
  // Minify JS files for building
  async function jsMin() {
    return src('assets/js/**/*.js')
      .pipe(plumber())
      .pipe(concat('scripts.js'))
      .pipe(
        babel({
          presets: [
            [
              "@babel/env",
              {
                modules: false,
              },
            ],
          ],
        })
      )
      .pipe(plumber.stop())
      .pipe(dest('js'))
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(dest('js'))
      .pipe(fileSize())
  }
  
  exports.bootstrap = bootstrap
  exports.bootstrapjs = bootstrapjs
  exports.cssMin = cssMin
  exports.jsMin = jsMin
  exports.htmlMin = htmlMin
  
  exports.default = series(cssMin, jsMin, task('bsync'))
  exports.build = parallel(htmlMin, cssMin, jsMin)