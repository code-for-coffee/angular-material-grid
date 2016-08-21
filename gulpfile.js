'use strict'

let gulp 			= require('gulp'),
		browserify 	= require('browserify'),
		babelify 		= require('babelify'),
		source 			= require('vinyl-source-stream'),
		watch 			= require('gulp-watch'),
		less     		= require('gulp-less'),
		gls					= require('gulp-live-server');

watch(['./src/*.js',
				'./src/*.less',
				'./gulpfile.js'], () => {
  console.log('Client-side code/style modified; re-compiling.')
  gulp.start('precompile')
})

gulp.task('precompile', () => {
	gulp.src('./src/style.less')
		    .pipe(less())
		    .pipe(gulp.dest('./dist/public/css'))
  return browserify('./src/app.js')
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/public/js/'))
})

gulp.task('server', () => {
  let server = gls('./dist/server.js')
	server.start.bind(server)()
})

gulp.task('default', ['server'])
