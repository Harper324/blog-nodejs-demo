import React from "react";

export default function Text(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <article>{props.text}</article>
    </div>
  );
}
