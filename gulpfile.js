var gulp = require("gulp");
var babel = require("gulp-babel");
var react = require("gulp-react");
var uglify = require("gulp-uglify");
var less = require("gulp-less");
//var sass = require("gulp-sass");
var minify = require("gulp-minify-css");
var autoPrefix = require("gulp-autoprefixer");
var domSrc = require("gulp-dom-src");

var connect = require("gulp-connect");

//tool
var replace = require("gulp-replace");
var concat = require("gulp-concat");

var path = require("path");
var arg = require("yargs").argv;//获取命令参数


var src = {
	jsx:"./src/jsx",
	less:"./src/less",
	sass:"./src/sass",
	es6:"./src/es6/",
	html:"./src/html"
}

var dist = {
	js:"./dist/js",
	less:"./dist/css/less",
	sass:"./dist/css/sass",
	es6:"./dist/es6",
	html:"./dist/html"
}


gulp.task("help",function(){
	console.log("gulp ---------- 默认命令（输出默认）");
	console.log("gulp watch ---------- 监听以下task");
	console.log("gulp jsx ---------- jsx转化为js,混淆压缩");
	console.log("gulp less ---------- less转化为css,压缩,前缀补全");
	console.log("gulp es6 ---------- es6语法转换为es5");
	console.log("gulp server ---------- 创建服务器");
});


gulp.task("default",function(){
	console.log("默认");
});

//jsx
gulp.task("jsx",function(){
	return gulp.src(path.join(src.jsx,"/**/*.jsx"))
		.pipe(react())
		.pipe(uglify())
		.pipe(gulp.dest(path.join(dist.js)));
});

//less
gulp.task("less",function(){
	return gulp.src(path.join(src.less,"/**/*.less"))
		.pipe(less())
		.pipe(autoPrefix())
		.pipe(minify())
		.pipe(gulp.dest(path.join(dist.less)));
});

// //sass
// gulp.task("sass",function(){
// 	return gulp.src(path.join(src.sass,"/**/*.scss"))
// 		.pipe(sass())
// 		.pipe(minify())
// 		.pipe(gulp.dest(path.join(dist.sass)));
// });

gulp.task("es6",function(){
	return gulp.src(path.join(src.es6,"/**/*.jsx"))
		.pipe(babel({presets:["es2015"]}))
		.pipe(react())
		.pipe(uglify())
		.pipe(gulp.dest(path.join(dist.es6)))
});


//
gulp.task("html",function(){
	var curPath = path.join(src.html,"/index.html");
	console.log(curPath);

	return domSrc({file:curPath,selector: 'script', attribute: 'src'})
		// .pipe(concat("index.js"))
		// .pipe(babel({presets:["es2015"]}))
		// .pipe(react())
		// .pipe(uglify())
		// .pipe(gulp.dest(path.join(dist.html,"/js")))

	// return gulp.src(curPath)
	// 	.pipe()
});

gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true
	});
});




gulp.task("watch",function(){
	var watch = gulp.watch(
		[
			path.join(src.jsx,"/**/*.jsx"),
			path.join(src.less,"/**/*.less"),
			path.join(src.es6,"/**/*.jsx")
		],
		["jsx","less","es6"]);

	watch.on("change",function(e){
		console.log("["+e.type+"]",e.path.replace(__dirname,""));
	});
});



