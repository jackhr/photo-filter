import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="below-nav">
      <div className="login-button-div">
        <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Click Me To Sign Up' : 'Click Me To Log In'}</button>
      </div>
      <div id="auth-form">
        {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
      </div>
    </main>
  );
}