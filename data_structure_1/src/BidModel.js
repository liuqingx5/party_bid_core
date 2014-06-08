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

Bid.this_activity_bid = function () {
    return _.find(Activity.current(), function (activity) {
        return  activity.bids.name == localStorage.current_bid;
    })
}
