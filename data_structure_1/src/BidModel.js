function Bid(bid) {
    this.name = bid;
    this.biddings = [];
}

Bid.create_new_bid = function (activity_name) {
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    var bids = [];
    var bid_name = "竞价" + (Activity.this_activity(activity_name).bids.length + 1);
    var bid = new Bid(bid_name);
    _.map(activities, function (activity) {
        Activity.this_activity(activity_name) ? activity.bids = bids : '';
    })
    bids.push(bid);
    localStorage.setItem('activities', JSON.stringify(activities));

}