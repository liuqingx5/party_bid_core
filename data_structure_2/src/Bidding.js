function Bidding(sms_json) {
    this.phone = sms_json.messages[0].phone;
    this.price = sms_json.messages[0].message.substr(2).replace(/\s/g, '');

}

Bidding.create_new_bid = function (activity_id) {
    var activities = JSON.parse(localStorage.activities);
    var bids = [];
    var bid = "竞价" + (bids.length + 1);
    activities[activity_id].bids.push(bid);
    activities[activity_id].biddings[activities[activity_id].bids] = [];
    localStorage.setItem('activities', JSON.stringify(activities));
}


Bidding.save_bidding_message = function (sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var current_activity = localStorage.current_activity;
    var current_bid = localStorage.current_bid;
    if (localStorage.is_bidding == "true" && Bidding.judge_sign_up_current_activity(sms_json)) {
        activities[current_activity].biddings[current_bid] = [];
        var bidding = new Bidding(sms_json);
        activities[current_activity].biddings[current_bid].push(bidding);
        localStorage.setItem('activities', JSON.stringify(activities));
    }
}

Bidding.judge_sign_up_current_activity = function (sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var current_sign_ups = activities[localStorage.current_activity].sign_ups;
    return _.find(current_sign_ups,function(current_sign_up){
        return current_sign_up.phone == sms_json.messages[0].phone;
    })
}

