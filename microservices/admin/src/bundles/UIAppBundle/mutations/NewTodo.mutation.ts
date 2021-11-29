import { gql } from "@apollo/client";


export const USER_TODOS_CREATE = gql`
mutation UserTodosCreate($input:UserTodosCreateInput!){
  UserTodosCreate(input:$input)
}
`