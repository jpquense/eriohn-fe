import React from "react";
import { Alert, Container, Jumbotron, Table } from "reactstrap";

type ViewComponentProps = { patients: any[]; type: string };

function ViewComponent({
  patients,
  type,
}: ViewComponentProps): React.ReactElement {
  if (patients.length < 1) {
    return (
      <Container>
        <h4>{type === "event" ? "Event Code" : "Code Category"}</h4>
        <Alert color="info">Nothing to see here! Select an search above.</Alert>
      </Container>
    );
  } else {
    return (
      <Jumbotron>
        <Container>
          {type === "event" ? "Event Code" : "Code Category"}
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Patient Age</th>
                <th>Event Code</th>
                <th>Event Date</th>
                <th>Code Category</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => {
                return (
                  <tr key={patient + index}>
                    <th scope="row">1</th>
                    <td>{patient.patient_name}</td>
                    <td>{patient.patient_age}</td>
                    <td>{patient.event_code}</td>
                    <td>{patient.event_date}</td>
                    <td>{patient.code_category}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </Jumbotron>
    );
  }
}

export default ViewComponent;
