/**
 * Created by licong on 2017/12/23.
 */

// 企业号 -- enterprise
// 复制vendor目录
gulp.task('enterprise_vendor', function () {
    return gulp.src('dev/enterprise/public/vendor/**/*.*')
        .pipe(gulp.dest('build/enterprise/public/vendor'));
});

// 复制json目录
gulp.task('enterprise_json', function () {
    return gulp.src('dev/enterprise/public/json/**/*.*')
        .pipe(gulp.dest('build/enterprise/public/json'));
});

// 生成img目录 -- 给修改过文件添加后缀，并生成版本号清单(不压缩)
gulp.task('enterprise_miniImg', function () {
    return gulp.src('dev/enterprise/public/img/**/*.*')
        .pipe(changed('dev/enterprise/public/img/**/*.*'))
        .pipe(rev())
        .pipe(gulp.dest('build/enterprise/public/img'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/enterprise/public/rev/img'));
});

// 更新css(引入的JS、CSS、图片 文件版本)
gulp.task('enterprise_revCss', function(){
    return gulp.src(['build/enterprise/public/rev/**/*.json', 'dev/enterprise/**/*.css'])
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('build/enterprise'));
});

// 更新js(引入的JS、CSS、图片 文件版本)
gulp.task('enterprise_revJs', function(){
    return gulp.src(['build/enterprise/public/rev/**/*.json', 'dev/enterprise/**/*.js'])
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('build/enterprise'));
});

//压缩custom文件夹/生成版本号(css)
gulp.task('enterprise_miniCustomCss', function () {
    return gulp.src('build/enterprise/public/custom/**/*.css')
        .pipe(changed('build/enterprise/public/custom/**/*.css', { extension: '.css' }))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest('build/enterprise/public/custom'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/enterprise/public/rev/custom/css'));
});

//压缩custom文件夹/生成版本号(js)
gulp.task('enterprise_miniCustomJs', function () {
    return gulp.src('build/enterprise/public/custom/**/*.js')
        .pipe(changed('build/enterprise/public/custom/**/*.js', { extension: '.js' }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('build/enterprise/public/custom'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/enterprise/public/rev/custom/js'));
});

// 压缩CSS/生成版本号
gulp.task('enterprise_miniCss', function(){
    return gulp.src('build/enterprise/public/css/**/*.css')
        .pipe(changed('build/enterprise/public/css/**/*.css', { extension: '.css' })) // 只改文件通过
        .pipe(minifyCss())
        .pipe(rev())                                      			//- 文件名加MD5后缀
        .pipe(gulp.dest('build/enterprise/public/css'))
        .pipe(rev.manifest())                                   	//- 生成一个rev-manifest.json
        .pipe(gulp.dest('build/enterprise/public/rev/css'));            //- 将 rev-manifest.json 保存到 rev 目录内
});

//压缩JS/生成版本号
gulp.task('enterprise_miniJs', function () {
    return gulp.src('build/enterprise/public/js/**/*.js')
        .pipe(changed('build/enterprise/public/js/**/*.js', { extension: '.js' }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('build/enterprise/public/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/enterprise/public/rev/js'));
});

// 更新html(引入的JS、CSS、图片 文件版本)
gulp.task('enterprise_revHtml', function(){
    return gulp.src(['build/enterprise/public/rev/**/*.json', 'dev/enterprise/**/*.html'])
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('build/enterprise'));
});


// 顺序实行(包括不添加后缀文件) -- enterprise_all
gulp.task('enterprise_all', function() {
    runSequence('enterprise_vendor', 'enterprise_json', 'enterprise_miniImg', 'enterprise_revCss', 'enterprise_revJs', 'enterprise_miniCustomCss', 'enterprise_miniCustomJs', 'enterprise_miniCss', 'enterprise_miniJs', 'enterprise_revHtml');
});

// 顺序实行 -- enterprise
gulp.task('enterprise', function() {
    runSequence('enterprise_miniImg', 'enterprise_revCss', 'enterprise_revJs', 'enterprise_miniCustomCss', 'enterprise_miniCustomJs', 'enterprise_miniCss', 'enterprise_miniJs', 'enterprise_revHtml');
});