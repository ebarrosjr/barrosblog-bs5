var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass')(require('sass'));
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');

gulp.task('sass', ()  => {
    return gulp.src("./src/sass/*.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write('./dist/css'))
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('font-awesome', () => {
    return gulp.src("./node_modules/@fortawesome/fontawesome-free/webfonts/*").pipe(gulp.dest('./dist/webfonts'));
})

gulp.task('html', () => {
    return gulp.src("./src/*.html").pipe(gulp.dest('./dist'));
});

gulp.task('bootstrap', () => {
    return gulp.src("./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js").pipe(gulp.dest('./dist/js'));
});

gulp.task('js', () => {
    return gulp.src("./src/js/**/*.js")
            .pipe(uglify())
            .pipe(gulp.dest("./dist/js"));
});

gulp.task('start', gulp.series('sass', function() {

    browserSync.init({
        server: "./dist/"
    });

    gulp.watch("./src/sass/*.scss", gulp.series('sass', 'html'));
    gulp.watch("./src/js/**/*.js", gulp.series('js', 'html'));
    gulp.watch("./src/**/*.html").on('change', gulp.series('html', browserSync.reload));
}));

gulp.task('default', gulp.series('font-awesome', 'bootstrap', 'start'));