import { Component } from "react";
import { Button, Form } from "react-bootstrap";

class AddComment extends Component {
  state = {
    comment: {
      comment: "",
      rate: 1,
      elementId: this.props.asin,
    },
  };

  componentDidUpdate(prevProps) {
    if (prevProps.asin !== this.props.asin) {
      this.setState({
        comment: {
          ...this.state.comment,
          elementId: this.props.asin,
        },
      });
    }
  }
  //Questo metodo viene chiamato ogni volta che le props del componente
  //vengono aggiornate. Se l'asin fornito attraverso le props è cambiato
  //rispetto alla sua versione precedente, l'elementId dello stato comment
  //viene aggiornato con il nuovo valore di asin.

  sendComment = (e) => {
    e.preventDefault();

    fetch("https://striveschool-api.herokuapp.com/api/comments", {
      method: "POST",
      body: JSON.stringify(this.state.comment),
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY4NDVhMWFiYWQyODAwMTliZDRkYjYiLCJpYXQiOjE3MTA3Njk1NjksImV4cCI6MTcxMTk3OTE2OX0.JSOakHUY57W2XBqIRWyng-AbnoOnwbA9wrNZ6ou1c3s",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Qualcosa è andato storto");
        }
      })
      .then((data) => {
        alert("Recensione inviata!");
        this.setState({
          comment: {
            comment: "",
            rate: 1,
            elementId: this.props.asin,
          },
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  render() {
    return (
      <div className="my-3">
        {/* assegna la funzione sendComment del componente come gestore
         dell'evento di invio del form. Quando il form viene inviato, 
         la funzione sendComment viene eseguita e gestisce l'invio del
          commento all'API. In sostanza, onSubmit={this.sendComment} 
          collega il form al metodo sendComment, consentendo al form di 
          inviare il commento quando viene sottoposto dall'utente. */}
        <Form onSubmit={this.sendComment}>
          <Form.Group className="mb-2">
            <Form.Label>Recensione</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci qui il testo"
              value={this.state.comment.comment}
              // onchange viene attivato ogni volta che il valore cambia. in
              //questo caso è collegato all'input per il tesdto del commento
              //lo spred operetor ... crea una copia dell'oggetto comment esistente
              //nello stato, e target value aggiorna il valore del campo commment con
              //il nuovo valore inserito dall'utente etargetvalue contiene il valore
              // dell'input che l'utente ha digitato
              onChange={(e) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    comment: e.target.value,
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Valutazione</Form.Label>
            <Form.Control
              as="select"
              value={this.state.comment.rate}
              onChange={(e) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    rate: e.target.value,
                  },
                })
              }
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Invia
          </Button>
        </Form>
      </div>
    );
  }
}

export default AddComment;
