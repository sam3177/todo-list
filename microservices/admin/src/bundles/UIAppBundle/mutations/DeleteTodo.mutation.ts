import { gql } from "@apollo/client";


export const USER_TODOS_DELETE = gql`
mutation UserTodosDelete($input:UserTodosDeleteInput!){
  UserTodosDelete(input:$input)
}
`