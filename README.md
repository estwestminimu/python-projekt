# Aplikacja do nauki sylogistyki
![Test](https://github.com/estwestminimu/python-projekt/actions/workflows/main.yml/badge.svg)

 **Aplikacja do nauki sylogistyki** - rachunku logicznego zapoczątkowanego przez Arystotelesa i rozwijanego przez średniowiecznych logików.


## Demo
- Aplikacja: https://python-projekt.vercel.app
- API: https://syllogism.onrender.com/validation
    - Dokumentacja API (Swagger UI): https://syllogism.onrender.com/docs

## Technologie
### Frontend
- React (Vite)
### Backend
- Python3
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
pip install -r backend/requirements.txt
npm run dev 
```

### Frontend
W folderze ``python-front``:

```bash
    npm install
    npm run dev 
```


