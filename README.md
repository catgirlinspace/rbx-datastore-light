# rbx-datastore-light

[![NPM](https://nodei.co/npm/rbx-datastore-light.png)](https://npmjs.org/package/rbx-datastore-light)

Installation: 
```npm i rbx-datastore-light```

Example use: 
```typescript
import { DataStore } from "rbx-datastore-light"

let MainStore = new DataStore("Main", "MyScope")

MainStore.set("hello", "hi")
MainStore.get("hello") // hi
MainStore.remove("hello")
```
