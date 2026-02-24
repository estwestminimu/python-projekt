import { useState, useEffect } from "react";
import { compareArray } from "./compareArray";



type SecondDirectivesProps = {
  data: {
    directive_four: string[];
    directive_five: string[];
    directive_six: string[];
  } | null;
};

function SecondDirectives({ data }: SecondDirectivesProps) {
  // Poprawne odpowiedzi
  const [isAnswerCorrect_D, setisAnswerCorrect_D] = useState<boolean>(false);
  const [isAnswerCorrect_E, setisAnswerCorrect_E] = useState<boolean>(false);
  const [isAnswerCorrect_F, setisAnswerCorrect_F] = useState<boolean>(false);

  //Odpowiedzi zaznaczone przez użytkownika
  const [userAnswer_D, setUserAnswer_D] = useState<string>(" ");
  const [userAnswer_E, setUserAnswer_E] = useState<string>(" ");
  const [userAnswer_F, setUserAnswer_F] = useState<string>(" ");

  useEffect(() => {
    // SPrawdza czy są dane z api i czy użhytkownik wpisał tekst
    if (!data || !userAnswer_D || userAnswer_D.trim() === "") return;

    // usuwa wszystkie spacje , dzieli według przecinka i tworzy tablice
    const arrayA = userAnswer_D.replaceAll(" ", "").split(",");

    setisAnswerCorrect_D(
      compareArray(
        //traktujemy x jako pustą odpowiedź i sprwdzamy czy ktos nie wpisal czegos poza x
        // np. x, LaU
        arrayA[0].toLowerCase() == "x" && arrayA.length == 1 ? [] : arrayA,
        data.directive_four
      )
    );
  }, [userAnswer_D, data]);

  useEffect(() => {
    if (!data || !userAnswer_E || userAnswer_E.trim() === "") return;

    const arrayA = userAnswer_E.replaceAll(" ", "").split(",");
    setisAnswerCorrect_E(
      compareArray(
        arrayA[0].toLowerCase() == "x" && arrayA.length == 1 ? [] : arrayA,
        data.directive_five
      )
    );
  }, [userAnswer_E, data]);

  useEffect(() => {
    if (!data || !userAnswer_F || userAnswer_F.trim() === "") return;

    const arrayA = userAnswer_F.replaceAll(" ", "").split(",");

    setisAnswerCorrect_F(
      compareArray(
        arrayA[0].toLowerCase() == "x" && arrayA.length == 1 ? [] : arrayA,
        data.directive_six
      )
    );
  }, [userAnswer_F, data]);

  return (
    <>
      <h2
        className={
          data && userAnswer_D !== null
            ? isAnswerCorrect_D
              ? "corect_text"
              : "incorect_text"
            : ""
        }
      >
        Dyrektywa 4:{" "}
        {data &&
          userAnswer_D !== null &&
          (isAnswerCorrect_D
            ? "Twoja odpowiedź jest poprawna."
            : "Twoja odpowiedź jest błędna.")}
      </h2>
      <span className="info">Wpisz x w przypadku pustej odpowiedzi</span>

      <br />

      <label>
        <input
          type="text"
          className="input"
          placeholder="wpisz coś"
          onChange={(e) => setUserAnswer_D(e.target.value)}
        />
      </label>
      <br />
      <h2
        className={
          data && userAnswer_E !== null
            ? isAnswerCorrect_E
              ? "corect_text"
              : "incorect_text"
            : ""
        }
      >
        Dyrektywa 5:{" "}
        {data &&
          userAnswer_E !== null &&
          (isAnswerCorrect_E
            ? "Twoja odpowiedź jest poprawna."
            : "Twoja odpowiedź jest błędna.")}
      </h2>
      <span className="info">Wpisz x w przypadku pustej odpowiedzi</span>
      <br />

      <label>
        <input
          type="text"
          className="input"
          placeholder="wpisz coś"
          onChange={(e) => setUserAnswer_E(e.target.value)}
        />
      </label>

      <br />
      <h2
        className={
          data && userAnswer_F !== null
            ? isAnswerCorrect_F
              ? "corect_text"
              : "incorect_text"
            : ""
        }
      >
        Dyrektywa 6:{" "}
        {data &&
          userAnswer_F !== null &&
          (isAnswerCorrect_F
            ? "Twoja odpowiedź jest poprawna."
            : "Twoja odpowiedź jest błędna.")}
      </h2>

      <span className="info">Wpisz x w przypadku pustej odpowiedzi</span>
      <br />
      <label>
        <input
          type="text"
          className="input"
          placeholder="wpisz coś"
          onChange={(e) => setUserAnswer_F(e.target.value)}
        />
      </label>
      <br />
    </>
  );
}

export default SecondDirectives;
