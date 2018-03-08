var request = require('request');
var api;

request({
    url: "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole",
    json: true
}, getJson);
//----------
var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);
//---------
var stream = T.stream("user");

// Once every N milliseconds
setInterval(tweeter, 60 * 5 * 1000);


stream.on("follow", followed);

function followed(eventMsg) {
    var name = eventMsg.source.name;
    var screenName = eventMsg.source.screen_name;
    var tweet = "@" + screenName + ". Thank you for following. I'm Virtual Human Trafficking Expert. U can call me VHTE. Do u need any help? ";
    TweetIt(tweet);
}

stream.on("tweet", tweetEvent);

function tweetEvent(eventMsg) {
    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var screenName = eventMsg.user.screen_name;
    if (replyto == "V_H_T_E") {
        var tweet = "@" + screenName + ". Thank you for Reply. Have u decided to buy one. Free refunds within ten days!! ";
        TweetIt(tweet);
    }
}

function tweeter() {
    // This is a random name bot
    var randomIndex = Math.floor(Math.random() * api.length);
    var tweet1 = "Hi, I'm " + api[randomIndex].first + " " + api[randomIndex].last;
    var tweet2 = ". If u pay " + api[randomIndex].balance + " to Tom sama, I will be yours!"
    var tweet = tweet1 + tweet2;
    // Post that tweet!
    T.post('statuses/update', {
        status: tweet
    }, tweeted);

    // Callback for when the tweet is sent
    function tweeted(err, data, response) {
        if (err) {
            console.log(err);
        } else {
            console.log('tweeter Success: ' + data.text);
            //console.log(response);
        }
    };
}

function TweetIt(text) {
    T.post("statuses/update", {
        status: text
    }, tweeted);

    function tweeted(err, data, response) {
        if (err) {
            console.log(err);
        } else {
            console.log('retweetToFollower Success: ' + data.text);
        }
    };
}


//callback
function getJson(err, res, json) {
    api = json;
    // console.log(api);
    tweeter();
}
