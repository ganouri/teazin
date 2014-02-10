
* NOTES
- about using variables into frag
- newDev

* TODO GUILLAUME
- make board : display unlocked games
- room list : udpates
- add profil image as Raadad advised
- display names instead of [...]@ when available
- use pull up in a nicer way


LUCY feedback :
High :
- solve open room from contact on cordova
- settings
- add waiting wheel (on the body instead of the white)
- geolocalisation
- image compression for profile pictures&
- notifications
- time : time icon
- question : easier icon
- checker avec Gaston about le in de teazin
- create fixtures (test env database)

Medium:
- delete conversation with confirmation popup
- automatic control : notify with a picture
- api notifications pour controls
- limit the number of character and make text looks like "keep calm and ...."
- once unlocked, show the game in the board, and then show
- insert back button directly in each page (so that icon can be changed or not used)
- new user : they got a tutorial message from Teazin team
- display real names when available
- add privacy link
- check cache issue on cordova webview
- hide rooms ?
- check issue when inviting a new contact and opening a room with him : it opens the room from someone else

Low :
- settings icon = user profile picture
- contacts : click 1 contact
- profil pictures in contacts : same as the rest of the app
- X instead of back for profile settings page
- text : limit number of characters and display remaining spots
- find a way to display number of updates in home when > 9
- reconsider solution : when marc invites to a room sally and gil, and gil and sally are not contacts (for the moments they become contacts)







- order room and roomlist by dates // Do that more elegantly !
- conditions on item configuration
- infinite scrolling
- make pull UP to refresh nicer
- contact : what happens when I click on a contact : not bad for now
- scrollbars on board
- make creator view scrollable?
- creator : add suppress games if still nolock
- try to find another solution for defaultConfig inside controls controller (talk with Raadad)
- large page for setting items
- check state.js updateResources
- secure replace function in controllers
- creator : do better than the timeout for sendButton (to  enable room to have time to update), idem for Room on baseUpdated
- destroy controller once view is destroyed



* FOR CORDOVA BUILD
- comment in main.js: ev.on('captureMedia'
- change line in core.js: 'cordova': ['../cordova'] 



* TODO ALEX
- make working cordava apps

* TODO TEAM
- backend
    - system scheduling -> helo
    - push notification
    - phone numbers
    - profiles pictures
- frontend
    - unlocking -> tmrw
    - sending -> tmrw
    - embedded css for controls
        - check how to add dynamicly css files
        - constraint on CSS file :
    - settings
        - change password
        - screen lock or not
        - change profile
            - profile pictures
        - block list
    - push notification
    - room to create -> tmrw
    - model for tezCard -> guigui
        - use _.extend
    - card full view -> guigui
    - home screen 
    - media types
    - media capture
    - implementation of design
    - sounds
    - phone numbers
    - make controller's jade dynamic
*/

var renderControlManager = function (){
            var container = $('.footer .control-container').html('');
            var selectedControls = $('.footer .selected-controls').html('');
            var ordinal = controlState.controls.length ? controlState.controls.length : 0;

            var renderConfigureControl = function(control,config){
                container.html('');
                control.controller.renderConfigure('.footer .control-container',config,function(config){
                    controlState.controls[ordinal] = {name: control.name, config:config};
                    renderControlManager();
                });
            };

            _.each(controlState.controls,function(item, index){
                var selCon = $(controls[item.name].frag.controlButton).appendTo(selectedControls);
                selCon.on('click', function(){
                    ordinal = index;
                    renderConfigureControl(controls[item.name], item.config);
                });
            });

            _.each(controls, function(control){
                var icon = $(control.frag.controlButton);
                icon.appendTo(container);
                icon.on('click', function(){
                    renderConfigureControl(control);
                });

            });
        };