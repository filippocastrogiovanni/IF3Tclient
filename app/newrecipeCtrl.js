/**
 * Created by Filippo on 24/05/2016.
 */

if3tApp.controller('NewRecipeController', ['$scope', '$rootScope', '$routeParams', '$location',
    function ($scope, $rootscope, $routeParams, $location) {

        $rootscope.curpage = "newrecipe";

        initialize_data($scope);

        //all functions handled by controller
        $scope.search_change = function(o) {
            search_change($scope, o);
        }

        $scope.choose_trigger_channel = function(o) {
            choose_trigger_channel($scope, o);
        }

        $scope.choose_action_channel = function(o) {
            choose_action_channel($scope, o);
        }

        $scope.choose_trigger_job = function(o) {
            choose_trigger_job($scope, o);
        }

        $scope.submit_function_google_calendar2 = function(o) {
            submit_function_google_calendar2($scope, o);
        }

        $scope.submit_function_google_mail3 = function(o) {
            submit_function_google_mail3($scope, o);
        }

        $scope.submit_function_google_mail5 = function(o) {
            submit_function_google_mail5($scope, o);
        }

        $scope.submit_function_facebook1 = function(o) {
            submit_function_facebook1($scope, o);
        }

        $scope.submit_function_facebook3 = function(o) {
            submit_function_facebook3($scope, o);
        }

        $scope.submit_function_facebook5 = function(o) {
            submit_function_facebook5($scope, o);
        }

        $scope.submit_function_facebook7 = function(o) {
            submit_function_facebook7($scope, o);
        }

        $scope.submit_function_facebook8 = function(o) {
            submit_function_facebook8($scope, o);
        }

        $scope.submit_function_facebook10 = function(o) {
            submit_function_facebook10($scope, o);
        }

        $scope.submit_function_twitter1 = function(o) {
            submit_function_twitter1($scope, o);
        }

        $scope.submit_function_twitter2 = function(o) {
            submit_function_twitter2($scope, o);
        }

        $scope.submit_function_twitter3 = function(o) {
            submit_function_twitter3($scope, o);
        }

        $scope.submit_function_twitter8 = function(o) {
            submit_function_twitter8($scope, o);
        }

        $scope.submit_function_twitter10 = function(o) {
            submit_function_twitter10($scope, o);
        }



    }
]);


function search_change($scope, o){
    console.log("You have choosen " + o);
}

function choose_trigger_channel($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_channel = o;
}

function choose_action_channel($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_action_channel = o;
}

function choose_trigger_job($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_google_calendar2($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_google_mail3($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_google_mail5($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_facebook1($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_facebook3($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_facebook5($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_facebook7($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_facebook8($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_facebook10($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_twitter1($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_twitter2($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_twitter3($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_twitter8($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}
function submit_function_twitter10($scope, o){
    console.log("You have choosen " + o.name);
    $scope.chosen_trigger_job = o;
}

function initialize_data($scope){
    //define all the for 4 channels and put it in the array of the scope
    var channel_google_calendar = {};
    channel_google_calendar.name = "Google Calendar";
    channel_google_calendar.image_url = "https://d3rnbxvnd0hlox.cloudfront.net/images/channels/36/icons/regular.png";
    channel_google_calendar.trigger_list = [
        {
            header: "Any event starts" ,
            paragraph: "This Trigger fires within 15 minutes of the starting time of any event on your Google Calendar." ,
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        },
        {
            header: "Event from search starts" ,
            paragraph: "This Trigger fires within 15 minutes of the starting time of an event on your Google Calendar that contains a specific keyword or phrase. The search looks at the event’s Title, Description, and Location." ,
            extra_element: "<form novalidate ng-submit='submit_trigger_google_calendar2(trigger_list_channel.header)'><h4>Keyword or phrase:</h4><input type='text' name='keyword'><br><br><input type='submit' class='btn btn-info btn-large' style='float:left' value=''&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
        },
        {
            header: "Any new event added" ,
            paragraph: "This Trigger fires every time a new event is added to your Google Calendar." ,
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' href='#/step_3\' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        }
    ];
    channel_google_calendar.action_list = [
        {
            header: "Quick add event" ,
            paragraph: "This Action will add an event to your Google Calendar. Simply include a detailed description of when and what." ,
            extra_element: "<form novalidate ng-submit='submit_action_google_calendar1 	<input type='checkbox' name='google_mail_from_address'>From Address (somebody@gmail.com) <br> 	<input type='checkbox' name='google_mail_subject' >Subject (email title)<br> 	<input type='checkbox' name='google_mail_body_plain'>Body Plain (email content)<br> 	<input type='checkbox' name='google_mail_first_attachment_URL' >First Attachment URL (http://...)<br> 	<input type='checkbox' name='google_mail_first_attachment_filename' >First Attachment Filename (image_name.png)<br> 	<input type='checkbox' name='google_mail_received_at' >Received At (August 23, 2010 at 11:01 PM)<br> 	<br> 	<input type='submit' value='Confirm actions'> </form>"
        },
    ];

    var channel_google_mail = {};
    channel_google_mail.name = "Google Mail";
    channel_google_mail.image_url = "https://d3rnbxvnd0hlox.cloudfront.net/images/channels/33/icons/regular.png";
    channel_google_mail.trigger_list = [

        {
            header: "Any new email in inbox" ,
            paragraph: "This Trigger fires every time any new email arrives in Gmail." ,
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' href='#/step_3\' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        },
        {
            header: "Any new attachment in inbox" ,
            paragraph: "This Trigger fires for every email attachment that arrives in your inbox. NOTE: Multiple attachments each fire separately." ,
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' href='#/step_3\' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        },
        {
            header: "New email in inbox from" ,
            paragraph: "This Trigger fires every time a new email arrives in your inbox from the address you specify." ,
            extra_element: "<br><br><form novalidate ng-submit='submit_trigger_google_mail3(trigger_list_channel.header)'><h4>Email address:</h4><input type='text' name='email_address'><br><br><input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
        },
        {
            header: "New starred email in inbox" ,
            paragraph: "This Trigger fires every time you add any new star to an email in your inbox." ,
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' href='#/step_3\' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        },
        {
            header: "New email in inbox labeled" ,
            paragraph: "This Trigger fires every time a new email arrives in your inbox with the label you specify." ,
            extra_element: "<br><br><form novalidate ng-submit='submit_trigger_google_mail5(trigger_list_channel.header)'><h4>Email label:</h4><input type='text' name='email_label' placeholder='Case sensitive; '/' to split'><br><br><input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
        },
        {
            header: "New email in inbox from search" ,
            paragraph: "This Trigger fires every time a new email arrives in your inbox that matches the search query you specify." ,
            extra_element: "<br><h6 class='step_0_helper' style='padding-left: 0px'>Use Gmail’s <a href='http://support.google.com/mail/bin/answer.py?hl=en&answer=7190'>search operators</a> for advanced search</h6><br><br><form novalidate ng-submit='submit_trigger_google_mail6(trigger_list_channel.header)'><h4>Search for:</h4><input type='text' name='search_for'><br><br><input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'></form>"
        }
    ];
    channel_google_mail.action_list = [
        {
            header: "Send an email" ,
            paragraph: "This Action will send an email to up to five recipients from your Gmail account." ,
            extra_element: "<form novalidate ng-submit='submit_action_google_mail1'	<h4>Recipiend address:</h4> 	<input type='text' name='recipient_address'> 	<br> 	<h4>Attachment URL:</h4> 	<input type='text' name='attachment_url'> 	<br> 	<h4>Subject:</h4> 	<input type='text' name='subject'> 	<br> 	<h4>Description:</h4> 	<input type='text' name='description'> 	<br> 	<h4>Location:</h4> 	<input type='text' name='location'> 	<br> 	<h4>Starts:</h4> 	<input type='text' name='starts'> 	<br> 	<h4>Ends:</h4> 	<input type='text' name='end'> 	<br> 	<h4>Creation date:</h4> 	<input type='text' name='creation_date'> 	<br> 	<h4>Event URL:</h4> 	<input type='text' name='event_url'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
    ];

    var channel_facebook = {};
    channel_facebook.name = "Facebook";
    channel_facebook.image_url = "https://d3rnbxvnd0hlox.cloudfront.net/images/channels/10/icons/regular.png";
    channel_facebook.trigger_list = [
        {
            header: "Any new post by you in area" ,
            paragraph: "This Trigger fires every time you post on Facebook at a location you specify." ,
            extra_element: "(CONSENTI/BLOCCA) <form novalidate ng-submit='submit_trigger_facebook1(trigger_list_channel.header)'>	<input autocapitalization='off' autocomplete='off' autocorrect='off' class='step_1_channels_search' 		   name='q' placeholder='Search Channels' type='text'> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "New status message by you" ,
            paragraph: "This Trigger fires every time you create a new plain text status message on Facebook." ,
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' href='#/step_3\' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        },
        {
            header: "New status message by you with hashtag" ,
            paragraph: "This Trigger fires every time you create a new plain text status message on Facebook with a specific hashtag." ,
            extra_element: "<form novalidate ng-submit='submit_trigger_facebook3(trigger_list_channel.header)'> 	<h4>Hashtag:</h4> 	<input type='text' name='hashtag'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "New link post by you" ,
            paragraph: "This Trigger fires every time you create a new link post on Facebook." ,
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' href='#/step_3\' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        },
        {
            header: "New link post by you with hashtag" ,
            paragraph: "This Trigger fires every time you create a new link post on Facebook with a specific hashtag." ,
            extra_element: "<form novalidate ng-submit='submit_trigger_facebook5(trigger_list_channel.header)'> 	<h4>Hashtag:</h4> 	<input type='text' name='hashtag'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "New photo post by you" ,
            paragraph: "This Trigger fires every time you post a new photo on Facebook." ,
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' href='#/step_3\' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        }
        ,
        {
            header: "New photo post by you with hashtag" ,
            paragraph: "This Trigger fires every time you post a new photo on Facebook with a specific hashtag." ,
            extra_element: "<form novalidate ng-submit='submit_trigger_facebook7(trigger_list_channel.header)'> 	<h4>Hashtag:</h4> 	<input type='text' name='hashtag'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "New photo post by you in area" ,
            paragraph: "" ,
            extra_element: "(CONSENTI/BLOCCA) <form novalidate ng-submit='submit_trigger_facebook8(trigger_list_channel.header)'> 	<input autocapitalization='off' autocomplete='off' autocorrect='off' class='step_1_channels_search' 		   name='q' placeholder='Search Channels' type='text'> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "You are tagged in a photo" ,
            paragraph: "This Trigger fires every time you are tagged you in a new photo. NOTE: Facebook privacy settings may block IFTTT’s access to some photos you are tagged in." ,
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' href='#/step_3\' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        },
        {
            header: "Your profile changes" ,
            paragraph: "A Trigger that monitors changes in your Facebook profile information. It works with these Facebook profile fields: Name, Profile picture, Location, Website, and Bio." +
            + "Profile fields to watch: all, full name, profile picture, location, websiet, bio" ,
            extra_element: "<form novalidate ng-submit='submit_trigger_facebook10(trigger_list_channel.header)'> 	<input type='checkbox' name='all'>All<br> 	<input type='checkbox' name='full_name' >Full name<br> 	<input type='checkbox' name='profile_picture'>Profile picture<br> 	<input type='checkbox' name='location' >Location<br> 	<input type='checkbox' name='website' >Website<br> 	<input type='checkbox' name='bio' >Bio<br> 	<br>     <input type='submit' class='btn btn-info btn-large' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp' /> </form>"
        }
    ];
    channel_facebook.action_list = [
        {
            header: "Create a status message" ,
            paragraph: "This Action will create a new plain text status message on Facebook." ,
            extra_element: "<form novalidate ng-submit='submit_action_facebook1' id='message_form'> 	<h4>Status:</h4> 	<input type='text' name='status'> 	<br> 	<textarea rows='4' cols='50' name='recipe_title' form='message_form'> 		Message... 	</textarea> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "Create a link post" ,
            paragraph: "his Action will create a new link post on Facebook." ,
            extra_element: "<form novalidate ng-submit='submit_action_facebook2' id='message2_form'> 	<h4>Link URL:</h4> 	<input type='text' name='link_url'> 	<br> 	<textarea rows='4' cols='50' name='recipe_title' form='message2_form'> 		Message... 	</textarea> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "Upload a photo from URL" ,
            paragraph: "This Action will upload a new photo, from the given URL, to a Facebook album you specify." ,
            extra_element: "<form novalidate ng-submit='submit_action_facebook3' id='text_form'> 	<h4>Link URL:</h4> 	<input type='text' name='link_url'> 	<br> 	<h4>Album name:</h4> 	<input type='text' name='album_name'> 	<br> 	<textarea rows='4' cols='50' name='recipe_title' form='text_form'> 		Text... 	</textarea> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
    ];

    var channel_twitter = {};
    channel_twitter.name = "Twitter";
    channel_twitter.image_url = "https://d3rnbxvnd0hlox.cloudfront.net/images/channels/2/icons/regular.png";
    channel_twitter.trigger_list = [
        {
            header: "New tweet by you" ,
            paragraph: "This Trigger fires every time you post a tweet at a location you specify. " ,
            extra_element: "<form novalidate ng-submit='submit_trigger_twitter1(trigger_list_channel.header)'> 	<input type='checkbox' name='retweets'>Retweets <br> 	<input type='checkbox' name='replies' >@Replies<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp' /> </form>"
        },
        {
            header: "New tweet by you with hashtag" ,
            paragraph: "This Trigger fires every time you post a tweet at a location you specify. " ,
            extra_element: "<form novalidate ng-submit='submit_trigger_twitter2(trigger_list_channel.header)'> 	<h4>Hashtag:</h4> 	<input type='text' name='hashtag'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "New tweet by you in area" ,
            paragraph: "This Trigger fires every time you post a tweet at a location you specify. " ,
            extra_element: "(CONSENTI/BLOCCA) <form novalidate ng-submit='submit_trigger_twitter3(trigger_list_channel.header)'> 	<input autocapitalization='off' autocomplete='off' autocorrect='off' class='step_1_channels_search' 		   name='q' placeholder='Search Channels' type='text'> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "New mention of you" ,
            paragraph: "This Trigger fires every time you are @mentioned in a tweet." ,
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' href='#/step_3\' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        },
        {
            header: "New link by you" ,
            paragraph: "This Trigger fires for every link you tweet. If your tweet has multiple links, it will fire multiple times." ,
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' href='#/step_3\' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        },
        {
            header: "New follower" ,
            paragraph: "This Trigger fires every time a new user starts following you." ,
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' href='#/step_3\' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        },
        {
            header: "New liked tweet by you" ,
            paragraph: "This Trigger fires every time you like a tweet." ,
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' href='#/step_3\' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        },
        {
            header: "New tweet by a specific user" ,
            paragraph: "This Trigger fires every time the Twitter user you specify tweets." ,
            extra_element: "<form novalidate ng-submit='submit_trigger_twitter8(trigger_list_channel.header)'> 	<h4>Username:</h4> 	<input type='text' name='username'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "New tweet from search" ,
            paragraph: "This Trigger fires every time a new tweet matches your search query. NOTE: limited to 15 tweets per check." +
            + "Use Twitter’s <a href='https://support.twitter.com/articles/71577-how-to-use-advanced-twitter-search' >search operators</a> for advanced search. For example: ('@twitter' '#followfriday')",
            extra_element: "<div><br><a ng-click='choose_trigger_job(trigger_list_channel.header)' href='#/step_3\' style='float:left' class='btn btn-info btn-large'>&nbsp&nbsp&nbspCreate Trigger&nbsp&nbsp&nbsp</a></div>"
        },
        {
            header: "New tweet by anyone in area" ,
            paragraph: "This Trigger fires every time anyone posts a tweet at a location you specify. " ,
            extra_element: "(CONSENTI/BLOCCA) <form novalidate ng-submit='submit_trigger_twitter10(trigger_list_channel.header)'> 	<input autocapitalization='off' autocomplete='off' autocorrect='off' class='step_1_channels_search' 		   name='q' placeholder='Search Channels' type='text'> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
    ];
    channel_twitter.action_list = [
        {
            header: "Post a tweet" ,
            paragraph: "This Action will post a new tweet to your Twitter account. NOTE: Please adhere to Twitter’s Rules and Terms of Service. I'm tagged in {{From}}\'s photo! Check it out (if you have permission) {{Link}}" ,
            extra_element: "<form novalidate ng-submit='submit_action_twitter1'> 	<h4>From:</h4> 	<input type='text' name='from'> 	<br> 	<h4>Link:</h4> 	<input type='text' name='link'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "Send an email" ,
            paragraph: "This Action will post a new tweet to your Twitter account with a linked pic.twitter.com image. NOTE: Please adhere to Twitter’s Rules and Terms of Service.Tagged! {{Caption}} {{ImageSource}}" ,
            extra_element: "<form novalidate ng-submit='submit_action_twitter2'> 	<h4>Caption:</h4> 	<input type='text' name='caption'> 	<br> 	<h4>Image source:</h4> 	<input type='text' name='image_source'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "Send a direct message to yourself" ,
            paragraph: "This Action will send a direct message to your Twitter account. NOTE: Please adhere to Twitter’s Rules and Terms of Service.I'm tagged in {{From}}\'s photo! Check it out (if you have permission) {{Link}}" ,
            extra_element: "<form novalidate ng-submit='submit_action_twitter3'> 	<h4>From:</h4> 	<input type='text' name='from'> 	<br> 	<h4>Link:</h4> 	<input type='text' name='link'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "'>Update profile picture" ,
            paragraph: "This Action will update your profile picture from the image URL you specify and optionally tweet about it. NOTE: Please adhere to Twitter’s Rules and Terms of Service." ,
            extra_element: "<form novalidate ng-submit='submit_action_twitter4'> 	<h4>Caption:</h4> 	<input type='text' name='caption'> 	<br> 	<h4>Image source:</h4> 	<input type='text' name='image_source'> 	<br> 	<h4>Link:</h4> 	<input type='text' name='link'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "Update bio" ,
            paragraph: "This Action will update your bio and optionally tweet about it. NOTE: Please adhere to Twitter’s Rules and Terms of Service. {{TWeet}}Tagged! {{Caption}} {{Link}}" ,
            extra_element: "<form novalidate ng-submit='submit_action_twitter5'> 	<h4>Caption:</h4> 	<input type='text' name='caption'> 	<br> 	<h4>Tweet:</h4> 	<input type='text' name='tweet'> 	<br> 	<h4>Link:</h4> 	<input type='text' name='link'> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
        {
            header: "Add user to list" ,
            paragraph: "This Action will add a user to a Twitter list you specify. NOTE: Twitter allows 1000 lists per user and 5000 users per list." ,
            extra_element: "<form novalidate ng-submit='submit_action_twitter2' id='user_list_form'> 	<h4>User name:</h4> 	<input type='text' name='username'> 	<br> 	<textarea rows='4' cols='50' name='recipe_title' form='user_list_form'> 		Enter list of users separated by comma (,). 	</textarea> 	<br> 	<br> 	<input type='submit' class='btn btn-info btn-large' style='float:left' value='&nbsp;&nbsp;&nbsp;Create Trigger&nbsp&nbsp&nbsp'> </form>"
        },
    ];

    $scope.channels = [channel_google_calendar, channel_google_mail, channel_facebook, channel_twitter];

}