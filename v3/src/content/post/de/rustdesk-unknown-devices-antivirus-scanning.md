---
publishDate: 2026-06-30T13:46:00Z
lang: 'de'
translationKey: 'rustdesk-unknown-devices-antivirus-scanning'
draft: false
title: 'Unbekannte Geräte in Ihrer RustDesk-Konsole? Erst untersuchen'
excerpt: 'Unbekannte Geräte in Ihrer RustDesk-Konsole entdeckt? Antiviren-Sandboxing ist eine mögliche Erklärung – doch durchgesickerte Konfigurationen oder unautorisierte Registrierungen müssen zuerst ausgeschlossen werden.'
image: '~/assets/images/blog/rustdesk-unknown-devices-antivirus-scanning-og.webp'
category: 'Bereitstellung'
tags: ['RustDesk', 'Bereitstellung', 'Sicherheit']
author: 'RustDesk Team'
slug: 'unbekannte-gerate-in-ihrer-rustdesk-konsole-erst-untersuchen'
faq:
  - question: 'Warum erscheinen unbekannte Geräte in meiner RustDesk-Konsole, die ich nie installiert habe?'
    answer: 'Antiviren- oder Endpoint-Protection-Sandboxing kann vorübergehende Registrierungen erzeugen, aber ein unbekanntes Gerät kann auch auf durchgesickerte Konfigurationen, ein offengelegtes Deployment-Token, eine unautorisierte Registrierung oder einen Deployment-Fehler hinweisen. Behandeln Sie es als Sicherheitsvorfall, bis Protokolle, Zugangsdaten, Schlüssel, Token und Rollout-Aufzeichnungen die Ursache identifizieren; schränken Sie anschließend die Registrierung neuer Geräte ein.'
  - question: 'Wie verhindere ich vollständig, dass sich unbekannte Geräte registrieren?'
    answer: 'Wenn Ihre Geräteliste stabil ist und Sie nicht regelmäßig neue Rechner hinzufügen, deaktivieren Sie die Registrierung neuer Geräte in der Konsole unter Einstellungen → Sonstiges → Neue Geräte in der Webkonsole deaktivieren. Danach kann sich nichts Neues mehr registrieren, weder aus einer Sandbox noch anderweitig. Wenn Sie weiterhin regelmäßig Geräte einbinden, verwenden Sie stattdessen ein Deployment-Token, damit reale Rollouts weiterhin funktionieren.'
  - question: 'Wie schreibe ich ein Deployment-Token für neue Geräte vor?'
    answer: 'Aktivieren Sie in der Webkonsole Einstellungen → Sonstiges → Deployment für neue Geräte erforderlich, erstellen Sie ein API-Token mit der Berechtigung „Geräte" auf „Lesen und Schreiben" und lassen Sie Ihren Installationsprozess auf jedem neuen Gerät rustdesk --deploy --token <api_token> ausführen (unter macOS und Linux mit sudo). Nur Geräte, die ein gültiges Token vorweisen, können sich registrieren, sodass sich ein Sandbox-AV-Scan nicht selbst hinzufügen kann, während Ihr RMM oder skriptgesteuertes Rollout normal weiterläuft.'
  - question: 'Wie unterscheide ich einen harmlosen AV-Scan von einem echten Einbruch?'
    answer: 'Eine kurzlebige Registrierung, die mit einem bekannten Sicherheits-Scan zusammenfällt und auf die keine weitere Sitzung folgt, kann die Sandbox-Erklärung stützen. Unerwartete Sitzungen, wiederholte Registrierungen, die Verwendung gültiger Zugangsdaten oder ein außerhalb des vorgesehenen Kanals verbreiteter, konfigurierter Client sind nicht harmlos und erfordern Incident-Response-Maßnahmen.'

metadata:
  description: 'Unbekannte Geräte in Ihrer RustDesk-Konsole erfordern eine Untersuchung. Erfahren Sie, wie Sie Antiviren-Sandboxing von durchgesickerten Konfigurationen oder unautorisierten Registrierungen unterscheiden.'
  keywords: 'rustdesk unbekanntes gerät, rustdesk phantomgerät, rustdesk zufällige geräteregistrierung, rustdesk antivirus-sandbox, neue geräte deaktivieren rustdesk, rustdesk --deploy'
---

Ein unbekanntes Gerät in der RustDesk-Konsole reicht allein nicht aus, um die Ursache zu bestimmen. Antiviren-Sandboxing ist eine bekannte Möglichkeit, doch dasselbe Symptom kann auch durch durchgesickerte Konfigurationen, unautorisierte Registrierungen, ein offengelegtes Token oder einen Fehler beim Deployment entstehen.

## Die kurze Antwort

Manche AV-/EDR-Produkte führen unbekannte Binärdateien in Cloud-Sandboxes aus. Wenn eine Sandbox einen Client-Build erhält, der Ihre Serverkonfiguration enthält, und den ID-Server erreichen kann, registriert sie sich möglicherweise kurzzeitig. Eine IP-Adresse eines Cloud-Anbieters oder ein ungewöhnlicher Hardware-Name beweist diese Erklärung jedoch **nicht** – auch Angreifer nutzen Cloud-Hosts. Sichern und prüfen Sie die Beweise, bevor Sie den Vorfall abtun.

## Im Detail

### Warum das passiert

RustDesk-Clients registrieren sich beim konfigurierten ID-/Rendezvous-Server, sobald sie ausgeführt werden und diesen erreichen können. Das macht eine Sandbox-Ausführung zu einer plausiblen Ursache, wie in einem öffentlichen [GitHub-Thread](https://github.com/rustdesk/rustdesk-server-pro/discussions/307) diskutiert wird – es bedeutet aber auch, dass jeder, der einen konfigurierten Client oder gültiges Deployment-Material erhält, eine ähnliche Registrierung erzeugen kann.

Bevor Sie den Vorfall einordnen, prüfen Sie die Registrierungs- und Verbindungsprotokolle des Servers, den Zeitpunkt der ersten Erkennung und die Quell-IP des Geräts, die Deployment-Aufzeichnungen sowie den Verteilungsweg für individuelle Clients. Erneuern Sie gegebenenfalls offengelegte Passwörter, API-/Deployment-Token sowie Serverkonfiguration oder Schlüssel. Prüfen Sie, ob dieselben Zugangsdaten anderswo wiederverwendet wurden und ob das unbekannte Gerät eine Sitzung versucht oder abgeschlossen hat.

### So stoppen Sie es

Zwei Konsoleneinstellungen lösen dieses Problem – welche davon passt, hängt davon ab, ob Sie noch aktiv neue, echte Geräte einbinden.

**Option 1 – Registrierung neuer Geräte vollständig deaktivieren.** Wenn Ihre Geräteliste im Wesentlichen stabil ist und Sie nicht regelmäßig neue Rechner hinzufügen, ist dies die einfachste Lösung: Gehen Sie zu **Einstellungen → Sonstiges → Neue Geräte in der Webkonsole deaktivieren**. Danach kann sich überhaupt nichts Neues mehr registrieren, weder aus einer Sandbox noch anderweitig.

**Option 2 – ein Deployment-Token voraussetzen.** Wenn Sie weiterhin regelmäßig neue Geräte ausrollen (ein MSP, der Kunden einbindet, ein IT-Team, das neue Rechner aufsetzt), steht Ihnen eine pauschale Einstellung „neue Geräte deaktivieren“ nur im Weg. Aktivieren Sie stattdessen **Einstellungen → Sonstiges → Deployment für neue Geräte erforderlich**, erstellen Sie ein API-Token (Berechtigung „Geräte“, Lesen und Schreiben) und lassen Sie Ihren Installationsprozess den dokumentierten [Deployment-Befehl](https://rustdesk.com/docs/en/self-host/client-deployment/#explicit-deployment-for-new-devices) auf jedem Gerät ausführen:

```
rustdesk --deploy --token <api_token>
```

Das genaue Flag kann sich zwischen den Releases ändern; verstehen Sie dies daher als Beispiel und prüfen Sie die aktuelle Syntax in der RustDesk-Server-Pro-Dokumentation, bevor Sie es in ein Skript einbauen. Nur ein Gerät, das ein gültiges Token vorweist, wird zu Ihrem Bestand hinzugefügt. Ein Sandbox-AV-Scan – der dieses Token weder kennen noch angeben kann – scheitert bei der Registrierung, während Ihr eigentliches Rollout normal weiterläuft. Auf diesem Weg binden MSPs Geräte auch über RMM oder eine skriptgesteuerte Installation ein, ohne dass sich ein Techniker manuell auf jedem Rechner anmelden muss.

**Eine verwandte, engere Kontrolle:** Wenn Sie die Registrierung lieber offen lassen, aber nicht zugewiesene Geräte einfach so lange aus dem Blickfeld halten möchten, bis Sie sie geprüft haben, gibt es außerdem **Einstellungen → Sonstiges → Nur Administratoren können auf nicht zugewiesene Geräte zugreifen** – dies stoppt die Registrierung nicht, sorgt aber dafür, dass reguläre Benutzer nichts sehen oder anfassen können, was auftaucht, bevor Sie die Möglichkeit hatten, es sich anzusehen.

### So bewerten Sie das Ergebnis

Eine Registrierung allein beweist nicht, dass ein Angreifer einen anderen Endpunkt kontrolliert hat, aber sie bleibt eine unautorisierte Aktivität, bis sie erklärt ist. Eine kurzlebige Registrierung, die mit einem bekannten Sicherheits-Scan zusammenfällt und bei der keine weiteren Zugriffe erfolgen, kann die Sandbox-Hypothese stützen. Unerwartete Sitzungen, wiederholte Registrierungen, die Verwendung gültiger Zugangsdaten oder die Verbreitung eines konfigurierten Clients außerhalb des vorgesehenen Kanals erfordern Incident-Response-Maßnahmen.

## Wer stellt diese Frage

Neue Server-Betreiber – sowohl IT-Administratoren als auch MSPs – stoßen häufig innerhalb weniger Tage nach der Einrichtung eines selbst gehosteten Servers darauf, bevor die Registrierungskontrollen verschärft wurden. Eine frühzeitige Untersuchung ist wichtig, da harmlose Scans und unautorisierte Registrierungen in der Konsole ähnlich aussehen können.

## Verwandte Fragen

- Einen individuell gebrandeten Client erstellen: siehe die [RustDesk-Dokumentation](https://rustdesk.com/docs).
- [Was zählt in RustDesk als verwaltetes Gerät?](/de/blog/was-zahlt-als-verwaltetes-gerat-bei-rustdesk)
- [Aktuelle RustDesk-Releases und Sicherheitskorrekturen ansehen](https://github.com/rustdesk/rustdesk/releases)
- [RustDesk für MSPs: ein selbst gehostetes, brandingfähiges Tool](/de/blog/rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool)
  Sehen Sie ein Gerät, das Sie nicht erkennen? Sichern Sie die relevanten Protokolle, schränken Sie die Registrierung neuer Geräte ein, erneuern Sie potenziell offengelegte Geheimnisse und wenden Sie sich bei anhaltender Unklarheit über die Ursache mit nicht sensiblen Diagnosedaten an den RustDesk-Support.
