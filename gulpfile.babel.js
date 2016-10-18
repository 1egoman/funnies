import path from 'path';
import gulp from 'gulp';
import browserify from 'browserify';
import babel from 'gulp-babel';
import source from 'vinyl-source-stream';

const paths = {
  src: './src',
  dest: './dist'
};

const input = path.join(paths.src, 'index.js');
const outputName = {
  dev: 'funnies.dev.js',
  prod: 'funnies.min.js',
};

gulp.task('dev', () => {
  browserify(input)
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source(outputName.dev))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('prod', () => {
  browserify(input)
    .transform('envify', {global: true, _: 'purge', NODE_ENV: 'production'})
    .transform('babelify', {presets: ['es2015', 'react']})
    .transform('uglifyify', {global: true})
    .bundle()
    .pipe(source(outputName.prod))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('babel', () => {
  return gulp.src(path.join(paths.src, '**/*.js'))
    .pipe(babel())
    .pipe(gulp.dest(paths.dest))
});

gulp.task('default', ['babel', 'dev', 'prod']);
