var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');                     //- 压缩CSS为一行;
var rev = require('gulp-rev');                                  //- 对文件名加MD5后缀
let revCollector = require('gulp-rev-collector');               //- 路径替换
let changed = require('gulp-changed');							//- 只改文件通过
let runSequence = require('run-sequence');                      //- 控制task顺序
let uglify = require('gulp-uglify');							//- 混淆js
let imagemin = require('gulp-imagemin');                        //- 图片压缩
let clean = require('gulp-clean');                              //- 清理文件


//文件清理
gulp.task('clean', function () {
	return gulp.src('build')
		.pipe(clean());
});


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



// 全部执行(先删除后添加)
gulp.task('all_replace', function() {
	runSequence(
	'clean', 
	'bg_vendor', 'bg_json', 'bg_miniImg', 'bg_revCss', 'bg_revJs', 'bg_miniCustomCss', 'bg_miniCustomJs', 'bg_miniCss', 'bg_miniJs', 'bg_revHtml',
		'enterprise_vendor', 'enterprise_json', 'enterprise_miniImg', 'enterprise_revCss', 'enterprise_revJs', 'enterprise_miniCustomCss', 'enterprise_miniCustomJs', 'enterprise_miniCss', 'enterprise_miniJs', 'enterprise_revHtml',
		'wechat_vendor', 'wechat_miniImg', 'wechat_revCss', 'wechat_revJs', 'wechat_miniCustomCss', 'wechat_miniCustomJs', 'wechat_miniCss', 'wechat_miniJs', 'wechat_revHtml',
		'contact_vendor', 'contact_miniImg', 'contact_revCss', 'contact_revJs', 'contact_miniCustomCss', 'contact_miniCustomJs', 'contact_miniCss', 'contact_miniJs', 'contact_revHtml'
		);
});
