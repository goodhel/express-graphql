import {
  ArgumentNode,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import mysql from '../helper/database'
import bcrypt from 'bcrypt'

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'Get User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    created_at: { type: GraphQLString },
    udpated_at: { type: GraphQLString },
  }),
})

const createUserType = new GraphQLObjectType({
  name: 'createUser',
  description: 'Create New User',
  fields: () => ({
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  })
})

interface UserId extends ArgumentNode {
    id: number
}

interface createUser extends ArgumentNode {
    username: string
    password: string
}

class user {
  /**
   * Get List User
   */
  users = {
    type: new GraphQLList(userType),
    resolve: async (_parentValue: ParentNode, _args: ArgumentNode) => {
      return mysql
        .query(
          `SELECT id, username, password, created_at, updated_at FROM auth_user`,
          []
        )
        .then((results) => {
          console.log(results)
          return results
        })
        .catch((error) => {
          return error
        })
    },
  }

  /**
   * Get User by Id
   * @param {number} id id user
   */
  user = {
    type: userType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: async (_parentValue: ParentNode, args: UserId) => {
      return mysql
        .query(
          `SELECT id, username, password, created_at, updated_at FROM auth_user WHERE id = ?`,
          [args.id]
        )
        .then((results) => {
          // console.log(results)
          return results[0]
        })
        .catch((error) => {
          return error
        })
    },
  }

  /**
   * Create User
   * @param {string} username
   * @param {string} password
   */
  createUser = {
    type: createUserType,
    args: {
      username: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: async (_parentvalue: ParentNode, args: createUser) => {
      const password = bcrypt.hashSync(args.password, 10)
      return mysql.query(
        `INSERT INTO auth_user (username, password) VALUES (?, ?)`,
        [args.username, password]
      ).then(results => {
        return results
      }).catch(error => {
        return error
      })
    }
  }
}

export default new user()
