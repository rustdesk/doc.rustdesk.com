---
publishDate: 2026-06-28T16:50:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ko'
translationKey: 'rustdesk-server-pro-offline-air-gapped'
draft: false
title: 'RustDesk Server Pro는 오프라인 또는 에어갭 환경에서 실행할 수 있나요?'
excerpt: '아니요. 자체 호스팅 RustDesk Server Pro는 라이선스를 검증하기 위해 rustdesk.com으로 계속 아웃바운드 접속해야 하므로, 완전한 에어갭 배포는 지원되지 않습니다.'
image: '~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.webp'
category: '배포'
tags: ['RustDesk', '배포', '셀프 호스팅']
author: 'RustDesk Team'
slug: 'rustdesk-server-pro-offline-air-gapped-ko'
faq:
  - question: 'RustDesk Server Pro는 오프라인 또는 에어갭 환경에서 실행할 수 있나요?'
    answer: '아니요. RustDesk Server Pro는 아웃바운드 HTTPS(443 포트)로 하루에 한 번 정도 rustdesk.com에서 라이선스를 확인하며, 확인에 실패하면 약 7일 동안 재시도합니다. 따라서 영구적으로 에어갭된 Pro 배포는 표준 라이선스 모델에 포함되지 않습니다. 프록시는 지원됩니다. 무료 커뮤니티 서버인 RustDesk Server OSS에는 라이선스 확인이 없습니다.'
  - question: 'RustDesk Server Pro에는 상시 인터넷 연결이 필요한가요?'
    answer: '라이선스 검증을 위해 rustdesk.com으로 계속 아웃바운드 접속할 수 있어야 하지만, 말 그대로 끊김 없는 연결이 필요한 것은 아닙니다. 서버는 443 포트로 하루에 한 번 정도 확인하며, 실패하면 성공하거나 약 7일이 지날 때까지 재시도합니다. 짧은 장애는 괜찮지만, 이 유예 기간보다 오래 rustdesk.com과 단절된 서버는 라이선스 검증을 통과하지 못합니다. 원격 세션 자체는 자체 호스팅한 릴레이 서버와 ID(랑데부) 서버가 중개합니다.'
  - question: '격리된 RustDesk Server Pro 배포에는 어떤 아웃바운드 접근이 필요한가요?'
    answer: '라이선스 검증을 위해 서버에서 rustdesk.com으로 나가는 아웃바운드 HTTPS를 허용하고, 브랜드 클라이언트를 생성한다면 커스텀 클라이언트 빌드 서비스도 허용하세요. 프록시가 지원되므로 나머지 네트워크는 차단된 상태로 둘 수 있습니다. 이 밖에 계획해 둘 외부 통신은 클라이언트 업데이트와 연동한 외부 ID 공급자입니다.'
  - question: '완전한 에어갭 환경용 RustDesk 라이선스 옵션이 있나요?'
    answer: '아니요. 표준 RustDesk Server Pro 라이선스는 주기적인 온라인 검증이 필요합니다. 무료 커뮤니티 서버인 RustDesk Server OSS에는 라이선스 확인이 없어, Pro 웹 콘솔과 관리 기능 없이 ID/랑데부 서비스와 릴레이 서비스를 격리된 네트워크 안에서 실행할 수 있습니다. Pro에 엄격한 에어갭 요건이 있다면 시나리오와 함께 sales@rustdesk.com으로 문의하세요.'
metadata:
  description: '자체 호스팅 RustDesk Server Pro를 에어갭 환경에서 실행할 수 있을까요? 아니요. Pro 라이선스는 rustdesk.com으로 계속 아웃바운드 접속해야 하므로 완전한 에어갭은 지원되지 않습니다.'
  keywords: 'rustdesk server pro 오프라인, rustdesk 에어갭, rustdesk 자체 호스팅 인터넷 요구사항, rustdesk server pro 라이선스 확인, rustdesk 오프라인 배포, rustdesk 인터넷 필요 여부'
---

아니요. 자체 호스팅 RustDesk Server Pro 배포는 완전한 오프라인이나 에어갭 환경에서 실행하도록 설계되지 않았습니다. Pro 라이선스는 유효성을 유지하려면 아웃바운드 연결로 rustdesk.com에 접속해야 합니다. 처음 활성화할 때뿐 아니라 서버가 실행되는 동안 계속 접속해야 하므로, 완전히 격리된 네트워크는 지원 모델에 포함되지 않습니다.

## 짧은 답변

[공식 라이선스 확인 FAQ](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-often-does-pro-check-license)는 주기적인 검증 방식을 설명합니다. 서버는 443 포트로 하루에 한 번 정도 rustdesk.com에 접속하며, 확인에 실패하면 성공하거나 약 7일이 지날 때까지 재시도하고, 그 뒤에는 라이선스 검증이 중단됩니다. 이 유예 기간 덕분에 짧은 인터넷 장애로 배포가 바로 멈추지는 않지만, 영구적으로 오프라인인 서버는 멈춥니다. ID 서비스와 릴레이 서비스는 계속 자체 호스팅되며, 직접 세션은 엔드포인트 사이를 오가고 릴레이 세션은 자체 릴레이를 사용합니다. 프록시가 지원되므로 필요한 아웃바운드 HTTPS 경로만 허용하고 나머지 네트워크는 차단할 수 있습니다.

## 자세히 살펴보기

이 요건은 **Server Pro**에 적용됩니다. **RustDesk Server OSS(무료 커뮤니티 서버)** 에는 라이선스 확인이 없습니다. RustDesk 클라이언트와 Server OSS는 AGPL 라이선스이며, Server Pro는 상용 독점 자체 호스팅 서버 소프트웨어입니다. 격리된 네트워크에서도 클라이언트와 로컬 ID/릴레이 서비스에는 작동하는 경로, 올바른 키, 플랫폼 권한이 필요합니다. ID로 협상된 직접 세션은 엔드포인트 사이를 오가고, 릴레이 세션은 자체 서버를 사용합니다. ID 기반 세션은 클라이언트에 자체 서버의 공개 키가 설정되어 있으면 종단 간 암호화되지만, [직접 IP 액세스는 암호화되지 않으므로](https://github.com/rustdesk/rustdesk/wiki/FAQ) 제대로 구성된 ID 연결을 대신할 수 없습니다.

고려해야 할 워크플로가 하나 더 있습니다. **커스텀 클라이언트 빌드**입니다. Server Pro에서 브랜드 클라이언트나 미리 구성된 클라이언트를 생성하면 빌드가 RustDesk 빌드 서비스에서 실행되므로, 이 작업에도 아웃바운드 접속이 필요합니다. 제출한 구성은 빌드가 끝나면 삭제되고 설치 파일은 약 하루 뒤 자동으로 삭제되므로, 내려받아 자체 저장소에 보관하세요.

엄격한 에어갭 네트워크라면 이 점이 결정적입니다. rustdesk.com에 _절대_ 접속할 수 없는 서버는 기본 모델을 벗어나므로, 엄격한 에어갭 요건이 있다면 도입을 결정하기 전에 정확한 시나리오를 RustDesk에 확인하세요. 훨씬 흔한 "대부분 격리되어 있고 외부 통신을 엄격히 제한하는" 구성이라면, 직접이든 프록시를 거치든 rustdesk.com으로 나가는 HTTPS 경로 하나를 미리 계획하고, 방화벽 정책을 작성하기 전에 정확한 도메인, 포트, 승인 절차를 정하세요. [RustDesk 문서](https://rustdesk.com/docs/ko/)를 참고하시고, [Docker 없이 설치하더라도 인터넷 연결 없이는 Server Pro를 실행할 수 없는](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/installscript/) 이유도 같은 라이선스 요건 때문이라는 점을 알아 두세요.

## 모든 아웃바운드 의존성 정리하기

엄격히 통제된 환경을 지원하는 보안팀과 [MSP](/ko/blog/rustdesk-for-msps-ko)는 대개 RustDesk를 설치하기 전에 이 질문부터 합니다. Server Pro의 외부 통신 목록은 짧습니다. HTTPS를 통한 rustdesk.com 라이선스 검증, 브랜드 클라이언트를 생성한다면 커스텀 클라이언트 빌드 서비스, 클라이언트 업데이트, 메일 서버가 네트워크 밖에 있다면 SMTP, 그리고 연동한 외부 ID 공급자입니다. ID/랑데부 서버, 릴레이, 콘솔은 네트워크 안에서 실행되므로, 네트워크를 과도하게 여는 대신 정확한 방화벽 규칙을 적용하면 됩니다.

## 관련 질문

- 아웃바운드 도메인과 포트: [RustDesk 문서](https://rustdesk.com/docs/ko/)를 참고하세요.
- [일반 VM에 Docker 없이 RustDesk Server Pro를 설치할 수 있나요?](https://rustdesk.com/docs/ko/self-host/rustdesk-server-pro/installscript/)
- 커스텀 브랜드 클라이언트 생성: [RustDesk 문서](https://rustdesk.com/docs/ko/)를 참고하세요.

통제된 환경이나 에어갭에 가까운 배포를 계획 중이신가요? 라이선스 경로와 실제로 쓰는 외부 통신만 열고 나머지는 모두 내부에 두세요. 영구적인 에어갭이 요건이라면 [sales@rustdesk.com](mailto:sales@rustdesk.com)으로 문의하세요.
