import { useState, useEffect } from "react";
import { compareArray } from "./compareArray";


type CombinationsProps = {
  data: any;
};

function Combinations({ data }: CombinationsProps) {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [allPossibleCombinations, setAllPossibleCombinations] =  useState<string>("");

 useEffect(() => {
    if (!data || !allPossibleCombinations || allPossibleCombinations.trim() === "") return;

    const arrayA = allPossibleCombinations.replaceAll(" ", "").split(",");
    setIsAnswerCorrect(
      compareArray(
        arrayA[0].toLowerCase() == "x" && arrayA.length == 1 ? [] : arrayA,
        data.possible_consequences
      )
    );
  }, [allPossibleCombinations, data]);

  return (
    <>
    <h2 className={
          data && allPossibleCombinations !== null
            ? isAnswerCorrect
              ? "corect_text"
              : "incorect_text"
            : ""
        }
      >
        {" "}
        {data &&
          allPossibleCombinations !== null &&
          (isAnswerCorrect
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
          onChange={(e) => setAllPossibleCombinations(e.target.value)}
        />
      </label>
      <br />
    </>
  );
}

export default Combinations;
