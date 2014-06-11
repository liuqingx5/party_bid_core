function Bid(bid) {
    this.name = bid;
    this.biddings = [];
}

Bid.create_new_bid = function (activity_name) {
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    var bids = [];
    var bid = new Bid("竞价" + (Activity.this_activity(activity_name).bids.length + 1));
    _.map(activities, function (activity) {
        Activity.this_activity(activity_name) ? activity.bids = bids : '';
    })
    bids.push(bid);
    localStorage.setItem('activities', JSON.stringify(activities));
}

Bid.current_activity_bids = function () {
    return Activity.current().bids;
}

Bid.this_activity_bid = function () {
    return _.find(Bid.current_activity_bids(), function (bid) {
        return  bid.name == localStorage.current_bid;
    })
}


