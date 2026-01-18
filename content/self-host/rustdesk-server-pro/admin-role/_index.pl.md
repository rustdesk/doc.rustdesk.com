---
title: Rola Administratora
weight: 17
---

Rola Administratora pozwala administratorom delegować częściowe uprawnienia zarządzania użytkownikom niebędącym administratorami. Można definiować uprawnienia dla zasobów globalnych (takich jak strategie, role kontroli i niestandardowi klienci) oraz dla użytkowników i urządzeń w różnych zakresach.

Po przypisaniu Roli Administratora użytkownikowi, zobaczy on odpowiednie strony i menu w konsoli web zgodnie z przyznanymi uprawnieniami.

## Administratorzy vs Role Administratora

- Tylko administratorzy mogą edytować Role Administratora i przypisywać je użytkownikom.
- Administratorzy nie są ograniczeni przez Role Administratora, choć mogą im być przypisane.
- Użytkownicy niebędący administratorami nie mogą edytować kont administratorów, nawet z globalnymi uprawnieniami użytkownika.

## Typy Ról

Role Administratora występują w trzech typach, każdy z innym zakresem i dostępnymi uprawnieniami.

| Typ | Opis |
|------|-------------|
| **Globalny** | Może zarządzać wszystkimi zasobami całego zespołu |
| **Indywidualny** | Może zarządzać tylko własnymi urządzeniami i logami audytu |
| **Zakres Grupy** | Może zarządzać użytkownikami i urządzeniami w określonych grupach |

### O Zakresie Grupy

| Wybrane uprawnienia | Stosowane do |
|-------|-------------|
| **Uprawnienia Użytkownika** | Stosowane do użytkowników w wybranych grupach użytkowników |
| **Uprawnienia Urządzenia** | Stosowane do urządzeń z: <ul><li>Wybranych grup urządzeń</li><li>Urządzeń przypisanych do użytkowników w wybranych grupach</li><li>Nieprzypisanych urządzeń (jeśli włączone)</li></ul> |

Możesz wybrać tylko Uprawnienia Użytkownika lub tylko Uprawnienia Urządzenia w roli Zakresu Grupy, aby uprawnienia i zakres były bardziej przejrzyste. Na przykład wybranie tylko Uprawnień Użytkownika pozwala zarządzać użytkownikami bez dostępu do urządzeń, natomiast wybranie tylko Uprawnień Urządzenia pozwala zarządzać urządzeniami poprzez wybór grup użytkowników, grup urządzeń lub nieprzypisanych urządzeń jako zakresu.

## Reguły Uprawnień

### Każde Uprawnienie Edycji Zawiera Odpowiednie Uprawnienie Podglądu

Każde uprawnienie edycji automatycznie zawiera odpowiednie uprawnienie podglądu.

### Uprawnienie Edycji Nie Zawiera Przypisania

Uprawnienia edycji zasobów pozwalają tylko na edycję samych zasobów, nie zawierają uprawnień do ich przypisywania.

### Uprawnienie Podglądu Nie Zawiera Członków

Uprawnienia podglądu pozwalają tylko na przeglądanie samych zasobów, nie zawierają uprawnień do przeglądania członków w nich.

{{% notice note %}}
Odczyt urządzeń dla książek adresowych nie jest ograniczony przez Role Administratora. Karta dostępnych urządzeń w kliencie jest kontrolowana tylko przez **Ustawienia → Inne → Wyłącz pobieranie dostępnych urządzeń** w konsoli i również nie jest ograniczona przez Role Administratora.
{{% /notice %}}

## Operacje Konsoli

### Tworzenie Roli

1. Przejdź do strony **Role Administratora** i kliknij **Utwórz**
2. Wprowadź **Nazwę** roli
3. Wybierz **Typ** (dla **Zakresu Grupy** skonfiguruj również zakres)
4. Wybierz **Uprawnienia** do przyznania

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-permission.png)

### Przypisywanie Ról

Są dwa sposoby przypisywania Ról Administratora użytkownikom:

1. **Strona Użytkownicy** → Kliknij **Edytuj** przy użytkowniku → Wybierz role w polu **Role Administratora**
2. **Strona Role Administratora** → Kliknij **liczbę użytkowników** lub **Przypisz Użytkowników** → Dodaj lub usuń użytkowników

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-role-page.png)

{{% notice note %}}
- Użytkownik może mieć przypisanych wiele Ról Administratora. Uprawnienia wszystkich ról są łączone.
{{% /notice %}}

## Referencja Uprawnień

### Uprawnienia Globalne

| Uprawnienie | Opis |
|------------|-------------|
| Users-View | Odczyt informacji o użytkownikach. |
| Users-Create | Tworzenie użytkowników. |
| Users-Invite | Zapraszanie użytkowników. |
| Users-Delete | Usuwanie użytkowników. |
| Users-Enable/Disable | Włączanie/wyłączanie użytkowników. |
| Users-Edit Email | Zmiana emaila użytkowników. |
| Users-Edit Password | Zmiana hasła użytkowników. |
| Users-Edit Note | Zmiana notatek użytkowników. |
| Users-Manage 2FA | Zarządzanie 2FA użytkowników. |
| Users-Force Logout | Wymuszanie wylogowania użytkowników. |
| Users-Update Group | Zmiana grupy użytkowników. |
| Users-Update Strategy | Zmiana strategii użytkowników. |
| Users-Update Control Role | Zmiana roli kontroli użytkowników. |
| Devices-View | Odczyt informacji o urządzeniach. |
| Devices-Enable/Disable | Włączanie/wyłączanie urządzeń. |
| Devices-Delete | Usuwanie urządzeń. |
| Devices-Edit Info | Edycja informacji o urządzeniach. |
| Devices-Assign to User | Przypisywanie urządzeń użytkownikom. |
| Devices-Update Group | Zmiana grupy urządzeń. |
| Devices-Update Strategy | Zmiana strategii urządzeń. |
| User Groups-View | Odczyt grup użytkowników. |
| User Groups-Edit | Tworzenie, edycja i usuwanie grup użytkowników. |
| Device Groups-View | Odczyt grup urządzeń. |
| Device Groups-Edit | Tworzenie, edycja i usuwanie grup urządzeń. |
| Device Groups-Update Strategy | Zmiana strategii grup urządzeń. |
| Audit Logs-View | Odczyt logów. |
| Audit Logs-Edit | Rozłączanie aktywnych połączeń. |
| Strategies-View | Odczyt strategii. |
| Strategies-Edit | Tworzenie, edycja i usuwanie strategii. |
| Control Roles-View | Odczyt ról kontroli. |
| Control Roles-Edit | Tworzenie, edycja i usuwanie ról kontroli. |
| Custom Clients-View | Odczyt niestandardowych klientów. |
| Custom Clients-Edit | Tworzenie, edycja i usuwanie niestandardowych klientów. |

### Uprawnienia Indywidualne

| Uprawnienie | Opis |
|------------|-------------|
| Devices-View | Odczyt własnych urządzeń. |
| Devices-Enable/Disable | Włączanie/wyłączanie własnych urządzeń. |
| Devices-Delete | Usuwanie własnych urządzeń. |
| Devices-Edit Info | Edycja informacji o własnych urządzeniach. |
| Devices-Update Strategy | Zmiana strategii własnych urządzeń. |
| Audit Logs-View | Odczyt własnych logów. |
| Audit Logs-Edit | Rozłączanie własnych połączeń. |

### Uprawnienia Zakresu Grupy

| Uprawnienie | Opis |
|------------|-------------|
| Users-View | Odczyt użytkowników w wybranych grupach. |
| Users-Create | Tworzenie użytkowników w wybranych grupach. |
| Users-Invite | Zapraszanie użytkowników do wybranych grup. |
| Users-Delete | Usuwanie użytkowników z wybranych grup. |
| Users-Enable/Disable | Włączanie/wyłączanie użytkowników w wybranych grupach. |
| Users-Edit Email | Zmiana emaila użytkowników w wybranych grupach. |
| Users-Edit Password | Zmiana hasła użytkowników w wybranych grupach. |
| Users-Edit Note | Zmiana notatek użytkowników w wybranych grupach. |
| Users-Manage 2FA | Zarządzanie 2FA użytkowników w wybranych grupach. |
| Users-Force Logout | Wymuszanie wylogowania użytkowników w wybranych grupach. |
| Users-Update Strategy | Zmiana strategii użytkowników w wybranych grupach. |
| Users-Update Control Role | Zmiana roli kontroli użytkowników w wybranych grupach. |
| Devices-View | Odczyt urządzeń zarządzanych przez rolę. |
| Devices-Enable/Disable | Włączanie/wyłączanie urządzeń zarządzanych przez rolę. |
| Devices-Delete | Usuwanie urządzeń zarządzanych przez rolę. |
| Devices-Edit Info | Edycja informacji o urządzeniach zarządzanych przez rolę. |
| Devices-Update Strategy | Zmiana strategii urządzeń zarządzanych przez rolę. |
