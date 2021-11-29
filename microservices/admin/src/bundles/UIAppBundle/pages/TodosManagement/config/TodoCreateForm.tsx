import { Service } from "@bluelibs/core";
import { TodoCreateForm as BaseTodoCreateForm } from "@bundles/UIAppBundle/pages/TodosManagement/config/TodoCreateForm.base";

@Service({ transient: true })
export class TodoCreateForm extends BaseTodoCreateForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
    
  }
}
