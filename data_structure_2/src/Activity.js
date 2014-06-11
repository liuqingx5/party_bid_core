function Activity(activity) {
    this.name = activity;
    this.sign_ups = [];
    this.bids = [];
    this.biddings = {};
}

Activity.prototype.create = function () {
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    activities[Activity.activity_id_generator()] = this;
    localStorage.setItem('activities', JSON.stringify(activities));
    var activity_ids = JSON.parse(localStorage.getItem('activity_ids')) || [];
    activity_ids.push(Activity.activity_id_generator().toString());
    localStorage.setItem('activity_ids', JSON.stringify(activity_ids));
    localStorage.current_activity = Activity.activity_id_generator();
    localStorage.activity_id_generator = Activity.activity_id_generator() + 1;
}

Activity.activity_ids = function () {
    return JSON.parse(localStorage.getItem('activity_ids'));
}

Activity.activity_id_generator = function () {
    return parseInt(localStorage.getItem('activity_id_generator'));
}


