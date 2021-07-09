import { Context, logging, storage, PersistentMap } from 'near-sdk-as'
import { userData } from './model'



export function saveUserDataForClaiming(accountId: string, ): string | null { 
  return ''; 
}

export function setGreeting(message: string): void {
  const account_id = Context.sender

  // Use logging.log to record logs permanently to the blockchain!
  logging.log(
    // String interpolation (`like ${this}`) is a work in progress:
    // https://github.com/AssemblyScript/assemblyscript/pull/1115
    'Saving greeting "' + message + '" for account "' + account_id + '"'
  )

  storage.set(account_id, message)
}
