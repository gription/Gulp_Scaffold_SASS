Project: cssmenu
echo Desc: The most amazing thing evar?

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
-adb

