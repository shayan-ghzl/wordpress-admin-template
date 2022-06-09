
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const ts = require('gulp-typescript');
const sass = gulpSass(dartSass);
const tsProject = ts.createProject("tsconfig.json");

gulp.task("sass", async function () {
    return gulp.src('./assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./assets/css'));
});
gulp.task("typescript", async function () {
    return tsProject.src()
        .pipe(tsProject()).js
        .pipe(gulp.dest('./assets/js'));
});
gulp.task("watch", async function () {
    gulp.watch('./assets/scss/*.scss', gulp.series('sass'));
    gulp.watch("./assets/ts/*.ts", gulp.series("typescript"));
});
gulp.task("copy", function () {
    return gulp.src('').pipe(gulp.dest(''));
});
// -------------------------------------------------------------
// GULP CONCAT CSS
// -------------------------------------------------------------
gulp.task('sass-min', function () {
    return gulp.src('./assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets/css'));
});
// -------------------------------------------------------------
// GULP CONCAT JS
// -------------------------------------------------------------
const concat_path = {
    input_file: ['./assets/js/jquery.3.1.1min.js', 'assets/js/swiper-bundle.min.js', './assets/portfolio/app.min.js'],
    output_file_name: 'app',
    dest: './assets/portfolio'
}
gulp.task('concat-normal', function () {
    return gulp.src(concat_path.input_file)
        .pipe(concat(concat_path.output_file_name + '.js'))
        .pipe(gulp.dest(concat_path.dest))
});
gulp.task('concat-min', function () {
    return gulp.src(concat_path.input_file)
        .pipe(concat(concat_path.output_file_name + '.min.js'))
        .pipe(minify())
        .pipe(gulp.dest(concat_path.dest))
});
gulp.task('concat', gulp.series(['concat-normal', 'concat-min']));