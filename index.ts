import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

/**
 * no-store extension
 * ------------------
 * pi agent 가 provider(LLM API) 로 요청을 보낼 때 본문에 포함되는
 * `"store": false` 필드를 제거한다.
 *
 * 일부 프록시/게이트웨이나 커스텀(OpenAI 호환) 서버는 `store` 파라미터를
 * 지원하지 않아 400 에러를 내기도 한다. 이 확장은 전송 직전에 해당 필드를
 * 지워서 요청에 `store` 가 아예 포함되지 않도록 한다.
 *
 * 위치: 프로젝트 로컬 `.pi/extensions/no-store.ts` (자동 로드됨)
 */
export default function (pi: ExtensionAPI) {
  pi.on("before_provider_request", (event, ctx) => {
    const payload = event.payload as Record<string, unknown> | undefined;

    // store 필드가 없으면 변경 없이 그대로 통과 (undefined 반환)
    if (!payload || !("store" in payload)) {
      return undefined;
    }

    // store 키를 제거한 새 payload 를 만들어 반환
    const { store, ...rest } = payload;
    return rest;
  });
}
