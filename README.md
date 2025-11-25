# moje-zdrowie-projekt
Projekt na HackHeroes 2025 
Autorzy projektu:
Jakub Węgrzyn
Krzysztof Marszałowicz

# Moje Zdrowie — Proof of Concept (PoC)

Aplikacja mobilna stworzona w **React Native + Expo**, której celem jest ułatwienie monitorowania zdrowia użytkownika.  
Projekt przedstawia wczesny etap koncepcji (PoC), skupiony na zapisach szczepień, badań oraz podstawowych przypomnieniach.

---

## 📱 Funkcje

### ✔️ Rejestr szczepień
- pełna lista najczęściej stosowanych szczepień w Polsce,
- możliwość zapisania daty ostatniego szczepienia,
- automatyczne wyliczanie daty kolejnego terminu (jeśli dotyczy),
- kategorie: *rutynowe, zalecane, sezonowe*.

### ✔️ Rejestr badań profilaktycznych
- lista popularnych badań kontrolnych (morfologia, TSH, glukoza itd.),
- możliwość oznaczenia, kiedy wykonano ostatnie badanie,
- przypomnienia o konieczności ponownego wykonania,
- podział na: *diagnostyka podstawowa, endokrynologia, metabolizm, kardiologia, onkologia itd.*

### ✔️ Zapis danych w pamięci urządzenia
- dane użytkownika, szczepienia i badania są zapisywane przez **AsyncStorage**,
- konfiguracja wersjonowania danych (Storage Key).

### ✔️ Obsługa PIN-u aplikacji
- prosty system blokady na PIN (lokalny, offline),
- zabezpiecza dostęp do danych zdrowotnych.

---

## 🛠️ Technologie

- **Expo** (React Native)
- JavaScript / React Hooks
- AsyncStorage  
- Flexbox UI / prosty layout mobilny

---




Druga aplikacja  ma  ChatBota ze sztuczną inteligencją mającą na celu pomóc w wyborze badań lub opisać takie badania oraz ich zalety/wady i przeciwskazania.  

W repozytorium są testy takich rozwiązań "czatu" ze sztuczną inteligencją na stronie .HTML - wykorzystuje API google'a (gemini) w języku JavaScript.  
Należy wpisać token z panelu developera ai [google](https://ai.google.dev) w pole ukryte pod przyciskiem token (zobacz plik [chatbot.html](https://github.com/kamile320/moje-zdrowie-projekt/blob/main/chatbot.html))  
Token jest bezpieczny; strona działa lokalnie - w takim sensie, że token sam podajesz do swojego bota, a skrypt na stronie za pomocą gemini generuje odpowiedzi do zapytań; nigdzie on nie jest zapisywany.  
Wersja "live" pliku **chatbot.html** - [tutaj](https://kamile320.github.io/moje-zdrowie-projekt/chatbot.html)  


Co może wykorzystywać:
w proof of concept do uruchomienia tej aplikacji mobilnej uzywamy expo


Poniższa instrukcja pozwala uruchomić aplikację Moje Zdrowie na dowolnym komputerze (Windows / macOS / Linux).
Nie potrzeba emulatorów – wystarczy telefon z aplikacją Expo Go (Ios/android). 

Instalacja Node.js

React Native + Expo wymaga Node.js.

Zainstalować Node.js LTS (Long-Term Support):

https://nodejs.org/en/download

Po instalacji sprawdzić w terminalu / PowerShell:

node -v
npm -v


Jeżeli obie komendy zwracają wersję — jest OK.





Instalacja Expo CLI (narzędzia Expo)

Expo nie wymaga instalacji globalnej, ale warto doinstalować lokalne narzędzia projektowe:

npm install


Ta komenda zainstaluje wszystkie zależności z package.json:

React Native

Expo

AsyncStorage

biblioteki mobilne

itp.

UWAGA: Ten krok MUSI być wykonany w katalogu projektu:

cd moje-zdrowie
npm install




Zainstalować aplikację Expo Go na telefonie
Android:

Google Play → Expo Go

iPhone:

App Store → Expo Go

Telefon musi być w tej samej sieci Wi-Fi co komputer
(albo komputer musi mieć Internet do trybu tunnel).





4.Uruchomić projekt

W terminalu / PowerShell:

npx expo start



Jeśli QR nie działa, uruchomić w trybie tunnel

Ngrok czasem nie działa, ale to jest awaryjna metoda:

npx expo start --tunnel


To generuje link działający nawet przez różne sieci.




Przydatne komendy
Reset cache Expo
npx expo start -c

Sprawdzenie zależności Expo
npx expo doctor

