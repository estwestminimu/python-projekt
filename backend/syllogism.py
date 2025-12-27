from collections import Counter

class Syllogism:
    
    #obiekt syllogizm ma dwa pola, które zawierają przesłanki podane przez usera
    def __init__(self, premise1 : str, premise2: str, formalized = False):
        self.premise1 = premise1
        self.premise2 = premise2
        if len(set(list(self.premise1)).intersection(set(list(self.premise2)))) == 0:
            raise ValueError("Przesłanki muszą zawierać 3 terminy")
        
        if formalized == True:
            # gdy formalizacja będzie zrobiona, to na podstawie podanych przesłanek tworzona jest lista wniosków
            #formalizacja jest podawana przez usera i sprawdzana metodami klasy sylogizm lub tworzona przez nas
            #self.consequences ...
            #musimy mieć mechanizm usuwania z listy wniosków, która będzie polem sylogizmu
            #z tej listy eliminować będą dyrektywy 4, 5, 6

            premises = self.compose(premise1, premise2)
            self.terms_dict = dict(Counter(t for terms in premises for t in terms if t == t.upper()))
            types_of_sentences = ["a", "e", "i", "o"]

            #### obsługa błędów: trzeba połączyć z API
            if self.terms_dict.keys() == 3:
                raise ValueError("Przesłanki muszą zawierać 3 terminy")
            
            ### tutaj nieco redundantnie, ale trzeba sprawdzić dyrketywę 0;
            term = "".join([k for k, v in self.terms_dict.items() if v == 1])

            if len(term) != 2:
                raise ValueError("Sylogizmu nie da się rozwiązać")
            
            consecuences = [term[0] + tos + term[1] for tos in types_of_sentences]
            consecuences = [term[0] + tos + term[1] for tos in types_of_sentences]
            term = term[::-1]
            for tos in types_of_sentences:
                consecuences.append(term[0] + tos + term[1])
            #tutaj sylogism tworzy wszystkie mozliwe wnioski
            self.possible_consequences = consecuences
    

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
        return [fpremise1, fpremise2]

    #TODO
    def directive_zero(self, fpremises : list) -> bool:
        # niechaj nie będzie 4
        #[SaM, SiP]
        # ile jest wielkich liter; najlepiej zrobić zbiór len({}) == 3.
        
        return True
    
    #TODO
    def directive_one(fpremises : list) -> bool:
        #[SaM, SiP]
        '''termin średni, czylo to co występuje dwa razy (tutaj S)
        musi być wzięty w cały zakresie, czyli sprawdzymy, czy litera, która wystąpiłą dwa razy
        jest w jednej z trzech konfiguracji: 
        Xa, Xe, eX, oX
        '''
        
        pass

    #TODO
    def directive_two(fpremises : list) -> bool:
        '''przynajmniej jedna przesłanka powina być twierdząca, 
        aby to sprawdzić musimy mieć zdanie z „a" lub „i"
        
        '''
       
        pass
    
    #TODO
    def directive_three(fpremises : list) -> bool:
        '''przynajmniej jedna przesłanka powinna być ogólna
        aby to sprawdzić musi być jedno wystąpienie z literami "a" lub "e"
        
        '''
    
    ###########################################################
    #DYREKTYWY DLA WNIOSKÓW
    ###########################################################

    #TODO
    def directive_four(fpremises : list, possible_conclusions : list) -> str:
        #tutaj trzeba zwrócić to, co trzeba wyeliminować
        '''wniosek zawsze i tylko wtedy jest przeczący,
        gdy jedna przesłanka jest przecząca; wniosek jest 
        twierdzący wtedy i tylko wtedy, gdy obie 
        przesłanki są twierdzące'''
        
        pass

    #TODO
    def directive_five(fpremises : list, possible_conclusions : list) -> str:
        #tutaj trzeba zwrócić to, co trzeba wyeliminować
        '''jeżeli jedna przesłanka jest szczegółowa, to wniosek jest szczegółowy;
        zaś jeżeli wniosek jest ogólny, to obie przesłanki muszą być ogólne.'''

        pass

    #TODO
    def directive_six(fpremises : list, possible_conclusions : list) -> str:
        #tutaj trzeba zwrócić to, co trzeba wyeliminować
        '''jeżeli termin jest „rozłożony” we wniosku, to musi być „rozłożony” także w przesłance'''
        pass 

data = ['SaM', "SiP"]
# terms_dict = dict(Counter(t for terms in data for t in terms if t == t.upper()))
# if len(terms_dict.keys()) >= 3:
#     print("Działa")

# term = "".join([k for k, v in terms_dict.items() if v == 1])
# print(term)
# types_of_sentences = ["a", "e", "i", "o"]

# consecuences = [term[0] + tos + term[1] for tos in types_of_sentences]
# term = term[::-1]
# for tos in types_of_sentences:
#     consecuences.append(term[0] + tos + term[1])
# print(term)

# print(consecuences)

syllog = Syllogism("SaM", "SiP", formalized= True)
print(syllog.possible_consequences)

        




    