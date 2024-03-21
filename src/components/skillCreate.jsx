import { useEffect } from "react";
import { useState } from "react";
import GetBaseUrl from "../conf";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function CreateSkill({ reloadList }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [skillGroups, setSkillGroups] = useState([]);

  function loadGroupLists(event) {
    console.log(event);
    const apiEndPoint = GetBaseUrl() + "/api/skill-groups/";
    fetch(apiEndPoint, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSkillGroups(data);
      });
  }

  function onSubmission(event) {
    event.preventDefault();

    var name = event.target.elements.name.value;
    var group = event.target.elements.group.value;
    console.log(name);
    console.log(group);

    const apiEndpoint = GetBaseUrl() + "/api/skills/";

    fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        group: group,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        reloadList();
        handleClose();
      });
  }

  useEffect(() => {
    loadGroupLists(null);
  }, []);

  return (
    <>
      <br />
      <Button variant="outline-success" onClick={handleShow}>
        Create Skill
      </Button>
      <br />
      <br />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmission}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter skill name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="group">
              <Form.Select aria-label="Default select example">
                <option id="group">Select Group</option>
                {skillGroups.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Skill
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
