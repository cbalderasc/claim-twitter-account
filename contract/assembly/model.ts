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

    toString():string {
        return "key: " + this.publicKey +"\n" + "accId: " + this.accountId;
    }

    changeClaimed(val: bool):void {
        this.claimed = val;
    }
}

export let userData = new PersistentVector<UserData>("data")