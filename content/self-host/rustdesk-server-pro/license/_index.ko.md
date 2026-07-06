---
title: 라이선스
weight: 15
description: "웹 콘솔에서 RustDesk 서버 프로 라이선스를 구매하고, 입력하고 관리하십시오. 라이선스를 어디서 얻을 수 있는지, 구매 후 어떻게 활성화하거나 변경할 수 있는지 알아보십시오."
keywords: ["rustdesk pro license", "rustdesk server pro activate", "rustdesk pricing license", "rustdesk change license", "rustdesk web console license"]
---

이 페이지를 사용하여 RustDesk Server Pro 라이선스를 구매하고 활성화하며 업데이트하는 방법을 이해하십시오.

## RustDesk Server Pro 라이선스는 어떻게 작동하나요?

RustDesk Server Pro 라이선스는 모든 릴레이 노드가 아닌 `hbbs` 서버에 연결됩니다. 가격 페이지를 통해 라이선스를 구매한 후 웹 콘솔에 입력하고, 셀프서비스 라이선스 포털을 통해 갱신, 업그레이드, 청구서 및 마이그레이션을 관리하십시오.

## 라이선스에 대한 간단한 답변

- 한 번에 하나의 라이선스는 하나의 `hbbs` 머신에 할당됩니다.
- `hbbr` 릴레이 서버는 별도의 라이선스가 필요하지 않습니다.
- 갱신과 업그레이드는 셀프서비스 포털에서 처리한 후 웹 콘솔에서 라이선스를 새로 고침하여 활성화합니다.
- 마이그레이션은 기존 머신의 바인딩 해제와 새 서버에 라이선스 설정으로 이루어집니다.
- 서버가 인터넷에 직접 접속할 수 없는 경우, 라이선스 확인을 위해 프록시를 구성할 수 있습니다.

## 라이선스 구매

[https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html)에서 라이선스를 받으시고 Stripe 결제 페이지에 유효한 이메일 주소를 입력해 주세요. 결제가 성공적으로 완료되면 라이선스(및 별도의 메일로 청구서)가 이메일로 전송됩니다.

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

## 라이선스 설정

웹 콘솔(`http://<rustdesk-server-pro-ip>:21114`)에서 라이선스를 입력하거나 나중에 라이선스를 변경해야 합니다.

| 라이선스 설정 | 라이선스 변경 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

## 라이선스 갱신/업그레이드

라이선스 갱신/업그레이드는 아래와 같이 [self-service license portal](https://rustdesk.com/self-host/account/)를 통해 확인할 수 있으며, 위 그림과 같이 라이선스 구매 시 사용한 이메일로 로그인하십시오.

| 갱신/업그레이드 작업이 포함된 라이선스 페이지 | 업그레이드 창 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg?v2) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

결제 후, 라이선스 [as below](/docs/ko/self-host/rustdesk-server-pro/license/#refresh-license)를 새로 고침하여 활성화해 주세요.

### 라이선스 새로 고침
결제 후, 아래와 같이 웹 콘솔로 이동하여 수동으로 활성화해야 합니다. `Edit`를 클릭한 다음 `OK`를 클릭하면 되며, 아무것도 수정할 필요가 없습니다. 라이선스 키는 그대로 유지되기 때문입니다.

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

## 청구서, 라이선스 검색 및 마이그레이션

라이선스는 한 대의 컴퓨터에서만 사용할 수 있습니다(단, hbbs용이며, hbbr는 라이선스가 필요하지 않습니다). 다른 컴퓨터로 이전하거나 라이선스를 다시 받거나 청구서를 다운로드하려면 [https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/)로 이동하세요. Stripe 결제에 사용한 이메일 주소로 로그인한 후, 아래와 같이 이전하려는 기존 컴퓨터의 연결을 해제하세요. 새 서버 웹 콘솔에서 라이선스를 설정하면 라이선스가 할당되고 콘솔에 자동으로 등록됩니다.

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

## 프록시
서버가 인터넷에 접속해 라이선스를 직접 확인할 수 없는 경우, 예를 들어 `proxy=http://username:password@example.com:8080 ./hbbs`와 같은 프록시를 추가할 수 있습니다.

또는 작업 디렉터리(여기서 `id_ed25519` / `db.sqlite3` 파일이 저장됨)의 `.env` 파일에 `proxy=http://username:password@example.com:8080`를 추가할 수 있습니다.

`http`는 `https` 또는 `socks5`로 대체할 수 있습니다. `username` / `password` / `port`가 없는 경우, `proxy=http://example.com`로 대체할 수 있습니다.