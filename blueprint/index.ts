import { Users } from "./collections/Users";
import { Todos } from "./collections/Todos";
import { generateProject, app } from "./utils";

const application = app({
  id: "todo-app",
  sharedModels: [
    // Configure shared models
  ],
  collections: [Users, Todos],
});

generateProject(application, {
  // Mark this as true when you want to override even the non-overridable files
  // override: true,
});
