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
          files: {
              'build/js/babel/babel.js': 'src/app.js'
          }
      }
    },
    uglify: {
      dist: {
        files: {
          'build/js/script.uglify.js': 
            [ 'src/UI/vendor/jquery/jquery-2.0.3.min.js',
              'src/UI/vendor/bootstrap/bootstrap.min.js',
              'src/UI/js/data.js',
              'build/js/babel/babel.js'
              //'src/simulations/vendor/D3/d3.js',
              //'src/simulations/vendor/daltonize/daltonize.js'
            ]
        }
      },
      dev: {
        options: {
          beautify: true,
          mangle: false,
          compress: false
        },
        files: {
          'build/js/script.uglify.js': 
            [ 'src/UI/vendor/jquery/jquery-2.0.3.min.js',
              'src/UI/vendor/bootstrap/bootstrap.min.js',
              'src/UI/js/data.js',
              'build/js/babel/babel.js'
              //'src/simulations/vendor/D3/d3.js',
              //'src/simulations/vendor/daltonize/daltonize.js'                             
            ]
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/script.min.js': ['build/js/script.uglify.js']
        },

      },
      options: {
        browserifyOptions: { debug: true },
        transform: [["babelify", { "presets": ["es2015"] }]],
      }
    },
    watch: {
      dev: {
        files: 'src/**/**/*.js',
        tasks: ['default'],
      },
      dist: {
        files: 'src/**/**/*.js',
        tasks: ['dist'],
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, cwd: 'src/', src: ['UI/css/**'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['UI/img/**'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['UI/vendor/bootstrap/bootstrap.min.css'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['UI/vendor/bootstrap/bootstrap.min.css'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['simulations/**'], dest: 'dist/', filter: 'isFile'},

          {expand: true, cwd: 'src/UI/', src: ['app.html'], dest: 'dist/UI', filter: 'isFile'},
          {expand: true, src: ['manifest.json'], dest: 'dist/', filter: 'isFile'},
        ],
      },
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['babel', 'uglify:dev', 'browserify', 'copy','watch:dev']);
  grunt.registerTask('dist', ['babel', 'uglify:dist', 'browserify', 'copy', 'watch:dist']);

};