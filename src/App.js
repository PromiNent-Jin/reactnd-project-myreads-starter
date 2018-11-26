import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import BookList from './BookList'
import SearchBook from './SearchBook'
import * as BooksAPI from "./utils/BooksAPI"

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  updateBookInfo = () => {
    BooksAPI.getAll().then((book) =>{
      this.setState({books:book})
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((book) => {
      this.setState({books:book})
    })
  }

  render() {
    return (<div className="app">
        <Route exact path="/" render={() => {
          return (
            <BookList
              books = {this.state.books}
              updateBookInfo = {this.updateBookInfo}
            />
          )
        }}/>
        <Route path="/search" render={() => {
          return (
            <SearchBook updateBookInfo = {this.updateBookInfo}/>
          )
        }}/>
      </div>)
  }
}

export default BooksApp
