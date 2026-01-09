import { useState } from "react"


function FirstDirectives({data}) {
  const [corectdirectiveA, setcorectdirectiveA] = useState(null)
  const [corectdirectiveB, setcorectdirectiveB] = useState(null)
  const [corectdirectiveC, setcorectdirectiveC] = useState(null)


  
  // console.log(data.directive_on)
  


  return(

    <>
      <h1>
        Dyrektywa 1:  { data  && (corectdirectiveA ? "Twoja odpowiedź jest poprawna.": "Twoja odpowiedź jest błędna.")}
        </h1>
       <label>
          <input type="radio" name="myRadio" value="True"  onChange={e => setcorectdirectiveA((e.target.value === "True") === data.directive_one)}/>
          Tak
        </label>
        <label>
          <input type="radio" name="myRadio" value="False" onChange={e => setcorectdirectiveA((e.target.value === "True") === data.directive_one)} />
          Nie
        </label>
    <br/>
          <h1>
        Dyrektywa 2:  { data  && (corectdirectiveB ? "Twoja odpowiedź jest poprawna.": "Twoja odpowiedź jest błędna.")}
        </h1>
       <label>
          <input type="radio" name="myRadio2" value="True" onChange={e => setcorectdirectiveB((e.target.value === "True") === data.directive_two)}/>
          Tak
        </label>
        <label>
          <input type="radio" name="myRadio2" value="False"  onChange={e => setcorectdirectiveB((e.target.value === "True") === data.directive_two)}/>
          Nie
        </label>

    <br/>

           <h1>
        Dyrektywa 3:  { data  && (corectdirectiveC ? "Twoja odpowiedź jest poprawna.": "Twoja odpowiedź jest błędna.")}
        </h1>
       <label>
          <input type="radio" name="myRadio3" value="True" onChange={e => setcorectdirectiveC((e.target.value === "True") === data.directive_three)}/>
          Tak
        </label>
        <label>
          <input type="radio" name="myRadio3" value="False" onChange={e => setcorectdirectiveC((e.target.value === "True") === data.directive_three)}/>
          Nie
        </label>

    <br/>

   
    </>
  )
}

export default FirstDirectives
