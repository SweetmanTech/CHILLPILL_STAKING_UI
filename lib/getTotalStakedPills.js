const getTotalStakedPills = async (staking) => {
  const stakedBalance = await staking.totalStaked();
  return stakedBalance.toNumber();
};

export default getTotalStakedPills;
