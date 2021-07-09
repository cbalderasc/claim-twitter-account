import { PersistentMap } from "near-sdk-core";

@nearBindgen
export class UserData {
    publicKey: string;
    claimed: bool;

    constructor(key: string, claimed: bool) {
        this.publicKey = key;
        this.claimed = claimed;
    }
}

export let userData = new PersistentMap<string, UserData>("data")