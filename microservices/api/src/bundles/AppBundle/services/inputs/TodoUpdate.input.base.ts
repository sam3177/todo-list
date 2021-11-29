/** overridable */
import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoUpdateInput {
  @Is(a.boolean().nullable())
  isDone?: boolean;

  @Is(a.string().nullable())
  title?: string;
}
