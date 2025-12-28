from collections import Counter
import re

class Syllogism:
    
    #obiekt syllogizm ma dwa pola, które zawierają przesłanki podane przez usera
    def __init__(self, premise1 : str, premise2: str, formalized = True):
        if formalized == False:
            #tutaj funkcja formalizująca
            pass

        # gdy formalizacja będzie zrobiona, to na podstawie podanych przesłanek tworzona jest lista wniosków
        #formalizacja jest podawana przez usera i sprawdzana metodami klasy sylogizm lub tworzona przez nas
        #self.consequences ...
        #musimy mieć mechanizm usuwania z listy wniosków, która będzie polem sylogizmu
        #z tej listy eliminować będą dyrektywy 4, 5, 6

        #ale w self zapiszemy przesłanki bez ' jeśli zostanie podany
        self.premise1 = premise1
        self.premise2 = premise2
        #to będzie przekazywane do metod 
        self.premises_for_directives = self.compose(premise1, premise2)

        premises_in_init = self.compose(premise1, premise2)

        # w Sylogistyce termin S' oznaczana negacje nazwy S. Nie wiem jeszcze jak tym operować. 
        if len(set(list(premise1.replace("'", ""))).intersection(set(list(premise2.replace("'", ""))))) == 0:
            raise ValueError("Przesłanki muszą zawierać 3 terminy")

        self.terms_dict = dict(Counter(t for terms in premises_in_init for t in terms if t == t.upper()))
        types_of_sentences = ["a", "e", "i", "o"]


        #### obsługa błędów: trzeba połączyć z API
        if len(self.terms_dict.keys()) != 3:
            raise ValueError("Przesłanki muszą zawierać 3 terminy")
        
        ### tutaj nieco redundantnie, ale trzeba sprawdzić dyrketywę 0;
        term = "".join([k for k, v in self.terms_dict.items() if v == 1])

        if (len(term) != 2):
            raise ValueError("Sylogizmu nie da się rozwiązać")
        
        consequences = [term[0] + tos + term[1] for tos in types_of_sentences]
        term = term[::-1] #odwarcamy termin
        for tos in types_of_sentences:
            consequences.append(term[0] + tos + term[1])
        #tutaj sylogism tworzy wszystkie mozliwe wnioski
        self.possible_consequences = consequences
        self.midterm = "".join([k for k, v in self.terms_dict.items() if v == 2])

    

    #TODO
    def formalize(self) -> str: 
        """
        Function which can encode premise of syllogism 
        from natural language to formal notation. 
        e.g. Każdy kwadrat jest prostokątem -> KaP
        
        :param self: Description
        """
        pass


    def compose(self, fpremise1 : str, fpremise2 : str) -> list:
        """
        Docstring for compose
        
        :param fpremise1: First formalized premise
        :type fpremise1: str
        :param fpremise2: Second formalized premise
        :type fpremise2: str
        :return: List of formalized premises e.g. [SaM, SiP]
        :rtype: list
        """
        fpremise1 = fpremise1.replace("'", "")
        fpremise2 = fpremise2.replace("'", "")
        return [fpremise1, fpremise2]

    #TODO
    def directive_zero(self) -> bool:
        # niechaj nie będzie 4
        #[SaM, SiP]
        # ile jest wielkich liter; najlepiej zrobić zbiór len({}) == 3.
        if len(self.terms_dict.keys()) != 3:
            return False
        
        return True
    

    def directive_one(self) -> bool:
        '''
        Docstring for directive_one
        
        :param self: Korzystamy z parametru self.midterm oraz self.directives
        :return: Metoda sprawdza czy termin średni (midterm) jest wzięty 
        przynajmniej raz w całym zakresie.
        :rtype: bool
        '''
        substrings = [f"{self.midterm}a", f"{self.midterm}e", f"e{self.midterm}", f"o{self.midterm}"] 
        for substring in substrings:
            if substring in self.premises_for_directives[0] or substring in self.premises_for_directives[1]:
                return True
        else:
            return False


    def directive_two(self) -> bool:
        '''przynajmniej jedna przesłanka powina być twierdząca, 
        aby to sprawdzić musimy mieć zdanie z „a" lub „i"
        
        '''
        affirmative_types = ['a', 'i']
        for aff_typ in affirmative_types:
            if aff_typ in self.premises_for_directives[0] or aff_typ in self.premises_for_directives[1]:
                return True
        else:
            return False
       
    

    def directive_three(self) -> bool:
        '''przynajmniej jedna przesłanka powinna być ogólna
        aby to sprawdzić musi być jedno wystąpienie z literami "a" lub "e"
        
        '''
        general_types = ['a', 'e']

        for gen_type in general_types:
            if gen_type in self.premises_for_directives[0] or gen_type in self.premises_for_directives[1]:
                return True
        else:
            return False
    
    ###########################################################
    #DYREKTYWY DLA WNIOSKÓW
    ###########################################################


    def directive_four(self):
        #tutaj trzeba zwrócić to, co trzeba wyeliminować
        '''wniosek zawsze i tylko wtedy jest przeczący,
        gdy jedna przesłanka jest przecząca; wniosek jest 
        twierdzący wtedy i tylko wtedy, gdy obie 
        przesłanki są twierdzące'''
        negative_types = ['e', 'o']
        affirmative_types = ['a', 'i']
        
        # Zlicza przesłanki przeczące
        negative_count = sum(1 for premise in self.premises_for_directives 
                            if any(nt in premise for nt in negative_types))
        
        to_exclude = []
        
        if negative_count >= 1:
            # Przybajmniej jedna przesłanka przecząca wniosek musi być przeczący
            to_exclude = [pc for pc in self.possible_consequences 
                        if any(at in pc for at in affirmative_types)]
            self.possible_consequences = [pc for pc in self.possible_consequences 
                                        if not any(at in pc for at in affirmative_types)]
        
        elif negative_count == 0:
            # Obie przesłanki twierdzące wniosek musi być twierdzący
            to_exclude = [pc for pc in self.possible_consequences 
                        if any(nt in pc for nt in negative_types)]
            self.possible_consequences = [pc for pc in self.possible_consequences 
                                        if not any(nt in pc for nt in negative_types)]
        
        
        return to_exclude
    

    def directive_five(self):
        '''jeżeli jedna przesłanka jest szczegółowa, to wniosek jest szczegółowy;
        zaś jeżeli wniosek jest ogólny, to obie przesłanki muszą być ogólne.'''
        particular_types = ['i', 'o']
        general_types = ['a', 'e']
        particular_count = sum(1 for premise in self.premises_for_directives 
                            if any(pt in premise for pt in particular_types))
        to_exclude = []
        if particular_count > 0:
            to_exclude = [pc for pc in self.possible_consequences 
                          if any(gt in pc for gt in general_types)]
            self.possible_consequences = [pc for pc in self.possible_consequences 
                          if not any(gt in pc for gt in general_types)]
        
        #tutaj trzeba zwrócić to, co trzeba wyeliminować
        #moze zwracac None, trzeba to jakos ogarnąc // pamiętać o tym 
        return to_exclude
    

    def search_term(self, premise: str) -> set:

        rozlozone = set()

        patterns = [
            r'([A-Z])a',  
            r'([A-Z])e',  
            r'e([A-Z])',  
            r'o([A-Z])', 
        ]

        for pattern in patterns:
            match = re.search(pattern, premise)
            if match:
                rozlozone.add(match.group(1)) 

        return rozlozone

    def directive_six(self):
        '''
        Dyrektywa 6: jeżeli termin jest „rozłożony" we wniosku, to musi być „rozłożony" także w przesłance.

        :return: Lista wniosków do wyeliminowania (które naruszają dyrektywę)
        '''
        # zbieramy wszystkie rozłożone terminy ze wszystkich przesłanek
        rozlozone_w_przeslankach = set()
        for premise in self.premises_for_directives:
            rozlozone_w_przeslankach.update(self.search_term(premise))

        to_exclude = []

        
        for consequence in self.possible_consequences:
            rozlozone_we_wniosku = self.search_term(consequence)

            # sprawdzamy czy wszystkie rozłożone we wniosku są też rozłożone w przesłankach
            niespelnione = rozlozone_we_wniosku - rozlozone_w_przeslankach

            if niespelnione:
                # Ten wniosek narusza dyrektywę 6, więc dodajemy do listy wykluczeń
                to_exclude.append(consequence)

        #trzeba usunąć wnioski naruszające dyrektywę z listy możliwych wniosków
        self.possible_consequences = [pc for pc in self.possible_consequences
                                      if pc not in to_exclude]

        return to_exclude