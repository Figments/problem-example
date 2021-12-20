import { FrontendAccount } from '@dragonfish/models';

export interface LoginPackage {
    readonly account: FrontendAccount;
    readonly token: string;
}
