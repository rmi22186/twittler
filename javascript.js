$(document).ready(function(){
  var $tweetContainer = $('.tweet-container ');
  
  //refresh tweets function
  var refreshHomePageTweets = function() {                // set the initial function
    $('.refreshAllTweets').remove();
    $tweetContainer.html('')                                         // clear the page when refreshHomePageTweets is called
    var index = streams.home.length - 1;                  // 
    while(index >= 0){                                  
      var tweet = streams.home[index];
      var $tweet = $('<div class="card"></div>');
      $tweet.attr('id', tweet.user)
      $tweet.html(  '<h4>@</h4>' + 
                    '<b>' + '<h2>' + tweet.user + '</h2>' + '</b><br>' + 
                    tweet.message + 
                    ' <i class="timestamp">'+ $.timeago(tweet.created_at) + '</i>');
      $tweet.appendTo($tweetContainer);
      index -= 1;
    }}
  refreshHomePageTweets();                                // call refreshHomePageTweets as page loads

  var setTweetInterval = 0;                               // declaring setTweetInterval
  var determineWhichTweets = function() {                 // 
    if ($('body').hasClass("all-tweets")) {               // if the body has a class of 'all-tweets', which it does when the page is first loaded
      setTweetInterval = window.setInterval(function() {  // set the function to run refreshHomePageTweets every x seconds
        refreshHomePageTweets();                                  
      }, 5000); 
    }
  }
  determineWhichTweets();                                 // run this function on page load
  
  $('.tweet-container').on('click', 'div', function() {                     // when a user name is clicked
    var clickedClass = $(this).attr('id');                // the attribute of the div is stored in variable clickedClass
    console.log(clickedClass + " clicked!")
    $('.refreshAllTweets').remove();
    $tweetContainer.html('');                             // everything in the nav html is cleared

    clearInterval (setTweetInterval);                     // the setTweetInterval is cleared, so all users are no longer being refreshed
    
    setTweetInterval = window.setInterval(function() {    // setTweetInterval now runs chooseUserStream, which shows just that user's stream
      chooseUserStream();
    }, 5000);
    
    var $userButton = $('<button class="btn-success btn refreshAllTweets card-similar"><span class="glyphicon glyphicon-chevron-left"></span></button>')
    $userButton.appendTo('.middle-column')                                          

  var chooseUserStream = function() {                 
    $tweetContainer.html('');                                      // when chooseUserStream is called, clear the nav
    var index = streams.users[clickedClass].length -1;  // set index to array length of all of that users Tweets (-1 for array.length 0 index property), setting the index to the end of the array means the latest tweets are rendered at the top of the page
    while(index >= 0) {                                 // while the index is greater than or equal to 0
      var tweet = streams.users[clickedClass][index];   // set var tweet to the specific tweet
      var $tweet = $('<div class="card"></div>');                    // set var $tweet to an empty div
      $tweet.attr('id', clickedClass);                    // add a class of the username to the div
      $tweet.html(  '<h4>@</h4>' + 
                    '<b>' + '<h2>' + tweet.user + '</h2>' + '</b><br>' + 
                    tweet.message +
                    ' <i class="timestamp">'+ $.timeago(tweet.created_at) + '</i>');
      $tweet.appendTo($tweetContainer);                 // append tweets to the nav
      index -= 1;                                       // reduce index by 1
      
    }
  }
  
  chooseUserStream();                                   // call the chooseUserStream function when nav is clicked
  
  });

  $('.middle-column').on('click', '.refreshAllTweets', function() {
    console.log('refreshAllTweets clicked!')
    clearInterval (setTweetInterval);
    setTweetInterval = window.setInterval(function() {    
      refreshHomePageTweets();
    }, 5000);
    refreshHomePageTweets();
  })
})