class Syllogism:
    
    #obiekt syllogizm ma dwa pola, które zawierają przesłanki podane przez usera
    def __init__(self, premise1 : str, premise2: str):
        self.premise1 = premise1
        self.premise2 = premise2
        #TODO
        # gdy formalizacja będzie zrobiona, to na podstawie podanych przesłanek tworzona jest lista wniosków
        #formalizacja jest podawana przez usera i sprawdzana metodami klasy sylogizm lub tworzona przez nas
        #self.consequences ...
        #musimy mieć mechanizm usuwania z listy wniosków, która będzie polem sylogizmu
        #z tej listy eliminować będą dyrektywy 4, 5, 6
    

    #TODO
    def formalize(self) -> str: 
        """
        Function which can encode premise of syllogism 
        from natural language to formal notation. 
        e.g. Każdy kwadrat jest prostokątem -> KaP
        
        :param self: Description
        """
        pass

    #TODO
    def compose(fpremise1 : str, fpremise2 : str) -> list:
        """
        Docstring for compose
        
        :param fpremise1: First formalized premise
        :type fpremise1: str
        :param fpremise2: Second formalized premise
        :type fpremise2: str
        :return: List of formalized premises e.g. [SaM, SiP]
        :rtype: list
        """
        pass

    #TODO
    def directive_zero(fpremises : list) -> bool:
        # niechaj nie będzie 4
        #[SaM, SiP]
        # ile jest wielkich liter; najlepiej zrobić zbiór len({}) == 3. 
        pass
    
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





        




    