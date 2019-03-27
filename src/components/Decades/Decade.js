import React from 'react';

const Decade = (props) => {

  const _onClick = () => {
    props.click(props.decade.id);
  };

  return (
    <div className="Decade" onClick={_onClick}>
      <p>{props.decade.title}</p>
    </div>
  );
}

export default Decade