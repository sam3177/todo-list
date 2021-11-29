import { gql } from "@apollo/client";


export const REGISTER_USER = gql`
mutation RegisterUser($input:NewUserInfoInput!){
  RegisterUser(input:$input)
}
`