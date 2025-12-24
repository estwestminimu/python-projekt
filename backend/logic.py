
# check if string contains characters
def contains_keyword(input: str, keyword: str):
    return keyword in input

def text_before_keyword(input: str, keyword: str):
    return input.split(keyword)[0]

def text_after_keyword(input: str, keyword: str):
    return input.split(keyword)[1]


def proces_data(input):
    before = text_before_keyword(input, "jest")
    jest = contains_keyword(input, "jest")
    after = text_after_keyword(input, "jest")

    return {
        "W": before,
        "a": jest,
        "O": after
        }    