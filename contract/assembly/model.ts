import { PersistentVector } from "near-sdk-core";

@nearBindgen
export class UserData {
    publicKey: string;
    claimed: bool;
    link: string;
    accountId: string;

    constructor(key: string, claimed: bool, link: string, accountId: string) {
        this.publicKey = key;
        this.claimed = claimed;
        this.link = link;
        this.accountId = accountId;
    }
}

export let userData = new PersistentVector<UserData>("data")