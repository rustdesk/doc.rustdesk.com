---
title: Rol de Administrator
weight: 17
---

Rolul de Administrator permite administratorilor să delege permisiuni parțiale de gestionare utilizatorilor non-administratori. Puteți defini permisiuni pentru resurse globale (precum strategii, roluri de control și clienți personalizați) precum și pentru utilizatori și dispozitive în diferite domenii.

Odată ce un Rol de Administrator este atribuit unui utilizator, acesta va vedea paginile și meniurile corespunzătoare în consola web conform permisiunilor acordate.

## Administratori vs Roluri de Administrator

- Doar administratorii pot edita Rolurile de Administrator și le pot atribui utilizatorilor.
- Administratorii nu sunt restricționați de Rolurile de Administrator, deși li se pot atribui.
- Utilizatorii non-admin nu pot edita conturile de administrator, chiar cu permisiuni globale de utilizator.

## Tipuri de Rol

Rolurile de Administrator vin în trei tipuri, fiecare cu domeniu și permisiuni diferite.

| Tip | Descriere |
|------|-------------|
| **Global** | Poate gestiona toate resursele întregii echipe |
| **Individual** | Poate gestiona doar propriile dispozitive și jurnale de audit |
| **Domeniu de Grup** | Poate gestiona utilizatori și dispozitive în grupurile specificate |

### Despre Domeniul de Grup

| Permisiuni selectate | Aplicat la |
|-------|-------------|
| **Permisiuni Utilizator** | Se aplică utilizatorilor din grupurile selectate |
| **Permisiuni Dispozitiv** | Se aplică dispozitivelor din: <ul><li>Grupuri de dispozitive selectate</li><li>Dispozitive atribuite utilizatorilor din grupurile selectate</li><li>Dispozitive neatribuite (dacă este activat)</li></ul> |

Puteți selecta doar Permisiuni Utilizator sau doar Permisiuni Dispozitiv într-un rol cu Domeniu de Grup pentru a face permisiunile și domeniul mai clare. De exemplu, selectarea doar a Permisiunilor Utilizator permite gestionarea utilizatorilor fără acces la dispozitive, în timp ce selectarea doar a Permisiunilor Dispozitiv permite gestionarea dispozitivelor prin selectarea grupurilor de utilizatori, grupurilor de dispozitive sau dispozitivelor neatribuite ca domeniu.

## Reguli de Permisiuni

### Orice Permisiune de Editare Include Permisiunea de Vizualizare Corespunzătoare

Orice permisiune de editare include automat permisiunea de vizualizare corespunzătoare.

### Permisiunea de Editare Nu Include Atribuirea

Permisiunile de editare pentru resurse permit doar editarea resurselor, nu includ permisiunea de atribuire a lor.

### Permisiunea de Vizualizare Nu Include Membrii

Permisiunile de vizualizare permit doar vizualizarea resurselor, nu includ permisiunea de vizualizare a membrilor din ele.

{{% notice note %}}
Citirea dispozitivelor pentru agendele de adrese nu este restricționată de Rolurile de Administrator. Tab-ul dispozitivelor accesibile din client este controlat doar de **Setări → Altele → Dezactivare recuperare dispozitive accesibile** în consolă și nu este restricționat nici de Rolurile de Administrator.
{{% /notice %}}

## Operațiuni Consolă

### Crearea unui Rol

1. Navigați la pagina **Roluri de Administrator** și faceți clic pe **Creare**
2. Introduceți un **Nume** pentru rol
3. Selectați un **Tip** (pentru **Domeniu de Grup**, configurați și domeniul)
4. Selectați **Permisiunile** de acordat

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-permission.png)

### Atribuirea Rolurilor

Există două moduri de a atribui Roluri de Administrator utilizatorilor:

1. **Pagina Utilizatori** → Faceți clic pe **Editare** la un utilizator → Selectați roluri în câmpul **Roluri de Administrator**
2. **Pagina Roluri de Administrator** → Faceți clic pe **numărul de utilizatori** sau **Atribuire Utilizatori** → Adăugați sau eliminați utilizatori

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-role-page.png)

{{% notice note %}}
- Un utilizator poate avea mai multe Roluri de Administrator. Permisiunile tuturor rolurilor sunt combinate.
{{% /notice %}}

## Referință Permisiuni

### Permisiuni Globale

| Permisiune | Descriere |
|------------|-------------|
| Users-View | Citire informații utilizatori. |
| Users-Create | Creare utilizatori. |
| Users-Invite | Invitare utilizatori. |
| Users-Delete | Ștergere utilizatori. |
| Users-Enable/Disable | Activare/dezactivare utilizatori. |
| Users-Edit Email | Modificare email utilizatori. |
| Users-Edit Password | Modificare parolă utilizatori. |
| Users-Edit Note | Modificare note utilizatori. |
| Users-Manage 2FA | Gestionare 2FA utilizatori. |
| Users-Force Logout | Forțare deconectare utilizatori. |
| Users-Update Group | Modificare grup utilizatori. |
| Users-Update Strategy | Modificare strategie utilizatori. |
| Users-Update Control Role | Modificare rol de control utilizatori. |
| Devices-View | Citire informații dispozitive. |
| Devices-Enable/Disable | Activare/dezactivare dispozitive. |
| Devices-Delete | Ștergere dispozitive. |
| Devices-Edit Info | Editare informații dispozitive. |
| Devices-Assign to User | Atribuire dispozitive utilizatorilor. |
| Devices-Update Group | Modificare grup dispozitive. |
| Devices-Update Strategy | Modificare strategie dispozitive. |
| User Groups-View | Citire grupuri utilizatori. |
| User Groups-Edit | Creare, editare și ștergere grupuri utilizatori. |
| Device Groups-View | Citire grupuri dispozitive. |
| Device Groups-Edit | Creare, editare și ștergere grupuri dispozitive. |
| Device Groups-Update Strategy | Modificare strategie grupuri dispozitive. |
| Audit Logs-View | Citire jurnale. |
| Audit Logs-Edit | Deconectare conexiuni active. |
| Strategies-View | Citire strategii. |
| Strategies-Edit | Creare, editare și ștergere strategii. |
| Control Roles-View | Citire roluri de control. |
| Control Roles-Edit | Creare, editare și ștergere roluri de control. |
| Custom Clients-View | Citire clienți personalizați. |
| Custom Clients-Edit | Creare, editare și ștergere clienți personalizați. |

### Permisiuni Individuale

| Permisiune | Descriere |
|------------|-------------|
| Devices-View | Citire propriile dispozitive. |
| Devices-Enable/Disable | Activare/dezactivare propriile dispozitive. |
| Devices-Delete | Ștergere propriile dispozitive. |
| Devices-Edit Info | Editare informații propriile dispozitive. |
| Devices-Update Strategy | Modificare strategie propriile dispozitive. |
| Audit Logs-View | Citire propriile jurnale. |
| Audit Logs-Edit | Deconectare propriile conexiuni. |

### Permisiuni Domeniu de Grup

| Permisiune | Descriere |
|------------|-------------|
| Users-View | Citire utilizatori din grupurile selectate. |
| Users-Create | Creare utilizatori în grupurile selectate. |
| Users-Invite | Invitare utilizatori în grupurile selectate. |
| Users-Delete | Ștergere utilizatori din grupurile selectate. |
| Users-Enable/Disable | Activare/dezactivare utilizatori din grupurile selectate. |
| Users-Edit Email | Modificare email utilizatori din grupurile selectate. |
| Users-Edit Password | Modificare parolă utilizatori din grupurile selectate. |
| Users-Edit Note | Modificare note utilizatori din grupurile selectate. |
| Users-Manage 2FA | Gestionare 2FA utilizatori din grupurile selectate. |
| Users-Force Logout | Forțare deconectare utilizatori din grupurile selectate. |
| Users-Update Strategy | Modificare strategie utilizatori din grupurile selectate. |
| Users-Update Control Role | Modificare rol de control utilizatori din grupurile selectate. |
| Devices-View | Citire dispozitive gestionate de rol. |
| Devices-Enable/Disable | Activare/dezactivare dispozitive gestionate de rol. |
| Devices-Delete | Ștergere dispozitive gestionate de rol. |
| Devices-Edit Info | Editare informații dispozitive gestionate de rol. |
| Devices-Update Strategy | Modificare strategie dispozitive gestionate de rol. |
