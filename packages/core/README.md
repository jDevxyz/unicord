# `@unicord/core`

> The core of Unicord, the Unicord itself

## Usage

```ts
import { UniBuilder, UniClient } from '@unicord/core';
import { MessageEvent } from './MessageEvent';

const client: UniClient = new UniBuilder()
    .setParameter({
        disableEveryone: true
    })
    .setToken(process.env.TOKEN)
    .addEventListener(new MessageEvent())
    .build()
```
