---
title: Berechtigungskontrolle
weight: 15
---

## Zugriffsberechtigungen für Geräte

Es gibt zwei Möglichkeiten, ein Gerät mit einem Benutzer zu verknüpfen:
- Über die Geräteseite der Konsole
- Anmeldung bei dem angegebenen Benutzerkonto auf der Client-Seite

In den folgenden beiden Fällen wird der Zugriff auf das Gerät verhindert:
- Gerät in der Konsole auf der Geräteseite `deaktivieren`
- Benutzer in der Konsole `deaktivieren`

Auf das zugehörige Gerät kann nur von den Geräten desselben Benutzers oder derselben Benutzergruppe bzw. mit den korrekten gruppenübergreifenden Einstellungen zugegriffen werden.

## Gruppenübergreifende Einstellungen

Gehen Sie bitte in der Webkonsole auf die Gruppenseite und klicken Sie auf `Bearbeiten`, um die gruppenübergreifenden Einstellungen wie unten beschrieben zu bearbeiten.

Ihre Änderungen am `Zugriff für andere Gruppen` werden sofort wirksam, ohne dass Sie auf die Schaltfläche `OK` klicken müssen.

Sowohl `Kann zugreifen auf` als auch `Kann zugegriffen werden von` dienen nahezu der gleichen Funktion, wir bieten beide Optionen für Ihren Komfort. Dies kann jedoch zu einiger Verwirrung führen.

{{% notice note %}}
Der Benutzer und die Gruppe, die der kontrollierenden Seite zugewiesen werden, werden durch den Benutzer bestimmt, der sich anmeldet, und nicht durch den Benutzer, der über die Webkonsole zugewiesen wird. Wir haben dies so konzipiert, weil bestimmte Kontrollseiten keine Geräte-ID haben, wie z. B. der iOS-Client und der Webclient.
{{% /notice %}}

![](/docs/en/self-host/pro/permissions/images/crossgrp.png)
