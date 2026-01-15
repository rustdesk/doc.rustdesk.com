---
title: Rola Kontroli
weight: 18
---

Rola Kontroli umożliwia konfigurację uprawnień zdalnego sterowania dla różnych użytkowników. Gdy użytkownik zdalnie steruje innym urządzeniem, Rola Kontroli określa, jakie operacje może wykonywać użytkownik kontrolujący po nawiązaniu połączenia.

{{% notice note %}}
**Rola Kontroli vs Kontrola Dostępu vs Strategia**

- **Rola Kontroli**: Określa, jakie operacje może wykonywać użytkownik kontrolujący po nawiązaniu połączenia.
- **Kontrola Dostępu**: Określa, czy można nawiązać połączenie między urządzeniami kontrolującym i kontrolowanym.
- **Strategia**: Modyfikuje ustawienia na kontrolowanym urządzeniu.
{{% /notice %}}

## Wymagania

- Urządzenie kontrolowane: RustDesk **1.4.5** lub nowszy (urządzenia Android kontrolowane nie są jeszcze obsługiwane)
- Urządzenie kontrolujące: Brak wymagań dotyczących wersji

## Obliczanie Uprawnień

### Jak Działają Uprawnienia

W skrócie: Uprawnienia kontroli mają pierwszeństwo przed ustawieniami lokalnymi.

Istnieją dwa źródła ustawień uprawnień:

- **Ustawienia lokalne po stronie kontrolowanej**: Ustawienia kontrolowanego urządzenia (Ustawienia → Bezpieczeństwo → Uprawnienia)
- **Uprawnienie Kontroli**: Uprawnienia Roli Kontroli użytkownika kontrolującego (skonfigurowane w konsoli webowej)

Każde uprawnienie ma trzy stany:

- **Użyj Ustawień Klienta**: Bez nadpisywania, użyj lokalnego ustawienia kontrolowanego urządzenia
- **Włącz**: Jawnie włącz to uprawnienie (nadpisuje ustawienie lokalne)
- **Wyłącz**: Jawnie wyłącz to uprawnienie (nadpisuje ustawienie lokalne)

Uprawnienia są obliczane na poziomie sesji:

| Uprawnienie Kontroli | Ustawienia Lokalne | Wynik |
|---|---|---|
| Włącz | Włącz | Włącz |
| Włącz | Wyłącz | **Włącz** |
| Wyłącz | Włącz | **Wyłącz** |
| Wyłącz | Wyłącz | Wyłącz |
| Użyj Ustawień Klienta | Włącz | Włącz |
| Użyj Ustawień Klienta | Wyłącz | Wyłącz |

**Przypadek specjalny: Zdalna Modyfikacja Konfiguracji**

Gdy wielu użytkowników kontrolujących jest połączonych z tym samym urządzeniem, uprawnienie "Zdalna Modyfikacja Konfiguracji" jest obliczane dla wszystkich połączeń:

| Uprawnienie Kontroli Wszystkich Połączeń | Wynik |
|---|---|
| Którekolwiek Wyłącz | **Wyłącz** |
| Żadne Wyłącz, Którekolwiek Włącz | **Włącz** |
| Wszystkie Użyj Ustawień Klienta | Użyj ustawienia lokalnego |

### Która Rola Obowiązuje

Każdy użytkownik może mieć przypisaną tylko jedną Rolę Kontroli. Istnieją dwie wbudowane role:

| Rola | Opis |
|------|-------------|
| **Niezalogowany** | Dla użytkowników kontrolujących, którzy nie są zalogowani. Nie można przypisać do użytkowników. |
| **Domyślna** | Dla zalogowanych użytkowników kontrolujących bez przypisanej Roli Kontroli lub jawnie przypisanych do roli Domyślnej. |

Zastosowana Rola Kontroli zależy od statusu logowania użytkownika kontrolującego i przypisania roli:

| Status Użytkownika Kontrolującego | Przypisana Rola | Rola / Status Roli | Zastosowana Rola Kontroli |
|---|---|---|---|
| Niezalogowany | - | Niezalogowany / Włączony | Niezalogowany |
| Niezalogowany | - | Niezalogowany / Wyłączony | - |
| Zalogowany | Ma przypisaną rolę | Przypisana rola / Włączony | Przypisana rola |
| Zalogowany | Ma przypisaną rolę | Przypisana rola / Wyłączony | - |
| Zalogowany | Brak przypisanej roli | Domyślna / Włączony | Domyślna |
| Zalogowany | Brak przypisanej roli | Domyślna / Wyłączony | - |

## Dostępne Uprawnienia

12 kontrolowanych uprawnień odpowiada Ustawieniom → Bezpieczeństwo → Uprawnienia kontrolowanego urządzenia:

- Klawiatura/Mysz
- Zdalna Drukarka
- Schowek
- Transfer Plików
- Audio
- Kamera
- Terminal
- Tunel TCP
- Zdalny Restart
- Nagrywanie Sesji
- Blokuj Wejście Użytkownika
- Zdalna Modyfikacja Konfiguracji

## Operacje Konsoli

### Tworzenie Roli

1. Przejdź do strony **Role Kontroli** i kliknij **Utwórz**
2. Wprowadź **Nazwę** roli
3. Wybierz **Uprawnienia** do przyznania

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-permission.png)

### Przypisywanie Roli

Istnieją dwa sposoby przypisywania Ról Kontroli do użytkowników:

1. **Strona Użytkownicy** → Kliknij **Edytuj** przy użytkowniku → Wybierz rolę w polu **Rola Kontroli**
2. **Strona Role Kontroli** → Kliknij **liczbę użytkowników** lub **Przypisz Użytkowników** → Dodaj lub usuń użytkowników z roli

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-role-page.png)

{{% notice note %}}
Rola "Niezalogowany" nie może być przypisana do użytkowników (dotyczy tylko niezalogowanych połączeń).
{{% /notice %}}
