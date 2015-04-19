Project: cssmenu
echo Desc: The most amazing thing evar!!

Next steps:
Need Node dependencies?
From /home/andy/code/cssmenu run: npm init
Place package.json in /home/andy/code/cssmenu and run: npm install
This populates node_modules

Need front-end packages?
Place bower.json in /home/andy/code/cssmenu and run: bower install
This populates bower_components

You may want to generate further scaffolding with Yeoman?
yo gulp-foundation, or yo-angular perhaps?

A general-purpose Gulpfile.js has been placed in /home/andy/code/cssmenu
but you will probably need/want to customize it?

In general, this scaffold suggest your 'src' folder is where you work,
while gulp transpiles everything there into your distributable package folder
named 'dist'.  Anything placed within any of the 'exclude' folders will
not be automatically migrated into your 'dist' space.  The intent is that
the 'dist' folder structure be exactly what you intend to publish.  Always
clean and fully optimized - it's this folder, mapped thru apache as itself
(ie: http://cssmenu) that you develop against - reducing any likely
publishing time surprises to only hosting platform inconsistencies.

*** Changes should not be made within 'dist' directly as 'gulp clean' will
delete the entire contents of that 'dist' folder remorselessly. ***

