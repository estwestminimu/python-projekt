from grammar_ai import pobierz_odpowiedz

def contains_keyword(input: str, keyword: str):
    return keyword in input

# returns string before first keyword
def text_before_keyword(input: str, keyword: str):
    return input.split(keyword)[0]

# returns string after first keyword
def text_after_keyword(input: str, keyword: str):
    return input.split(keyword)[1]


# nie jestem pewien, co miałaby robić ta funkcja? Nie zawsze będzie słowo jest, czasami pojawi się „są". 
def proces_data(input):
    before = text_before_keyword(input, "jest")
    jest = contains_keyword(input, "jest")
    after = text_after_keyword(input, "jest")

    pobierz_odpowiedz(before)
    return {
        "W": before,
        "a": jest,
        "O": after
        }    

# TODO: 
# Dodać dyrektywe 2 i 3


