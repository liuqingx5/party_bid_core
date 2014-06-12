function Bidding(sms_json) {
    this.phone = sms_json.messages[0].phone;
    this.price = sms_json.messages[0].message.substr(2).replace(/\s/g, '');
}

Bidding.save = function (sms_json) {
    if (localStorage.is_bidding == "true" && Bidding.sign_up_current_activity(sms_json)) {
        var bids = JSON.parse(localStorage.bids);
        var biddings = [];
        var bidding = new Bidding(sms_json);
        _.map(bids, function (bid) {
            Bidding.find_activity_bids() ? bid.biddings = biddings : '';
        })
        biddings.push(bidding);
        localStorage.setItem('bids', JSON.stringify(bids));
    }
}

Bidding.find_activity_bids = function () {
    return _.find(Bid.get_bids(), function (bid) {
        return bid.activity_id == localStorage.current_activity && bid.name == localStorage.current_bid;
    })
}

Bidding.sign_up_current_activity = function (sms_json) {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    return _.find(sign_ups, function (sign_up) {
        return sign_up.activity_id == localStorage.current_activity && sign_up.phone == sms_json.messages[0].phone;
    })
}

Bidding.current_activity_bid_biddings = function (activity, bid_name) {
    var current_activity_bid_biddings = _.find(Bid.get_bids(), function (bid) {
        return bid.activity_id == activity && bid.name == bid_name;
    })
    return current_activity_bid_biddings.biddings;
}

Bidding.bidding_results = function (activity, bid_name) {
    return _.chain(Bidding.current_activity_bid_biddings(activity, bid_name))
        .groupBy(function (current_activity_bid_bidding) {
            return current_activity_bid_bidding.price;
        })
        .sortBy(function (current_activity_bid_bidding) {
            return current_activity_bid_bidding.price;
        })
        .value();
}

Bidding.success_bidding = function (activity, bid_name) {
    return _.find(Bidding.bidding_results(activity, bid_name), function (bidding_result) {
        return bidding_result.length == '1';
    })
}

Bidding.sign_up_current = function (activity, bid_name) {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    return _.chain(sign_ups)
        .filter(function (sign_up) {
            return sign_up.activity_id == activity;
        })
        .find(function (sign_up) {
            return sign_up.phone == Bidding.success_bidding(activity, bid_name)[0].phone;
        })
        .value();
}

Bidding.render_biddings = function (activity, bid_name) {
    var successes = [];
    var success = {}
    success.name = Bidding.sign_up_current(activity, bid_name).name;
    success.phone = Bidding.success_bidding(activity, bid_name)[0].phone;
    success.price = Bidding.success_bidding(activity, bid_name)[0].price;
    successes.push(success);
    return successes;
}
