import * as X from '@bluelibs/x-bundle';
import { IResolverMap } from '@bluelibs/graphql-bundle';
import { UserRoles } from '../../../collections';

import { UserTodosDeleteInput } from '../../../services/inputs/UserTodosDelete.input';
import { TodoService } from '../../../services/Todo.service';

export default {
	Mutation: {
		UserTodosDelete: [
			X.CheckLoggedIn(),
			X.CheckPermission([ UserRoles.USER, UserRoles.ADMIN ]),
			X.ToModel(UserTodosDeleteInput),
			X.Validate(),
			X.ToService(TodoService, 'delete'),
		],
	},
} as IResolverMap;
