import React from 'react'
import { connect } from 'react-redux'
import { GEN_RANDOM_ARRAY } from '../../redux/actionTypes'
import { generateRandomArray } from "../../redux/action";

function Controls(props) {

    const resetArray = () => {
        props.generateRandomArray();
    }

    return (
        <div className="row" id="controls-bar">
            <div className="col-md-4">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className="nav-link" type="button" className="btn btn-outline-primary" onClick={resetArray}>Generate Random Array</a>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false">More Array Options</a>
                        <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Random Array of specific size</a>
                        <a className="dropdown-item" href="#">Enter Array Input</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">More details</a>
                        </div>   
                    </li>

                </ul>
            </div>

            {/* <!-- right side of controls bar --> */}
            <div className="col-md-8">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className="nav-link active" type="button" className="btn btn-outline-info"></a> 
                        {/* (click)="sortArray(SortType.SelectionSort)">Selection Sort</a> */}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" type="button" className="btn btn-outline-info"></a> 
                        {/* (click)="sortArray(SortType.BubbleSort)">Bubble Sort</a> */}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" type="button" className="btn btn-outline-info">Insertion Sort</a> 
                        {/* (click)="sortArray(SortType.InsertionSort)">Insertion Sort</a> */}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" type="button" className="btn btn-outline-info">Merge Sort</a> 
                        {/* (click)="sortArray(SortType.MergeSort)">Merge Sort</a> */}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" type="button" className="btn btn-outline-info">Quick Sort</a> 
                        {/* (click)="sortArray(SortType.QuickSort)">Quick Sort</a> */}
                    </li>
                </ul>
            </div>

        </div>
    )
}

// to access the store
// const mapStateToProps = (state) => {
//     return {
//         resetArr: state.resetArr
//     }
// }

//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         resetArray: () => dispatch({type: GEN_RANDOM_ARRAY }),
//     }
// }



// higher level component
export default connect(null, {generateRandomArray})(Controls)
