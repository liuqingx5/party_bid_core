function notify_sms_received(sms_json) {
    var get_bm_jj = {
        'BM': function (sms_json) {
            SignUp.save_sign_up(sms_json);
        },
        'JJ': function (sms_json) {

        }
    }
    get_bm_jj[sms_json.messages[0].message.substr(0, 2).toUpperCase()]();

}