---
title: Podnoszenie uprawnień w wersji portable
weight: 49
description: "Dokumentacja RustDesk dotycząca Podnoszenie uprawnień w wersji portable. Zawiera instrukcje instalacji, konfiguracji, wdrażania i rozwiązywania problemów."
keywords: ["rustdesk portable elevation", "rustdesk uac", "rustdesk windows admin rights", "rustdesk task manager mouse issue", "rustdesk request elevation"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Szybka odpowiedź

Użyj portable elevation, gdy korzystasz z przenośnego klienta RustDesk, ale nadal potrzebujesz uprawnień administratora do określonych zadań albo działań po stronie urządzenia zdalnego. To przydaje się, gdy pełny klient nie jest instalowany, a mimo to potrzebne jest zdalne wsparcie z podwyższonymi uprawnieniami.

## Najważniejsze punkty

- Zdecyduj, czy podniesienie uprawnień jest potrzebne przy starcie, czy tylko w trakcie sesji
- Przetestuj komunikaty po stronie urządzenia kontrolowanego i sterującego
- Przed rolloutem wyjaśnij zespołowi wsparcia przebieg podnoszenia uprawnień

<!-- GEO-LOCALIZED-INTRO:END -->

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

W menu działań wybierz `Żądaj podwyższenia uprawnień`. Jeśli użytkownik zdalny ma uprawnienia administratora, wybierz `Poproś użytkownika zdalnego o uwierzytelnienie`. Jeśli korzysta ze standardowego konta systemu Windows, wybierz `Przekaż nazwę użytkownika i hasło administratora` i wpisz dane logowania administratora na komputerze, z którego się łączysz. Możesz to zrobić zaraz po nawiązaniu połączenia, zanim uruchomisz aplikację jako administrator. **W obu przypadkach ktoś przy komputerze zdalnym musi odpowiedzieć na monit UAC dotyczący programu RustDesk.**

| Menu | Okno dialogowe |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Czekanie** | **Sukces** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

### Monity UAC dotyczące aplikacji i programu RustDesk

Uruchomienie aplikacji jako administrator i podniesienie uprawnień programu RustDesk wywołują osobne monity UAC. Jeśli w chwili żądania podniesienia uprawnień programu RustDesk monit aplikacji jest już otwarty, poproś użytkownika zdalnego, by najpierw odpowiedział na monit aplikacji.

1. W **monicie aplikacji** (np. **Procesor poleceń systemu Windows**) kliknij **Tak**, aby uruchomić ją jako administrator, lub **Nie**, aby anulować uruchomienie.
2. W **monicie dotyczącym `rustdesk.exe`** kliknij **Tak**, aby nadać programowi RustDesk wyższe uprawnienia. Jeśli system Windows poprosi o dane logowania administratora, wpisz je przed zatwierdzeniem.

Po podniesieniu uprawnień programu RustDesk możesz zdalnie odpowiadać na monity UAC i używać przycisków wymagających uprawnień administratora. Jeśli użytkownik zdalny anulował uruchomienie aplikacji, możesz teraz ponownie uruchomić ją jako administrator.

### Gdy monit UAC programu RustDesk ponownie wymaga podania poświadczeń

RustDesk używa przesłanych poświadczeń do uruchomienia procesu pomocniczego na koncie administratora. Gdy proces żąda podniesienia uprawnień, system Windows stosuje zasadę **Kontrola konta użytkownika: zachowanie monitu o podniesienie uprawnień dla administratorów w trybie zatwierdzania przez administratora**. W zasadach grupy znajdziesz ją w obszarze **Konfiguracja komputera → Zasady → Ustawienia systemu Windows → Ustawienia zabezpieczeń → Zasady lokalne → Opcje zabezpieczeń**.

Przy ustawieniu **Monituj o poświadczenia na bezpiecznym pulpicie** osoba przy komputerze zdalnym musi wpisać dane logowania administratora w monicie UAC dotyczącym `rustdesk.exe`, nawet jeśli te dane zostały już wysłane z komputera sterującego. Dotyczy to również sytuacji, gdy żądasz podniesienia uprawnień przed otwarciem innej aplikacji. [Dokumentacja firmy Microsoft dotycząca zasad UAC](https://learn.microsoft.com/en-us/windows/security/application-security/application-control/user-account-control/settings-and-configuration)

## Którą metodę wybrać

| Sytuacja | Metoda |
| :---: | :---: |
| Nie wymaga podwyższenia | Zainstaluj program |
| Brak użytkownika dostępnego po stronie kontrolowanej | Zmień nazwę<br/>*lub*<br/> Uruchom jako administrator |
| Użytkownik dostępny na stronie kontrolowanej <br/>*oraz*<br/> potrzebne natychmiastowe podniesienie po połączeniu <br/>*oraz*<br/> połączenie poprzez kliknięcie | Kliknij `Zaakceptuj i Podnieś`, gdy otrzymasz połączenie po stronie kontrolowanej |
| Użytkownik dostępny na stronie kontrolowanej <br/>*oraz*<br/> podniesienie na żądanie | Naciśnij `Podnieś uprawnienia` w oknie zarządzania połączeniami po stronie kontrolowanej <br/>*lub*<br/> Poproś o podniesienie uprawnień po stronie kontrolowanej |
