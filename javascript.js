$(document).ready(function(){
  var $nav = $('nav');
  
  //refresh tweets function
  var refreshHomePageTweets = function() {                // set the initial function
    $nav.html('')                                         // clear the page when refreshHomePageTweets is called
    var index = streams.home.length - 1;                  // 
    while(index >= 0){                                  
      var tweet = streams.home[index];
      var $tweet = $('<div></div>');
      $tweet.addClass(tweet.user)
      $tweet.html(' @' + '<b>'+tweet.user +'</b>' + ': ' + tweet.message + ' | <i>'+ $.timeago(tweet.created_at) +'</i>');
      $tweet.appendTo($nav);
      index -= 1;
    }}
  refreshHomePageTweets();                                // call refreshHomePageTweets as page loads

  var setTweetInterval = 0;                               // declaring setTweetInterval
  var determineWhichTweets = function() {                 // 
    if ($('body').hasClass("all-tweets")) {               // if the body has a class of 'all-tweets', which it does when the page is first loaded
      setTweetInterval = window.setInterval(function() {  // set the function to run refreshHomePageTweets every x seconds
        refreshHomePageTweets();                                  
      }, 500); 
    }
  }
  determineWhichTweets();                                 // run this function on page load
  
  $('nav').on('click', 'div', function() {                // when a user name is clicked
    var clickedClass = $(this).attr('class');             // the attribute of the div is stored in variable clickedClass
    $nav.html('');                                        // everything in the nav html is cleared

    clearInterval (setTweetInterval);                     // the setTweetInterval is cleared, so all users are no longer being refreshed
    
    setTweetInterval = window.setInterval(function() {    // setTweetInterval now runs chooseUserStream, which shows just that user's stream
      chooseUserStream();
    }, 500);                                          

  var chooseUserStream = function() {                 
    $nav.html('');                                      // when chooseUserStream is called, clear the nav
    var index = streams.users[clickedClass].length -1;  // set index to array length of all of that users Tweets (-1 for array.length 0 index property), setting the index to the end of the array means the latest tweets are rendered at the top of the page
    
    while(index >= 0) {                                 // while the index is greater than or equal to 0
      var tweet = streams.users[clickedClass][index];   // set var tweet to the specific tweet
      var $tweet = $('<div></div>');                    // set var $tweet to an empty div
      $tweet.addClass(clickedClass);                    // add a class of the username to the div
      $tweet.html(' @' + '<b>'+tweet.user +'</b>' + ': ' + tweet.message + ' | <i>'+ $.timeago(tweet.created_at) +'</i>');  //add username, message, and time created to tweet message
      $tweet.appendTo($nav);                            // append tweets to the nav
      index -= 1;                                       // reduce index by 1
    }
  }
  chooseUserStream();                                   // call the chooseUserStream function when nav is clicked
  });
})