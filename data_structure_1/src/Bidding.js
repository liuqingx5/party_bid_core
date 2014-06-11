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



