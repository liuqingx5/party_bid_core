function SignUp(sms_json) {
    this.name = sms_json.messages[0].message.substr(2).replace(/\s/g, '');
    this.phone = sms_json.messages[0].phone;
    this.activity_id = localStorage.current_activity;
}


SignUp.save_message = function (sms_json) {
    if (localStorage.is_signing_up == "true" && !SignUp.judge_repeat(sms_json)) {
        var sign_ups = JSON.parse(localStorage.sign_ups);
        var sign_up = new SignUp(sms_json);
        sign_ups.push(sign_up);
        localStorage.setItem('sign_ups', JSON.stringify(sign_ups));
    }
}

SignUp.sign_current_activity = function () {
    var sign_ups = JSON.parse(localStorage.sign_ups);
    return  _.filter(sign_ups, function (sign_up) {
        return sign_up.activity_id == localStorage.current_activity;
    })
}

SignUp.judge_repeat = function (sms_json) {
    return _.find(SignUp.sign_current_activity(), function (sign_up) {
        return sign_up.phone == sms_json.messages[0].phone
    })
}
