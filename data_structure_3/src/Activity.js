function Activity(activity_name) {
    this.name = activity_name;
    this.id = Activity.find_activity_id_generator().toString();
}

Activity.find_activity_id_generator = function () {
    return parseInt(localStorage.activity_id_generator);
};

Activity.prototype.create = function () {
    var activities = JSON.parse(localStorage.getItem('activities'));
    var activity = this;
    activities.push(activity);
    localStorage.setItem('activities', JSON.stringify(activities));
    localStorage.current_activity = Activity.find_activity_id_generator();
    localStorage.activity_id_generator = Activity.find_activity_id_generator() + 1;
}

