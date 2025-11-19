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
`./users.py -h`

**Wyświetl użytkowników:**  
`./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]`

**Filtry:**
- `--name`: nazwa użytkownika (wyszukiwanie rozmyte)
- `--group_name`: grupa użytkowników (dokładne dopasowanie)

**Przykład:**  
`./users.py --url https://example.com --token <token> view --group_name Default`

**Podstawowe operacje:**

- **Wyłącz użytkownika:**  
  `./users.py --url <url> --token <token> disable --name testuser`

- **Włącz użytkownika:**  
  `./users.py --url <url> --token <token> enable --name testuser`

- **Usuń użytkownika:**  
  `./users.py --url <url> --token <token> delete --name testuser`

**Tworzenie i zapraszanie użytkowników:**

- **Utwórz nowego użytkownika:**  
  `./users.py --url <url> --token <token> new --name username --password 'password123' --group_name Default [--email user@example.com] [--note "notatka"]`
  
  Wymagane: `--name`, `--password`, `--group_name`  
  Opcjonalne: `--email`, `--note`

- **Zaproś użytkownika przez email:**  
  `./users.py --url <url> --token <token> invite --email user@example.com --name username --group_name Default [--note "notatka"]`
  
  Wymagane: `--email`, `--name`, `--group_name`  
  Opcjonalne: `--note`

**Operacje 2FA i bezpieczeństwo:**

- **Włącz wymuszanie 2FA:**  
  `./users.py --url <url> --token <token> enable-2fa-enforce --name username --web-console-url <console_url>`
  
  Wymagane: `--web-console-url`

- **Wyłącz wymuszanie 2FA:**  
  `./users.py --url <url> --token <token> disable-2fa-enforce --name username [--web-console-url <console_url>]`
  
  Opcjonalne: `--web-console-url`

- **Zresetuj 2FA:**  
  `./users.py --url <url> --token <token> reset-2fa --name username`

- **Wyłącz weryfikację email:**  
  `./users.py --url <url> --token <token> disable-email-verification --name username`

- **Wymuś wylogowanie:**  
  `./users.py --url <url> --token <token> force-logout --name username`

**Uwagi:**
- Przy operacjach na wielu użytkownikach (dopasowanych przez filtry) zostanie wyświetlony monit o potwierdzenie
- Jeśli nie ma pasujących użytkowników, zostanie wyświetlone "Found 0 users"

---

#### Zarządzanie grupami użytkowników (`user_group.py`)

**Pokaż pomoc:**  
`./user_group.py -h`

**Wyświetl grupy użytkowników:**  
`./user_group.py --url <url> --token <token> view [--name <group_name>]`

**Przykład:**  
`./user_group.py --url https://example.com --token <token> view --name "Zespół Sprzedaży"`

**Operacje na grupach:**

- **Utwórz grupę użytkowników:**  
  `./user_group.py --url <url> --token <token> add --name "NazwaGrupy" [--note "opis"] [--accessed-from '<json>'] [--access-to '<json>']`
  
  Przykład z kontrolą dostępu:  
  `./user_group.py --url <url> --token <token> add --name "Inżynierowie" --accessed-from '[{"type":0,"name":"Menedżerowie"}]' --access-to '[{"type":1,"name":"Serwery Dev"}]'`

- **Aktualizuj grupę użytkowników:**  
  `./user_group.py --url <url> --token <token> update --name "NazwaGrupy" [--new-name "Nowa Nazwa"] [--note "nowa notatka"] [--accessed-from '<json>'] [--access-to '<json>']`

- **Usuń grupę użytkowników:**  
  `./user_group.py --url <url> --token <token> delete --name "NazwaGrupy"`
  
  Obsługuje nazwy oddzielone przecinkami: `--name "Grupa1,Grupa2,Grupa3"`

**Zarządzanie użytkownikami w grupach:**

- **Wyświetl użytkowników w grupie:**  
  `./user_group.py --url <url> --token <token> view-users [--name <group_name>] [--user-name <username>]`
  
  Filtry:
  - `--name`: nazwa grupy (dokładne dopasowanie, opcjonalne)
  - `--user-name`: nazwa użytkownika (wyszukiwanie rozmyte, opcjonalne)
  
  Przykład:  
  `./user_group.py --url <url> --token <token> view-users --name Default --user-name john`

- **Dodaj użytkowników do grupy:**  
  `./user_group.py --url <url> --token <token> add-users --name "NazwaGrupy" --users "user1,user2,user3"`

**Parametry kontroli dostępu:**

- `--accessed-from`: tablica JSON definiująca kto może uzyskać dostęp do tej grupy użytkowników
  - Type 0 = Grupa użytkowników (np. `[{"type":0,"name":"Admins"}]`)
  - Type 2 = Użytkownik (np. `[{"type":2,"name":"john"}]`)

- `--access-to`: tablica JSON definiująca do czego ta grupa użytkowników może uzyskać dostęp
  - Type 0 = Grupa użytkowników (np. `[{"type":0,"name":"Wsparcie"}]`)
  - Type 1 = Grupa urządzeń (np. `[{"type":1,"name":"Serwery"}]`)

**Uwaga:** Użyj pojedynczych cudzysłowów wokół tablic JSON, aby uniknąć problemów z parsowaniem powłoki.

**Wymagania uprawnień:**
- Polecenia `view/add/update/delete/add-users` wymagają **Uprawnienia Grupy Użytkowników**
- Polecenie `view-users` wymaga **Uprawnienia Użytkownika**

---

#### Zarządzanie grupami urządzeń (`device_group.py`)

**Pokaż pomoc:**  
`./device_group.py -h`

**Wyświetl grupy urządzeń:**  
`./device_group.py --url <url> --token <token> view [--name <group_name>]`

**Przykład:**  
`./device_group.py --url https://example.com --token <token> view`

**Operacje na grupach:**

- **Utwórz grupę urządzeń:**  
  `./device_group.py --url <url> --token <token> add --name "NazwaGrupy" [--note "opis"] [--accessed-from '<json>']`
  
  Przykład:  
  `./device_group.py --url <url> --token <token> add --name "Produkcja" --accessed-from '[{"type":0,"name":"Admins"}]'`

- **Aktualizuj grupę urządzeń:**  
  `./device_group.py --url <url> --token <token> update --name "NazwaGrupy" [--new-name "Nowa Nazwa"] [--note "nowa notatka"] [--accessed-from '<json>']`

- **Usuń grupę urządzeń:**  
  `./device_group.py --url <url> --token <token> delete --name "NazwaGrupy"`
  
  Obsługuje nazwy oddzielone przecinkami: `--name "Grupa1,Grupa2,Grupa3"`

**Zarządzanie urządzeniami w grupach:**

- **Wyświetl urządzenia w grupie:**  
  `./device_group.py --url <url> --token <token> view-devices [filtry]`
  
  Dostępne filtry:
  - `--name`: nazwa grupy urządzeń (dokładne dopasowanie)
  - `--id`: ID urządzenia (wyszukiwanie rozmyte)
  - `--device-name`: nazwa urządzenia (wyszukiwanie rozmyte)
  - `--user-name`: nazwa użytkownika/właściciel (wyszukiwanie rozmyte)
  - `--device-username`: nazwa użytkownika zalogowanego na urządzeniu (wyszukiwanie rozmyte)
  
  Przykłady:  
  ```bash
  # Wyświetl wszystkie urządzenia w grupie
  ./device_group.py --url <url> --token <token> view-devices --name Produkcja
  
  # Szukaj po nazwie urządzenia
  ./device_group.py --url <url> --token <token> view-devices --device-name server
  
  # Połącz filtry
  ./device_group.py --url <url> --token <token> view-devices --name Produkcja --user-name john
  ```

- **Wyświetl dostępne grupy urządzeń:**  
  `./device_group.py --url <url> --token <token> accessible`
  
  Pokazuje wszystkie grupy urządzeń dostępne dla bieżącego użytkownika.

- **Dodaj urządzenia do grupy:**  
  `./device_group.py --url <url> --token <token> add-devices --name "NazwaGrupy" --ids "deviceid1,deviceid2"`

- **Usuń urządzenia z grupy:**  
  `./device_group.py --url <url> --token <token> remove-devices --name "NazwaGrupy" --ids "deviceid1,deviceid2"`

**Parametr kontroli dostępu:**

- `--accessed-from`: tablica JSON definiująca kto może uzyskać dostęp do tej grupy urządzeń
  - Type 0 = Grupa użytkowników (np. `[{"type":0,"name":"Inżynierowie"}]`)
  - Type 2 = Użytkownik (np. `[{"type":2,"name":"admin"}]`)

**Wymagania dotyczące uprawnień:**
- Polecenia `view/add/update/delete/add-devices/remove-devices` wymagają **Uprawnienia Grupy Urządzeń**
- Polecenie `view-devices` wymaga **Uprawnienia Urządzenia**

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

#### Zarządzanie Strategiami (`strategies.py`)

**Pokaż pomoc:**  
`./strategies.py -h`

**Wyświetl wszystkie strategie:**  
`./strategies.py --url <url> --token <token> list`

**Zobacz konkretną strategię:**  
```bash
# Po nazwie
./strategies.py --url <url> --token <token> view --name "Default"

# Po GUID
./strategies.py --url <url> --token <token> view --guid "01983006-fcca-7c12-9a91-b1df483c6073"
```

**Włącz lub wyłącz strategię:**  
```bash
./strategies.py --url <url> --token <token> enable --name "NazwaStrategii"
./strategies.py --url <url> --token <token> disable --name "NazwaStrategii"
```

**Przypisz strategię do urządzeń, użytkowników lub grup urządzeń:**  
```bash
# Przypisz do urządzeń (po ID urządzenia)
./strategies.py --url <url> --token <token> assign --name "Default" --peers "1849118658,1337348840"

# Przypisz do użytkowników (po nazwie użytkownika)
./strategies.py --url <url> --token <token> assign --name "Default" --users "admin,user1"

# Przypisz do grup urządzeń (po nazwie grupy)
./strategies.py --url <url> --token <token> assign --name "Default" --device-groups "device_group1,Production"

# Przypisanie mieszane
./strategies.py --url <url> --token <token> assign \
  --name "Default" \
  --peers "1849118658" \
  --users "admin" \
  --device-groups "device_group1"
```

**Cofnij przypisanie strategii:**  
```bash
# Cofnij z urządzeń
./strategies.py --url <url> --token <token> unassign --peers "1849118658,1337348840"

# Cofnij z użytkowników
./strategies.py --url <url> --token <token> unassign --users "admin"

# Cofnij z grup urządzeń
./strategies.py --url <url> --token <token> unassign --device-groups "device_group1"
```

**Uwagi:**
- Skrypt obsługuje zarówno nazwy, jak i GUID dla użytkowników i grup urządzeń
- ID urządzeń są automatycznie konwertowane na GUID
- Wszystkie operacje assign/unassign mogą obsługiwać wiele celów jednocześnie

**Wymagania uprawnień:**
- Polecenia `list/view/enable/disable/assign/unassign` wymagają **Uprawnienia Strategii**
- `--peers` wymaga **Uprawnienia Urządzenia:r** (do wyszukiwania ID do GUID)
- `--users` wymaga **Uprawnienia Użytkownika:r** (do wyszukiwania nazwy użytkownika do GUID)
- `--device-groups` wymaga **Uprawnienia Grupy Urządzeń:r** (do wyszukiwania nazwy grupy do GUID)

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
