import { Context, logging, storage, PersistentMap } from 'near-sdk-as'
import { userData, UserData } from './model'



export function save_user_data_for_claiming(accountId: string, key: string, link: string, claimed: bool): void { 
  let ud = new UserData(key, claimed, link, accountId);
  userData.push(ud);
  logging.log("User data added");
}

export function change_claimed_state(accountId: string):void {
  
}

export function remove_all_elements(accountId: string):void {
  while(userData.length > 0) {
    userData.pop();
  }
}

export function get_user_data(): Array<UserData> {
  const result = new Array<UserData>(userData.length);
  for (let i = 0; i < userData.length; i++) {
    result[i] = userData[i];
  }
  return result;
}

export function get_user_data_by_name(username:string): Array<UserData> {
  const result = new Array<UserData>(1);
  for (let i = 0; i < userData.length; i++) {
    const elem = userData[i];
    if (elem.accountId.toString() == username) {
      result[0] = userData[i];
      break;
    }
  }
  logging.log(result.toString());
  return result;
}
