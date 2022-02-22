import React, { useEffect, useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../pages/style.css";

const options1 = [
  {
    title: "Peugeot",
    key: 0,
  },
  {
    title: "Wolkswogen",
    key: 1,
  },
  {
    title: "Citroen",
    key: 2,
  },
  {
    title: "Audi",
    key: 3,
  },
  {
    title: "BMW",
    key: 4,
  },
  {
    title: "Seat",
    key: 5,
  },
  {
    title: "Alfa Romeo",
    key: 6,
  },
  {
    title: "Kia",
    key: 7,
  },
  {
    title: "Hyundai",
    key: 8,
  },
  {
    title: "Honda",
    key: 9,
  },
  {
    title: "Toyota",
    key: 10,
  },
];

const options2 = [
  {
    usluga: "Zamjena ulja i filtera",
    key: 11,
    value: 500,
  },
  {
    usluga: "Promjena pakni",
    key: 12,
    value: 450,
  },
  {
    usluga: "Promjena guma",
    key: 13,
    value: 100,
  },
  {
    usluga: "Servis klima uređaja",
    key: 14,
    value: 299,
  },
  {
    usluga: "Balansiranje guma",
    key: 15,
    value: 50,
  },
  {
    usluga: "Zamjena ulja u kočnicama",
    key: 16,
    value: 299,
  },
];

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [nextModal, setNextModal] = useState(0);
  const [valuesModal1, setValuesModal1] = useState("");
  const [valuesModal2, setValuesModal2] = useState([]);
  const [uniqueValuesModal2, setUniqueValuesModal2] = useState([]);
  const [couponModal, setCouponModal] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [amount, setAmount] = useState(0);
  const [enable, setEnable] = useState(false);
  const [name, setname] = useState("");
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(false);

  const handleFirstModal = () => {
    setOpenModal(true);
    setNextModal(0);
    setValuesModal1("");
    setValuesModal2([]);
    setCoupon("");
    setAmount(0);
    setname("");
    setEmail("");
    setNote("");
    setPhone("");
  };
  useEffect(() => {
    if (nextModal > 3) {
      setOpenModal(false);
    }
    if (nextModal === 0) {
      valuesModal1 ? setEnable(false) : setEnable(true);
    } else if (nextModal === 1) {
      valuesModal2.length > 0 ? setEnable(false) : setEnable(true);
    } else if (nextModal === 2) {
      name.length > 1 && email.length > 1 && phone.length > 1
        ? setEnable(false)
        : setEnable(true);
    }
  }, [amount, email, name, nextModal, phone, valuesModal1, valuesModal2]);

  const handleSubmit = (e) => {
    setNextModal(nextModal + 1);
  };

  const handleEdit = (e) => {
    if (e.target.name === "cars") {
      setNextModal(0);
    } else if (e.target.name === "services") {
      setNextModal(1);
    } else if (e.target.name === "infos") {
      setNextModal(2);
    }
  };

  const openCouponModal = () => {
    setCouponModal(true);
  };

  const useCoupon = () => {
    if (coupon === "Tokić123") {
      setAmount(amount - (30 * amount) / 100);
      setCouponModal(false);
    } else {
      setAlert(true);
    }
  };

  const handleServices = (e) => {
    setValuesModal2([...new Set(valuesModal2), e.target.id]);

    for (var i = 0; i < valuesModal2.length; i++) {
      if (valuesModal2[i] === e.target.id) {
        valuesModal2.splice(i, 1);
      }
    }

    setUniqueValuesModal2(
      valuesModal2.filter(function (item, pos) {
        return valuesModal2.indexOf(item) == pos;
      })
    );

    e.target.checked
      ? setAmount(amount + parseInt(e.target.value))
      : setAmount(amount - parseInt(e.target.value));
  };

  const handleChange = (e) => {
    setValuesModal1(e.target.value);
  };
  return (
    <div>
      <div
        className={couponModal ? "hide" : "show"}
        style={{
          flex: 1,
          position: "centar",
          textAlign: "center",
        }}
      >
        <div
          id="firstDiv"
          style={{ textAlign: "-webkit-center", marginTop: "15%" }}
          className={openModal || nextModal > 3 ? "hide" : "show"}
        >
          <p>Pritisnite gumb niže kako biste pokrenuli</p>
          <Button
            name="pokretanje"
            variant="danger"
            style={{ display: "block" }}
            onClick={handleFirstModal}
          >
            Pokreni konfigurator
          </Button>
        </div>

        {openModal && (
          <Modal.Dialog style={{ width: "fit-content" }}>
            {nextModal == 0 && (
              <>
                <Modal.Header
                  closeButton
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  <Modal.Title style={{ padding: "25px" }}>
                    Odaberite proizvođača vašeg vozila
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form className="formCheckbox">
                    {options1.map((el, index) => (
                      <Form.Check
                        required
                        checked={el.title == valuesModal1}
                        type="checkbox"
                        id={index}
                        label={el.title}
                        key={el.key}
                        value={el.title}
                        onChange={(e) => handleChange(e)}
                      />
                    ))}
                  </Form>
                </Modal.Body>
              </>
            )}

            {nextModal == 1 && (
              <div>
                <Modal.Header
                  closeButton
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  <Modal.Title style={{ padding: "25px" }}>
                    Odaberite jednu ili više usluga
                  </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Form className="formCheckbox">
                    {options2.map((el, index) => (
                      <Form.Check
                        type="checkbox"
                        id={el.usluga}
                        label={el.usluga + " - " + el.value + " KN"}
                        key={el.key}
                        value={el.value}
                        onChange={handleServices}
                      />
                    ))}
                  </Form>
                </Modal.Body>
                <Modal.Footer
                  style={{ display: "grid", justifyContent: "end" }}
                >
                  <br />
                  <h1>Ukupno: {amount} KN</h1>
                  <br />
                  {coupon === "Tokić123" ? (
                    <p
                      style={{
                        display: "flex",
                        fontSize: "14px",
                        color: "red",
                        justifyContent: "end",
                      }}
                    >
                      kupon iskorišten! -{(amount * 30) / 100} KN
                    </p>
                  ) : (
                    <p></p>
                  )}
                </Modal.Footer>

                <Button
                  variant="link"
                  style={{ float: "right" }}
                  className={
                    coupon === "Tokić123" || amount === 0 ? "hide" : "show"
                  }
                  onClick={openCouponModal}
                >
                  Imam kupon
                </Button>
              </div>
            )}

            {nextModal == 2 && (
              <div>
                <Modal.Header
                  closeButton
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  <Modal.Title style={{ padding: "25px" }}>
                    Unesite svoje podatke
                  </Modal.Title>
                </Modal.Header>
                <Form style={{ padding: "25px" }}>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Ime i prezime</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={name == "" ? "Unesite ime i prezime" : name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicNumber">
                    <Form.Label>Broj telefona</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder={phone == "" ? "Vas broj telefona" : phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={email == "" ? "Vas E mail" : email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Bilješka</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ height: "250px" }}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </div>
            )}
            {nextModal == 3 && (
              <>
                <Modal.Header
                  closeButton
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  <Modal.Title style={{ padding: "25px" }}>
                    Još jednom pregledajte svoj zahtjev
                  </Modal.Title>
                </Modal.Header>
                <Card>
                  <Card.Header className="headerCard">
                    Odabrano auto
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="headerCard">{valuesModal1}</Card.Text>
                    <Button
                      name="cars"
                      variant="light"
                      style={{ display: "flex" }}
                      onClick={handleEdit}
                    >
                      Uredi
                    </Button>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header className="headerCard">
                    Usluge koje ste odabrali
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="textCard">
                      <ListGroup>
                        {uniqueValuesModal2.map((el) => (
                          <ListGroup.Item key={el.key}>{el}</ListGroup.Item>
                        ))}{" "}
                      </ListGroup>
                    </Card.Text>
                    <Button
                      name="services"
                      variant="light"
                      style={{ display: "flex" }}
                      onClick={handleEdit}
                    >
                      Uredi
                    </Button>
                  </Card.Body>
                  <Card.Footer
                    style={{
                      display: "grid",
                      justifyContent: "end",
                      color: "red",
                    }}
                  >
                    {coupon === "Tokić123" ? (
                      <p style={{ display: "flex", fontSize: "12px" }}>
                        kupon iskorišten! -{(amount * 30) / 100} KN
                      </p>
                    ) : (
                      <p style={{ display: "flex", fontSize: "12px" }}>
                        Niste iskoristili kupon!
                      </p>
                    )}
                    <br />
                    Ukupna cijena: {amount} KN
                    <br />
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Header className="headerCard">
                    Vaše informacije
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="textCard">
                      Ime i prezime: {name}
                      <br />
                      Broj telefona: {phone}
                      <br />
                      Email: {email}
                      <br />
                      Bilješka: {note}
                    </Card.Text>
                    <Button
                      name="infos"
                      variant="light"
                      style={{ display: "flex" }}
                      onClick={handleEdit}
                    >
                      Uredi
                    </Button>
                  </Card.Body>
                </Card>
              </>
            )}
            <Modal.Footer>
              <Button
                variant="outline-warning"
                onClick={() => {
                  if (nextModal > 0) {
                    setNextModal(nextModal - 1);
                  }
                }}
              >
                Nazad
              </Button>

              <Button
                variant="outline-success"
                type="submit"
                disabled={enable}
                onClick={(e) => handleSubmit(e)}
              >
                Dalje
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        )}

        {nextModal > 3 && (
          <div>
            <Alert variant="success">
              <Alert.Heading>Zahtjev poslan!</Alert.Heading>
              <p>Netko će Vas kontaktirati u što kraćem roku</p>
              <hr />
              <p className="mb-0">Hvala na povjerenju!</p>
            </Alert>
          </div>
        )}
      </div>

      {couponModal && (
        <div>
          <Modal.Dialog>
            {alert ? (
              <Alert
                variant="danger"
                onClose={() => setAlert(false)}
                dismissible
              >
                <Alert.Heading>Greška!</Alert.Heading>
                <p>Vaš kupon nije validan. Pokušajte ponovo.</p>
              </Alert>
            ) : (
              <>
                <Modal.Header closeButton onClick={() => setCouponModal(false)}>
                  <Modal.Title>Kupon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <InputGroup size="sm" className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        Unesite kupon:
                      </InputGroup.Text>
                      <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                    </InputGroup>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={useCoupon}>
                    Iskoristi kupon
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </div>
      )}
    </div>
  );
};

export default Home;
