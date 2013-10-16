module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				mangle: true,
				mangleToplevel: true,
				compress: {
					unsafe: true
				}
			},
			def: {
				files: {
					'dist/textwidth.min.js': ['src/textwidth.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', 'uglify');

};