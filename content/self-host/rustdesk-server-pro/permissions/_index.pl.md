---
title: Kontrola dostępu
weight: 16
---

## Uprawnienia dostępu do urządzeń

Urządzenie może być przypisane do:
- pojedynczego użytkownika
- pojedynczej grupy urządzeń
- lub obu tych opcji jednocześnie

Gdy urządzenie jest przypisane do użytkownika, dostęp do niego mają:
- ten użytkownik
- grupa użytkowników
- osoby z odpowiednimi ustawieniami dostępu międzygrupowego

Gdy urządzenie jest przypisane do grupy urządzeń, dostęp regulują ustawienia dostępu między użytkownikami a grupami urządzeń.

### Sposoby przypisania urządzenia do użytkownika:
1. Przez stronę urządzeń w konsoli
2. Logowanie na kliencie przy użyciu przypisanego konta użytkownika
3. Polecenie wiersza poleceń

### Sposoby przypisania urządzenia do grupy urządzeń:
1. Przez stronę urządzeń w konsoli
2. Polecenie wiersza poleceń

### Sytuacje blokujące dostęp do urządzenia:
1. Ustawienie statusu "wyłączone" dla urządzenia w konsoli
2. Dezaktywacja użytkownika w konsoli

## Ustawienia dostępu między grupami użytkowników

W konsoli przejdź do strony grup i kliknij `Edytuj`, aby zmodyfikować ustawienia dostępu międzygrupowego.

Zmiany w polu `Dostęp do innych grup` obowiązują natychmiast, bez konieczności klikania `OK`.

Opcje `Może uzyskiwać dostęp do` i `Może być dostępny dla` pełnią podobną funkcję - istnieją dla wygody, ale mogą powodować pewne zamieszanie.

{{% notice note %}}
Użytkownik i grupa po stronie kontrolującej są określani przez osobę logującą się, a nie przez użytkownika przypisanego z konsoli. Wynika to z faktu, że niektóre urządzenia kontrolujące (np. klient iOS czy wersja webowa) nie mają ID urządzenia.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/permissions/images/crossgrp.png)

## Ustawienia dostępu dla grup urządzeń

Grupy urządzeń to alternatywny sposób zarządzania uprawnieniami. Kluczowe zasady:

1. Urządzenie może należeć tylko do jednej grupy urządzeń
2. Można ustawiać uprawnienia dostępu dla użytkowników/grup użytkowników do grup urządzeń. Uprawnienia te sumują się z uprawnieniami międzygrupowymi - dostęp jest przyznawany, jeśli pozwalają na to którekolwiek z ustawień
3. Gdy nieprzypisane urządzenie zostanie dodane do grupy, przestaje być uważane za "nieprzypisane"

{{% notice note %}}
Funkcja grup urządzeń wymaga:
- Klient RustDeska w wersji ≥ 1.3.8
- Serwer RustDeska Pro w wersji ≥ 1.5.0
{{% /notice %}}