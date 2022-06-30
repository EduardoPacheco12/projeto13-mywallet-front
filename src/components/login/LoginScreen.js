import axios from "axios";
import styled from "styled-components";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/Context";
import { ThreeDots } from  "react-loader-spinner";

export default function LoginScreen() {
    //LOGIC
    const {setToken} = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function FinishLogin(e) {
        e.preventDefault();
        setLoading(true);
        const body = {
            email,
            password
        }
        const promise = axios.post("https://localhost:5000/login", body);
        promise.then( response => {
            setToken(response.data.token);
            setLoading(false);
            navigate("/saldo");
        })
        promise.catch(() => {
            alert("Não foi possível fazer o login, tente novamente.")
            setLoading(false);
            setEmail("");
            setPassword("");
        })
    }

    //UI
    return(
        <All>
            <Logo>
                <h1>MyWallet</h1>
            </Logo>
            <Forms onSubmit={FinishLogin}>
                <input type="email" placeholder="E-mail" disabled={loading === true ? true : false} onChange={(e) => setEmail(e.target.value)} value={email} required/>
                <input type="password" placeholder="Senha" disabled={loading === true ? true : false} onChange={(e) => setPassword(e.target.value)} value={password} required/>
                <button type="submit" disabled={loading === true ? true : false}>
                    {loading === true ? <ThreeDots color="#FFFFFF" height={80} width={80} /> : "Entrar"}
                </button>
            </Forms>
            <Click to="/cadastro">
                <BackRegister>Primeira vez? Cadastre-se!</BackRegister>
            </Click>
        </All>
    );
}

const All = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 160px;
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    h1 {
        font-family: 'Saira Stencil One';
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #FFFFFF;
    }
`;

const Forms = styled.form `
    display: flex;
    flex-direction: column;
    input {
        min-width: 280px;
        max-width: 326px;
        height: 58px;
        margin-bottom: 14px;
        background: #FFFFFF;
        border: 1px solid #FFFFFF;
        border-radius: 5px;
        font-family: 'Raleway';
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
        padding-left: 15px;
        ::-webkit-input-placeholder {
            font-family: 'Raleway';
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
            color: #000000;
        }
    }

    button {
        min-width: 280px;
        max-width: 326px;
        height: 46px;
        margin-bottom: 36px;
        background-color: #A328D6;
        border: 1px solid #A328D6; 
        border-radius: 5px;
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        color: #FFFFFF;
        &:hover {
            cursor: pointer;
        }
    }
`;

const BackRegister = styled.p `
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
`;

const Click = styled(Link) `
    text-decoration: none;
`;
