import React, { RefObject, useRef, useState, useEffect } from 'react';
import { Row, Col, Checkbox, Button, Input } from 'antd';
import {
	DeleteOutlined,
	EditOutlined,
	CheckOutlined,
	RollbackOutlined,
} from '@ant-design/icons';

const TodoComponent = ({ todo, updateTodo, deleteTodo }) => {
	const [ todoTitle, setTodoTitle ] = useState(null);
	const [ showForm, setShowForm ] = useState(false);
	const input: RefObject<Input> = useRef();
	const toggleShowForm = () => {
		setShowForm((oldState) => !oldState);
		setTodoTitle(null);
		setTimeout(() => input.current.focus(), 50);
	};
	const containerRef = useRef(null);
	useEffect(
		() => {
			const handleClickOutside = (e) => {
				if (
					containerRef.current &&
					!containerRef.current.contains(e.target) &&
					showForm
				) {
					setShowForm(false);
				}
			};
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		},
		[ containerRef, showForm ],
	);
	const handleSubmit = (e) => {
		e.preventDefault();
		updateTodo(todo._id, { title: todoTitle || todo.title });
		toggleShowForm();
	};
	return (
		<Row className='todo-container' key={todo._id} ref={containerRef}>
			<Col span={14} lg={16} xl={18}>
				{showForm ? (
					<form onSubmit={handleSubmit} className='edit-form'>
						<Input
							ref={input}
							value={todoTitle === null ? todo.title : todoTitle}
							required
							className='edit-todo-input'
							onChange={(e) => setTodoTitle(e.target.value)}
							placeholder='Edit todo'
						/>
						<Button htmlType='submit' className='edit-todo-btn'>
							<CheckOutlined />
						</Button>
					</form>
				) : (
					<h1 className='todo-title'>{todo.title}</h1>
				)}
			</Col>
			<Col span={10} lg={8} xl={6} className='todo-actions'>
				<Button className='edit-todo-btn' onClick={toggleShowForm}>
					{showForm ? <RollbackOutlined /> : <EditOutlined />}
				</Button>
				<Checkbox
					className='todo-check'
					checked={todo.isDone}
					onChange={() =>
						updateTodo(todo._id, { isDone: !todo.isDone })}
				/>
				<Button
					className='delete-todo-btn'
					onClick={() => deleteTodo(todo._id)}>
					<DeleteOutlined />
				</Button>
			</Col>
		</Row>
	);
};

export default TodoComponent;
