---
title: Konsola webowa
weight: 10
---

Konsola webowa jest zintegrowana z serwerem RustDeska Pro i obsługiwana przez port `21114`.

Funkcje:

- Przeglądanie urządzeń
- Dodawanie/modyfikowanie użytkowników i grup użytkowników
- Modyfikowanie uprawnień dostępu do urządzeń
- Przeglądanie dzienników połączeń urządzeń i innych dzienników
- Aktualizowanie ustawień
- Zarządzanie strategiami synchronizacji ustawień klienta
- Zarządzanie współdzielonymi książkami adresowymi
- Generowanie niestandardowej kompilacji klienta

## Logowanie

Domyślny port konsoli webowej to 21114. Wpisz `http://<adres IP serwera>:21114` w przeglądarce, aby przejść do strony konsoli, jak pokazano na poniższym rysunku. Domyślna nazwa użytkownika/hasło administratora to `admin`/`test1234`:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Jeśli potrzebujesz obsługi protokołu HTTPS, zainstaluj serwer internetowy, taki jak `Nginx`, lub użyj `IIS` dla systemu Windows.

Po zalogowaniu się pamiętaj, aby zmienić hasło. Wybierz `Ustawienia` w menu konta w prawym górnym rogu, aby przejść do strony zmiany hasła, jak pokazano na poniższym rysunku. Możesz również utworzyć inne konto administratora i usunąć domyślne. Zaleca się włączenie emailowej weryfikacji logowania.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Użytkownicy niebędący administratorami mogą również zalogować się, aby przeglądać swoje urządzenia i logi oraz zmieniać ustawienia użytkownika.

## Automatyczne konfiguracje 

Klikając na `Windows EXE`, uzyskasz konfiguracje dla swojego serwera RustDeska Pro, co pomoże Ci skonfigurować klientów.

W przypadku klientów Windows możesz pominąć niestandardową konfigurację serwera i umieścić informacje konfiguracyjne w pliku `rustdesk.exe`. Jak pokazano powyżej, przejdź do strony powitalnej konsoli i kliknij na `Windows EXE`. **Wymagana wersja klienta ≥ 1.1.9.**

Możesz użyć tego w połączeniu z [konfiguracją klienta](https://rustdesk.com/docs/pl/self-host/client-configuration/) i [skryptami wdrożeniowymi](https://rustdesk.com/docs/pl/self-host/client-deployment/), aby skonfigurować swoich klientów.

## Tworzenie nowego użytkownika innego niż domyślny użytkownik `admin`

{{% notice note %}}
Plan `Indywidualny` nie posiada tej funkcji.
{{% /notice %}}

1. Kliknij `Użytkownicy` w menu po lewej stronie.
2. Utwórz kolejne konto z włączoną opcją `administrator`.
3. Zaloguj się na nowe konto administracyjne.
4. Usuń `admin` na stronie `Użytkownicy`.

## Tworzenie nowego użytkownika
1. Kliknij opcję `Użytkownicy` w menu po lewej stronie.
2. Utwórz nowego użytkownika.
3. Wybierz grupę, do której ma on należeć (jeśli chcesz dodać nowe grupy, czytaj dalej).

## Dodawanie nowej grupy
1. Kliknij `Grupy` w menu po lewej stronie.
2. Utwórz nową grupę.
3. Po utworzeniu możesz zezwolić grupom na wzajemny dostęp. Kliknij `Edytuj`.
4. Wybierz odpowiednie grupy, do których chcesz uzyskać dostęp (zostaną one automatycznie dodane do odpowiedniej grupy).

## Konfigurowanie wielu serwerów przekaźnikowych
1. Przejdź do `Ustawienia` w menu po lewej stronie.
2. Kliknij `Przekaźnik` w podmenu.
3. Kliknij `+` obok `Serwery przekaźnikowe`.
4. Wprowadź adres DNS lub adres IP serwera przekaźnikowego w wyświetlonym polu i naciśnij <kbd>Enter</kbd>.
5. Jeśli masz więcej niż jeden serwer retransmisyjny, możesz kliknąć `+` i w razie potrzeby dostosować ustawienia geograficzne (zapamiętaj i skopiuj swój klucz do pozostałych serwerów).

## Ustaw lub zmień licencję
1. Przejdź do `Ustawień` w menu po lewej stronie.
2. Kliknij `Licencja` w podmenu.
3. Kliknij `Edytuj` i wklej kod licencji.
4. Kliknij `OK`.

## Wyświetlanie logów
Po lewej stronie kliknij `Logi`.

## Konfiguracja poczty e-mail
W tym przykładzie użyto Gmaila

1. Przejdź do `Ustawienia` w menu po lewej stronie.
2. Kliknij `SMTP` w podmenu.
3. Wprowadź adres SMTP `smtp.gmail.com`.
4. Wprowadź port 587 w polu `Port SMTP`.
5. Wprowadź adres konta Gmail, np. `mojserwerrustdeska@gmail.com`, w polu `Konto pocztowe`.
6. Wprowadź hasło (możesz potrzebować hasła aplikacji).
7. Wprowadź adres swojego konta Gmail, np. `mojserwerrustdeska@gmail.com`, w polu `Od`.
8. Kliknij `Sprawdź`, aby zapisać.

## Przypisywanie użytkowników/strategii/grup urządzeń do urządzeń przez konsolę webową

Użytkownik to użytkownik RustDesk zalogowany na urządzeniu lub przypisany do urządzenia poprzez kliknięcie **Edytuj** obok urządzenia, kliknięcie w pole **Użytkownik** i wybranie swojego użytkownika z rozwijanego menu.  
Możesz także przypisać wiele urządzeń do użytkownika, klikając **Więcej → Przypisz urządzenia** w **Liście użytkowników**.

Aby dodać urządzenie do grupy urządzeń, kliknij **Edytuj** obok urządzenia w **Liście urządzeń** i zmień **Grupę**, lub przejdź do listy **Grup urządzeń**, kliknij nazwę grupy i dostosuj urządzenia w tej grupie.

Aby przypisać strategię do urządzenia, najedź kursorem na prawą stronę listy **Strategii** i kliknij w menu **Edytuj urządzenia**, **Edytuj użytkowników** lub **Edytuj grupy urządzeń**, aby dodać odpowiednie urządzenia, urządzenia użytkownika lub urządzenia grupy do wybranej strategii.

---

## Token API

Najpierw przejdź do **Ustawienia → Tokeny → Utwórz** i utwórz token z wymaganymi uprawnieniami: **Urządzenie, Dziennik audytu, Użytkownik, Grupa, Strategia, Książka adresowa**.

Po utworzeniu tokeny te można używać przez **wiersz poleceń** lub **CLI w Pythonie**, aby wykonywać akcje z odpowiadającymi uprawnieniami.

### Przypisywanie za pomocą tokenu z wiersza poleceń

Można również wykonywać przypisania, używając pliku wykonywalnego RustDesk z parametrem `--assign`.  
Pozwala to na przypisywanie użytkowników, strategii, książek adresowych lub grup urządzeń do urządzenia bezpośrednio z wiersza poleceń.

**Przykład:**

    "C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>

Obsługiwane parametry

| Parametr                               | Opis                                      | RustDesk Server Pro | RustDesk Client | 
| --------------------------------------- | ---------------------------------------- | ----------------- | --------------- | 
| `--user_name <username>`                | Przypisz użytkownika do urządzenia       |                   |                 | 
| `--strategy_name <strategyname>`        | Przypisz strategię do urządzenia         |                   |                 | 
| `--address_book_name <addressbookname>` | Przypisz urządzenie do książki adresowej |                   |                 | 
| `--address_book_tag <addressbooktag>`   | Przypisz z tagiem książki adresowej      |                   |                 | 
| `--address_book_alias <alias>`          | Przypisz z aliasem książki adresowej     | 1.5.8             | 1.4.1           | 
| `--address_book_password <password>`    | Ustaw hasło dla wpisu w książce adresowej| 1.6.6             | 1.4.3           | 
| `--address_book_note <note>`            | Ustaw notatkę dla wpisu w książce adresowej | 1.6.6             | 1.4.3           | 
| `--device_group_name <devicegroupname>` | Przypisz urządzenie do grupy             |                   |                 | 
| `--note <note>`                         | Dodaj notatkę do urządzenia              | 1.6.6             | 1.4.3           | 
| `--device_username <device_username>`   | Ustaw nazwę użytkownika urządzenia       | 1.6.6             | 1.4.3           | 
| `--device_name <device_name>`           | Ustaw nazwę urządzenia                    | 1.6.6             | 1.4.3           | 

Wiersz poleceń w systemie Windows nie wyświetla domyślnie żadnego outputu. Aby go otrzymać, użyj:

    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more
    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String

zobacz [tutaj](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

### Narzędzia zarządzania Python CLI

#### Zarządzanie użytkownikami (`users.py`)

**Pokaż pomoc:**

    ./users.py -h

**Wyświetl użytkowników:**

    ./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]

**Filtry:**

    --name : nazwa użytkownika
    --group_name : grupa użytkowników

**Przykład:**

    ./users.py --url https://example.com --token <token> view --group_name admins

**Operacje:**

`view` można zastąpić `enable`, `disable` lub `delete`.

**Przykład (wyłącz użytkownika):**

    ./users.py --url https://example.com --token <token> disable --name testuser

---

#### Zarządzanie urządzeniami (`devices.py`)

**Pokaż pomoc:**

    ./devices.py -h

**Wyświetl urządzenia:**

    ./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]

**Filtry:**

    --id : ID urządzenia
    --device_name : nazwa urządzenia
    --user_name : przypisany użytkownik
    --group_name : grupa użytkowników
    --device_group_name : grupa urządzeń
    --offline_days : dni offline

**Przykład:**

    ./devices.py --url https://example.com --token <token> view --user_name mike

**Operacje:**

`view` można zastąpić `enable`, `disable`, `delete` lub `assign`.

**Przykład (przypisz urządzenie):**

    ./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike

---

#### Zarządzanie książką adresową (`ab.py`)

**Pokaż pomoc:**

    ./ab.py -h

**Wyświetl udostępnione książki adresowe:**

    ./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]

**Pobierz GUID osobistej książki adresowej:**

    ./ab.py --url <url> --token <token> get-personal-ab

**Dodaj udostępnioną książkę adresową:**

    ./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]

**Aktualizuj lub usuń udostępnioną książkę adresową:**

    ./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]
    ./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>

**Wyświetl peerów w książce adresowej:**

    ./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]

**Dodaj, zaktualizuj lub usuń peer:**

    ./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>

**Zarządzanie tagami:**

    ./ab.py --url <url> --token <token> view-tag --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]
    ./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000
    ./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>

**Zarządzanie regułami dostępu:**

    ./ab.py --url <url> --token <token> view-rule --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full
    ./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw
    ./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>

**Przykład (dodaj regułę tylko do odczytu dla użytkownika "mike"):**

    ./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro

---

#### Audyty (`audits.py`)

**Pokaż pomoc:**

    ./audits.py -h

**Wyświetl audyt połączeń:**

    ./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Wyświetl audyt plików:**

    ./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Wyświetl audyt alarmów:**

    ./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Wyświetl audyt konsoli:**

    ./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Filtry:**

    --remote : ID peer (dla audytu połączeń lub plików)
    --conn-type : 0=Pulpit zdalny, 1=Transfer plików, 2=Transfer portów, 3=Podgląd kamery, 4=Terminal
    --device : ID urządzenia (dla audytu alarmów)
    --operator : nazwa operatora (dla audytu konsoli)
    --created-at : filtr czasu lokalnego, np. "2025-09-16 14:15:57"
    --days-ago : filtruje rekordy nowsze niż podana liczba dni
    --page-size / --current : paginacja

**Przykład:**

    ./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7
## Przypisywanie użytkowników/strategii/grup urządzeń do urządzeń przez konsolę webową

Użytkownik to użytkownik RustDesk zalogowany na urządzeniu lub przypisany do urządzenia poprzez kliknięcie **Edytuj** obok urządzenia, kliknięcie w pole **Użytkownik** i wybranie swojego użytkownika z rozwijanego menu.  
Możesz także przypisać wiele urządzeń do użytkownika, klikając **Więcej → Przypisz urządzenia** w **Liście użytkowników**.

Aby dodać urządzenie do grupy urządzeń, kliknij **Edytuj** obok urządzenia w **Liście urządzeń** i zmień **Grupę**, lub przejdź do listy **Grup urządzeń**, kliknij nazwę grupy i dostosuj urządzenia w tej grupie.

Aby przypisać strategię do urządzenia, najedź kursorem na prawą stronę listy **Strategii** i kliknij w menu **Edytuj urządzenia**, **Edytuj użytkowników** lub **Edytuj grupy urządzeń**, aby dodać odpowiednie urządzenia, urządzenia użytkownika lub urządzenia grupy do wybranej strategii.

---

## Token API

Najpierw przejdź do **Ustawienia → Tokeny → Utwórz** i utwórz token z wymaganymi uprawnieniami: **Urządzenie, Dziennik audytu, Użytkownik, Grupa, Strategia, Książka adresowa**.

Po utworzeniu tokeny te można używać przez **wiersz poleceń** lub **CLI w Pythonie**, aby wykonywać akcje z odpowiadającymi uprawnieniami.

### Przypisywanie za pomocą tokenu z wiersza poleceń

Można również wykonywać przypisania, używając pliku wykonywalnego RustDesk z parametrem `--assign`.  
Pozwala to na przypisywanie użytkowników, strategii, książek adresowych lub grup urządzeń do urządzenia bezpośrednio z wiersza poleceń.

**Przykład:**

    "C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>

Obsługiwane parametry

| Parametr                               | Opis                                      | RustDesk Server Pro | RustDesk Client | 
| --------------------------------------- | ---------------------------------------- | ----------------- | --------------- | 
| `--user_name <username>`                | Przypisz użytkownika do urządzenia       |                   |                 | 
| `--strategy_name <strategyname>`        | Przypisz strategię do urządzenia         |                   |                 | 
| `--address_book_name <addressbookname>` | Przypisz urządzenie do książki adresowej |                   |                 | 
| `--address_book_tag <addressbooktag>`   | Przypisz z tagiem książki adresowej      |                   |                 | 
| `--address_book_alias <alias>`          | Przypisz z aliasem książki adresowej     | 1.5.8             | 1.4.1           | 
| `--address_book_password <password>`    | Ustaw hasło dla wpisu w książce adresowej| 1.6.6             | 1.4.3           | 
| `--address_book_note <note>`            | Ustaw notatkę dla wpisu w książce adresowej | 1.6.6             | 1.4.3           | 
| `--device_group_name <devicegroupname>` | Przypisz urządzenie do grupy             |                   |                 | 
| `--note <note>`                         | Dodaj notatkę do urządzenia              | 1.6.6             | 1.4.3           | 
| `--device_username <device_username>`   | Ustaw nazwę użytkownika urządzenia       | 1.6.6             | 1.4.3           | 
| `--device_name <device_name>`           | Ustaw nazwę urządzenia                    | 1.6.6             | 1.4.3           | 

Wiersz poleceń w systemie Windows nie wyświetla domyślnie żadnego outputu. Aby go otrzymać, użyj:

    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more
    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String

zobacz [tutaj](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

### Narzędzia zarządzania Python CLI

#### Zarządzanie użytkownikami (`users.py`)

**Pokaż pomoc:**

    ./users.py -h

**Wyświetl użytkowników:**

    ./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]

**Filtry:**

    --name : nazwa użytkownika
    --group_name : grupa użytkowników

**Przykład:**

    ./users.py --url https://example.com --token <token> view --group_name admins

**Operacje:**

`view` można zastąpić `enable`, `disable` lub `delete`.

**Przykład (wyłącz użytkownika):**

    ./users.py --url https://example.com --token <token> disable --name testuser

---

#### Zarządzanie urządzeniami (`devices.py`)

**Pokaż pomoc:**

    ./devices.py -h

**Wyświetl urządzenia:**

    ./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]

**Filtry:**

    --id : ID urządzenia
    --device_name : nazwa urządzenia
    --user_name : przypisany użytkownik
    --group_name : grupa użytkowników
    --device_group_name : grupa urządzeń
    --offline_days : dni offline

**Przykład:**

    ./devices.py --url https://example.com --token <token> view --user_name mike

**Operacje:**

`view` można zastąpić `enable`, `disable`, `delete` lub `assign`.

**Przykład (przypisz urządzenie):**

    ./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike

---

#### Zarządzanie książką adresową (`ab.py`)

**Pokaż pomoc:**

    ./ab.py -h

**Wyświetl udostępnione książki adresowe:**

    ./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]

**Pobierz GUID osobistej książki adresowej:**

    ./ab.py --url <url> --token <token> get-personal-ab

**Dodaj udostępnioną książkę adresową:**

    ./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]

**Aktualizuj lub usuń udostępnioną książkę adresową:**

    ./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]
    ./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>

**Wyświetl peerów w książce adresowej:**

    ./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]

**Dodaj, zaktualizuj lub usuń peer:**

    ./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>

**Zarządzanie tagami:**

    ./ab.py --url <url> --token <token> view-tag --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]
    ./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000
    ./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>

**Zarządzanie regułami dostępu:**

    ./ab.py --url <url> --token <token> view-rule --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full
    ./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw
    ./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>

**Przykład (dodaj regułę tylko do odczytu dla użytkownika "mike"):**

    ./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro

---

#### Audyty (`audits.py`)

**Pokaż pomoc:**

    ./audits.py -h

**Wyświetl audyt połączeń:**

    ./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Wyświetl audyt plików:**

    ./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Wyświetl audyt alarmów:**

    ./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Wyświetl audyt konsoli:**

    ./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**Filtry:**

    --remote : ID peer (dla audytu połączeń lub plików)
    --conn-type : 0=Pulpit zdalny, 1=Transfer plików, 2=Transfer portów, 3=Podgląd kamery, 4=Terminal
    --device : ID urządzenia (dla audytu alarmów)
    --operator : nazwa operatora (dla audytu konsoli)
    --created-at : filtr czasu lokalnego, np. "2025-09-16 14:15:57"
    --days-ago : filtruje rekordy nowsze niż podana liczba dni
    --page-size / --current : paginacja

**Przykład:**

    ./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7

## Wyszukiwanie urządzenia
1. Przejdź do sekcji Urządzenia.
2. W polu wyszukiwania nazwy urządzenia wpisz nazwę i kliknij `Szukaj` lub naciśnij <kbd>Enter</kbd>.
3. Aby użyć symbolu wieloznacznego, dodaj `%` na początku, na końcu lub w obu miejscach wyszukiwanego terminu.
