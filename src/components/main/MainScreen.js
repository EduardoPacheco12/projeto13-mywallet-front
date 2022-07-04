import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TailSpin } from  "react-loader-spinner";
import Context from "../context/Context";
import Statement from "./Statement";

function Transfer(props) {
    return(
        <div>
            <ion-icon name={props.icon}></ion-icon>
            <p>{props.text}</p>
        </div>
    );
}

export default function MainScreen() {
    //LOGIC
    const [loading, setLoading] = useState(true);
    const [statements, setStatements] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const { token, name } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.get("https://mywallet-back-edupacheco.herokuapp.com/extrato", config);
        promise.then((response) => {
            setStatements(response.data.array);
            setTotalValue(response.data.totalValue);
            setLoading(false);
        })
        promise.catch(() => {
            alert("A conexão com o servidor foi perdida, faça o login novamente");
            navigate("/login"); 
        })
    }, []);

    //UI
    if(loading === true) {
        return(
            <Loading>
                <TailSpin color="#A328D6" height={80} width={80} />
            </Loading>
        );
    } else { 
        return(
            <>
                <Top>
                    <h1>Olá, {name}</h1>
                    <Link to="/login">
                        <ion-icon name="exit-outline"></ion-icon>
                    </Link>
                </Top>
                <Body>
                    <Content totalValue={totalValue}>
                        {statements.length === 0 ? 
                            <p className="Message">Não há registros de entrada ou saída</p> 
                        : 
                            <>
                                {statements.map((response, index) => <Statement key={index} day={response.day} value={response.value} description={response.description} type={response.type}/>)}
                                <p className="Balance">SALDO</p>
                                <p className="totalValue">{totalValue}</p>
                            </>      
                        }
                    </Content>
                    <Transfers>
                        <Link to="/deposito">
                            <Transfer icon={"add-circle-outline"} text={"Nova entrada"}/>
                        </Link>
                        <Link to="/saque">
                            <Transfer icon={"remove-circle-outline"} text={"Nova saída"}/>
                        </Link>
                    </Transfers>
                </Body>
            </>
        );
    }
    
}

const Loading = styled.div `
    display: flex;
    justify-content: center;
    margin-top: 325px;
`;

const Body = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 22px;
`;

const Top = styled.header `
    margin-top: 25px;
    margin-left: 25px;
    margin-right: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }

    ion-icon {
        color: #FFFFFF;
        font-size: 35px;
    }
`;

const Content = styled.div `
    width: 326px;
    height: 446px;
    position: relative;
    margin-bottom: 14px;
    background-color: #FFFFFF;
    border-radius: 5px;
    .Message {
        font-family: "Raleway";
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
        margin: 200px 73px;
    }
    .Balance {
        position: absolute;
        left: 15px;
        bottom: 10px;
        font-family: "Raleway";
        font-weight: 700;
        font-size: 18px;
        line-height: 20px;
        color: #000000;
    }
    .totalValue {
        position: absolute;
        right: 15px;
        bottom: 10px;
        font-family: "Raleway";
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 20px;
        color: ${props => props.totalValue > 0 ? "#03AC00" : props.totalValue < 0 ? "#C70000": "#000000"}
    }
`;

const Transfers = styled.div `
    display: flex;
    justify-content: space-between;
    div {
        width: 156px;
        height: 114px;
        margin-left: 6px;
        margin-right: 6px;
        background-color: #A328D6;
        border-radius: 5px;
        position: relative;
    }
    ion-icon {
        position: absolute;
        left: 8px;
        top: 10px;
        font-size: 30px;
        color: #FFFFFF;
    }
    p {
        position: absolute;
        left: 12px;
        bottom: 10px;
        right: 100px;
        font-family: "Raleway";
        font-weight: 700;
        font-size: 18px;
        line-height: 20px;
        color: #FFFFFF;
    }
`;