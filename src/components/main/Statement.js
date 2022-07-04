import styled from "styled-components";

export default function Statement(props) {
    return(
        <Information>
            <DateDescription>
                <Date>{props.day}</Date>
                <Description>{props.description}</Description>
            </DateDescription>
            <Value type={props.type}>{props.value}</Value>
        </Information>
    );
}

const Information = styled.div `
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    margin-left: 12px;
    margin-right: 12px;
`;


const DateDescription = styled.div `
    display: flex;
`;

const Value = styled.p `
    font-family: "Raleway";
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: ${props => props.type === "depósito" ? "#03AC00" : "#C70000"}
`;

const Date = styled.p `
    margin-right: 4px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: #C6C6C6;
`;

const Description = styled.p `
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
`;