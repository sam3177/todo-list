import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoInsertInput {
  @Is(a.string().nullable())
  example?: string;
}
