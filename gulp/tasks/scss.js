const dartSass = require('sass')
const gulpSass = require('gulp-sass')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const groupCssMediaQueries = require('gulp-group-css-media-queries')
const CleanCss = require('gulp-clean-css')

const sass = gulpSass(dartSass)

const scss = () => {
	return gulpApp.gulp.src(gulpApp.path.src.scss, { sourcemaps: true })
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(groupCssMediaQueries())
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserslist: ['Last 3 versions'],
			cascade: true
		}))
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulpApp.gulp.dest(gulpApp.path.build.css))
		.pipe(gulpApp.plugins.browsersync.stream())
}

module.exports = scss