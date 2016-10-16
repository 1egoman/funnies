import fs from 'fs';
import gulp from 'gulp';
import browserify from 'browserify';

gulp.task('default', () => {
  browserify('./src/index.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(fs.createWriteStream('./dist/bundle.js'));
});

gulp.task('production', () => {
  browserify('./src/index.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    .transform('uglifyify', {global: true})
    .bundle()
    .pipe(fs.createWriteStream('./dist/bundle.js'));
});
