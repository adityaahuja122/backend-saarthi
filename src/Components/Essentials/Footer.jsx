import React from "react";
import './Footer.css';
import call from '../../assets/svg/call.svg';
import mail from '../../assets/svg/mail.svg';
import facebook from '../../assets/svg/facebook.svg';
import insta from '../../assets/svg/instagram.svg';
import x from '../../assets/svg/x.svg';

export default function Footer(){
    return (
        <div className="footer">
            <hr />
            <footer className="d-flex p-4 pt-5">
                <div className="left d-flex justify-content-between align-items-center" style={{width: '50rem'}}>
                    <h1 className="ms-4">Saarthi</h1>
                </div>

                <div className="mid d-flex justify-content-around me-5" style={{width: '120rem'}}>
                    <div className="d-flex flex-column">
                        <h5 className="mb-3">Quick Links</h5>
                        <a href="/home" className="my-2">Home</a>
                        <a href="/about" className="my-2">About</a>
                    </div>
                    <div className="d-flex flex-column">
                        <h5 className="mb-3">Services</h5>
                        <a href="" className="my-2">Service 1</a>
                        <a href="" className="my-2">Service 2</a>
                        <a href="" className="my-2">Service 3</a>
                        <a href="" className="my-2">Service 4</a>
                    </div>
                </div>

                <div className="right ms-5">
                    <h5 className="mb-3">Contact us</h5>
                    <div className="my-3">
                        <img src={call} alt="call" className="me-3"/>
                        +999999999
                    </div>
                    <div className="my-3 mb-4">
                        <img src={mail} alt="mail" className="me-3"/>
                        saarthi@gmail.com
                    </div>
                    <h5 className="mb-3">Follow us</h5>
                    <div>
                        <img src={facebook} alt="" className="me-4"/>
                        <img src={insta} alt="" className="mx-4"/>
                        <img src={x} alt="" className="mx-4"/>
                    </div>
                </div>
            </footer>
            <hr />
            <div className="d-flex justify-content-center p-2"><p style={{fontSize: '15px'}}>&copy; 2024 Saarthi. All rights reserved.</p></div>
        </div>
    );
}