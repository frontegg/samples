type Query {
        launches: [Launch]!
        launch(id: ID!): Launch
        me: User
}
