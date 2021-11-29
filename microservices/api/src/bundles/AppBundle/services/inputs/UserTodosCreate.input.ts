import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class UserTodosCreateInput {
  @Is(a.string().required())
  title: string;
}
