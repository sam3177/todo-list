import * as X from '@bluelibs/x-bundle';
import { IResolverMap } from '@bluelibs/graphql-bundle';

import { UserTodosCreateInput } from '../../../services/inputs/UserTodosCreate.input';
import { TodoService } from '../../../services/Todo.service';
import { UserRoles } from '../../../collections';

export default {
	Mutation: {
		UserTodosCreate: [
			X.CheckLoggedIn(),
			X.CheckPermission([ UserRoles.USER, UserRoles.ADMIN ]),
			X.ToModel(UserTodosCreateInput),
			X.Validate(),
			X.ToService(TodoService, 'create'),
		],
	},
} as IResolverMap;
