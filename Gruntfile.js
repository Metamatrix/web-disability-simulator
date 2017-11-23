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
          {expand: true, cwd: 'src/', src: ['UI/css/**'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['UI/img/**'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['UI/vendor/**'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['simulations/**/*.css'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['simulations/**/*.svg'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/UI/', src: ['app.html'], dest: 'dist/UI', filter: 'isFile'},
          // {expand: true, cwd: 'src/', src: ['background.js'], dest: 'dist/', filter: 'isFile' },
          // {expand: true, cwd: 'src/', src: ['session.js'], dest: 'dist/', filter: 'isFile' },
          {expand: true, src: ['manifest.json'], dest: 'dist/', filter: 'isFile'}
          
        ]
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', [ 'copy:build', 'babel', 'browserify', 'copy:main','watch']);

};