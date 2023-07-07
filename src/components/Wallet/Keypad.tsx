import React from 'react';
import MetricBox from '../../commons/wallet/MetricBox';

const Keypad: React.FC = () => {
  return (
    <div style={{display:"flex", justifyContent: "space-between", margin:"20px"}}>
    <MetricBox title="Incomen" metric="252.000" color="#F2F7FD" currency="$"/>
    <MetricBox title="Services" metric="21" color="#F2F7FD" currency=""/>
    <MetricBox title="Conversion" metric="490" color="#EEEFF4" currency="USD"/>
    <MetricBox title="Pending" metric="17.000" color="#FFFFC5" currency="$"/>
    </div>
  );
};

export default Keypad;
