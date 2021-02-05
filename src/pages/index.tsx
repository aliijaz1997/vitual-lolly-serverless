import React, { useRef, useState } from 'react';
import Lolly from '../components/lolly'
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import shortid from "shortid"  
import "./style.css";
const ADD_VCARD = gql`
    mutation addVCard($c1: String!, 
        $c2: String!,
        $c3: String!,
        $rec: String!,
        $link: String!,
        $sender: String!,
        $msg: String!){
            addVCard(c1: $c1,c2: $c2,c3: $c3,rec: $rec,sender: $sender,link: $link ,msg: $msg){
                link
                msg
            }
    }
`
export default function Home() {
    const senderField : any = useRef();
    const recField : any = useRef();
    const msgField : any = useRef();
    const [c1, setC1] = useState("#D2691E");
    const [c2, setC2] = useState("#FF7F50");
    const [c3, setC3] = useState("#6495ED");

    const [addVCard] = useMutation(ADD_VCARD);

    const handleSubmit = () => {
        const link = shortid.generate()
        console.log(senderField.current.value)
        console.log(recField.current.value)
        console.log(msgField.current.value)
        addVCard({
            variables: {
                c1, c2, c3,
                rec: recField.current.value,
                sender: senderField.current.value,
                msg: msgField.current.value,
                link: link
            }
        })
    }

    return (<div className="container">
        <h1
            style={{
                color: "black"
            }}
        >Create your Own Lolly</h1>
        <div className="main-container">

            <div>
                <Lolly top={c1} middle={c2} bottom={c3} />
                <br />
                <input type="color" value={c1} onChange={(e) => { setC1(e.target.value) }} />
                <input type="color" value={c2} onChange={(e) => { setC2(e.target.value) }} />
                <input type="color" value={c3} onChange={(e) => { setC3(e.target.value) }} />
            </div>
            <div className="form-container">
                <input
                    style={{
                        backgroundColor: "black",
                        color : "white"
                    }}
                    type="text" placeholder="To" ref={recField} />
                <textarea
                    style={{
                        backgroundColor: "black",
                        color : "white"

                    }}
                    placeholder="Enter your message!" ref={msgField}></textarea>
                <input
                    style={{
                        backgroundColor: "black",
                        color : "white"

                    }}
                    type="text" placeholder="From" ref={senderField} />
                <button
                className = "button"
                onClick={handleSubmit}>Send</button>
            </div>
        </div>
    </div>
    )
}