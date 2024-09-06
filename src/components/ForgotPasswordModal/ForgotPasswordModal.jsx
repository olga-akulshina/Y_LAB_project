import React, { useState } from 'react';
import Button from '../Button/Button';
import styles from './ForgotPasswordModal.module.css';

function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Неверный адрес электронной почты.');
      return;
    }

    try {
      await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      setMessage('Письмо для установления нового пароля отправлено на Вашу электронную почту.');
      setEmail('');
    } catch (err) {
      setMessage('Что-то пошло не так. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Вы забыли пароль?</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="forgot-email">Введите адрес электронной почты: </label>
          <input
            type="email"
            id="forgot-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <Button type="submit" className={styles.ModalButtonSubmit}>Отправить</Button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
        <Button type="button" className={styles.closeButton} onClick={onClose}>
          Закрыть
        </Button>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
