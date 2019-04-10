import React, { Component } from 'react'
import './AuthorPage.scss';
import '../../assets/styles/animations.scss';
import '../../assets/styles/texts.scss';


export default class AuthorPage extends Component {
  render() {
    return (
      <section className="Author-page">
        <div className="Header">
          <h3 className="subtitle">About the Author</h3>
        </div>
        <div className="Content">
          <p>
          Roides J. Cruz is an Artificial Intelligence researcher and a full stack developer which is set to the task of solving complex problems in both worlds: researching and software industry.              
          </p>
          <p>
          Specialized in Bioinspired Algorithms and Neural Networks for solving optimization problems and complex classification tasks. Master student in LANIA with research stays in CIIA and CIDETEC under the direction of Ph.D. Efrén Mezura. His thesis work: "Hybridization of mathematical programming algorithms with elements of evolutionary algorithms in mechatronic design optimization problems", is aimed to solve complex real optimization problems by combining a classic direct search optimization method with an evolutionary algorithm. 
          </p>
          <p>
          As a software engineer and developer Roides was involve in projects since the second year of college in the UCI. In the CICPC (Venezuela police 2011) project begin his experience with real-world software development and teamwork, in the front end developer and tester roles. The thesis work to obtain the software engineer degree was the design and development of a web system for the Assessment and Management of Information Security Risk based on MAGERIT methodology and ISO 27005 standard. From 2015 to the present has worked for emerging software companies like iSOFACT (Spain) and Evomatik (Mexico) as full stack developer but lately as front end developer.
          </p>
        </div>
      </section>
    );
  }
}
