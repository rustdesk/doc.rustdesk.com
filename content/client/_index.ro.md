---
title: Client RustDesk
weight: 2
pre: "<b>1. </b>"
---

## Introducere
Clientul RustDesk este folosit pe dispozitive pentru a se conecta prin intermediul serverului RustDesk, fie open source, fie Pro. Este disponibil pentru descărcare pe [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).

## Platforme suportate
- Microsoft Windows
- macOS
- Derivate Debian (Ubuntu ≥ 16, Linux Mint etc.)
- Derivate Red Hat (CentOS, Fedora ≥ 18, Rocky Linux etc.)
- Arch Linux / Manjaro
- openSUSE
- NixOS
- AppImage / Flatpak
- Android
- iOS (nu suportă controlul)
- Web

## Instalare

### Windows

Descărcați fișierul .exe de pe GitHub și instalați.

Pentru instalare silențioasă, rulați executabilul de instalare cu `--silent-install`.

### macOS

Descărcați fișierul .dmg de pe GitHub; mai multe informații găsiți pe [pagina macOS](https://rustdesk.com/docs/en/client/mac/).

Deschideți fișierul .dmg și trageți `RustDesk` în `Applications`.

Permiteți rularea RustDesk.

Activați permisiunile solicitate și urmați solicitările din partea stângă a ferestrei RustDesk pentru a finaliza configurarea.

### Linux

Vă rugăm să consultați instrucțiunile de mai jos pentru diferitele „arome” de Linux (instalatoarele sunt pe GitHub sau pot fi disponibile din depozitul distribuției).

#### Derivate Debian

```sh
# vă rugăm să ignorați raportul incorect de utilizare a discului
sudo apt install -fy ./rustdesk-<version>.deb
```

#### Derivate Red Hat

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

#### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

#### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

#### Nix / NixOS (≥ 22.05)

Intrați temporar într-un shell care are `rustdesk` gata de rulat:

```sh
nix shell nixpkgs#rustdesk
```

Instalați în profilul utilizatorului curent:

```sh
nix profile install nixpkgs#rustdesk
```

Pentru a instala la nivel de sistem în NixOS rulați `nixos-rebuild switch --flake /etc/nixos` după ce modificați `configuration.nix`:

```
	environment.systemPackages = with pkgs; [
		...
		rustdesk
	];
```

### Android
Instalați APK-ul din GitHub; mai multe informații găsiți pe [pagina Android](https://rustdesk.com/docs/en/client/android/).

### iOS (iPhone, iPad)
Descărcați aplicația din [App Store](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015).

## Utilizare
Odată instalat (sau rulat ca executabil temporar), RustDesk se va conecta la serverele publice. Veți vedea un mesaj în partea de jos care spune (1) „Ready, For faster connection, please set up your own server”. În partea stângă sus veți vedea (2) ID-ul, (3) parola de o singură utilizare și în dreapta un (4) câmp pentru a vă conecta la un alt calculator dacă cunoașteți ID-ul acestuia.

![](/docs/en/client/images/client.png)

Pentru a accesa setările, faceți clic pe butonul (5) Meniu [ &#8942; ] din dreapta ID-ului.

În Setări veți găsi:
- General – Controlul serviciului, Temă, Hardware Codec, Audio, Înregistrare și Limbă
- Securitate – Permisiuni pentru preluarea controlului, opțiuni de parolă, posibilitatea de a schimba ID-ul și Setări Avansate de Securitate
- Rețea – Aici configurați setările propriului server și proxy-ul
- Afișare – Controlați setările de afișare pentru sesiunile la distanță și alte opțiuni implicite, sincronizarea clipboard-ului etc.
- Cont – Poate fi folosit împreună cu Serverul Pro pentru autentificare în API
- Despre – Afișează informații despre software.

## Configurarea RustDesk
Există mai multe modalități de a configura RustDesk.

Cea mai simplă metodă este folosind RustDesk Server Pro: puteți obține un șir de configurare criptat, care poate fi folosit împreună cu `--config` pentru a importa setările. Pentru a face acest lucru:
1. Deschideți linia de comandă pe sistemul de operare pe care îl folosiți, în folderul unde este instalat RustDesk, de ex. `C:\Program Files\RustDesk` pe Windows sau `/usr/bin` pe Linux.
2. Folosiți comanda `rustdesk.exe --config your-encrypted-string`, ex. `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`.

Puteți configura manual un client. Pentru aceasta:
1. Faceți clic pe Setări.
2. Faceți clic pe Rețea.
3. Faceți clic pe Deblocați setările de rețea.
4. Introduceți ID-ul, Relay, API (dacă folosiți server Pro) și cheia.

![](/docs/en/client/images/network-settings.png)

Dacă configurați manual un client, puteți prelua fișierul `RustDesk2.toml` (din folderul utilizatorului) și folosiți `--import-config` într-un mod similar cu exemplul de mai sus.

## Parametri linie de comandă
- `--password` poate fi folosit pentru a seta o parolă permanentă.
- `--get-id` poate fi folosit pentru a obține ID-ul.
- `--set-id` poate fi folosit pentru a seta un ID; rețineți că ID-urile ar trebui să înceapă cu o literă.
- `--silent-install` poate fi folosit pentru a instala RustDesk silențios pe Windows.

Parametrii avansați suplimentari pot fi găsiți [aici](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242).

{{% children depth="3" showhidden="true" %}}