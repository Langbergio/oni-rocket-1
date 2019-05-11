import React, { useState } from 'react';

export function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  return {
    value,
    onChange(e) {
      setValue(e.target.value);
    },
    setValue,
  };
}

export function useCheckbox(defaultValue) {
  const [checked, setChecked] = useState(defaultValue);
  return {
    checked,
    onChange(e) {
      setChecked(e.target.checked);
    },
    setValue: setChecked,
  };
}

export function useSelect(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  return {
    value,
    onChange(val) {
      setValue(val);
    },
    setValue,
  };
}

export function useHistory(defaultValue) {
  const [, forceUpdate] = useState();
  let value = defaultValue;

  try {
    value = JSON.parse(localStorage.getItem('history')) || defaultValue;
  } catch (err) {
    // Do nothing...
  }

  function setValue(newValue) {
    localStorage.setItem('history', JSON.stringify(newValue));
    forceUpdate({});
  }

  return [value, setValue];
}