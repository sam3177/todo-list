import * as X from "@bluelibs/x-bundle";
import { IResolverMap } from "@bluelibs/graphql-bundle";

import { NewUserInfoInput } from "../../../services/inputs/NewUserInfo.input";
import { UserRegistrationService } from "../../../services/UserRegistration.service";

export default {
  Mutation: {
    RegisterUser: [
      X.ToModel(NewUserInfoInput),
      X.Validate(),
      X.ToService(UserRegistrationService, "registerUser"),
    ],
  },
} as IResolverMap;
