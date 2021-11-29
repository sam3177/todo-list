import {
	Service,
	Inject,
	EventManager,
	ContainerInstance,
} from '@bluelibs/core';
import { ObjectId } from '@bluelibs/ejson';
import { SecurityService } from './Security.service';
import { TodosCollection } from '../collections';
import { UserTodosCreateInput, UserTodosUpdateInput } from './inputs';

@Service()
export class TodoService {
	todosCollection: TodosCollection;
	securityService: SecurityService;
	constructor (protected readonly container: ContainerInstance) {
		this.todosCollection = container.get(TodosCollection);
		this.securityService = container.get(SecurityService);
	}
	public async find (userId) {
		const result = await this.todosCollection.find({
			createdById: userId,
		});
		return await result.toArray();
	}

	public async create (
		input: UserTodosCreateInput,
		userId: ObjectId,
	) {
		const result = await this.todosCollection.insertOne(
			{
				title: input.title,
				isDone: false,
			},
			{
				context: { userId },
			},
		);
		return result.insertedId;
	}

	public async update (
		input: UserTodosUpdateInput,
		userId: ObjectId,
	) {
		const { todoId, ...data } = input;
		await this.securityService.checkUserOwnsTodo(todoId, userId);
		const result = await this.todosCollection.updateOne(
			{ _id: todoId },
			{ $set: data },
		);
		return !!result.modifiedCount;
	}

	public async delete (
		input: UserTodosUpdateInput,
		userId: ObjectId,
	) {
		const { todoId } = input;
		await this.securityService.checkUserOwnsTodo(todoId, userId);
		const result = await this.todosCollection.deleteOne({
			_id: todoId,
		});
		return !!result.deletedCount;
	}
}
