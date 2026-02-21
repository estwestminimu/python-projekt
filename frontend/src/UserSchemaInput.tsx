import { useState } from "react";
import axios from "axios";
import FirstDirectives from "./FirstDirectives.tsx";
import SecondDirectives from "./SecondDirectives.tsx";
import Combinations from "./Combinations.tsx";
import Answer from "./Answer.tsx";

const API_URL = "http://127.0.0.1:8000";

function UserSchemaInput() {

  // do sprawdzenia czy dane wprowadzone przez użytkownika sa poprawne



  // Czy dane sa ladowane
  const [loading, setLoading] = useState(false);
  const [formalizing, setFormalizing] = useState<{ first: boolean; second: boolean }>({ first: false, second: false });

  const [data, setData] = useState(null);

  const [firstPremise, setFirstPremise] = useState("");
  const [secondPremise, setSecondPremise] = useState("");

  const [firstPremiseForm, setFirstPremiseForm] = useState("");
  const [secondPremiseForm, setSecondPremiseForm] = useState("");

  const formalize = async (which: "first" | "second") => {
    const premise = which === "first" ? firstPremise : secondPremise;
    if (!premise.trim()) return;

    setFormalizing((prev) => ({ ...prev, [which]: true }));
    try {
      const response = await axios.post(`${API_URL}/formalize`, { premise });
      const result = response.data.output;
      if (which === "first") setFirstPremiseForm(result);
      else setSecondPremiseForm(result);
    } catch (err) {
      console.log(err);
    } finally {
      setFormalizing((prev) => ({ ...prev, [which]: false }));
    }
  };

  const sendData = async () => {
    setLoading(true);
    try {
      const request = await axios.post(`${API_URL}/validation`, {
        firstSentence: firstPremise,
        firstScheme: firstPremiseForm,
        secondSentence: secondPremise,
        secondScheme: secondPremiseForm,
      });
      setData(request.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Zdanie 1: </h3>
      <input
        className="input"
        placeholder="wpisz coś"
        type="text"
        value={firstPremise}
        onChange={(e) => setFirstPremise(e.target.value)}
      />
      <h3 className="second">Lorem: </h3>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          className="input"
          type="text"
          placeholder="wpisz coś"
          value={firstPremiseForm}
          onChange={(e) => setFirstPremiseForm(e.target.value)}
        />
        <button onClick={() => formalize("first")} disabled={formalizing.first || !firstPremise.trim()}>
          {formalizing.first ? "..." : "Formalizuj"}
        </button>
      </div>

      <h3>Zdanie 2: </h3>
      <input
        className="input"
        type="text"
        placeholder="wpisz coś"
        value={secondPremise}
        onChange={(e) => setSecondPremise(e.target.value)}
      />
      <h3 className="second">Lorem: </h3>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          className="input"
          type="text"
          placeholder="wpisz coś"
          value={secondPremiseForm}
          onChange={(e) => setSecondPremiseForm(e.target.value)}
        />
        <button onClick={() => formalize("second")} disabled={formalizing.second || !secondPremise.trim()}>
          {formalizing.second ? "..." : "Formalizuj"}
        </button>
      </div>
      <br />

      <h4>Uzupełnij wszystkie możliwe kombinacje:</h4>
      <br />
      <Combinations data={data} />

      <h4>Uzupełnij dyrektywy:</h4>
      <br />
      <FirstDirectives data={data} />
      <br />
      <SecondDirectives data={data} />

      <Answer data={data} />
      <div className="cent">
        <button onClick={sendData} disabled={loading}>
          {loading ? "Analizowanie..." : "Wyślij dane"}
        </button>
      </div>
    </>
  );
}

export default UserSchemaInput;