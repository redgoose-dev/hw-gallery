const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const scss = require('gulp-sass');
const webpack = require('webpack-stream');

const src = './src';
const dist = './dist';

const vendorFiles = {
	js: [
		'./node_modules/jquery/dist/jquery.min.js'
	],
};


// build vendor
gulp.task('vendors', () => {
	// js
	gulp.src(vendorFiles.js)
		.pipe(concat('hw-gallery.vendor.js', { newLine: '\n\n' }))
		.pipe(gulp.dest(dist));
});

// build css app
gulp.task('scss-app', () => {
	gulp.src(`${src}/scss/app.scss`)
		.pipe(sourcemaps.init())
		.pipe(scss({ outputStyle: 'compressed' }).on('error', scss.logError))
		.pipe(rename('hw-gallery.css'))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest(dist));
});
gulp.task('scss-app:watch', function(){
	gulp.watch(`${src}/scss/*.scss`, ['scss-app']);
});


// build js app
gulp.task('js-app', () => {
	return gulp.src(`${src}/js/App.js`)
		.pipe(
			webpack(
				require('./webpack.config.js')
			)
		)
		.pipe(gulp.dest(dist));
});