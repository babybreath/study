'use strict';

const gulp = require('gulp');                               // gulp
const del = require('del');                                 // 删除文件夹
const concat = require('gulp-concat');                      // 文件合并
const cleanCss = require('gulp-clean-css');                 // css压缩处理
const uglify = require('gulp-uglify');                      // js压缩处理
const rev = require('gulp-rev');                            // 文件哈希值处理
const revReplace = require('gulp-rev-replace');             // 文件哈希值处理后路径处理


const srcPath = 'src';                                      // 前端代码根目录
const srcHtml = srcPath + '/**/*.html';                     // html 源码
const srcCss = srcPath + '/**/*.css';                       // css 源码
const srcJs = srcPath + '/**/*.js';                         // js 源码
const buildPath = 'dist';                                   // 构建输出目录

const outputCss = 'output.css';                             // css合并后的文件名称
const outputJs = 'output.js';                               // js合并后的文件名称

const revCss = 'rev-css.json';                              // rev处理css路径文件名
const revJs = 'rev-js.json';                                // rev处理js路径文件名


gulp.task('del', function(){
    return del(buildPath);
});

gulp.task('css', ['del'], function() {
    return gulp.src(srcCss)
        .pipe(concat(outputCss))
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(rev())
        .pipe(gulp.dest(buildPath))
        .pipe(rev.manifest(revCss))
        .pipe(gulp.dest(buildPath));
});

gulp.task('js', ['css'], function(){
    return gulp.src(srcJs)
        .pipe(concat(outputJs))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(buildPath))
        .pipe(rev.manifest(revJs))
        .pipe(gulp.dest(buildPath));
});

gulp.task('html', ['js'], function(){
    var cssJson = gulp.src(buildPath + '/' + revCss);
    var jsJson = gulp.src(buildPath + '/' + revJs);
   return gulp.src(srcHtml)
       .pipe(revReplace({manifest: cssJson}))
       .pipe(revReplace({manifest: jsJson}))
       .pipe(gulp.dest(buildPath));
});

gulp.task('default', ['html']);