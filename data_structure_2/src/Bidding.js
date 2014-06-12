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
    return _.find(current_sign_ups, function (current_sign_up) {
        return current_sign_up.phone == sms_json.messages[0].phone;
    })
}

Bidding.transform_bids_to_view_model = function (activity) {
    var activities = JSON.parse(localStorage.activities);
    return activities[activity].bids;

}

Bidding.transform_biddings_to_view_model = function (activity, bid) {
    var successes = [];
    var success = {};
    success.name = Bidding.find_success_people(activity, bid).name;
    success.phone = Bidding.success_bidding_message(activity, bid)[0].phone;
    success.price = Bidding.success_bidding_message(activity, bid)[0].price;
    successes.push(success);
    return successes;

}

Bidding.current_activity_bid_biddings = function (activity, bid) {
    var activities = JSON.parse(localStorage.activities);
    var current_activity_bid_biddings = activities[activity].biddings[bid];
    return  _.chain(current_activity_bid_biddings)
        .groupBy(function (current_activity_bid_bidding) {

            return current_activity_bid_bidding.price;
        })
        .sortBy(function (current_activity_bid_bidding) {
            return current_activity_bid_bidding.price;
        })
        .value()
}

Bidding.success_bidding_message = function (activity, bid) {
    return _.find(Bidding.current_activity_bid_biddings(activity, bid), function (current_activity_bid_bidding) {
        return current_activity_bid_bidding.length == '1';
    })
}

Bidding.find_success_people = function (activity, bid) {
    var activities = JSON.parse(localStorage.activities);
    var sign_ups = activities[activity].sign_ups;
    return  _.find(sign_ups, function (sign_up) {
        return sign_up.phone == Bidding.success_bidding_message(activity, bid)[0].phone;
    })
}

