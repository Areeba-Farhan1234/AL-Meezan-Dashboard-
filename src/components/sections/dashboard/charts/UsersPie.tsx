// // src/components/VatFormsPie.tsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useVatReg } from '../../../../context/VATContext'; // VAT Registration
import { useVatDereg } from '../../../../context/VATDeregContext'; // VAT Deregistration
import { useRefundContext } from '../../../../context/RefundContext'; // VAT Refund

const COLORS = ['#3e4093', '#7e85bc', '#aeb0d6'];

const VatFormsPie: React.FC = () => {
  const { clients } = useVatReg(); // Registration forms
  const { vatDeregList } = useVatDereg(); // Deregistration forms
  const { reports } = useRefundContext(); // Refund reports
  console.log('VAT Refund reports length:', reports.length); // ✅ DEBUG
  const pieData = [
    { name: 'VAT Registration Forms', value: clients.length },
    { name: 'VAT Deregistration Forms', value: vatDeregList.length },
    { name: 'VAT Refund Forms', value: 6 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto my-10">
      <h2 className="text-xl font-semibold text-[#3e4093] mb-4">VAT Forms Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: 8,
            }}
          />
          <Legend verticalAlign="bottom" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// const VatFormsPie: React.FC = () => {
//   const { clients } = useVatReg();
//   const { vatDeregList } = useVatDereg();
//   const { reports } = useRefundContext();

//   console.log('VAT Refund reports length:', reports.length);

//   if (!clients.length && !vatDeregList.length && !reports.length) {
//     return <p>Loading VAT data...</p>; // 🕒 Wait for data
//   }

//   const pieData = [
//     { name: 'VAT Registration Forms', value: clients.length },
//     { name: 'VAT Deregistration Forms', value: vatDeregList.length },
//     { name: 'VAT Refund Forms', value: reports.length },
//   ];

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto my-10">
//       <h2 className="text-xl font-semibold text-[#3e4093] mb-4">VAT Forms Breakdown</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={pieData}
//             cx="50%"
//             cy="50%"
//             innerRadius={60}
//             outerRadius={100}
//             paddingAngle={5}
//             dataKey="value"
//             stroke="none"
//           >
//             {pieData.map((_, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip
//             contentStyle={{
//               backgroundColor: '#fff',
//               border: '1px solid #ccc',
//               borderRadius: 8,
//             }}
//           />
//           <Legend verticalAlign="bottom" iconType="circle" />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

export default VatFormsPie;
