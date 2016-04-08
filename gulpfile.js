var gulp = require("gulp");
var react = require("gulp-react");
var uglify = require("gulp-uglify");
var less = require("gulp-less");
var sass = require("gulp-sass");
var minify = require("gulp-minify-css");

//tool
var replace = require("gulp-replace");

var path = require("path");
var arg = require("yargs").argv;//获取命令参数


var src = {
	jsx:"./src/jsx",
	less:"./src/less",
	sass:"./src/sass"
}

var dist = {
	js:"./dist/js",
	less:"./dist/css/less",
	sass:"./dist/css/sass"
}


gulp.task("help",function(){
	console.log("gulp ---------- 默认命令（输出默认）");
	console.log("gulp jsx ---------- jsx转化为js,混淆压缩");
	console.log("gulp less ---------- less转化为css,混淆压缩");
	console.log("gulp ---------- 默认命令（输出默认）");
	console.log("gulp ---------- 默认命令（输出默认）");
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
		// .pipe(minify())
		.pipe(gulp.dest(path.join(dist.less)));
});

//sass
gulp.task("sass",function(){
	return gulp.src(path.join(src.sass,"/**/*.scss"))
		.pipe(sass())
		.pipe(minify())
		.pipe(gulp.dest(path.join(dist.sass)));
});

gulp.task("html",function(){

});


gulp.task("watch",function(){
	var watch = gulp.watch(
		[
			path.join(src.jsx,"/**/*.jsx"),
			path.join(src.less,"/**/*.less")
		],
		["jsx","less"]);

	watch.on("change",function(e){
		console.log("["+e.type+"]",e.path.replace(__dirname,""));
	});
});
