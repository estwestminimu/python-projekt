import { useState, useEffect } from "react"


function FirstDirectives({ data }) {
  const [corectdirectiveA, setcorectdirectiveA] = useState(null)
  const [corectdirectiveB, setcorectdirectiveB] = useState(null)
  const [corectdirectiveC, setcorectdirectiveC] = useState(null)

  const [selectA, setselectA] = useState(null)
  const [selectB, setselectB] = useState(null)
  const [selectC, setselectC] = useState(null)


useEffect(() => {
  if (data && selectA !== null) {
    setcorectdirectiveA((selectA === "True") === data.directive_one) 
  }
}, [data, selectA])


useEffect(() => {
  if (data && selectB !== null) {
    setcorectdirectiveB((selectB === "True") === data.directive_two)
  }
}, [data, selectB])


useEffect(() => {
  if (data && selectC !== null) {
    setcorectdirectiveC((selectC === "True") === data.directive_three) 
  }
}, [data, selectC])



  return (

    <>
      <h1>
        Dyrektywa 1:  {data && selectA !== null && (corectdirectiveA ? "Twoja odpowiedź jest poprawna." : "Twoja odpowiedź jest błędna.")}
      </h1>
      <label>
        <input type="radio" name="directive1" value="True" onChange={e =>setselectA(e.target.value)}



        />
        Tak

        <input type="radio" name="directive1" value="False" onChange={e =>setselectA(e.target.value)}

        />
        Nie
      </label>
      <br/>
      <h1>
        Dyrektywa 2:  {data && selectB !== null && (corectdirectiveB ? "Twoja odpowiedź jest poprawna." : "Twoja odpowiedź jest błędna.")}
      </h1>
      <label>
        <input type="radio" name="directive2" value="True" onChange={e =>setselectB(e.target.value)}



        />
        Tak

                <input type="radio" name="directive2" value="False" onChange={e =>setselectB(e.target.value)}



        />
        Nie
      </label>
      <br/>
            <h1>
        Dyrektywa 3:  {data && selectC !== null && (corectdirectiveC ? "Twoja odpowiedź jest poprawna." : "Twoja odpowiedź jest błędna.")}
      </h1>
      <label>
        <input type="radio" name="directive3" value="True" onChange={e =>setselectC(e.target.value)}



        />
        Tak
                <input type="radio" name="directive3" value="False" onChange={e =>setselectC(e.target.value)}



        />
        Nie
      </label>
      <br/>
    </>
  )
}

export default FirstDirectives
