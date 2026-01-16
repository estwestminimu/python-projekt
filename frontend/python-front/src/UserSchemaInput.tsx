
import { useState } from 'react';
import axios from 'axios';
import FirstDirectives from './FirstDirectives.tsx'
import SecondDirectives from './SecondDirectives.tsx'
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
      // @ts-ignore
        //  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

        const API_URL = 'http://127.0.0.1:8000';
        
        //Wysylamy dane do api wedlug naszych inputow
        const request = await axios.post(`${API_URL}/validation`,{
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
                <h3>Zdanie 1: </h3>
                  <br />
                <input className='input' placeholder="wpisz coś" type="text"  value={firstSentence}
                onChange={(e)=>setfirstSentence(e.target.value)}/>  
           <br />
                <input className='input' type="text" placeholder="wpisz coś"  value={firstScheme}
                onChange={(e)=>setfirstScheme(e.target.value)}/>
                <br />
                  <h3>Zdanie 2: </h3>
                  <br />
                <input className='input'  type="text" placeholder="wpisz coś" value={secondSentence}
                onChange={(e)=>setsecondSentence(e.target.value)} /> 
  <br />
                 <input className='input' type="text" placeholder="wpisz coś" value={secondScheme} 
                 onChange={(e)=>setsecondScheme(e.target.value)}/>
                 <br/>
              
                {/* <h1>test {JSON.stringify(data)}</h1> */}

       <h4>Uzupełnij dyrektywy</h4>

       <br/>
      <FirstDirectives data={data}/>
       <br/>
      <SecondDirectives data={data}/>
      <div className='cent'>

 <button
                    onClick={sendData}
                    disabled={loading}>
                    {loading ? "Analizowanie..." : "Wyślij dane"}
                </button>

      </div>
        </>
    )
}

export default UserSchemaInput
