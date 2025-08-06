---
title: Windows & PM2 lub NSSM
weight: 20
---

{{% notice note %}}
Polityka bezpieczeństwa systemu Windows jest skomplikowana. Jeśli ten samouczek nie działa lub występują problemy z połączeniem, przejdź na serwer z systemem Linux.
{{% /notice %}}

{{% notice note %}}
Wersja GUI, `RustDeskServer.setup.exe`, nie jest już wspierana i nie jest zalecana.
{{% /notice %}}

## Wybór
Masz teraz dwie możliwości: możesz użyć PM2 (łatwiejsze) lub NSSM (nieco trudniejsze) do uruchomienia serwera RustDeska.
Korzystanie z NSSM ma kilka zalet:
- Kompatybilność wsteczna ze starszymi wersjami systemu Windows (Windows Server 2008 R2/Windows 7 i wcześniejsze, choć nie zostało to przetestowane).
- Idealne rozwiązanie dla systemu Windows Server.
- Automatyczne uruchamianie podczas startu systemu bez konieczności logowania (użytkownik, który utworzył wpis startowy, nie musi się logować, aby uruchomić program).
- Uruchamianie obu plików binarnych jako usług.
- Samodzielne działanie (brak zależności od Node.js).

Zalety PM2 obejmują:
- Dobry rozwiązanie, jeśli serwer działa na tym samym komputerze, co główny komputer roboczy
- Regularne logowanie się na konto użytkownika, który utworzył wpis startowy RustDeska
- Bardziej przyjazny dla użytkownika

## Instalacja za pomocą NSSM

### Instalacja NSSM
Proszę [pobrać](https://github.com/dkxce/NSSM/releases/download/v2.25/NSSM_v2.25.zip) i rozpakować NSSM, wybierając odpowiednią
architekturę dla systemu Windows (w przypadku x86 należy użyć zawartości folderu win32, a w przypadku x64 zawartości
folderu win64). Najlepszą praktyką jest również przeniesienie pliku binarnego NSSM do katalogu
`Pliki programów\NSSM` (po uruchomieniu NSSM jako usługi nie można go przenieść z katalogu, w którym został umieszczony,
dlatego najlepiej jest umieścić go w katalogu `Pliki programów`) na dysku instalacyjnym (zwykle dysk C:).
Zaleca się również dodanie ścieżki (np. `C:\Program Files\NSSM`) do zmiennej ścieżki.

### Czy NSSM jest poprawnie zainstalowany
Jeśli wszystko zostało wykonane poprawnie, folder `C:\Program Files\NSSM` (w tym przykładzie używam dysku C:, 
ale można użyć dowolnego dysku, na którym zainstalowano system Windows, lub dowolnej ścieżki) powinien
zawierać tylko plik `nssm.exe`.

W tym przykładzie użyjemy `C:\Program Files\NSSM`.

Otwórz wiersz polecenia i uruchom `nssm`. Jeśli pojawi się strona pomocy, możesz przejść do następnego kroku.

### Uruchom hbbr i hbbs
Pobierz wersję [serwera RustDeska](https://github.com/rustdesk/rustdesk-server/releases) dla systemu Windows.
Rozpakuj program do katalogu `C:\Program Files\RustDesk Server` (lub dowolnego innego miejsca, ale upewnij się, że
nie ulegnie ono zmianie po zainstalowaniu usługi). Teraz wróć do wiersza poleceń.

W tym przykładzie będziemy używać `C:\Program Files\RustDesk Server`.
```cmd
nssm install „RustDesk hbbs service” „C:\Program Files\RustDesk Server\hbbs.exe”
nssm install „RustDesk hbbr service” „C:\Program Files\RustDesk Server\hbbr.exe”
```
**Uwaga:**
- Możesz zmienić nazwę `RustDesk hbbs service` na dowolną nazwę usługi hbbs.
- Możesz zmienić nazwę `RustDesk hbbr service` na dowolną nazwę usługi hbbr.
- Możesz zmienić `C:\Program Files\RustDesk Server\hbbs.exe` na lokalizację, w której umieściłeś pliki binarne RustDeska.
- Możesz zmienić `C:\Program Files\RustDesk Server\hbbr.exe` na lokalizację, w której umieściłeś pliki binarne RustDeska.

**Szablony poleceń:**

Szablon polecenia, który można skopiować, wkleić i edytować.

```cmd
nssm install <Pożądana nazwa usługi hbbs> <Ścieżka do plików binarnych RustDesk hbbs> <Argumenty RustDesk hbbs>
nssm install <Pożądana nazwa usługi hbbr> <Ścieżka do plików binarnych RustDesk hbbr> <Argumenty RustDesk hbbr>
```

**Uruchom usługi**

Po pomyślnym zainstalowaniu usług należy je uruchomić.
```cmd
nssm start <Nazwa żądanej usługi hbbs>
nssm start <Nazwa żądanej usługi hbbr>
```

**Gotowe!**

(Powyższa metoda została przetestowana w systemie Windows Server Core 2022 Standard).

## lub

## Instalacja za pomocą PM2

### Zainstaluj Node.js

[Pobierz](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) i zainstaluj Node.js.
Node.js jest środowiskiem uruchomieniowym PM2, więc najpierw należy zainstalować Node.js.

### Zainstaluj PM2

Wpisz poniższe polecenia w `cmd.exe`, naciśnij klawisz <kbd>Enter</kbd> po każdym wierszu i uruchom je po kolei.

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Uruchom hbbr i hbbs

Pobierz wersję [serwera RustDeska](https://github.com/rustdesk/rustdesk-server/releases) dla systemu Windows. Rozpakuj program na dysk C:. Uruchom następujące cztery polecenia:

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe
pm2 start hbbr.exe
pm2 save
```

### Wyświetl logi

```cmd
pm2 log hbbr
pm2 log hbbs
```

## Alternatywne poradniki
https://pedja.supurovic.net/setting-up-self-hosted-rustdesk-server-on-windows/?lang=lat
