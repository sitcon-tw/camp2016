'use strict';

var fs = require('fs');
var gulp = require('gulp'); // https://github.com/gulpjs/gulp
var moment = require('moment'); // https://github.com/moment/moment/
var clc = require('cli-color'); // https://github.com/medikoo/cli-color
var rename = require('gulp-rename'); // https://github.com/hparra/gulp-rename
var sourcemaps = require('gulp-sourcemaps'); // https://github.com/floridoo/gulp-sourcemaps

gulp.task('default', ['bower', 'sass']);

gulp.task('watch', ['sass', 'react:watch', 'browser-sync'], function() {
	var reload = browserSync.reload;
	gulp.watch('./index.html', reload);
	gulp.watch('./app/styles/**/*.scss', ['sass'], reload);
	gulp.watch('./public/js/**/*.js', reload);
});



/*==============================
=            Rename            =
==============================*/

var cssmin = require('gulp-cssmin'); // https://github.com/chilijung/gulp-cssmin
var uglify = require('gulp-uglify'); // https://github.com/terinjokes/gulp-uglify

gulp.task('move', function() {
	gulp.src('./app/assets/**/*')
		.pipe(gulp.dest('./public/'));
});



/*=============================
=            Bower            =
=============================*/

var bower = require('gulp-bower'); // https://github.com/zont/gulp-bower

gulp.task('bower', function() {
	return bower();
});



/*====================================
=            Browser Sync            =
====================================*/

var browserSync = require('browser-sync').create(); // https://github.com/Browsersync/browser-sync
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});



/*============================
=            Sass            =
============================*/

var sass = require('gulp-sass'); // https://github.com/dlmanning/gulp-sass

gulp.task('sass', function() {
	return gulp.src('./app/styles/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/css'));
});



/*=============================
=            React            =
=============================*/

var browserify = require('browserify'); // https://github.com/substack/node-browserify
var watchify = require('watchify'); // https://github.com/substack/watchify
var source = require('vinyl-source-stream'); // https://github.com/hughsk/vinyl-source-stream
var buffer = require('vinyl-buffer'); // https://github.com/hughsk/vinyl-buffer
var reactify = require('reactify'); // https://github.com/andreypopp/reactify

var through = require('through'); // https://github.com/dominictarr/through
var reactTransform = require('react-tools').transform; // https://www.npmjs.com/package/react-tools#transforminputstring-options

var b = browserify(['./app/scripts/main.jsx'], {
	cache: {},
	packageCache: {},
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
	b.bundle()
		.on('error', errorLog)
		.pipe(source('main.js'))
		.pipe(buffer())
		// .pipe(uglify())
		.pipe(gulp.dest('./public/js'))
		.on('end', endLog.bind(null, 'Finished Bundle'));
}



/*===============================
=            Utility            =
===============================*/

function errorLog(err) {
	console.log('[%s] %s',
		clc.blackBright(moment().format('HH:mm:ss')),
		clc.redBright(err.message)
	);
	console.error.bind(err);
	this.emit('end');
}

function endLog(message) {
	console.log('[%s] %s',
		clc.blackBright(moment().format('HH:mm:ss')),
		clc.yellowBright(message)
	);
}
