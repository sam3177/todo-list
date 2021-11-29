import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class NewTodoInfoInput {
  @Is(a.string().required())
  title: string;

  @Is(a.string().nullable())
  cretedById?: string;

  @Is(a.boolean().nullable())
  isDone?: boolean;
}
