import React from "react";
import SearchComponent from "../../components/About/Patient/SearchComponent";
import ViewComponent from "../../components/About/Patient/ViewComponent";

import { getAllPatients, getTestApi } from "../../apis/resources/patients";

import { Button } from "reactstrap";

type DashboardContainerProps = { title?: string };

function DashboardContainer({
  title = "Dashboard | Erion",
}: DashboardContainerProps): React.ReactElement {
  const [patients, setPatients] = React.useState([]);
  const [eventPatients, setEventPatients] = React.useState([]);
  const [categoryPatients, setCategoryPatients] = React.useState([]);
  const [hideView, setHideView] = React.useState(true);

  // set title
  React.useEffect(() => {
    document.title = title;
  });

  // retrieve data from api
  // test api connection
  React.useEffect(() => {
    console.log("Test web Server connectivity --- dashboad call");
    getTestApi().then((resp) => console.log(resp));
  }, []);
  // GET /patient/all
  React.useEffect(() => {
    getAllPatients()
      .then((resp) => {
        console.log("--- all patient response ---");
        setPatients(resp);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <SearchComponent
        handleEvent={eventDropdown}
        handleCategory={categoryDropdown}
        eventCodes={patients
          .map((patient) => patient.event_code)
          .filter(onlyUnique)}
        categories={["A", "B", "C", "D"]}
      />
      <Button
        tag="button"
        color="success"
        size="large"
        style={{ marginLeft: "2em", marginBottom: "2em" }}
        onClick={(e) => setHideView(!hideView)}
      >
        {!hideView ? "Hide View" : "Display View"}
      </Button>
      {!hideView && <ViewComponent patients={eventPatients} />}
      {!hideView && <ViewComponent patients={categoryPatients} />}
    </React.Fragment>
  );

  function eventDropdown(eventCode: string) {
    setEventPatients(
      patients.filter((patient) => patient.event_code === eventCode)
    );
  }

  function categoryDropdown(category: string) {
    setCategoryPatients(
      patients.filter((patient) => patient.code_category === category)
    );
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}

export default DashboardContainer;
