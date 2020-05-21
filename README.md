# @rbxts/datastore-light

[![NPM](https://nodei.co/npm/@rbxts/datastore-light.png)](https://npmjs.org/package/rbx-datastore-light)

Installation: 
```npm i @rbxts/datastore-light```

Example use: 
```typescript
import { DataStore } from "@rbxts/datastore-light"

let MainStore = new DataStore<string>("Main", "MyScope", math.huge) // Creates a new DataStore object with the type 'string', the name 'main', the scope 'MyScope' and an infinite amount of retries

MainStore.set("hello", "hi")
MainStore.get("hello") // hi
MainStore.remove("hello")
```

# [API Reference](https://github.com/Dog2puppy/rbx-datastore-light/wiki)