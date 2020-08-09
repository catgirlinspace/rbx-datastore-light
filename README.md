# @rbxts/datastore-light

[![NPM](https://nodei.co/npm/@rbxts/datastore-light.png)](https://npmjs.org/package/@rbxts/datastore-light)

Installation: 
```npm i @rbxts/datastore-light```

Example use: 
```typescript
import { DataStore } from "@rbxts/datastore-light"

let MainStore = new DataStore<string>("Main", "MyScope", math.huge) // Creates a new DataStore object with the type 'string', the name 'main', the scope 'MyScope' and an infinite amount of retries

MainStore.set("hello", "hi")
MainStore.get("hello") // hi
MainStore.remove("hello")

// or use promises
// promises can be cancelled and will stop attempting on the next retry

MainStore.setAsync("hello", "hi").then(() => {
    return MainStore.getAsync("hello") // promise that resolves to "hi"
}).then(() => {
    return MainStore.removeAsync("hello")
})
```

Ordered data stores have 2 new APIs. `getOrdered` and `getOrderedAsync` which function similarly to how they're documented on the Roblox Developer Hub. 


# [API Reference](https://github.com/Dog2puppy/rbx-datastore-light/wiki)