import { useState } from "react";
import axios from "axios";
import FirstDirectives from "./FirstDirectives.tsx";
import SecondDirectives from "./SecondDirectives.tsx";
import Combinations from "./Combinations.tsx";
import Answer from "./Answer.tsx";


function UserSchemaInput() {
  // do sprawdzenia czy dane wprowadzone przez użytkownika sa poprawne

  // Czy dane sa ladowane
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);

  //Nasze inputy
  const [firstPremise, setFirstPremise] = useState("");
  const [secondPremise, setSecondPremise] = useState("");

  const [firstPremiseForm, setFirstPremiseForm] = useState("");
  const [secondPremiseForm, setSecondPremiseForm] = useState("");

  // do sprawdzenia czy dane wprowadzone przez użytkownika sa poprawne

  const sendData = async () => {
    //rozpoczynamy proces ładowania danych
    setLoading(true);

    try {
      // @ts-ignore
      // const API_URL = "http://127.0.0.1:8000";
      const API_URL = "https://syllogism.onrender.com";

      //Wysylamy dane do api wedlug naszych inputow
      const request = await axios.post(`${API_URL}/validation`, {
        firstSentence: firstPremise,
        firstScheme: firstPremiseForm,
        secondSentence: secondPremise,
        secondScheme: secondPremiseForm,
      });

      //jesli popelnilismy blad to dostaniemy komunikat ze dane nieporpawne
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
      <input
        className="input"
        type="text"
        placeholder="wpisz coś"
        value={firstPremiseForm}
        onChange={(e) => setFirstPremiseForm(e.target.value)}
      />
      <h3>Zdanie 2: </h3>
      <input
        className="input"
        type="text"
        placeholder="wpisz coś"
        value={secondPremise}
        onChange={(e) => setSecondPremise(e.target.value)}
      />
      <h3 className="second">Lorem: </h3>
      <input
        className="input"
        type="text"
        placeholder="wpisz coś"
        value={secondPremiseForm}
        onChange={(e) => setSecondPremiseForm(e.target.value)}
      />
      <br />

      {/* <h1>test {JSON.stringify(data)}</h1> */}

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
