
export default /* GraphQL */ `
  input NewTodoInfoInput {
    createdById: ObjectId!
    isDone: Boolean!
    title: String!
  }
`;
