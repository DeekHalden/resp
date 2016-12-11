const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

 
gulp.task('minify', () =>
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    
    gulp.watch(["**/**/*.html","css/**.css", "scripts/**/*.js"]).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: 'Gulp error in ' + err.plugin,
                    message: err.toString()
                })(err)


            }
        }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))

        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());

});

gulp.task('default', ['serve']);
