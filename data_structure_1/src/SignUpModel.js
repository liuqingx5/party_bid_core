function SignUp(sms_json) {
    this.name = sms_json.messages[0].message.substr(2).replace(/\s/g, '');
    this.phone = sms_json.messages[0].phone;
}

SignUp.save_sign_up = function (sms_json) {
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    if (localStorage.is_signing_up) {
        var activity = new Activity('');
        var sign_ups = new SignUp(sms_json);
        var current_activities = _.map(activities, function (activity) {
            return activity.name == localStorage.current_activity ? activity.sign_ups = sign_ups : '';
        })
        activities.push(current_activities);
        localStorage.setItem('activities', JSON.stringify(activities));
    }
}

SignUp.current_activity = function (current_name) {
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    return _.filter(activities, function (activity) {
        return activity.name == current_name;
    })
}

SignUp.render_sign_ups = function (current_name) {
    return SignUp.current_activity(current_name).sign_ups;
}