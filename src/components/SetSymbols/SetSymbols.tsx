"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import "./SetSymbols.scss";

type Props = {
  symbols: Record<string, string>;
  setSymbols: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

const SetSymbols = ({ symbols, setSymbols }: Props) => {
  const commonSymbols = {
    and: ["∧", "&", "."],
    or: ["∨", "|", "+"],
    not: ["¬", "~", "!"],
    implication: ["->", "→"],
    biconditional: ["<->", "↔"],
  };

  useEffect(() => {
    const savedSymbols = {
      and: localStorage.getItem("andSymbol") || "∧",
      or: localStorage.getItem("orSymbol") || "∨",
      not: localStorage.getItem("notSymbol") || "¬",
      implication: localStorage.getItem("implicationSymbol") || "->",
      biconditional: localStorage.getItem("biconditionalSymbol") || "<->",
    };
    setSymbols(savedSymbols);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSymbols({ ...symbols, [name]: value });
    localStorage.setItem(`${name}Symbol`, value); // value to change into

    window.dispatchEvent(new Event("storage"));
  };

  const renderCheckboxes = (operator: keyof typeof commonSymbols) => {
    return commonSymbols[operator].map((symbol: string) => (
      <div key={symbol} className="check-box-container">
        <input
          id={symbol}
          type="radio"
          name={operator}
          value={symbol}
          checked={symbols[operator] === symbol}
          onChange={handleChange}
        />
        <label className="check-box" key={symbol} htmlFor={symbol}>
          {symbol}
        </label>
      </div>
    ));
  };

  return (
    <div className="set-symbols">
      <div>
        <label>AND</label>
        {renderCheckboxes("and")}
      </div>
      <div>
        <label>OR</label>
        {renderCheckboxes("or")}
      </div>
      <div>
        <label>NOT</label>
        {renderCheckboxes("not")}
      </div>
      <div>
        <label>IMPLICATION</label>
        {renderCheckboxes("implication")}
      </div>
      <div>
        <label>BICONDITIONAL</label>
        {renderCheckboxes("biconditional")}
      </div>
    </div>
  );
};

export default SetSymbols;
