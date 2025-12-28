from syllogism import Syllogism

przykłady = [
    [("LaU", "LiO"), ["UiO", "OiU"]],
    [("PiW", "WaZ"), ["PiZ", "ZiP"]],
    [("AeP", "ZiA"), ["ZoP"]],
    [("KaP", "KoS"), ["PoS"]],
    [("DiS", "BeS"), ["DoB"]],
    [("AaK", "SeA"), ["KoS"]],
    [("PiG", "GoM"), ["Brak rozwiązania naruszenie D1"]],
    [("PaK", "PeC"), ["KoC"]],
    [("KaU", "GeU"), ["KeG","KoG","GeK", "GoK"]],
    [("SoW", "SeG"), ["Brak rozwiązania naruszenie D2"]]
]


for przykład in przykłady:
    syllog = Syllogism(przykład[0][0], przykład[0][1], formalized=True)
    print(f"Możliwe wnioski przed dyrektywami: {syllog.possible_consequences}")
    print(f"\nDyrektywa 1 (termin średni rozłożony): {syllog.directive_one()}")
    print(f"Dyrektywa 2 (przynajmniej jedna twierdząca): {syllog.directive_two()}")
    print(f"Dyrektywa 3 (przynajmniej jedna ogólna): {syllog.directive_three()}")
    print(f"Dyrektywa 4 -> wykluczone: {syllog.directive_four()}")
    print(f"Dyrektywa 5 -> wykluczone: {syllog.directive_five()}")
    print(f"Dyrektywa 6 -> wykluczone: {syllog.directive_six()}")
    print(f"\nMożliwe wnioski po dyrektywach: {syllog.possible_consequences}")
    print(f"Prawidłowa odpowiedź --> {przykład[-1]}")