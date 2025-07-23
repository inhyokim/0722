'use client';

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="bg-[#f5f5f7] py-3">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-center items-center space-x-8 text-xs">
            <span className="text-[#1d1d1f] cursor-pointer hover:text-[#0066cc]">Store</span>
            <span className="text-[#1d1d1f] cursor-pointer hover:text-[#0066cc]">Mac</span>
            <span className="text-[#1d1d1f] cursor-pointer hover:text-[#0066cc]">iPad</span>
            <span className="text-[#1d1d1f] cursor-pointer hover:text-[#0066cc]">iPhone</span>
            <span className="text-[#1d1d1f] cursor-pointer hover:text-[#0066cc]">Watch</span>
            <span className="text-[#1d1d1f] cursor-pointer hover:text-[#0066cc]">Vision</span>
            <span className="text-[#1d1d1f] cursor-pointer hover:text-[#0066cc]">AirPods</span>
            <span className="text-[#1d1d1f] cursor-pointer hover:text-[#0066cc]">TV & Home</span>
            <span className="text-[#1d1d1f] cursor-pointer hover:text-[#0066cc]">Entertainment</span>
            <span className="text-[#1d1d1f] cursor-pointer hover:text-[#0066cc]">Accessories</span>
            <span className="text-[#1d1d1f] cursor-pointer hover:text-[#0066cc]">Support</span>
          </div>
        </div>
      </nav>

      {/* Hero Section with fallback background */}
      <div className="relative bg-[#f5f5f7] overflow-hidden min-h-screen">
        {/* Fallback AirPods pattern background */}
        <div className="absolute inset-0 opacity-10">
          {/* CSS AirPods scattered background */}
          <div className="absolute top-20 left-20 transform rotate-12">
            <div className="w-16 h-20 bg-white rounded-2xl shadow-sm border border-gray-200"></div>
          </div>
          <div className="absolute top-40 right-32 transform -rotate-12">
            <div className="w-16 h-20 bg-white rounded-2xl shadow-sm border border-gray-200"></div>
          </div>
          <div className="absolute bottom-40 left-32 transform rotate-45">
            <div className="w-16 h-20 bg-white rounded-2xl shadow-sm border border-gray-200"></div>
          </div>
          <div className="absolute bottom-20 right-20 transform -rotate-45">
            <div className="w-16 h-20 bg-white rounded-2xl shadow-sm border border-gray-200"></div>
          </div>
          <div className="absolute top-60 left-60 transform rotate-25">
            <div className="w-16 h-20 bg-white rounded-2xl shadow-sm border border-gray-200"></div>
          </div>
          <div className="absolute bottom-60 right-60 transform -rotate-25">
            <div className="w-16 h-20 bg-white rounded-2xl shadow-sm border border-gray-200"></div>
          </div>
        </div>

        {/* Promotional Cards - exactly as shown in screenshot */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen space-y-8">
          {/* Buy Mac or iPad for college */}
          <div className="bg-[#0071e3] text-white rounded-3xl p-8 max-w-md text-center relative overflow-hidden">
            <div className="absolute top-4 right-4">
              {/* MacBook CSS mock */}
              <div className="w-12 h-8 bg-gray-700 rounded transform rotate-12 relative">
                <div className="w-full h-6 bg-black rounded-t"></div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Buy Mac<br />or iPad<br />for college</h2>
            <p className="text-sm bg-[#005bb5] px-4 py-2 rounded-full inline-block">with education savings</p>
          </div>

          {/* Choose AirPods */}
          <div className="bg-[#0071e3] text-white rounded-3xl p-8 max-w-md text-center relative">
            <div className="absolute top-4 left-4 text-2xl">🎓</div>
            <h2 className="text-2xl font-semibold mb-4">Choose<br />AirPods or<br />an eligible<br />accessory*</h2>
            <button className="bg-white text-[#0071e3] px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
              Shop
            </button>
          </div>
        </div>
      </div>

      {/* iPhone Section */}
      <section className="bg-white py-16 text-center">
        <h1 className="text-5xl font-semibold text-[#1d1d1f] mb-4">iPhone</h1>
        <p className="text-xl text-[#1d1d1f] mb-8">Meet the iPhone 16 family.</p>
        
        <div className="flex justify-center space-x-4 mb-8">
          <button className="bg-[#0071e3] text-white px-6 py-3 rounded-full text-sm hover:bg-[#005bb5]">
            Learn more
          </button>
          <button className="border border-[#0071e3] text-[#0071e3] px-6 py-3 rounded-full text-sm hover:bg-[#0071e3] hover:text-white">
            Shop iPhone
          </button>
        </div>

        <p className="text-lg mb-8">
          <span className="text-[#0071e3]">Built for Apple Intelligence.</span>
        </p>

        {/* iPhone Images - Real Product */}
        <div className="flex justify-center items-end space-x-8 max-w-4xl mx-auto">
          <div className="text-center">
            <Image 
              src="/images/products/iphone.png"
              alt="iPhone 16 Pro Max"
              width={240}
              height={300}
              className="mx-auto mb-4 object-contain mix-blend-multiply filter drop-shadow-lg"
              style={{background: 'transparent'}}
            />
          </div>
          <div className="text-center">
            <Image 
              src="/images/products/iphone.png"
              alt="iPhone 16"
              width={240}
              height={300}
              className="mx-auto mb-4 object-contain mix-blend-multiply filter drop-shadow-lg hue-rotate-180"
              style={{background: 'transparent'}}
            />
          </div>
          <div className="text-center">
            <Image 
              src="/images/products/iphone.png"
              alt="iPhone 16 White"
              width={240}
              height={300}
              className="mx-auto mb-4 object-contain mix-blend-multiply filter drop-shadow-lg grayscale"
              style={{background: 'transparent'}}
            />
          </div>
        </div>
      </section>

      {/* MacBook Air Section */}
      <section className="bg-gradient-to-b from-blue-100 to-blue-200 py-16 text-center">
        <h1 className="text-5xl font-bold text-[#1d1d1f] mb-4">MacBook Air</h1>
        <p className="text-xl text-[#1d1d1f] mb-2">Sky blue color.</p>
        <p className="text-xl text-[#1d1d1f] mb-8">Sky high performance with M4.</p>
        
        <div className="flex justify-center space-x-4 mb-12">
          <button className="bg-[#0071e3] text-white px-6 py-3 rounded-full text-sm hover:bg-[#005bb5]">
            Learn more
          </button>
          <button className="border border-[#0071e3] text-[#0071e3] px-6 py-3 rounded-full text-sm hover:bg-[#0071e3] hover:text-white">
            Buy
          </button>
        </div>

        {/* MacBook Real Image */}
        <div className="max-w-2xl mx-auto">
          <Image 
            src="/images/products/macbook-air-blue.png"
            alt="MacBook Air Sky Blue"
            width={600}
            height={400}
            className="mx-auto object-contain mix-blend-multiply filter drop-shadow-2xl"
            style={{background: 'transparent'}}
          />
        </div>

        <p className="text-lg mt-8">
          <span className="text-[#0071e3]">Built for Apple Intelligence.</span>
        </p>
      </section>

      {/* iPad Pro Section */}
      <div className="grid grid-cols-2 min-h-screen">
        <div className="bg-black text-white flex flex-col justify-center items-center p-16">
          <h1 className="text-5xl font-bold mb-4">iPad Pro</h1>
          <p className="text-xl mb-8">Unbelievably thin. Incredibly powerful.</p>
          
          <div className="flex space-x-4 mb-12">
            <button className="bg-[#0071e3] text-white px-6 py-3 rounded-full text-sm hover:bg-[#005bb5]">
              Learn more
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-full text-sm hover:bg-white hover:text-black">
              Buy
            </button>
          </div>

          {/* iPad Real Image */}
          <div className="relative">
            <Image 
              src="/images/products/ipad-pro-black.png"
              alt="iPad Pro"
              width={320}
              height={400}
              className="object-contain mix-blend-screen filter drop-shadow-2xl"
              style={{background: 'transparent'}}
            />
          </div>

          <p className="text-sm mt-8 text-blue-400">Built for Apple Intelligence.</p>
        </div>

        {/* Apple Intelligence Section with fallback background */}
        <div className="bg-gradient-to-br from-purple-200 to-pink-200 flex flex-col justify-center items-center p-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gradient-to-br from-purple-300/60 to-pink-300/60"></div>
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold text-black mb-4 drop-shadow-lg">Apple Intelligence</h1>
            <p className="text-lg text-black mb-8 drop-shadow-md">Remove distractions from<br />your photos with Clean Up.*</p>
            
            <div className="flex space-x-4">
              <button className="bg-white text-black px-6 py-3 rounded-full text-sm hover:bg-gray-100 shadow-lg">
                Watch the clip
              </button>
              <button className="border-2 border-black text-black px-6 py-3 rounded-full text-sm hover:bg-black hover:text-white shadow-lg">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apple Watch Section */}
      <div className="grid grid-cols-2 min-h-[50vh]">
        <div className="bg-[#f5f5f7] flex flex-col justify-center items-center p-16">
          <div className="text-center mb-8">
            {/* Apple Watch Real Image */}
            <Image 
              src="/images/products/apple-watch-series10.png"
              alt="Apple Watch Series 10"
              width={200}
              height={200}
              className="mx-auto mb-4 object-contain mix-blend-multiply filter drop-shadow-lg"
              style={{background: 'transparent'}}
            />
            <div className="text-2xl font-bold mb-2"> WATCH</div>
            <div className="text-sm text-gray-600">SERIES 10</div>
          </div>
          <h2 className="text-3xl font-bold text-[#1d1d1f] mb-8">Thinstant classic.</h2>
          
          <div className="flex space-x-4">
            <button className="bg-[#0071e3] text-white px-6 py-3 rounded-full text-sm hover:bg-[#005bb5]">
              Learn more
            </button>
            <button className="border border-[#0071e3] text-[#0071e3] px-6 py-3 rounded-full text-sm hover:bg-[#0071e3] hover:text-white">
              Buy
            </button>
          </div>
        </div>

        <div className="bg-black flex flex-col justify-center items-center p-16">
          {/* AirPods Real Image */}
          <Image 
            src="/images/products/airpods-pro-2.png"
            alt="AirPods Pro 2"
            width={200}
            height={150}
            className="mb-8 object-contain mix-blend-screen filter drop-shadow-lg"
            style={{background: 'transparent'}}
          />
          
          <h1 className="text-3xl font-bold text-white mb-4">AirPods Pro 2</h1>
          <p className="text-lg text-white mb-8">Now with a Hearing Aid feature.*</p>
          
          <div className="flex space-x-4">
            <button className="bg-[#0071e3] text-white px-6 py-3 rounded-full text-sm hover:bg-[#005bb5]">
              Learn more
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-full text-sm hover:bg-white hover:text-black">
              Buy
            </button>
          </div>
        </div>
      </div>

      {/* Trade In & Apple Card Section */}
      <div className="grid grid-cols-2 min-h-[50vh]">
        <div className="bg-[#f5f5f7] flex flex-col justify-center items-center p-16 text-center relative">
          <div className="absolute bottom-0 left-0 right-0 h-1/2">
            <div className="w-full h-full bg-gradient-to-t from-blue-200/40 to-transparent rounded-t-lg flex items-end justify-center pb-8">
              <div className="flex space-x-2">
                <Image 
                  src="/images/products/iphone.png"
                  alt="Trade In iPhone"
                  width={32}
                  height={48}
                  className="object-contain mix-blend-multiply filter drop-shadow"
                />
                <Image 
                  src="/images/products/iphone.png"
                  alt="Trade In iPhone"
                  width={32}
                  height={48}
                  className="object-contain mix-blend-multiply filter drop-shadow grayscale"
                />
                <Image 
                  src="/images/products/iphone.png"
                  alt="Trade In iPhone"
                  width={32}
                  height={48}
                  className="object-contain mix-blend-multiply filter drop-shadow hue-rotate-180"
                />
              </div>
            </div>
          </div>
          <div className="relative z-10">
            <div className="text-2xl font-bold mb-4"> Trade In</div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Get $160-$600 in credit when you<br />trade in iPhone 12 or higher.*</h2>
            
            <button className="bg-[#0071e3] text-white px-6 py-3 rounded-full text-sm hover:bg-[#005bb5]">
              Get your estimate
            </button>
          </div>
        </div>

        <div className="bg-[#f5f5f7] flex flex-col justify-center items-center p-16 text-center relative">
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2">
            <div className="w-full h-full bg-gradient-to-tl from-gray-300/60 to-transparent rounded-tl-lg flex items-end justify-center pb-4 pr-4">
              <div className="w-16 h-10 bg-white rounded shadow-lg border border-gray-200 flex items-center justify-center">
                <div className="text-xs text-gray-600"></div>
              </div>
            </div>
          </div>
          <div className="relative z-10">
            <div className="text-2xl font-bold mb-4"> Card</div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Get up to 3% Daily Cash back<br />with every purchase.</h2>
            
            <div className="flex space-x-4">
              <button className="bg-[#0071e3] text-white px-6 py-3 rounded-full text-sm hover:bg-[#005bb5]">
                Learn more
              </button>
              <button className="border border-[#0071e3] text-[#0071e3] px-6 py-3 rounded-full text-sm hover:bg-[#0071e3] hover:text-white">
                Apply now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apple TV+ Section with fallback background */}
      <section className="bg-black text-white py-16 relative overflow-hidden">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold mb-4"> TV+</div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden relative h-96 bg-gradient-to-r from-yellow-100 to-orange-200">
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            <div className="absolute right-8 top-8">
              <div className="text-6xl">🌴</div>
            </div>
            <div className="absolute bottom-8 left-8">
              <h1 className="text-6xl font-bold mb-4 text-black drop-shadow-xl" style={{fontStyle: 'italic'}}>The<br />Studio</h1>
              <button className="bg-white text-black px-6 py-3 rounded-full text-sm mr-4 shadow-lg">
                Stream now
              </button>
              <span className="text-sm text-black drop-shadow">Comedy • 23 Emmy® Nominations Including Best Comedy</span>
            </div>
            <div className="absolute bottom-8 right-8">
              <div className="text-2xl font-bold text-black drop-shadow"> TV+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-5 gap-4 h-80">
          {/* Apple Arcade */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 left-4 z-10">
              <div className="text-lg font-bold"> Arcade</div>
            </div>
          </div>

          {/* Fitness+ */}
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="w-8 h-8 bg-pink-300 rounded-full"></div>
            </div>
            <div className="absolute bottom-4 left-4 z-10">
              <div className="text-sm">Strong and Calm Combos for Busy Days</div>
              <div className="text-lg font-bold"> Fitness+</div>
            </div>
          </div>

          {/* Apple Music */}
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
              <div className="text-sm">  Music</div>
            </div>
            <div className="absolute bottom-4 left-4 z-10">
              <div className="text-lg font-bold">Seth Rogen<br />& Zane Lowe</div>
            </div>
          </div>

          {/* PGA Tour Pro Golf */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute bottom-4 left-4 z-10">
              <div className="text-sm">PGA TOUR Pro Golf</div>
              <div className="text-lg font-bold"> Arcade</div>
            </div>
          </div>

          {/* Strength with Gregg */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 text-black relative overflow-hidden">
            <div className="absolute bottom-4 left-4 z-10">
              <div className="text-sm font-semibold">Strength with Gregg</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f5f5f7] py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Legal Text */}
          <div className="text-xs text-gray-600 mb-8 space-y-4">
            <p>
              1. Available for Qualified Purchasers only. Qualified Purchasers purchasing an eligible Mac/iPad ("Eligible Product") with eligible AirPods/accessory ("Promotion Product") from a Qualifying Location through September 30, 2025 will receive Promotion Savings (up to $199, not to exceed the price of the Promotion Product). Customers will be charged for all items in their cart, including the Promotion Product. Only one Promotion Product per Eligible Product per Qualified Purchaser. Offer subject to availability. While supplies last. Additional restrictions apply. View full offer terms
            </p>
            <p>
              2. Clean Up is available in beta on all iPhone 16 models, iPhone 15 Pro, iPhone 15 Pro Max, iPad mini (A17 Pro), and iPad and Mac with M1 and later, as part of an iOS 18, iPadOS 18, and macOS Sequoia update.
            </p>
            <p>
              3. Hearing Aid and Hearing Test: The Hearing Aid feature has received FDA authorization. The Hearing Test and Hearing Aid features are supported on AirPods Pro 2 with the latest firmware paired with a compatible iPhone or iPad with iOS 18 or iPadOS 18 and later and are intended for people 18 years old or older. The Hearing Aid feature is also supported on a compatible Mac with macOS Sequoia and later. It is intended for people with perceived mild to moderate hearing loss.
            </p>
            <p>
              4. Trade‑in values will vary based on the condition, year, and configuration of your eligible trade‑in device. Not all devices are eligible for credit. You must be at least the age of majority to be eligible to trade in for credit or for an Apple Gift Card. Trade‑in value may be applied toward qualifying new device purchase, or added to an Apple Gift Card. Actual value awarded is based on receipt of a qualifying device matching the description provided when estimate was made. Sales tax may be assessed on full value of a new device purchase. In‑store trade‑in requires presentation of a valid photo ID (local law may require saving this information). Offer may not be available in all stores, and may vary between in‑store and online trade‑in. Some stores may have additional requirements. Apple or its trade‑in partners reserve the right to refuse, cancel, or limit quantity of any trade‑in transaction for any reason. More details are available from Apple's trade-in partner for trade‑in and recycling of eligible devices. Restrictions and limitations may apply.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-5 gap-8 text-xs">
            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-3">Shop and Learn</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:underline">Store</a></li>
                <li><a href="#" className="hover:underline">Mac</a></li>
                <li><a href="#" className="hover:underline">iPad</a></li>
                <li><a href="#" className="hover:underline">iPhone</a></li>
                <li><a href="#" className="hover:underline">Watch</a></li>
                <li><a href="#" className="hover:underline">Vision</a></li>
                <li><a href="#" className="hover:underline">AirPods</a></li>
                <li><a href="#" className="hover:underline">TV & Home</a></li>
                <li><a href="#" className="hover:underline">AirTag</a></li>
                <li><a href="#" className="hover:underline">Accessories</a></li>
                <li><a href="#" className="hover:underline">Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-3">Apple Wallet</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:underline">Wallet</a></li>
                <li><a href="#" className="hover:underline">Apple Card</a></li>
                <li><a href="#" className="hover:underline">Apple Pay</a></li>
                <li><a href="#" className="hover:underline">Apple Cash</a></li>
              </ul>

              <h4 className="font-semibold text-[#1d1d1f] mt-6 mb-3">Account</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:underline">Manage Your Apple Account</a></li>
                <li><a href="#" className="hover:underline">Apple Store Account</a></li>
                <li><a href="#" className="hover:underline">iCloud.com</a></li>
              </ul>

              <h4 className="font-semibold text-[#1d1d1f] mt-6 mb-3">Entertainment</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:underline">Apple One</a></li>
                <li><a href="#" className="hover:underline">Apple TV+</a></li>
                <li><a href="#" className="hover:underline">Apple Music</a></li>
                <li><a href="#" className="hover:underline">Apple Arcade</a></li>
                <li><a href="#" className="hover:underline">Apple Fitness+</a></li>
                <li><a href="#" className="hover:underline">Apple News+</a></li>
                <li><a href="#" className="hover:underline">Apple Podcasts</a></li>
                <li><a href="#" className="hover:underline">Apple Books</a></li>
                <li><a href="#" className="hover:underline">App Store</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-3">Apple Store</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:underline">Find a Store</a></li>
                <li><a href="#" className="hover:underline">Genius Bar</a></li>
                <li><a href="#" className="hover:underline">Today at Apple</a></li>
                <li><a href="#" className="hover:underline">Group Reservations</a></li>
                <li><a href="#" className="hover:underline">Apple Camp</a></li>
                <li><a href="#" className="hover:underline">Apple Store App</a></li>
                <li><a href="#" className="hover:underline">Certified Refurbished</a></li>
                <li><a href="#" className="hover:underline">Apple Trade In</a></li>
                <li><a href="#" className="hover:underline">Financing</a></li>
                <li><a href="#" className="hover:underline">Carrier Deals at Apple</a></li>
                <li><a href="#" className="hover:underline">Order Status</a></li>
                <li><a href="#" className="hover:underline">Shopping Help</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-3">For Business</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:underline">Apple and Business</a></li>
                <li><a href="#" className="hover:underline">Shop for Business</a></li>
              </ul>

              <h4 className="font-semibold text-[#1d1d1f] mt-6 mb-3">For Education</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:underline">Apple and Education</a></li>
                <li><a href="#" className="hover:underline">Shop for K-12</a></li>
                <li><a href="#" className="hover:underline">Shop for College</a></li>
              </ul>

              <h4 className="font-semibold text-[#1d1d1f] mt-6 mb-3">For Healthcare</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:underline">Apple in Healthcare</a></li>
                <li><a href="#" className="hover:underline">Mac in Healthcare</a></li>
                <li><a href="#" className="hover:underline">Health on Apple Watch</a></li>
                <li><a href="#" className="hover:underline">Health Records on iPhone and iPad</a></li>
              </ul>

              <h4 className="font-semibold text-[#1d1d1f] mt-6 mb-3">For Government</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:underline">Shop for Government</a></li>
                <li><a href="#" className="hover:underline">Shop for Veterans and Military</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#1d1d1f] mb-3">Apple Values</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:underline">Accessibility</a></li>
                <li><a href="#" className="hover:underline">Education</a></li>
                <li><a href="#" className="hover:underline">Environment</a></li>
                <li><a href="#" className="hover:underline">Inclusion and Diversity</a></li>
                <li><a href="#" className="hover:underline">Privacy</a></li>
                <li><a href="#" className="hover:underline">Racial Equity and Justice</a></li>
                <li><a href="#" className="hover:underline">Supply Chain Innovation</a></li>
              </ul>

              <h4 className="font-semibold text-[#1d1d1f] mt-6 mb-3">About Apple</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:underline">Newsroom</a></li>
                <li><a href="#" className="hover:underline">Apple Leadership</a></li>
                <li><a href="#" className="hover:underline">Career Opportunities</a></li>
                <li><a href="#" className="hover:underline">Investors</a></li>
                <li><a href="#" className="hover:underline">Ethics & Compliance</a></li>
                <li><a href="#" className="hover:underline">Events</a></li>
                <li><a href="#" className="hover:underline">Contact Apple</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-300 mt-8 pt-6 flex justify-between items-center text-xs text-gray-600">
            <div className="flex items-center space-x-4">
              <span>More ways to shop: <a href="#" className="text-[#0066cc] hover:underline">Find an Apple Store</a> or <a href="#" className="text-[#0066cc] hover:underline">other retailer</a> near you. Or call 1-800-MY-APPLE.</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 text-xs text-gray-600">
            <span>&copy; Copyright © 2025 Apple Inc. All rights reserved.</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:underline">Terms of Use</a>
              <span>|</span>
              <a href="#" className="hover:underline">Sales and Refunds</a>
              <span>|</span>
              <a href="#" className="hover:underline">Legal</a>
              <span>|</span>
              <a href="#" className="hover:underline">Site Map</a>
            </div>
            <span>United States</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
