const mongoose = require('mongoose')

// symbols to calling currencies
const symbols = { BTCUSDT: 'BTC/USDT', BNBBTC: 'BNB/BTC' }

// making schema of documents
const candlestickSchema = {
  symbol: String,
  timestamp: Number,
  open: Number,
  highest: Number,
  lowest: Number,
  close: Number,
  volume: Number
}

// making models or collections for candlestick
const CandlestickBtcUsdt = mongoose.model('Btc-usdt-doc', candlestickSchema)
const CandlestickBnbBtc = mongoose.model('Bnb-btc-doc', candlestickSchema)

// sava all candlesticks on DB
function saveOnDB (candlesticks, symbol) {
  return new Promise((resolve) => {
    if (symbol === 'BTC/USDT') {
      CandlestickBtcUsdt.insertMany(candlesticks, (err) => {
        if (err) {
          console.log(err)
        } else {
          resolve('Successfully saved all BTC/USDT candlesticks on DB.')
        }
      })
    } else if (symbol === 'BNB/BTC') {
      CandlestickBnbBtc.insertMany(candlesticks, (err) => {
        if (err) {
          console.log(err)
        } else {
          resolve('Successfully saved all BNB/BTC candlesticks on DB.')
        }
      })
    }
  })
}

module.exports = {
  symbols,
  candlestickSchema,
  CandlestickBtcUsdt,
  CandlestickBnbBtc,
  saveOnDB
}
