---
title: Controlul accesului
weight: 16
---

## Permisiuni de acces ale dispozitivului

Un dispozitiv poate fi atribuit fie unui singur utilizator, fie unui singur grup de dispozitive, fie ambelor.

Când dispozitivul este atribuit unui utilizator, acesta poate fi accesat de acel utilizator, de un grup de utilizatori sau prin setările corespunzătoare între grupuri de utilizatori.

Când dispozitivul este atribuit unui grup de dispozitive, acesta poate fi accesat prin setările corespunzătoare între grupuri de utilizatori și grupuri de dispozitive.

Există trei modalități de a atribui un dispozitiv unui utilizator:
- Din pagina dispozitivului din consolă
- Autentificându‑vă în contul de utilizator specificat pe partea client
- Prin linia de comandă (assign)
  
Există două modalități de a atribui un dispozitiv unui grup de dispozitive:
- Din pagina dispozitivului din consolă
- Prin linia de comandă (assign)

Următoarele două situații vor împiedica accesul la dispozitiv:
- Setați dispozitivul la `disable` în pagina dispozitive din consolă
- Setați utilizatorul la `disable` în pagina utilizatori din consolă

## Setări de acces pentru grupuri de utilizatori

Accesați pagina grupului în consola web și faceți clic pe `Edit` pentru a modifica setările între grupuri, după cum urmează.

Modificările făcute la `Access with other groups` intră în vigoare imediat, fără a fi necesară apăsarea butonului `OK`.

Atât `Can access to`, cât și `Can be accessed from` au aproape aceeași funcție; oferim ambele opțiuni pentru comoditatea dvs. Totuși, acest lucru poate provoca confuzie.

{{% notice note %}}
Utilizatorul și grupul atribuite părții care controlează sunt determinate de utilizatorul care se autentifică, nu de utilizatorul atribuit din consola web. Am proiectat sistemul astfel deoarece anumite părți controlatoare nu au ID de dispozitiv, cum ar fi clientul iOS și clientul web.
{{% /notice %}}

![](/docs/ro/self-host/rustdesk-server-pro/permissions/images/crossgrp.png)

## Setări de acces pentru grupuri de dispozitive

Grupurile de dispozitive oferă un alt mod de a gestiona permisiunile de acces. Iată regulile principale:

1. Un dispozitiv poate fi adăugat doar într‑un singur grup de dispozitive
2. Puteți seta permisiuni de acces pentru utilizatori sau grupuri de utilizatori către grupuri de dispozitive. Aceste permisiuni se cumulează cu permisiunile de acces ale grupurilor de utilizatori — accesul este acordat dacă fie permisiunile grupului de utilizatori, fie permisiunile grupului de dispozitive permit accesul
3. Când un dispozitiv neatribuit este adăugat într‑un grup de dispozitive, acesta nu mai este considerat „neatribuit”

{{% notice note %}}
Funcționalitatea grupurilor de dispozitive necesită RustDesk client >= 1.3.8 și RustDesk Server Pro >= 1.5.0
{{% /notice %}}