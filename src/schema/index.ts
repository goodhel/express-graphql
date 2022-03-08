import { GraphQLSchema } from "graphql";
import RootMutation from "./mutation";
import RootQuery from "./query";

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

export default schema