import { DataStoreService } from "rbx-services";

let maxRetries = 6

export class DataStore {
  private instance: GlobalDataStore
  constructor (public readonly store: string, public readonly scope: string) {
    this.instance = DataStoreService.GetDataStore(store, scope)
  }
  /**
   * get
   * Runs a GetAsync wuth automatic retry. Will throw if request fails. 
   * @param key Key to use in GetAsync call
   * @returns Data from the key
   */
  public get(key: string) {
    let retries = 0
    let success = false
    let result
    while (retries <= maxRetries && success === false) {
      try {
        result = this.instance.GetAsync(key)
        success = true
      } catch(err) {
        retries++
        result = err
      }
    }
    if (success === true) {
      return result
    } else {
      error("Error in DataStore.get", result)
    }
  }
  /**
   * set
   * Runs a SetAsync with automatic retry. Will throw if request fails. 
   * @param key Key to set
   * @param data Data to set the key to
   */
  public set(key: string, data: any) {
    let retries = 0
    let success = false
    let result
    while (retries <= maxRetries && success === false) {
      try {
        result = this.instance.SetAsync(key, data)
        success = true
      } catch(err) {
        retries++
        result = err
      }
    }
    if (success === true) {
      return result
    } else {
      error("Error in DataStore.set", result)
    }
  }
  /**
   * set
   * Runs a RemoveAsync with automatic retry. Will throw if request fails. 
   * @param key Key to remove
   */
  public remove(key: string) {
    let retries = 0
    let success = false
    let result
    while (retries <= maxRetries && success === false) {
      try {
        result = this.instance.RemoveAsync(key)
        success = true
      } catch(err) {
        retries++
        result = err
      }
    }
    if (success === true) {
      return result
    } else {
      error("Error in DataStore.remove", result)
    }
  }
}
