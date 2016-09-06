#Gulp Scaffolding for SASS Based Web Dev
Work in 'src' while Gulp transpiles, cleans, and optimizes into 'dist' (your final distributable pkg) omiting files in 'exclude.'
Map local Apache Vhost to 'dist' and Browser-sync provides live preview identical to production sans hosting platform inconsistencies.

Gulp Modules Incorporated:
gulp-ruby-sass, gulp-autoprefixer, gulp-minify-css, gulp-minify-html, gulp-uglify, gulp-concat, gulp-sourcemaps, gulp-rename, gulp-imagemin, gulp-notify, browser-sync, gulp-changed, gulp-ngmin, gulp-jshint, gulp-cache, gulp-copy, gulp-filter, gulp-plumber, gulp-csslint, gulp-htmllint, del

###Changes should not be made within 'dist' directly as 'gulp clean' will delete the entire contents of that 'dist' folder remorselessly.
