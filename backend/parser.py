import spacy
import re
#python3.13 -m spacy download pl_core_news_lg
#jak nie zadziała to dajemy wersję pl_core_news_sm
nlp = spacy.load('pl_core_news_lg')


examples = []
with open("test_set.txt") as test_set:
    for example in test_set:
        examples.append(example)

tokens = []

determinants = ['każdy', 'żaden', 'niektóry']
part_of_speech = "DET" # określniki w języku polskim, wybieramy tylko te z listy determinants.
#tylko PART 


for idx, example in enumerate(examples):
    example = example.replace("\n", "")
    example = example.replace(".", "")
    doc = nlp(example)
    nouns = set()
    sequence = ""
    for token in doc:

        if token.pos_ == part_of_speech and token.lemma_ in determinants:
            tokens.append(token.lemma_)
        if token.pos_ == "NOUN" or token.pos_ == "ADJ":
            nouns.add(token.lemma_)
        sequence += " " + token.pos_
    # print(f'{idx + 1}: {nouns}')
    print(f'{idx + 1}: {sequence}')
            

print(tokens)

# doc = nlp("Tylko prokuratorzy nie są oskarżycielami publicznymi.")
# print("Tylko prokuratorzy nie są oskarżycielami publicznymi.")
# sequence = ""
# for token in doc:
#     # print(token.lemma_, token.pos_)
#     sequence += " " + token.pos_
# print(sequence)