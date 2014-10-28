var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gettext = require('gulp-angular-gettext');


gulp.task('js', function () {
  return gulp.src(['app/bower_components/angular/angular.min.js',
                   'app/bower_components/angular-route/angular-route.min.js',
                   'app/bower_components/angular-resource/angular-resource.min.js',
                   'app/bower_components/angular-gettext/dist/angular-gettext.min.js',
                   'app/app.js', 'app/todo/todo.js', 'app/github/github.js',
                   'po/*.js',
                  ])
    .pipe(concat('app-concat.js'))
    .pipe(gulp.dest('./app/'))
//    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./app/'));
});

gulp.task('default', ['js']);

gulp.task('pot', function() {
  return gulp.src(['app/*/partials/*.html'])
    .pipe(gettext.extract('template.pot'))
    .pipe(gulp.dest('po'));
});

gulp.task('po', function() {
  return gulp.src(['po/*.po'])
    .pipe(gettext.compile())
    .pipe(gulp.dest('po'));
});

gulp.task('watch', function () {
  gulp.watch(['./app/app.js', './app/**/*.js'], ['js']);
});
