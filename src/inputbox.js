import React, { useState } from 'react';

function InputBox() {
  const [value, setValue] = useState(0);

  return (
    <div>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter something..."
      />
      
      <p>Entered Value: {value}</p>
    </div>
  );
}

export default InputBox;