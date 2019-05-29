(function () {
  'use strict';

  /**
   * Settings
   * Turn on/off build features
   */

  var settings = {
    clean: true,
    scripts: true,
    polyfills: true,
    styles: true,
  };

  /**
   * Paths to project folders
   */

  var paths = {
    input: 'src/',
    output: 'dist/',
    release: {
      input: 'dist/**/*',
      output: 'releases/'
    },
    scripts: {
      lib: [
        'src/js/lib/*.js',
		  './node_modules/slick-carousel/slick/slick.js',
		  './node_modules/selectric/src/jquery.selectric.js',
		  './node_modules/jquery-modal/jquery.modal.js',
          './node_modules/gsap/src/minified/TweenMax.min.js',
		  // './node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
		  // './node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
		  // './node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
      ],
      watherInput: 'src/js/**/*.js',
      input: 'src/js/main.js',
      polyfills: '.polyfill.js',
      output: 'dist/assets/'
    },
    styles: {
      input: 'src/scss/**/*.{scss,sass}',
      output: 'dist/assets/'
    },
    layout: {
      input: 'src/layout/*.liquid',
      output: 'dist/layout/'
    },
    sections: {
      input: 'src/sections/*.liquid',
      output: 'dist/sections/'
    },
    snippets: {
      input: 'src/snippets/*.liquid',
      output: 'dist/snippets/'
    },
    templates: {
      input: 'src/templates/**/*.liquid',
      output: 'dist/templates/'
    },
    locales: {
      input: 'src/locales/*.json',
      output: 'dist/locales/'
    },
    config: {
      input: ['src/config/*.json', '!src/config/settings_data.json'],
      output: 'dist/config/'
    },
    assets: {
      input: 'src/assets/*',
      output: 'dist/assets/'
    },
  };

  /**
   * Gulp Packages
   */

  // General
  const {
    src,
    dest,
    watch,
    series,
    parallel
  } = require('gulp');
  const argv = require('minimist')(process.argv.slice(2));
  const del = require('del');
  const rename = require('gulp-rename');

  // Scripts
  const jshint = require('gulp-jshint');
  const uglify = require('gulp-uglify');
  const optimizejs = require('gulp-optimize-js');
  const concat = require('gulp-concat');
  const source = require('vinyl-source-stream');
  const browserify = require('browserify');
  const babelify = require('babelify');
  const buffer = require('vinyl-buffer');

  // Styles
  const sass = require('gulp-sass');
  const prefix = require('gulp-autoprefixer');
  const minify = require('gulp-cssnano');
  const gulpif = require('gulp-if');
  const zip = require('gulp-zip');
  const touch = require('gulp-touch-cmd');

  /**
   * Gulp Tasks
   */

  var cleanDist = function (done) {

    // Make sure this feature is activated before running
    if (!settings.clean) return done();

    // Clean the dist folder
    del.sync([
      paths.output
    ]);

    // Signal completion
    return done();

  };

  var releaseTheme = function (done) {
    const currentDate = new Date();

    src(paths.release.input)
      .pipe(zip(`Shoply_${currentDate.getTime()}.zip`))
      .pipe(dest(paths.release.output));

    done();
  }

  // copy files
  var copyLayouts = function (done) {
    src(paths.layout.input)
      .pipe(dest(paths.layout.output));

    done();
  };

  var copySections = function (done) {
    src(paths.sections.input)
      .pipe(dest(paths.sections.output));

    done();
  };

  var copySnippets = function (done) {
    src(paths.snippets.input)
      .pipe(dest(paths.snippets.output));

    done();
  };

  var copyLocales = function (done) {
    src(paths.locales.input)
      .pipe(dest(paths.locales.output));

    done();
  };

  var copyTemplates = function (done) {
    src(paths.templates.input)
      .pipe(dest(paths.templates.output));

    done();
  };

  var copyAssets = function (done) {
    src(paths.assets.input)
      .pipe(dest(paths.assets.output));

    done();
  };

  var copyConfig = function (done) {
    src(paths.config.input)
      .pipe(dest(paths.config.output));

    done();
  };

  // Lint, minify, and concatenate scripts
  var buildScripts = function (done) {

    // Make sure this feature is activated before running
    if (!settings.scripts) return done();

    const b = browserify({
      entries: paths.scripts.input,
      debug: true,
      // defining transforms here will avoid crashing your stream
      transform: [babelify]
    });

    return b.bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
        .pipe(rename({basename: 'main.bundle'}))
      // .pipe(sourcemaps.init({loadMaps: true}))
          // Add transformation tasks to the pipeline here.
          .pipe(gulpif(() => { return argv.production}, uglify()))
          .pipe(gulpif(() => { return argv.production}, optimizejs()))
          .on('error', console.error)
      // .pipe(sourcemaps.write('./'))
      .pipe(dest(paths.scripts.output));
  };

  // build lib scripts
  var buildJsLibs = function (done) {

    // Make sure this feature is activated before running
    if (!settings.scripts) return done();

    // Lint scripts
    src(paths.scripts.lib)
      .pipe(concat('vendor.bundle.js'))
      .pipe(gulpif(() => { return argv.production}, uglify()))
      .pipe(dest(paths.scripts.output))

    // Signal completion
    done();

  };

  // Lint scripts
  var lintScripts = function (done) {

    // Make sure this feature is activated before running
    if (!settings.scripts) return done();

    // Lint scripts
    src(paths.scripts.input)
      .pipe(jshint());

    // Signal completion
    done();

  };

  // Process, lint, and minify Sass files
  var buildStyles = function (done) {
    // Make sure this feature is activated before running
    if (!settings.styles) return done()

    // Run tasks on all Sass files
    src(paths.styles.input)
      .pipe(sass({
        outputStyle: 'expanded',
        sourceComments: !argv.production,
        includePaths: [ 'node_modules/' ],
      }))
      .pipe(prefix({
        browsers: ['last 2 version', '> 0.25%'],
        cascade: true,
        remove: true
      }))
      .pipe(rename({
        basename: 'styles.bundle',
        extname: '.css.liquid',
      }))
      .pipe(gulpif(() => {
        return argv.production
      }, minify({
        discardComments: {
          removeAll: true,
        },
      })))
      .pipe(dest(paths.styles.output))
      .pipe(touch());

    // Signal completion
    done();
  }

  // Watch for changes
  var watchSource = function (done) {
    watch(paths.styles.input, series(buildStyles));
    watch(paths.scripts.watherInput, series(buildScripts));
    watch(paths.layout.input, series(copyLayouts));
    watch(paths.snippets.input, series(copySnippets));
    watch(paths.sections.input, series(copySections));
    watch(paths.locales.input, series(copyLocales));
    watch(paths.templates.input, series(copyTemplates));
    watch(paths.config.input, series(copyConfig));
    watch(paths.assets.input, series(copyAssets));
    done();
  };

  /**
   * Export Tasks
   */

  // Default task
  // gulp
  exports.default = series(
    cleanDist,
    parallel(
      copyLayouts,
      copySections,
      copySnippets,
      copyLocales,
      copyTemplates,
      copyConfig,
      copyAssets,
      buildScripts,
      buildJsLibs,
      buildStyles
    )
  );

  // Watch and reload
  // gulp watch
  exports.watch = series(
    watchSource
  );

  // Build theme and create zip
  exports.release = series(
    parallel(
      releaseTheme
    )
  );
}());
