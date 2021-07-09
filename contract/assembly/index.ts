import { Context, logging, storage, PersistentMap } from 'near-sdk-as'
import { userData, UserData } from './model'



export function save_user_data_for_claiming(accountId: string, key: string, link: string, claimed: bool): void { 
  let ud = new UserData(key, claimed, link, accountId);
  userData.push(ud);
  logging.log("User data added");
}

export function change_claimed_state(accountId: string):void {
  
}

export function get_user_data(): Array<UserData> {
  const result = new Array<UserData>(userData.length);
  for (let i = 0; i < userData.length; i++) {
    result[i] = userData[i];
  }
  return result;
}
