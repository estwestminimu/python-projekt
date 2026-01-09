import { useState } from 'react';

function compareArray(arr1: string[], arr2: string[]){
  
  if(arr2.length==0 && arr2.length==0)
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

  return (
    <>
      Dyrektywa 4:  {data && (corectdirectiveD ? "Twoja odpowiedź jest poprawna." : "Twoja odpowiedź jest błędna.")}


      <label>
        <input type="text" onChange={e =>        
         {
          // console.log(data.directive_five)
          
          const arrayA = e.target.value
          .replaceAll(' ', '')
          .split(',')
          .map(x => x);
          // console.log(arrayTest)
          setcorectdirectiveD(compareArray(arrayA, data?.directive_four ?? []))

        }} />


      </label>
      <br />
      Dyrektywa 5:  {data && (corectdirectiveE ? "Twoja odpowiedź jest poprawna." : "Twoja odpowiedź jest błędna.")}

      <label>
        <input type="text" onChange={e =>
        
        {
          // console.log(data.directive_five)
          
          const arrayA = e.target.value
          .replaceAll(' ', '')
          .split(',')
          .map(x => x);
          // console.log(arrayTest)arrayA
          setcorectdirectiveE(compareArray(arrayA,data?.directive_five ?? []))

        }


        } />

      </label>

      <br />
      Dyrektywa 6:  {data && (corectdirectiveF ? "Twoja odpowiedź jest poprawna." : "Twoja odpowiedź jest błędna.")}

      <label>
        <input type="text"  onChange={e => 
          {
          // console.log(data.directive_five)
          
          const arrayA = e.target.value
          .replaceAll(' ', '')
          .split(',')
          .map(x => x);
          // console.log(arrayTest)
          setcorectdirectiveF(compareArray(arrayA, data?.directive_six ?? []))


          }
        }/>


      </label>
      <br />




    </>
  )
}

export default SecondDirectives
