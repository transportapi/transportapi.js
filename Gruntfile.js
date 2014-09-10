module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  var baseJsSourcePath = 'app/scripts/',
      fileToBuild = 'dist/scripts/' + 'transportapi.js';

  grunt.initConfig({
    concat: {
      dist: {
        src: '<%= customBuild.files %>',
        dest: fileToBuild
      }
    },
    uglify: {
      main: {
        files: {
          'dist/scripts/transportapi.min.js': ['dist/scripts/transportapi.js']
        }
      }
    },
    clean: {
      dist: ['tmp', 'dist']
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      all: [
        'Gruntfile.js',
        'app/scripts/**/*.js'
      ]
    }
  });

  grunt.registerTask('setup', 'build task', function() {
    var defaultFiles = [
      'transportapi'
    ],
    args = this.args, customFiles = [], index, i = -1;

    if (args.length) {
      while (++i < args.length) {
        index = defaultFiles.indexOf(args[i]);
        if (index !== -1) {
          defaultFiles.splice(index, 1);
        }
      }
    }

    customFiles = defaultFiles.map(function(currentFile) {
      return baseJsSourcePath + currentFile + '.js';
    });

    grunt.config.set('customBuild.files', customFiles);
  });

  // TODO Add jshint!
  grunt.registerTask('build', [
    'jshint',
    'clean:dist',
    'setup',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('default', ['build']);
};
