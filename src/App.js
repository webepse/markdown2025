import React, { Component } from 'react';
import './App.css'
import {sampleText} from './sampleText'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

class App extends Component {
  state = { 
    text : sampleText
   }

   componentDidMount() {
    console.log('montage')
    const text = localStorage.getItem('myText')
    if(text)
    {
      // this.setState({text:text})
      this.setState({text})
    }else{
      this.setState({text:sampleText})
    }
   }
Z

  componentDidUpdate()
  {
    console.log('update')
    const text = this.state.text
    localStorage.setItem('myText',text)
  }

   
  handleChange = (event) => {
    // console.log(event.target.value)
    const text = event.target.value
    // this.setState({text:text})
    this.setState({text})
  }

  renderText = text => {
    let text2 = DOMPurify.sanitize(text, {ALLOWED_TAGS: ['b','strong']})
    return marked.parse(text2)
  }

  render() { 
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <textarea
                rows="35" 
                className="form-control" 
                value={this.state.text}
                onChange={this.handleChange}
                ></textarea>
            </div>
            <div className="col-sm-6">
              <div dangerouslySetInnerHTML={{__html:this.renderText(this.state.text)}}></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
 
export default App;
