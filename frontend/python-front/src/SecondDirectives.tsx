

function SecondDirectives() {
  return(
    <>
    {/* TODO DODAĆ WALIDACJE NA ZASADZIE PRZEKAZYWANEGO TEKSTU W OSOBNEJ KOMORCE KTORA PDOMEINAI CZY TEKST SIE ZGADZA CZY NIE */}
      Dyrektywa 4:
       <label>
          <input type="radio" name="myRadio" value="True" />
          Tak
        </label>
        <label>
          <input type="radio" name="myRadio" value="False" />
          Nie
        </label>
    <br/>
      Dyrektywa 5:
       <label>
          <input type="radio" name="myRadio2" value="True" />
          Tak
        </label>
        <label>
          <input type="radio" name="myRadio2" value="False" />
          Nie
        </label>
    <br/>
          Dyrektywa 6:
       <label>
          <input type="radio" name="myRadio2" value="True" />
          Tak
        </label>
        <label>
          <input type="radio" name="myRadio2" value="False" />
          Nie
        </label>
    <br/>


    
    
    </>
  )
}

export default SecondDirectives
