---
title: Kontrollrolle
weight: 18
---

Die Kontrollrolle ermöglicht es Ihnen, Fernsteuerungsberechtigungen für verschiedene Benutzer zu konfigurieren. Wenn ein Benutzer ein anderes Gerät fernsteuert, definiert die Kontrollrolle, welche Operationen der steuernde Benutzer nach dem Verbindungsaufbau ausführen darf.

{{% notice note %}}
**Kontrollrolle vs Zugriffskontrolle vs Strategie**

- **Kontrollrolle**: Bestimmt, welche Operationen der steuernde Benutzer nach dem Verbindungsaufbau ausführen darf.
- **Zugriffskontrolle**: Bestimmt, ob eine Verbindung zwischen dem steuernden und dem gesteuerten Gerät hergestellt werden kann.
- **Strategie**: Ändert Einstellungen auf dem gesteuerten Gerät.
{{% /notice %}}

## Anforderungen

- Gesteuertes Gerät: RustDesk **1.4.5** oder höher (Android-gesteuerte Geräte werden noch nicht unterstützt)
- Steuerndes Gerät: Keine Versionsanforderung

## Berechtigungsberechnung

### Wie Berechtigungen funktionieren

Kurz gesagt: Kontrollberechtigungen haben Vorrang vor lokalen Einstellungen.

Es gibt zwei Quellen für Berechtigungseinstellungen:

- **Lokale Einstellungen auf der gesteuerten Seite**: Die Einstellungen des gesteuerten Geräts (Einstellungen → Sicherheit → Berechtigungen)
- **Kontrollberechtigung**: Die Kontrollrollenberechtigungen des steuernden Benutzers (in der Webkonsole konfiguriert)

Jede Berechtigung hat drei Zustände:

- **Client-Einstellungen verwenden**: Keine Überschreibung, die lokale Einstellung des gesteuerten Geräts verwenden
- **Aktivieren**: Diese Berechtigung explizit aktivieren (überschreibt lokale Einstellung)
- **Deaktivieren**: Diese Berechtigung explizit deaktivieren (überschreibt lokale Einstellung)

Berechtigungen werden auf Sitzungsebene berechnet:

| Kontrollberechtigung | Lokale Einstellungen | Ergebnis |
|---|---|---|
| Aktivieren | Aktivieren | Aktivieren |
| Aktivieren | Deaktivieren | **Aktivieren** |
| Deaktivieren | Aktivieren | **Deaktivieren** |
| Deaktivieren | Deaktivieren | Deaktivieren |
| Client-Einstellungen verwenden | Aktivieren | Aktivieren |
| Client-Einstellungen verwenden | Deaktivieren | Deaktivieren |

**Sonderfall: Remote-Konfigurationsänderung**

Wenn mehrere steuernde Benutzer mit demselben Gerät verbunden sind, wird die Berechtigung "Remote-Konfigurationsänderung" über alle Verbindungen berechnet:

| Kontrollberechtigung aller Verbindungen | Ergebnis |
|---|---|
| Irgendeine Deaktivieren | **Deaktivieren** |
| Keine Deaktivieren, irgendeine Aktivieren | **Aktivieren** |
| Alle Client-Einstellungen verwenden | Lokale Einstellung verwenden |

### Welche Rolle gilt

Jedem Benutzer kann nur eine Kontrollrolle zugewiesen werden. Es gibt zwei integrierte Rollen:

| Rolle | Beschreibung |
|------|-------------|
| **Nicht angemeldet** | Für steuernde Benutzer, die nicht angemeldet sind. Kann Benutzern nicht zugewiesen werden. |
| **Standard** | Für angemeldete steuernde Benutzer ohne zugewiesene Kontrollrolle oder die explizit der Standardrolle zugewiesen sind. |

Die angewendete Kontrollrolle hängt vom Anmeldestatus und der Rollenzuweisung des steuernden Benutzers ab:

| Status des steuernden Benutzers | Zugewiesene Rolle | Rolle / Rollenstatus | Angewendete Kontrollrolle |
|---|---|---|---|
| Nicht angemeldet | - | Nicht angemeldet / Aktiviert | Nicht angemeldet |
| Nicht angemeldet | - | Nicht angemeldet / Deaktiviert | - |
| Angemeldet | Hat zugewiesene Rolle | Zugewiesene Rolle / Aktiviert | Zugewiesene Rolle |
| Angemeldet | Hat zugewiesene Rolle | Zugewiesene Rolle / Deaktiviert | - |
| Angemeldet | Keine zugewiesene Rolle | Standard / Aktiviert | Standard |
| Angemeldet | Keine zugewiesene Rolle | Standard / Deaktiviert | - |

## Verfügbare Berechtigungen

Die 12 steuerbaren Berechtigungen entsprechen den Einstellungen des gesteuerten Geräts → Sicherheit → Berechtigungen:

- Tastatur/Maus
- Remote-Drucker
- Zwischenablage
- Dateiübertragung
- Audio
- Kamera
- Terminal
- TCP-Tunnel
- Remote-Neustart
- Sitzungsaufzeichnung
- Benutzereingabe blockieren
- Remote-Konfigurationsänderung

## Konsolenoperationen

### Rolle erstellen

1. Navigieren Sie zur Seite **Kontrollrollen** und klicken Sie auf **Erstellen**
2. Geben Sie einen **Namen** für die Rolle ein
3. Wählen Sie die zu gewährenden **Berechtigungen**

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-create-permission.png)

### Rollenzuweisung

Es gibt zwei Möglichkeiten, Benutzern Kontrollrollen zuzuweisen:

1. **Benutzerseite** → Klicken Sie auf **Bearbeiten** bei einem Benutzer → Wählen Sie eine Rolle im Feld **Kontrollrolle**
2. **Kontrollrollenseite** → Klicken Sie auf die **Benutzeranzahl** oder **Benutzer zuweisen** → Benutzer zur Rolle hinzufügen oder entfernen

![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/control-role/images/control-role-assign-role-page.png)

{{% notice note %}}
Die Rolle "Nicht angemeldet" kann Benutzern nicht zugewiesen werden (sie gilt nur für nicht angemeldete Verbindungen).
{{% /notice %}}
