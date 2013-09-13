module.exports = function(grunt) {
  'use strict';

  // Declare the App's source files
  var jsAppSourceFiles = grunt.file.expand('js-src/**/*.js');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: 'js-src/.jshintrc'
      },
      files: {
        src: jsAppSourceFiles
      }
    },
    compass: {
      clean: {
        options: {
          clean: true
        }
      },
      dev: {
        options: {
          environment: 'development'
        }
      },
      prod: {
        options: {
          environment: 'production',
          outputStyle: 'compressed'
        }
      }
    },
    watch: {
      styles: {
        files: ['sass/*.scss'],
        tasks: ['compass:dev']
      }
    },
    useminPrepare: {
      html: 'index.html'
    },
    usemin: {
      html: 'index.html'
    },
    rev: {
      files: [
        'js/app.js',
        'stylesheets/*.css'
      ]
    }
  });

  // Load the plugin tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-rev');

  // Default task(s).
  grunt.registerTask('default', [
    'jshint',
    'compass:clean',
    'compass:dev'
  ]);

  grunt.registerTask('build-prod', [
    'jshint',
    'compass:clean',
    'compass:prod',
    'useminPrepare',
    'concat',
    'uglify',
    'rev',
    'usemin'
  ]);
};