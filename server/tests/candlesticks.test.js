/* eslint-disable no-undef */
const { symbols } = require('../src/models/models')
const { getCandlesticks } = require('./../src/candlesticks')

// test getCandlesticks
describe('getCandlesticks', () => {
  jest.setTimeout(20000) // increase the timeout for doing jest tests
  // test API from Binance for BTC/USDT
  it('should be 4000 array of candlesticks for BTC/USDT from Binance API.', async () => {
    try {
      const result = await getCandlesticks(symbols.BTCUSDT)
      expect(result.length).toBe(4000)
    } catch (e) {
      expect(e).toThrow('API Error')
    }
  })
  // test API from Binance for BNB/BTC
  it('should be 4000 array of candlesticks for BNB/BTC from Binance API.', async () => {
    try {
      const result = await getCandlesticks(symbols.BNBBTC)
      expect(result.length).toBe(4000)
    } catch (e) {
      expect(e).toThrow('API Error')
    }
  })
})
