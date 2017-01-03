// =================================================================================================================================================
// VARIABLES
// ================================================================================================================================================
const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const CacheBuster = require('gulp-cachebust');
const cachebust = new CacheBuster();
const babel = require('gulp-babel');
const jsPaths = ['./public/js/app.js','./public/js/**/*.js'];
const print = require('gulp-print');
const del = require('del');
const secretGoogleKey = require('./config.js');
// ========================================================================================================================
// FUNCTIONS
// ========================================================================================================================
gulp.task('sayHello', function(){
    console.log('Hello Working')
})
gulp.task('sayBye', function(){
    console.log('Bye Working')
})
gulp.task('build-css', function(){
    gulp.src('./public/styles/*')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())  // for old files that are not getting replaced as they should
        .pipe(concat('styles.css')) // writing files into one file under this name
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/dist'));
})
gulp.task('build-js', function() {
    return gulp.src(['./public/js/app.js','./public/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(print())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(concat('bundle.js'))
        // .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/dist/js'));
});
gulp.task('clean', function(cb){
    del([
        './public/dist'
    ], cb)
});
gulp.task('watch', function() {
    gulp.watch(['./public/index.html','./partials/*.html', './public/styles/*.*css', './public/js/**/*.js','./public/**/*.js'], ['build-js','build-css']);
    gulp.watch('./public/styles/*',['build-css']);
    gulp.watch('./public/js/**/*.js',['build-js']);
});
gulp.task('default',['clean', 'build-js', 'build-css', 'watch']);
// ===========================================================================