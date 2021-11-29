export default /* GraphQL */ `
  input UserTodosUpdateInput {
    todoId:ObjectId!
    title: String
    isDone: Boolean
  }
`;
