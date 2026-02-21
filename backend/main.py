from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from inputValidation import validate_data
from pydantic import BaseModel
from jsonOutputFormater import jsonOutputFormater

from formalisation import formaliser

app = FastAPI()

# Porty z ktorych moze przychodzic zapytanie API
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://python-projekt.vercel.app",
]

# middleware niwelujacy CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# definicja wygladu json dla programu
class UserInput(BaseModel):
    firstSentence: str
    firstScheme: str
    secondSentence: str
    secondScheme: str



# definicja wygladu json dla zdania
class FormaliserInput(BaseModel):
    premise: str


@app.post("/validation")
async def read_user(data: UserInput):

    if validate_data(data):
        return jsonOutputFormater(data)  
    else:
        return {"msg": False}
    

@app.post("/formalize")
async def read_user(data: FormaliserInput):
    result = formaliser(data.premise)
    return {"output": result}