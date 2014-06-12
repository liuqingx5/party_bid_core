function Bid(activity_id) {
    this.name = "竞价" + (Bid.find_current_activity_bids().length + 1);
    this.activity_id = activity_id;
    this.biddings = [];
}

Bid.get_bids = function () {
    return JSON.parse(localStorage.bids);
}

Bid.find_current_activity_bids = function () {
    return _.filter(Bid.get_bids(), function (bid) {
        return bid.activity_id == localStorage.current_activity;
    })
}

Bid.create_new_bid = function (activity_id) {
    var bids = JSON.parse(localStorage.bids);
    var bid = new Bid(activity_id);
    bids.push(bid);
    localStorage.setItem('bids', JSON.stringify(bids));
}

Bid.render_bids = function (activity_id) {
    var bids = JSON.parse(localStorage.bids);
    return _.filter(bids, function (bid) {
        return bid.activity_id == activity_id;
    })
}
