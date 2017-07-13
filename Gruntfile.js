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
              'dist/js/babel/babel.js': 'src/app.js'
          }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/js/script.min.js': 
            [ 'src/UI/vendor/jquery/jquery-2.0.3.min.js',
              'src/UI/vendor/bootstrap/bootstrap.min.js',
              'src/UI/js/data.js',
              'dist/js/babel/babel.js'                                
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
          'dist/js/script.min.js': 
            [ 'src/UI/vendor/jquery/jquery-2.0.3.min.js',
              'src/UI/vendor/bootstrap/bootstrap.min.js',
              'src/UI/js/data.js',
              'dist/js/babel/babel.js'                                
                                  ]
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/js/script.min.browserify.js': ['dist/js/script.min.js']
        },

      },
      options: {
        browserifyOptions: { debug: true },
        transform: [["babelify", { "presets": ["es2015"] }]],
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
  grunt.registerTask('dev', ['babel', 'uglify', 'browserify']);
  grunt.registerTask('dist', ['babel', 'uglify', 'browserify']);

};