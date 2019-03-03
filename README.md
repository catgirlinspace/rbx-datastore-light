# rbx-datastore-light

[![NPM](https://nodei.co/npm/rbx-datastore-light.png)](https://npmjs.org/package/rbx-datastore-light)

Installation: 
```npm i rbx-datastore-light```

Example use: 
```typescript
import { DataStore } from "rbx-datastore-light"

let MainStore = new DataStore<string>("Main", "MyScope", math.huge) // Creates a new DataStore object with the type 'string', the name 'main', the scope 'MyScope' and an infinite amount of retries

MainStore.set("hello", "hi")
MainStore.get("hello") // hi
MainStore.remove("hello")
```
