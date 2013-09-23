module.exports = function(grunt) {
  'use strict';

  // Declare the App's source files
  var jsAppSourceFiles = grunt.file.expand('js-src/**/*.js');
  var imgFolder = 'images';
  var jsAppFinalTarget = 'js/app.js';

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
        jsAppFinalTarget,
        'stylesheets/*.css'
      ]
    },
    version: {
      defaults: {
        options: {
          prefix: 'App.VERSION\\s+=\\s+[\'"]'
        },
        src: [jsAppFinalTarget]
      }
    },
    cdn: {
      options: {
        cdn: 'http://cdn.localhost/',
        flatten: true
      },
      dist: {
        src: 'index.html'
      }
    },
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: imgFolder,
            src: ['icon-*.png'],
            dest: imgFolder
          }
        ]
      }
    },
    uglify: {
      options: {
        compress: {
          dead_code: true
        }
      }
    },
    override_has: {
      prod: {
        options: {
          tests: {
            debug: false
          }
        },
        files: [
          { src: jsAppFinalTarget, dest: jsAppFinalTarget }
        ]
      }
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
  grunt.loadNpmTasks('grunt-version');
  grunt.loadNpmTasks('grunt-cdn');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-override-has');

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
    'imagemin',
    'useminPrepare',
    'concat',
    'override_has:prod',
    'uglify',
    'rev',
    'usemin'
  ]);
};