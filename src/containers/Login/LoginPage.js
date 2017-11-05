import React from 'react';
import './LoginPage.css';

const LoginPage = () =>
  (
    <div className=" hero is-fullheight login-page">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title" id="main-title">QUICKNOTES</h1>
          <div className="login-form">
            <h2 className="title">Sign In</h2>
            <a href="/api/auth" className="button is-medium github-button">
              <span className="icon is-medium">
                <i className="fa fa-github" />
              </span>
              <span>Sign in with GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

export default LoginPage;
