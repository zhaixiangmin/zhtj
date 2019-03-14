/**
 * Created by licong on 2017/12/23.
 */


// wechat
// 复制vendor目录
gulp.task('wechat_vendor', function () {
    return gulp.src('dev/wechat/public/vendor/**/*.*')
        .pipe(gulp.dest('build/wechat/public/vendor'));
});

// 生成img目录 -- 给修改过文件添加后缀，并生成版本号清单(不压缩)
gulp.task('wechat_miniImg', function () {
    return gulp.src('dev/wechat/public/img/**/*.*')
        .pipe(changed('dev/wechat/public/img/**/*.*'))
        .pipe(rev())
        .pipe(gulp.dest('build/wechat/public/img'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/wechat/public/rev/img'));
});

// 更新css(引入的JS、CSS、图片 文件版本)
gulp.task('wechat_revCss', function(){
    return gulp.src(['build/wechat/public/rev/**/*.json', 'dev/wechat/**/*.css'])
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('build/wechat'));
});

// 更新js(引入的JS、CSS、图片 文件版本)
gulp.task('wechat_revJs', function(){
    return gulp.src(['build/wechat/public/rev/**/*.json', 'dev/wechat/**/*.js'])
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('build/wechat'));
});

//压缩custom文件夹/生成版本号(css)
gulp.task('wechat_miniCustomCss', function () {
    return gulp.src('build/wechat/public/custom/**/*.css')
        .pipe(changed('build/wechat/public/custom/**/*.css', { extension: '.css' }))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest('build/wechat/public/custom'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/wechat/public/rev/custom/css'));
});

//压缩custom文件夹/生成版本号(js)
gulp.task('wechat_miniCustomJs', function () {
    return gulp.src('build/wechat/public/custom/**/*.js')
        .pipe(changed('build/wechat/public/custom/**/*.js', { extension: '.js' }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('build/wechat/public/custom'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/wechat/public/rev/custom/js'));
});

// 压缩CSS/生成版本号
gulp.task('wechat_miniCss', function(){
    return gulp.src('build/wechat/public/css/**/*.css')
        .pipe(changed('build/wechat/public/css/**/*.css', { extension: '.css' })) // 只改文件通过
        .pipe(minifyCss())
        .pipe(rev())                                      			//- 文件名加MD5后缀
        .pipe(gulp.dest('build/wechat/public/css'))
        .pipe(rev.manifest())                                   	//- 生成一个rev-manifest.json
        .pipe(gulp.dest('build/wechat/public/rev/css'));            //- 将 rev-manifest.json 保存到 rev 目录内
});

//压缩JS/生成版本号
gulp.task('wechat_miniJs', function () {
    return gulp.src('build/wechat/public/js/**/*.js')
        .pipe(changed('build/wechat/public/js/**/*.js', { extension: '.js' }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('build/wechat/public/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/wechat/public/rev/js'));
});

// 更新html(引入的JS、CSS、图片 文件版本)
gulp.task('wechat_revHtml', function(){
    return gulp.src(['build/wechat/public/rev/**/*.json', 'dev/wechat/**/*.html'])
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('build/wechat'));
});

// 顺序实行(包括不添加后缀文件) -- wechat
gulp.task('wechat_all', function() {
    runSequence('wechat_vendor', 'wechat_miniImg', 'wechat_revCss', 'wechat_revJs', 'wechat_miniCustomCss', 'wechat_miniCustomJs', 'wechat_miniCss', 'wechat_miniJs', 'wechat_revHtml');
});

// 顺序实行 -- wechat
gulp.task('wechat', function() {
    runSequence('wechat_miniImg', 'wechat_revCss', 'wechat_revJs', 'wechat_miniCustomCss', 'wechat_miniCustomJs', 'wechat_miniCss', 'wechat_miniJs', 'wechat_revHtml');
});