import path from 'path';
import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import babel from 'gulp-babel';
import source from 'vinyl-source-stream';
import connect from 'gulp-connect';
import sass from 'gulp-sass';

const paths = {
  src: './src',
  dest: './dist'
};

const input = path.join(paths.src, 'index.js');
const outputName = {
  dev: 'funnies.dev.js',
  production: 'funnies.min.js',
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
      .pipe(gulp.dest(paths.dest))
      .pipe(connect.reload());
  }

  bundle(bundler);

  bundler.on('update', bundle);
  bundler.on('log', console.log);
});

gulp.task('dev', () => {
  return browserify(input)
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source(outputName.dev))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('production', () => {
  return browserify(input)
    .transform('envify', {global: true, _: 'purge', NODE_ENV: 'production'})
    .transform('babelify', {presets: ['es2015', 'react']})
    .transform('uglifyify', {global: true})
    .bundle()
    .pipe(source(outputName.production))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('babel', () => {
  return gulp.src(path.join(paths.src, '**/*.js'))
    .pipe(babel())
    .pipe(gulp.dest(paths.dest))
});

// Kick off a server to run the example app
gulp.task('example-server', () => {
  connect.server({
    root: 'docs/',
    livereload: true,
  });
});

// Watch and build the example app
gulp.task('example-watch-js', () => {
  const opts = Object.assign({}, watchify.args, {
    entries: 'docs/script.js',
    debug: true,
  });
  const bundler = watchify(browserify(opts)); 
  bundler.transform('babelify', {presets: ['es2015', 'react']});

  function bundle() {
    bundler.bundle()
      .on('error', console.log)
      .pipe(source('docs/bundle.js'))
      .pipe(connect.reload())
      .pipe(gulp.dest('docs/dist'))
  }

  bundle(bundler);

  bundler.on('update', bundle);
  bundler.on('log', console.log);
});

gulp.task('example-watch-scss', () => {
  return gulp.watch('docs/*.scss', gulp.series('example-build-scss'))
});

gulp.task('example-build-scss', () => {
  // Build sass
  return gulp.src('docs/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('docs/css'))
  .pipe(connect.reload());
})

gulp.task('example', gulp.parallel(
  'example-server',
  'example-watch-js',
  'example-build-scss',
  'example-watch-scss',
  'watch',
));
gulp.task('default', gulp.series('babel', 'dev', 'production'));
