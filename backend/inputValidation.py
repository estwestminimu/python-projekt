import re


def containsOnlyValidLetters(input):
    #ciag dlugosci 3
    if len(input) != 3:
          return False
    

    #duza, mala, duza litera
    if input[0].islower() or input[1].isupper() or input[2].islower():
        return False


    validLetters = f"^[spaowcm]+$"
    # print(re.match(validLetters, input.lower()))

    return bool(re.match(validLetters, input.lower()))



def mainValidator(input):

    validDataList = [
    containsOnlyValidLetters(input.firstScheme),
    containsOnlyValidLetters(input.secondScheme)

    ]



    if all(validDataList):
        return True
    else:
        return False


def validate_data(input):

   return mainValidator(input)
    


