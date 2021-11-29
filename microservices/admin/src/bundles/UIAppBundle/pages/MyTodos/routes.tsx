import { IRoute } from '@bluelibs/x-ui';
import {UnorderedListOutlined } from '@ant-design/icons';
import { MyTodos } from './MyTodos';

export const MY_TODOS: IRoute = {
	path: '/user/my-todos',
	component: MyTodos,
	roles: [ 'USER',"ADMIN" ],
	menu: {
		key: 'My todos',
		// label: "management.todos.menu.title",
		icon: UnorderedListOutlined,
	},
};
