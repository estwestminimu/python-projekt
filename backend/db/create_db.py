import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "logs.db")

def create_database():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    endpoint TEXT NOT NULL,
    input TEXT,
    output TEXT
    )"""
                   )

    conn.commit()
    conn.close()


if __name__ == "__main__":
    create_database()
