---
publishDate: 2026-07-07T17:09:00Z
lang: 'ko'
translationKey: 'rustdesk-remote-control-android-ios'
draft: false
title: 'RustDesk Android & iOS 원격 제어: 실제로 가능한 기능'
excerpt: 'RustDesk가 Android 휴대폰을 원격으로 제어하는 방법, iPhone과 iPad를 컨트롤러로 활용하는 방법, 그리고 어떤 업체도 iOS는 원격 제어할 수 없는 이유를 알아봅니다.'
image: '~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp'
category: '가이드'
tags: ['RustDesk', '모바일']
author: 'RustDesk Team'
slug: "rustdesk-remote-control-android-ios-ko"
faq:
  - question: 'RustDesk로 Android 휴대폰을 원격으로 제어할 수 있나요?'
    answer: '네, 가능합니다. Android 기기에서 RustDesk의 화면 캡처 서비스를 시작하고(화면에 동의 알림이 표시됩니다) RustDesk Input 접근성 서비스를 활성화하면 원격 탭과 스와이프가 입력됩니다. 화면 공유에는 Android 6 이상이 필요하며, 내부 시스템 오디오 공유에는 Android 10 이상이 필요합니다. 일부 제조사는 사이드로드된 앱의 접근성 기능을 제한하므로, 먼저 제한된 설정을 허용해야 할 수도 있습니다.'
  - question: 'RustDesk로 iPhone이나 iPad를 제어할 수 있나요?'
    answer: '어떤 원격 데스크톱 앱으로도 불가능합니다 — 이는 RustDesk의 한계가 아니라 iOS 플랫폼 자체의 제약입니다. Apple의 화면 녹화 및 백그라운드 실행 제한 정책은 타사 앱이 호스트로서 원격 제어당하는 것을 허용하지 않으므로, 어떤 업체도 iPhone이나 iPad에 대한 진정한 원격 제어를 제공하지 못합니다. RustDesk의 iOS/iPadOS 앱이 잘하는 것은 컨트롤러 역할입니다: iPhone이나 iPad로 Windows, macOS, Linux, Android 기기를 제어할 수 있습니다.'
  - question: '휴대폰으로 컴퓨터를 제어할 수 있나요?'
    answer: '네, 가능합니다. Android와 iOS RustDesk 앱은 완전한 컨트롤러 클라이언트로 작동합니다. 두 앱 모두 Windows, macOS 또는 Linux 기기에 연결하여 화면 터치패드나 마우스 모드로 제어할 수 있습니다. 이는 가장 안정적인 모바일 사용 사례이며 데스크톱 클라이언트와 동일하게 작동합니다.'
  - question: 'RustDesk 모바일 앱은 오픈소스인가요?'
    answer: '네, 그렇습니다. 모바일 클라이언트는 데스크톱 클라이언트와 동일한 오픈소스 AGPL 코드베이스를 공유합니다. Android 빌드는 공식 RustDesk GitHub 릴리스와 F-Droid에서 com.carriez.flutter_hbb로 제공되며, iOS 컨트롤러는 Apple App Store에서 제공됩니다. RustDesk는 현재 Google Play를 통해서는 배포되지 않습니다.'
  - question: 'Android 기기를 무인 제어용으로 설정해 둘 수 있나요?'
    answer: '부분적으로 가능합니다. RustDesk는 포그라운드 알림을 통해 캡처 서비스를 계속 실행하고 부팅 시 재시작할 수 있지만, 화면 캡처 동의 절차, 잠금 화면에서 막히는 키보드 입력, 재부팅 후 수동으로 잠금을 해제해야 하는 점 때문에 완전한 무인 Android 제어는 신뢰하기 어렵습니다. Android 제어는 설정 후 방치하는 접근 방식이 아니라, 사용자가 곁에 있는 상태에서 돕는 유인 지원으로 다루는 것이 좋습니다.'
metadata:
  description: 'Android와 iOS에서의 RustDesk: Android를 원격으로 제어하는 방법, 두 모바일 앱으로 데스크톱을 조작하는 방법, 그리고 Apple이 iPhone과 iPad에서 허용하는 범위를 알아봅니다.'
  keywords: 'RustDesk Android iOS 원격 제어, RustDesk로 휴대폰 원격 제어, RustDesk Android 호스트, Android 원격 제어, RustDesk iOS, iPhone 원격 제어, RustDesk 모바일 앱'
---

"휴대폰을 원격으로 제어할 수 있나요?"는 RustDesk가 가장 자주 받는 질문 중 하나이며, 마케팅적인 답변이 아니라 솔직한 답변을 들을 자격이 있는 질문입니다. 간단히 말하면, RustDesk는 실제로 Android 기기를 제어할 수 있고, 두 모바일 앱 모두 컴퓨터를 위한 훌륭한 _컨트롤러_ 역할을 하며 — 사람들이 듣고 싶어 하지 않는 부분이지만 — 현재는 iPhone이나 iPad를 원격으로 제어할 수 없습니다. 이 가이드는 무엇이 되고, 무엇이 안 되며, 왜 그런지를 정확히 설명하므로, 추측이 아니라 실제 기능을 바탕으로 계획을 세울 수 있습니다.

두 모바일 앱 모두 RustDesk의 나머지 부분과 마찬가지로 AGPL 라이선스의 오픈소스입니다. Android 빌드는 [공식 RustDesk GitHub 릴리스](https://github.com/rustdesk/rustdesk/releases)와 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/)에서 `com.carriez.flutter_hbb`로 제공되며, arm64, arm32, x86_64 빌드에 유니버설 APK까지 더해 폭넓은 기기를 지원합니다. iOS 컨트롤러는 App Store에서 제공됩니다. RustDesk는 [현재 Google Play를 통해서는 배포되지 않는데](/ko/blog/rustdesk-and-remote-access-scams-ko), 이는 사기 악용에 대응해 자발적으로 Android 앱 게시를 중단했기 때문입니다. 코드베이스도, 감사 가능한 핵심 구조도 동일합니다.

## 한눈에 보는 요약표

| 시나리오                                    | 지원 여부  | 참고                                       |
| ------------------------------------------- | ---------- | ------------------------------------------ |
| Android**에서** Windows/macOS/Linux PC 제어 | 가능       | 완전한 컨트롤러; 터치패드 또는 마우스 모드 |
| iPhone/iPad**에서** PC 제어                 | 가능       | 완전한 컨트롤러                            |
| **Android 기기** 제어(호스트로서)           | 가능       | 화면 캡처 동의 + 접근성 서비스 필요        |
| **iOS 기기** 제어(iPhone/iPad가 호스트)     | **불가능** | Apple 제약; 미구현                         |
| iOS 화면 원격으로 보기                      | **불가능** | 현재 지원되지 않음                         |

나머지 내용은 각 항목을 하나씩 자세히 살펴보는 것뿐입니다.

## 휴대폰을 컨트롤러로 사용하기 (쉬운 부분)

이 사용 사례는 "그냥 잘 작동하는" 경우입니다. Android나 iOS 기기에 RustDesk를 설치하면, 어떤 RustDesk 호스트에도 완전한 컨트롤러 역할을 할 수 있습니다 — Windows 데스크톱, [Mac](https://rustdesk.com/docs/ko/client/mac/), [Linux 기기](/ko/blog/rustdesk-for-linux-ko) 무엇이든 상관없습니다. 대상 ID와 비밀번호를 입력하면 화면 터치패드, 마우스 모드, 소프트웨어 키보드, 파일 전송 기능과 함께 원격 화면을 사용할 수 있습니다. 휴대폰 쪽에서는 특별히 설정할 것이 없는데, 이는 제어를 _보내기만_ 할 뿐 제어당하는 것이 아니기 때문입니다.

"어디서든 컴퓨터를 고치는" 것이 여러분의 업무라면, RustDesk를 실행하는 휴대폰은 정말로 훌륭한 도구이며 데스크톱 클라이언트와 동일하게 작동합니다.

## Android 기기 제어하기 (호스트로서)

바로 이 지점에서 RustDesk는 대부분의 원격 제어 도구가 하지 못하는 일을 해냅니다: Android 휴대폰이나 태블릿을 제어 가능한 호스트로 만들 수 있다는 것입니다. 이를 가능하게 하는 두 가지 Android 하위 시스템이 있으며, 둘 다 명시적인 설정이 필요합니다.

**화면 캡처.** RustDesk는 Android의 `MediaProjection` API를 사용해 화면을 캡처합니다. 앱에서 **Start Service**(서비스 시작)를 탭하면 Android가 화면 녹화 권한을 요청하는 동의 알림을 표시합니다 — 이 대화상자는 필수이며 조용히 우회할 수 없습니다. 화면 공유에는 **Android 6 이상**이 필요하고, 휴대폰의 **내부 시스템 오디오** 캡처에는 **Android 10 이상**이 필요합니다. 이 캡처 권한이 부여되기 전까지는 들어오는 어떤 연결도 화면을 볼 수 없습니다.

**원격 입력.** 화면을 보는 것과 제어하는 것은 다른 문제입니다. 탭, 스와이프, 키 이벤트를 입력하기 위해 RustDesk는 **RustDesk Input**이라는 [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms)를 등록하며, 이는 **설정 → 접근성**에서 활성화할 수 있습니다. 이 서비스는 원격 마우스와 제스처 이벤트를 Android 제스처로 변환하고, 뒤로 가기, 홈, 최근 사용 앱 같은 시스템 동작도 실행할 수 있습니다.

**서비스 유지.** RustDesk는 포그라운드 서비스 알림을 유지하고, 선택적으로 플로팅 오버레이 창을 표시해 Android가 캡처 프로세스를 강제 종료하지 않도록 하며, 부팅 시 서비스를 재시작할 수도 있습니다.

이제 제한 사항을 살펴보겠습니다. Android의 보안 모델이 실제로 부과하는 제약들이기 때문입니다.

- **캡처를 시작하려면 동의가 필요합니다.** 누군가가(또는 사전 승인이) 화면 녹화 알림을 수락해야 합니다.
- **잠금 화면은 입력을 차단합니다.** Android는 접근성 서비스가 보안 잠금 화면에 입력하는 것을 허용하지 않으므로, 기기가 잠기면 일반적으로 원격으로 잠금 해제 코드를 입력할 수 없습니다 — 이는 [실사용자들에 의해 확인된](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html) 제한 사항입니다.
- **재부팅 후에는 수동 잠금 해제가 필요합니다.** 재시작 후에는 대개 제어가 재개되기 전에 직접 기기의 잠금을 해제해야 합니다.
- **OEM(제조사) 제한.** 일부 제조사의 빌드에서는 "제한된 설정"을 허용하기 전까지 사이드로드된 앱의 **RustDesk Input** 접근성 토글이 비활성화(회색 처리)되어 있습니다(앱 아이콘 길게 누르기 → 앱 정보 → 제한된 설정 허용). 일부 제조사의 공격적인 배터리 관리 기능이 백그라운드 서비스를 강제 종료할 수도 있습니다.

실질적인 결론은 이렇습니다: Android 제어는 **유인 지원** — 휴대폰을 들고 있는 사용자를 돕는 것 — 에는 훌륭하지만, **설정 후 방치하는 무인** 접근은 데스크톱 호스트가 가장 잘 수행하는 작업입니다. 모바일 운영체제가 지속적인 백그라운드 접근을 제한하기 때문입니다. 작업에 맞는 플랫폼을 선택하세요. (데스크톱의 경우 [무인 접근 설정 가이드](/ko/blog/rustdesk-unattended-access-setup-ko)에서 실제 방법을 다룹니다.)

## iOS 기기 제어하기: Apple이 허용하는 범위

여기서부터는 끊임없이 질문받지만 다른 곳에서는 애매하게 답변되는 부분이므로, 명확하게 말씀드리겠습니다: **RustDesk를 포함해 그 어떤 원격 데스크톱 앱도 iPhone이나 iPad를 원격으로 제어할 수 없습니다.** iOS에서 RustDesk 앱은 유능한 컨트롤러입니다 — 컴퓨터를 제어하기 위해 _밖으로_ 연결하는 방식입니다 — 하지만 Apple은 어떤 타사 앱도 iOS에서 원격 제어당하는 호스트로 작동하는 것을 허용하지 않습니다.

이유는 Apple에 있습니다. iOS는 백그라운드 실행, 화면 녹화, 그리고 모든 형태의 합성 입력 주입을 강하게 제한하며, 이것이 바로 어떤 타사 앱도 iPhone에 대한 진정한 원격 *제어*를 제공하지 못하는 이유입니다. 이는 RustDesk의 부족함이라기보다는 플랫폼 자체의 장벽에 가깝습니다 — iOS 호스트 지원은 [GitHub에서 반복적으로 요청된 기능](https://github.com/rustdesk/rustdesk/discussions/4839)이지만 여전히 구현되지 않은 상태입니다. Apple의 브로드캐스트 API(ReplayKit)는 원칙적으로 화면을 스트리밍할 수 있지만, 이는 앱이 주도하는 브로드캐스팅이지 원격 상대방이 끌어올 수 있는 방식이 아닙니다 — 따라서 타사의 iOS 원격 보기는 여전히 불가능하며, 다른 기기에서 iOS를 완전히 원격 제어하는 것은 운영체제가 타사에 허용하지 않는 영역입니다.

따라서 요구사항이 구체적으로 "iPhone을 원격으로 제어하는 것"이라면, 현재 어떤 원격 데스크톱 도구도 이를 수행할 수 없습니다 — [RustDesk vs AnyDesk](/ko/blog/rustdesk-vs-anydesk-ko) 비교에서도 언급했듯이, 이는 RustDesk만의 부족한 부분이 아니라 모든 업체가 부딪히는 iOS 플랫폼의 장벽입니다. 설정을 마친 후에 알게 되기보다는 미리 말씀드리는 편이 낫다고 생각합니다.

## 개인정보 보호와 자체 호스팅에 대한 참고 사항

모바일 앱은 오픈소스이며 데스크톱 클라이언트와 동일한 프로토콜을 사용하므로, 공용 네트워크 대신 여러분이 직접 운영하는 [자체 호스팅 RustDesk 서버](/ko/blog/why-self-host-remote-desktop-software-ko)를 가리키도록 설정할 수 있습니다 — 즉, ID를 포함한 모바일 세션 전체가 여러분이 통제하는 인프라를 통해 중개됩니다. 개인 기기를 다루는 원격 지원 워크플로에서는 이러한 데이터 주권의 측면이 평소보다 훨씬 더 중요합니다.

트레이드오프는 언제나와 같습니다: 서버를 직접 운영하고 보안을 관리해야 하지만 — 요구 사양이 낮아 부담은 크지 않습니다 — 많은 팀에게 세션 데이터를 자체 영역에 보관하는 것은 충분히 그만한 가치가 있습니다.

## 시작하기

[공식 GitHub 릴리스](https://github.com/rustdesk/rustdesk/releases)에서 Android 빌드를 다운로드하거나 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/)에서 패키지를 설치하세요. RustDesk는 [현재 Google Play를 통해서는 배포되지 않지만](/ko/blog/rustdesk-and-remote-access-scams-ko), iOS 컨트롤러는 여전히 Apple App Store에서 이용할 수 있습니다. 휴대폰을 제어하려면 그 휴대폰이 Android여야 하며 — 화면 캡처 알림을 수락하고 RustDesk Input 접근성 서비스를 활성화하세요. 휴대폰으로 컴퓨터를 제어하려면 두 모바일 앱 모두 별도 설정 없이 바로 작동합니다. 현재 요금제는 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 확인할 수 있으며, Server Pro 관련 문의는 [sales@rustdesk.com](mailto:sales@rustdesk.com)으로 하시면 도움을 드립니다. 먼저 살펴보고 싶으신가요? [RustDesk 실제 작동 영상 보기](https://www.youtube.com/@rustdesk).
