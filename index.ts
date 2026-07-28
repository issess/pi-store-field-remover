import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

/**
 * pi-store-field-remover extension
 * ------------------
 * Removes the `"store": false` field from the request body
 * when the pi agent sends requests to a provider (LLM API).
 *
 * Some proxy/gateway or custom (OpenAI-compatible) servers do not
 * support the `store` parameter and may return a 400 error.
 * This extension deletes the field right before sending so that
 * `store` is never included in the request.
 *
 * Location: project local `.pi/extensions/pi-store-field-remover.ts` (auto-loaded)
 */
export default function (pi: ExtensionAPI) {
  pi.on("before_provider_request", (event, ctx) => {
    const payload = event.payload as Record<string, unknown> | undefined;

    // If store field is absent, pass through unchanged (return undefined)
    if (!payload || !("store" in payload)) {
      return undefined;
    }

    // Create and return a new payload with the store key removed
    const { store, ...rest } = payload;
    return rest;
  });
}
