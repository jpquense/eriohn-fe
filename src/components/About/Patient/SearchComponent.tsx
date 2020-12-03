import React from "react";
import {
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Jumbotron,
  Row,
} from "reactstrap";

type SearchComponentProps = {
  eventCodes: string[];
  categories: string[];
  handleEvent: (selection) => void;
  handleCategory: (selection) => void;
};

function SearchComponent({
  eventCodes,
  categories,
  handleEvent,
  handleCategory,
}: SearchComponentProps): React.ReactElement {
  const [eventCodesOpen, setEventCodesOpen] = React.useState(false);
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);

  const toggleEventCode = () => setEventCodesOpen((prevState) => !prevState);
  const toggleCategories = () => setCategoriesOpen((prevState) => !prevState);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Search Patient Records</h2>
          <hr />
          <br />
          <Row>
            <Col>
              <Dropdown isOpen={eventCodesOpen} toggle={toggleEventCode}>
                <DropdownToggle caret>Search by Event Code</DropdownToggle>
                <DropdownMenu>
                  {eventCodes.map((element, index) => (
                    <DropdownItem
                      onClick={(e) => handleEvent(e.target.innerText)}
                      key={element + index}
                    >
                      {element}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown isOpen={categoriesOpen} toggle={toggleCategories}>
                <DropdownToggle caret>Search by Category</DropdownToggle>
                <DropdownMenu>
                  {categories.map((element, index) => (
                    <DropdownItem
                      onClick={(e) => handleCategory(e.target.innerText)}
                      key={element + index}
                    >
                      {element}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
          <br />
          <hr />
          <br />
        </Col>
      </Row>
    </Container>
  );
}

export default SearchComponent;
