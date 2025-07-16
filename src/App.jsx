import { useState, useEffect } from 'react';
import spiderLogo from './assets/spidr-logo.png';
import spidrTitle from './assets/spidr-title.png';
import noiseTexture from './assets/noise.png';

function App() {
  // Store form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    guessCost: '',
    spidrPin: ''
  });

  // Offset to move the Spidr logo up/down when focusing inputs
  const [logoOffset, setLogoOffset] = useState(0);

  // Show thank you message temporarily on submit
  const [thankYou, setThankYou] = useState(false);

  // Show error message if any fields are empty
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize the particles background
    window.$("#particles").particleground({
      dotColor: "#6c777eff",
      lineColor: "#6c818e70",
      lineWidth: 0.5,
      density: 3500,
      particleRadius: 6.75,
      proximity: 100,
      minSpeedX: 0.05,
      minSpeedY: 0.05,
      directionX: "none"
    });

    // Create the donut spotlight overlay that follows the mouse
    const overlay = document.getElementById("overlay");
    const move = (e) => {
      overlay.style.background = 
        `radial-gradient(circle 200px at ${e.clientX}px ${e.clientY}px, transparent 0%, #28292a 100%)`;
    };
    window.addEventListener("mousemove", move);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special formatting for Secret Spidr PIN: ####-####-####-#### 
    if (name === "spidrPin") {
      let digits = value.replace(/\D/g, "");
      if (digits.length > 16) digits = digits.slice(0, 16);
      let formatted = digits.match(/.{1,4}/g);
      formatted = formatted ? formatted.join("-") : "";
      setFormData(prevData => ({ ...prevData, [name]: formatted }));
      return;
    }

    // Special formatting for phone: XXX-XXX-XXXX
    if (name === "phone") {
      let digits = value.replace(/\D/g, "");
      if (digits.length > 10) digits = digits.slice(0, 10);
      let formatted = digits;
      if (digits.length > 6) {
        formatted = `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`;
      } else if (digits.length > 3) {
        formatted = `${digits.slice(0,3)}-${digits.slice(3)}`;
      }
      setFormData(prevData => ({ ...prevData, [name]: formatted }));
      return;
    }

    // Handle all other inputs normally
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.phone ||
        !formData.email || !formData.guessCost || !formData.spidrPin) {
      setError("Please fill out all fields before submitting.");
      setTimeout(() => setError(''), 3000); // Clear error after 3 sec
      return;
    }

    console.log('Form submitted:', formData);

    // Show thank you message and clear form
    setThankYou(true);
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        guessCost: '',
        spidrPin: ''
      });
      setThankYou(false);
    }, 2000);
  };

  return (
    <>
      {/* Particles canvas background */}
      <div id="particles"></div>

      {/* Donut overlay that follows the mouse */}
      <div id="overlay"></div>

      {/* Spider logo that moves up/down on focus */}
      <img 
        src={spiderLogo} 
        alt="Spidr logo" 
        style={{
          position: "fixed",
          top: `${-150 + logoOffset}px`,
          left: "215px",
          height: "520px",
          transition: "top 0.3s ease",
          animation: "slideBounce .75s ease-out"
        }}
        id="spider-logo"
      />

      {/* Secondary Spidr title logo that also moves */}
      <img 
        src={spidrTitle}
        alt="Spidr Design Title"
        style={{
          position: "fixed",
          top: `${358 + logoOffset}px`,
          left: "217px",
          height: "65px",
          animation: "fadeSlideIn 1.5s ease-out",
          animationFillMode: "forwards",
          transition: "top 0.3s ease"
        }}
      />

      {/* Form container */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "2rem",
          animation: "fadeSlideIn 1.5s ease-out",
          animationFillMode: "forwards",
          opacity: thankYou ? 0.3 : 1,
          transition: "opacity 0.5s ease"
        }}>
          <h1>Spidr Air Fryer Interest Form</h1>
          <hr style={{
            border: "none",
            borderTop: "1px solid white",
            margin: "1rem 0",
            position: "fixed",
            left: "70px",
            top: "125px",
            width: "70%"
          }} />

          {/* Thank you / error messages */}
          {thankYou && (
            <p style={{
              textAlign: "center",
              color: "#b9bdc2",
              marginBottom: "1rem",
              transition: "opacity 0.5s ease"
            }}>
              Thank you for your submission!
            </p>
          )}
          {error && (
            <p style={{
              textAlign: "center",
              color: "#ff6b6b",
              marginBottom: "1rem",
              transition: "opacity 0.5s ease"
            }}>
              {error}
            </p>
          )}

          {/* Form fields */}
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={() => setLogoOffset(0)}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onFocus={() => setLogoOffset(20)}
              />
            </div>
            <div>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setLogoOffset(40)}
              />
            </div>
            <div>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setLogoOffset(60)}
              />
            </div>
            <div>
              <label>Guess the Air Fryer's Price ($)</label>
              <input
                type="number"
                name="guessCost"
                value={formData.guessCost}
                onChange={handleChange}
                onFocus={() => setLogoOffset(80)}
              />
            </div>
            <div>
              <label>Secret Spidr PIN</label>
              <input
                type="text"
                name="spidrPin"
                placeholder="####-####-####-####"
                value={formData.spidrPin}
                onChange={handleChange}
                onFocus={() => setLogoOffset(100)}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;