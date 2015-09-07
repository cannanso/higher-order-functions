//url constructor http://twitter.com/"+{users screename}+"/status/"+{tweet id_str}
//hashtag search url  http://twitter.com/search?q=%23" + {hashtag text}
// view user http://twitter.com/"+ {user screen_name}

$(document).ready(function(){
    //bind event handlers
    $('.buttons a').click(function(e){e.preventDefault()});
    $('.showRetweets').click(function(){changeTweets(onlyRetweets())});
    $('.showFavorited').click(function(){changeTweets(onlyFavorites())});
    $('.showAll').click(function(){changeTweets(showAll());});

    var formattedTweets;
    // get JSON data
    var data = $.getJSON('/data.json');
    var rawTweets = data.then(function(response){
        formattedTweets = response.map(function(tweet){
            var tweetText = tweet.text;
            var tweetFavorites = tweet.favorite_count;
            var tweetFavorited = tweet.favorited;
            var tweetRetweets = tweet.retweet_count;
            var tweetRetweeted = tweet.retweeted;
            var tweetLink = 'http://twitter.com/'+tweet.user_screename+'/status/'+ tweet.id_str;
            if(tweet.entities.hashtags.length > 0) {
                tweet.entities.hashtags.forEach(function(hashtag){
                   tweetText= tweetText.replace("#" + hashtag.text, "<a href='http://twitter.com/search?q=%23" + hashtag.text + "' target='_Blank'>#" + hashtag.text + "</a>");
                });
            }
            if(tweet.entities.user_mentions.length > 0){
                tweet.entities.user_mentions.forEach(function (user) {
                    tweetText = tweetText.replace("@"+user.screen_name, "<a href='http://twitter.com/"+user.screen_name+"' target='_Blank'>@"+user.screen_name+"</a>");
                });
            }
           return {
               html:'<div class="tweet" data-favorited="'+tweetFavorited+'" data-retweeted="'+tweetRetweeted+'">'+
               '<p>'+tweetText+'</p>'+
               '<p class="favorites">favorites <span>'+tweetFavorites+'</span></p><p class="retweets">retweets <span>'+tweetRetweets+'</span></p>'+
               '<a href="'+tweetLink+'" class="readMore">View on twitter</a>'+
               '</div>',
               retweeted:tweetRetweeted,
               favorited: tweetFavorited
           }

        });
        changeTweets(showAll());
    });
    function onlyRetweets(){
         var dataArray = formattedTweets.filter(function(tweet){
            return (tweet.retweeted === true);
        });
        return createHTML(dataArray);
    }
   function onlyFavorites(){
        var dataArray =  formattedTweets.filter(function(tweet){
            return (tweet.favorited === true);
        });
       return createHTML(dataArray);
    }
    function showAll(){
        return createHTML(formattedTweets);
    }
    function createHTML(dataArray){
        return dataArray.map(function(tweet){return tweet.html})
    }
    function changeTweets(tweetList){
        $('.showTweets').html(tweetList);
    }
});

