import {
	Service,
	Inject,
	EventManager,
	ContainerInstance,
} from '@bluelibs/core';
import { PermissionService } from '@bluelibs/security-bundle';
import { XPasswordService } from '@bluelibs/x-password-bundle';
import { NewUserInfoInput } from './inputs/NewUserInfo.input';

@Service()
export class UserRegistrationService {
	constructor (protected readonly container: ContainerInstance) {}

	public async registerUser (input: NewUserInfoInput) {
		const passwordService = this.container.get(XPasswordService);
		const permissionService = this.container.get(PermissionService);

		const { userId } = await passwordService.register(input);
		await permissionService.add({
			userId,
			permission: 'USER',
			domain: 'app',
		});
	}
}
