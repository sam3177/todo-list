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

	public async checkUserOwnsTodo (
		todoId: ObjectId,
		userId: ObjectId,
	) {
		const result = await this.todosCollection.findOne({
			_id: todoId,
		});
		if (result.createdById.toString() !== userId.toString())
			throw new Error(
				"Dang it! This todo is not yours.",
			);
	}
}
