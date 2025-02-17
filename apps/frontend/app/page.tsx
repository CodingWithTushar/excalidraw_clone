"use client";
import { ArrowRightIcon, BeakerIcon, CloudArrowDownIcon, CursorArrowRaysIcon, HandRaisedIcon, PencilSquareIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LandingPage() {

  const router =  useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* NavBar*/}
      <nav className="sticky top-0 bg-white/75 backdrop-blur-md border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-bold text-indigo-600">DrawFlow</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-600 hover:text-indigo-600 px-3 py-2">Features</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 px-3 py-2">Examples</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600 px-3 py-2">Pricing</a>
                <a href="/canvas" className="ml-4 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                  Start Drawing
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mean */}
      <div className="relative pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-extrabold text-gray-900 sm:text-6xl"
            >
              Visual Collaboration Made 
              <span className="text-indigo-600"> Simple</span>
            </motion.h1>
            <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-500">
              Create, collaborate, and communicate with our intuitive whiteboard tool. Perfect for teams, educators, and creatives.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <motion.button onClick={()=> {
                router.push("/canvas")
              }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Start Drawing Now
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Mock Canvas Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-16 bg-gray-50 rounded-2xl shadow-xl p-4 border border-gray-200 hover:shadow-2xl"
          >
            <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="inline-block p-4 bg-indigo-100 rounded-full">
                  <PencilSquareIcon className="h-12 w-12 text-indigo-600" />
                </div>
                <p className="text-gray-500">Interactive canvas loading...</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features*/}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Powerful Features</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-500">
              Everything you need for effective visual collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: CursorArrowRaysIcon,
                title: "Real-time Collaboration",
                description: "Work together simultaneously with team members anywhere in the world"
              },
              {
                icon: SparklesIcon,
                title: "Smart Shapes",
                description: "Perfect geometric shapes, arrows, and connectors with automatic snapping"
              },
              {
                icon: CloudArrowDownIcon,
                title: "Cloud Storage",
                description: "Automatic saving to the cloud with version history and recovery"
              },
              {
                icon: HandRaisedIcon,
                title: "Hand-drawn Style",
                description: "Natural-looking sketches with adjustable roughness and precision"
              },
              {
                icon: BeakerIcon,
                title: "Open Format",
                description: "Export to multiple formats including PNG, SVG, and JSON"
              },
              {
                icon: PencilSquareIcon,
                title: "Customizable Tools",
                description: "Create your own tool presets and keyboard shortcuts"
              },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
                <h3 className="text-xl text-black font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Creating?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of teams already using DrawFlow for their visual collaboration
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
            onClick={()=> {
              router.push("/SignUp")
            }}
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100"
            >
              Sign Up
            </motion.button>
            <motion.button
            onClick={()=> {
              router.push("/SignIn")
            }}
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100"
            >
              Sign In
            </motion.button>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-medium mb-4">DrawFlow</h3>
              <p className="text-sm">Making visual collaboration accessible to everyone</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; 2024 DrawFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}