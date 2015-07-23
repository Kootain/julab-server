'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-express-server');

    // Configurable paths for the app
    var appConfig = {
        app: 'app',
        dist: 'src'
    };

    // Grunt configuration
    grunt.initConfig({

        // Project settings
        inspinia: appConfig,

        express: {
            options: {
              // Override defaults here 
            },
            dev: {
              options: {
                script: 'server.js'
              }
            }
        },

        'node-inspector': {
          dev: {
            options: {
              'web-port': 3000,
              'web-host': 'localhost',
              'debug-port': 5858,
              'save-live-edit': true,
              'stack-trace-limit': 10,
              'hidden': ['node_modules']
            }
          }
        },

        inject: {
            single: {
                scriptSrc: 'workflow.js',
                files: {
                  '<%= inspinia.dist %>/index.html': '<%= inspinia.app %>/index.html'
                }
            },
        },

        nodemon:{
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: '3000'
                    },
                    // omit this property if you aren't serving HTML files and  
                    // don't want to open a browser tab on start 
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    
                        // opens browser on initial server start 
                        nodemon.on('config:update', function () {
                          // Delay before server listens on port 
                          setTimeout(function() {
                            require('open')('http://localhost:3000/');
                          }, 500);
                        });
             
                        // refreshes browser when server reboots 
                        nodemon.on('restart', function () {
                            // Delay before server listens on port 
                            setTimeout(function() {
                            require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },

        concurrent: {
          dev: {
            tasks: ['nodemon', 'node-inspector', 'watch'],
            options: {
              logConcurrentOutput: true
            }
          }
        },
        // The grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= inspinia.dist %>'
                }
            }
        },
        // Compile less to css
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    "app/styles/style.css": "app/less/style.less"
                }
            }
        },
        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['app/less/**/*.less'],
                tasks: ['less', 'copy:styles'],
                options: {
                    nospawn: true,
                    livereload: '<%= connect.options.livereload %>'
                },
            },
            js: {
                files: ['<%= inspinia.app %>/scripts/{,*/}*.js'],
                tasks:['uglify'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            img:{
                files: ['app/img/**/*.*'],
                tasks: ['copy:dist'],
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= inspinia.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= inspinia.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            server: {
                files: ['.rebooted'],
                options: {
                  livereload: true
                }
              } 
        },
        // If you want to turn on uglify you will need write your angular code with string-injection based syntax
        // For example this is normal syntax: function exampleCtrl ($scope, $rootScope, $location, $http){}
        // And string-injection based syntax is: ['$scope', '$rootScope', '$location', '$http', function exampleCtrl ($scope, $rootScope, $location, $http){}]
        uglify: {
            options: {
                mangle: false
            }
        },
        // Clean dist folder
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= inspinia.dist %>/{,*/}*',
                        '!<%= inspinia.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= inspinia.app %>',
                        dest: '<%= inspinia.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'styles/patterns/*.*',
                            'img/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= inspinia.dist %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= inspinia.dist %>'
                    },
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= inspinia.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            js: {
                expand: true,
                cwd: '<%= inspinia.app %>/scripts',
                dest: '<%= inspinia.dist %>/scripts/',
                src: '*.js'
            },
            tmp: {
                files:[
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        dest: '<%= inspinia.dist %>/scripts',
                        src: '*.*'
                    },
                    {
                        expand: true,
                        cwd: '.tmp/concat/styles',
                        dest: '<%= inspinia.dist %>/styles',
                        src: '*.*'
                    }
                ]
            },
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= inspinia.dist %>/scripts/{,*/}*.js',
                    '<%= inspinia.dist %>/styles/{,*/}*.css',
                    '<%= inspinia.dist %>/styles/fonts/*'
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= inspinia.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= inspinia.dist %>'
                }]
            }
        },
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'src'
            }
        },
        usemin: {
            html: ['src/index.html']
        }
    });

    // Run live version of app
    grunt.registerTask('live', [
        'clean:server',
        'copy:styles',
        'connect:livereload',
        'watch'
    ]);

    // Run build version of app
    grunt.registerTask('run', [
        'build',
        'concurrent'
    ]);

        // Build version for production
    grunt.registerTask('build', [
        'clean:dist',
        'less',
        'useminPrepare',
        'concat',
        'copy:dist',
        'copy:tmp',
        'filerev',
        'inject',
        'usemin',

    ]);

    // Build version for production
    grunt.registerTask('release', [
        'clean:dist',
        'less',
        'useminPrepare',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'inject',
        'usemin',
        'htmlmin'
    ]);

};
