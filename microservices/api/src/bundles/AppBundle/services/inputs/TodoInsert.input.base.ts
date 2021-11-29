/** overridable */
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoInsertInput {
  @Is(a.boolean().required())
  isDone: boolean;

  @Is(a.string().required())
  title: string;
}
