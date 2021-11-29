import { Schema, Is, a, an } from "@bluelibs/validator-bundle";

@Schema()
export class IdInput {
  @Is(an.objectId().required())
  _id: any;
}
