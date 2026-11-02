// 'use client';

// import { CheckCircle, BookOpen, BarChart3, Users, Home as HomeIcon, Settings } from 'lucide-react';


// export const Sidebar = () => {
//   return (
//     <div className="w-72 bg-white border-r border-gray-200 fixed h-screen left-0 top-0 flex flex-col shadow-lg overflow-y-auto">
//       {/* Logo Section */}
//       <div className="p-6  flex items-center gap-3">
//         <div className="relative w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
       
//         </div>
//         <div>
//           <h1 className="text-lg font-bold text-gray-900">App</h1>
//           <p className="text-xs text-gray-600">Name</p>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <nav className="flex-1 p-4 space-y-1">

        
//         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition duration-200">
//           <HomeIcon className="w-5 h-5 flex-shrink-0" />
//           <span className="text-sm">Dashboard</span>
//         </button>
//         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition duration-200">
//           <BookOpen className="w-5 h-5 flex-shrink-0 text-indigo-600" />
//           <span className="text-sm">Learning</span>
//         </button>
//         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition duration-200">
//           <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
//           <span className="text-sm">Mock Tests</span>
//         </button>

//         <p className="text-xs font-semibold uppercase text-gray-500 px-4 py-3 mt-6 tracking-wider">Analytics</p>
        
//         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition duration-200">
//           <BarChart3 className="w-5 h-5 flex-shrink-0 text-amber-600" />
//           <span className="text-sm">Analytics</span>
//         </button>
//         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition duration-200">
//           <Users className="w-5 h-5 flex-shrink-0 text-purple-600" />
//           <span className="text-sm">Community</span>
//         </button>
//       </nav>

//       {/* Settings & Profile */}
//       <div className="p-4 border-t border-gray-200 space-y-2">
//         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition duration-200">
//           <Settings className="w-5 h-5 flex-shrink-0 text-gray-600" />
//           <span className="text-sm">Settings</span>
//         </button>
        
//         <div className="flex items-center gap-3 px-4 py-3 ">
//           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">AN</div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-semibold text-gray-900">Arjun Nair</p>
//             <p className="text-xs text-gray-500 truncate">arjun@email.com</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };