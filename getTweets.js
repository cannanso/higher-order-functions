//readmore url constructor http://twitter.com/"+{users screename}+"/status/"+{tweet id_str}
//hashtag search url  http://twitter.com/search?q=%23" + {hashtag text}
//view user http://twitter.com/"+ {user screen_name}

$(document).ready(function(){
    //bind event handlers
    $('.buttons a').click(function(e){e.preventDefault();});
    $('.showRetweets').click(function(){});
    $('.showFavorited').click(function(){});
    $('.showAll').click(function(){});
    // get JSON data
    $.getJSON('data.json',function(response){
	    var tweets = response.map(function(data){
	    	return '<div class="tweet"><p>'+ data.text + '</p></div>';
	    });
	    $('.showTweets').append(tweets);
    });
});

