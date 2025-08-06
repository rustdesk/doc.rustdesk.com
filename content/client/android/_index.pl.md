---
title: Android
weight: 4
---

## Zdalne sterowanie

Wprowadź ID zdalnego urządzenia na stronie głównej (lub wybierz poprzednie urządzenie) aby rozpocząć weryfikację.
Po pomyślnej weryfikacji, możesz zdalnie sterować urządzeniem.

| Strona główna | Połączony |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

Istnieją dwa tryby sterowania: `Tryb myszy` oraz `Tryb dotyku`, pomiędzy którymi możesz przechodzić za pomocą dolnego paska narzędzi.

| Ustawienia myszy | Wybór trybu |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
W `trybie myszy` możesz wywołać `prawy przycisk myszy` na zdalny urządznieniu za pomocą `dotknięcia dwoma palcami`.
{{% /notice %}}

## Transfer plików (Android)

> Wymaga RustDeska ≥ 1.1.9

Na liście urządzeń na stronie głównej, wybierz urządzenie.

Prztrzymaj albo naciśnij menu po prawej i wybierz `Transfer plików`.

| Strona główna | Połączony |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- Początkowy katalog to katalog domowy użytkownika w urządzeniu. Możesz nacisnąć <i class="fas fa-home"></i> aby szybko wrócić do katalogu domowego.
- Pod paskiem tytułu znajduje się poziom katalogu. Możesz kliknąć odpowiedni folder, aby szybko przejść do niego.
- Naciśnij <i class="fas fa-arrow-up"></i> aby przejść do katalogu nadrzędnego.
- Aktualna bezwzględna ścieżka i statystyki projektu zostaną wyświetlone na dole listy.
- Kliknij `Lokalne` / `Zdalne` na pasku tytułu, aby przełączać się między stronami.

### Jak mam przesyłać pliki?

1. **Prztrzymaj** plik lub folder w liście aby szybko przejść do **trybu wielokrotnego wyboru**, w którym możesz wybrać wiele przedmiotów.
2. Po wybraniu plików zmień stronę `Lokalne` / `Zdalne`. Po zmianie wyświetli się komunikat `Wkleić tutaj?` na dole ekranu.
3. Naciśnij ikonę wklejania aby zacząć przesyłać wybrane rzeczy do katalogu docelowego.

| Tryb wielokrotnego wyboru | Wklejanie plików |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

## Ustawienie ID/Serwera przekaźnikowego

1. Naciśnij `Ustawienia` na dolnym pasku nawigacyjnym.
2. Naciśnij `Serwer ID/przekaźnikowy`.
3. Wpisz adres twojego serwera ID w polu `Serwer ID`. Zostaw `Serwer przekaźnikowy` i `Serwer API` puste i wprowadź twój klucz publiczny (opcjonalne, wymagane do szyfrowania) w polu `Klucz.` Naciśnij **OK** aby zapisać ustawienia. Zostaniesz automatycznie przełączony na wybrany serwer.

Możesz również skonfigurować serwer za pomocą kodu QR. Aby wygnerować taki kod, użyj następującego formatu (zazmień wartości `host` i `key` na własne):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Następnie przejdź do [generatora kodów QR](https://www.qr-code-generator.com/) i wklej powyższy kod.

Poniższy obrazek to zrzut ekranu Androida. Jeżeli używasz iOSa, sprawdź menu w prawym górnym rogu na stronie głównej.

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

## Udostępniaj ekran/pliki z twojego Androida

Zaczynając od wersji 1.1.9, klient Androidowy wprowadził funkcję udostępniania ekranu smartfona oraz jego plików.

- Android 6 lub nowszy jest wymagany w celu udostępniania ekranu
- Android 10 lub nowszy jest wymagny w celu udostępniania wewnętrznego dźwięku systemu smartfona
- iOS nie wspiera udostępniania ekranu

### Poproś o uprawnienia i uruchom usługi

Naciśnij na `Udostępniaj ekran` na dole paska nawigacyjnego.

Skonfiguruj różne uprawnienia w razie potrzeb. Przy każdym uruchomieniu RustDeska będziesz musiał ponownie wywołać uprawnienia "Przechwytywanie ekranu" i "Sterowanie wejściem (_Input Control_)".

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| Uprawnienie | Opis |
| --- | --- |
| Przechwytywanie ekranu    | Włączenie uprawnienia do udostępniania zrzutów ekranu; usługa monitorowania zostanie włączona jednocześnie z uruchomieniem systemu |
| Sterowanie wejściem*      | Zezwolenie kontrolerowi na sterowanie wejściem telefonu komórkowego, np. obsługą wirtualnego ekranu dotykowego za pomocą myszy |
| Przesyłanie plików*       | Włączenie uprawnienia do przesyłania plików. Po uruchomieniu można zdalnie sterować systemem plików tego telefonu |
| Przechwytywanie dźwięku   | Udostępnianie muzyki systemowej w telefonie (nie wejścia mikrofonowego) |

{{% notice note %}}
Powyższy symbol * oznacza specjalne uprawnienia. Aby je uzyskać, należy przejść do strony ustawień systemu Android i włączyć je ręcznie. Szczegóły są następujące:
{{% /notice %}}

### Wniosek o specjalne zezwolenie – plik

| Żądanie uprawnień do plików Androida spowoduje automatyczne przejście do strony ustawień systemowych |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

### Wniosek o specjalne zezwolenie – wejście myszy
| Krok 1: Znajdź "Zainstalowane usługi" | Krok 2: Uruchom _wejście_ RustDeska |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
Strona ustawień systemu różnych dostawców może się różnić, dostosuj ją zgodnie ze stroną swojego systemu.
{{% /notice %}}

| Skróty klawiszowe do sterowania myszą | Opis |
| --- | --- |
| Kliknij prawym przyciskiem myszy | Wróć |
| Kliknij kółko myszy | Strona domowa |
| Prztrzymaj kółko myszy | Ostatnio uruchomione aplikacje |
| Scrollowanie | Symuluj pionowe przesuwanie |

### Uruchom usługę

Po uzyskaniu uprawnienia `Przechwytywanie ekranu` usługa zostanie uruchomiona automatycznie. Można również kliknąć przycisk `Uruchom usługę`, aby uruchomić usługę. Po uruchomieniu usługi może ona przyjmować żądania sterowania pulpitem z innych urządzeń.

Jeśli uprawnienie `Transfer plików` jest włączone, może ono również akceptować żądania kontroli plików z innych urządzeń.

Po uruchomieniu usługi urządzenie otrzyma automatycznie unikalne ID i losowe hasło. Inne urządzenia mogą sterować smartfonem za pomocą ID i hasła lub ręcznie potwierdzać otrzymanie nowego żądania.

| Przed uruchomieniem usługi | Po uruchomieniu usługi |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Kliknięcie przycisku `Uruchom usługę` spowoduje domyślne włączenie uprawnienia `Przechwytywanie ekranu`.
2. Gdy nie uzyskano uprawnienia `Przechwytywanie ekranu`, inne urządzenia nie mogą wysyłać żądań sterowania.
3. Z wyjątkiem uprawnienia `Przechwytywanie kranu`, zmiana innych uprawnień będzie miała wpływ tylko na nowe połączenie i nie wpłynie na istniejące połączenie. Jeśli chcesz zmienić uprawnienia dla istniejącego połączenia, najpierw zamknij bieżące połączenie, zmień uprawnienia, a następnie odbierz żądanie sterowania.
{{% /notice %}}

#### PC

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

#### Mobilny terminal

| W dowolnym momencie możesz zatrzymać usługę lub zamknąć określone połączenie | Możesz odbierać lub inicjować czaty |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |
