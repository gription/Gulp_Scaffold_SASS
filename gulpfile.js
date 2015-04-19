/* Gruntfile.js Template per Andy Brown @ 4/2015

  AVAILABLE TASKS
-------------------
  META: default, build, serve, watch
  DEVOP: clean, html, assets, js, frameworks, images, css, sass
  EZ-OP: servez, buildez, htmlez, cssez, sassez

  DEPENDENCIES
----------------
 npm install --save-dev gulp gulp-ruby-sass gulp-autoprefixer del
 gulp-minify-css gulp-minify-html gulp-uglify gulp-concat gulp-sourcemaps
 gulp-rename gulp-imagemin gulp-notify browser-sync gulp-changed gulp-ngmin
 gulp-cache gulp-filter gulp-plumber gulp-csslint csslint
 gulp-htmllint gulp-jshint jshint-stylish cool-reporter jshint-html-reporter
 */

// Gulp Packages
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var minifyhtml = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var ngmin = require('gulp-ngmin');
var jshint = require('gulp-jshint');
var cache = require('gulp-cache');
var copy = require('gulp-copy');
var filter = require('gulp-filter');
var plumber = require('gulp-plumber');
var csslint = require('gulp-csslint');
var htmllint = require('gulp-htmllint');
var del = require('del');

// AutoPrefixer - Browser Support Policy
var supportedbrowsers = [
    'last 2 version',
    'safari 5',
    'ie 8',
    'ie 9',
    'opera 12.1',
    'ios 6',
    'android 4'
    ];

// Path Variables
var spaths = {
    html:       ['src/**/*.html', 'src/**/*.php', '!src/exclude/**/*'],
    js:         ['src/scripts/**/*.js', '!src/scripts/exclude/**/*'],
    frameworks: ['src/frameworks/**/*.js', '!src/frameworks/exclude/**/*'],
    images:     ['src/images/**/*', '!src/images/exclude/**/*'],
    css:        ['src/style/**/*.css', '!src/style/exclude/**/*'],
    sass:       ['src/style/**/*.scss', '!src/**/_*.scss', '!src/style/exclude/**/*'],
    assets:     ['src/assets/**/*', '!src/assets/exclude/**/*']
};

var dpaths = {
    dist:       'dist',
    scripts:    'dist/scripts',
    images:     'dist/images',
    style:      'dist/style',
    assets:     'dist/assets'
};

var mappath = ('maps');

var watchpath = ['dist/**/*', '!dist/**/*.css'];

var reload = browserSync.reload;

var config = {
    ui: { port: 3001 },
    weinre: { port: 9090 },
    port: 3000,
    logLevel: "debug",
    // info, debug, or silent
    // browser: ["google chrome", "firefox"],
    browser: ["google chrome"],
    logConnections: true,
    logFileChanges: true,
//  server: { baseDir: ["./dist"], directory: true, index: "index.html" },
    proxy: "cssmenu"
};


// default - Runs Most Common productive tasks
gulp.task('default', [
		'html',
		'assets',
		'js',
		'css',
		'sass'
	]);

// build - Runs All productive tasks
gulp.task('build', [
		'html',
		'assets',
		'js',
		'frameworks',
		'images',
		'css',
		'sass'
	]);

// serve - Monitor src changes triggering transpilation
// 		(w/ BrowserSync Automated Refresh)
gulp.task('serve', ['build'], function() {
    browserSync(config);
    gulp.watch(watchpath).on("change", reload); 
    gulp.watch(spaths.html,       ['html']);
    gulp.watch(spaths.assets,     ['assets']);
    gulp.watch(spaths.js,         ['js']);
    gulp.watch(spaths.frameworks, ['frameworks']);
    gulp.watch(spaths.images,     ['images']);
    gulp.watch(spaths.css,        ['css']);
    gulp.watch(spaths.sass,       ['sass']);
});

// watch - Monitor src changes triggering transpilation
// 		(req. Browser Tools for Refresh)
gulp.task('watch', function() {
    gulp.watch(spaths.html,       ['html']);
    gulp.watch(spaths.assets,     ['assets']);
    gulp.watch(spaths.js,         ['js']);
    gulp.watch(spaths.frameworks, ['frameworks']);
    gulp.watch(spaths.images,     ['images']);
    gulp.watch(spaths.css,        ['css']);
    gulp.watch(spaths.sass,       ['sass']);
});

// clean - Delete entire DIST folder
gulp.task('clean', function (cb) {
    del(['dist/**/*'], function (err, deletedFiles) {
        console.log('Files deleted:', deletedFiles.join(', '));
    })
});

// html - Process HTML
gulp.task('html', function () {
    return gulp.src(spaths.html)
        .pipe(plumber())
        .pipe(htmllint())
		.pipe(minifyhtml())
        .pipe(gulp.dest(dpaths.dist))
        .pipe(reload({ stream: true }))
        .pipe(notify('HTML (PHP) Processing Complete.'))
});

// assets - Just copy over (if) anything in assets folder
gulp.task('assets', function () {
    return gulp.src(spaths.assets)
        .pipe(plumber())
        .pipe(reload({ stream: true }))
        .pipe(copy(dpaths.assets, { prefix: 2 }))
});

// js - Process JavaScript Application Files
gulp.task('js', function () {
    return gulp.src(spaths.js)
        .pipe(plumber())
        .pipe(jshint('.jshintrc'))
  //opt .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('cool-reporter'))
  //opt .pipe(jshint.reporter('jshint-html-reporter'))
        .pipe(changed(dpaths.scripts))
        .pipe(gulp.dest(dpaths.scripts))
        .pipe(sourcemaps.init())
        .pipe(ngmin({ dynamic: true }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dpaths.scripts))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write(mappath))
        .pipe(gulp.dest(dpaths.scripts))
        .pipe(reload({ stream: true }))
        .pipe(notify('JavaScript Applications Processing Complete.'))
});

// frameworks - Process JavaScript Frameworks
gulp.task('frameworks', function () {
    return gulp.src(spaths.frameworks)
        .pipe(plumber())
        .pipe(changed(dpaths.scripts))
        .pipe(gulp.dest(dpaths.scripts))
        .pipe(sourcemaps.init())
        .pipe(concat('frameworks.js'))
        .pipe(gulp.dest(dpaths.scripts))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write(mappath))
        .pipe(gulp.dest(dpaths.scripts))
        .pipe(reload({ stream: true }))
        .pipe(notify('JavaScript Frameworks Processing Complete.'))
});

// images - Process Images
gulp.task('images', function () {
    return gulp.src(spaths.images)
        .pipe(plumber())
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            multipass: true
            })))
        .pipe(gulp.dest(dpaths.images))
        .pipe(reload({ stream: true }))
        .pipe(notify('Images Processing Complete.'))
});



// css - Process CSS
gulp.task('css', function () {
    return gulp.src(spaths.css)
        .pipe(plumber())
        .pipe(autoprefixer(supportedbrowsers))
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(gulp.dest(dpaths.style))
        .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dpaths.style))
        .pipe(reload({ stream: true }))
        .pipe(notify('CSS Processing Complete.'))
});

// sass - Process SASS
gulp.task('sass', function () {
    return sass('src/style/', {
		sourcemap: true,
		verbose: true,
    	style: 'expanded'
		// style can be nested (default),
		// compact, compressed, or expanded
		})
        .on('error', function (err) {
            console.error('SASS Error!', err.message);
        })
        .pipe(plumber())
        .pipe(autoprefixer(supportedbrowsers))
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(gulp.dest(dpaths.style))
        .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write(mappath, {
            includeContent: false,
            sourceRoot: '/src/style'
        }))
        .pipe(gulp.dest(dpaths.style))
        .pipe(filter("**/*.css"))
        .pipe(reload({ stream: true }))
        .pipe(notify('SASS(SCSS) Processing Complete.'))
});

//////////////////////////////////////////////////////////////////////////////////////////////
// EZ Tasks (buildez, servez, htmlez, cssez, sassez) for fast (non-production) development. //
//////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('buildez', ['htmlez', 'assets', 'js', 'frameworks', 'images', 'cssez', 'sassez' ]);
gulp.task('servez', ['sassez'], function() {
    browserSync(config);
    gulp.watch(watchpath).on("change", reload); gulp.watch(spaths.html, ['htmlez']);
    gulp.watch(spaths.assets, ['assets']); gulp.watch(spaths.js, ['js']);
    gulp.watch(spaths.frameworks, ['frameworks']); gulp.watch(spaths.images, ['images']);
    gulp.watch(spaths.css, ['cssez']); gulp.watch(spaths.sass, ['sassez']);});
gulp.task('htmlez', function () { return gulp.src(spaths.html)
        .pipe(plumber())
        .pipe(htmllint())
        .pipe(gulp.dest(dpaths.dist))
        .pipe(reload({ stream: true }))
        .pipe(notify('HTML (PHP) Processing Complete.'))});
gulp.task('cssez', function () { return gulp.src(spaths.css)
        .pipe(plumber())
        .pipe(autoprefixer(supportedbrowsers))
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(gulp.dest(dpaths.style))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dpaths.style))
        .pipe(reload({ stream: true }))
        .pipe(notify('CSS Processing Complete.'))});
gulp.task('sassez', function () { return sass('src/style/', { sourcemap: false, style: 'expanded' })
        .on('error', function (err) { console.error('SASS Error!', err.message); })
        .pipe(plumber())
        .pipe(autoprefixer(supportedbrowsers))
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(gulp.dest(dpaths.style))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dpaths.style))
        .pipe(reload({ stream: true }))
        .pipe(notify('SASS(SCSS) Processing Complete.'))});



 
