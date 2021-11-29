import { gql } from "@apollo/client";

export const USER_TODOS_FIND = gql`
query UserTodosFind{
  UserTodosFind{
    title
    _id
    createdById
    isDone
    
  }
}`