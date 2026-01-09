
import { useState, useEffect } from 'react';
import axios from 'axios';
import InputFeedback from './InputFeedback.tsx'
import FirstDirectives from './FirstDirectives.tsx'
import SecondDirectives from './SecondDirectives.tsx'
import UserTypeInput from './UserTypeInput.tsx'

function UserSchemaInput() {
  // do sprawdzenia czy dane wprowadzone przez użytkownika sa poprawne

  // Czy dane sa ladowane
  const [loading, setLoading] = useState(false)


  const [data, setData] = useState(null)

    //Nasze inputy
    const [firstSentence, setfirstSentence] = useState("")
    const [firstScheme, setfirstScheme] = useState("")
    const [secondSentence, setsecondSentence] = useState("")
    const [secondScheme, setsecondScheme] = useState("")


  // do sprawdzenia czy dane wprowadzone przez użytkownika sa poprawne
  const [isInputCorrect, setIsInputCorrect] = useState(true) 




  const sendData = async () => 
    {
      //rozpoczynamy proces ładowania danych
      setLoading(true)
      setIsInputCorrect(true)


      try {
        //Wysylamy dane do api wedlug naszych inputow
        const request = await axios.post('http://127.0.0.1:8000/validation',{
          firstSentence: firstSentence,
          firstScheme: firstScheme,
          secondSentence: secondSentence,
          secondScheme: secondScheme,
        });

        //jesli popelnilismy blad to dostaniemy komunikat ze dane nieporpawne
        setData(request.data)
        if (request.data.msg===false)
        {
            setIsInputCorrect(false)
        }


      } catch (err) {
        console.log(err)
      }
      finally
    {
      setLoading(false)
    }



    }




    return (
        <>
        <InputFeedback status={isInputCorrect}/>
            <label>
                Zdanie 1: 
                <input name="myInput" value={firstSentence}
                onChange={(e)=>setfirstSentence(e.target.value)}/>  

                <input name="myInput" value={firstScheme}
                onChange={(e)=>setfirstScheme(e.target.value)}/>
                <br />
                Zdanie 2: 
                <input name="myInput" value={secondSentence}
                onChange={(e)=>setsecondSentence(e.target.value)} /> 

                 <input name="myInput" value={secondScheme} 
                 onChange={(e)=>setsecondScheme(e.target.value)}/>
                 <br/>
                <button
                    onClick={sendData}
                    disabled={loading}>
                    {loading ? "Analizowanie..." : "Wyślij dane"}
                </button>
                <h1>test {JSON.stringify(data)}</h1>
            </label>

    <UserTypeInput/>
       <h1>2</h1>

       <br/>
      <FirstDirectives data={data}/>
       <br/>
       <h1>3</h1>
      <SecondDirectives data={data}/>

        </>
    )
}

export default UserSchemaInput
