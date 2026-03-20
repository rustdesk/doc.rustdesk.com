---
title: Mac
weight: 3
description: "Dokumentacja RustDesk dotycząca Mac. Zawiera instrukcje instalacji, konfiguracji, wdrażania i rozwiązywania problemów."
keywords: ["rustdesk mac", "rustdesk macos", "rustdesk mac install", "rustdesk screen recording permission", "rustdesk accessibility permission", "rustdesk mac remote control"]
---

## Czego RustDesk potrzebuje na macOS?

Na macOS samo zainstalowanie aplikacji nie wystarczy. Aby poprawnie sterować innym Makiem, zwykle trzeba przenieść RustDesk do `Applications`, zezwolić na uruchomienie oraz nadać uprawnienia `Accessibility`, `Screen Recording`, a czasem także `Input Monitoring`.

## Szybkie odpowiedzi dla macOS

- Zainstaluj RustDesk z `.dmg` do `Applications`.
- Jeśli Gatekeeper blokuje aplikację, zezwól na nią w ustawieniach bezpieczeństwa macOS.
- Nadaj `Accessibility` i `Screen Recording` do zdalnego sterowania.
- Jeśli klawiatura lub mysz nadal nie działają, nadaj również `Input Monitoring`.
- Jeśli reset uprawnień nie pomaga, uruchom Mac ponownie.

## Które uprawnienia macOS są ważne?

| Uprawnienie | Do czego służy |
| --- | --- |
| Accessibility | Pozwala RustDesk sterować klawiaturą i myszą |
| Screen Recording | Pozwala RustDesk przechwytywać lokalny ekran |
| Input Monitoring | Potrzebne w nowszych wersjach macOS, gdy lokalne przechwytywanie wejścia nadal zawodzi |

## Instalacja

Otwórz plik .dmg i przeciągnij `RustDesk` do `Aplikacje` jak poniżej.

![](/docs/en/client/mac/images/dmg.png)

Upewnij się, że zamknąłeś wszystkie uruchomione instancje RustDeska. Dodatkowo bądź pewien, że wyłączyłeś usługę RustDeska (widoczną na pasku zadań).

![](/docs/en/client/mac/images/tray.png)

## Zezwól na uruchomienie RustDesk

| Odblokuj aby zmienić | Kliknij na `App Store i zidentyfikowani deweloperzy` |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

## Włącz uprawnienia

{{% notice note %}}
Ze względu na zmiany w polityce bezpieczeństwa macOSa nasze API, które przechwytuje dane wejściowe po stronie
lokalnej przestało działać. Musisz włączyć uprawnienie "Monitorowanie wejścia" po lokalnej stronie.
Proszę postępować zgodnie z poniższymi instrukcjami.
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

W wersji 1.2.4, możesz wypróbować `Źródło wejścia 2`, które można wybrać po kliknięciu na ikonę klawiatury na pasku narzędzi.
{{% /notice %}}

Aby przechwytywać ekran musisz zezwolić RustDeskowi na uprawnienia **Dostępność** i **Nagrywanie ekranu**. RustDesk poprowadzi cię do okna ustawień.

| Okno RustDesk | Okno ustawień |
| --- | --- |
| ![](/docs/en/client/mac/images/acc.png) | ![](/docs/en/client/mac/images/acc3.png?v2) |

Jeżeli już na nie zezwoliłeś, ale RustDesk dalej wyświetla ostrzeżenia: spróbuj usunąć `RustDesk` z okien ustawień używając przycisku `-` i kliknij na przycisk `+`, zaznacz `RustDesk` w `Aplikacje`.

<!-- Translation note: "Inne bezskuteczne próby" ????? -->

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
Inne bezskuteczne próby: <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
Nadal wymagane jest ponowne uruchomienie systemu.
{{% /notice %}}

| Przyciski `-` i `+` | Zaznacz `RustDesk` |
| --- | --- |
| ![](/docs/en/client/mac/images/acc2.png) | ![](/docs/en/client/mac/images/add.png?v2) |

Powtórz powyższe czynności dla uprawnienia **Nagrywanie ekranu**.

![](/docs/en/client/mac/images/screen.png?v2)
