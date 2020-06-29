const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const getReward = amount => {
  if (amount >= 50 && amount < 100) {
    return amount - 50;
  } else if (amount >= 100) {
    return 2 * (amount - 100) + 50;
  }
  return 0;
};

const getTotalRewards = transactions => {
  return transactions.length
    ? transactions.reduce((acc, key) => getReward(key.amount) + acc, 0)
    : 0;
};

const getRewardPerMonth = transactions => {
  let last3MonthRewards = [];
  for (let i = 0; i < 3; i++) {
    let filteredList = transactions.filter(
      t => new Date(t.date).getMonth() === new Date().getMonth() - i
    );
 
    last3MonthRewards[i] = {
      month: months[new Date().getMonth() - i],
      total: filteredList.reduce((acc, key) => getReward(key.amount) + acc, 0),
      transactions: filteredList
    };
  }

  return last3MonthRewards;
};

const rewardsByCustomer = transactions => {
  let groupByCustomer = transactions.reduce(
    (cust, { customer, amount, date }) => {
      if (!cust[customer]) {
        cust[customer] = [];
      }
      cust[customer].push({ amount, date });
      return cust;
    },
    {}
  );

  let transactionsDetails = [];

  for (let customerId in groupByCustomer) {
    let last3Month = getRewardPerMonth(groupByCustomer[customerId]);
    let totalReward = getTotalRewards(groupByCustomer[customerId]);
    transactionsDetails.push({
      name: customerId,
      rewardPerMonth: last3Month,
      totalReward: totalReward
    });
  }

  return transactionsDetails;
};

export default rewardsByCustomer;