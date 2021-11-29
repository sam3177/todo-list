import * as X from '@bluelibs/x-bundle';
import { IResolverMap } from '@bluelibs/graphql-bundle';

import { TodoService } from '../../../services/Todo.service';
import { UserRoles } from '../../../collections';

export default {
	Query: {
		UserTodosFind: [
			X.CheckLoggedIn(),
			X.CheckPermission([UserRoles.USER, UserRoles.ADMIN]),
			X.ToService(TodoService, 'find', (_, ctx) => [ ctx.userId ]),
		],
	},
} as IResolverMap;
