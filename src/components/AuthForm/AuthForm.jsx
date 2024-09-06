import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import Message from '../Message/Message';
import ForgotPasswordModal from '../ForgotPasswordModal/ForgotPasswordModal';
import styles from '../AuthForm/AuthForm.module.css';
import button from '../Button/Button.module.css';



function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const validateEmail = (email) => {
    const validEmail = /\S+@\S+\.\S+/;
    return validEmail.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(email)) {
      setError('Неверный адрес электронной почты');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен быть больше 5 символов');
      return;
    }

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = {
        success: email === 'test@example.com' && password === 'password123',
      };

      if (result.success) {
        setSuccess('Вы вошли в аккаунт.');
        setEmail('');
        setPassword('');
      } else {
        setError('Неверный адрес электронной почты или пароль.');
      }
    } catch (err) {
      setError('Что-то пошло не так. Пожалуйста, попробуйте снова.');
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleCloseModal = () => {
    setShowForgotPassword(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="login-header">
            <img src="icon_logo.png" className="login-image"/>
            <h2 className="login-title">Вход в аккаунт</h2>
        </div>

        {error && <Message type="error">{error}</Message>}
        {success && <Message type="success">{success}</Message>}
        <InputField
          label="Адрес электронной почты"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Пароль"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className={button.buttonSubmit}>Войти в аккаунт</Button>
        <Button type="button" className={button.linkButton} onClick={handleForgotPassword}>
          Забыли пароль?
        </Button>
      </form>
      {showForgotPassword && <ForgotPasswordModal onClose={handleCloseModal} />}
    </div>
  );
}

export default AuthForm;
