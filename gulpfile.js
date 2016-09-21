let gulp = require('gulp'),
	//watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
//	uglify = require('gulp-uglify'),
	stylus = require('gulp-stylus'),
	sourcemaps = require('gulp-sourcemaps'),
	cssmin = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	rimraf = require('rimraf'),
	jade = require('gulp-jade'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;
	//watch = browserSync.watch;

//paths to repos
let path = {
	build: {
		// builded files 
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/'
	},
	src: {
		// sources files
		jade: 'sources/*.jade',
		js: 'sources/js/main.js',
		stylus: 'sources/style/main.styl',
		img: 'sources/img/**/*.*',
		fonts: 'sources/fonts/**/*.*'
	},
	watch: {
		// files witch changes we watch
		jade: 'sources/*.jade',
		js: 'sources/js/*.js',
		stylus: 'sources/style/*.styl',
		img: 'sources/img/*.jpg',
		fonts: 'sources/fonts/*.*'
	},
	clean: './build'
};

//server config
let config = {
	server: {
		baseDir: './build'
	},
	tunnel: true,
	host: 'localhost',
	port: 9000,
	logPrefix: 'Dev_Serv'
};

//tasks
gulp.task('html:build', () => {
	console.log(path.src.jade);
	gulp.src(path.src.jade)
		.pipe(jade())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true})); //what means stream true
});

gulp.task('js:build', () => {
	gulp.src(path.src.js)
		.pipe(sourcemaps.init())
//		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

gulp.task('css:build', () => {
	gulp.src(path.src.stylus)
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(prefixer())
		.pipe(cssmin())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('image:build', () => {
	gulp.src(path.src.img)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			interlaced: true
		}))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true}));
});

gulp.task('fonts:build', () => {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
	'html:build',
	'js:build',
	'css:build',
	'image:build',
	'fonts:build'
]);

gulp.task('watch', () => {
	gulp.watch([path.watch.jade], ['html:build']);
	gulp.watch([path.watch.stylus], ['css:build']);
	gulp.watch([path.watch.js], ['js:build']);
	gulp.watch([path.watch.img], ['img:build']);
	gulp.watch([path.watch.fonts], ['fonts:build']);
});

gulp.task('webserver', () => {
	browserSync(config);
});

gulp.task('clean', (cb) => {
	rimraf(path.clean, cb);
});

gulp.task('run', ['build', 'webserver', 'watch']);