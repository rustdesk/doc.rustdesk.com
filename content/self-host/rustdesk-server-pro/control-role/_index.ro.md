---
title: Rol de Control
weight: 18
---

Rolul de Control vă permite să configurați permisiunile de control la distanță pentru diferiți utilizatori. Când un utilizator controlează de la distanță un alt dispozitiv, Rolul de Control definește ce operațiuni poate efectua utilizatorul care controlează după ce o conexiune este stabilită.

{{% notice note %}}
**Rol de Control vs Control Acces vs Strategie**

- **Rol de Control**: Determină ce operațiuni poate efectua utilizatorul care controlează după ce o conexiune este stabilită.
- **Control Acces**: Determină dacă o conexiune poate fi stabilită între dispozitivele care controlează și cele controlate.
- **Strategie**: Modifică setările pe dispozitivul controlat.
{{% /notice %}}

## Cerințe

- Dispozitiv controlat: RustDesk **1.4.5** sau superior (dispozitivele Android controlate nu sunt încă suportate)
- Dispozitiv care controlează: Fără cerințe de versiune

## Calculul Permisiunilor

### Cum Funcționează Permisiunile

Pe scurt: Permisiunile de control au prioritate față de setările locale.

Există două surse de setări ale permisiunilor:

- **Setări locale pe partea controlată**: Setările dispozitivului controlat (Setări → Securitate → Permisiuni)
- **Permisiune de Control**: Permisiunile Rolului de Control ale utilizatorului care controlează (configurate în consola web)

Fiecare permisiune are trei stări:

- **Utilizează Setările Clientului**: Fără suprascriere, utilizează setarea locală a dispozitivului controlat
- **Activează**: Activează explicit această permisiune (suprascrie setarea locală)
- **Dezactivează**: Dezactivează explicit această permisiune (suprascrie setarea locală)

Permisiunile sunt calculate la nivel de sesiune:

| Permisiune de Control | Setări Locale | Rezultat |
|---|---|---|
| Activează | Activează | Activează |
| Activează | Dezactivează | **Activează** |
| Dezactivează | Activează | **Dezactivează** |
| Dezactivează | Dezactivează | Dezactivează |
| Utilizează Setările Clientului | Activează | Activează |
| Utilizează Setările Clientului | Dezactivează | Dezactivează |

**Caz special: Modificare Configurație la Distanță**

Când mai mulți utilizatori care controlează sunt conectați la același dispozitiv, permisiunea "Modificare Configurație la Distanță" este calculată pentru toate conexiunile:

| Permisiunea de Control a Tuturor Conexiunilor | Rezultat |
|---|---|
| Oricare Dezactivează | **Dezactivează** |
| Niciuna Dezactivează, Oricare Activează | **Activează** |
| Toate Utilizează Setările Clientului | Utilizează setarea locală |

### Ce Rol se Aplică

Fiecărui utilizator i se poate atribui un singur Rol de Control. Există două roluri integrate:

| Rol | Descriere |
|------|-------------|
| **Neconectat** | Pentru utilizatorii care controlează și nu sunt conectați. Nu poate fi atribuit utilizatorilor. |
| **Implicit** | Pentru utilizatorii conectați care controlează și nu au un Rol de Control atribuit, sau sunt explicit atribuiți rolului Implicit. |

Rolul de Control aplicat depinde de starea de conectare a utilizatorului care controlează și atribuirea rolului:

| Starea Utilizatorului care Controlează | Rol Atribuit | Rol / Stare Rol | Rol de Control Aplicat |
|---|---|---|---|
| Neconectat | - | Neconectat / Activat | Neconectat |
| Neconectat | - | Neconectat / Dezactivat | - |
| Conectat | Are rol atribuit | Rol atribuit / Activat | Rol atribuit |
| Conectat | Are rol atribuit | Rol atribuit / Dezactivat | - |
| Conectat | Fără rol atribuit | Implicit / Activat | Implicit |
| Conectat | Fără rol atribuit | Implicit / Dezactivat | - |

## Permisiuni Disponibile

Cele 12 permisiuni controlabile corespund Setărilor → Securitate → Permisiuni ale dispozitivului controlat:

- Tastatură/Mouse
- Imprimantă la Distanță
- Clipboard
- Transfer Fișiere
- Audio
- Cameră
- Terminal
- Tunel TCP
- Repornire la Distanță
- Înregistrare Sesiune
- Blochează Intrarea Utilizatorului
- Modificare Configurație la Distanță

## Operațiuni Consolă

### Crearea unui Rol

1. Navigați la pagina **Roluri de Control** și faceți clic pe **Creează**
2. Introduceți un **Nume** pentru rol
3. Selectați **Permisiunile** de acordat

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-permission.png)

### Atribuirea Rolului

Există două modalități de a atribui Roluri de Control utilizatorilor:

1. **Pagina Utilizatori** → Faceți clic pe **Editare** la un utilizator → Selectați un rol în câmpul **Rol de Control**
2. **Pagina Roluri de Control** → Faceți clic pe **numărul de utilizatori** sau **Atribuie Utilizatori** → Adăugați sau eliminați utilizatori din rol

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-role-page.png)

{{% notice note %}}
Rolul "Neconectat" nu poate fi atribuit utilizatorilor (se aplică doar conexiunilor neautentificate).
{{% /notice %}}
