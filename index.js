const WebSocket = require('ws');
const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethbusd@kline_1h');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const price = parseFloat(data.k.c)
    console.log("Current price: "+price)

    if (price >= 4315){
        console.log('Vender!')
    }else if (price <= 4135){
        console.log('Comparar!')
    }
}

console.log('Connected')

