import { useState } from "react";
import UserSchemaInput from "./UserSchemaInput.tsx";
import "./scss/Main.scss";

function InfoAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="info-accordion">
      <button
        className={`info-accordion__toggle ${open ? "info-accordion__toggle--open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>Wprowadzenie</span>
        <span className="info-accordion__chevron">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="info-accordion__body">
          <section>
            <h2>Czym jest sylogistyka?</h2>
            <p>
              Sylogistyka to rachunek logiczny, który umożliwia formalną analizę poprawności wnioskowania. Jest to jeden z najprostszych rachunków logicznych, którego podwaliny stworzył Arystoteles.
            </p>
            <p>
              Sylogistyka bada relacje pomiędzy zdaniami kategorycznymi. Zdania tego rodzaju cechują się budową o strukturze podmiotowo-orzecznikowej. Tradycyjnie podmiot zdania oznacza się literą S (łac. subiectum), natomiast orzecznik literą P (łac. predicatum). W tradycyjnej sylogistyce wyróżniamy 4 rodzaje zdań kategorycznych: zdania ogólno-twierdzące (oznaczane przez literą a), zdanie ogólno-przeczące (litera e), zdania szczegółowo-twierdzące (litera i), oraz zdanie szczegółowo-przeczące (litera o). Zdanie kategoryczne przyjmują następujące postaci: SaP, SeP, SiP, SoP. Litery S oraz P stanowią tutaj zmienne, pod które można podstawiać wyrażenia będące nazwami. Zdanie te oznaczają odpowiednio:
            </p>
            <ul>
              <li>SaP: „Każde S jest P"</li>
              <li>SeP: „Żadne S nie są P"</li>
              <li>SiP: „Niektóre S są P"</li>
              <li>SoP: „Niektóre S nie są P"</li>
            </ul>
            <p>
              Rozumowania sylogistyczne składają się z dwóch przesłanek oraz wniosku. Mając do dyspozycji dwie przesłanki, możemy określić, czy istnieje możliwość wyprowadzenie z nich wniosków, a jeżeli tak, to jakie wnioski mogą zostać wyprowadzone. Wyprowadzenie wniosku, który pozostaje do przesłanek w relacji wynikania logicznego możliwe jest dzięki zastosowaniu tzw. dyrektyw poprawności sylogizmu. Zostaną one omówione w dalszej części.
            </p>
          </section>

          <section>
            <h2>Co umożliwia program?</h2>
            <p>
              Poniższy program umożliwia rozwiązywanie prostych zadań z zakresu sylogistyki, które polegają na wyprowadzeniu wniosku na podstawie przesłanek.
            </p>
            <p>Zadanie to należy wykonać następująco:</p>
            <ul>
              <li>wybieramy interesujący nas układ przesłanek i wprowadzamy pierwszą przesłankę w pole oznaczone „przesłanka 1" oraz drugą przesłankę w pole „przesłanka 2";</li>
              <li>następnie możemy sami podać odpowiednik formalny wprowadzonej przesłanki np. „Każdy kwadrat jest prostokątem" KaP lub skorzystać z opcji „FORMALIZUJ";</li>
              <li>
                w kolejnym kroku musimy wprowadzić wszystkie możliwe wnioski w pole „możliwe wnioski". Możliwe wnioski wyznaczamy poprzez ustalenie, które z terminów (nazw) we wprowadzonych przez nas przesłankach wystąpiły tylko raz, a następnie rozważenie ich wszystkich możliwych kombinacji;
                <br />
                przykładowo dla układu przesłanek:
                <br />
                Każdy fizyk jest geniuszem (FaG)
                <br />
                Niektórzy informatycy nie są fizykami (IoF)
                <br />
                termin „fizyk" wystąpił dwa razy, wniosek będzie zawierać więc termin „informatyk" oraz „geniusz": GaI, GeI, GiI, GoI, IaG, IeG, IiG, IoG
              </li>
              <li>następnie możemy przystąpić do analizy naszego układu przesłanek poprzez rozstrzyganie, czy kolejne dyrektywy są spełnione (dyrektywy 1 – 3) oraz czy na podstawie podanej dyrektywy można wykluczyć jeden z możliwych wniosków (dyrektywy 4 – 6).</li>
            </ul>
          </section>

          <section>
            <h2>O czym stanowią dyrektywy poprawności sylogizmu?</h2>
            <p>
              <strong>Dyrektywa pierwsza:</strong> „Termin średni powinien być w przynajmniej jednej z przesłanek wzięty w całym zakresie".
              <br />
              Wyjaśnienie: termin średni, to termin, który pojawia się w obu przesłankach. Przykładowo dla przesłanek „Każdy fizyk jest geniuszem" (FaG) oraz „Niektórzy informatycy nie są fizykami" (IoF) terminem średnim jest termin „fizyk" (F). Termin jest wzięty w całym zakresie (rozłożony), jeżeli jest podmiotem zdania ogólnego (Xa…, Xe…) lub orzecznikiem zdania przeczącego (…eX, …oX).
            </p>
            <p>
              <strong>Dyrektywa druga:</strong> Przynajmniej jedna przesłanka powinna być twierdząca.
            </p>
            <p>
              <strong>Dyrektywa trzecia:</strong> Przynajmniej jedna przesłanka powinna być ogólna.
            </p>
            <p>
              <strong>Dyrektywa czwarta:</strong> „Wniosek jest zdaniem przeczącym wtedy i tylko wtedy gdy jedna z przestanek jest zdaniem przeczącym.
            </p>
            <p>
              <strong>Dyrektywa piąta:</strong> „Jeżeli jedna przesłanka jest szczegółowa, to wniosek jest szczegółowy.
            </p>
            <p>
              <strong>Dyrektywa szósta:</strong> „Termin rozłożony we wniosku, to musi być rozłożony w przesłance".
              <br />
              Wyjaśnienie: termin jest rozłożony, jeżeli jest wzięty w całym zakresie, czyli jeżeli jest podmiotem zdania ogólnego (Xa…, Xe…) lub orzecznikiem zdania przeczącego (…eX, …oX).
            </p>
          </section>

          <section>
            <h2>Zastrzeżenia:</h2>
            <p>
              Wśród dyrektyw poprawności sylogizmu na uwagę zasługuje również tzw. dyrektywa wstępna. Zgodnie z nią sylogizm nie może zawierać tzw. błędu czterech terminów. Błąd czterech terminów może występować w aspekcie formalnym oraz materialnym.
            </p>
            <p>
              Formalnym błędem czterech terminów obarczony jest układ przesłanek, który zawiera 4 różne litery podstawione w miejsce zmiennych nazwowych:
            </p>
            <p>
              SaP
              <br />
              MeT
            </p>
            <p>
              Błąd materialny jest trudniejszy do wykrycia ponieważ wynika z zjawiska homonimiczności i synonimiczności wyrażeń. Materialnym błędem czterech terminów obarczone jest następujące wnioskowanie:
            </p>
            <p>
              Niektóre średniowieczne budowle są zamkami.
              <br />
              Niektóre zamki są zardzewiałe.
              <br />
              Chociaż w obu powyższych przesłankach występuje słowo „zamek", to w pierwszej odnosi się do budowli średniowiecznej, natomiast w drugiej do mechanizmu umieszczanego w drzwiach i bramach.
            </p>
            <p>
              Dyrektywa ta nie jest analizowana przez nasz program, z uwagi na ograniczenia komputerowych narzędzi do analizy tekstu, które nie są modelami językowymi, w zakresie analizowania homonimii.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <div className="content">
        <InfoAccordion />
        <UserSchemaInput />
      </div>
    </>
  );
}

export default App;
