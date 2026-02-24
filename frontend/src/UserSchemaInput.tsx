import { useState } from "react";
import axios from "axios";
import FirstDirectives from "./FirstDirectives.tsx";
import SecondDirectives from "./SecondDirectives.tsx";
import Combinations from "./Combinations.tsx";
import Answer from "./Answer.tsx";

const API_URL = "http://127.0.0.1:8000";

function UserSchemaInput() {
  const [loading, setLoading] = useState(false);
  const [formalizing, setFormalizing] = useState<{ first: boolean; second: boolean }>({ first: false, second: false });
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState(null);

  const [firstPremise, setFirstPremise] = useState("");
  const [secondPremise, setSecondPremise] = useState("");

  const [firstPremiseForm, setFirstPremiseForm] = useState("");
  const [secondPremiseForm, setSecondPremiseForm] = useState("");

  const formalize = async (which: "first" | "second") => {
    const premise = which === "first" ? firstPremise : secondPremise;
    if (!premise.trim()) return;

    setFormalizing((prev) => ({ ...prev, [which]: true }));
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/formalize`, { premise });
      const result = response.data.output;
      if (which === "first") setFirstPremiseForm(result);
      else setSecondPremiseForm(result);
    } catch (err) {
      setError("Błąd podczas formalizacji. Upewnij się, że serwer jest uruchomiony pod adresem " + API_URL);
      console.error(err);
    } finally {
      setFormalizing((prev) => ({ ...prev, [which]: false }));
    }
  };

  const sendData = async () => {
    setError(null);

    // walidacja przed wysłaniem
    if (!firstPremise.trim() || !secondPremise.trim()) {
      setError("Wprowadź poprawnie przesłanki.");
      return;
    }
    if (!firstPremiseForm.trim() || !secondPremiseForm.trim()) {
      setError("Podaj formalizację obu przesłanek (wpisz ręcznie lub użyj przycisku 'Formalizuj').");
      return;
    }

    setLoading(true);
    setData(null);

    try {
      const response = await axios.post(`${API_URL}/validation`, {
        firstSentence: firstPremise,
        firstScheme: firstPremiseForm,
        secondSentence: secondPremise,
        secondScheme: secondPremiseForm,
      });
      setData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(`Błąd serwera: ${err.response.status} – ${JSON.stringify(err.response.data)}`);
        } else if (err.request) {
          setError("Brak odpowiedzi serwera. Upewnij się, że backend działa pod adresem " + API_URL);
        } else {
          setError("Błąd żądania: " + err.message);
        }
      } else {
        setError("Nieoczekiwany błąd. Sprawdź konsolę.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Przesłanka 1: </h3>
      <input
        className="input"
        placeholder="Wpisz przesłankę"
        type="text"
        value={firstPremise}
        onChange={(e) => setFirstPremise(e.target.value)}
      />

      <h3 className="second">Formalizacja przesłanki 1: </h3>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          className="input"
          type="text"
          placeholder="Zapisz formalnie przesłankę lub naciśnij formalizuj"
          value={firstPremiseForm}
          onChange={(e) => setFirstPremiseForm(e.target.value)}
        />
        <button
          onClick={() => formalize("first")}
          disabled={formalizing.first || !firstPremise.trim()}
        >
          {formalizing.first ? "..." : "Formalizuj"}
        </button>
      </div>

      <h3>Przesłanka 2: </h3>
      <input
        className="input"
        type="text"
        placeholder="Wpisz przesłankę"
        value={secondPremise}
        onChange={(e) => setSecondPremise(e.target.value)}
      />

      <h3 className="second">Formalizacja przesłanki 2: </h3>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          className="input"
          type="text"
          placeholder="Zapisz formalnie przesłankę lub naciśnij formalizuj"
          value={secondPremiseForm}
          onChange={(e) => setSecondPremiseForm(e.target.value)}
        />
        <button
          onClick={() => formalize("second")}
          disabled={formalizing.second || !secondPremise.trim()}
        >
          {formalizing.second ? "..." : "Formalizuj"}
        </button>
      </div>

      <br />

      <h4>Wypisz wszystkie możliwe wnioski:</h4>
      <br />
      <Combinations data={data} />

      <h4>Sprawdź dyrektywy:</h4>
      <br />
      <FirstDirectives data={data} />
      <br />
      <SecondDirectives data={data} />

      <Answer data={data} />

      {error && (
        <div style={{
          margin: "1rem 0",
          padding: "0.75rem 1rem",
          background: "#fef2f2",
          border: "1px solid #fca5a5",
          borderRadius: "8px",
          color: "#b91c1c",
          fontSize: "0.875rem",
        }}>
          ⚠ {error}
        </div>
      )}

      <div className="cent">
        <button onClick={sendData} disabled={loading}>
          {loading ? "Analizowanie..." : "Sprawdź"}
        </button>
      </div>
    </>
  );
}

export default UserSchemaInput;