// InputField.jsx
import React from 'react';
import styles from './InputField.module.css';

function InputField({ label, type, name, value, onChange }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
        className={styles.input}
      />
    </div> 
  );
}

export default InputField;
