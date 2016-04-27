'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const sass = require('gulp-sass');
const istanbul = require('gulp-istanbul');
const maps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const watch = require('gulp-watch');

const scripts = ['index.js', 'gulpfile.js', 'lib/*.js', 'test/*.spec.js',
  'public/js/*.js', 'commands/*.js', 'app/**/*.js(x)?', '!node_modules/**'];
const serverScripts = ['index.js', 'lib/*.js', 'test/*.spec.js',
  'commands/*.js', '!node_modules/**'];
const clientScripts = ['app/**/*.js', 'app/**/*.jsx'];
const staticFiles = ['app/**/*.html'];

gulp.task('lint', () => {
  return gulp.src(scripts)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('static:dev', () => {
  gulp.src(staticFiles, { 'base': 'app' })
    .pipe(gulp.dest('build/'));
});

gulp.task('sass', () => {
  return gulp.src('public/scss/style.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./build'));
});

gulp.task('build:dev', () => {
  webpack({
    entry: ['./app/index.js'],
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true
          }
        },
        {
          test: /\.json$/,
          loaders: [
            'json-loader'
          ]
        }
      ]
    },
    devtool: 'source-map'
  })
  .pipe(gulp.dest('build/'));
});

gulp.task('pre-test', () => {
  return gulp.src(['lib/*.js', 'commands/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('test', ['pre-test'], () => {
  return gulp.src('test/*.spec.js')
    .pipe(mocha())
    .on('error', handleError)
    .pipe(istanbul.writeReports());
});

gulp.task('watch', () => {
  gulp.watch(scripts, ['lint']);
  gulp.watch(serverScripts, ['test']);
  gulp.watch('./public/scss/**/*.scss', ['sass']);
  gulp.watch(staticFiles, ['static:dev']);
  gulp.watch(clientScripts, ['build:dev']);
});

gulp.task('watch:build', ['build:dev'], () => {
  gulp.watch(clientScripts, ['build:dev']);
});

gulp.task('default', ['watch', 'static:dev', 'build:dev', 'sass',
  'lint', 'test']);
