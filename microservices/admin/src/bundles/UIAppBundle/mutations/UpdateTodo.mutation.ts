import { gql } from "@apollo/client";


export const USER_TODOS_UPDATE = gql`
mutation UserTodosUpdate($input:UserTodosUpdateInput!){
  UserTodosUpdate(input:$input)
}
`