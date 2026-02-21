import { useState, useEffect } from "react";
import { compareArray } from "./compareArray";


type CombinationsProps = {
  data: any;
};

function Answer({ data }: CombinationsProps) {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [allPossibleCombinations, setAllPossibleCombinations] =  useState<string>("");

 useEffect(() => {
    if (!data || !allPossibleCombinations || allPossibleCombinations.trim() === "") return;

    const arrayA = allPossibleCombinations.replaceAll(" ", "").split(",");
    setIsAnswerCorrect(
      compareArray(
        arrayA[0].toLowerCase() == "x" && arrayA.length == 1 ? [] : arrayA,
        data.answer
      )
    );
  }, [allPossibleCombinations, data]);

  return (
    <>
      <h4  className={
          data && allPossibleCombinations !== null
            ? isAnswerCorrect
              ? "corect_text"
              : "incorect_text"
            : ""
        }
      > Twoja odpowiedź
        {" "}
        {data &&
          allPossibleCombinations !== null &&
          (isAnswerCorrect
            ? " jest poprawna."
            : " jest błędna.")}
      </h4>
            <h2 style={{marginTop:"2rem"}}></h2>
      <span className="info">Wpisz x w przypadku pustej odpowiedzi</span>
      <br />
      <label>
        <input
          type="text"
          className="input"
          placeholder="wpisz coś"
          onChange={(e) => setAllPossibleCombinations(e.target.value)}
        />
      </label>
      <br />
    </>
  );
}

export default Answer;
