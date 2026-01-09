import { useState, useEffect } from 'react';

function compareArray(arr1, arr2){
  
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



function SecondDirectives({ data }) {
  const [corectdirectiveD, setcorectdirectiveD] = useState(null)
  const [corectdirectiveE, setcorectdirectiveE] = useState(null)
  const [corectdirectiveF, setcorectdirectiveF] = useState(null)

  const [arrayTest, setArrayTest] = useState([])

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
          setArrayTest(arrayA);
          // console.log(arrayTest)
          setcorectdirectiveD(compareArray(arrayA, data.directive_four))

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
          setArrayTest(arrayA);
          // console.log(arrayTest)arrayA
          setcorectdirectiveE(compareArray(arrayA, data.directive_five))

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
          setArrayTest(arrayA);
          // console.log(arrayTest)
          setcorectdirectiveF(compareArray(arrayA, data.directive_six))


          }
        }/>


      </label>
      <br />




    </>
  )
}

export default SecondDirectives
