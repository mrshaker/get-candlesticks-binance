const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')
const candlesticks = require('./src/candlesticks')
const config = require('./src/config/default.json')
const schema = require('./src/Schemas/index')
const { symbols } = require('./src/models/models')

const PORT = config.development.port // port 4000
const mongoDBport = 27017
const database = 'candlestickDB'

// connecting to localhost mongoDB
mongoose.connect('mongodb://localhost:' + mongoDBport + '/' + database, {
  useNewUrlParser: true
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

// getting BTC/USDT candlesticks from Binance
candlesticks.getCandlesticks(symbols.BTCUSDT)
  .then((documents) => {
    candlesticks.saveCandlesticks(documents, symbols.BTCUSDT) // saving documents on mongoDB collection
  }, (error) => {
    console.log(error)
  })

// getting BNB/BTC candlesticks from Binance
candlesticks.getCandlesticks(symbols.BNBBTC)
  .then((documents) => {
    candlesticks.saveCandlesticks(documents, symbols.BNBBTC) // saving documents on mongoDB collection
  }, (error) => {
    console.log(error)
  })

// run GraphQL server on localhost:4000/graphql
app.listen(PORT, () => {
  console.log('GraphQL server is running.')
})
