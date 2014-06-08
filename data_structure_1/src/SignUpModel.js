function SignUp(sms_json) {
    this.name = sms_json.messages[0].message.substr(2).replace(/\s/g, '');
    this.phone = sms_json.messages[0].phone;
}

SignUp.save_sms = function (sms_json) {
    if (localStorage.is_signing_up == 'true') {
        var activities = JSON.parse(localStorage.getItem('activities')) || [];
        var sign_ups = [];
        var sign_up = new SignUp(sms_json);
        _.map(activities, function (activity) {
            Activity.current_name() ? activity.sign_ups = sign_ups : '';
        })
        sign_ups.push(sign_up);
        localStorage.setItem('activities', JSON.stringify(activities));
    }
}

SignUp.render_sign_ups = function (activity_name) {
    return Activity.this_activity(activity_name).sign_ups;
}
