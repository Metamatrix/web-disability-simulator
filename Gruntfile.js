module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    babel: {
      options: {
          sourceMap: true,
          presets: ['babel-preset-es2015']
      },
      dist: {
        files: [
          {
            expand: true, 
            cwd: 'src/', 
            src: ['**/*.js', '!UI/vendor/**'],
            dest: 'build/js/babel/', 
            filter: 'isFile'
          }
        ]
      }
    },
    browserify: {
      options: {
        browserifyOptions: { debug: true },
        transform: [["babelify", { "presets": ["es2015"] }]]
      },
      dist: {
        files: [
          {
            expand: true, 
            cwd: 'build/js/babel/', 
            src: ['**/*.js', '!UI/vendor/**'],
            dest: 'dist', 
            filter: 'isFile'
          }
        ]
      }
    },
    watch: {
      dist: {
        files: 'src/**/*',
        tasks: ['default'],
      }
    },
    copy: {
      build: {
        files: [
          {
            expand: true, 
            cwd: 'src/', 
            src: ['**/*.json', 'UI/vendor/**/*.js'], 
            dest: 'build/js/babel/', 
            filter: 'isFile'
          }
        ]
      },
      main: {
        files: [
          {expand: true, cwd: 'src/', src: ['UI/css/**', 'UI/img/**', 'UI/vendor/**', 'simulations/**/*.{css,svg,json}'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/UI/', src: ['app.html'], dest: 'dist/UI', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['manifest.json'], dest: 'dist/', filter: 'isFile'}
        ]
      }
    },
    eslint: {
      options: {
          config: '.eslintrc.json',
          reset: false,
          outputFile: 'eslint/report/eslintreport.txt'
      },
      target: ['src/**/*.js']
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-eslint');

  // Default task(s).
  grunt.registerTask('default', ['eslint', 'copy:build', 'babel', 'browserify', 'copy:main', 'watch']);

};