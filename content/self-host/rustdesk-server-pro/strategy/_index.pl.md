---
title: Strategia
weight: 200
---

Strategia to narzędzie dla administratorów RustDesk umożliwiające masową aktualizację ustawień bezpieczeństwa na stronach konfiguracji klientów. Administratorzy mogą tworzyć różne strategie i stosować je do różnych urządzeń.

## Tworzenie strategii

Nową strategię można utworzyć, klikając przycisk `+`, a następnie wykonując różne akcje poprzez najechanie na strategię i kliknięcie menu.

W menu kontekstowym można wybrać opcje `Włącz` lub `Wyłącz` strategię, `Zmień nazwę`, `Duplikuj` lub `Usuń`. Dodatkowo można kliknąć `Edytuj urządzenia`, aby zmodyfikować urządzenia przypisane do danej strategii, lub `Edytuj użytkowników`, aby zmodyfikować przypisanych użytkowników.

Po prawej stronie menu strategii widoczna jest liczba urządzeń faktycznie przypisanych do strategii, uwzględniając jej priorytet.

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/strategy_menu.png)

## Strategia urządzenia, strategia użytkownika i strategia grupy urządzeń

Strategie są stosowane według następującej kolejności priorytetów:
1. Strategia urządzenia (najwyższy priorytet)
2. Strategia użytkownika
3. Strategia grupy urządzeń (najniższy priorytet)

Każde urządzenie może być zarządzane tylko przez jedną strategię naraz. System priorytetów działa następująco:
- Strategie urządzeń mają pierwszeństwo przed strategiami użytkowników i grup urządzeń
- Strategie użytkowników mają pierwszeństwo przed strategiami grup urządzeń
- Strategie grup urządzeń dotyczą wszystkich urządzeń w grupie, które nie mają przypisanej strategii urządzenia ani użytkownika

## Edycja urządzeń

Po kliknięciu menu `Edytuj urządzenia` otworzy się okno dialogowe zawierające listę wszystkich urządzeń. Można zmieniać stan zaznaczenia pól wyboru, a następnie kliknąć przycisk `Zapisz`, aby zastosować zmiany na bieżącej stronie. Aby zmodyfikować urządzenia na innych stronach, należy do nich przejść. Można również użyć menu rozwijanego w prawym górnym rogu do filtrowania urządzeń.

Format kolumny strategii: strategia urządzenia/strategia użytkownika/strategia grupy urządzeń lub "-" dla strategii domyślnej.

Przykład okna dialogowego po kliknięciu `Edytuj urządzenia` w menu "demo1":
- Urządzenie "1981241962" przypisane do strategii "demo3"
- Urządzenie "1279471875" przypisane do strategii "demo2"
- Urządzenie "a123456" przypisane do strategii "demo1"
- Urządzenie "1227624460" przypisane do strategii domyślnej

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_devices.png)

## Edycja użytkowników

Po kliknięciu menu `Edytuj użytkowników` otworzy się okno dialogowe zawierające listę wszystkich użytkowników. Można zmieniać stan zaznaczenia pól wyboru, a następnie kliknąć przycisk `Zapisz`, aby zastosować zmiany na bieżącej stronie. Aby zmodyfikować użytkowników na innych stronach, należy do nich przejść. Można również użyć menu rozwijanego w prawym górnym rogu do filtrowania użytkowników.

Przykład okna dialogowego po kliknięciu `Edytuj użytkowników` w menu "demo2":
- Użytkownik "admin" przypisany do strategii "domyślna"
- Użytkownik "user1" przypisany do strategii "demo2"
- Użytkownik "user2" przypisany do strategii "demo3"

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_users.png)

## Edycja grup urządzeń

Po kliknięciu menu `Edytuj grupę urządzeń` otworzy się okno dialogowe zawierające listę wszystkich grup urządzeń. Można zmieniać stan zaznaczenia pól wyboru, a następnie kliknąć przycisk `Zapisz`, aby zastosować zmiany na bieżącej stronie. Aby zmodyfikować grupy na innych stronach, należy do nich przejść. Można również użyć menu rozwijanego w prawym górnym rogu do filtrowania grup.

Przykład okna dialogowego po kliknięciu `Edytuj grupę urządzeń` w menu "demo1":
- Grupa "device_group1" przypisana do strategii "demo1"
- Grupa "group2" przypisana do strategii "demo2"
- Grupa "group3" przypisana do strategii "domyślna"

![](/docs/en/self-host/rustdesk-server-pro/strategy/images/edit_device_groups.png)

## Synchronizacja strategii

Każde urządzenie może być zarządzane tylko przez jedną strategię. Jeśli strategia jest wyłączona, urządzenie nie będzie zarządzane przez żadną strategię. Podczas synchronizacji RustDesk porównuje znaczniki czasu strategii lokalnych i serwera, aby określić konieczność synchronizacji. Po zakończeniu synchronizacji:

* Jeśli użytkownik zmieni niektóre opcje, klient użyje opcji użytkownika
* Jeśli administrator zmieni zawartość strategii, opcje klienta zostaną zsynchronizowane
* Jeśli administrator zmieni strategię przypisaną do urządzenia, opcje klienta zostaną zsynchronizowane

## Modyfikacja strategii

Na dole strategii należy kliknąć `Edytuj`, wprowadzić zmiany i kliknąć `Zatwierdź`. Strategia zostanie zsynchronizowana z urządzeniami w ciągu 30 sekund.
