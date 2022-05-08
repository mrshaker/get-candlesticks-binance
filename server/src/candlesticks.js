const ccxt = require('ccxt')
const models = require('./models/models')

// symbols to calling currencies
const symbols = models.symbols

// getting candlesticks from Binance with ccxt
async function getCandlesticks (symbol) {
  try {
    const binance = new ccxt.binance() // create binance object with ccxt.
    const timeFrame = '1h' // defining time frame for candlesticks.
    const limitFetch = 1000 // maximum number for getting candlesticks from binance exchange.

    const candlesticksBuffer = [] // this is a buffer for keeping 4000 candlesticks records.
    const hourInMS = 3600000 // 1 hour in millisecond.
    const nowTimestamp = Date.now() // getting now Unix timestamp in millisecond.
    const startOfFetchTime = nowTimestamp - (4000 * hourInMS) // getting the Unix timestamp for 4000 hours earlier.
    const nextStepForSince = 1000 * hourInMS// gettin next step or 1000 hours for sinceFetch loop.

    for (let sinceFetch = startOfFetchTime; sinceFetch <= nowTimestamp; sinceFetch += nextStepForSince) {
      const candlesticks = await binance.fetchOHLCV(symbol, timeFrame, sinceFetch, limitFetch)
      // console.log(candlesticks)
      candlesticksBuffer.push(...candlesticks) // concatenate candlesticks arrays
    }
    // console.log(candlesticksBuffer)
    console.log('Numbers of candlesticks: ' + candlesticksBuffer.length)
    return new Promise(resolve => { resolve(candlesticksBuffer) })
  } catch (error) {
    console.log(error.message)
    console.log('API Error')
    throw error
  }
}

// saving candlesticks on mongoDB
function saveCandlesticks (candlesticks, symbol) {
  try {
    let Candlestick // create empty collection
    if (symbol === symbols.BTCUSDT) {
      // creating collection or model to keeping candlesticks documents or records.
      Candlestick = models.CandlestickBtcUsdt
    } else if (symbol === symbols.BNBBTC) {
      Candlestick = models.CandlestickBnbBtc
    }
    // create candlestick object array, before saving.
    const candlesticksArr = []
    candlesticks.forEach(candlestick => {
      const newCandlestick = new Candlestick({
        symbol,
        timestamp: candlestick[0],
        open: candlestick[1],
        highest: candlestick[2],
        lowest: candlestick[3],
        close: candlestick[4],
        volume: candlestick[5]
      })
      candlesticksArr.push(newCandlestick)
    })
    // save candlesticks on DB
    models.saveOnDB(candlesticksArr, symbol)
      .then((result) => {
        console.log(result)
        return result
      })
  } catch (error) {
    console.log(error.message)
    console.log('Database Error')
    throw error
  }
}

module.exports = {
  getCandlesticks,
  saveCandlesticks
}
