import React from 'react';
import styles from '../Button/Button.module.css';

function Button({ children, className, ...props }) {
  return (
    <button {...props} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
