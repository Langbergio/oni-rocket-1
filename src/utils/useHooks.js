import React, { useState } from 'react';

export function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  return {
    value,
    onChange(e) {
      setValue(e.target.value);
    }
  };
}

export function useSelect(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  return {
    value,
    onChange(val) {
      setValue(val);
    }
  };
}