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

## Przypisywanie użytkowników/grup/strategii/grup urządzeń do urządzeń
Użytkownik to użytkownik RustDeska zalogowany na urządzeniu lub przypisany do niego poprzez kliknięcie `Edytuj` obok urządzenia, kliknięcie pola `Użytkownik` i wybranie użytkownika z listy rozwijanej. Spowoduje to automatyczne przypisanie grupy na podstawie grupy, do której użytkownik został przypisany.

Można to również zrobić za pomocą interfejsu API w wierszu poleceń podczas wdrażania lub później, wywołując plik wykonywalny RustDesk, a następnie poleceniem `--assign --token <wygenerowanytoken> --user_name <nazwa_użytkownika>`. Aby to zrobić, należy przejść do `Ustawienia → Tokeny → Utwórz` i najpierw utworzyć token z uprawnieniami urządzenia. Przykładem w systemie Windows jest `"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <wygenerowanytoken> --user_name <nazwa_użytkownika>`.

Możesz również przypisać strategię w ten sposób, np. `--assign --token <wygenerowanytoken> --strategy_name <nazwastrategii>`.

Możesz również przypisać książkę adresową w ten sposób, np. `--assign --token <wygenerowanytoken> --address_book_name <nazwaksiążkiadresowej>` lub `--assign --token <wygenerowanytoken> --address_book_name <nazwaksiążkiadresowej> --address_book_tag <znacznikksiążkiadresowej> --address_book_alias <alias>`. `--address_book_alias` wymaga serwera RustDeska Pro w wersji 1.5.8 lub nowszej i klienta w wersji 1.4.1.

Możesz również przypisać nazwę grupy urządzeń w ten sposób, np. `--assign --token <wygenerowanytoken> --device_group_name <nazwagrupyurządzeń>`.

Wiersz poleceń w systemie Windows domyślnie nie wyświetla wyników. Aby uzyskać wynik, uruchom polecenie w następujący sposób: `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | więcej` lub `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String`, patrz [tutaj](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

## Wyszukiwanie urządzenia
1. Przejdź do sekcji Urządzenia.
2. W polu wyszukiwania nazwy urządzenia wpisz nazwę i kliknij `Szukaj` lub naciśnij <kbd>Enter</kbd>.
3. Aby użyć symbolu wieloznacznego, dodaj `%` na początku, na końcu lub w obu miejscach wyszukiwanego terminu.
