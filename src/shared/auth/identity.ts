import { SetMetadata } from '@nestjs/common';
import { Roles } from '@dragonfish/models';

export const Identity = (...roles: Roles[]) => SetMetadata('identity', roles);
