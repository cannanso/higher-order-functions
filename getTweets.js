//readmore url constructor http://twitter.com/"+{users screename}+"/status/"+{tweet id_str}
//hashtag search url  http://twitter.com/search?q=%23" + {hashtag text}
//view user http://twitter.com/"+ {user screen_name}

function formatTweet(data){
    return '<div class="tweet">'+
            '<p>' + data.text + '</p>'+
            '<p class="favorites">favorites <span>'+ data.favorite_count + '</span></p><p class="retweets">retweets <span>' + data.retweet_count + '</span></p>'+
            '<a href="http://twitter.com/'+ data.user.screen_name + '/status/"'+ data.id_str +'" class="readMore">View on twitter</a>'+
            '</div>';
}

$(document).ready(function(){
	var tweets = [];
	var retweets = [];
    var favorites = [];
    var totalRetweets;

    //bind event handlers
    $('.buttons a').click(function(e){e.preventDefault();});
    $('.showRetweets').click(function(){
    	$('.showTweets').html(retweets);
    });
    $('.showFavorited').click(function(){
        $('.showTweets').html(favorites);
    });
    $('.showAll').click(function(){
    	$('.showTweets').html(tweets);
    });
    // get JSON data
//http://twitter.com/"+{users screename}+"/status/"+{tweet id_str}

    $.getJSON('data.json',function(response){
   		tweets = response.map(function(data){
    		return formatTweet(data);
    	});

    	retweets = response.filter(function(element){
    		return element.retweeted;
    	}).map(function(data){
            return formatTweet(data);
        });

        favorites = response.filter(function(element){
            return element.favorited;
        }).map(function(data){
            return formatTweet(data);
        });

        totalRetweets = response.map(function(data){
            return data.retweet_count;
        }).reduce(function(total, num){
            return total + num;
        }, 0);

	    $('.showTweets').append(tweets);
        $('.showRetweets').append(' (' + totalRetweets + ')');
    });
});

