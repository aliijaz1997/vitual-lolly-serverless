const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb'),
  q = faunadb.query;
const axios = require("axios");
const typeDefs = gql`
  type Query {
    getVCard: [vCard]
    getLollyByLink(link: String!) : vCard
  }
  type vCard {
    id: ID!
    c1: String!
    c2: String!
    c3: String!
    rec: String!
    sender: String!
    msg: String!
    link: String!
  }
  type Mutation {
    addVCard(c1: String!, 
      c2: String!,
      c3: String!,
      rec: String!,
      sender: String!,
      link: String!
      msg: String!) : vCard
  }
`

const resolvers = {
  Query: {
    getVCard : async () => {
      try {
        var client = new faunadb.Client({ secret: process.env.FaunaDB_Secret_Token});
        var result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("lolliindex"))),
            q.Lambda(x => q.Get(x))
          )
        );
        // console.log(result)
        return result.data.map(Lolly => {
          return {
            id : Lolly.data.id,
            c1 : Lolly.data.c1,
            c2 : Lolly.data.c2,
            c3 : Lolly.data.c3,
            rec : Lolly.data.rec,
            sender : Lolly.data.sender,
            link : Lolly.data.link,
            msg : Lolly.data.msg,
          }
        })
      } catch (error) {
        console.log(`Error is ${error}` );
      }
    },
    getLollyByLink : async (_,{link}) => {
        try {
          var adminClient = new faunadb.Client({secret : process.env.FaunaDB_Secret_Token});
          var result = adminClient.query(
            q.Get(q.Match(q.Index("lolliindex"), link))
          )
          // console.log("data is ", result.data.data)
          return result.data
        } catch (e) {
          console.log(e)
        }
    }

  },
  Mutation: {
    addVCard: async (_, { c1, c2, c3, rec, msg, sender,link }) => {
      var adminClient = new faunadb.Client({ secret: process.env.FaunaDB_Secret_Token });

      console.log(c1, c2, c3, rec, msg, sender)
      const result = await adminClient.query(
        q.Create(
          q.Collection('lollycollection'),
          {
            data: {
              c1, c2, c3, rec, msg, sender,link
            }
          },
        )
      )

      axios.post("https://api.netlify.com/build_hooks/601b00caf5f12a21162f9005")
      .then(function(response) {
        console.log("response")
      })
      .catch(function(error)
      {
        console.log("error")
      })
      console.log("The added data is = ",result.data);
      return result.data.data
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()