
function calcRSI(size = 14, prices){
    let wins = 0
    let losses = 0 

    for ( let i = prices.length - size; i < prices.length; i++){
        const delta = prices[i] - prices[i-1]
        if (delta >= 0){
            wins += delta;
        }else{
            losses -= delta;
        }
    }
    const relativeStreght = wins / losses;
    return 100 - (100 / (1 + relativeStreght))
}

function readUserData(){
    fs = require('fs');
    const raw = fs.readFileSync('key.json');
    return JSON.parse(raw);
}

( async () => {

    key = readUserData()

    const axios = require('axios');
    const candles = await axios.get('https://api.binance.com/api/v3/klines?symbol=ETHBUSD&interval=1m')
    const closes = candles.data.map(candle => parseFloat(candle[4]))
    console.log(closes)

    const WebSocket = require('ws');
    // launchpad
    //const ws = new WebSocket('wss://stream.binance.com:9443/ws/!bookTicker'); // to get all tickers booked on time
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethbusd@kline_1m');
    
    const { Telegraf } = require ('telegraf')
    const bot = new Telegraf(key.token)
    
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.k.x){ // if is a closed candle
            const price = parseFloat(data.k.c)
            closes.push(price)
            const rsi = calcRSI(14, closes)
            if ( rsi >= 70 ){
                const overboughtMsg = `RSI (${rsi}) OverBOUGTH!\nETH_BUSD: ${price}`;
                bot.telegram.sendMessage(key.chatid, overboughtMsg) 
                console.log(overboughtMsg)
            }else if ( rsi <= 30 ){
                const oversoldMsg = `RSI (${rsi}) OverSOLD!\nETH_BUSD: ${price}`;
                bot.telegram.sendMessage(key.chatid, oversoldMsg) 
                console.log(oversoldMsg)
            }
        }
    }
    
    console.log('Connected')
    
})()
    