#Get the last 4000 candlesticks of BTC/USDT and BNB/BTC for 1 hours timeframe on Binance exchange
##save and read data on mongoDB
##recive with query on GraphQL


0- install mongoDB locally

1- node app.js

2- localhost:4000/graphql

3- 
query {
  getAllBtcUsdt {
    symbol
    timestamp
    open
    highest
    lowest
    close
    volume
  }
}

query {
  getAllBnbBtc {
    symbol
    timestamp
    open
    highest
    lowest
    close
    volume
  }
}




##created by Mrshaker