import { IRoute } from "@bluelibs/x-ui";
import "@bundles/UIAppBundle/pages/TodosManagement/i18n";

import {
  TODOS_LIST as BASE_TODOS_LIST,
  TODOS_CREATE as BASE_TODOS_CREATE,
  TODOS_EDIT as BASE_TODOS_EDIT,
  TODOS_VIEW as BASE_TODOS_VIEW,
} from "@bundles/UIAppBundle/pages/TodosManagement/config/routes";

export const TODOS_LIST: IRoute = {
  ...BASE_TODOS_LIST, roles:["ADMIN"]
};

export const TODOS_CREATE: IRoute = {
  ...BASE_TODOS_CREATE, roles:["ADMIN"]
};

export const TODOS_EDIT: IRoute = {
  ...BASE_TODOS_EDIT, roles:["ADMIN"]
};

export const TODOS_VIEW: IRoute = {
  ...BASE_TODOS_VIEW, roles:["ADMIN"]
};

