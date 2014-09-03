module.exports = function(grunt) {
  'use strict'

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
      all: ['app/scripts/**/*.js'],
      options: {
        curly: true,
        multistr: true,
        quotmark: 'single',
        camelcase: false,
        bitwise: false,
        unused: true,
        eqeqeq: true,
        indent: 2,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        es5: true,
        eqnull: true,
        evil: true,
        scripturl: true,
        smarttabs: true,
        maxparams: 5,
        maxdepth: 3,
        maxlen: 80,
        globals: {}
      }
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
  grunt.registerTask('build', ['clean:dist', 'setup', 'concat', 'uglify']);

  grunt.registerTask('default', ['build']);
};
