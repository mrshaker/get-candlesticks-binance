const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList
} = graphql
const models = require('../models/models')
const candlestickType = require('./TypeDefs/candlestickType')

// make GraphQL queries for BTC/USDT and BNB/BTC
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllBtcUsdt: {
      type: new GraphQLList(candlestickType),
      resolve (parent, args) {
        return models.CandlestickBtcUsdt.find({})
      }
    },
    getAllBnbBtc: {
      type: new GraphQLList(candlestickType),
      resolve (parent, args) {
        return models.CandlestickBnbBtc.find({})
      }
    }
  }
})

module.exports = new GraphQLSchema({ query: RootQuery })
