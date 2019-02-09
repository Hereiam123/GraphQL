const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

//Test data
const customers = [
  { id: "1", name: "John Doe", email: "jdoe@gmail.com", age: 35 },
  { id: "2", name: "Steve SMith", email: "steve@gmail.com", age: 25 },
  { id: "3", name: "Jane Jonah", email: "jane@gmail.com", age: 46 }
];

//Customer Type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id == args.id) {
            return customers[i];
          }
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
