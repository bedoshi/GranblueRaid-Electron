window.$ = window.jQuery = require('jquery')
const Twitter = require('twitter')
const { clipboard, remote } = require('electron')

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

        if(isValidHelpTweet(event.text, targetId)) {
            console.log(event && event.text)
            writeToClipboard(targetId)
            updateLatestText(event.text, targetId)
        }

    });
})

/**
 * 有効な救援Tweetか判定する
 * @param {*} text tweet text
 * @param {*} id helper id
 */
function isValidHelpTweet(text, id) {
    return id != null && id != '' && includingID(text)
}

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
 * テキスト内に「参戦ID」の文字列があるか判定する
 * @param {*} text Tweet text
 */
function includingID(text) {
    return text.match(/参戦ID/);
}
