---
title: Zugriffskontrolle
weight: 16
---

### Zugriffsberechtigungen für Geräte
Das Gerät kann entweder einem einzelnen Benutzer, einer einzelnen Gerätegruppe oder beiden zugewiesen werden.

Wenn das Gerät einem Benutzer zugewiesen ist, kann es von diesem Benutzer, einer Benutzergruppe oder durch entsprechende gruppenübergreifende Einstellungen zugegriffen werden.

Wenn das Gerät einer Gerätegruppe zugewiesen ist, kann es über entsprechende gruppenübergreifende Geräteeinstellungen zugegriffen werden.

Es gibt drei Möglichkeiten, ein Gerät einem Benutzer zuzuweisen:
- Über die Konsolengeräteseite
- Anmeldung beim angegebenen Benutzerkonto auf der Clientseite
- Zuweisung über die Befehlszeile

Es gibt zwei Möglichkeiten, ein Gerät einer Gerätegruppe zuzuweisen:
- Über die Konsolengeräteseite
- Zuweisung über die Befehlszeile

Die folgenden zwei Situationen verhindern den Zugriff auf das Gerät:
- Gerät auf der Konsolengeräteseite `deaktivieren`
- Benutzer auf der Konsolenbenutzerseite `deaktivieren`

### Gruppenübergreifende Einstellungen

Gehen Sie bitte in der Webkonsole auf die Gruppenseite und klicken Sie auf `Bearbeiten`, um die gruppenübergreifenden Einstellungen wie unten beschrieben zu bearbeiten.

Ihre Änderungen am `Zugriff für andere Gruppen` werden sofort wirksam, ohne dass Sie auf die Schaltfläche `OK` klicken müssen.

Sowohl `Kann zugreifen auf` als auch `Kann zugegriffen werden von` dienen nahezu der gleichen Funktion, wir bieten beide Optionen für Ihren Komfort. Dies kann jedoch zu einiger Verwirrung führen.

{{% notice note %}}
Der Benutzer und die Gruppe, die der steuernden Seite zugewiesen werden, werden durch den Benutzer bestimmt, der sich anmeldet, und nicht durch den Benutzer, der über die Webkonsole zugewiesen wird. Wir haben dies so konzipiert, weil bestimmte steuernden Seiten keine Geräte-ID haben, wie z. B. der iOS-Client und der Webclient.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/permissions/images/crossgrp.png)

