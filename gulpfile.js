'use strict';

const fs = require('fs');
const gulp = require('gulp'); // https://github.com/gulpjs/gulp
const moment = require('moment'); // https://github.com/moment/moment/
const clc = require('cli-color'); // https://github.com/medikoo/cli-color
const rename = require('gulp-rename'); // https://github.com/hparra/gulp-rename
const sourcemaps = require('gulp-sourcemaps'); // https://github.com/floridoo/gulp-sourcemaps
const gulpif = require('gulp-if'); // https://github.com/robrich/gulp-if

var env = process.env.NODE_ENV;
if (env !== 'production') env = 'development';

gulp.task('default', ['move', 'pug', 'sass', 'react:lib', 'react:app']);



/*====================================
=            Browser Sync            =
====================================*/

const browserSync = require('browser-sync').create(); // https://github.com/Browsersync/browser-sync
const reload = browserSync.reload;

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./public/"
		}
	});
});

gulp.task('watch', ['pug:watch', 'sass:watch', 'react:watch', 'browser-sync']);



/*===================================
=            Move Assets            =
===================================*/

const cssmin = require('gulp-cssmin'); // https://github.com/chilijung/gulp-cssmin
const uglify = require('gulp-uglify'); // https://github.com/terinjokes/gulp-uglify
const concat = require('gulp-concat'); // https://github.com/contra/gulp-concat

gulp.task('move', function() {
	gulp.src([
			'./assets/**/*',
		])
		.pipe(gulp.dest('./public'));
});



/*===========================
=            Pug            =
===========================*/

const pug = require('gulp-pug'); // https://github.com/jamen/gulp-pug

gulp.task('pug', function() {
	gulp.src(['./src/views/*.pug', './src/views/*.jade'])
		.pipe(pug())
		.pipe(gulp.dest('./public/'));
});

gulp.task('pug:watch', ['pug'], function() {
	gulp.watch(['./src/views/**/*.jade', './src/views/**/*.pug'], ['pug', reload]);
});



/*============================
=            Sass            =
============================*/

const sass = require('gulp-sass'); // https://github.com/dlmanning/gulp-sass
const autoprefixer = require('gulp-autoprefixer'); // https://github.com/sindresorhus/gulp-autoprefixer

gulp.task('sass', function() {
	gulp.src('./src/styles/*.scss')
		.pipe(gulpif(env === 'development', sourcemaps.init()))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['> 1%', 'last 3 versions', 'Firefox >= 20'],
			cascade: false
		}))
		.pipe(gulpif(env === 'development', sourcemaps.write()))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./public/css/'));
});

gulp.task('sass:watch', ['sass'], function() {
	gulp.watch('./src/styles/**/*.scss', ['sass', reload]);
});



/*=============================
=            React            =
=============================*/

const browserify = require('browserify'); // https://github.com/substack/node-browserify
const watchify = require('watchify'); // https://github.com/substack/watchify
const source = require('vinyl-source-stream'); // https://github.com/hughsk/vinyl-source-stream
const buffer = require('vinyl-buffer'); // https://github.com/hughsk/vinyl-buffer
const babelify = require('babelify'); // https://github.com/babel/babelify

var dependencies = Object.keys(require('./package.json').dependencies);

var app_bundler = browserify(['./src/scripts/main.jsx'], {
	cache: {},
	packageCache: {},
	debug: (env === 'development'),
	transform: [
		['babelify', { presets: ['react'] }]
	]
});

var lib_bundler = browserify({
	debug: (env === 'development'),
});

for (var i in dependencies) {
	lib_bundler.require(dependencies[i]);
	app_bundler.external(dependencies[i]);
}

function bundle(b, output, mangle) {
	b.bundle()
		.on('error', errorLog)
		.pipe(source(output))
		.pipe(buffer())
		.pipe(gulpif(env === 'production', uglify({ mangle: mangle })))
		.on('error', errorLog)
		.pipe(gulp.dest('./public/js/'));
}

gulp.task('react:lib', function() {
	bundle(lib_bundler, 'main.lib.js', false);
});

gulp.task('react:app', function() {
	bundle(app_bundler, 'main.min.js', true);
});

gulp.task('react:watch', ['react:app'], function() {
	app_bundler.plugin(watchify);
	app_bundler.on('log', function(msg) { colorLog('yellowBright', msg); });
	app_bundler.on('update', function(ids) {
		bundle(app_bundler, 'main.min.js', true);
		browserSync.reload();
	});
});



/*===============================
=            Utility            =
===============================*/

function colorLog(color, message) {
	console.log(`[${ clc.blackBright(moment().format('HH:mm:ss')) }] ${ clc[color](message) }`);
}

function errorLog(err) {
	colorLog('redBright', err.stack);
}
