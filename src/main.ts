type OpcallResult<T> =
	| {
		success: true;
		value: T;
	}
	| {
		success: false;
		error: string;
	};

import { DataStoreService } from "@rbxts/services";

export class DataStore<T> {
	private instance: GlobalDataStore;
	constructor(
		public readonly store: string,
		public readonly scope?: string,
		public readonly max: number = math.huge,
	) {
		if (scope) {
			this.instance = DataStoreService.GetDataStore(store, scope);
		} else {
			this.instance = DataStoreService.GetDataStore(store);
		}
	}

	private callWithRetries<U>(methodName: string, callback: () => U) {
		let retries = 0;
		let result: OpcallResult<U>;
		do {
			result = opcall(callback);
			retries++;
		} while (retries <= this.max && !result.success);
		if (!result.success) {
			return error(`Error in ${methodName}: ${result}`);
		}
		return result.value;
	}

	private callWithRetriesAsync<U>(methodName: string, callback: () => U): Promise<U> {
		return new Promise((resolve, reject, onCancel) => {
			Promise.spawn(() => {
				let retries = 0;
				let result: OpcallResult<U>;
				let cancelled = false;

				onCancel(() => cancelled = true)

				do {
					result = opcall(callback);
					retries++;
				} while (retries <= this.max && !result.success && !cancelled);
				if (!result.success) {
					return reject(`Error in ${methodName}: ${result}`);
				}
				resolve(result.value)
			})
		})
	}

	/**
	 * get
	 * Runs GetAsync with automatic retry. Will throw if request fails.
	 * @param key Key to use in GetAsync call
	 * @returns Data from the key
	 */
	public get(key: string): T | undefined {
		return this.callWithRetries("DataStore.get", () => this.instance.GetAsync(key));
	}

  /**
	 * getAsync
	 * Runs GetAsync with automatic retry. Will reject if request fails.
	 * @param key Key to use in GetAsync call
	 * @returns Cancellable promise that resolves to T or undefined.
	 */

	public getAsync(key: string): Promise<T | undefined> {
		let res = this.callWithRetriesAsync("DataStore.getAsync", () => this.instance.GetAsync<T>(key));
		return res
	}

	/**
	 * set
	 * Runs SetAsync with automatic retry. Will throw if request fails.
	 * @param key Key to set
	 * @param data Data to set the key to
	 */
	public set(key: string, data: T) {
		return this.callWithRetries("DataStore.set", () => this.instance.SetAsync(key, data));
  }
  
  /**
	 * setAsync
	 * Runs SetAsync with automatic retry. Will reject if request fails.
	 * @param key Key to set
	 * @param data Data to set the key to
   * @returns Cancellable promise
	 */

	public setAsync(key: string, data: T): Promise<void> {
		let res = this.callWithRetriesAsync("DataStore.setAsync", () => this.instance.SetAsync(key, data));
	}

	/**
	 * remove
	 * Runs RemoveAsync with automatic retry. Will throw if request fails.
	 * @param key Key to remove
	 */
	public remove(key: string): T | undefined {
		return this.callWithRetries("DataStore.remove", () => this.instance.RemoveAsync(key));
  }
  
  /**
	 * removeAsync
	 * Runs RemoveAsync with automatic retry. Will reject if request fails.
	 * @param key Key to remove
   * @returns Cancellable promise that resolves to T or undefined
	 */

	public removeAsync(key: string): Promise<T | undefined> {
		let res = this.callWithRetriesAsync("DataStore.removeAsync", () => this.instance.RemoveAsync<T>(key));
		return res
	}
}

export class DataStoreOrdered<T> {
	private instance: OrderedDataStore;
	constructor(
		public readonly store: string,
		public readonly scope?: string,
		public readonly max: number = math.huge,
	) {
		if (scope) {
			this.instance = DataStoreService.GetOrderedDataStore(store, scope);
		} else {
			this.instance = DataStoreService.GetOrderedDataStore(store);
		}
	}

	private callWithRetries<U>(methodName: string, callback: () => U) {
		let retries = 0;
		let result: OpcallResult<U>;
		do {
			result = opcall(callback);
			retries++;
		} while (retries <= this.max && !result.success);
		if (!result.success) {
			return error(`Error in ${methodName}: ${result}`);
		}
		return result.value;
	}

	private callWithRetriesAsync<U>(methodName: string, callback: () => U): Promise<U> {
		return new Promise((resolve, reject, onCancel) => {
			Promise.spawn(() => {
				let retries = 0;
				let result: OpcallResult<U>;
				let cancelled = false;

				onCancel(() => cancelled = true)

				do {
					result = opcall(callback);
					retries++;
				} while (retries <= this.max && !result.success && !cancelled);
				if (!result.success) {
					return reject(`Error in ${methodName}: ${result}`);
				}
				resolve(result.value)
			})
		})
	}

	/**
	 * get
	 * Runs GetAsync with automatic retry. Will throw if request fails.
	 * @param key Key to use in GetAsync call
	 * @returns Data from the key
	 */
	public get(key: string): T | undefined {
		return this.callWithRetries("DataStore.get", () => this.instance.GetAsync(key));
	}

  /**
	 * getAsync
	 * Runs GetAsync with automatic retry. Will reject if request fails.
	 * @param key Key to use in GetAsync call
	 * @returns Cancellable promise that resolves to T or undefined.
	 */

	public getAsync(key: string): Promise<T | undefined> {
		let res = this.callWithRetriesAsync("DataStore.getAsync", () => this.instance.GetAsync<T>(key));
		return res
  }
  
  /**
	 * getSorted
	 * Runs GetAsync with automatic retry. Will throw if request fails.
	 * @param key Key to use in GetAsync call
	 * @returns Data from the key
	 */
	public getSorted(ascending: boolean = false, pageSize: number = 10, minValue?: number, maxValue?: number): DataStorePages {
		return this.callWithRetries("DataStore.getSorted", () => this.instance.GetSortedAsync(ascending, pageSize, minValue, maxValue));
	}

  /**
	 * getSortedAsync
	 * Runs GetAsync with automatic retry. Will reject if request fails.
	 * @param key Key to use in GetAsync call
	 * @returns Cancellable promise that resolves to T or undefined.
	 */

	public getSortedAsync(ascending: boolean = false, pageSize: number = 10, minValue?: number, maxValue?: number): Promise<DataStorePages> {
		let res = this.callWithRetriesAsync("DataStore.getSortedAsync", () => this.instance.GetSortedAsync(ascending, pageSize, minValue, maxValue));
		return res
	}

	/**
	 * set
	 * Runs SetAsync with automatic retry. Will throw if request fails.
	 * @param key Key to set
	 * @param data Data to set the key to
	 */
	public set(key: string, data: T) {
		return this.callWithRetries("DataStore.set", () => this.instance.SetAsync(key, data));
  }
  
  /**
	 * setAsync
	 * Runs SetAsync with automatic retry. Will reject if request fails.
	 * @param key Key to set
	 * @param data Data to set the key to
   * @returns Cancellable promise
	 */

	public setAsync(key: string, data: T): Promise<void> {
		let res = this.callWithRetriesAsync("DataStore.setAsync", () => this.instance.SetAsync(key, data));
		return res;
	}

	/**
	 * remove
	 * Runs RemoveAsync with automatic retry. Will throw if request fails.
	 * @param key Key to remove
	 */
	public remove(key: string): T | undefined {
		return this.callWithRetries("DataStore.remove", () => this.instance.RemoveAsync(key));
  }
  
  /**
	 * removeAsync
	 * Runs RemoveAsync with automatic retry. Will reject if request fails.
	 * @param key Key to remove
   * @returns Cancellable promise that resolves to T or undefined
	 */

	public removeAsync(key: string): Promise<T | undefined> {
		let res = this.callWithRetriesAsync("DataStore.removeAsync", () => this.instance.RemoveAsync<T>(key));
		return res
	}
}
