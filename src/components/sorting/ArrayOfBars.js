import React, { Component } from "react";
import styles from "../sorting/sorting.module.css";
import * as utils from "../sorting/sortingUtils";
import { connect } from 'react-redux'
import { GEN_RANDOM_ARRAY } from "../../actions/types";
import { generateRandomArray } from "../../actions/arrAction";


class ArrayOfBars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      arrMax: 1,
      arrSize: 1,
    //   isArrayReset: false, 
    };
  }

  // when the app loads for the first time
  componentDidMount() {
    this.resetArray();
  }

  // when the componenet is updated from a Redux action which ultimately changes the state of this component
  componentDidUpdate() {
    if (this.props.resetArr === true) {
        this.resetArray();
        this.props.generateRandomArray();  // toggle resetArr variable: stops any further resets and prevents an infinite loop
    }
  }

  // reset the array and all its elements
  resetArray() {
    console.log("resetting array");
    let { array, arrMax, arrSize } = this.state;
    array = [];
    // a max of 300 elements is suported for a screen width of 1200px
    // const arrayarrSize = 300;
    arrSize = utils.getRandomIntInclusive(10, 300);
    for (let i = 0; i < arrSize; i++) {
      // start from 1 to avoid problems of division by zero
      array[i] = utils.getRandomIntInclusive(1, 100);
    }
    arrMax = Math.max(...array);
    // arrMax = 0 ? 0.1 : arrMax;    // if the max cones out to be zero for whatever reason, set it to 0.1
    // arrSize = array.length;
    this.setState({ array, arrMax, arrSize });
  }


  // display array bars inline, with height proportional to element value
  arrList = () => {
    // Don't update this component's state here. Do it in componentDidUpdate() instead
    const { array, arrMax, arrSize } = this.state;
    return array.map((val, index) => (
      <div
        className={styles.singleBar}
        key={index}
        style={{
          height: `${(val * 100) / arrMax}%`,
          width: `${50 / arrSize}rem`,
          margin: `0 ${10 / arrSize}rem`,
        }}
      >
        {/* {val} */}
      </div>
    ));
  };

  render() {

    // if (this.props.isArrayToReset == true) {
    //     if (this.state.isArrayReset == false) {
    //         console.log("Reseeeet");
    //         this.resetArray();
    //         this.setArrReset();
            
    //     } else {
    //     console.log("Noooope");
    //    }
    // }

    // return <div className={styles.arrayContainer}>{this.arrList(array, arrMax, arrSize)}</div>;
    return <div className={styles.arrayContainer}>{this.arrList()}</div>;
  }
}


// to access the store
const mapStateToProps = (state) => {
    console.log(state.controls.resetArr);
    // const { resetArr } = state;
    if (state.controls.resetArr) {
        console.log("Action dispatched successfully");
    }

    // return state;
    return {
        resetArr: state.controls.resetArr
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         resetArray: () => dispatch({type: GEN_RANDOM_ARRAY }),
//     }
// }

// higher level component
export default connect(mapStateToProps, {generateRandomArray})(ArrayOfBars)


// export default connect(null, {generateArr})(ArrayOfBars);
