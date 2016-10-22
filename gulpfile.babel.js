import path from 'path';
import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
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

gulp.task('watch', () => {
  const opts = Object.assign({}, watchify.args, {
    entries: [input],
    debug: true,
  });
  const bundler = watchify(browserify(opts)); 
  bundler.transform('babelify', {presets: ['es2015', 'react']});

  function bundle() {
    bundler.bundle()
      .on('error', console.log)
      .pipe(source(outputName.dev))
      .pipe(gulp.dest(paths.dest));
  }

  bundle(bundler);

  bundler.on('update', bundle);
  bundler.on('log', console.log);
});

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
