import gulp from "gulp";
import pug from "gulp-pug";
import webpack from "gulp-webpack";
import readConfig from "read-config";
import watch from "gulp-watch";
import bs from "browser-sync";

const SRC = "./src";
const DEST = "./docs";

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

gulp.task("webpack", done => {
  const config = require("./webpack.config.babel");
  gulp.src(`${SRC}/js/script.js`)
      .pipe(webpack(config))
      .pipe(gulp.dest(`${DEST}/js/`));
  done();
});

gulp.task("serve", done => {
  bs({
    server: {
      baseDir: `${DEST}/`,
    }
  });

  watch([`${SRC}/pug/**/*.pug`, `${SRC}/pug/meta.yml`], gulp.series("pug", bs.reload));
  watch([`${SRC}/js/**/*.js`, `${SRC}/js/**/*.vue`], gulp.series("webpack", bs.reload));

  done();
});

gulp.task("default", gulp.series(gulp.parallel("pug" ,"webpack"), "serve"));
