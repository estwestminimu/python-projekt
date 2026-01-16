import { useState, useEffect } from 'react';

function compareArray(arr1: string[], arr2: string[]){
  
  if(arr1.length==0 && arr2.length==0)
  {
    return true;
  }

  if(arr1.length != arr2.length)
    {
      return false;
    }
  
    const sortedArr1 = arr1.sort();
    const sortedArr2 = arr2.sort();

    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] != sortedArr2[i]) {
          return false;
        }      
    }
    return true;
}

type SecondDirectivesProps = {
    data: {
    directive_four: string[];
    directive_five: string[];
    directive_six: string[];
  } | null;
};

function SecondDirectives({ data }: SecondDirectivesProps) {
  const [corectdirectiveD, setcorectdirectiveD] = useState<boolean>(false);
  const [corectdirectiveE, setcorectdirectiveE] = useState<boolean>(false);
  const [corectdirectiveF, setcorectdirectiveF] = useState<boolean>(false);

  const [selectD, setselectD] = useState<string>(' ');
  const [selectE, setselectE] = useState<string>(' ');
  const [selectF, setselectF] = useState<string>(' ');


  useEffect(() => {
    if (!data ||!selectD || selectD.trim() === '') return;
      
    const arrayA = selectD
    .replaceAll(' ', '')
    .split(',');

     setcorectdirectiveD(compareArray(arrayA[0]=='x'? []: arrayA, data.directive_four ))

  }, [selectD, data]);



  useEffect(() => {
    if (!data ||!selectE || selectE.trim() === '') return;
      
    const arrayA = selectE
    .replaceAll(' ', '')
    .split(',');
    setcorectdirectiveE(compareArray(arrayA[0]=='x'? []: arrayA, data.directive_five ))

  }, [selectE, data]);



  useEffect(() => {
    if (!data ||!selectF || selectF.trim() === '') return;
      
    const arrayA = selectF
    .replaceAll(' ', '')
    .split(',');

    setcorectdirectiveF(compareArray(arrayA[0]=='x'? []: arrayA, data.directive_six ))

  }, [selectF, data]);




  return (
    <>
     <h2 className=
      {
        data && selectD !== null ? corectdirectiveD ? "corect_text" : "incorect_text" : ""
      }>
      Dyrektywa 4:  {data && selectD !== null && (corectdirectiveD ? "Twoja odpowiedź jest poprawna." : "Twoja odpowiedź jest błędna.")}

      </h2>
      <span className='info'>Wpisz x w przypadku pustej odpowiedz</span>

      <br/>

      <label>
        <input type="text" className='input' placeholder="wpisz coś" onChange={e =>  setselectD(e.target.value)} />


      </label>
      <br />
           <h2 className=
      {
        data && selectE !== null ? corectdirectiveE ? "corect_text" : "incorect_text" : ""
      }>
      Dyrektywa 5:  {data && selectE !==null  && (corectdirectiveE ? "Twoja odpowiedź jest poprawna." : "Twoja odpowiedź jest błędna.")}
      </h2>
      <span className='info'>Wpisz x w przypadku pustej odpowiedz</span>
      <br/>

      <label>
     <input type="text" className='input' placeholder="wpisz coś" onChange={e =>  setselectE(e.target.value)} />

      </label>

      <br />
                 <h2 className=
      {
        data && selectF !== null ? corectdirectiveF ? "corect_text" : "incorect_text" : ""
      }>
      Dyrektywa 6:  {data  && selectF !==null   && (corectdirectiveF ? "Twoja odpowiedź jest poprawna." : "Twoja odpowiedź jest błędna.")}

      </h2>

      <span className='info'>Wpisz x w przypadku pustej odpowiedz</span>
      <br/>
      <label>
       <input type="text" className='input' placeholder="wpisz coś" onChange={e =>  setselectF(e.target.value)} />


      </label>
      <br />




    </>
  )
}

export default SecondDirectives
