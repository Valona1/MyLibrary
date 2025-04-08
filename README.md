# MyLibrary App

Willkommen zu meiner Mobile-App **MyLibrary** – einer App zum Verwalten von persönlichen Büchern.  
Die App wurde im Rahmen des Moduls 335 entwickelt.

## MyLibrary App Download

Lade dir die APK-Datei direkt herunter und installiere sie auf deinem Android-Gerät:

[Download APK](https://github.com/Valona1/MyLibrary/blob/main/apk/MyLibrary.apk)

## Funktionen

- Bücher hinzufügen mit Titel, Autor und Lesestatus
- Lesestatus filtern: *Will ich lesen*, *Lese ich gerade*, *Fertig gelesen*
- Bewertungssystem für gelesene Bücher (1–5 Sterne)
- Buch löschen oder Status ändern per Modal
- Animation beim Hinzufügen eines Buches
- Leseerinnerung als lokale Mitteilung aktivierbar
- Benutzeroberfläche im modernen, aufgeräumten Design

## Technischer Aufbau

Die App wurde mit **React Native** und **Expo** entwickelt. Die Datenhaltung erfolgt lokal über `AsyncStorage`. Die Struktur folgt einer klaren **Schichtentrennung**:

- **models/** → Datenmodell `Book`
- **lib/** → Businesslogik & lokale Speicherung (`bookStorage.ts`, `notifications.ts`)
- **app/** → Views / Screens (`index.tsx`, `add.tsx`, `settings.tsx`)
- **assets/** → Icons, Fonts

## Voraussetzungen

- Benachrichtigungen müssen in den Geräteeinstellungen erlaubt sein
- Funktioniert mit Expo Go

## Entwicklerin

Valona – Informatikerin EFZ, 3. Lehrjahr  
Modul 335 – Mobile Applikation realisieren  
Abgabedatum: 08.04.2025