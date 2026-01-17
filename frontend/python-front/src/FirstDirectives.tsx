import { useState, useEffect } from "react";

type FirstDirectivesProps = {
  data: any;
};

function FirstDirectives({ data }: FirstDirectivesProps) {
  //Poprawne odpowiedzi
  const [isAnswerCorrect_A, setIsAnswerCorrect_A] = useState<boolean | null>(
    null
  );
  const [isAnswerCorrect_B, setIsAnswerCorrect_B] = useState<boolean | null>(
    null
  );
  const [isAnswerCorrect_C, setIsAnswerCorrect_C] = useState<boolean | null>(
    null
  );

  //Odpowiedzi zaznaczone przez uzytkownika
  const [userAnswer_A, setUserAnswer_A] = useState<string | null>(null);
  const [userAnswer_B, setUserAnswer_B] = useState<string | null>(null);
  const [userAnswer_C, setUserAnswer_C] = useState<string | null>(null);



  useEffect(() => {
    // sprawdza czy otrzymaliśmy dane i czy użytkownik coś wybrał
    if (data && userAnswer_A !== null) {
      //Porównujemy z string aby otrzymać wartość logiczną, następnie wartość logiczną porównujemy z danymi otrzymanymi z js
      setIsAnswerCorrect_A((userAnswer_A === "True") === data.directive_one);
    }
  }, [data, userAnswer_A]);

  useEffect(() => {
    if (data && userAnswer_B !== null) {
      setIsAnswerCorrect_B((userAnswer_B === "True") === data.directive_two);
    }
  }, [data, userAnswer_B]);

  useEffect(() => {
    if (data && userAnswer_C !== null) {
      setIsAnswerCorrect_C((userAnswer_C === "True") === data.directive_three);
    }
  }, [data, userAnswer_C]);

  return (
    <>

    
      <h2
        className={
          // Otrzymaliśmy dane i użytkownik zaznaczył odpowiedź
          data && userAnswer_A !== null
            ? isAnswerCorrect_A
              ? "corect_text"
              : "incorect_text"
            : ""
        }
      >
        Dyrektywa 1:{" "}
        {data &&
          userAnswer_A !== null &&
          (isAnswerCorrect_A
            ? "Twoja odpowiedź jest poprawna."
            : "Twoja odpowiedź jest błędna.")}
      </h2>

      <div className="radio-input">
        <label>
          <input
            type="radio"
            id="value-1"
            name="directive1"
            value="True"
            onChange={(e) => setUserAnswer_A(e.target.value)}
          />
          <span>TAK</span>
        </label>
        <label>
          <input
            type="radio"
            id="value-2"
            name="directive1"
            value="False"
            onChange={(e) => setUserAnswer_A(e.target.value)}
          />
          <span>NIE</span>
        </label>
      </div>

      <h2
        className={
          data && userAnswer_B !== null
            ? isAnswerCorrect_B
              ? "corect_text"
              : "incorect_text"
            : ""
        }
      >
        Dyrektywa 2:{" "}
        {data &&
          userAnswer_B !== null &&
          (isAnswerCorrect_B
            ? "Twoja odpowiedź jest poprawna."
            : "Twoja odpowiedź jest błędna.")}
      </h2>
      <div className="radio-input">
        <label>
          <input
            type="radio"
            id="value-1"
            name="directive2"
            value="True"
            onChange={(e) => setUserAnswer_B(e.target.value)}
          />
          <span>TAK</span>
        </label>
        <label>
          <input
            type="radio"
            id="value-2"
            name="directive2"
            value="False"
            onChange={(e) => setUserAnswer_B(e.target.value)}
          />
          <span>NIE</span>
        </label>
      </div>

      <h2
        className={
          data && userAnswer_C !== null
            ? isAnswerCorrect_C
              ? "corect_text"
              : "incorect_text"
            : ""
        }
      >
        Dyrektywa 3:{" "}
        {data &&
          userAnswer_C !== null &&
          (isAnswerCorrect_C
            ? "Twoja odpowiedź jest poprawna."
            : "Twoja odpowiedź jest błędna.")}
      </h2>
      <div className="radio-input">
        <label>
          <input
            type="radio"
            id="value-1"
            name="directive3"
            value="True"
            onChange={(e) => setUserAnswer_C(e.target.value)}
          />
          <span>TAK</span>
        </label>
        <label>
          <input
            type="radio"
            id="value-2"
            name="directive3"
            value="False"
            onChange={(e) => setUserAnswer_C(e.target.value)}
          />
          <span>NIE</span>
        </label>
      </div>

    </>
  );
}

export default FirstDirectives;
