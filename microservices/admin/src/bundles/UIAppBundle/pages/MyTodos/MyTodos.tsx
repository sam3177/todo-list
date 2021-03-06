import { useUIComponents, useTranslate } from '@bluelibs/x-ui';
import { useEffect, useState, useRef, LegacyRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import * as Ant from 'antd';
import {
	DragDropContext,
	Droppable,
	Draggable,
} from 'react-beautiful-dnd';
import {
	Todo,
	UserTodosCreateInput,
	UserTodosDeleteInput,
	UserTodosUpdateInput,
} from '@root/api.types';
import { useMutation, useQuery } from '@apollo/client';
import { USER_TODOS_CREATE } from '@bundles/UIAppBundle/mutations/NewTodo.mutation';
import { USER_TODOS_UPDATE } from '@bundles/UIAppBundle/mutations/UpdateTodo.mutation';
import { USER_TODOS_DELETE } from '@bundles/UIAppBundle/mutations/DeleteTodo.mutation';
import { USER_TODOS_FIND } from '@bundles/UIAppBundle/queries/getUserTodos.query';
import './styles.scss';
import TodoComponent from './TodoComponent';

export const MyTodos = () => {
	const t = useTranslate();
	const UIComponents = useUIComponents();

	const [ todos, setTodos ] = useState([]);

	const [ form ] = Ant.Form.useForm();

	const [ createUserTodo ] = useMutation(USER_TODOS_CREATE);
	const [ updateUserTodo ] = useMutation(USER_TODOS_UPDATE);
	const [ deleteUserTodo ] = useMutation(USER_TODOS_DELETE);

	const { loading, data } = useQuery(USER_TODOS_FIND, {
		fetchPolicy: 'network-only',
	});

	useEffect(
		() => {
			if (loading) return;
			setTodos(data.UserTodosFind as Todo[]);
		},
		[ loading ],
	);

	const addNewTodo = async (values: any) => {
		const input: UserTodosCreateInput = { title: values.todoTitle };

		console.log(values);
		form.resetFields();

		const response = await createUserTodo({
			variables: { input },
		});
		setTodos((oldTodos) => [
			...oldTodos,
			{ ...input, isDone: false, _id: response.data.UserTodosCreate },
		]);
	};

	const updateTodo = async (
		id: string,
		data: { title: string; isDone: boolean },
	) => {
		const input: UserTodosUpdateInput = {
			todoId: id,
			...data,
		};
		await updateUserTodo({
			variables: { input },
		});
		setTodos((oldTodos) => {
			const idx = oldTodos.findIndex((todo) => todo._id === id);
			const copy = [ ...oldTodos ];
			copy[idx] = { ...copy[idx], ...data };
			return copy;
		});
	};

	const deleteTodo = async (id: string) => {
		const input: UserTodosDeleteInput = {
			todoId: id,
		};
		await deleteUserTodo({ variables: { input } });
		setTodos((oldTodos) => {
			const idx = oldTodos.findIndex((todo) => todo._id === id);
			const copy = [ ...oldTodos ];
			copy.splice(idx, 1);
			return copy;
		});
	};

	const onDragEndHandler = (result: any) => {
		if (!result.destination) return;
		const items: Todo[] = [ ...todos ];
		const [ reorderedItem ] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setTodos(items);
	};

	return (
		<UIComponents.AdminLayout>
			<Ant.PageHeader title='MyTodos'>
				<Ant.Form
					form={form}
					name='control-hooks'
					onFinish={addNewTodo}>
					<Ant.Row>
						<Ant.Col span={12}>
							<Ant.Form.Item name='todoTitle'>
								<Ant.Input
									onChange={(e) =>
										form.setFieldsValue({
											todoTitle: e.target.value,
										})}
									required
									size='large'
									placeholder='Add a new todo title'
								/>{' '}
							</Ant.Form.Item>
						</Ant.Col>
						<Ant.Col span={6}>
							<Ant.Form.Item name='submit'>
								<Ant.Button
									htmlType='submit'
									className='new-todo-btn'
									key='1'
									icon={<PlusOutlined />}>
									{t('management.todos.list.create_btn')}
								</Ant.Button>
							</Ant.Form.Item>
						</Ant.Col>
					</Ant.Row>
				</Ant.Form>
			</Ant.PageHeader>
			<Ant.Layout.Content>
				<DragDropContext onDragEnd={onDragEndHandler}>
					<Droppable droppableId='page-todos-list'>
						{(provided) => (
							<ul
								className='page-todos-list'
								{...provided.droppableProps}
								ref={provided.innerRef}>
								{todos &&
									todos.map((todo, i) => (
										<Draggable
											key={todo._id}
											draggableId={todo._id}
											index={i}>
											{(provided) => (
												<li
													className='todo-item'
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}>
													<TodoComponent
														todo={todo}
														updateTodo={updateTodo}
														deleteTodo={deleteTodo}
													/>
												</li>
											)}
										</Draggable>
									))}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</DragDropContext>
			</Ant.Layout.Content>
		</UIComponents.AdminLayout>
	);
};
