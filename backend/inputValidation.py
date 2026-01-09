import re


def containsOnlyValidLetters(input):
    #ciag dlugosci 3
    if len(input) != 3:
          return False
    
    if not input.isalpha():
        return False 

    if input[0].islower() or input[1].isupper() or input[2].islower():
        return False



    return bool



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
    


