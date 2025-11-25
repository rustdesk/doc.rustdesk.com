---
title: Android
weight: 4
---

## Control la distanță

Introduceți ID-ul dispozitivului la distanță pe pagina principală sau selectați un dispozitiv din istoricul recent pentru a verifica.
După ce verificarea este reușită, puteți controla dispozitivul la distanță.

| Home | Conectat cu succes |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

Controlul de intrare oferă două moduri: `Mouse mode` și `Touch mode`, care pot fi comutate prin bara de instrumente din partea de jos.

| Setări mouse | Selecție mod |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
În `Mouse mode`, puteți, de asemenea, să declanșați butonul `Right Mouse` al dispozitivului la distanță cu un `Two-Finger Tap`.
{{% /notice %}}

## Transfer de fișiere (Android)

> Necesită RustDesk ≥ 1.1.9

În lista de dispozitive de pe pagina principală, selectați dispozitivul.

Apăsați lung sau atingeți meniul din dreapta pentru a selecta `File Transfer`.

| Home | Conectat cu succes |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- Directorul inițial este directorul Home al dispozitivului; puteți face clic pe <i class="fas fa-home"></i> pentru a reveni rapid la Home.
- Sub bara de titlu se află nivelul directorului; puteți face clic pe folderul corespunzător pentru a sări rapid.
- Faceți clic pe <i class="fas fa-arrow-up"></i> pentru a accesa directorul părinte.
- Calea absolută curentă și statisticile proiectului sunt afișate în partea de jos a listei.
- Faceți clic pe `Local` / `Remote` din bara de titlu pentru a comuta paginile.

### Cum transfer fișiere?

1. **Apăsați lung** pe un fișier sau folder din listă pentru a intra rapid în **modul de selecție multiplă**, care permite selectarea mai multor elemente.
2. După selectarea fișierelor, comutați pagina `Local` / `Remote`. După comutare, veți vedea promptul `Paste here?` în partea de jos a ecranului.
3. Faceți clic pe pictograma de lipire (paste) din imagine pentru a transfera elementele selectate în directorul țintă.

| Mod selecție multiplă | Lipire fișiere |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

## Setare ID / Relay Server

1. Faceți clic pe `Settings` în bara de navigare de jos.
2. Faceți clic pe `ID/Relay Server`.
3. Introduceți hostname-ul/IP-ul serverului dvs. în câmpul `ID Server`. Lăsați `Relay Server` și `API Server` necompletate și introduceți cheia publică (opțional, necesară pentru criptare) în câmpul `Key`. Apăsați **OK** pentru a salva setările. Aplicația se va comuta automat la serverul specificat.

Puteți configura și scanând un cod QR. Pentru a genera codul QR, folosiți următorul format (modificați valorile `host` și `key` cu ale dvs.):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Apoi mergeți la un [generator QR online](https://www.qr-code-generator.com/) și lipiți codul de mai sus.

Imaginea de mai jos este un screenshot de pe Android. Dacă folosiți iOS, verificați meniul din dreapta sus al paginii principale.

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

## Partajați ecranul / fișierele telefonului Android

Începând cu versiunea 1.1.9, clientul Android a adăugat funcțiile de partajare a ecranului telefonului și de partajare a sistemului de fișiere al telefonului.

- Este necesar Android 6 sau versiuni mai noi pentru partajarea ecranului
- Este necesar Android 10 sau versiuni mai noi pentru a partaja audio intern al sistemului telefonului
- iOS încă nu suportă partajarea ecranului

### Solicitați permisiuni și porniți serviciile

Faceți clic pe `Share Screen` din bara de navigare de jos.

Configurați permisiunile necesare. De fiecare dată când porniți RustDesk, trebuie să solicitați din nou permisiunile de „Screen Capture” și „Input Control”.

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| Permisiuni | Descriere |
| --- | --- |
| Screen Capture | Dacă este activată, permite partajarea capturii ecranului; serviciul de monitorizare va fi activat la pornire |
| Input Control* | Permite celui care controlează să trimită evenimente de intrare către telefon (de ex. simulare touch cu mouse-ul) |
| File transfer* | Permite activarea permisiunii de transfer fișiere; după pornire, puteți controla de la distanță sistemul de fișiere al telefonului |
| Audio capture | Permite partajarea sunetului intern al telefonului (nu microfonul) |

{{% notice note %}}
De mai sus, * indică permisiuni speciale. Pentru a obține astfel de permisiuni, va trebui să accesați manual pagina de setări a sistemului Android. Detaliile sunt descrise mai jos.
{{% /notice %}}

### Cerere permisiune specială - Fișiere

| Cererea permisiunilor pentru fișiere pe Android va deschide automat pagina de setări a sistemului |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

### Cerere permisiune specială - input mouse
| Pasul 1: Găsiți „Installed Services” | Pasul 2: Porniți RustDesk Input |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
Pagina de setări a sistemului poate diferi în funcție de producător; ajustați conform paginii de setări a dispozitivului dvs.
{{% /notice %}}

| Scurtături control mouse la distanță | Descriere |
| --- | --- |
| Click buton drept mouse | Înapoi |
| Click rotiță mouse | Home |
| Apăsare lungă rotiță mouse | Aplicații recente |
| Derulare rotiță mouse | Simulează glisare verticală |

### Pornire serviciu

După obținerea permisiunii `Screen Capture`, serviciul va porni automat. Puteți, de asemenea, să apăsați butonul `Start Service` pentru a porni manual serviciul. După pornire, acesta poate accepta cereri de control de la distanță din partea altor dispozitive.

Dacă permisiunea `File Transfer` este activată, serviciul poate accepta și cereri de control al fișierelor de la distanță.

După pornirea serviciului, pentru acest dispozitiv va fi generat automat un ID unic și o parolă aleatorie. Alte dispozitive pot controla telefonul folosind ID-ul și parola sau prin confirmare manuală la primirea unei cereri noi.

| Înainte de pornirea serviciului | După pornirea serviciului |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Apăsarea `Start Service` va activa implicit permisiunea `Screen Capture`.
2. Când permisiunea `Screen Capture` nu este obținută, alte dispozitive nu pot trimite cereri de control.
3. În afară de permisiunea `Screen Capture`, comutarea celorlalte permisiuni va afecta doar conexiunile noi și nu va modifica conexiunile deja stabilite. Dacă trebuie să schimbați permisiunile pentru o conexiune activă, închideți mai întâi conexiunea curentă, modificați permisiunile și acceptați din nou cererea de control.
{{% /notice %}}

#### PC

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

#### Terminal mobil

| Puteți opri serviciul sau închide o conexiune specificată în orice moment | Puteți primi sau iniția chat-uri |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |