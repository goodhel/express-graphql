import { ArgumentNode, GraphQLObjectType, GraphQLString } from "graphql"
import m$user from "../modules/user.module"

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Description Mutation GraphQL',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: (_parentValue: ParentNode, _args: ArgumentNode) => {
                return "hello, mutation graphql"
            }
        },
        createUser: m$user.createUser
    }
})

export default RootMutation