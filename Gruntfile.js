module.exports = function(grunt) {
  'use strict';

  // Declare JS dependencies and third-party libraries required
  var jsVendorSourceFiles = [
    'bower_components/jquery/jquery.js',
    'bower_components/lodash/dist/lodash.js',
    'bower_components/handlebars/handlebars.js',
    'bower_components/ember/ember.js',
    'bower_components/accounting/accounting.js',
    'bower_components/moment/moment.js'
  ];

  // Declare the App's source files
  var jsAppSourceFiles = [
    'js-src/app.js',
    'js-src/views/login.js'
  ];

  // Concatenate our file arrays to create a bundle we can use later
  var jsSourceFiles = jsVendorSourceFiles.concat(jsAppSourceFiles);

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
    uglify: {
      dist: {
        options: {
          sourceMap: 'js/source.map',
          sourceMappingURL: '/js/source.map',
          sourceMapRoot: '/'
        },
        files: [
          {
            src: jsSourceFiles,
            dest: 'js/app.js'
          }
        ]
      }
    },
    watch: {
      styles: {
        files: ['sass/*.scss'],
        tasks: ['compass:dev']
      },
      scripts: {
        files: jsAppSourceFiles,
        tasks: ['uglify:dist']
      }
    }
  });

  // Load the plugin tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', [
    'jshint',
    'compass:clean',
    'compass:dev',
    'uglify:dist'
  ]);

  grunt.registerTask('build-prod', [
    'jshint',
    'compass:clean',
    'compass:prod',
    'uglify:dist'
  ]);
};