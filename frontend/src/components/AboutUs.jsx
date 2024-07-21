import React from 'react';
import { FaQuestionCircle } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";
import { RiShakeHandsFill } from "react-icons/ri";

const AboutUs = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', backgroundColor: '#fcfafa', height: "100vh" }}>
            <header style={{ background: 'rgba(21, 102, 146, 0.918)', color: '#fff', padding: '30px 0', textAlign: 'center', marginBottom: '20px' }}>
                <h1>About Us - Q&A Portal</h1>
            </header>
            <main style={{ maxWidth: '800px', margin: 'auto' }}>
                <br />
                <section>
                    <div className='d-flex'>
                        <FaQuestionCircle size={30} style={{ color: 'rgba(21, 102, 146, 0.918)', margin: "5px" }} />
                        <h2>What We Do</h2>
                    </div>
                    <p>
                        We are a community-driven platform inspired by the need for sharing knowledge in a structured and efficient manner. Our mission is to empower individuals to learn, share, and grow through a collaborative environment.
                    </p>
                </section>
                <br />
                <br />
                <section>
                    <div className='d-flex'>
                        <HiLightBulb size={30} style={{ color: 'rgba(21, 102, 146, 0.918)', margin: "5px" }} />
                        <h2>Our Vision</h2>
                    </div>
                    <p>
                        Our vision is to create the most reliable and accessible online platform for tech enthusiasts, developers, and learners to find answers to their questions, share their knowledge, and advance their careers.
                    </p>
                </section>
                <br />
                <br />
                <section>
                    <div className='d-flex'>
                        <RiShakeHandsFill size={30} style={{ color: 'rgba(21, 102, 146, 0.918)', margin: "5px" }} />
                        <h2>Join Us</h2>
                    </div>
                    <p>
                        Whether you're looking to solve a specific coding issue, want to share your expertise with others, or simply curious about the latest in technology, our Q&A portal is the place for you. Join our community today and start making a difference.
                    </p>
                </section>
            </main>
        </div>
    );
};

export default AboutUs;