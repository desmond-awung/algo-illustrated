import React from "react";
import { connect } from "react-redux";
import { generateRandomArray, sortArray } from "../../redux/action";

function Controls(props) {
	const resetArray = () => {
		props.generateRandomArray();
	};

	const sortArrayOfBars = (sortType) => {
		if (sortType > 0) {
			console.log("SortArray Clicked");
			props.sortArray(sortType);
		}
	};

	return (
		<div className="container">
			<div className="row" id="controls-bar">
				<div className="col-md-5">
					<ul className="nav nav-pills">
						<li className="nav-item">
							<button
								className="btn btn-outline-primary"
								onClick={resetArray}
							>
								Generate Random Array
							</button>
						</li>

						<li className="nav-item dropdown">
							<button
								className="dropdown-toggle btn btn-outline-primary"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								More Array Options
							</button>
							<div className="dropdown-menu">
								<button className="dropdown-item">
									Random Array of specific size
								</button>
								<button className="dropdown-item">
									Enter Array Input
								</button>
								<div className="dropdown-divider"></div>
								<button className="dropdown-item">
									More details
								</button>
							</div>
						</li>
					</ul>
				</div>

				{/* <!-- right side of controls bar --> */}
				<div className="col-md-7">
					<ul className="nav nav-pills nav-fill">
						<li className="nav-item">
							<button
								className="btn btn-outline-info"
								onClick={() => sortArrayOfBars(1)}
							>
								Selection Sort
							</button>
						</li>
						<li className="nav-item">
							<button className="btn btn-outline-info disabled">
								BubbleSort
							</button>
							{/* (click)="sortArray(SortType.BubbleSort)">Bubble Sort</a> */}
						</li>
						<li className="nav-item">
							<button className="btn btn-outline-info disabled">
								Insertion Sort
							</button>
							{/* (click)="sortArray(SortType.InsertionSort)">Insertion Sort</a> */}
						</li>
						<li className="nav-item">
							<button className="btn btn-outline-info disabled">
								Merge Sort
							</button>
							{/* (click)="sortArray(SortType.MergeSort)">Merge Sort</a> */}
						</li>
						<li className="nav-item">
							<button className="btn btn-outline-info disabled">
								Quick Sort
							</button>
							{/* (click)="sortArray(SortType.QuickSort)">Quick Sort</a> */}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
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
export default connect(null, { generateRandomArray, sortArray })(Controls);
