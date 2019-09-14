var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var browser = require("browser-sync");

gulp.task("server", function(done) {
    browser({
        server: {
            baseDir: "./"
        }
    });
    done();
    console.log('server was launched');
});

gulp.task("sass",function(){
  return gulp.src("sass/**/*scss")
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest("./css"))
      .pipe(browser.reload({stream:true}))
});

// ブラウザのリロード
gulp.task('browser-reload', function (done){
    browser.reload();
    done();
    console.log('Browser reload completed');
});

gulp.task('watch-files', function(done) {
    gulp.watch("./**/*.html", gulp.task('browser-reload'));
    gulp.watch("sass/**/*scss",gulp.task("sass"));
    done();
    console.log('watch');
})

gulp.task("default",gulp.series('server', 'watch-files', function(done){
    done();
    console.log('Task done!!')
}));
