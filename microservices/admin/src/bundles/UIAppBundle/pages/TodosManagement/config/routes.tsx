/** @overridable */
import { IRoute } from '@bluelibs/x-ui';
import * as React from 'react';
import { TodosList } from '../components/List/TodosList';
import { TodosCreate } from '../components/Create/TodosCreate';
import { TodosEdit } from '../components/Edit/TodosEdit';
import { TodosView } from '../components/View/TodosView';

import { SettingFilled } from '@ant-design/icons';

export const TODOS_LIST: IRoute = {
	path: '/admin/todos',
	component: TodosList,
	menu: {
		key: 'TODOS_LIST',
		label: 'management.todos.menu.title',
		icon: SettingFilled,
	},
};

export const TODOS_CREATE: IRoute = {
	path: '/admin/todos/create',
	component: TodosCreate,
};

export const TODOS_EDIT: IRoute<{ id: string }> = {
	path: '/admin/todos/:id/edit',
	component: TodosEdit,
};

export const TODOS_VIEW: IRoute<{ id: string }> = {
	path: '/admin/todos/:id/view',
	component: TodosView,
};
