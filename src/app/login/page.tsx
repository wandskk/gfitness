"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import { UserContext } from "@/context/UserContext";
import "./page.scss";

const Page = () => {
  const [username, setUsername] = React.useState("admin");
  const [password, setPassword] = React.useState("admin");
  const [errorLogin, setErrorLogin] = React.useState("");
  const { userLogin, loading } = React.useContext(UserContext) || {};

  async function handleSubmit(event: any) {
    event.preventDefault();

    const login = await userLogin(username, password);

    !login.isLogged ? setErrorLogin(login.message) : setErrorLogin("");
  }

  return (
    <section className="login">
      <div className="login__box">
        <div className="py-4">
          <Logo />
        </div>
        {errorLogin && (
          <div className="text-danger text-center">{errorLogin}</div>
        )}
        <form onSubmit={handleSubmit} className="login__form">
          <div className="mb-3">
            <input
              type="text"
              id="username"
              className="form-control login__form__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              id="password"
              className="form-control login__form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
          </div>
          <div className="d-flex flex-md-row flex-column gap-2 justify-content-between mb-3">
            <div className="form-check login__form__remember">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Lembrar minha senha
              </label>
            </div>
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary login__form__submit  mt-3"
              disabled={loading}
            >
              Entrar
            </button>
          </div>
          <p className="d-flex flex-column align-items-center mt-4 login__form__forgot">
            Esqueceu sua senha?
            <Link className="login__form__forgot" href="/forgot">
              Clique aqui
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Page;
