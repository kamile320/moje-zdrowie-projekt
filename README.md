# moje-zdrowie-projekt
Projekt na HackHeroes 2025 


# Aplikacja "Moje Zdrowie"
Projekt ma na celu stworzenie aplikacji mobilnej na iOS/Android (lub w przyszłości aplikacji dla komputerów) działającej jak kalendarz badań, która po wprowadzeniu danych o zdrowiu i kondycji użytkownika będzie proponować zalecane badania, szczepienia, testy w odpowiednich dawkach i odstępach czasowych; możliwa integracja z kalendarzem.  
Aplikacja mogłaby też posiadać ChatBota ze sztuczną inteligencją mającą na celu pomóc w wyborze badań lub opisać takie badania oraz ich zalety/wady i przeciwskazania.  

W repozytorium są testy takich rozwiązań "czatu" ze sztuczną inteligencją na stronie .HTML - wykorzystuje API google'a (gemini) w języku JavaScript.  
Należy wpisać token z panelu developera ai [google](https://ai.google.dev) w pole ukryte pod przyciskiem token (zobacz plik [chatbot.html](https://github.com/kamile320/moje-zdrowie-projekt/blob/main/chatbot.html))  
Token jest bezpieczny; strona działa lokalnie - w takim sensie, że token sam podajesz do swojego bota, a skrypt na stronie za pomocą gemini generuje odpowiedzi do zapytań; nigdzie on nie jest zapisywany.  
Wersja "live" pliku **chatbot.html** - [tutaj](https://kamile320.github.io/moje-zdrowie-projekt/chatbot.html)  


# Bonus - Chatbot doradzający w wyborze kierunku edukacji lub zawodu.
1) (Opcja bez chatbota ai) Aplikacja lub strona www - na poczatku tworzy profil użytkownika - należy wypełnić formularz sprawdzający predyspozycje zawodowe i na tej podstawie
   sztuczna inteligencja podpowie kierunki i szkoły które można wybrać podczas rekrutacji do szkół, lub podpowie do jakiej pracy użytkownik powinien się "kierowac".
2) (ChatBot AI) Aplikacja lub strona www - tworzenie użytkownika dla zapisywania danych związanych z predyspozycją zawodową; byłby chat z ai (podane odpowiednie instrukcje),
   rozmowa by polegała na pytaniach związanych z predyspozycją zawodową, zainteresowaniami, chęcią w rozwoju w danych kierunkach/zawodach itp. w celu zaproponowania danych kierunków
   edukacji lub zawodu.

Co może wykorzystywać:
- mysql
- php
- gemini (własny token do google'a; skrypt w JS)
- wszystkie dane użytkownika są anonimowe i lokalnie przechowywane
- działa na bazie [chatbot.html](https://github.com/kamile320/moje-zdrowie-projekt/blob/main/chatbot.html)
