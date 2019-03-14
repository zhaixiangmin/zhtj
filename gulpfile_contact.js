/**
 * Created by licong on 2018/6/5.
 */


// contact
// 复制vendor目录
gulp.task('contact_vendor', function () {
    return gulp.src('dev/contact/public/vendor/**/*.*')
        .pipe(gulp.dest('build/contact/public/vendor'));
});

// 生成img目录 -- 给修改过文件添加后缀，并生成版本号清单(不压缩)
gulp.task('contact_miniImg', function () {
    return gulp.src('dev/contact/public/img/**/*.*')
        .pipe(changed('dev/contact/public/img/**/*.*'))
        .pipe(rev())
        .pipe(gulp.dest('build/contact/public/img'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/contact/public/rev/img'));
});

// 更新css(引入的JS、CSS、图片 文件版本)
gulp.task('contact_revCss', function(){
    return gulp.src(['build/contact/public/rev/**/*.json', 'dev/contact/**/*.css'])
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('build/contact'));
});

// 更新js(引入的JS、CSS、图片 文件版本)
gulp.task('contact_revJs', function(){
    return gulp.src(['build/contact/public/rev/**/*.json', 'dev/contact/**/*.js'])
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('build/contact'));
});

//压缩custom文件夹/生成版本号(css)
gulp.task('contact_miniCustomCss', function () {
    return gulp.src('build/contact/public/custom/**/*.css')
        .pipe(changed('build/contact/public/custom/**/*.css', { extension: '.css' }))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest('build/contact/public/custom'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/contact/public/rev/custom/css'));
});

//压缩custom文件夹/生成版本号(js)
gulp.task('contact_miniCustomJs', function () {
    return gulp.src('build/contact/public/custom/**/*.js')
        .pipe(changed('build/contact/public/custom/**/*.js', { extension: '.js' }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('build/contact/public/custom'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/contact/public/rev/custom/js'));
});

// 压缩CSS/生成版本号
gulp.task('contact_miniCss', function(){
    return gulp.src('build/contact/public/css/**/*.css')
        .pipe(changed('build/contact/public/css/**/*.css', { extension: '.css' })) // 只改文件通过
        .pipe(minifyCss())
        .pipe(rev())                                      			//- 文件名加MD5后缀
        .pipe(gulp.dest('build/contact/public/css'))
        .pipe(rev.manifest())                                   	//- 生成一个rev-manifest.json
        .pipe(gulp.dest('build/contact/public/rev/css'));            //- 将 rev-manifest.json 保存到 rev 目录内
});

//压缩JS/生成版本号
gulp.task('contact_miniJs', function () {
    return gulp.src('build/contact/public/js/**/*.js')
        .pipe(changed('build/contact/public/js/**/*.js', { extension: '.js' }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('build/contact/public/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/contact/public/rev/js'));
});

// 更新html(引入的JS、CSS、图片 文件版本)
gulp.task('contact_revHtml', function(){
    return gulp.src(['build/contact/public/rev/**/*.json', 'dev/contact/**/*.html'])
        .pipe(revCollector({replaceReved: true}))
        .pipe(gulp.dest('build/contact'));
});

// 顺序实行(包括不添加后缀文件) -- contact
gulp.task('contact_all', function() {
    runSequence('contact_vendor', 'contact_miniImg', 'contact_revCss', 'contact_revJs', 'contact_miniCustomCss', 'contact_miniCustomJs', 'contact_miniCss', 'contact_miniJs', 'contact_revHtml');
});

// 顺序实行 -- contact
gulp.task('contact', function() {
    runSequence('contact_miniImg', 'contact_revCss', 'contact_revJs', 'contact_miniCustomCss', 'contact_miniCustomJs', 'contact_miniCss', 'contact_miniJs', 'contact_revHtml');
});