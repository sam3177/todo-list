import { Service } from "@bluelibs/core";
import { TodoListFiltersForm as BaseTodoListFiltersForm } from "@bundles/UIAppBundle/pages/TodosManagement/config/TodoListFiltersForm.base";

@Service({ transient: true })
export class TodoListFiltersForm extends BaseTodoListFiltersForm {
  build() {
    super.build();

    // Perform additional modifications such as updating rendering functions, labels, description
  }
}
