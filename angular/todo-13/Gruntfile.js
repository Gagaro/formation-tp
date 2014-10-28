module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      build: {
        src: ['app/bower_components/angular/angular.min.js',
              'app/bower_components/angular-route/angular-route.min.js',
              'app/bower_components/angular-resource/angular-resource.min.js',
              'app/app.js', 'app/todo/todo.js', 'app/github/github.js',
             ],
        dest: 'app/app-concat.js',
      }
    },
    uglify: {
      build: {
        src: 'app/app-concat.js',
        dest: 'app/app.min.js'
      }
    },
    watch: {
      build: {
        files: ['app/**/*.js', 'app/app.js'],
        tasks: ['default'],
      }
    }
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);
};
