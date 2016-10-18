import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import browserify from 'browserify';
import babel from 'gulp-babel';

const paths = {
  src: './src',
  dest: './dist'
};

const input = path.join(paths.src, 'index.js');
const output = {
  dev: path.join(paths.dest, 'funnies.js'),
  prod: path.join(paths.dest, 'funnies.min.js'),
};

gulp.task('default', () => {
  browserify(input)
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(fs.createWriteStream(output.dev));
});

gulp.task('production', () => {
  browserify(input)
    .transform('envify', {global: true, _: 'purge', NODE_ENV: 'production'})
    .transform('babelify', {presets: ['es2015', 'react']})
    .transform('uglifyify', {global: true})
    .bundle()
    .pipe(fs.createWriteStream(output.prod));
});

gulp.task('babel', () => {
  return gulp.src(path.join(paths.src, '**/*.js'))
    .pipe(babel())
    .pipe(gulp.dest(paths.dest))
});
