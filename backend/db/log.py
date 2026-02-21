import sqlite3
import json
from datetime import datetime
import os
from pydantic import BaseModel

DB_PATH = os.path.join(os.path.dirname(__file__), "logs.db")


def log(endpoint: str, input_data: str, output_data: dict):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    if isinstance(output_data, BaseModel):
        output_data = output_data.model_dump()

    cursor.execute(""" INSERT INTO logs (endpoint, input, output) VALUES (?, ?, ?)""",
                   (endpoint,
                    json.dumps(input_data, ensure_ascii=False),
                    json.dumps(output_data, ensure_ascii=False)))
    conn.commit()
    conn.close()
