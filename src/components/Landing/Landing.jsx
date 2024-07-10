import React, { useState } from 'react';
import './Landing.css';
import nflTeamsCollage from './PIC/logo.png'; 
import image2 from './PIC/image2.jpg'; 
import image3 from './PIC/image3.jpg'; 
import image4 from './PIC/logo.png'; 
import image5 from './PIC/logo.png'; 
import video1 from './PIC/landing.mp4';  
import bottomImage from './PIC/BOT.jpg';  

const items = [
    { type: 'video', src: video1 },
    { type: 'image', src: image2 },
    { type: 'image', src: image3 },
    { type: 'image', src: image4 },
    { type: 'image', src: image5 },
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    return (
        <div className="carousel">
            <div 
                className="carousel-images" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {items.map((item, index) => (
                    item.type === 'video' ? (
                        <video key={index} src={item.src} className="carousel-item carousel-video" controls autoPlay muted />
                    ) : (
                        <img key={index} src={item.src} alt={`Slide ${index + 1}`} className="carousel-item" />
                    )
                ))}
            </div>
            <div className="carousel-arrows">
                <div className="carousel-arrow" onClick={handlePrevClick}>&#9664;</div>
                <div className="carousel-arrow" onClick={handleNextClick}>&#9654;</div>
            </div>
        </div>
    );
};

const Landing = () => {
    const handleBetTeamsClick = () => {
        window.location.href = '/signin'; 
    };

    return (
        <div id="root">
            <main>
                <div className="marquee">
                    <div className="marquee-content">
                        WELCOME TO THE COIN - BET YOUR FAVORITE TEAMS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        JOHN WON $5000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        SAM WON $1000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        STEVEN WON $5000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        JOHN WON $500000
                    </div>
                </div>

                <div className="header">
                    <a href="/signin">Login In</a>
                    <a href="/signup">Sign Up</a>
                </div>

                <Carousel />

                <div className="content">
                    <div className="image-container">
                        <img 
                            className="sliding-image" 
                            src={nflTeamsCollage} 
                            alt="NFL Teams Collage" 
                        />
                        <img 
                            className="sliding-image" 
                            src={nflTeamsCollage} 
                            alt="NFL Teams Collage" 
                            style={{top: '100%'}}
                        />
                        <div className="image-overlay"></div>
                    </div>
                    <div className="text">
                        <h1>Discover NFL Teams</h1>
                        <p>BET YOUR FAVORITE TEAM.</p>
                        <button className="button" onClick={handleBetTeamsClick}>BET TEAMS</button>
                    </div>
                </div>
            </main>
            <div className="bottom-image-container">
                <img src={bottomImage} alt="Bottom Image" className="bottom-image" />
            </div>
        </div>
    );
};

export default Landing;





