import { ArgumentNode, GraphQLObjectType, GraphQLString } from "graphql";
import m$user from "../modules/user.module";

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'Description Query GraphQL',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: (_parentValue: ParentNode, _args: ArgumentNode) => {
                return "hello, graphql"
            }
        },
        users: m$user.users,
        user: m$user.user
    }
})

export default RootQuery