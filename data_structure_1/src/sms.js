function notify_sms_received(json_message) {
    var get_bm_jj = {
        'BM': function (json_message) {

        },
        'JJ': function (json_message) {

        }
    }
    get_bm_jj[json_message.messages[0].message.substr(0, 2).toUpperCase()]();

}