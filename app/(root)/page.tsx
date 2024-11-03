import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalancebox from '@/components/TotalBalancebox'
import RightSidebar from '@/components/RightSidebar'

const Home = () => {
    const loggedIn = {firstName:"Sharique", lastName:"Shaikh", email:"Shariques966@gmail.com"}
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
            <HeaderBox
                type="greeting"
                title="Welcome"
                user={loggedIn?.firstName || "Guest"}
                subtext="Access and manage your account and transactions efficiently"
            />
            <TotalBalancebox
              accounts = {[]}
              totalBanks = {1}
              totalCurrentBalance = {1250.30}
            />
        </header>
          Recent Transaction
      </div>
        <RightSidebar 
          user={loggedIn}
          transactions={[]}
          banks={[{currentBalance:123.50},{currentBalance:500.30}]}

        />
    </section>
  )
}

export default Home
