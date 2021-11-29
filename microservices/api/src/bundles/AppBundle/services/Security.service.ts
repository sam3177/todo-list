import {
	Service,
	Inject,
	EventManager,
	ContainerInstance,
} from '@bluelibs/core';
import { TodosCollection } from '../collections';
import { ObjectId } from '@bluelibs/ejson';

@Service()
export class SecurityService {
	todosCollection: TodosCollection;
	constructor (protected readonly container: ContainerInstance) {
		this.todosCollection = container.get(TodosCollection);
	}

	public async checkTodoOwner (
		todoId: ObjectId,
		userId: ObjectId,
	): Promise<boolean> {
		const result = await this.todosCollection.findOne({
			_id: todoId,
			createdById: userId,
		});
		return !!result;
	}
}
