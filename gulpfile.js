'use strict';

var fs = require('fs');
var gulp = require('gulp'); // https://github.com/gulpjs/gulp
var moment = require('moment'); // https://github.com/moment/moment/
var clc = require('cli-color'); // https://github.com/medikoo/cli-color
var rename = require('gulp-rename'); // https://github.com/hparra/gulp-rename
var sourcemaps = require('gulp-sourcemaps'); // https://github.com/floridoo/gulp-sourcemaps

var production = (process.env.NODE_ENV === 'production');

gulp.task('default', ['move', 'pug', 'sass', 'react']);



/*====================================
=            Browser Sync            =
====================================*/

var browserSync = require('browser-sync').create(); // https://github.com/Browsersync/browser-sync
var reload = browserSync.reload;

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

var cssmin = require('gulp-cssmin'); // https://github.com/chilijung/gulp-cssmin
var uglify = require('gulp-uglify'); // https://github.com/terinjokes/gulp-uglify
var concat = require('gulp-concat'); // https://github.com/contra/gulp-concat

gulp.task('move', function() {
	gulp.src([
			'./assets/**/*',
		])
		.pipe(gulp.dest('./public'));
});



/*===========================
=            Pug            =
===========================*/

var pug = require('gulp-pug'); // https://github.com/jamen/gulp-pug

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

var sass = require('gulp-sass'); // https://github.com/dlmanning/gulp-sass

gulp.task('sass', function() {
	if (production) {
		gulp.src('./src/styles/*.scss')
			.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
			.pipe(rename({ suffix: '.min' }))
			.pipe(gulp.dest('./public/css/'));
	} else {
		gulp.src('./src/styles/*.scss')
			.pipe(sourcemaps.init())
			.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
			.pipe(sourcemaps.write())
			.pipe(rename({ suffix: '.min' }))
			.pipe(gulp.dest('./public/css/'));
	}
});

gulp.task('sass:watch', ['sass'], function() {
	gulp.watch('./src/styles/**/*.scss', ['sass', reload]);
});



/*=============================
=            React            =
=============================*/

var browserify = require('browserify'); // https://github.com/substack/node-browserify
var watchify = require('watchify'); // https://github.com/substack/watchify
var source = require('vinyl-source-stream'); // https://github.com/hughsk/vinyl-source-stream
var buffer = require('vinyl-buffer'); // https://github.com/hughsk/vinyl-buffer
var reactify = require('reactify'); // https://github.com/andreypopp/reactify

var b = browserify(['./src/scripts/main.jsx'], {
	cache: {},
	packageCache: {},
	debug: !production,
	transform: [reactify]
});

gulp.task('react', function() {
	bundle();
});

gulp.task('react:watch', ['react'], function() {
	b.plugin(watchify);
	b.on('update', bundle);
});

function bundle() {
	var tmp = b.bundle()
		.on('error', errorLog)
		.pipe(source('main.min.js'))
		.pipe(buffer())

	if (production) tmp = tmp.pipe(uglify());

	tmp.pipe(gulp.dest('./public/js/'))
		.on('end', function() {
			colorLog('yellowBright', 'Finished Bundle');
			reload();
		});
}



/*===============================
=            Utility            =
===============================*/

function colorLog(color, message) {
	console.log('[%s] %s',
		clc.blackBright(moment().format('HH:mm:ss')),
		clc[color](message)
	);
}

function errorLog(err) {
	colorLog('redBright', err.stack);
}
