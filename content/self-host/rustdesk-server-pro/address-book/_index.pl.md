---
title: Książka adresowa
weight: 201
description: "Użyj książki adresowej w RustDesk Server Pro, aby zapisywać zdalne urządzenia, udostępniać listy urządzeń, organizować urządzenia za pomocą tagów i łączyć się z klienta RustDesk przy użyciu udostępnionych haseł."
keywords: ["rustdesk address book", "rustdesk server pro address book", "rustdesk shared address book", "rustdesk device tags", "rustdesk shared password"]
---

Książka adresowa pozwala użytkownikom zapisywać ID urządzeń RustDesk, organizować je za pomocą tagów, udostępniać listy urządzeń i łączyć się z klienta RustDesk przy użyciu zapisanych haseł.

## Szybkie odpowiedzi

- **Moja książka adresowa** jest prywatna dla zalogowanego użytkownika. Zapamiętane, ręcznie wprowadzone hasła są zapisywane w sekcji **Moja książka adresowa** i mogą być synchronizowane między urządzeniami użytkownika.
- **Udostępnione** książki adresowe można udostępniać określonym użytkownikom, grupom użytkowników lub wszystkim użytkownikom.
- Udostępniona książka adresowa może przechowywać hasło na poziomie książki adresowej, a każdy wpis urządzenia może przechowywać hasło na poziomie urządzenia. Gdy hasło na poziomie urządzenia nie jest ustawione, używane jest hasło na poziomie książki adresowej.
- Tagów można używać do filtrowania urządzeń w konsoli webowej i w kliencie RustDesk.

## Połączenie jednym kliknięciem z udostępnioną książką adresową

Użyj udostępnionej książki adresowej, gdy użytkownicy muszą łączyć się bez ręcznego wpisywania zdalnego hasła za każdym razem.

1. Utwórz lub otwórz udostępnioną książkę adresową. Opcjonalnie ustaw **hasło na poziomie książki adresowej** dla tej książki.

2. Kliknij nazwę książki adresowej, aby otworzyć stronę urządzeń. Kliknij **Importuj**, wybierz urządzenia do zaimportowania do książki adresowej, a następnie kliknij **Zapisz** na dole, aby zapisać wybrane urządzenia. Możesz też kliknąć **Dodaj**, aby dodać urządzenie według ID, używając adresu IP jako ID dla bezpośredniego dostępu IP. Opcjonalnie ustaw **hasło na poziomie urządzenia** dla poszczególnych wpisów urządzeń.

3. Udostępnij książkę adresową określonym użytkownikom, grupom użytkowników lub wszystkim użytkownikom.

4. Użytkownik loguje się do klienta RustDesk i otwiera kartę **Książka adresowa**.

5. Użytkownik wybiera udostępnioną książkę adresową i klika kartę urządzenia.

![Kliknięcie karty urządzenia z udostępnionej książki adresowej w kliencie](/docs/en/self-host/rustdesk-server-pro/address-book/images/click-peer-card.png)

{{% notice warning %}}
Udostępnione hasło jest używane tylko podczas łączenia z odpowiedniej udostępnionej książki adresowej, przez kliknięcie karty urządzenia albo użycie jej menu rozwijanego. Nie jest używane z innej karty urządzenia, przycisku **Połącz** obok pola ID ani z innej udostępnionej książki adresowej.
{{% /notice %}}

## Uprawnienia udostępnionej książki adresowej

| Uprawnienie | Co mogą robić użytkownicy |
| --- | --- |
| **Tylko do odczytu** | Mogą wyświetlać urządzenia i tagi oraz używać hasła. |
| **Odczyt/Zapis** | Mogą edytować urządzenia i tagi. |
| **Pełna kontrola** | Mogą ponownie udostępniać, usuwać lub zmieniać nazwę książki adresowej. |

Gdy wiele reguł pasuje do tego samego użytkownika, priorytet jest następujący:

1. Użytkownik
2. Grupa
3. Wszyscy

Na przykład, jeśli **Wszyscy** mają uprawnienie Tylko do odczytu, ale określony użytkownik ma Pełną kontrolę, ten użytkownik otrzyma uprawnienie Pełna kontrola.

![Uprawnienia udostępniania książki adresowej](/docs/en/self-host/rustdesk-server-pro/address-book/images/share-list.png)

![Uprawnienie udostępnionej książki adresowej w konsoli webowej](/docs/en/self-host/rustdesk-server-pro/address-book/images/user1-permission.png)

## Konsola webowa

### Tworzenie lub edycja udostępnionej książki adresowej

W **Książka adresowa > Udostępnione** utwórz udostępnioną książkę adresową z nazwą, opcjonalną notatką i opcjonalnym **domyślnym udostępnionym hasłem**. Jest to hasło na poziomie książki adresowej.

![Tworzenie udostępnionej książki adresowej z domyślnym udostępnionym hasłem](/docs/en/self-host/rustdesk-server-pro/address-book/images/create-shared-address-book.png)

### Dodawanie urządzeń i haseł

Urządzenia można dodać ręcznie według ID lub zaimportować z listy urządzeń Server Pro. Dla każdego wpisu możesz ustawić alias, tagi, notatkę oraz, w przypadku udostępnionych książek adresowych, hasło na poziomie urządzenia.

![Dodawanie urządzenia do udostępnionej książki adresowej](/docs/en/self-host/rustdesk-server-pro/address-book/images/import-device.png)

![Urządzenia](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-addressbook-devices.png)

![Edycja urządzenia w udostępnionej książce adresowej](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-edit-device.png)

### Tagi i filtrowanie

Tagi organizują i filtrują urządzenia. `Bez tagu` filtruje urządzenia bez tagów. Gdy **Filtruj według przecięcia** jest włączone, wyświetlane są tylko urządzenia pasujące do wszystkich wybranych tagów.

### Kosz

Usunięcie urządzenia z książki adresowej przenosi wpis do kosza tej książki adresowej. Nie usuwa urządzenia z RustDesk Server Pro.

## Zachowanie udostępnionego hasła

| Poziom hasła | Priorytet |
| --- | --- |
| Hasło na poziomie urządzenia | Używane jako pierwsze, gdy wpis urządzenia ma hasło. |
| Hasło na poziomie książki adresowej | Używane, gdy wpis urządzenia nie ma hasła. |

Jeśli żadne hasło nie jest ustawione, użytkownik łączy się normalnie i może być konieczne ręczne wpisanie hasła. W konsoli webowej kolumny haseł pokazują tylko, czy hasło jest ustawione.

## Klient RustDesk

Po zalogowaniu użyj selektora książki adresowej, aby przełączać się między **Moją książką adresową** a udostępnionymi książkami adresowymi. Dla udostępnionych książek adresowych klient pokazuje uprawnienie bieżącego użytkownika.

![Selektor książki adresowej klienta RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-selector.png)

![Książka adresowa tylko do odczytu](/docs/en/self-host/rustdesk-server-pro/address-book/images/read-only-address-book.png)

### Edycja z klienta

Użytkownicy z uprawnieniem zapisu mogą dodawać ID, dodawać tagi, edytować aliasy, edytować tagi, edytować notatki, ustawiać udostępnione hasła lub usuwać wpisy.

![Menu urządzenia książki adresowej 1 w kliencie RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu1.png)

![Dodawanie ID w kliencie RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-add-id.png)

![Menu urządzenia książki adresowej 2 w kliencie RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu2.png)

![Zmiana hasła w kliencie RustDesk](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-change-password.png)

## Ustawienia wstępne wdrożenia

Konfiguracja klienta RustDesk może wstępnie ustawić przypisanie książki adresowej:

- `preset-address-book-name`
- `preset-address-book-tag`
- `preset-address-book-alias`
- `preset-address-book-password`
- `preset-address-book-note`

`preset-address-book-alias`, `preset-address-book-password` i `preset-address-book-note` wymagają klienta RustDesk 1.4.3 lub nowszego oraz RustDesk Server Pro 1.6.6 lub nowszego.

Więcej szczegółów znajdziesz w [zaawansowanej konfiguracji klienta](/docs/en/self-host/client-configuration/advanced-settings/#preset-address-book-name--preset-address-book-tag--preset-address-book-alias--preset-address-book-password--preset-address-book-note).

## Powiązane ustawienia

| Ustawienie | Gdzie | Efekt |
| --- | --- | --- |
| **Zezwalaj użytkownikom niebędącym administratorami na udostępnianie książek adresowych innym grupom** | **Ustawienia > Inne** | Pozwala użytkownikom bez uprawnień administratora udostępniać książki adresowe innym grupom użytkowników. |
| **Wyłącz książkę adresową** | **Klient niestandardowy** | Ukrywa lub wyłącza książkę adresową w wygenerowanym kliencie niestandardowym. |

## Rozwiązywanie problemów

### Nieprawidłowe hasło

Hasło zapisane w udostępnionej książce adresowej jest używane przez kontrolującego klienta RustDesk. Nie jest ustawiane na kontrolowanym urządzeniu. Ustaw hasło kontrolowanego urządzenia na tym urządzeniu w **Ustawienia > Bezpieczeństwo > Hasło**.

Aby użyć udostępnionego hasła, połącz się z odpowiedniej udostępnionej książki adresowej, klikając kartę urządzenia. Połączenie z innej książki adresowej, innej karty urządzenia lub przez przycisk **Połącz** obok pola ID nie używa udostępnionego hasła tej książki adresowej.
