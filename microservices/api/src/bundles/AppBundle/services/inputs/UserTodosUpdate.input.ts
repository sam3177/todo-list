import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class UserTodosUpdateInput {
  @Is(an.objectId().required())
  todoId: any;
  @Is(a.string().nullable())
  title?: string;

  @Is(a.boolean().nullable())
  isDone?: boolean;
}
