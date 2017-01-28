"use strict"
var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer')


gulp.task('html', function() {
  var YOUR_LOCALS = {};
  gulp.src('./dev/*.jade')
    .pipe(jade({
    	pretty: true,
    	locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./app/'));
});

gulp.task('sass', function () {
  return gulp.src('./dev/sass/*.scss')
    .pipe(sass.sync().on('error',sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 50 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./app/css/'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
    		suffix: "-min",
  		}))
    .pipe(gulp.dest('./app/css/'));
});

gulp.task('watch', function () {
	gulp.watch('./dev/*.jade',['html']);
	gulp.watch('./dev/components/*.jade',['html']);
	gulp.watch('./dev/sass/*.scss',['sass']);
  gulp.watch('./app/js/*.js');
  gulp.watch('./app/php/*.php');
});

gulp.task('default',['sass','html','watch']);