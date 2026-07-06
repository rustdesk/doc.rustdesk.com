---
title: NAT 루프백 문제
weight: 500
pre: "<b>2.5. </b>"
description: "라우터 뒤에 RustDesk를 자체 호스팅할 때 NAT 루프백 또는 헤어핀 NAT 문제를 해결하세요. LAN 클라이언트가 공개 IP 또는 도메인을 사용할 때 실패할 수 있는 이유와 라우터 설정, 로컬 DNS, hosts 파일 오버라이드를 통해 이를 해결하는 방법을 알아보세요."
keywords: ["rustdesk nat loopback", "rustdesk hairpin nat", "rustdesk local dns", "rustdesk hosts file", "rustdesk self-hosted domain issue", "rustdesk lan public ip problem"]
---

{{% notice note %}}
이 설명에는 복잡한 네트워킹 지식이 포함되어 있으므로, 가독성을 높이기 위해 귀하의 도움이 필요합니다.
{{% /notice %}}

NAT 루프백, 또는 헤어핀 NAT라고도 불리는 이 문제는 동일한 LAN에 있는 장치들이 공개 IP 주소나 도메인 이름을 통해 자체 호스팅된 RustDesk 서버에 접근하려고 할 때 발생합니다. 이 안내서에서는 왜 이런 문제가 발생하는지와 이를 라우터 지원, 로컬 DNS, 또는 hosts 파일 오버라이드를 통해 해결하는 방법을 설명합니다.

## 빠른 답변

자체 호스팅된 RustDesk 서버가 LAN 밖에서 정상적으로 작동하지만 같은 LAN의 클라이언트가 공개 IP 주소나 도메인 이름을 사용할 때 연결이 실패한다면, 일반적으로 NAT 루프백이 원인입니다. 가장 좋은 해결책은 라우터에서 헤어핀 NAT를 활성화하는 것입니다. 만약 이것이 불가능하다면 로컬 DNS를 사용하세요. 소수의 장치에 대해서는 hosts 파일 오버라이드를 대안으로 사용할 수 있습니다.

## 어떤 해결책을 선택해야 하나요?

| 수정 | 최적의 경우 | 트레이드오프 |
| --- | --- | --- |
| 라우터에서 NAT 루프백 활성화 | 라우터가 헤어핀 NAT를 지원함 | 장기적으로 가장 좋은 해결 방법이지만 모든 라우터가 해당 설정을 노출하지는 않음 |
| LAN에서 로컬 DNS 사용 | 동일한 네트워크에서 여러 기기를 관리함 | 모든 기기를 수동으로 편집하는 것보다 확장성이 뛰어남 |
| 호스트 파일 항목 추가 | 몇몇 기기만 수정하면 됨 | 노트북이나 로밍 기기에서는 수동으로 하기 쉽고 잊기 쉬움 |

NAT 루프백에 대한 자세한 내용은 [Wikipedia](https://en.m.wikipedia.org/wiki/Network_address_translation#NAT_hairpinning) 페이지를 참조하십시오.

홈 네트워크 또는 NAT 방화벽 뒤에 있는 기타 네트워크 환경에 RustDesk 서버를 배포하는 경우, RustDesk 서버와 클라이언트는 **반드시** 다음 중 하나를 사용해야 합니다:
A: 서로 접속하기 위해 로컬 IP 주소를 사용하거나 OR:
B: NAT 루프백을 지원하고 활성화된 방화벽을 갖추어야 합니다.

공개 IP나 도메인을 통해 서버에 연결할 수 없다는 것을 알게 될 수 있습니다(이론상 공개 IP를 가리킵니다).

## 문제 
이 예제에서는 LAN 장치가 `rustdesk.example.com`에 연결하려고 할 때 어떤 일이 발생하는지 살펴보겠습니다. 라우터의 공인 IP는 `172.16.16.1`이고, 서버의 LAN IP는 `192.168.11.20`이며, 원하는 도메인은 `rustdesk.example.com`라고 가정하며, '192.168.11.2'를 사용하는 클라이언트가 있다고 합시다.

라우터의 NAT 뒤에 서버를 설정할 경우, 라우터에서 포트 포워딩을 추가하여 PUBLIC IP 172.16.16.1로 들어오는 모든 수신 메시지를 192.168.11.20에 있는 서버로 전달하도록 변경할 수 있습니다.

LAN 장치가 인터넷에 접속하려고 할 때, 예를 들어 8.8.8.8에 있는 웹서버에 접속하려고 한다면, 해당 요청은 192.168.11.2에서 발송된 것으로 간주되어 라우터로 전송됩니다. 라우터는 이 요청을 가로채어 172.16.16.1에서 발송된 것으로 8.8.8.8로 다시 쓰게 됩니다. 8.8.8.8이 172.16.16.1에 응답하면 라우터는 이전 연결을 확인하고 그 응답을 다시 192.168.11.2로 리디렉션합니다.

만약 8.8.8.8의 사용자가 172.16.16.1을 이용해 우리 네트워크로 메시지를 보낸다면, 포트 포워딩 규칙에 의해 172.16.16.1의 목적지를 192.168.11.20에 있는 서버로 변경되며, 요청의 출처는 여전히 8.8.8.8로 유지되어 서버는 (대략적으로나마) 8.8.8.8로 직접 응답할 수 있습니다.

만약 8.8.8.8의 사용자가 우리 네트워크를 해킹하려고 시도하고 192.168.11.2에서 메시지를 보내는 것처럼 위장한다면, 라우터는 192.168.11.2에서 오는 트래픽이 LAN 장치로부터만 유효하다는 것을 인식하고 일반적으로 해당 트래픽을 차단할 것입니다.

문제는 LAN으로 다시 루프백하려고 할 때 발생합니다. 만약 LAN 장치가 `rustdesk.example.com`로 연결을 시도한다면, 이는 결국 `172.16.16.1`로 연결됩니다. 이 시점에서 라우터는 많은 선택지를 고르게 됩니다. 라우터는 이미 LAN 포트에서 WAN 포트로 192.168.11.2에서 172.16.16.1로 가는 메시지를 보냈습니다. 일단 WAN 포트에 도착하면, 이 메시지는 인터넷 상의 누군가가 우리 네트워크를 해킹하려 했던 경우와 구분할 수 없게 됩니다.

NAT 루프백 기능은 과정 중 앞단의 주소에서 "192.168.11.2"라는 소스 부분을 효과적으로 변경하여, 서버와 클라이언트 간에 메시지를 주고받을 때 NAT 테이블을 사용해야 한다는 것을 라우터가 인식하도록 합니다.

만약 LAN 내부에 있을 때만 연결에 문제가 생기고, 외부에서는 정상적으로 작동한다면, 이것이 바로 당신이 겪고 있는 문제일 수 있습니다.

## 해결 방안
이 문제를 해결하는 방법은 세 가지가 있습니다.

### 1. 라우터에서 NAT 루프백 설정하기
네트워킹 지식이 있다면 라우터에서 NAT 루프백을 설정할 수 있지만, 이를 설정하려면 네트워킹에 대한 전문 지식이 필요합니다. 일부 라우터는 이 설정을 조정할 수 없는 경우도 있으므로, 모든 사람에게 가장 적합한 옵션은 아닙니다.

{{% notice note %}}
[MikroTik](https://help.mikrotik.com/docs/display/ROS/NAT#NAT-HairpinNAT)의 기사가 이 내용을 매우 잘 설명하고 있습니다. 여기서부터 학습을 시작해보세요.
{{% /notice %}}

### 2. LAN에 DNS 서버 배포
먼저, [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/Docker)와 [Pi-hole](https://github.com/pi-hole/docker-pi-hole) 중에서 원하는 것을 선택하세요. Docker를 통해 배포하거나, RustDesk 서버와 동일한 서버에 배포할 수 있습니다. 아래 예제에서는 이 과정의 몇 가지 단계를 보여드립니다.

둘 다 DNS 기반 광고 차단기이지만, 광고를 차단하고 싶지 않다면 이 기능을 비활성화할 수 있습니다.

먼저, `domain`를 RustDesk 서버의 LAN IP(예: `192.168.11.20`)로 지정하세요. 그런 다음 라우터의 `DHCP` 설정으로 이동하고(`DHCP`는 WAN이 아님에 유의하십시오), `First` DNS IP를 AdGuard Home 또는 Pi-hole을 배포한 서버로 설정하세요. `Secondary` DNS는 ISP의 DNS 또는 기타 공개 DNS일 수 있으며, 예를 들어 Cloudflare용 `1.1.1.1`나 Google용 `8.8.8.8`가 될 수 있습니다. 이제 완료되었습니다!

다음은 예시입니다:
#### AdGuard 홈
광고 차단 기능을 사용하면 문제가 발생할 수 있습니다. 해결 방법을 찾고 싶지 않고 이 기능을 비활성화하고 싶다면, '보호 비활성화' 버튼을 클릭하세요.

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_disable_protection.png)
<br>

'DNS 재작성' 설정으로 이동하세요.

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_click_dns_rewrites.png)
<br>

'DNS 재작성 추가'를 클릭한 다음, 필드에 `domain`와 서버의 `LAN IP`를 입력하세요.

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_dns_rewrite_dialog.png)

다음은 최종 결과의 모습입니다.

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_dns_rewrite_final_result.png)

***라우터의 LAN DHCP에 AdGuard 홈을 할당하는 것을 잊지 마세요!***
<hr>

#### Pi-hole
광고 차단 기능을 사용하면 문제가 발생할 수 있습니다. 해결 방법을 찾고 싶지 않고 이 기능을 비활성화하고 싶다면, '차단 비활성화' 하위 메뉴에서 '무기한' 버튼을 클릭하세요.

![](/docs/en/self-host/nat-loopback-issues/images/pi_hole_disable_blocking.png)

"로컬 DNS → DNS 레코드"로 이동하세요.
상자에 `domain`와 `IP`를 입력한 다음, "추가"를 클릭하세요.

최종 결과를 확인하려면 이 그림의 노란색 선을 확인하세요.

![](/docs/en/self-host/nat-loopback-issues/images/pi_hole_local_dns_dns_records.png)

***라우터의 LAN DHCP에 Pi-hole을 할당하는 것을 잊지 마세요!***

### 3. 호스트 파일에 규칙 추가
이 방법은 장치 수가 적은 경우에만 권장됩니다. 장치가 많다면 DNS 방법을 사용하는 것이 더 좋습니다. 그렇지 않으면 서버에 접근해야 하는 각 장치에서 수동으로 작업해야 합니다.

{{% notice warning %}}
노트북과 같은 휴대용 기기에서 이 방법을 사용하면 LAN 밖에서는 서버에 연결할 수 없습니다.
{{% /notice %}}

다양한 OS의 경로:

#### Windows

```text
C:\Windows\system32\drivers\etc\hosts
```

승격된 권한으로 편집하거나 이 파일을 `Desktop`로 복사하여 편집할 수 있습니다. 편집한 후 원본 경로로 다시 복사하세요.

#### macOS

```text
/etc/hosts
```

`vim`를 사용할 수 있으며, 이는 사전 설치되어 있습니다.

```sh
sudo vim /etc/hosts
```

#### Linux

```text
/etc/hosts
```

`vim` 또는 `nano`를 사용할 수 있습니다.

```sh
sudo vim /etc/hosts
```

<hr>

형식은 세 운영 체제 모두 동일합니다. `IP`가 먼저 오고 그다음에 `domain`가 옵니다. 한 줄에 하나의 항목입니다.

예:

```text
192.168.11.20   rustdesk.example.com
```