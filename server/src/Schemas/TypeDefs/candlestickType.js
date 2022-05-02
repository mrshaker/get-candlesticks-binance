const graphql = require('graphql')
const { GraphQLObjectType, GraphQLFloat, GraphQLString } = graphql

// define type and schema of collection document to use in GraphQL
const candlestickType = new GraphQLObjectType({
  name: 'Candlestick',
  fields: () => ({
    symbol: { type: GraphQLString },
    timestamp: { type: GraphQLFloat },
    open: { type: GraphQLFloat },
    highest: { type: GraphQLFloat },
    lowest: { type: GraphQLFloat },
    close: { type: GraphQLFloat },
    volume: { type: GraphQLFloat }
  })
})

module.exports = candlestickType
