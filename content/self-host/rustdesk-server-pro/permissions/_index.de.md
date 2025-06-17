---
title: Zugriffskontrolle
weight: 16
---

## Zugriffsberechtigungen für Geräte

Das Gerät kann entweder einem einzelnen Benutzer, einer einzelnen Gerätegruppe oder beiden zugewiesen werden.

Wenn das Gerät einem Benutzer zugewiesen ist, kann von diesem Benutzer, einer Benutzergruppe oder durch entsprechende gruppenübergreifende Einstellungen darauf zugegriffen werden.

Wenn das Gerät einer Gerätegruppe zugewiesen ist, kann über entsprechende Benutzer-Gerätegruppen-übergreifende Einstellungen darauf zugegriffen werden.

Es gibt drei Möglichkeiten, ein Gerät einem Benutzer zuzuweisen:
- Über die Konsolengeräteseite
- Anmeldung beim angegebenen Benutzerkonto auf der Clientseite
- Zuweisungsbefehlszeile
  
Es gibt zwei Möglichkeiten, ein Gerät einer Gerätegruppe zuzuweisen:
- Über die Konsolengeräteseite
- Zuweisungsbefehlszeile

Die folgenden zwei Situationen verhindern den Zugriff auf das Gerät:
- Gerät auf der Konsolengeräteseite `deaktivieren`
- Benutzer auf der Konsolenbenutzerseite `deaktivieren`

## Benutzergruppen-Zugriffseinstellungen

Gehen Sie bitte in der Webkonsole auf die Gruppenseite und klicken Sie auf `Bearbeiten`, um die gruppenübergreifenden Einstellungen wie unten beschrieben zu bearbeiten.

Ihre Änderungen an `Zugriff mit anderen Gruppen` werden sofort wirksam, ohne dass Sie auf die Schaltfläche `OK` klicken müssen.

Sowohl `Kann zugreifen auf` als auch `Kann zugegriffen werden von` erfüllen nahezu die gleiche Funktion, wir bieten beide Optionen für Ihre Bequemlichkeit. Dies kann jedoch zu einiger Verwirrung führen.

{{% notice note %}}
Der Benutzer und die Gruppe, die der steuernden Seite zugewiesen werden, werden durch den Benutzer bestimmt, der sich anmeldet, und nicht durch den Benutzer, der über die Webkonsole zugewiesen wird. Wir haben dies so konzipiert, weil bestimmte steuernde Seiten keine Geräte-ID haben, wie z. B. der iOS-Client und der Webclient.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/permissions/images/crossgrp.png)

## Gerätegruppen-Zugriffseinstellungen

Gerätegruppen bieten eine weitere Möglichkeit, Zugriffsberechtigungen zu verwalten. Hier sind die wichtigsten Regeln:

1. Ein Gerät kann nur zu einer Gerätegruppe hinzugefügt werden
2. Sie können Zugriffsberechtigungen für Benutzer oder Benutzergruppen zu Gerätegruppen festlegen. Diese Berechtigungen sind kumulativ mit den Benutzergruppen-Zugriffsberechtigungen - das bedeutet, dass der Zugriff gewährt wird, wenn entweder die Benutzergruppenberechtigungen oder die Gerätegruppenberechtigungen dies erlauben
3. Wenn ein nicht zugewiesenes Gerät zu einer Gerätegruppe hinzugefügt wird, gilt es nicht mehr als "nicht zugewiesen"

{{% notice note %}}
Die Gerätegruppen-Funktion erfordert RustDesk Client >= 1.3.8 und RustDesk Server Pro >= 1.5.0
{{% /notice %}}