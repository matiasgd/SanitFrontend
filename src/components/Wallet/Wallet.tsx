import React from 'react';
import IncomeTable from './IncomeTable';
import Sidebar from '../Dashboard/Sidebar';
import Keypad from './Keypad';
import defaultPayments from '../../../public/defaultPayments';

const Wallet: React.FC = () => {
  return (
    <div style={{display:"flex", margin:"20px", gap:"20px"}}>
      <div style={{width:"10%", minWidth:"200px"}}>
      <Sidebar/>
      </div>
      <div style={{display:"flex", flexDirection:"column", width:"90%", gap:"20px"}}>
      <Keypad/> 
      <IncomeTable incomes={defaultPayments}/>
      </div>
    </div>
  );
};

export default Wallet;