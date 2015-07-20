module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "bower": {
            "dev-install": {
                "options": {
                    "targetDir": "./src/lib",
                    "layout": "byComponent",
                    "install": true,
                    "verbose": false,
                    "cleanTargetDir": false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('dev-build', ['bower:dev-install']);
};
