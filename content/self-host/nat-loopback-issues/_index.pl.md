---
title: Problemy z pętlą zwrotną NAT
weight: 500
pre: "<b>2.5. </b>"
---

{{% notice note %}}
To wyjaśnienie obejmuje złożoną wiedzę z zakresu sieci komputerowych, dlatego potrzebujemy pomocy, aby poprawić jego zrozumiałość.
{{% /notice %}}


Więcej szczegółowych informacji na temat pętli zwrotnej NAT można znaleźć na [Wikipedii](https://en.wikipedia.org/wiki/Network_address_translation#NAT_hairpinning) (_brak polskiej wersji_).

Podczas wdrażania serwera RustDesk w sieci domowej lub innym środowisku sieciowym znajdującym się za zaporą NAT, serwer RustDeska i klienci **MUSZĄ**:
A: Używać lokalnego adresu IP, aby uzyskać dostęp do siebie nawzajem LUB:
B: Skonfigurować zaporę sieciową, która obsługuje i ma włączoną funkcję pętli zwrotnej NAT.

Możesz zauważyć, że nie możesz połączyć się z serwerem za pomocą **publicznego adresu IP** lub **domeny** (która teoretycznie wskazuje na Twój publiczny adres IP).

## Problem 
W tym przykładzie prześledzimy, co się dzieje, gdy urządzenia LAN próbują połączyć się z `rustdesk.przyklad.pl`. Załóżmy, że publiczny adres IP routera to `172.16.16.1`, adres IP serwera w sieci LAN to `192.168.11.20`, a żądana domena to `rustdesk.przyklad.pl`. Posiadasz klienta korzystającego z adresu `192.168.11.2`.

Po skonfigurowaniu serwera za NAT routera można dodać przekierowanie portów w routerze, aby wszystkie przychodzące wiadomości kierowane na PUBLICZNY adres IP 172.16.16.1 były przekazywane do serwera pod adresem 192.168.11.20.

Gdy urządzenie LAN chce uzyskać dostęp do Internetu, na przykład do serwera WWW pod adresem 8.8.8.8, wysyła żądanie jako pochodzące z adresu 192.168.11.2 i kieruje je do routera.  Router przechwytuje to żądanie i przepisuje je na adres 8.8.8.8 jako pochodzące z adresu 172.16.16.1. Kiedy adres 8.8.8.8 odpowiada na adres 172.16.16.1, router sprawdza poprzednie połączenie i przekierowuje odpowiedź z powrotem na adres 192.168.11.2.

Jeśli użytkownik pod adresem 8.8.8.8 wyśle wiadomość do naszej sieci, używając adresu 172.16.16. 1, reguła przekierowania portów zmieni adres docelowy 172.16.16.1 na serwer pod adresem 192.168.11.20, pozostawiając źródło żądania jako 8.8.8.8, dzięki czemu serwer może odpowiedzieć (mniej więcej) bezpośrednio na adres 8.8.8.8.

Jeśli użytkownik pod adresem 8.8.8.8 zdecyduje się na próbę włamania do naszej sieci i twierdzi, że wysyła wiadomości z adresu 192.168.11.2, router wie, że ruch pochodzący z adresu 192.168.11.2 jest ważny tylko z urządzeń sieci LAN i zazwyczaj blokuje ten ruch.

Problem pojawia się, gdy próbujesz połączyć się z siecią LAN. Jeśli urządzenie LAN próbuje połączyć się z `rustdesk.przyklad.pl`, które będzie miało adres `172.16.16.1`.  W tym momencie router ma wiele możliwości do wyboru.  Właśnie wysłał wiadomość ze swojego portu LAN do portu WAN, pochodzącą z adresu 192.168.11.2 i kierowaną do adresu 172.16.16.1.  Po dotarciu do portu WAN wiadomość ta jest nie do odróżnienia od powyższego przykładu, w którym ktoś z Internetu próbował włamać się do naszej sieci.

Funkcja pętli zwrotnej NAT skutecznie zmieni część adresu źródłowego "z 192.168.11.2" we wcześniejszym etapie procesu, aby wiedzieć, że musi użyć tabeli NAT do przesyłania wiadomości między serwerem a klientem.

Jeśli problem z połączeniem występuje tylko wtedy, gdy znajdujesz się w sieci LAN, ale działa ono poprawnie poza nią, może to być przyczyną twojego problemu.


## Rozwiązania
Istnieją trzy sposoby rozwiązania tego problemu.

### 1. Skonfiguruj NAT Loopback na routerze
Jeśli wiesz, jak to zrobić, możesz skonfigurować pętlę zwrotną NAT na swoim routerze, ale wymaga to wiedzy z zakresu sieci. Niektóre routery nie mają możliwości dostosowania tego ustawienia, więc nie jest to najlepsza opcja dla wszystkich.

{{% notice note %}}
Artykuł opublikowany przez [MikroTik](https://help.mikrotik.com/docs/display/ROS/NAT#NAT-HairpinNAT) bardzo dobrze wyjaśnia tę kwestię. Możesz zacząć naukę od tego miejsca.
{{% /notice %}}

### 2. Wdróż serwer DNS w sieci LAN.
Najpierw wybierz, który wolisz: [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/Docker) czy [Pi-hole](https://github.com/pi-hole/docker-pi-hole). Możesz to wdrożyć przez dockera albo na tym samym serwerze co serwer RustDeska. Poniższy przykład pokaże Ci kilka kroków, jak to zrobić.

Oba są blokerami reklam opartymi na DNS, ale można wyłączyć tę funkcję, jeśli nie chcesz blokować reklam.

Najpierw skieruj swoją `domenę` na adres IP sieci LAN serwera RustDesk (na przykład `192.168.11.20`). Następnie przejdź do ustawień `DHCP` routera (uwaga: NIE WAN) i ustaw `pierwszy` adres IP DNS na serwer, na którym wdrożyłeś AdGuard Home lub Pi-hole. `Drugim` adresem DNS może być DNS dostawcy usług internetowych lub inny publiczny DNS, np. `1.1.1.1` (Cloudflare) lub `8.8.8.8` (Google). Gotowe!

Oto przykład:
#### AdGuard Home
Blokowanie reklam może powodować problemy. Jeśli nie chcesz szukać rozwiązania i chcesz wyłączyć tę funkcję, kliknij przycisk "Wyłącz ochronę".

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_disable_protection.png)
<br>

Przejdź do ustawień "Przepisywanie DNS" (_DNS Rewrites_).

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_click_dns_rewrites.png)
<br>

Kliknij "Dodaj przepisywanie DNS", a następnie wpisz swoją `domenę` i `adres IP w sieci LAN` serwera w polu.

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_dns_rewrite_dialog.png)

Oto jak wygląda efekt końcowy.

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_dns_rewrite_final_result.png)

***Nie zapomnij przypisać AdGuard Home do DHCP sieci LAN routera!***
<hr>

#### Pi-hole
Blokowanie reklam może powodować problemy. Jeśli nie chcesz szukać rozwiązania i chcesz wyłączyć tę funkcję, kliknij przycisk "Na stałe" w podmenu "Wyłącz blokowanie".

![](/docs/en/self-host/nat-loopback-issues/images/pi_hole_disable_blocking.png)

Przejdź do "Lokalny DNS → Rekordy DNS".
Wpisz swoją `domenę` i adres `IP` w polu, a następnie kliknij "Dodaj".

Aby sprawdzić ostateczne wyniki, spójrz na żółte linie na tym zdjęciu.

![](/docs/en/self-host/nat-loopback-issues/images/pi_hole_local_dns_dns_records.png)

***Nie zapomnij przypisać swojego Pi-hole do DHCP sieci LAN routera!***

### 3. Dodaj reguły do pliku hosts
Ta metoda jest zalecana tylko w przypadku niewielkiej liczby urządzeń. Jeśli masz wiele urządzeń, preferowana jest metoda DNS. W przeciwnym razie musiałbyś wykonać tę czynność ręcznie na każdym urządzeniu, które wymaga dostępu do serwera.

{{% notice warning %}}
Jeśli ta metoda zostanie zastosowana na urządzeniu przenośnym, takim jak laptop, nie będzie ono mogło połączyć się z serwerem poza siecią LAN.
{{% /notice %}}

Ścieżka dla różnych systemów operacyjnych:

#### Windows
```text
C:\Windows\system32\drivers\etc\hosts
```
Możesz edytować ten plik z podwyższonymi uprawnieniami lub skopiować go na `Pulpit` i edytować tam. Po zakończeniu edycji skopiuj plik z powrotem do oryginalnej lokalizacji.

#### macOS
```text
/etc/hosts
```
Możesz użyć programu `vim`, który jest preinstalowany.
```sh
sudo vim /etc/hosts
```

#### Linux
```text
/etc/hosts
```
Możesz użyć `vim` lub `nano`.
```sh
sudo vim /etc/hosts
```

<hr>

Format jest taki sam we wszystkich trzech systemach operacyjnych. Najpierw `IP`, a następnie `domena`. Jedna pozycja w każdym wierszu.

Przykładowo:
```text
192.168.11.20   rustdesk.przyklad.pl
```

