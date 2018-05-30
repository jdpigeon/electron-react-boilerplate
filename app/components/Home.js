// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.css";

type Props = {
  jupyterActions: Object
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
          <button
            className={styles.btn}
            onClick={this.props.jupyterActions.launchKernel}
            data-tclass="btn"
          >
            Launch Kernel
          </button>
          <button
            className={styles.btn}
            onClick={() => this.props.jupyterActions.requestKernelInfo()}
            data-tclass="btn"
          >
            Request Kernel Info
          </button>
          <button
            className={styles.btn}
            onClick={() =>
              this.props.jupyterActions.sendExecuteRequest("print(2+2)")
            }
            data-tclass="btn"
          >
            Print 2 + 2
          </button>
          <button
            className={styles.btn}
            onClick={() =>
              this.props.jupyterActions.closeKernel()
            }
            data-tclass="btn"
          >
            Close Kernel
          </button>
        </div>
      </div>
    );
  }
}
