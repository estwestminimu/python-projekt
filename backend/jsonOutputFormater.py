from syllogism import Syllogism
from pydantic import BaseModel


class ResponseScheme(BaseModel):
    possible_consequences: list
    directive_one: bool
    directive_two: bool
    directive_three: bool
    directive_four: list
    directive_five: list
    directive_six: list
    answer: list


def jsonOutputFormater(input):
    syllog = Syllogism(input.firstScheme, input.secondScheme, formalized=True)
    return ResponseScheme(
        possible_consequences=syllog.possible_consequences,
        directive_one=syllog.directive_one(),
        directive_two=syllog.directive_two(),
        directive_three=syllog.directive_three(),
        directive_four=syllog.directive_four(),
        directive_five=syllog.directive_five(),
        directive_six=syllog.directive_six(),
        answer=syllog.possible_consequences
    )
