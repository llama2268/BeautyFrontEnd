import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <section className="about-content">
        <p>
          Welcome to <strong>Celestique</strong>! We are committed to bringing you the best in beauty products and services.
        </p>
        <p>
          Our mission is to empower individuals to express their unique beauty through our services of finding the perfect
          stylist or salon to fit your needs perfectly.
        </p>
        <p>
          With a passion for beauty, we strive to find the best match for a customers needs whether it comes to haircuts, nails,
          and more
        </p>
      </section>
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="profile.jpg" alt="Team Member 1" />
            <h3>Paul Hwang</h3>
          </div>
          <div className="team-member">
            <img src="profile.jpg" alt="Team Member 2" />
            <h3>Ian Urquhartt</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
