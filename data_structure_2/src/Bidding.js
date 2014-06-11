function Bidding(sms_json) {
    this.phone = sms_json.messages[0].phone;
    this.price = sms_json.messages[0].message.substr(2).replace(/\s/g, '');
}

Bidding.create_new_bid = function (activity_id) {
    var activities = JSON.parse(localStorage.activities);
    var bids = [];
    var bid = "竞价" + (bids.length + 1);
    activities[activity_id].bids.push(bid);
    localStorage.setItem('activities', JSON.stringify(activities));
}



