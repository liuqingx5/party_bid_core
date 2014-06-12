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


