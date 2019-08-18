window.$ = window.jQuery = require('jquery')
const Twitter = require('twitter')
const { clipboard, remote } = require('electron')
const notify = remote.require('./notifier')
const notification = (title, message) => {
    notify.notification(title, message)
}
// let consumer_key
// let consumer_secret
// let access_token_key
// let access_token_secret

// $.getJSON("secret.json", function(json) {
//     // console.log(json)

//     consumer_key = json['consumer_key']
//     consumer_secret = json['consumer_secret']
//     access_token_key = json['access_token_key']
//     access_token_secret = json['access_token_secret']

//     // console.log('consumer_key: ' + consumer_key)
//     // console.log('consumer_secret: ' + consumer_secret)
//     // console.log('access_token_key: ' + access_token_key)
//     // console.log('access_token_secret: ' + access_token_secret)
// })

const consumer_key = 'input your key'
const consumer_secret = 'input your key'
const access_token_key = 'input your key'
const access_token_secret = 'input your key'

const client = new Twitter({
    consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret
})

function testFunction() {
    console.log("start testFunction.");

    var params = {screen_name: 'bedoshi', count: 1};
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
        if (!error) {
            console.log(tweets);
        } else {
            console.error((error[0])['code'] + ': ' + (error[0])['message']);
        }
    });
}

// function stream() {
//     // const stream = client.stream('statuses/filter', {track: 'javascript'});
//     //     stream.on('data', function(event) {
//     //     console.log(event && event.text);
//     // });
 
//     // stream.on('error', function(error) {
//     //     throw error;
//     // });

//     const target = window.$('#inputedText').value
//     console.log("inputed text: " + target)
// }


$('#startBtn').click(function() {
    const target = $('#inputedText').val()
    
    if(target == null || target == '') {
        console.log('何も入力されていません')      
        return;
    } 

    console.log(target + 'が入力されています')

    const stream = client.stream('statuses/filter', {track: ('参戦ID,' + target)})
        stream.on('data', function(event) {
        
        const targetId = extractID(event.text)

        if(targetId != null && targetId != '') {
            console.log(event && event.text)
            writeToClipboard(targetId)
            notification(targetId)
            updateLatestText(event.text, targetId)
        }
        
    });
})

/**
 * 画面に表示する情報を更新する
 * @param {*} text 救援ツイート本文
 * @param {*} id 救援ID
 */
function updateLatestText(text, id) {
    $('label#latestText').text(text)
    $('label#latestID').text(id)
}

/**
 * 救援ツイートから救援IDのみを抽出する
 * @param {*} text 救援ID
 */
function extractID(text) {
    return text.match(/[0-9A-z]{8}/)
}

/**
 * クリップボードに救援IDをコピーする
 * @param {*} text 救援ID
 */
function writeToClipboard(text) {
    clipboard.writeText('Example String')
    clipboard.writeText('' + text)
}

/**
 * 通知ウィンドウを出す
 * @param {*} text 救援ID
 */
function openNotification(text) {
    notification('グラブル救援ツール あっと electron', text)
}