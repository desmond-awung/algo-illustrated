import React, { Component } from "react";
import ArrayOfBars from "../sorting/ArrayOfBars";
import Controls from "../sorting/Controls";
import styles from "../sorting/sorting.module.css";

export class Sorting extends Component {

  render() {
    return (
      <div className="container-fluid">

        {/* Controls nav bar */}
        {/* <Controls resetArray={() => this.generateArray()}></Controls> */}
        <Controls></Controls>

        <div className="row">
          {/* <div > */}
          <div className={styles.sortingSection}>
          {/* <div className="col-11"> */}

            {/* <ArrayOfBars className={styles.arrayContainer}></ArrayOfBars> */}
            {/* <ArrayOfBars ref={this.arrayComponent}></ArrayOfBars> */}
            {/* <ArrayOfBars isArrayToReset={this.state.isArrayToReset}></ArrayOfBars> */}
            <ArrayOfBars></ArrayOfBars>
            {/* <div>Hello</div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Sorting;
