import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class TodoUpdateInput {
  @Is(a.string().nullable())
  example?: string;
}
