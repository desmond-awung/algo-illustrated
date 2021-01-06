import React, { Component } from "react";
import styles from "../sorting/sorting.module.css";

class ArrayOfBars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  // when the app loads for the first time
  componentDidMount() {
    this.resetArray();
  }

  // reset the array elements
  resetArray() {
    let { array } = this.state;
    // a max of 300 elements is suported for a screen width of 1200px 
    // const arraySize = 300;
    const arraySize = this.getRandomIntInclusive(10, 300);
    for (let i = 0; i < arraySize; i++) {
        // start from 1 to avoid problems of division by zero
      array[i] = this.getRandomIntInclusive(1, 100);
    }
    this.setState({ array });
  }

  // from MDN reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  // display array bars inline, with height proportional to element value
  arrList = (array) => {
    let arrMax = Math.max(...array);
    // arrMax = 0 ? 0.1 : arrMax;    // if the max cones out to be zero for whatever reason, set it to 0.1
    const size = array.length;
    return array.map((val, index) => (
      <div
        className={styles.singleBar}
        key={index}
        style={{ 
            height: `${val*100/arrMax}%`,
            width: `${50/(size)}rem`,
            margin: `0 ${10/(size)}rem`
         }}
      >
        {/* {val} */}
      </div>
    ));
  };

  render() {
    const { array } = this.state;
    return <div className={styles.arrayContainer}>{this.arrList(array)}</div>;
  }
}

export default ArrayOfBars;
