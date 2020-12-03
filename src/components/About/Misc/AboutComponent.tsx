import React from "react";
import { Jumbotron, Container } from "reactstrap";

function AboutComponent() {
  React.useEffect(() => {
    document.title = "About | Erion";
  });
  return (
    <Jumbotron>
      <Container>
        <h3>About</h3>
        <p>Erion is a simple application for accessing patient data.</p>
        <p>
          Data is modeled around patient visits to a healthcare facility. Every
          time a patient visits a healthcare facility, the reason for the visit
          (event code) is recorded in a system. The reason for the visit (event
          code) is grouped into code categories like wellness exams, procedures,
          medications, etc.
        </p>
      </Container>
    </Jumbotron>
  );
}

export default AboutComponent;
