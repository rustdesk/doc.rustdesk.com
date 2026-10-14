---
publishDate: 2026-07-07T17:09:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ko'
translationKey: 'rustdesk-remote-control-android-ios'
draft: false
title: 'RustDesk Android & iOS 원격 제어: 실제로 가능한 기능'
excerpt: 'RustDesk는 Android 휴대폰을 원격 제어할 수 있고, Android 기기와 iPhone, iPad를 컴퓨터를 제어하는 컨트롤러로 바꿔 줍니다. iOS 앱은 제어 전용입니다.'
image: '~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp'
category: '가이드'
tags: ['RustDesk', '모바일']
author: 'RustDesk Team'
slug: 'rustdesk-remote-control-android-ios-ko'
faq:
  - question: 'RustDesk로 Android 휴대폰을 원격 제어할 수 있나요?'
    answer: '네. Android 기기에서 RustDesk의 화면 캡처 서비스를 시작하고(화면에 동의 창이 표시됩니다) RustDesk Input 접근성 서비스를 켜면 원격 탭과 스와이프가 입력됩니다. 화면 공유에는 Android 6 이상, 내부 시스템 오디오 공유에는 Android 10 이상이 필요합니다. 일부 제조사는 직접 설치한 앱의 접근성 기능을 제한하므로, 먼저 제한된 설정을 허용해야 할 수 있습니다.'
  - question: 'RustDesk로 iPhone이나 iPad를 제어할 수 있나요?'
    answer: '아니요. RustDesk iOS/iPadOS 앱은 제어 전용이며, iPhone이나 iPad로 Windows, macOS, Linux, Android 기기를 제어하는 데 씁니다. RustDesk는 iOS 호스팅, 화면 공유, 원격 입력을 구현하지 않습니다. 일부 다른 공급사는 사용자가 참여하는 iOS 화면 보기를 제공하며, Apple은 FaceTime 통화에서 동의 기반 원격 제어를 제공합니다.'
  - question: '휴대폰으로 컴퓨터를 제어할 수 있나요?'
    answer: '네. Android와 iOS용 RustDesk 앱은 완전한 컨트롤러입니다. Windows, macOS, Linux 컴퓨터에 ID로 연결한 뒤 화면 터치패드나 마우스 모드, 소프트웨어 키보드로 제어할 수 있습니다. 클립보드, 파일 전송, 특수 키 사용 방식은 모바일 OS에 따라 일부 다릅니다. 휴대폰으로 컴퓨터를 제어하는 것이 가장 안정적인 모바일 활용 사례입니다.'
  - question: 'RustDesk 모바일 앱은 오픈소스인가요?'
    answer: '네. 모바일 클라이언트는 데스크톱 클라이언트와 같은 오픈소스 AGPL 코드베이스를 공유합니다. Android 빌드는 공식 RustDesk GitHub 릴리스와 F-Droid에서 com.carriez.flutter_hbb로 제공되며, iOS 컨트롤러는 Apple App Store에서 받을 수 있습니다. RustDesk는 현재 Google Play로 배포되지 않습니다.'
  - question: 'Android 기기를 무인 제어용으로 설정해 둘 수 있나요?'
    answer: '부분적으로 가능합니다. RustDesk는 포그라운드 알림으로 캡처 서비스를 유지하고 부팅 시 다시 시작할 수 있지만, 화면 캡처 동의, 잠금 화면에서 막히는 키보드 입력, 재부팅 후 수동 잠금 해제 때문에 완전한 무인 Android 제어는 안정적이지 않습니다. Android 제어는 설정해 두고 잊는 접속이 아니라 사용자가 자리에 있는 지원으로 생각하세요.'
metadata:
  description: 'Android와 iOS에서의 RustDesk를 정리합니다. Android 원격 제어, 두 모바일 앱으로 컴퓨터를 제어하는 방법, iPhone과 iPad 앱이 제어 전용인 이유를 설명합니다.'
  keywords: 'RustDesk Android iOS 원격 제어, RustDesk로 휴대폰 원격 제어, RustDesk Android 호스트, Android 원격 제어, RustDesk iOS, iPhone 원격 제어, RustDesk 모바일 앱'
---

RustDesk는 기기 소유자가 화면 캡처와 입력 권한을 허용하면 Android 기기를 실제로 제어할 수 있으며, 두 모바일 앱 모두 컴퓨터를 제어하는 훌륭한 _컨트롤러_ 입니다. iOS 앱은 제어 전용입니다. RustDesk는 iOS 호스팅이나 화면 공유를 구현하지 않으므로 RustDesk로 iPhone이나 iPad에 원격 접속할 수는 없습니다. 이 가이드에서는 무엇이 되고 무엇이 안 되는지, 그리고 그 이유를 설명해 실제 기능을 기준으로 계획을 세울 수 있도록 돕습니다.

두 모바일 앱은 AGPL 라이선스인 RustDesk 클라이언트 코드베이스를 공유합니다. RustDesk Server OSS(무료 커뮤니티 서버)도 AGPL 라이선스이며, Server Pro는 상용 독점 자체 호스팅 서버 소프트웨어입니다. Android 빌드는 [공식 RustDesk GitHub 릴리스](https://github.com/rustdesk/rustdesk/releases)와 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/)에서 `com.carriez.flutter_hbb`로 제공되며, arm64, arm32, x86_64 빌드와 유니버설 APK로 폭넓은 기기를 지원합니다. iOS 컨트롤러는 App Store에 있습니다. RustDesk는 [현재 Google Play로 배포되지 않습니다](/ko/blog/rustdesk-and-remote-access-scams-ko). 사기 악용에 대응해 Android 앱을 자발적으로 내렸기 때문입니다. 코드베이스도, 감사 가능한 핵심도 같습니다.

## 한눈에 보는 요약표

| 시나리오                                    | 지원 여부  | 참고                                         |
| ------------------------------------------- | ---------- | -------------------------------------------- |
| Android**에서** Windows/macOS/Linux PC 제어 | 가능       | 완전한 컨트롤러, 터치패드 또는 마우스 모드   |
| iPhone/iPad**에서** PC 제어                 | 가능       | 완전한 컨트롤러, 터치패드 또는 마우스 모드   |
| **Android 기기** 제어(호스트로서)           | 가능       | 화면 캡처 동의 + 접근성 서비스 필요          |
| RustDesk로 **iOS 기기** 제어                | **불가능** | RustDesk iOS는 컨트롤러 앱                   |
| RustDesk로 iOS 화면 원격 보기               | **불가능** | RustDesk에는 수신 화면 보기 기능이 구현되지 않음 |

나머지 내용은 각 항목의 세부 사항입니다.

## 휴대폰을 컨트롤러로 사용하기 (쉬운 부분)

"그냥 잘 되는" 사용 사례입니다. Android나 iOS 기기에 RustDesk를 설치하면 Windows 데스크톱, [Mac](https://rustdesk.com/docs/ko/client/mac/), [Linux 컴퓨터](/ko/blog/rustdesk-for-linux-ko) 등 어떤 RustDesk 호스트든 제어하는 완전한 컨트롤러가 됩니다. 대상 ID와 비밀번호를 입력하면 화면 터치패드, 마우스 모드, 소프트웨어 키보드와 함께 원격 화면이 열립니다. 클립보드, 파일, 특수 키 사용 방식은 모바일 OS에 따라 일부 다릅니다. 휴대폰은 제어를 _보내기만_ 하고 제어받지는 않으므로 휴대폰 쪽에서 따로 설정할 것은 없습니다.

"어디서든 컴퓨터를 고치는 것"이 업무라면, RustDesk를 설치한 휴대폰은 정말 좋은 도구입니다.

## Android 기기 제어하기 (호스트로서)

RustDesk는 Android 휴대폰이나 태블릿을 제어 가능한 호스트로 만들 수 있습니다. 화면 캡처와 원격 입력은 서로 다른 Android 서비스를 사용하며, 둘 다 설정이 필요합니다.

**화면 캡처.** RustDesk는 Android의 `MediaProjection` API로 화면을 캡처합니다. 앱에서 **서비스 시작**을 탭하면 Android가 화면 녹화 권한을 묻는 동의 창을 띄웁니다. 이 대화상자는 필수이며 몰래 건너뛸 수 없습니다. 화면 공유에는 **Android 6 이상**이 필요하고, 휴대폰의 **내부 시스템 오디오**를 캡처하려면 **Android 10 이상**이 필요합니다. 이 캡처 권한을 허용하기 전에는 어떤 수신 연결도 화면을 볼 수 없습니다.

**원격 입력.** 화면을 보는 것과 제어하는 것은 다릅니다. 탭, 스와이프, 키 이벤트를 입력하기 위해 RustDesk는 **RustDesk Input**이라는 [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms)를 등록하며, **설정 → 접근성**에서 켤 수 있습니다. 이 서비스는 원격 마우스와 제스처 이벤트를 Android 제스처로 바꾸고, 뒤로 가기, 홈, 최근 앱 같은 시스템 동작도 실행할 수 있습니다.

**서비스 유지.** RustDesk는 포그라운드 서비스 알림과, 선택적으로 플로팅 오버레이 창을 유지해 Android가 캡처 프로세스를 종료하지 않게 하며, 부팅 시 서비스를 다시 시작할 수 있습니다.

이제 제한 사항입니다. Android의 보안 모델이 실제로 제약을 부과하기 때문입니다.

- **캡처를 시작하려면 동의가 필요합니다.** 누군가(또는 사전 승인)가 화면 녹화 동의 창을 수락해야 합니다.
- **잠금 화면은 입력을 막습니다.** Android는 접근성 서비스가 보안 잠금 화면에 입력하는 것을 허용하지 않으므로, 기기가 잠기면 대개 원격으로 잠금 해제 코드를 입력할 수 없습니다. [직접 사용해 본 사용자들이 정리한](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html) 제한 사항입니다.
- **재부팅 후에는 수동 잠금 해제가 필요합니다.** 재시작한 뒤에는 대개 누군가 직접 기기 잠금을 해제해야 제어를 다시 시작할 수 있습니다.
- **제조사 제한.** 일부 제조사 빌드에서는 "제한된 설정"을 허용하기 전까지 직접 설치한 앱의 **RustDesk Input** 접근성 토글이 회색으로 비활성화되어 있습니다(앱 아이콘 길게 누르기 → 앱 정보 → 제한된 설정 허용). 일부 제조사의 공격적인 배터리 관리 기능이 백그라운드 서비스를 종료하기도 합니다.

결론은 이렇습니다. Android 제어는 휴대폰을 들고 있는 사람을 돕는 **사용자 참여 지원**에는 훌륭하지만, **설정해 두고 잊는 무인** 접속은 데스크톱 호스트가 가장 잘합니다. 모바일 운영체제가 지속적인 백그라운드 접근을 제한하기 때문입니다. 작업에 맞는 플랫폼을 고르세요. (데스크톱이라면 [무인 접속 설정 가이드](/ko/blog/rustdesk-unattended-access-setup-ko)에서 제대로 된 방법을 다룹니다.)

## iOS: RustDesk 컨트롤러, 화면 보기, 입력 제어

**iOS용 RustDesk는 호스트가 아니라 컨트롤러입니다.** 지원되는 컴퓨터나 Android 기기를 제어하는 데 사용하세요. [iOS 호스트 기능 요청](https://github.com/rustdesk/rustdesk/discussions/4839)에서 논의된 것처럼, RustDesk에는 iOS 수신 화면 보기와 입력 제어가 구현되어 있지 않습니다.

다른 공급사는 다른 방식을 택합니다. Apple의 브로드캐스트 API는 사용자가 시작하는 화면 공유를 허용하며, [AnyDesk는 iOS/iPadOS 12 이상에서 원격 화면 보기를 지원한다고 문서화](https://support.anydesk.com/docs/anydesk-for-ios-ipados-tvos)하고 있지만 원격 입력 제어는 지원하지 않습니다. 기기 소유자가 직접 탭하는 동안 기술자가 화면을 보는 것은 기기를 제어하는 것과는 다른 워크플로입니다.

Apple은 기기, 지역, OS 요건에 따라 [FaceTime에서 동의 기반 원격 제어](https://support.apple.com/guide/iphone/request-give-remote-control-a-facetime-call-iph5d70f34a3/ios)도 제공합니다. 지원 업무에 iPhone 화면 보기가 필요하다면 그 워크플로를 구현한 도구를 쓰세요. iPhone이나 iPad로 컴퓨터를 제어하려는 경우라면 RustDesk 컨트롤러 앱이 적합합니다.

## 개인정보 보호와 자체 호스팅에 대한 참고 사항

모바일 앱은 오픈소스이고 데스크톱 클라이언트와 같은 프로토콜을 사용하므로, 공용 네트워크 대신 직접 운영하는 [자체 호스팅 RustDesk 서버](/ko/blog/why-self-host-remote-desktop-software-ko)에 연결하도록 설정할 수 있습니다. 그러면 ID를 포함한 모바일 세션 전체가 직접 통제하는 인프라를 통해 중개됩니다. 개인 기기를 다루는 원격 지원 워크플로에서는 이러한 데이터 주권 측면이 평소보다 더 중요합니다.

트레이드오프는 언제나 같습니다. 업데이트, 모니터링, 백업, 용량 계획을 포함해 서버를 직접 운영하고 보호해야 합니다. 그래도 많은 팀에게 세션 데이터를 자체 영역에 두는 것은 충분히 그만한 가치가 있습니다.

## 시작하기

[공식 GitHub 릴리스](https://github.com/rustdesk/rustdesk/releases)에서 Android 빌드를 다운로드하거나 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/)에서 패키지를 설치하세요. RustDesk는 [현재 Google Play로 배포되지 않으며](/ko/blog/rustdesk-and-remote-access-scams-ko), iOS 컨트롤러는 Apple App Store에서 계속 받을 수 있습니다. 휴대폰을 제어하려면 그 휴대폰이 Android여야 합니다. 화면 캡처 동의 창을 수락하고 RustDesk Input 접근성 서비스를 켜세요. 휴대폰으로 컴퓨터를 제어하는 것은 두 모바일 앱 모두 별도 설정 없이 바로 됩니다. 현재 플랜은 [rustdesk.com/pricing](https://rustdesk.com/pricing)에서 확인할 수 있고, Server Pro 관련 문의는 [sales@rustdesk.com](mailto:sales@rustdesk.com)에서 도와드립니다. 먼저 보고 싶으신가요? [RustDesk 작동 모습 보기](https://www.youtube.com/@rustdesk).
