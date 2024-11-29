import React from 'react';
import './AboutUs.css'; // Ensure to include your CSS for styling

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Part 1 */}
      <header>
        <h1>Trustworthy and Credentialed Therapists You Can Rely On</h1>
        <p>
          Discover a network of credentialed and experienced therapists ready to assist you with a variety of issues, including depression, anxiety, relationships, trauma, grief, and more. Our therapists offer the same level of professionalism and quality as in-office sessions, with the added convenience of communicating on your terms, whenever and however you prefer.
        </p>
        <button className="get-matched-button">Get Matched to a Therapist</button>
      </header>

      {/* Part 2 */}
      <section className="how-it-works">
        <h2>How It Works</h2>

        <div className="how-it-works-item">
          <h3>Speech Analysis</h3>
          <p>By analyzing your speech, we identify any mental health concerns and provide you with appropriate support.</p>
        </div>

        <div className="how-it-works-item">
          <h3>Facial Analysis</h3>
          <p>We analyze your facial expressions to identify any mental health concerns and provide you with appropriate support.</p>
        </div>
      </section>

      {/* Part 3 */}
      <section className="chat-bot">
        <h3>Chat Bot</h3>
        <p>Your personal companion who listens to your problems like a friend and helps you overcome mental health challenges.</p>
      </section>

      <section className="talk-to-therapists">
        <h3>Talk to Best Therapists</h3>
        <p>We have a team of top therapists who are professionals dedicated to helping their patients overcome mental health challenges.</p>
      </section>

      {/* Part 4 */}
      <section className="comparison">
        <h2>Mannmukt vs. Traditional In-Office Therapy</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Mannmukt</th>
              <th>In-Office</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Provided by a licensed therapist</td>
              <td>✔️</td>
              <td>✔️</td>
            </tr>
            <tr>
              <td>In-office visits</td>
              <td>❌</td>
              <td>✔️</td>
            </tr>
            <tr>
              <td>Messaging any time</td>
              <td>✔️</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>Chat sessions</td>
              <td>✔️</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>Phone sessions</td>
              <td>✔️</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>Video sessions</td>
              <td>✔️</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>Easy scheduling</td>
              <td>✔️</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>Digital worksheets</td>
              <td>✔️</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>Group sessions</td>
              <td>✔️</td>
              <td>❓</td>
            </tr>
            <tr>
              <td>Smart provider matching</td>
              <td>✔️</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>Easy to switch providers</td>
              <td>✔️</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>Access therapy from anywhere</td>
              <td>✔️</td>
              <td>❌</td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer>
        <h3>Your Peace Our Mission</h3>
        <p>Mannmukt.ai, LLC is a clinical stage healthcare company which is developing a unique approach.</p>
        <button className="contact-button">Contact Us</button>
      </footer>
    </div>
  );
}

export default AboutUs;
