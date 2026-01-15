---
title: Podnoszenie uprawnień w wersji portable
weight: 49
---

Windows portable programs do not have administrator privileges, which can lead to the following issues:

Programy przenośne nie mają uprawnień administratora w systemie Windows, co może prowadzić do następujących problemów:

- Ekran nie może być przesyłany, gdy pojawia się okno UAC (Kontrola konta użytkownika).
- Gdy pojawia się wyskakujące okno, takie jak Menedżer zadań, mysz przestaje reagować.

Poprzez podwyższenie uprawnień RustDesk może utworzyć proces z uprawnieniami administratora podczas uruchamiania lub sesji, umożliwiając mu wykonywanie zrzutów ekranu i operacji myszą, co pozwala uniknąć powyższych problemów.

## Podniesienie podczas uruchomienia

W ten sposób użytkownicy zdalni nie muszą prosić o podwyższenie uprawnień podczas łączenia się. Istnieją dwie metody:

* Metoda 1: Zmień nazwę programu przenośnego, dodając do niej `-qs-` lub `-qs.exe` lub `_qs.exe` (>= 1.4.6), lub kończącą się na `qs.exe` (1.2.0 ~ 1.4.5). Kliknij lewym przyciskiem myszy, aby uruchomić program, a następnie kliknij `Akceptuj` w oknie UAC.

* Metoda 2: Kliknij prawym przyciskiem myszy i uruchom jako administrator.

## Podniesienie po stronie kontrolowanej

Kontrolująca strona może bezpośrednio kliknąć `Akceptuj i podnieś uprawnienia` podczas łączenia się lub kliknąć `Podnieś uprawnienia`, gdy połączenie już zostało nawiązane.

| Łączenie | Połączony |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## Żądanie podwyższenia na końcu sterowania

Po wybraniu opcji `Żądaj podwyższenia uprawnień` z menu akcji pojawi się następujące okno dialogowe. Jeśli wybierzesz opcję `Poproś użytkownika zdalnego o uwierzytelnienie`, nie będziesz musiał wprowadzać nazwy użytkownika i hasła, ale użytkownik komputera zdalnego musi mieć uprawnienia administratora. Jeśli wybierzesz opcję `Przekaż nazwę użytkownika i hasło administratora`, użytkownik komputera zdalnego musi jedynie zaakceptować okno UAC. Po wysłaniu żądania należy poczekać, aż użytkownik po drugiej stronie zaakceptuje okno UAC. Po potwierdzeniu pojawi się komunikat o pomyślnym zakończeniu operacji. Należy pamiętać, że **obie metody wymagają, aby ktoś po stronie kontrolowanej zaakceptował okno UAC**. Dlatego też, jeśli po drugiej stronie nie ma nikogo dostępnego, nie należy żądać podwyższenia uprawnień po stronie kontrolującej.

| Menu | Okno dialogowe |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Czekanie** | **Sukces** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

## Którą metodę wybrać

| Sytuacja | Metoda |
| :---: | :---: |
| Nie wymaga podwyższenia | Zainstaluj program |
| Brak użytkownika dostępnego po stronie kontrolowanej | Zmień nazwę<br/>*lub*<br/> Uruchom jako administrator |
| Użytkownik dostępny na stronie kontrolowanej <br/>*oraz*<br/> potrzebne natychmiastowe podniesienie po połączeniu <br/>*oraz*<br/> połączenie poprzez kliknięcie | Kliknij `Zaakceptuj i Podnieś`, gdy otrzymasz połączenie po stronie kontrolowanej |
| Użytkownik dostępny na stronie kontrolowanej <br/>*oraz*<br/> podniesienie na żądanie | Naciśnij `Podnieś uprawnienia` w oknie zarządzania połączeniami po stronie kontrolowanej <br/>*lub*<br/> Poproś o podniesienie uprawnień po stronie kontrolowanej |
