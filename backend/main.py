from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from logic import proces_data
from inputValidation import validate_data



from pydantic import BaseModel


# do testowania potem usunać


import random

# 



app = FastAPI()

# Porty z ktorych moze przychodzic zapytanie API
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

# middleware niwelujacy CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: str):
    result = proces_data(item_id)
    return result


# definicja wygladu json

class UserInput(BaseModel):
    firstSentence: str
    firstScheme: str
    secondSentence: str
    secondScheme: str




@app.post("/validation")
async def read_user(data: UserInput):
    print(data)
    
    # TODO dodać walidacje 

    # Sprawdzamy 


    if validate_data(data):
    # if True
        return {"msg": True}   
    else:
        return {"msg": False}
        
