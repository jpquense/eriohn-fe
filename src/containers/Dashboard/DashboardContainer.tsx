import React from "react";
import SearchComponent from "../../components/About/Patient/SearchComponent";
import ViewComponent from "../../components/About/Patient/ViewComponent";
import { getAllPatients, getTestApi } from "../../apis/resources/patients";

type DashboardContainerProps = { title?: string };

function DashboardContainer({
  title = "Dashboard | Erion",
}: DashboardContainerProps): React.ReactElement {
  const [patients, setPatients] = React.useState([]);
  const [eventPatients, setEventPatients] = React.useState([]);
  const [categoryPatients, setCategoryPatients] = React.useState([]);
  const [errorEvent, setErrorEvent] = React.useState(false);
  const [errorcategory, setErrorCategory] = React.useState(false);

  // set title
  React.useEffect(() => {
    document.title = title;
  });

  // retrieve data from api
  // test api connection
  React.useEffect(() => {
    getTestApi().then((resp) => console.log(resp));
  }, []);

  // GET /patient/all pre-load for better client-side performance
  React.useEffect(() => {
    getAllPatients()
      .then((resp) => {
        setPatients(resp);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <SearchComponent
        handleEvent={eventDropdown}
        handleCategory={categoryDropdown}
        eventCodes={["D234", "D456", "L123", "L222", "M222", "M333"]}
        categories={["A", "B", "C", "D"]}
      />

      <ViewComponent patients={eventPatients} type="event" error={errorEvent} />
      <ViewComponent
        patients={categoryPatients}
        type="category"
        error={errorcategory}
      />
    </React.Fragment>
  );

  function eventDropdown(eventCode: string) {
    try {
      setEventPatients(
        patients.filter((patient) => patient.event_code === eventCode)
      );
    } catch (err) {
      // attempt second call if pre-load failed at time of event
      try {
        getAllPatients()
          .then((resp) => {
            setErrorEvent(false);
            setPatients(resp);
            setEventPatients(
              patients.filter((patient) => patient.event_code === eventCode)
            );
          })
          .catch((err) => {
            setErrorEvent(true);
            console.log(err);
          });
      } catch (error2) {
        setErrorEvent(true);
        console.log(error2);
      }
    }
  }

  function categoryDropdown(category: string) {
    try {
      setCategoryPatients(
        patients.filter((patient) => patient.code_category === category)
      );
    } catch (error1) {
      console.log(error1);
      // attempt second call if pre-load failed at time of event
      try {
        setErrorCategory(false);
        getAllPatients()
          .then((resp) => {
            setPatients(resp);
            setCategoryPatients(
              patients.filter((patient) => patient.event_code === category)
            );
          })
          .catch((err) => {
            setErrorCategory(true);
            console.log(err);
          });
      } catch (error2) {
        setErrorCategory(true);
        console.log(error2);
      }
    }
  }

  // utility function I may use
  // function onlyUnique(value, index, self) {
  //   return self.indexOf(value) === index;
  // }
}

export default DashboardContainer;
