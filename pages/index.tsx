import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import LeftElement from '../components/LeftElement'
import MiddleElement from '../components/MiddleElement'
import RightElement from '../components/RightElement'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="font-baloo flex flex-col bg-amber-50">
      <Head>
        <title>Makerble - Home</title>
        <meta name="description" content="Welcome to Makerble - Your project management and collaboration platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex w-full flex-row overflow-hidden">
        <div className="flex-none h-full bg-white ">
          <LeftElement />
        </div>
        <div className="">
          <MiddleElement />
        </div>
        <div className=" ">
          <RightElement />
        </div>
      </main>

      <Footer />
    </div>
  )
}