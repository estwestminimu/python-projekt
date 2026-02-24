import sys
import os
import pytest
from backend.syllogism import Syllogism

EXAMPLES = [
    pytest.param("LaU", "LiO", ["UiO", "OiU"]),
    pytest.param("PiW", "WaZ", ["PiZ", "ZiP"]),
    pytest.param("AeP", "ZiA", ["ZoP"]),
    pytest.param("KaP", "KoS", ["PoS"]),
    pytest.param("AaK", "SeA", ["KoS"]),
    pytest.param("PaK", "PeC", ["KoC"]),
    pytest.param("KaU", "GeU", ["KeG", "KoG", "GeK", "GoK"]),
]


DIRECTIVE_1_FAIL = [
    # Brak rozwiązania, naruszenie D1
    ("PiG", "GoM"),
]

DIRECTIVE_2_FAIL = [
    # Brak rozwiązania, naruszenie D2
    ("SoW", "SeG"),
]

# Przykład, który powinien naruszyć D1 ale nie D2/D3
DIRECTIVE_SPECIAL = [
    ("DiS", "BeS", ["DoB"]),
]


class TestSyllogismInit:

    def test_basic_creation(self):
        s = Syllogism("LaU", "LiO")
        assert s.premise1 == "LaU"
        assert s.premise2 == "LiO"

    def test_midterm_detection(self):
        s = Syllogism("LaU", "LiO")
        assert s.midterm == "L"

    def test_midterm_detection_second(self):
        s = Syllogism("PiW", "WaZ")
        assert s.midterm == "W"

    def test_three_terms_required(self):
        """Przesłanki muszą zawierać dokładnie 3 terminy."""
        with pytest.raises(ValueError, match="3 terminy"):
            Syllogism("AaB", "CaD")

    def test_same_premise_terms_raise(self):
        """Dwa identyczne terminy (brak terminu średniego o count==2) -> błąd."""
        with pytest.raises(ValueError):
            Syllogism("AaB", "AaB")

    def test_possible_consequences_generated(self):
        """Powinno wygenerować 8 możliwych wniosków (4 dla S-P + 4 dla P-S)."""
        s = Syllogism("LaU", "LiO")
        assert len(s.possible_consequences) == 8

    def test_terms_dict_has_three_keys(self):
        s = Syllogism("AeP", "ZiA")
        assert len(s.terms_dict) == 3



class TestCompose:

    def test_compose_removes_apostrophes(self):
        s = Syllogism("LaU", "LiO")
        result = s.compose("S'aM", "MiP")
        assert result == ["SaM", "MiP"]

    def test_compose_returns_list(self):
        s = Syllogism("LaU", "LiO")
        result = s.compose("AaB", "BaC")
        assert isinstance(result, list)
        assert len(result) == 2


# =============================================================================
# Testy dyrektyw walidacyjnych (1 - 3)
# =============================================================================

class TestDirectiveOne:
    """Dyrektywa 1: termin średni musi być rozłożony przynajmniej raz."""

    def test_passes_when_midterm_distributed(self):
        s = Syllogism("LaU", "LiO")  # 'a' po L -> La -> L rozłożony
        assert s.directive_one() is True

    def test_passes_universal_affirmative_subject(self):
        s = Syllogism("PaK", "PeC")  # Pa -> P rozłożony, Pe -> P rozłożony
        assert s.directive_one() is True

    def test_passes_universal_negative(self):
        s = Syllogism("AeP", "ZiA")  # Ae -> A rozłożony, eP -> P rozłożony
        assert s.directive_one() is True

    def test_fails_when_midterm_not_distributed(self):
        """PiG, GoM -> G nie jest rozłożony (iG i Go – żaden wzorzec nie pasuje)."""
        s = Syllogism("PiG", "GoM")
        assert s.directive_one() is False

    @pytest.mark.parametrize("p1,p2", DIRECTIVE_1_FAIL)
    def test_directive_one_failures(self, p1, p2):
        s = Syllogism(p1, p2)
        assert s.directive_one() is False


class TestDirectiveTwo:
    """Dyrektywa 2: przynajmniej jedna przesłanka twierdząca (a/i)."""

    def test_passes_with_affirmative(self):
        s = Syllogism("LaU", "LiO")
        assert s.directive_two() is True

    def test_fails_both_negative(self):
        s = Syllogism("SoW", "SeG")
        assert s.directive_two() is False

    @pytest.mark.parametrize("p1,p2", DIRECTIVE_2_FAIL)
    def test_directive_two_failures(self, p1, p2):
        s = Syllogism(p1, p2)
        assert s.directive_two() is False


class TestDirectiveThree:
    """Dyrektywa 3: przynajmniej jedna przesłanka ogólna (a/e)."""

    def test_passes_with_universal(self):
        s = Syllogism("AeP", "ZiA")
        assert s.directive_three() is True

    def test_passes_with_a(self):
        s = Syllogism("PiW", "WaZ")
        assert s.directive_three() is True

    def test_fails_both_particular(self):
        """Obie szczegółowe (i/o) -> D3 false."""
        # PiG i GoM – 'o' i 'i' -> ale 'o' nie jest 'a' ani 'e'
        # GoM zawiera 'o' (szczegółowa) a PiG zawiera 'i' (szczegółowa)
        s = Syllogism("PiG", "GoM")
        assert s.directive_three() is False


# =============================================================================
# Testy dyrektyw eliminacyjnych (4-6)
# =============================================================================

class TestDirectiveFour:
    """Dyrektywa 4: wniosek przeczący - dokładnie jedna przesłanka przecząca."""

    def test_both_affirmative_excludes_negative_conclusions(self):
        s = Syllogism("LaU", "LiO")
        excluded = s.directive_four()
        # Obie twierdzące -> wnioski muszą być twierdzące
        for exc in excluded:
            assert "e" in exc or "o" in exc

    def test_one_negative_excludes_affirmative_conclusions(self):
        s = Syllogism("AeP", "ZiA")
        excluded = s.directive_four()
        for exc in excluded:
            assert "a" in exc or "i" in exc

    def test_remaining_conclusions_correct_type(self):
        """Po D4 z obu twierdzących: zostają tylko a/i."""
        s = Syllogism("PiW", "WaZ")
        s.directive_four()
        for pc in s.possible_consequences:
            assert "a" in pc or "i" in pc


class TestDirectiveFive:
    """Dyrektywa 5: jedna szczegółowa przesłanka -> wniosek szczegółowy."""

    def test_particular_premise_excludes_general_conclusions(self):
        s = Syllogism("LaU", "LiO")  # LiO jest szczegółowa
        s.directive_four()
        excluded = s.directive_five()
        for exc in excluded:
            assert "a" in exc or "e" in exc

    def test_both_universal_keeps_general(self):
        """Obie ogólne -> wniosek może być ogólny."""
        s = Syllogism("KaU", "GeU")
        s.directive_four()
        excluded = s.directive_five()
        # Nie powinno wykluczyć ogólnych
        assert excluded == []


class TestDirectiveSix:
    """Dyrektywa 6: termin rozłożony we wniosku musi być rozłożony w przesłance."""

    def test_search_term_a(self):
        s = Syllogism("LaU", "LiO")
        result = s.search_term("SaM")
        assert "S" in result

    def test_search_term_e(self):
        s = Syllogism("LaU", "LiO")
        result = s.search_term("SeM")
        assert "S" in result
        assert "M" in result

    def test_search_term_o(self):
        s = Syllogism("LaU", "LiO")
        result = s.search_term("SoM")
        assert "M" in result

    def test_directive_six_filters_correctly(self):
        s = Syllogism("LaU", "LiO")
        s.directive_four()
        s.directive_five()
        excluded = s.directive_six()
        # Po D6 powinny zostać poprawne wnioski
        assert isinstance(excluded, list)



class TestFullPipeline:

    @pytest.mark.parametrize("p1,p2,expected", EXAMPLES)
    def test_full_pipeline(self, p1, p2, expected):
        s = Syllogism(p1, p2)

        # Dyrektywy walidacyjne
        assert s.directive_one() is True, f"D1 failed for ({p1}, {p2})"
        assert s.directive_two() is True, f"D2 failed for ({p1}, {p2})"
        assert s.directive_three() is True, f"D3 failed for ({p1}, {p2})"

        # Dyrektywy eliminacyjne
        s.directive_four()
        s.directive_five()
        s.directive_six()

        assert sorted(s.possible_consequences) == sorted(expected), (
            f"Dla ({p1}, {p2}): oczekiwano {expected}, "
            f"otrzymano {s.possible_consequences}"
        )

    @pytest.mark.parametrize("p1,p2,expected", DIRECTIVE_SPECIAL)
    def test_special_cases(self, p1, p2, expected):
        s = Syllogism(p1, p2)
        s.directive_four()
        s.directive_five()
        s.directive_six()
        assert sorted(s.possible_consequences) == sorted(expected)


class TestNoValidConclusion:
    """Przypadki, w których nie ma poprawnego wniosku (naruszenie D1 lub D2)."""

    def test_d1_violation_no_conclusion(self):
        s = Syllogism("PiG", "GoM")
        assert s.directive_one() is False

    def test_d2_violation_no_conclusion(self):
        s = Syllogism("SoW", "SeG")
        assert s.directive_two() is False



class TestSpecificSyllogisms:

    def test_LaU_LiO(self):
        s = Syllogism("LaU", "LiO")
        s.directive_four()
        s.directive_five()
        s.directive_six()
        assert sorted(s.possible_consequences) == sorted(["UiO", "OiU"])

    def test_AeP_ZiA(self):
        s = Syllogism("AeP", "ZiA")
        s.directive_four()
        s.directive_five()
        s.directive_six()
        assert s.possible_consequences == ["ZoP"]

    def test_KaP_KoS(self):
        s = Syllogism("KaP", "KoS")
        s.directive_four()
        s.directive_five()
        s.directive_six()
        assert s.possible_consequences == ["PoS"]

    def test_KaU_GeU(self):
        s = Syllogism("KaU", "GeU")
        s.directive_four()
        s.directive_five()
        s.directive_six()
        assert sorted(s.possible_consequences) == sorted(["KeG", "KoG", "GeK", "GoK"])

    def test_PaK_PeC(self):
        s = Syllogism("PaK", "PeC")
        s.directive_four()
        s.directive_five()
        s.directive_six()
        assert s.possible_consequences == ["KoC"]

    def test_AaK_SeA(self):
        s = Syllogism("AaK", "SeA")
        s.directive_four()
        s.directive_five()
        s.directive_six()
        assert s.possible_consequences == ["KoS"]


