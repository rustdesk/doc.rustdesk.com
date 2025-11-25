---
title: Mac
weight: 3
---

## Instalare

Deschideți fișierul .dmg și trageți `RustDesk` în `Applications` după cum se arată mai jos.

![](/docs/en/client/mac/images/dmg.png)

Asigurați-vă că ați închis toate instanțele RustDesk care rulează. De asemenea, închideți serviciul RustDesk care apare în bara de sistem (tray).

![](/docs/en/client/mac/images/tray.png)

## Permiteți rularea RustDesk

| Deblocați pentru a modifica | Faceți clic pe `App Store and identified developers` |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

## Activarea permisiunilor

{{% notice note %}}
Din cauza unei schimbări în politica de securitate a macOS, API-ul nostru care capturează input-ul local nu mai funcționează implicit. Trebuie să activați permisiunea „Input Monitoring” (Monitorizare intrare) pe Mac-ul local.
Vă rugăm să urmați această discuție: [https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923).

În versiunea 1.2.4 puteți încerca `Input source 2`, vizibil făcând clic pe pictograma tastaturii din bara de instrumente.
{{% /notice %}}

Pentru a captura ecranul, trebuie să acordați RustDesk permisiunile **Accessibility** și **Screen Recording**. RustDesk vă va ghida către fereastra de setări.

| Fereastra RustDesk | Fereastra de setări |
| --- | --- |
| ![](/docs/en/client/mac/images/acc.png) | ![](/docs/en/client/mac/images/acc3.png?v2) |

Dacă ați activat permisiunile în fereastra de setări, dar RustDesk încă afișează avertismente, eliminați `RustDesk` din fereastra de setări folosind butonul `-`, apoi apăsați `+` și selectați `RustDesk` din `Applications`.

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
Alte încercări neajutorătoare: <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
Este posibil să fie necesară repornirea sistemului.
{{% /notice %}}

| Butonul `-` și `+` | Selectați `RustDesk` |
| --- | --- |
| ![](/docs/en/client/mac/images/acc2.png) | ![](/docs/en/client/mac/images/add.png?v2) |

Vă rugăm să repetați pașii de mai sus și pentru permisiunea **Screen Recording**.

![](/docs/en/client/mac/images/screen.png?v2)