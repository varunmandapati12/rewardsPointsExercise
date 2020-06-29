import React, { Component, Fragment } from "react";
import rewardsByCustomer from "../helper";

class Rewards extends Component {
  createTable = data => {
    return (
      <Fragment>
        {data.map(d => (
          <tr>
            <td className="v-align-middle">{d.month}</td>
            <td className="nested-table">
              <table className="nested-table">
                <tr>
                  <th>Trans Id</th>
                  <th>Amount</th>
                </tr>
                {d.transactions.length ? (
                  d.transactions.map((t, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{t.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colspan="2" className="no-data">
                      No Data
                    </td>
                  </tr>
                )}
              </table>
            </td>
            <td className="v-align-middle">{d.total}</td>
          </tr>
        ))}
      </Fragment>
    );
  };

  render() {
    const { transactions } = this.props;
    return (
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Last 3 Month Reward</th>
            <th>Total Reward</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length ? (
            rewardsByCustomer(transactions).map(customer => (
              <tr>
                <td className="v-align-middle">{customer.name}</td>
                <td className="nested-table">
                  <table className="nested-table">
                    {this.createTable(customer.rewardPerMonth)}
                  </table>
                </td>
                <td className="v-align-middle">{customer.totalReward}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colspan="3" className="no-data">
                "No Transactions"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default Rewards;
