

function SecondDirectives() {
  return(
    <>
    {/* TODO DODAĆ WALIDACJE NA ZASADZIE PRZEKAZYWANEGO TEKSTU W OSOBNEJ KOMORCE KTORA PDOMEINAI CZY TEKST SIE ZGADZA CZY NIE */}
      Dyrektywa Wstępna:
       <label>
          <input type="radio" name="myRadio" value="True" />
          Tak
        </label>
        <label>
          <input type="radio" name="myRadio" value="False" />
          Nie
        </label>
    <br/>
      Dyrektywa 1:
       <label>
          <input type="radio" name="myRadio2" value="True" />
          Tak
        </label>
        <label>
          <input type="radio" name="myRadio2" value="False" />
          Nie
        </label>
    <br/>

      Dyrektywa 2:
       <label>
          <input type="radio" name="myRadio3" value="True" />
          Tak
        </label>
        <label>
          <input type="radio" name="myRadio3" value="False" />
          Nie
        </label>
    <br/>

      Dyrektywa 3:
       <label>
          <input type="radio" name="myRadio4" value="True" />
          Tak
        </label>
        <label>
          <input type="radio" name="myRadio4" value="False" />
          Nie
        </label>

    
    
    </>
  )
}

export default SecondDirectives
