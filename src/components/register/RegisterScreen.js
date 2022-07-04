import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from  "react-loader-spinner";

export default function RegisterScreen() {
    //LOGIC
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function FinishRegister(e) {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            alert("Os campos de 'Senha' e 'Confirmar senha' devem ser iguais");
            setLoading(false);
        } else {
            const body = {
                name,
                email,
                password
            };
            const promise = axios.post("https://mywallet-back-edupacheco.herokuapp.com/cadastro", body);
            promise.then( () => {
                setLoading(false);
                navigate("/");
            })
            promise.catch( (error) => {
                if(error.response.status === 422) {
                    alert("Esses dados já foram utilizados para cadastro")
                    setLoading(false);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                }
                if(error.response.status === 409) {
                    alert("Esses dados já foram utilizados para cadastro")
                    setLoading(false);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                }
                if(error.response.status === 500) {
                    alert("Erro no server!!!")
                    setLoading(false);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                }
            })
        }
    }
    //UI
    return (
        <All>
            <Title>
                <h1>MyWallet</h1>
            </Title>
            <Forms onSubmit={FinishRegister}>
                <input type="name" placeholder="Nome" max="25" disabled={loading === true ? true : false} onChange={(e) => setName(e.target.value)} value={name} required/>
                <input type="email" placeholder="E-mail" disabled={loading === true ? true : false} onChange={(e) => setEmail(e.target.value)} value={email} required/>
                <input type="password" placeholder="Senha" max="20" disabled={loading === true ? true : false} onChange={(e) => setPassword(e.target.value)} value={password} required/>
                <input type="password" placeholder="Confirme a senha" max="20" disabled={loading === true ? true : false} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required/>
                <button type="submit" disabled={loading === true ? true : false}>
                    {loading === true ? <ThreeDots color="#FFFFFF" height={80} width={80} /> : "Cadastrar"}
                </button>
            </Forms>
            <Click to="/">
                <BackLogin>Já tem uma conta? Entre agora!</BackLogin>
            </Click>
        </All>
    );
}

const All = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 95px;
`;

const Title = styled.header`
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
        display: flex;
        justify-content: center;
        align-items: center;
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

const BackLogin = styled.p `
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
`;

const Click = styled(Link) `
    text-decoration: none;
`;