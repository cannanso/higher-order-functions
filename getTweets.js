//readmore url constructor http://twitter.com/"+{users screename}+"/status/"+{tweet id_str}
//hashtag search url  http://twitter.com/search?q=%23" + {hashtag text}
//view user http://twitter.com/"+ {user screen_name}

$(document).ready(function(){
	var tweets = [];
	var retweets = [];
    //bind event handlers
    $('.buttons a').click(function(e){e.preventDefault();});
    $('.showRetweets').click(function(){
    	$('.showTweets').html(retweets);
    });
    $('.showFavorited').click(function(){});
    $('.showAll').click(function(){
    	$('.showTweets').html(tweets);
    });
    // get JSON data
    $.getJSON('data.json',function(response){
	   		tweets = response.map(function(data){
	    		return '<div class="tweet"><p>'+ data.text + '</p></div>';
	    	});
	    	retweets = response.filter(function(element){
	    		if(element.retweeted){
	    			return '<div class="tweet"><p>'+ element.text + '</p></div>';
	    		}
	    	});
	    $('.showTweets').append(tweets);
    });
});

