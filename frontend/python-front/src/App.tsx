import { useState, useEffect } from 'react';
import InputFeedback from './InputFeedback.tsx'
import axios from 'axios';


function App() {
  
  // do sprawdzenia czy dane wprowadzone przez użytkownika sa poprawne
  const [isInputCorrect, setIsInputCorrect] = useState(false) 

  // Czy dane sa ladowane
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)

  const [data, setData] = useState(null)



  const sendData = async () => 
    {
      //rozpoczynamy proces ładowania danych
      setLoading(true)
      setError(null)


      try {
        const request = await axios.post('http://127.0.0.1:8000/validation',{
          firstSentence: "1",
          firstScheme: "2",
          secondSentence: "3",
          secondScheme: "4",
        });

        setData(request.data)


      } catch (err) {
        console.log(err)
      }
      finally
    {
      setLoading(false)
    }



    }



  return(
    <h1>
      <InputFeedback status={isInputCorrect}/>
      <button
        onClick={sendData}
        disabled={loading}>
          {loading ? "Analizowanie..." : "Wyślij dane"}
        </button>
        <h1>test {JSON.stringify(data)}</h1>
    </h1>
  );
}

export default App
