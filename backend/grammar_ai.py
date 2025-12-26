import requests

def pobierz_odpowiedz(prompt):

    prompt =    f"Napisz to zdanie po polsku. Chcę aby było poprawnie gramatycznie. Nie dodawaj nowych słów ani nie twórz synonimów z istniejących. To jest to zdanie: {prompt}"


    payload = {"model": "SpeakLeash/bielik-1.5b-v3.0-instruct:Q8_0", "prompt": prompt, "stream": False}
    r = requests.post("http://localhost:11434/api/generate", json=payload)
    print(f"21313 {r.json()}")
    stra = r.json()["response"]
    print(stra)
    return stra

#testowanie 
# Napisz to zdanie po polsku, chcę aby było poprawnie gramatycznie, nie dodawaj nowych słów ani nie twórz synonimów z istniejących o to jest to zdanie "  Pies jest zwierzętami. "
# Pies jest zwierzętami.