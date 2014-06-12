function Bidding(sms_json) {
    this.name = SignUp.sign_current_activity(sms_json).name;
    this.phone = sms_json.messages[0].phone;
    this.price = sms_json.messages[0].message.substr(2).replace(/\s/g, '');
}

Bidding.save_bidding = function (sms_json) {
    if (localStorage.is_bidding == 'true' && SignUp.sign_current_activity(sms_json)) {
        var activities = JSON.parse(localStorage.getItem("activities")) || [];
        var biddings = [];
        var bidding = new Bidding(sms_json);
        biddings.push(bidding);
        var current_bids = Bidding.current_activity_bids(activities);
        _.map(current_bids.bids, function (bid) {
            return  bid.name == localStorage.current_bid ? bid.biddings = biddings : '';
        })
        localStorage.setItem('activities', JSON.stringify(activities));
    }
}

Bidding.current_activity_bids = function (activities) {
    return _.find(activities, function (activity) {
        return activity.name == localStorage.current_activity;
    })
}

Bidding.transform_bids_to_view_model = function (name) {
    var current_activity = _.find(Activity.get(), function (activity) {
        return activity.name == name;
    })
    return current_activity.bids;
}

Bidding.current_activity_bid_biddings = function (name, bid) {
    var current_activity = _.find(Activity.get(), function (activity) {
        return activity.name == name;
    })
    var current_activity_bid = _.find(current_activity.bids, function (current_activity_bid) {
        return current_activity_bid.name == bid;
    })
    return current_activity_bid.biddings;
}

Bidding.success_bidding = function (name, bid) {
    return  _.chain(Bidding.current_activity_bid_biddings(name, bid))
        .groupBy(function (current_activity_bid_bidding) {
            return current_activity_bid_bidding.price;
        })
        .sortBy(function (current_activity_bid_bidding) {
            return current_activity_bid_bidding.price;
        })
        .value();
}

Bidding.transform_biddings_to_view_model = function (name, bid) {
    return _.find(Bidding.success_bidding(name, bid), function (success_bidding) {
        return success_bidding.length == '1';
    })
}




