// import { Component } from "react";
import { Card } from "react-bootstrap";
// import CommentArea from "./CommentArea";

const SingleBook = function ({ book, selectedBook, changeSelectedBook }) {
  // state = {
  //   selected: false,
  // };

  return (
    <>
      <Card
        // onClick={() => this.setState({ selected: !this.state.selected })}
        onClick={() => changeSelectedBook(book.asin)}
        // style={{ border: this.state.selected ? "3px solid red" : "none" }}
        style={{
          border: selectedBook === book.asin ? "3px solid red" : "none",
        }}
      >
        <Card.Img variant="top" src={book.img} />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>{book.title}</Card.Title>
        </Card.Body>
      </Card>
      {/* come prima cosa aggiungiamo un commentArea nel quale una volta 
        cliccato ogni singleBook quindi quando la proprieta selected
        passa da false a true i commenti dovranno apparire poi a questo
        commment area gli do una prop di nome asin che prende tutti gli 
        id dalla prop creata su app.js ovvero da book = fantasy  */}
      {/* {this.state.selected && <CommentArea asin={this.props.book.asin} />} */}
    </>
  );
};

export default SingleBook;
