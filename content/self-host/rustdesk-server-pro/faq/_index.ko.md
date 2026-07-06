---
title: FAQ
description: "RustDesk 서버 Pro 설치, 구성, 라이선스, 문제 해결 및 마이그레이션에 관한 자주 묻는 질문. 일반적인 설정 문제, SSL 구성, 데이터베이스 관리 및 업그레이드 절차에 대한 답변을 얻으세요."
keywords: ["rustdesk server pro faq", "rustdesk pro help", "rustdesk installation help", "rustdesk troubleshooting", "rustdesk server setup", "rustdesk license issues", "rustdesk ssl configuration", "rustdesk migration guide", "rustdesk pro support", "rustdesk server questions"]
weight: 600
---

## RustDesk Server Pro 빠른 답변

이 FAQ는 가장 일반적인 RustDesk Server Pro 작업을 다룹니다: 설치, OSS에서의 변환, 업그레이드, 라이선스 마이그레이션, 로깅, SMTP 문제 및 디바이스 관리 문제입니다. 처음부터 시작하는 경우 [installation guide](/docs/ko/self-host/rustdesk-server-pro/installscript/)부터 시작하세요. 이미 실행 중인 서버가 있는 경우 가장 일반적인 후속 페이지는 [License](/docs/ko/self-host/rustdesk-server-pro/license/), [SMTP](/docs/ko/self-host/rustdesk-server-pro/smtp/) 및 [Client Deployment](/docs/ko/self-host/client-deployment/)입니다.

## 각 일반 작업에 어떤 페이지를 사용해야 하나요?

| 작업 | 최적의 페이지 |
| --- | --- |
| 새 Pro 서버 설치하기 | [Installation](/docs/ko/self-host/rustdesk-server-pro/installscript/) |
| Docker로 Pro 설치하기 | [Docker install](/docs/ko/self-host/rustdesk-server-pro/installscript/docker/) |
| OSS에서 Pro로 변환하기 | [Installation](/docs/ko/self-host/rustdesk-server-pro/installscript/#convert-from-open-source) |
| 라이선스 구매 또는 이전하기 | [License](/docs/ko/self-host/rustdesk-server-pro/license/) |
| 이메일 알림 설정하기 | [SMTP](/docs/ko/self-host/rustdesk-server-pro/smtp/) |
| SSO 또는 ID 로그인 구성하기 | [OIDC](/docs/ko/self-host/rustdesk-server-pro/oidc/) 또는 [LDAP](/docs/ko/self-host/rustdesk-server-pro/ldap/) |
| 대규모 클라이언트 배포하기 | [Client Deployment](/docs/ko/self-host/client-deployment/) |

## 간편 설치 스크립트로 설치하려면 어떻게 해야 하나요?
1. [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html)로부터 라이선스를 받고, 자세한 내용은 [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) 페이지를 확인하세요.
2. VPS, 베어 메탈 또는 Linux VM을 생성하세요.
3. DNS와 SSL을 사용하려면 DNS 이름, 예를 들어 `rustdesk.yourdomain.com`를 생성하세요.
4. [This page](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#install)를 실행하세요.
5. 명령어를 복사하여 Linux 터미널에 붙여넣으세요.
6. 안내에 따라 설치를 진행하세요.
7. 설치가 완료되면 `https://rustdesk.yourdomain.com` 또는 `http://youripaddress:21114`를 실행하세요.
8. 사용자 이름 `admin`와 비밀번호 `test1234`로 로그인하세요.
9. 1단계에서 구매한 라이선스 코드를 입력하세요.

## RustDesk 서버 오픈소스에서 RustDesk 서버 프로로 어떻게 변환할 수 있나요?
1. [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html)로부터 라이선스를 받고, 자세한 내용은 [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) 페이지를 확인하세요.
2. TCP 포트 21114를 열어주세요.
3. 귀하의 RustDesk 서버에 로그인하세요.
4. 이미 DNS를 사용하지 않았고 SSL을 사용하고 싶다면 DNS 이름을 생성하세요. 예: `rustdesk.yourdomain.com`.
5. [This page](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#convert-from-open-source).
6. 명령어를 복사하여 Linux 터미널에 붙여넣으세요.
7. 설치 과정 중 안내에 따라 진행하세요.
8. 설치가 완료되면 `https://rustdesk.yourdomain.com` 또는 `http://youripaddress:21114`로 이동하세요.
9. 사용자 이름 `admin`와 비밀번호 `test1234`로 로그인하세요.
10. 1단계에서 구매한 라이선스 코드를 입력하세요.

## RustDesk Server Pro의 새 버전이 출시되었습니다. 어떻게 업그레이드할 수 있나요?
먼저 데이터 파일(sqlite3 파일 등)을 백업하는 것이 좋습니다. https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375.
- ### 스크립트(`install.sh`)로 설치한 경우
[update.sh](/docs/ko/self-host/rustdesk-server-pro/installscript/script/#upgrade)를 실행해주세요.
- ### Docker Compose

```
sudo docker compose down
sudo docker compose pull 
sudo docker compose up -d
```

하지만 이는 귀하의 Docker 버전에 따라 달라지며, 더 자세한 내용은 [this](https://stackoverflow.com/questions/37685581/how-to-get-docker-compose-to-use-the-latest-image-from-repository)를 확인하십시오.
- ### Docker

```
sudo docker ps
## you can also use <CONTAINER NAME>, e.g. `hbbs` and `hbbr` if you follow our manual.
sudo docker stop <CONTAINER ID>
sudo docker rm <CONTAINER ID>
sudo docker rmi <IMAGE ID>
sudo docker run ..... # same as you installed it before
```

예:

```
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED          STATUS                         PORTS     NAMES
30822972c220   rustdesk/rustdesk-server-pro   "hbbr"    10 seconds ago   Restarting (1) 2 seconds ago             hbbr
0f3a6f185be3   rustdesk/rustdesk-server-pro   "hbbs"    15 seconds ago   Up 14 seconds                            hbbs
root@hz:~# sudo docker kill hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
root@hz:~# sudo docker rm hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker rmi rustdesk/rustdesk-server-pro
Untagged: rustdesk/rustdesk-server-pro:latest
Untagged: rustdesk/rustdesk-server-pro@sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Deleted: sha256:a3d9d43a3d1dd84b10c39fe0abf7767b18a87819ff0981443ce9e9a52604c889
Deleted: sha256:65ae79ecc0f8b1c8a21085d04af7c8d8f368dd5ad844982d4c7b3ac1f38ba33a
Deleted: sha256:9274a824aef10f2ef106d8f85fbd1905037169cf610951f63dc5109dae4b0825
Deleted: sha256:aa89ac8b57a49f49f041c01b9c0f016060e611cf282e3fda281bc6bebbabaf3f
Deleted: sha256:4af9839016f72586a46f915cae8a5ccf3380ba88a2f79532692d3b1d7020387e
Deleted: sha256:e900a7ffc2fc14fa432cc04823740dcbb78c0aa3508abbbe287ce8b274541ada
Deleted: sha256:503eeab76c11e8316a2a450ef0790d31c5af203309e9c5b44d1bf8a601e6e587
Deleted: sha256:825683356e7dbfcbaabcbf469c9aeb34d36ebeab0308170432b9553e28203116
Deleted: sha256:24a48d4af45bab05d8712fe22abec5761a7781283500e32e34bdff5798c09399
root@hz:~# sudo docker images
REPOSITORY         TAG       IMAGE ID       CREATED        SIZE
rustdesk/makepkg   latest    86a981e2e18f   2 months ago   2.23GB
root@hz:~# sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
Unable to find image 'rustdesk/rustdesk-server-pro:latest' locally
latest: Pulling from rustdesk/rustdesk-server-pro
4ce000a43472: Pull complete
1543f88421d3: Pull complete
9b209c1f5a8d: Pull complete
d717f548a400: Pull complete
1e60b98f5660: Pull complete
a86960d9bced: Pull complete
acb361c4bbf6: Pull complete
4f4fb700ef54: Pull complete
Digest: sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Status: Downloaded newer image for rustdesk/rustdesk-server-pro:latest
0cc5387efa8d2099c0d8bc657b10ed153a6b642cd7bbcc56a6c82790a6e49b04
root@hz:~# sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
4eb9da2dc460810547f6371a1c40a9294750960ef2dbd84168079e267e8f371a
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED         STATUS                                  PORTS     NAMES
4eb9da2dc460   rustdesk/rustdesk-server-pro   "hbbr"    5 seconds ago   Restarting (1) Less than a second ago             hbbr
0cc5387efa8d   rustdesk/rustdesk-server-pro   "hbbs"    8 seconds ago   Up 7 seconds                                      hbbs
root@hz:~# sudo docker images
REPOSITORY                     TAG       IMAGE ID       CREATED        SIZE
rustdesk/rustdesk-server-pro   latest    a3d9d43a3d1d   5 days ago     193MB
rustdesk/makepkg               latest    86a981e2e18f   2 months ago   2.23GB
```

자세한 내용은 [this](https://www.cherryservers.com/blog/how-to-update-docker-image)를 참조하세요.

## 스크립트로 설치했는데, 서비스를 시작하고 중지하려면 어떻게 해야 하나요?
서비스는 systemd를 사용하므로 `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr`를 이용해 시작하고 중지할 수 있습니다. 예: `sudo systemctl restart rustdesk-hbbs`.

## 스크립트로 설치했는데, Linux 로그를 어떻게 볼 수 있나요?
로그는 `/var/log/rustdesk-server`에 저장되어 있으며, `tail /var/log/rustdesk-server/hbbs.log` 또는 `tail /var/log/rustdesk-server/hbbs.error`를 사용하여 확인할 수 있습니다.

## 스크립트로 설치했는데 RustDesk 서비스의 상태를 어떻게 확인할 수 있나요?
`sudo systemctl status rustdesk-hbbs|rustdesk-hbbr`, 예를 들어 `sudo systemctl status rustdesk-hbbs`와 같은 상태를 확인하려면.

## 관리자 비밀번호를 어떻게 변경할 수 있나요?
1. `https://rustdesk.yourdomain.com` 또는 `http://youripaddress:21114`.
2. 사용자 이름 `admin`와 비밀번호 `test1234`로 로그인하세요.
3. 오른쪽 상단 모서리에 있는 `admin`를 클릭하세요.
4. `Settings`를 클릭하세요.
5. 제공된 상자에 새 비밀번호를 입력하세요.

## 라이선스를 새 서버로 이전하려면 어떻게 해야 하나요?
[here](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-and-migration)를 참조하세요.

## 내 VPS에서 이메일이 작동하지 않습니다
많은 VPS 제공업체가 포트 465와 25를 차단합니다.

간단한 확인 방법은 텔넷을 사용하는 것입니다. Linux 터미널에서 `telnet your.mailserver.com 25`를 입력하세요. Windows에서는 PowerShell을 사용하고 `Test-NetConnection -ComputerName your.mailserver.com -Port 25`를 입력하세요.

귀하의 메일 서버가 포트 25를 사용하지 않을 수 있습니다. 올바른 포트를 사용하고 있는지 확인해 주세요.

## PowerShell이나 유사한 도구를 사용해 RustDesk를 배포할 수 있나요?
네, 배포를 돕는 스크립트를 찾을 수 있습니다 [here](https://rustdesk.com/docs/en/self-host/client-deployment/).

## 버그 보고서를 어떻게 제출할 수 있나요?
[GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues)를 통해 제출해 주세요.

## 자가 호스팅을 하는데도 왜 이 제품이 무료 오픈소스가 아닌가요?
1. RustDesk는 여러 사람에게 전업 직업이 되었으며, 그들은 각자 삶과 아내, 직장, 아이들이 있어 모두 관심과 비용이 필요합니다!
2. 우리는 앞으로도 계속 여기에 머물며 훌륭한 발전을 이루고 싶습니다.
3. 오픈소스 버전은 계속 오픈소스로 유지될 것이며, 다른 사람들이 AGPL 라이선스에 맞춰 개발하도록 장려하겠습니다.

## 서로 다른 그룹의 기기와 연결할 수 없는데, 이유가 무엇인가요?
이는 쉽게 해결할 수 있습니다. 그룹 간 접근 권한을 허용해야 합니다.
1. 새 그룹을 추가하세요.
2. `Edit`를 클릭하세요.
3. 접근하고자 하는 관련 그룹을 선택하세요(해당 그룹에 자동으로 추가됩니다).

## 어떻게 자동으로 설정을 받을 수 있나요?
설정은 자동으로 생성됩니다.
1. [GitHub](https://github.com/rustdesk/rustdesk/releases/latest)에서 최신 클라이언트를 다운로드하세요.
2. 웹 콘솔의 메인 페이지에서 `Windows EXE`를 클릭하세요.
3. 호스트와 API를 입력하세요(설정과 다른 경우).
4. `Submit`를 클릭하세요.
5. Android에서 QR 코드를 스캔하고, 생성된 이름으로 exe 파일의 이름을 바꾸세요.

## RustDesk Server Pro용 호스팅을 제공하시나요?
[sales](mailto://sales@rustdesk.com) 팀에 연락해 주세요.

## 동영상 설정 가이드를 볼 수 있는 곳이 있나요?
네! [YouTube Channel](https://youtube.com/@RustDesk)가 있습니다.

## 내 로그/장치 이름이 비어 있음은 왜 그런가요?
제어 중인 장치에서 API가 올바르게 설정되었는지 확인하세요. https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750.

## RustDesk Server Pro를 어떻게 설치 제거할 수 있나요?
다음 명령어를 실행하세요:

```sh
sudo systemctl stop rustdesk-hbbs.service
sudo systemctl disable rustdesk-hbbs.service
sudo systemctl stop rustdesk-hbbr.service
sudo systemctl disable rustdesk-hbbr.service
sudo systemctl daemon-reload
sudo rm /etc/systemd/system/rustdesk-hbbs.service
sudo rm /etc/systemd/system/rustdesk-hbbr.service
sudo rm /usr/bin/hbbs
sudo rm /usr/bin/hbbr
sudo rm -rf /var/lib/rustdesk-server/
sudo rm -rf /var/log/rustdesk-server/
```

스크립트가 Nginx를 설치한 경우 다음을 사용하여 제거하십시오:

```sh
sudo apt remove nginx
```

## 웹 콘솔의 장치 목록에서 장치를 제거하려면 어떻게 해야 하나요?
비활성화한 후 삭제하는 기능이 이제 사용 가능해졌습니다.

## PowerShell을 사용하여 RustDesk를 업데이트하려면 어떻게 해야 하나요?

```ps
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq "1.2.6")
{
    Write-Output "RustDesk $rdver is the newest version."
    Exit
}

if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```

## `Key mismatch` 오류
클라이언트를 [correct key](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/)로 구성해 주세요.

## `Failed to connect to relay server` 오류
`hbbr`가 실행되고 있는지 확인해 주세요. `hbbr`에 대한 자세한 정보는 [here](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/)에서 확인할 수 있습니다.
귀하의 `hbbr`가 `hbbs`와 동일한 머신에서 실행되지 않거나, 여러 릴레이 서버를 사용하거나, 기본 포트인 `21117`에서 실행되지 않는 경우, 이를 `hbbs`에 명시적으로 알려야 합니다. [here](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/)를 확인해 주세요.

## 관리자 계정의 MFA 재설정
https://github.com/rustdesk/rustdesk/discussions/6576

## 웹 콘솔용 HTTPS 수동 설정

### 1. 도메인 이름을 구매하고 이를 서버의 IP 주소로 해석하세요.
* GoDaddy, Namecheap 또는 Namesilo와 같은 도메인 등록기관에서 도메인 이름을 구매하세요.
* 다음 중 하나를 사용하여 도메인 이름을 서버의 IP 주소로 해석하세요:
    - 도메인 등록기관의 제어판(권장)
    - [DNS providers](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers)

예를 들어, `Namesilo`에서 도메인 이름 `example.com`를 구매하고 서버의 IP 주소가 `123.123.123.123`라면, `rustdesk.example.com` 하위 도메인을 HTTPS 웹 콘솔 주소로 사용하고 싶습니다. [link](https://www.namesilo.com/account_domains.php)를 열고 툴팁 `Manage dns for the domain`가 표시된 버튼을 클릭한 다음, 호스트명 `rustdesk`와 서버의 IP 주소를 사용해 `A` 레코드를 추가해야 합니다.
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)
* DNS가 적용되는 데 시간이 소요되므로, https://www.whatsmydns.net를 방문하여 도메인이 서버의 IP 주소로 해석되었는지 확인하세요. 6단계는 올바른 해석 결과에 따라 달라집니다. 다음 단계에서는 `YOUR_DOMAIN`를 하위 도메인으로 교체하십시오. 예를 들어, `rustdesk.example.com`로 변경하세요.

### 2. Nginx 설치하기
* Debian/Ubuntu: `sudo apt-get install nginx`
* Fedora/CentOS: `sudo dnf install nginx` 또는 `sudo yum install nginx`
* Arch: `sudo pacman -S install nginx`
* openSUSE: `sudo zypper install nginx`
* Gentoo: `sudo emerge -av nginx`
* Appine: `sudo apk add --no-cache nginx`

`nginx -h`를 실행하여 성공적으로 설치되었는지 확인하십시오.

### 3. Certbot 설치하기
* 방법 1: `snap`가 설치되어 있으면 `sudo snap install certbot --classic`를 실행하세요.
* 방법 2: 대신 `python3-certbot-nginx`를 사용하세요. 예를 들어 Ubuntu의 경우 `sudo apt-get install python3-certbot-nginx`를 사용하세요.
* 방법 3: 위 두 방법이 실패한 경우, `certbot-nginx`를 설치해 보세요. 예를 들어 CentOS 7의 경우 `sudo yum install certbot-nginx`를 사용하세요.

`certbot -h`를 실행하여 성공적으로 설치되었는지 확인하십시오.

### 4. Nginx 구성
두 가지 방법이 있습니다:
* 디렉터리 `/etc/nginx/sites-available` 및 `/etc/nginx/sites-enabled`가 존재하는 경우, 다음 명령어의 `YOUR_DOMAIN`를 사용자의 도메인 이름으로 교체하고 실행하십시오.

```sh
cat > /etc/nginx/sites-available/rustdesk.conf << EOF
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```

그런 다음 `sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf`를 실행하십시오.

`cat /etc/nginx/sites-available/rustdesk.conf`를 실행하여 내용이 올바른지 확인하십시오.

* 디렉터리 `/etc/nginx/sites-available` 및 `/etc/nginx/sites-enabled`가 존재하지 않고 디렉터리 `/etc/nginx/conf.d`가 존재하는 경우, 다음 명령어의 `YOUR_DOMAIN`를 귀하의 도메인 이름으로 바꾸고 실행하십시오.

```sh
cat > /etc/nginx/conf.d/rustdesk.conf << EOF
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```

`cat /etc/nginx/conf.d/rustdesk.conf`를 실행하여 내용이 올바른지 확인하십시오.

### 5. 도메인에 대한 방화벽 규칙 활성화
다음 명령어를 실행하십시오:

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. SSL 인증서 생성
`$YOUR_DOMAIN`를 도메인 이름으로 바꾼 다음 실행하세요.
`sudo certbot --nginx --cert-name $YOUR_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $YOUR_DOMAIN`.

`Enter email address (used for urgent renewal and security notices)`가 표시되면 이메일 주소를 입력하세요.

마지막으로, `rustdesk.conf`의 내용은 다음과 같아야 합니다:

```
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = YOUR_DOMAIN) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name YOUR_DOMAIN;
    listen 80;
    return 404; # managed by Certbot
}
```

다음은 일반적인 오류입니다:

* 콘솔에 `Successfully deployed certificate for YOUR_DOMAIN to /etc/nginx/.../rustdesk.conf` 대신 `Successfully deployed certificate for YOUR_DOMAIN to /etc/nginx/.../default`가 출력됩니다.

그 이유는 Certbot이 `rustdesk.conf` 파일을 찾지 못했기 때문일 수 있습니다. 다음 해결 방법 중 하나를 시도해 보세요:
- 5단계의 결과를 확인하고, `sudo service nginx restart`를 실행하세요.
- `YOUR_DOMAIN`가 포함된 서버 구성 `server{...}`를 `rustdesk.conf`로 복사한 후, `location{...}`를 아래 내용으로 변경하세요.

```sh
location / {
    proxy_set_header        X-Real-IP       $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:21114/;
}
```

* `too many certificates (5) already issued for this exact set of domains in the last 168 hours`

해결 방법: DNS에 다른 도메인 이름을 추가하고 `YOUR_DOMAIN`를 해당 이름으로 변경하세요. 예를 들어 `rustdesk2.example.com`로 변경하세요. 그런 다음 1, 4, 6단계를 반복하세요.

* `Error getting validation data`

해결 방법: 방화벽이 원인일 수 있습니다. 자세한 내용은 https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall을 참조하세요.

알림: `rustdesk.conf`를 수동으로 변경한 경우 `sudo service nginx restart`를 실행하십시오.

### 7. 웹 페이지에 로그인하기
* 브라우저에서 `https://YOUR_DOMAIN`를 열고 기본 사용자 이름 "admin"과 비밀번호 "test1234"를 사용해 로그인한 다음, 비밀번호를 본인의 것으로 변경하십시오.

### 8. id 서버와 릴레이 서버에 WebSocket Secure (WSS) 지원을 추가하여 모든 플랫폼에서 안전한 통신을 가능하게 하십시오.

`/etc/nginx/.../rustdesk.conf` 파일의 첫 번째 `server` 섹션에 다음 구성 항목을 추가한 후 `Nginx` 서비스를 다시 시작하십시오. 
웹 클라이언트는 `https://YOUR_DOMAIN/web`를 통해 접속할 수 있습니다. 사용자 지정 클라이언트는 고급 옵션에서 `allow-websocket=Y`를 설정하여 웹소켓을 사용할 수 있습니다. 웹소켓이 활성화된 사용자 지정 클라이언트를 사용하는 경우 TCP/UDP를 사용하지 않으며 릴레이를 통해서만 연결할 수 있습니다(직접 IP 연결 제외). 이 웹소켓 활성화 클라이언트만 사용하는 경우 서버는 21114~21119 포트를 닫고 443 포트만 열어둘 수 있습니다.

```
    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
```

전체 구성은 다음과 같습니다.

```
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = YOUR_DOMAIN) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name YOUR_DOMAIN;
    listen 80;
    return 404; # managed by Certbot
}
```

{{% notice note %}}
이전에 웹 클라이언트용으로 배포한 적이 있고 모든 플랫폼에서 사용하고자 한다면 `proxy_read_timeout`를 추가해야 합니다.
{{% /notice %}}

### 9. RustDesk 공개 웹 클라이언트 `https://rustdesk.com/web`를 사용하는 경우 CORS 우회하기

브라우저의 CORS 제한을 우회하려면 `/etc/nginx/.../rustdesk.conf`의 `location /` 섹션에 아래 내용을 추가해야 합니다. 자체 웹 클라이언트를 사용하는 경우 이 단계는 건너뛰기 바랍니다.

```
        if ($http_origin ~* (https?://(www\.)?rustdesk\.com)) {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
        }
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            return 204;
        }
```

## SELinux

설치하기 시 `Waiting for RustDesk Relay service to become active...`가 나타나는 경우, 이는 SELinux로 인해 발생할 수 있습니다. 다음 명령어를 시도해 볼 수 있습니다:

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## 방화벽

### 클라우드의 방화벽
AWS/Azure/Google/DigitalOcean 클라우드에서 실행하는 경우, 클라우드 벤더의 대시보드에서 UDP(21116) 및 TCP(21114-21119) 인바운드 포트를 열어주세요.

- [AWS] https://docs.aws.amazon.com/network-firewall/latest/developerguide/getting-started.html
- [Azure] https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- [Google] https://cloud.google.com/firewall/docs/firewalls
- [DigitalOcean] https://docs.digitalocean.com/products/networking/firewalls/

### 온프레미스 서버의 방화벽
RustDesk는 `ufw`로 방화벽을 설정합니다. CentOS 9와 같은 일부 배포판에서는 작동하지 않을 수 있으며, `firewall-cmd`로 시도해 볼 수 있습니다:

```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
```

IP를 사용하는 경우:

```sh
sudo firewall-cmd --permanent --add-port=21114/tcp
```

DNS/도메인을 사용하는 경우:

```sh
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
```

위와 같이 한 후, `sudo firewall-cmd --reload`를 실행하여 방화벽을 다시 로드하십시오.

## 웹 콘솔에서 관리자 비밀번호를 변경한 후 로그인할 수 없습니다. 비밀번호를 간단하게 재설정하는 방법이 있나요?
1. `rustdesk-utils`가 설치되어 있는지 확인하세요. 설치되지 않았다면 [here](https://github.com/rustdesk/rustdesk-server-pro)를 설치할 수 있습니다. 또한 데이터베이스가 있는 폴더, 즉 `/var/lib/rustdesk-server`에서 명령어를 실행해야 합니다.
2. 명령어는 `rustdesk-utils set_password username password`입니다. 정상적으로 작동하면 *완료*라고 표시됩니다.

또한 `rustdesk-utils`와 함께 사용할 수 있는 다음과 같은 기타 명령어 `genkeypair`, `validatekeypair [public key] [secret key]`, `doctor [rustdesk-server]`, `reset_email_verification` 및 `reset_2fa_verification`가 있습니다.

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

## Docker 컨테이너에 루트 CA 인증서 추가하기 (SMTP, OIDC 등에서 TLS 실패 시)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703