# no-store Extension

> **pi agent extension** that removes the `"store": false` field from provider request payloads.

## Overview

This extension removes the `"store": false` field from the request body when the pi agent sends requests to a provider (LLM API).

Some proxy/gateway servers or custom (OpenAI-compatible) servers do not support the `store` parameter and may return a 400 Bad Request error. This extension deletes the field right before the request is sent, ensuring the `store` field is not included in the request at all.

## Installation

Place the `no-store.ts` file in the `.pi/extensions/` directory at the project root, and pi will automatically load it.

```
.pi/
└── extensions/
    └── no-store.ts
```

## How It Works

1. Subscribes to the `before_provider_request` event.
2. Checks if the `store` field exists in the request payload.
3. If the `store` field exists, returns a new payload with that key removed.
4. If the `store` field does not exist, the original payload passes through unchanged.

## Use Case

This extension is useful in the following environments:

- When using an OpenAI-compatible custom server
- When routing through a proxy/gateway that does not support the `store` parameter
- When encountering repeated 400 Bad Request errors

## Configuration

No additional configuration is required. Once the extension file is placed, it is automatically activated.

## License

MIT
