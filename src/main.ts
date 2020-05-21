type OpcallResult<T> = {
  success: true;
  value: T;
} | {
  success: false;
  error: string;
}

import { DataStoreService } from "@rbxts/services"

export class DataStore<T> {
  private instance: GlobalDataStore
  constructor (public readonly store: string, public readonly scope?: string, public readonly max: number = math.huge) {
    if (scope) {
      this.instance = DataStoreService.GetDataStore(store, scope)
    } else {
      this.instance = DataStoreService.GetDataStore(store)
    }
  }
  /**
   * get
   * Runs GetAsync wuth automatic retry. Will throw if request fails. 
   * @param key Key to use in GetAsync call
   * @returns Data from the key
   */
  public get(key: string): T | undefined {
    let retries = 0
    let result: OpcallResult<T | undefined>
    do {
      result = opcall(() => {
        return this.instance.GetAsync(key)
      })
      retries++
    } while (retries <= this.max && !result.success);
    if (!result.success) {
      error(`Error in DataStore.get: ${result}`)
    }
    return result.value
  }
  /**
   * set
   * Runs SetAsync with automatic retry. Will throw if request fails. 
   * @param key Key to set
   * @param data Data to set the key to
   */
  public set(key: string, data: T) {
    let retries = 0
    let result: OpcallResult<void>
    do {
      result = opcall(() => {
        return this.instance.SetAsync(key, data)
      })
      retries++
    } while (retries <= this.max && !result.success);
    if (!result.success) {
      error(`Error in DataStore.get: ${result}`)
    }
  }
  /**
   * remove
   * Runs RemoveAsync with automatic retry. Will throw if request fails. 
   * @param key Key to remove
   */
  public remove(key: string): T | undefined {
    let retries = 0
    let result: OpcallResult<T | undefined>
    do {
      result = opcall(() => {
        return this.instance.RemoveAsync(key)
      })
      retries++
    } while (retries <= this.max && !result.success);
    if (!result.success) {
      error(`Error in DataStore.get: ${result}`)
    }
    return result.value
  }
}
