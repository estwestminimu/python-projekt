import spacy

# python3.13 -m spacy download pl_core_news_lg
# jak nie zadziała to dajemy wersję pl_core_news_sm
nlp = spacy.load('pl_core_news_lg')

input_data = "Każdy kwadrat jest prostokątem."

'''formalizator jest uruchamiany tylko, jeśli obiekt klasy Syllogism został
utworzony z wywołaniem parametru formalized = False, domyślnie jest True. 
'''


def formaliser(premise: str):

    # token jest rzeczownikiem
    noun = "NOUN"
    # token jest określnikiem / kwantyfikatorem
    determinant = "DET"
    # token jest negacją
    negation = "nie"

    determinants = ['każdy', 'żaden', 'niektóry']

    types_of_sentence = {
        ("każdy", False): "a",
        ("żaden", True): "e",
        ("niektóre", False): "i",
        ("niektóre", True): "o"
    }
    normalized_text = premise.replace("\n", "").replace(".", "")
    tokens = nlp(normalized_text)

    quantifier = None
    for token in tokens:
        if token.pos_ == determinant and token.lemma_ in determinants:
            quantifier = token.lemma_
            break

    has_negation = any(token.lemma_ == negation for token in tokens)

    sentence_type = types_of_sentence.get((quantifier, has_negation))

    if sentence_type is None:
        return "ERROR"

    nouns = [token for token in tokens if token.pos_ == noun]
    if len(nouns) < 2:
        return "Za mało rzeczowników w zdaniu"

    # pierwsza litera pierwszego rzeczownika, zamieniamy na wielka literę
    term1 = nouns[0].lemma_[0].upper()
    # dobieramy drugą
    term2 = nouns[1].lemma_[0].upper()
    # jeśli litery są takie same, zmieniamy na kolejną
    if term1 == term2:
        term2 = nouns[1].lemma_[1].upper()

    return f"{term1}{sentence_type}{term2}"


print(formaliser(input_data))
