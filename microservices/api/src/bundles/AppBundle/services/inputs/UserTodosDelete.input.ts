import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class UserTodosDeleteInput {
  @Is(an.objectId().required())
  todoId: any;
}
