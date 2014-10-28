var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('js', function () {
  return gulp.src(['app/bower_components/angular/angular.min.js',
                   'app/bower_components/angular-route/angular-route.min.js',
                   'app/bower_components/angular-resource/angular-resource.min.js',
                   'app/app.js', 'app/todo/todo.js', 'app/github/github.js',
                  ])
    .pipe(concat('app-concat.js'))
    .pipe(gulp.dest('./app/'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('default', ['js']);

gulp.task('watch', function () {
  gulp.watch(['./app/app.js', './app/**/*.js'], ['js']);
});
