function notify_sms_received(sms_json) {

    var bm_jj = sms_json.messages[0].message.substr(0, 2).toUpperCase();

    var get_bm_jj = {
        'BM': function () {
            SignUp.save_sms(sms_json);
        },
        'JJ': function () {
            Bidding.save_bidding(sms_json);

        }
    }
    get_bm_jj[bm_jj]();

}