import spacy

#python3.13 -m spacy download pl_core_news_lg
#jak nie zadziała to dajemy wersję pl_core_news_sm
nlp = spacy.load('pl_core_news_lg')

'''formalizator jest uruchamiany tylko, jeśli obiekt klasy Syllogism został
utworzony z wywołaniem parametru formalized = False, domyślnie jest True. 
'''
def formaliser(premise : str):

    """
        Function which can encode premise of syllogism 
        from natural language to formal notation. 
        e.g. Każdy kwadrat jest prostokątem -> KaP
        
        :param self: Description
    """

    # token jest rzeczownikiem 
    noun = "NOUN"
    # token jest przymiotnikiem 
    adjective = "ADJ"
    # token jest określnikiem / kwantyfikatorem 
    determinant = "DET"
    # token jest negacją 
    negation = "nie"

    determinants = ['każdy', 'żaden', 'niektóry']

    types_of_sentence = {
        ("każdy", False): "a",
        ("żaden", True): "e",
        ("niektóry", False): "i",
        ("niektóry", True): "o"
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

    nouns_or_adj = [token for token in tokens if (token.pos_ == noun) or (token.pos_ == adjective)]
    if len(nouns_or_adj) < 2: 
        return "Za mało rzeczowników lub przymiotników w zdaniu"
    

    # pierwsza litera pierwszego rzeczownika, zamieniamy na wielka literę
    term1 = nouns_or_adj[0].lemma_[0].upper()
    # dobieramy drugą
    term2 = nouns_or_adj[1].lemma_[0].upper()
    # jeśli litery są takie same, zmieniamy na kolejną
    if term1 == term2:
        term2 = nouns_or_adj[1].lemma_[1].upper()
    

    return f"{term1}{sentence_type}{term2}"
