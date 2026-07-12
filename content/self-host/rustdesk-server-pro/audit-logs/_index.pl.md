---
title: Logi audytu
weight: 19
description: "Użyj logów audytu w konsoli web RustDesk Server Pro, aby przeglądać zdarzenia połączeń, transferu plików, operacji konsoli i alarmów."
keywords: ["rustdesk audit logs", "rustdesk server pro logs", "rustdesk connection logs", "rustdesk file transfer logs", "rustdesk alarm logs", "rustdesk console audit"]
---

Logi audytu w konsoli web RustDesk Server Pro pomagają administratorom przeglądać aktywność zdalnego dostępu, transfery plików, zmiany administracyjne i alarmy bezpieczeństwa.

Otwórz konsolę web, a następnie przejdź do **Logi** w menu po lewej. Sekcja Logi obejmuje:

- **Połączenie**
- **Plik**
- **Konsola**
- **Alarm**

## Logi połączeń

Przejdź do **Logi > Połączenie**, aby przeglądać sesje zdalne i powiązane typy połączeń.

Logi połączeń pokazują:

- **Typ**: Zdalny pulpit, Transfer plików, Przekierowanie portów, Podgląd kamery, Terminal albo Niezalogowany. **Niezalogowany** oznacza, że połączenie nie zostało ukończone albo uwierzytelnianie się nie powiodło.
- **Urządzenie kontrolowane**: ID i nazwę urządzenia docelowego.
- **Strona kontrolująca**: użytkownika kontrolującego, gdy strona kontrolująca jest zalogowana, oraz urządzenie kontrolujące, nazwę urządzenia i adres IP.
- **Czas rozpoczęcia**, **Czas zakończenia** i **Czas trwania**.
- **Uwierzytelnianie**: podstawową metodę uwierzytelniania, opcjonalnie z informacją 2FA.
- **Notatka**.

![Strona logów połączeń](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/connection-log-page.png)

Obsługiwane podstawowe wartości uwierzytelniania:

- Potwierdzenie kliknięciem
- Hasło jednorazowe
- Hasło stałe
- Przełącz strony

Obsługiwane wartości 2FA:

- Kod 2FA
- Zaufane urządzenie

### Notatki połączeń

Strona kontrolująca może dodać notatkę do połączenia na dwa sposoby:

- Podczas sesji zdalnej użyj akcji **Notatka** w menu zdalnym, aby dodać lub zaktualizować notatkę połączenia.

![Pole notatki połączenia](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/note-box.png)

- Na końcu sesji zdalnej włącz **Ustawienia > Ogólne > Inne > Pytaj o notatkę na końcu połączenia** po stronie kontrolującej, jeśli RustDesk ma poprosić o notatkę po zakończeniu sesji.

![Pole notatki przy końcu połączenia](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/close-conn-note-box.png)

Notatka jest widoczna w kolumnie **Notatka** w **Logi > Połączenie**. Użytkownicy, którzy mogą wyświetlać log połączenia, mogą też użyć przycisku edycji w kolumnie **Notatka**, aby zaktualizować ją z konsoli web.

### Rozłącz aktywne połączenie

Jeśli połączenie nadal trwa, a konto ma uprawnienie do edycji tego elementu audytu, kolumna **Akcja** pokazuje **Rozłącz**. Kliknij i potwierdź operację, aby zakończyć aktywne połączenie.

![Potwierdzenie rozłączenia](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnect-confirm.png)

Po rozłączeniu połączenia z konsoli web strona kontrolująca widzi komunikat, że połączenie zostało rozłączone z konsoli web.

![Komunikat o rozłączeniu przez konsolę](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnected-by-console.png)

## Logi transferu plików

Przejdź do **Logi > Plik**, aby przeglądać aktywność transferu plików.

![Strona logów transferu plików](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-logs.png)

Logi transferu plików obejmują operacje na plikach z dedykowanych sesji **Transfer plików** oraz kopiowanie/wklejanie plików podczas sesji **Zdalny pulpit**.

Logi transferu plików pokazują:

- **Urządzenie kontrolowane**.
- **Strona kontrolująca**: urządzenie kontrolujące oraz użytkownika kontrolującego, gdy jest dostępny.
- **Czas**.
- **Kierunek**:
  - Urządzenie kontrolowane -> Strona kontrolująca
  - Strona kontrolująca -> Urządzenie kontrolowane
- **Plik**: ścieżkę na urządzeniu kontrolowanym.
- **Szczegóły**: rozmiar pojedynczego pliku albo liczbę plików przy transferach wielu plików.

Przy transferach wielu plików kliknij liczbę plików w kolumnie **Szczegóły**, aby otworzyć panel szczegółów. Gdy transfer zawiera więcej plików niż panel może wyświetlić, panel pokazuje 10 największych plików według rozmiaru.

![Szczegóły transferu plików](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-details.png)

## Logi alarmów

Przejdź do **Logi > Alarm**, aby przeglądać zdarzenia związane z bezpieczeństwem.

![Strona logów alarmów](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/alarm-logs.png)

Logi alarmów pokazują:

- **Typ**.
- **Od**: dla alarmów konta logowania jest to urządzenie logowania. Dla alarmów połączenia zdalnego jest to strona kontrolująca.
- **Cel**: dla alarmów konta logowania jest to konto logowania. Dla alarmów połączenia zdalnego jest to urządzenie kontrolowane.
- **Czas zdarzenia**.

Typy alarmów połączeń zdalnych:

- Próba dostępu spoza białej listy IP
- Ponad 30 kolejnych prób dostępu
- Wiele prób dostępu w ciągu jednej minuty
- Zbyt wiele kolejnych prób dostępu z jednego prefiksu IPv6
- Wiele nieudanych prób logowania w Terminalu (Uruchom jako administrator) (błędna nazwa użytkownika/hasło)
- Wiele jednoczesnych prób logowania w Terminalu (Uruchom jako administrator)
- Naruszenie zakresu sesji

Typy alarmów konta logowania:

- Ponad 30 kolejnych prób logowania
- Wiele prób logowania w ciągu jednej minuty
- Wiele prób logowania w ciągu jednej godziny

## Logi operacji konsoli

Przejdź do **Logi > Konsola**, aby przeglądać akcje wykonane w konsoli web.

![Strona logów operacji konsoli](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/console-logs.png)

Logi konsoli pokazują:

- **Typ**.
- **Użytkownik**: użytkownik konsoli web, który wykonał operację.
- **Operacja**: konkretna akcja.
- **Czas**.
- **Szczegóły**: dodatkowe pola zapisane dla operacji.

Typy obejmują:

- Zarządzanie grupami
- Zarządzanie użytkownikami
- Zarządzanie urządzeniami
- Zarządzanie książką adresową
- Zarządzanie rolami administratora
- Zarządzanie rolami kontroli

Śledzone operacje obejmują logowanie użytkownika, zmiany użytkowników i urządzeń, rozłączenie urządzenia, zmiany książki adresowej, zmiany 2FA, reset hasła, zmiany ról administratora/kontroli i inne.

## Widoczność i retencja logów

Widoczność logów zależy od tego, czy użytkownik jest administratorem, czy ma [Rolę Administratora](/docs/pl/self-host/rustdesk-server-pro/admin-role/) z uprawnieniami do logów audytu oraz od ustawienia w **Ustawienia > Inne**.

| Typ użytkownika lub ustawienie | Widoczność logów |
| --- | --- |
| Administrator | Może wyświetlać wszystkie logi audytu. |
| Rola Administratora z **Global > Audit Logs-View** | Może wyświetlać wszystkie logi audytu, nawet gdy włączone jest **Tylko administrator może uzyskać dostęp do logów**. |
| Rola Administratora z **Individual > Audit Logs-View** | Może wyświetlać osobiste logi audytu, nawet gdy włączone jest **Tylko administrator może uzyskać dostęp do logów**. Daje to ten sam zakres osobistych logów co zwykłemu użytkownikowi niebędącemu administratorem, ale nie jest blokowane przez to ustawienie. |
| Użytkownik niebędący administratorem bez uprawnień do logów audytu | Może wyświetlać osobiste logi audytu tylko wtedy, gdy **Tylko administrator może uzyskać dostęp do logów** jest wyłączone. |
| Włączone **Ustawienia > Inne > Tylko administrator może uzyskać dostęp do logów** | Użytkownicy niebędący administratorami bez uprawnień do logów audytu nie mogą uzyskać dostępu do logów audytu. |

Logi osobiste obejmują rekordy połączeń i transferów plików, w których urządzenie aktualnie przypisane do użytkownika jest urządzeniem kontrolowanym lub kontrolującym, oraz rekordy, w których użytkownik jest kontrolerem. Dla logów alarmów osobiste logi obejmują rekordy urządzeń przypisanych do użytkownika lub konto logowania użytkownika. Dla logów operacji konsoli osobiste logi obejmują rekordy, w których użytkownik jest operatorem.

Użyj **Ustawienia > Inne > Retencja logów (dni)**, aby określić, jak długo logi audytu mają być przechowywane. Wpisz `0`, aby przechowywać wszystkie logi bezterminowo. Wpisz liczbę większą niż `0`, aby automatycznie usuwać logi starsze niż wskazana liczba dni. Czyszczenie uruchamia się raz na godzinę.

## Eksport logów audytu

Każda strona logów ma na pasku narzędzi **Eksportuj jako CSV**. Eksportowany plik używa aktualnych filtrów na stronie i tych samych wartości czasu, które są pokazane w konsoli web. Każdy eksport zawiera do 1000 rekordów, ale możesz użyć filtra **Czas rozpoczęcia**, aby eksportować wszystkie logi partiami.
