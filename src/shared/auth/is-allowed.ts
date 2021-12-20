import { intersection } from 'lodash';
import { Roles } from '@dragonfish/models';

export function isAllowed(requestRoles: Roles[], requiredRoles: Roles[]) {
    const hasRoles: Roles[] = intersection(requestRoles, requiredRoles);

    return hasRoles.length !== 0;
}
