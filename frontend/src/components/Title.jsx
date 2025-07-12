import React from "react";

const Title = ({ title, subTitle }) => {
  return (
    <>
      <h1 className="font-medium text-3xl">{title}</h1>
      <p>{subTitle}</p>
    </>
  );
};

export default Title;
