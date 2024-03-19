import { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  // in questo stato iniziale viene definito la searchquery per memorizzare
  // la stringa di ricerca dell'utente inizialmente vuota e selectedbook per
  //memorizzare l'asin del libro che attualmente è null
  state = {
    searchQuery: "",
    selectedBook: null,
  };
  // questo metodo viene chiamato quando l'utente seleziona un libro cosi che
  //si possa aggiornare lo stato di selectedbook con l'asin del libro selezionato

  //  quando clicchiamo un libro dobbiamo salvare lo stato dell’asin dentro lo stato del componente padre
  // diamo un asin nello stato in book list
  // scrivere una funzione change asin con il newstate con dentro asin:(paramtro)
  // e mettiamo come prop sotto in single book (riga 32 di book list) changeasin = {this.changeasin}  e permette di compilare lo stato di asin
  // poi all’onclick chiamiamo this.props.changeasin(this.props.book.asin) cliccnado sto salvando l’asin del libro cliccato nellasin dello stato,  viene cambiato
  // comment area sotto ha bisogno di un asin
  // non si vedono ancora i commenti perche la funzione è in didmount  in comment area
  changeSelectedBook = (asin) => {
    this.setState({
      selectedBook: asin,
    });
  };

  render() {
    return (
      <>
        <Row>
          <Col md={8}>
            <Row className="justify-content-center mt-5">
              <Col xs={12} md={4} className="text-center">
                <Form.Group>
                  <Form.Control
                    type="search"
                    placeholder="Cerca un libro"
                    // Questo attributo lega il valore dell'input allo stato del componente.
                    //In pratica, il valore dell'input viene impostato sul valore attuale
                    //dello stato searchQuery. Inizialmente, lo stato searchQuery può essere
                    // vuoto o contenere una query di ricerca predefinita.
                    value={this.state.searchQuery}
                    //Quando l'utente digita un nome di libro nell'input di ricerca,
                    // l'evento onChange viene attivato ogni volta che il contenuto
                    //dell'input cambia. Il gestore di eventi associato a onChange esegue
                    //una funzione che aggiorna lo stato del componente searchQuery con il
                    //valore corrente dell'input, cioè il testo che l'utente ha digitato.
                    //Successivamente, viene eseguito un filtro sugli elementi nell'array
                    //this.props.books (presumibilmente un elenco di libri), per trovare i
                    //libri il cui titolo include la stringa di ricerca memorizzata nello
                    //stato searchQuery.
                    onChange={(e) =>
                      this.setState({ searchQuery: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-2 mt-3">
              {this.props.books
                .filter((b) =>
                  b.title.toLowerCase().includes(this.state.searchQuery)
                )
                .map((b) => (
                  <Col xs={12} md={4} key={b.asin}>
                    <SingleBook
                      book={b}
                      selectedBook={this.state.selectedBook}
                      changeSelectedBook={this.changeSelectedBook}
                    />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col md={4}>
            <CommentArea asin={this.state.selectedBook} />
          </Col>
        </Row>
      </>
    );
  }
}

export default BookList;
