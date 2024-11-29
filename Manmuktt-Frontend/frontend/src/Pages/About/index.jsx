import React from "react";
import ImageTextBlock from "../../Components/ImageTextBlock";
import { Box } from "@mui/material";
import ResponsiveAppBar from "../../Components/ResponsiveAppBar";
import Footer from "../../Components/Footer";

const About = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ width: "80%", margin: "auto" }}>
        <ImageTextBlock
          heading="Trustworthy and credentialed therapists you can rely on"
          paragraph="Discover a network of credentialed and experienced therapists ready to assist you with a variety of issues, including depression, anxiety, relationships, trauma, grief, and more. Our therapists offer the same level of professionalism and quality as in-office sessions, with the added convenience of communicating on your terms, whenever and however you prefer."
          buttonLabel="Get matched to a therapist"
          imageSrc="/assets/Image.png"
          position="right" // or "left"
        />

        <h1>How it works</h1>

        <ImageTextBlock
          heading="Speech Analysis"
          paragraph="By analyzing your speech, we identify any mental health concerns and provide you with appropriate support."
          // buttonLabel="Learn More"
          imageSrc="/assets/SpeechAnalysis.png"
          position="left" // or "right"
        />

        <ImageTextBlock
          heading="Facial Analysis"
          paragraph="We analyze your facial expressions to identify any mental health concerns and provide you with appropriate support."
          // buttonLabel="Get matched to a therapist"
          imageSrc="/assets/FacialAnalysis.png"
          position="right" // or "left"
        />

        <ImageTextBlock
          heading="Talk to best therapists"
          paragraph="We have a team of top therapists who are professionals dedicated to helping their patients overcome mental health challenges."
          // buttonLabel="Get matched to a therapist"
          imageSrc="/assets/psychologist.png"
          position="right" // or "left"
        />
      </Box>

      <img
        src="/assets/vs.png"
        alt="vs"
        style={{
          height: "auto",
        }}
      />
      <Footer />
    </>
  );
};

export default About;
