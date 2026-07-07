---
title: Docker
weight: 3
description: "호스트 네트워킹을 사용하여 Docker Compose를 통해 RustDesk 서버 프로를 설치하기. 이 안내서를 사용해 제공된 compose 파일로 hbbs, hbbr 및 Pro 웹 콘솔을 배포하세요."
keywords: ["rustdesk server pro docker", "rustdesk pro docker compose", "rustdesk pro host network", "rustdesk hbbs hbbr docker", "rustdesk self-host pro docker"]
---

이 안내서를 사용하여 Docker Compose와 필요한 호스트 네트워킹 구성으로 RustDesk Server Pro를 설치하기 바랍니다.

## RustDesk Server Pro의 권장 Docker 설정은 무엇인가요?

`network_mode: "host"`를 사용한 Docker Compose는 대부분의 Linux 기반 RustDesk Server Pro 배포에 권장되는 설정입니다. 이 방법은 `hbbs`와 `hbbr`를 하나의 재현 가능한 구성으로 함께 유지하며, 호스트 네트워킹을 사용하지 않을 경우 발생할 수 있는 라이선스 문제를 피할 수 있습니다.

## RustDesk Server Pro Docker 체크리스트

1. Docker를 설치하기.
2. 키 및 데이터베이스와 같은 RustDesk 파일을 위한 영구 `data` 디렉터리를 생성하세요.
3. Docker Compose로 `hbbs`와 `hbbr`를 시작하세요.
4. 필요한 RustDesk 포트를 열어주세요. 특히 웹 콘솔을 직접 사용하는 경우 `21114` 포트를 열어야 합니다.
5. 도메인 뒤에 웹 콘솔을 원한다면 HTTPS를 별도로 추가하세요.

## 언제 원시 `docker run` 대신 Compose를 사용해야 하나요?

장기적인 프로덕션 배포 및 업그레이드에는 Docker Compose를 사용하세요. 원시 `docker run` 명령어는 주로 테스트, 디버깅 또는 각 컨테이너에 대한 완전한 수동 제어가 필요한 환경에서 사용하세요.

## Docker Compose(권장)

Docker Compose를 사용하려면 라이선스가 작동하도록 `network_mode: "host"`를 반드시 사용해야 합니다. 이 [guide](https://docs.docker.com/engine/install)를 사용해 Docker를 설치하여 최신 버전을 보장하세요!

아래 내용을 `compose.yml`에 복사하세요.

```yaml
services:
  hbbs:
    container_name: hbbs
    image: docker.io/rustdesk/rustdesk-server-pro:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: docker.io/rustdesk/rustdesk-server-pro:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

그런 다음 `sudo docker compose up -d` 또는 `podman-compose up -d`를 실행하십시오.

> `podman-compose` 설치용 `sudo apt install podman-compose`

{{% notice note %}}
[Set up HTTPS for web console manually](/docs/ko/self-host/rustdesk-server-pro/faq/#웹-콘솔용-https-수동-설정)를 사용하는 방법.
{{% /notice %}}

## Docker 명령어

이 [guide](https://docs.docker.com/engine/install)를 사용해 Docker를 설치하면 가장 최신 버전을 보장할 수 있습니다!

또는 이 단일 명령어로 Docker를 설치할 수도 있습니다.

```
bash <(wget -qO- https://get.docker.com)
```

다음 명령어를 실행하십시오(s6 이미지에는 `./data:/root` 대신 `./data:/data`가 필요할 수 있음):

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
위의 예제에서는 `sudo`와 `--net=host`를 사용합니다. 이는 Windows에서 작동하지 않으니 해당 명령어를 제거해 주세요. 만약 `--net=host`를 제거하신다면 아래를 확인해 주세요.
{{% /notice %}}

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
[Set up HTTPS for web console manually](/docs/ko/self-host/rustdesk-server-pro/faq/#웹-콘솔용-https-수동-설정) 사용 방법.
{{% /notice %}}

> Fedora에서 SELinux로 문제가 발생하면 이 [issue](https://github.com/rustdesk/rustdesk-server/issues/230)를 확인해 보세요.