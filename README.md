# OMOJO App

This is the mobile app, integrated with the server for more convenience.

---------------
## Framework/Libraries
- Phonegap (wrap the web based app)
- RequireJS
- Jquery
- Knockout
- Jade


## Settings for Dev
Assumptions:

	a) cordova installed, working with at least Android SDK

	b) intimate_core github repository (this) is cloned. For example in $DATA/projects/intimate_core


Steps

0. Create a cordova project (named omojo for example) in a folder external from this repo. Following the example above: $DATA/projects/omojo

1. Go inside the new cordova project. Add android platform (or anything else).

2. Remove the actual www/ folder

3. Execute: "ln -s $DATA/projects/intimate_core/nclient www" (no quote in shell, ofc)

4. Try to execute: "ls -rtl". You should see the www folder back, which is actually a symblink

5. Assuming your phone is connected, build and push the app executing "cordova run"


Dev: for development purpose, a NodeJS serves nclient via the script "../entry.js". So that you can work from your browser 'http://localhost:8080' without any CORS issues.


#Note
Android dev:
- Check your phone is recognized by typing "adb devices"
- Access to the console.log of the app when runned in the phone: adb logcat | grep "Web"


## Todo
Optimize the build for production, exluding useless scripts and bridge installed/developped.
