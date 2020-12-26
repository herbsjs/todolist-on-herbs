const { gql } = require('apollo-server-express')
const { TodoList } = require('../../../../../domain/entities/todoList')
const { entity2type } = require('herbs2gql')

module.exports = gql(entity2type(TodoList))