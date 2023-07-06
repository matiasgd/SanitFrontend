import React from 'react';
import MetricBox from '../../commons/wallet/MetricBox';

const Keypad: React.FC = () => {
  return (
    <div style={{display:"flex", justifyContent: "space-between"}}>
    <MetricBox/>
    <MetricBox/>
    <MetricBox/>
    <MetricBox/>
    </div>
  );
};

export default Keypad;
