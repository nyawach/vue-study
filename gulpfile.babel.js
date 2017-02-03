import gulp from "gulp";
import pug from "gulp-pug";
import webpack from "gulp-webpack";
import readConfig from "read-config";
import sass from "gulp-sass";
import sassGlob from "gulp-sass-glob";
import pleeease from "gulp-pleeease";
import watch from "gulp-watch";
import bs from "browser-sync";

const SRC = "./src";
const DEST = "./public";

gulp.task("pug", done => {
  const locals = readConfig(`${SRC}/pug/meta.yml`);
  gulp.src(`${SRC}/pug/**/[!_]*.pug`)
      .pipe(pug({
          locals: locals,
          pretty: true
      }))
      .pipe(gulp.dest(`${DEST}`));
  done();
});

gulp.task("html", gulp.series("pug"));

// css
gulp.task('sass', (done) => {
    const config = readConfig(`./pleeease.json`);
    gulp.src(`${SRC}/scss/**/[!_]*.scss`)
        .pipe(sassGlob())
        .pipe(sass({ outputStyle: "nested" }))
        .pipe(pleeease(config))
        .pipe(gulp.dest(`${DEST}/css`));
    done();
});

gulp.task("css", gulp.series("sass"));

gulp.task("webpack", done => {
  const config = require("./webpack.config.babel");
  gulp.src(`${SRC}/js/script.js`)
      .pipe(webpack(config))
      .pipe(gulp.dest(`${DEST}/js/`));
  done();
});

gulp.task("js", gulp.series("webpack"));


gulp.task("serve", done => {
  bs({
    server: {
      baseDir: `${DEST}/`,
    }
  });

  watch([`${SRC}/scss/**/*.scss`], gulp.series("css", bs.reload));
  watch([`${SRC}/pug/**/*.pug`, `${SRC}/pug/meta.yml`], gulp.series("html", bs.reload));
  watch([`${SRC}/js/**/*.js`, `${SRC}/js/**/*.vue`], gulp.series("js", bs.reload));

  done();
});

gulp.task("default", gulp.series(gulp.parallel("html" ,"js", "css"), "serve"));
