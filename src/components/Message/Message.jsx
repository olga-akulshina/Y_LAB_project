// Message.jsx
import React from 'react';
import styles from './Message.module.css';

function Message({ type, children }) {
  return (
    <div className={type === 'error' ? styles.error : styles.success}>
      {children}
    </div>
  );
}

export default Message;

