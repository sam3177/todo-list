import { useUIComponents, useTranslate } from '@bluelibs/x-ui';
import { useEffect, useState } from 'react';
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
	const [ todos, setTodos ] = useState<Todo[]>();
	const [ todoTitle, setTodoTitle ] = useState<string>();
	const [ UserTodosCreate ] = useMutation(USER_TODOS_CREATE);
	const [ UserTodosUpdate ] = useMutation(USER_TODOS_UPDATE);
	const [ UserTodosDelete ] = useMutation(USER_TODOS_DELETE);
	const { loading: isLoading, data } = useQuery(USER_TODOS_FIND, {
		fetchPolicy: 'network-only',
	});

	useEffect(
		() => {
			if (isLoading) return;
			setTodos(data.UserTodosFind as Todo[]);
		},
		[ isLoading ],
	);

	const addNewTodo = async () => {
		const input: UserTodosCreateInput = { title: todoTitle };
		const freshTodo = await UserTodosCreate({
			variables: { input },
		});
		console.log(freshTodo);
		setTodos((oldTodos) => [
			...oldTodos,
			freshTodo.data.UserTodosCreate,
		]);
		setTodoTitle('');
	};

	const updateTodo = async (id, data) => {
		const input: UserTodosUpdateInput = {
			todoId: id,
			...data,
		};
		await UserTodosUpdate({
			variables: { input },
		});
		setTodos((oldTodos) =>
			oldTodos.map(
				(todo) => (todo._id === id ? { ...todo, ...data } : todo),
			),
		);
	};

	const deleteTodo = async (id) => {
		const input: UserTodosDeleteInput = {
			todoId: id,
		};
		await UserTodosDelete({ variables: { input } });
		setTodos((oldTodos) =>
			oldTodos.filter((todo) => todo._id !== id),
		);
	};
	const onDragEndHandler = (result) => {
		if (!result.destination) return;
		const items: Todo[] = [ ...todos ];
		const [ reorderedItem ] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setTodos(items);
	};
	return (
		<UIComponents.AdminLayout>
			<Ant.PageHeader title='MyTodos'>
				<Ant.Row>
					<Ant.Col span={12}>
						<Ant.Input
							value={todoTitle}
							size='large'
							onChange={(e) => setTodoTitle(e.target.value)}
							placeholder='Add a new todo title'
						/>
					</Ant.Col>
					<Ant.Col span={6}>
						<Ant.Button
							className='new-todo-btn'
							key='1'
							onClick={addNewTodo}
							icon={<PlusOutlined />}>
							{t('management.todos.list.create_btn')}
						</Ant.Button>
					</Ant.Col>
				</Ant.Row>
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
