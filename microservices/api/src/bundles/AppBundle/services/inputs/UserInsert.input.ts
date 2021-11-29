import { Schema, Is, a, an } from '@bluelibs/validator-bundle';
import { UserInsertInput as BaseUserInsertInput } from './UserInsert.input.base';
import { UserRoles } from '../../collections';

@Schema()
export class UserInsertInput extends BaseUserInsertInput {
	// You can extend the base here
	@Is(
		an
			.array()
			.of(a.string().oneOf(Object.values(UserRoles)))
			.required(),
	)
	roles: UserRoles[] = [];
}
