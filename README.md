# Aplikacja do nauki sylogistyki
![Test](https://github.com/estwestminimu/python-projekt/actions/workflows/main.yml/badge.svg)

 **Aplikacja do nauki sylogistyki**

## Autorzy: Szymon Tomaszewski i Jakub Figura

## Czym jest sylogistyka? 

Sylogistyka to rachunek logiczny, który umożliwia formalną analizę poprawności wnioskowania. Jest to jeden z najprostszych rachunków logicznych, którego podwaliny stworzył Arystoteles. 
Sylogistyka bada relacje pomiędzy zdaniami kategorycznymi. Zdania tego rodzaju cechują się budową o strukturze podmiotowo-orzecznikowej. Tradycyjnie podmiot zdania oznacza się literą S (łac. subiectum), natomiast orzecznik literą P (łac. predicatum). W tradycyjnej sylogistyce wyróżniamy 4 rodzaje zdań kategorycznych: zdania ogólno-twierdzące (oznaczane przez literą a), zdanie ogólno-przeczące (litera e), zdania szczegółowo-twierdzące (litera i), oraz zdanie szczegółowo-przeczące (litera o). Zdanie kategoryczne przyjmują następujące postaci: SaP, SeP, SiP, SoP. Litery S oraz P stanowią tutaj zmienne, pod które można podstawiać wyrażenia będące nazwami. Zdanie te oznaczają odpowiednio: 

SaP: „Każde S jest P” 
SeP: „Żadne S nie są P” 
SiP: „Niektóre S są P” 
SoP: „Niektóre S nie są P” 

Rozumowania sylogistyczne składają się z dwóch przesłanek oraz wniosku. Mając do dyspozycji dwie przesłanki, możemy określić, czy istnieje możliwość wyprowadzenie z nich wniosków, a jeżeli tak, to jakie wnioski mogą zostać wyprowadzone. Wyprowadzenie wniosku, który pozostaje do przesłanek w relacji wynikania logicznego możliwe jest dzięki zastosowaniu tzw. dyrektyw poprawności sylogizmu. Zostaną one omówione w dalszej części. 

## Co umożliwia program? 

Poniższy program umożliwia rozwiązywanie prostych zadań z zakresu sylogistyki, które polegają na wyprowadzeniu wniosku na podstawie przesłanek. 

Zadanie to należy wykonać następująco: 
•	wybieramy interesujący nas układ przesłanek i wprowadzamy pierwszą przesłankę w pole oznaczone „przesłanka 1” oraz drugą przesłankę w pole „przesłanka 2”;
•	następnie możemy sami podać odpowiednik formalny wprowadzonej przesłanki np. „Każdy kwadrat jest prostokątem” ---> KaP lub skorzystać z opcji „FORMALIZUJ”;
•	w kolejnym kroku musimy wprowadzić wszystkie możliwe wnioski w pole „możliwe wnioski”. Możliwe wnioski wyznaczamy poprzez ustalenie, które z terminów (nazw) we wprowadzonych przez nas przesłankach wystąpiły tylko raz, a następnie rozważenie ich wszystkich możliwych kombinacji;
przykładowo dla układu przesłanek: 
Każdy fizyk jest geniuszem (FaG)
Niektórzy informatycy nie są fizykami (IoF)
termin „fizyk” wystąpił dwa razy, wniosek będzie zawierać więc termin „informatyk” oraz „geniusz”: GaI, GeI, GiI, GoI, IaG, IeG, IiG, IoG
•	następnie możemy przystąpić do analizy naszego układu przesłanek poprzez rozstrzyganie, czy kolejne dyrektywy są spełnione (dyrektywy 1 – 3) oraz czy na podstawie podanej dyrektywy można wykluczyć jeden z możliwych wniosków (dyrektywy 4 – 6).

## O czym stanowią dyrektywy poprawności sylogizmu? 

- Dyrektywa pierwsza: „Termin średni powinien być w przynajmniej jednej z przesłanek wzięty w całym zakresie”. 
Wyjaśnienie: termin średni, to termin, który pojawia się w obu przesłankach. Przykładowo dla przesłanek „Każdy fizyk jest geniuszem” (FaG) oraz „Niektórzy informatycy nie są fizykami” (IoF) terminem średnim jest termin „fizyk” (F). Termin jest wzięty w całym zakresie (rozłożony), jeżeli jest podmiotem zdania ogólnego (Xa…, Xe…) lub orzecznikiem zdania przeczącego (…eX, …oX). 

- Dyrektywa druga: Przynajmniej jedna przesłanka powinna być twierdząca.

- Dyrektywa trzecia: Przynajmniej jedna przesłanka powinna być ogólna. 

- Dyrektywa czwarta: „Wniosek jest zdaniem przeczącym wtedy i tylko wtedy gdy jedna z przestanek jest zdaniem przeczącym.

- Dyrektywa piąta: „Jeżeli jedna przesłanka jest szczegółowa, to wniosek jest szczegółowy. 

- Dyrektywa szósta: „Termin rozłożony we wniosku, to musi być rozłożony w przesłance”. 

Wyjaśnienie: termin jest rozłożony, jeżeli jest wzięty w całym zakresie, czyli jeżeli jest podmiotem zdania ogólnego (Xa…, Xe…) lub orzecznikiem zdania przeczącego (…eX, …oX).



## Technologie
### Frontend
- React (Vite)
### Backend
- FastAPI

## Minimalne Wymagania
### Frontend
- Node.js v20.19.2
- npm v9.2.0

### Backend
- python3 v3.13.5
- Moduły Pythona - [requirements.txt](./backend/requirements.txt):
    - fastapi[standard]
    - pydantic
    - requests
    - pytest
    - gunicorn
    - spacy

### Funkcjonalności
Główny silnik odpowiadający za sprawdzanie rozumowania logicznego znajduje się w pliku [syllogism.py](backend/syllogism.py). Algorytm jest autorską koncepcją.
<br/>
W pliku [formalisation.py](backend/formalisation.py) opracowaliśmy algorytm, który umożliwia zamianę zdań wyrażonych w języku naturalnym, na formalny język sylogistyki.
<br/>
Przykład: INPUT: „Każdy kwadrat jest prostokątem" ----> OUTPUT: KaP
<br/>
[Endpointy](backend/main.py) zostały stworzony z zastosowaniem fastapi. Zadbaliśmy o weryfikacje poprawności wprowadzanych danych [inputValidation.py](backend/inputValidation.py).
<br/>
Dodatkwowo dodaliśmy [bazę danych](backend/db), która umożliwia zbieranie logów dotyczących zadań wprowadzanych do aplikacji, co w przyszłości pozwoli na wykonywanie analiz dotyczących najczęściej rozwiązywanych zadań.

## Hosting
- Backend: [Render](https://render.com)
- Frontend: [Vercel](https://vercel.com/)

## Automatyzacja
- CI/CD z wykorzsytaniem GitHub Actions


## Uruchomienie
> [!WARNING]
> Tylko w środowisku developerskim.

### Backend
W folderze ``backend``:
```bash
python3.13 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3.13 -m spacy download pl_core_news_lg
cd ..
fastapi dev backend/main.py
```

### Frontend
W folderze ``python-front``:

```bash
    npm install
    npm run dev  
```

### Testy

Test stworzony za pomocą pytest. Uruchomienie: 
```
python3.13 -m pytest tests/test_python.py -v
```

## Demo

Przygotowaliśmy demo aplikacji, jednak z uwagi na zastosowanie biblioteki spacy do przetwarzania języka naturalnego, nie udało się nam dokonać hostingu backendu w ramach darmowej subskrybcji, ponieważ plik wykorzystywany do analizy morfologicznej zdania wymaga 0.5 gb. 
- Aplikacja: https://python-projekt.vercel.app
- API: https://syllogism.onrender.com/validation
    - Dokumentacja (Swagger UI): https://syllogism.onrender.com/docs



