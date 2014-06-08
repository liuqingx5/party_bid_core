function Activity(activity_name) {
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
}

Activity.prototype.create = function (activity) {
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    activities.push(activity);
    localStorage.setItem('activities', JSON.stringify(activities));
}

Activity.prototype.active = function (activity_name) {
    localStorage.current_activity = activity_name;
}

Activity.get = function () {
    return JSON.parse(localStorage.getItem('activities')) || [];
}

Activity.current = function () {
    return _.find(Activity.get(), function (avtivity) {
        return avtivity.name == localStorage.current_activity;
    })
}

Activity.current_name = function () {
    return Activity.current().name;
}

Activity.this_activity = function (activity_name) {
    return  _.find(Activity.get(), function (activity) {
        return activity.name == activity_name;
    })
}

