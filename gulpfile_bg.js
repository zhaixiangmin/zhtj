/**
 * Created by licong on 2017/12/23.
 */

// 后台 -- bg
// 复制vendor目录
gulp.task('bg_vendor', function () {
    return gulp.src('dev/bg/public/vendor/**/*.*')
        .pipe(gulp.dest('build/bg/public/vendor'));
});

// 复制json目录
gulp.task('bg_json', function () {
    return gulp.src('dev/bg/public/json/**/*.*')
        .pipe(gulp.dest('build/bg/public/json'));
});

// 生成img目录 -- 给修改过文件添加后缀，并生成版本号清单(不压缩)
gulp.task('bg_miniImg', function () {
    return gulp.src('dev/bg/public/img/**/*.*')
        .pipe(changed('dev/bg/public/img/**/*.*'))
        .pipe(rev())
        .pipe(gulp.dest('build/bg/public/img'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/bg/public/rev/img'));
});

// 更新css(引入的JS、CSS、图片 文件版本)
gulp.task('bg_revCss', function(){
    return gulp.src(['build/bg/public/rev/**/*.json', 'dev/bg/**/*.css'])
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('build/bg'));
});

// 更新js(引入的JS、CSS、图片 文件版本)
gulp.task('bg_revJs', function(){
    return gulp.src(['build/bg/public/rev/**/*.json', 'dev/bg/**/*.js'])
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('build/bg'));
});

//压缩custom文件夹/生成版本号(css)
gulp.task('bg_miniCustomCss', function () {
    return gulp.src('build/bg/public/custom/**/*.css')
        .pipe(changed('build/bg/public/custom/**/*.css', { extension: '.css' }))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest('build/bg/public/custom'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/bg/public/rev/custom/css'));
});

//压缩custom文件夹/生成版本号(js)
gulp.task('bg_miniCustomJs', function () {
    return gulp.src('build/bg/public/custom/**/*.js')
        .pipe(changed('build/bg/public/custom/**/*.js', { extension: '.js' }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('build/bg/public/custom'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/bg/public/rev/custom/js'));
});

// 压缩CSS/生成版本号
gulp.task('bg_miniCss', function(){
    return gulp.src('build/bg/public/css/**/*.css')
        .pipe(changed('build/bg/public/css/**/*.css', { extension: '.css' })) // 只改文件通过
        .pipe(minifyCss())
        .pipe(rev())                                      			//- 文件名加MD5后缀
        .pipe(gulp.dest('build/bg/public/css'))
        .pipe(rev.manifest())                                   	//- 生成一个rev-manifest.json
        .pipe(gulp.dest('build/bg/public/rev/css'));            //- 将 rev-manifest.json 保存到 rev 目录内
});

//压缩JS/生成版本号
gulp.task('bg_miniJs', function () {
    return gulp.src('build/bg/public/js/**/*.js')
        .pipe(changed('build/bg/public/js/**/*.js', { extension: '.js' }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('build/bg/public/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/bg/public/rev/js'));
});

// 更新html(引入的JS、CSS、图片 文件版本)
gulp.task('bg_revHtml', function(){
    return gulp.src(['build/bg/public/rev/**/*.json', 'dev/bg/**/*.html'])
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('build/bg'));
});


// 顺序实行(包括不添加后缀文件) -- bg_all
gulp.task('bg_all', function() {
    runSequence('bg_vendor', 'bg_json', 'bg_miniImg', 'bg_revCss', 'bg_revJs', 'bg_miniCustomCss', 'bg_miniCustomJs', 'bg_miniCss', 'bg_miniJs', 'bg_revHtml');
});

// 顺序实行 -- bg
gulp.task('bg', function() {
    runSequence('bg_miniImg', 'bg_revCss', 'bg_revJs', 'bg_miniCustomCss', 'bg_miniCustomJs', 'bg_miniCss', 'bg_miniJs', 'bg_revHtml');
});