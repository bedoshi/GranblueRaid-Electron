# GranblueRaid-Electron 

## What's this?
- グラブルの救援ツールです。レイドファインダーとかのwebページをクリックする手間が面倒だったので作りました。
- This is a tool of granblue-fantasy for picking multi-battle id up.
- このアプリはTwitter api の アプリキー情報(consumer_key, consumer_secret, access_token_key, access_token_secret)が必要になります。
- This app needs Twitter api key-info.

## How to lunch this?
1. Node.jsをインストールしてください。 Install node.js
    - macの人はnodebrewがおすすめです。
    - 参考：https://qiita.com/ucan-lab/items/517ee13a2f8769ab866c
2. このリポジトリをクローンしてください。 Clone this repository.
3. 以下のコマンドをクローン先のパスで実行してください。 Exectute the following commands at the directory of cloning this.
```
npm install -g electron
npm ci
```
4. index.jsにTwitter api の アプリキー情報を入力してください。 Input your Twitter api key-info on `index.js`.
```
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

```
5. パッケージせずに立ち上げるときは下記コマンドを実行してください。 Execute the following command when you don't need packaging.
```
npm run electron
```
6. パッケージするときは環境に応じて下記コマンドを実行してください。 Execute the following commands with your environment.
```
npm run build:win # for windows.
npm run build:mac # for mac.
```

## How to use this?
1. 起動したら検索ウィンドウに自動で救援IDをコピーしたいマルチコンテンツ名を入力します(例 : シヴァ)。 Input the name of multi-boss content on the search textbox with kata-kana(e.g. シヴァ).
2. ツイッター救援が検知できれば自動でIDがコピーできます。 Automaticaly copying multi-boss ID to your clipboard with detecting the help-tweet.

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/vNVixHX1iXc/0.jpg)](https://www.youtube.com/watch?v=vNVixHX1iXc)
