import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: false,
    isError: false,
  };

  // facciamo la fetch per prendere tutt i commenti dei libri con l'url
  //fornito + la props messa in single book dove prendiamo gli id dei libri

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       "https://striveschool-api.herokuapp.com/api/comments/" +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY4NDVhMWFiYWQyODAwMTliZDRkYjYiLCJpYXQiOjE3MTA3Njk1NjksImV4cCI6MTcxMTk3OTE2OX0.JSOakHUY57W2XBqIRWyng-AbnoOnwbA9wrNZ6ou1c3s",
  //         },
  //       }
  //     );
  // nella fetch alla risposta fornita avremo i commenti che andranno
  //a riempire l'array vuoto messo come stato iniziale con un nuovo stato
  // cosi che possa salvare i commenti ricevuti per ogni libro sotto ad ognuno di esso

  //     console.log(response);
  //     if (response.ok) {
  //       let comments = await response.json();
  //       this.setState({ comments: comments, isLoading: false, isError: false });
  //     } else {
  //       this.setState({ isLoading: false, isError: true });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({ isLoading: false, isError: true });
  //   }
  // };

  componentDidUpdate(prevProps) {
    //Dopo aver controllato se le proprietà precedenti prevProps.asin sono diverse
    // dalle proprietà attuali this.props.asin, viene eseguita una richiesta fetch per
    // ottenere i commenti relativi all'ASIN del libro.
    if (prevProps.asin !== this.props.asin) {
      this.setState({
        isLoading: true,
      });

      fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY4NDVhMWFiYWQyODAwMTliZDRkYjYiLCJpYXQiOjE3MTA3Njk1NjksImV4cCI6MTcxMTk3OTE2OX0.JSOakHUY57W2XBqIRWyng-AbnoOnwbA9wrNZ6ou1c3s",
          },
        }
      )
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore durante il recupero dei commenti");
          }
        })
        .then((comments) => {
          this.setState({
            comments: comments,
            isLoading: false,
            isError: false,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isLoading: false, isError: true });
        });
    }
  }

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        {/* commentarea avrà due sotto componenti: addcomment avra la prop che 
        prende gli id dei libri mentre comment list avra la prop commenttoshow 
        che prende tutti i commenti che arrivano nell fetch e che sono salvati nell'array
         */}
        <AddComment asin={this.props.asin} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    );
  }
}

export default CommentArea;
