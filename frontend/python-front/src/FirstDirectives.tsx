import { useState, useEffect } from "react"

type FirstDirectivesProps = {
  data: any;
};


function FirstDirectives({ data }: FirstDirectivesProps) {
  const [corectdirectiveA, setcorectdirectiveA] = useState<boolean | null>(null);
  const [corectdirectiveB, setcorectdirectiveB] = useState<boolean | null>(null);
  const [corectdirectiveC, setcorectdirectiveC] = useState<boolean | null>(null);

  const [selectA, setselectA] = useState<string | null>(null);
  const [selectB, setselectB] = useState<string | null>(null);
  const [selectC, setselectC] = useState<string | null>(null);


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
      <h2 className=
      {
        data && selectA !== null ? corectdirectiveA ? "corect_text" : "incorect_text" : ""
      }>
        Dyrektywa 1:  {data && selectA !== null && (corectdirectiveA ? "Twoja odpowiedź jest poprawna." : "Twoja odpowiedź jest błędna.")}
      </h2>
    

      <div className="radio-input">
        <label>
          <input type="radio" id="value-1" name="directive1" value="True" onChange={e => setselectA(e.target.value)} />
            <span>TAK</span>
        </label>
        <label>
          <input type="radio" id="value-2" name="directive1" value="False" onChange={e => setselectA(e.target.value)} />
            <span>NIE</span>
        </label>
      </div>




      <br />
            <h2 className=
      {
        data && selectB !== null ? corectdirectiveB ? "corect_text" : "incorect_text" : ""
      }>
        Dyrektywa 2:  {data && selectB !== null && (corectdirectiveB ? "Twoja odpowiedź jest poprawna." : "Twoja odpowiedź jest błędna.")}
      </h2>
      <div className="radio-input">
        <label>
          <input type="radio" id="value-1" name="directive2" value="True" onChange={e => setselectB(e.target.value)} />
            <span>TAK</span>
        </label>
        <label>
          <input type="radio" id="value-2" name="directive2" value="False" onChange={e => setselectB(e.target.value)} />
            <span>NIE</span>
        </label>
      </div>

      <br />
                 <h2 className={
        data && selectC !== null ? corectdirectiveC ? "corect_text" : "incorect_text" : ""
      }>
        Dyrektywa 3:  {data && selectC !== null && (corectdirectiveC ? "Twoja odpowiedź jest poprawna." : "Twoja odpowiedź jest błędna.")}
      </h2>
      <div className="radio-input">
        <label>
          <input type="radio" id="value-1" name="directive3" value="True" onChange={e => setselectC(e.target.value)} />
            <span>TAK</span>
        </label>
        <label>
          <input type="radio" id="value-2" name="directive3" value="False" onChange={e => setselectC(e.target.value)} />
            <span>NIE</span>
        </label>
      </div>

      <br />
    </>
  )
}

export default FirstDirectives
