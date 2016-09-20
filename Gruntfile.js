/*----------------------------------------------------*/
/*Module Setting*/
/*----------------------------------------------------*/
module.exports = function (grunt) {
    // LiveReload的默认端口号，你也可以改成你想要的端口号
    var lrPort = 35732;
    // 使用connect-livereload模块，生成一个与LiveReload脚本
    // &lt;script src=&quot;http://127.0.0.1:35729/livereload.js?snipver=1&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
    var lrSnippet = require('connect-livereload')({port: lrPort});
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
    var lrMiddleware = function (connect, options) {
        return [
            // 把脚本，注入到静态文件中
            lrSnippet,
            // 静态文件服务器的路径
            serveStatic(options.base[0]),
            // 启用目录浏览(相当于IIS中的目录浏览)
            serveIndex(options.base[0])
        ];
    };

    var sassWork=[{
        expand: true,
        cwd: 'assets/sources/css/',
        src: ['**/*.scss'],
        dest: 'assets/dist/css/',
        ext: '.css'
    }];
    var jsWork=[
        'test/**/*.js',
        'games/**/*.js',
        'test/**/*.json',
        'games/**/*.json',
        'example/easing/**/*.js',
        'example/drag/**/*.js'
    ];
    var cssWork=[
        'assets/sources/**/*.sass',
        'assets/sources/**/*.scss',
        'example/easing/**/*.css',
        'example/drag/**/*.css'
    ];
    var htmlWork=[
        '**/*.html',
        'games/**/*.html',
        'test/**/*.html',
        'example/easing/**/*.html',
        'example/drag/**/*.html'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 通过connect任务，创建一个静态服务器
        connect: {
            options: {
                // 服务器端口号
                port: 8091,
                // 服务器地址(可以使用主机名localhost，也能使用IP)
                //hostname: 'localhost',
                hostname: '172.17.2.53',
                // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
                base: '.'
            },
            livereload: {
                options: {
                    // 通过LiveReload脚本，让页面重新加载。
                    middleware: lrMiddleware
                }
            }
        },
        //task sass
        sass: {
            dist: {
                option: {
                    style: 'compact',
                    update: true,
                    sourceMap: true
                },
                files: sassWork
            }
        },
        watch: {
            css: {
                options: {
                    livereload: lrPort
                },
                files: cssWork,
                tasks: [/*'sass'*/]
            },
            js: {
                options: {
                    livereload: lrPort
                },
                files: jsWork,
                tasks: []
            },
            html: {
                options: {
                    livereload: lrPort
                },
                files: htmlWork,
                tasks: []
            }
        }
    });

    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Build task(s).
    grunt.registerTask('default', []); //默认任务
    grunt.registerTask('live', ['connect', 'watch']);//动态监听修改的文件并自动刷新浏览器
};
