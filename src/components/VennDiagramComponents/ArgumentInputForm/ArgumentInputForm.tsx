import React, { useState } from "react";

type Props = {
  premiseOne: string;
  premiseTwo: string;
  conc: string;
  setPremiseOne: React.Dispatch<React.SetStateAction<string>>;
  setPremiseTwo: React.Dispatch<React.SetStateAction<string>>;
  setConc: React.Dispatch<React.SetStateAction<string>>;
};

const ArgumentInputForm = ({
  premiseOne,
  premiseTwo,
  conc,
  setPremiseOne,
  setPremiseTwo,
  setConc,
}: Props) => {
  console.log("this is the input form component");
  const [inputOne, setInputOne] = useState(premiseOne);
  const [inputTwo, setInputTwo] = useState(premiseTwo);
  const [inputThree, setInputThree] = useState(conc);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPremiseOne(inputOne);
    setPremiseTwo(inputTwo);
    setConc(inputThree);
    console.log("handled submit");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Argument 1:
        <input
          type="text"
          name="premiseOne"
          value={inputOne}
          onChange={(e) => setInputOne(e.target.value)}
        />
      </label>

      <label>
        Argument 2:
        <input
          type="text"
          name="premiseTwo"
          value={inputTwo}
          onChange={(e) => setInputTwo(e.target.value)}
        />
      </label>

      <label>
        Argument 3:
        <input
          type="text"
          name="conc"
          value={inputThree}
          onChange={(e) => setInputThree(e.target.value)}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ArgumentInputForm;
