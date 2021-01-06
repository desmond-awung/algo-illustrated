import React, { Component } from "react";
import ArrayOfBars from "../sorting/ArrayOfBars";
import styles from "../sorting/sorting.module.css";

export class Sorting extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-11" className={styles.sortingSection}>
          {/* <div className="col-11"> */}
            {/* Control nav bar will go here */}

            {/* <ArrayOfBars className={styles.arrayContainer}></ArrayOfBars> */}
            <ArrayOfBars></ArrayOfBars>
            {/* <div>Hello</div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Sorting;
