function Bidding(sms_json) {
    this.name = Bidding.sign_current_activity(sms_json).name;
    this.phone = sms_json.messages[0].phone;
    this.price = sms_json.messages[0].message.substr(2).replace(/\s/g, '');
}


Bidding.sign_current_activity = function (sms_json) {
    var current_activity_sign_ups = Activity.current().sign_ups;
    var current_sign_up = _.find(current_activity_sign_ups, function (sign_up) {
        return sign_up.phone == sms_json.messages[0].phone;
    })
    console.log('aaaaaaaaaaaa', current_sign_up)
}

Bidding.save_bidding = function (sms_json) {
    if (localStorage.is_bidding == 'true' && Bidding.sign_current_activity(sms_json)) {
        var activities = JSON.parse(localStorage.getItem("activities")) || [];
        var biddings = [];
        var bidding = new Bidding(sms_json);
        _.map(activities, function (activity) {
            Bid.this_activity_bid() ? activity.bids.biddings = biddings : '';
        })
        biddings.push(bidding);
        localStorage.setItem('activities', JSON.stringify(activities));
    }
}


