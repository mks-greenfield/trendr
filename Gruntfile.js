module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      files: ['public/**/*.js','utilities/**/*.js','server.js'],
    },

    watch: {
      files: ['public/**/*.js','utilities/**/*.js','server.js'],
      tasks: ['jshint']
    }
  });

  //Automatic desktop notifications for Grunt errors and warnings
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

/*************************************************************
Run `$ grunt jshint` before submitting PR
Or run `$ grunt` with no arguments to watch files
**************************************************************/

  grunt.registerTask('default', ['watch']);

};