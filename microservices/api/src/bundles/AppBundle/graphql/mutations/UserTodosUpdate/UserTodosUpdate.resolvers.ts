import * as X from '@bluelibs/x-bundle';
import { IResolverMap } from '@bluelibs/graphql-bundle';
import { UserRoles } from '../../../collections';

import { UserTodosUpdateInput } from '../../../services/inputs/UserTodosUpdate.input';
import { TodoService } from '../../../services/Todo.service';

export default {
	Mutation: {
		UserTodosUpdate: [
			X.CheckLoggedIn(),
			X.CheckPermission([ UserRoles.USER, UserRoles.ADMIN ]),
			X.ToModel(UserTodosUpdateInput),
			X.Validate(),
			X.ToService(TodoService, 'update'),
		],
	},
} as IResolverMap;
