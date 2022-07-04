import styled from "styled-components";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from  "react-loader-spinner";
import Context from "../context/Context";

export default function WithdrawScreen() {
    //LOGIC
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const { token } = useContext(Context);
    const navigate = useNavigate();
    
    function FinishWithdraw(e) {
        e.preventDefault();
        setLoading(true);
        const body = {
            value,
            description
        };
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.post("http://localhost:5000/saque", body, config);

        promise.then(() => {
            setLoading(false);
            navigate("/extrato");
        })
        promise.catch((error) => {
            if(error.response.status === 498) {
                alert("Não foi possivel realizar a transação, faça o login novamente")
                setLoading(false);
                navigate("/login");
            } else {
                alert("Saque não concluído, tente novamente")
                setValue("");
                setDescription("");
                setLoading(false);
            }
        });
    }
    //UI
    return(
        <>  
            <Top>
                <h1>Nova saída</h1>
            </Top>
            <Body>
                <Forms onSubmit={FinishWithdraw}>
                    <input type="number" placeholder="Valor" disabled={loading === true ? true : false} onChange={(e) => setValue(e.target.value)} value={value} required/>
                    <input type="text" placeholder="Descrição" disabled={loading === true ? true : false} onChange={(e) => setDescription(e.target.value)} value={description} required/>
                    <button type="submit" disabled={loading === true ? true : false}>
                        {loading === true ? <ThreeDots color="#FFFFFF" height={80} width={80} /> : "Salvar saída"}
                    </button>
                </Forms>
            </Body>
        </>
    );
}

const Top = styled.header `
    margin-top: 25px;
    margin-left: 25px;
    h1 {
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }
`;

const Body = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
`;

const Forms = styled.form `
    display: flex;
    flex-direction: column;
    input {
        min-width: 280px;
        max-width: 326px;
        height: 58px;
        margin-bottom: 14px;
        background-color: #FFFFFF;
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