import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function MortgageRefinanceCalculator() {
  const [currentLoanAmount, setCurrentLoanAmount] = useState('');
  const [currentInterestRate, setCurrentInterestRate] = useState('');
  const [newLoanAmount, setNewLoanAmount] = useState('');
  const [newInterestRate, setNewInterestRate] = useState('');
  const [remainingTerm, setRemainingTerm] = useState('');
  const [newLoanTerm, setNewLoanTerm] = useState('');
  const [monthlySavings, setMonthlySavings] = useState(null);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [newPayment, setNewPayment] = useState(null);

  // Helper function to format numbers with commas and two decimals.
  const formatCurrency = (value) => {
    if (!value || isNaN(value)) {
      return '0.00';
    }
    return parseFloat(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calculateSavings = () => {
    // Parse fields for current scenario
    const cLoanAmount = parseFloat(currentLoanAmount);
    const cRate = parseFloat(currentInterestRate) / 100 / 12;
    const cMonths = parseInt(remainingTerm) * 12;

    // Parse fields for new/refinance scenario
    const nLoanAmount = parseFloat(newLoanAmount);
    const nRate = parseFloat(newInterestRate) / 100 / 12;
    const nMonths = parseInt(newLoanTerm) * 12;

    // Calculate monthly payment for current loan
    const currentMonthlyPayment = (cLoanAmount * cRate) / (1 - Math.pow(1 + cRate, -cMonths));
    // Calculate monthly payment for new loan
    const newMonthlyPayment = (nLoanAmount * nRate) / (1 - Math.pow(1 + nRate, -nMonths));

    // Calculate savings (difference)
    const savings = currentMonthlyPayment - newMonthlyPayment;

    // Store values in state
    setCurrentPayment(currentMonthlyPayment);
    setNewPayment(newMonthlyPayment);
    setMonthlySavings(savings);
  };

  // Determine the class for Projected Monthly Savings based on positive or negative
  const getSavingsClass = () => {
    if (monthlySavings === null) return '';
    return monthlySavings > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className='grid grid-cols-2 gap-6 max-w-3xl mx-auto mt-10 p-6'>
      {/* Left Column: Input Fields */}
      <Card className='col-span-1'>
        <CardContent>
          <h2 className='text-xl font-bold mb-4'>Mortgage Refinance Calculator</h2>
          <div className='grid gap-4'>
            {/* Current Loan Amount */}
            <div className='flex items-center gap-2'>
              <Label htmlFor='currentLoanAmount' className='whitespace-nowrap min-w-[10rem]'>Current Loan Amount ($)</Label>
              <Input
                id='currentLoanAmount'
                placeholder='Current Loan Amount ($)'
                value={currentLoanAmount}
                onChange={(e) => setCurrentLoanAmount(e.target.value)}
              />
            </div>

            {/* Current Interest Rate */}
            <div className='flex items-center gap-2'>
              <Label htmlFor='currentInterestRate' className='whitespace-nowrap min-w-[10rem]'>Current Interest Rate (%)</Label>
              <Input
                id='currentInterestRate'
                placeholder='Current Interest Rate (%)'
                value={currentInterestRate}
                onChange={(e) => setCurrentInterestRate(e.target.value)}
              />
            </div>

            {/* Remaining Term */}
            <div className='flex items-center gap-2'>
              <Label htmlFor='remainingTerm' className='whitespace-nowrap min-w-[10rem]'>Remaining Term (years)</Label>
              <Input
                id='remainingTerm'
                placeholder='Remaining Term (years)'
                value={remainingTerm}
                onChange={(e) => setRemainingTerm(e.target.value)}
              />
            </div>

            {/* New Loan Amount */}
            <div className='flex items-center gap-2'>
              <Label htmlFor='newLoanAmount' className='whitespace-nowrap min-w-[10rem]'>New Loan Amount ($)</Label>
              <Input
                id='newLoanAmount'
                placeholder='New Loan Amount ($)'
                value={newLoanAmount}
                onChange={(e) => setNewLoanAmount(e.target.value)}
              />
            </div>

            {/* New Interest Rate */}
            <div className='flex items-center gap-2'>
              <Label htmlFor='newInterestRate' className='whitespace-nowrap min-w-[10rem]'>New Interest Rate (%)</Label>
              <Input
                id='newInterestRate'
                placeholder='New Interest Rate (%)'
                value={newInterestRate}
                onChange={(e) => setNewInterestRate(e.target.value)}
              />
            </div>

            {/* New Loan Term */}
            <div className='flex items-center gap-2'>
              <Label htmlFor='newLoanTerm' className='whitespace-nowrap min-w-[10rem]'>New Loan Term (years)</Label>
              <Input
                id='newLoanTerm'
                placeholder='New Loan Term (years)'
                value={newLoanTerm}
                onChange={(e) => setNewLoanTerm(e.target.value)}
              />
            </div>

            {/* Calculate Button */}
            <div>
              <Button onClick={calculateSavings}>Calculate Savings</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Column: Payment & Savings Overview */}
      <Card className='col-span-1'>
        <CardContent>
          <h2 className='text-xl font-bold mb-4'>Payment & Savings Overview</h2>

          {/* Current Loan Amount Display (formatted with commas) */}
          {currentLoanAmount && !isNaN(parseFloat(currentLoanAmount)) && (
            <div className='mb-2'>
              <p>Current Loan Amount: <strong>${formatCurrency(currentLoanAmount)}</strong></p>
            </div>
          )}

          {/* Current Monthly Payment Display (formatted with commas) */}
          {currentPayment !== null && (
            <div className='mb-2'>
              <p>Current Monthly Payment: <strong>${formatCurrency(currentPayment)}</strong></p>
            </div>
          )}

          {/* New Loan Amount Display (formatted with commas) */}
          {newLoanAmount && !isNaN(parseFloat(newLoanAmount)) && (
            <div className='mb-2'>
              <p>New Loan Amount: <strong>${formatCurrency(newLoanAmount)}</strong></p>
            </div>
          )}

          {/* New Monthly Payment Display (formatted with commas) */}
          {newPayment !== null && (
            <div className='mb-2'>
              <p>New Monthly Payment: <strong>${formatCurrency(newPayment)}</strong></p>
            </div>
          )}

          {/* Projected Monthly Savings Display (formatted and color-coded) */}
          {monthlySavings !== null && (
            <div className={`mt-4 ${getSavingsClass()}`}>
              <p className='text-lg'>Projected Monthly Savings: <strong>${formatCurrency(monthlySavings)}</strong></p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
