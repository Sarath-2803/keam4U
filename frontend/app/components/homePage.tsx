// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { CheckCircle, BookOpen, Zap, TrendingUp, Lock, BarChart3 } from 'lucide-react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Sidebar } from './Sidebar_';

// gsap.registerPlugin(ScrollTrigger);

// export const HomePage = () => { 
//   const [userName] = useState('XXXXXX XXXXX');
//   const [completionPercentage] = useState(64);
//   const [dailyGoal] = useState(70);
  
//   // Refs for animations
//   const statsCardsRef = useRef([]);
//   const counterRefs = useRef({
//     dailyGoal: null,
//     questions: null,
//     accuracy: null,
//   });
//   const progressBarsRef = useRef([]);
//   const mockTestCardsRef = useRef([]);
//   const learningCardRef = useRef(null);
//   const updatesRef = useRef([]);
//   const activityCardsRef = useRef([]);

//   useEffect(() => {
//     // Wait for next frame to ensure DOM is fully rendered
//     const animationTimeout = setTimeout(() => {
//       // 1. Stats Cards - Fade in + Scale up with stagger
//       const validStatsCards = statsCardsRef.current.filter(el => el !== null);
//       if (validStatsCards.length > 0) {
//         gsap.from(validStatsCards, {
//           opacity: 0,
//           scale: 0.8,
//           y: 30,
//           duration: 0.8,
//           stagger: 0.15,
//           ease: 'back.out',
//         });
//       }

//       // 2. Counter Animations
//       const counters = [
//         { ref: counterRefs.current.dailyGoal, target: 70, suffix: '%' },
//         { ref: counterRefs.current.questions, target: 1248, suffix: '' },
//         { ref: counterRefs.current.accuracy, target: 86.4, suffix: '%' },
//       ];

//       counters.forEach(({ ref, target, suffix }) => {
//         if (ref) {
//           gsap.to(ref, {
//             textContent: target,
//             duration: 2,
//             ease: 'power2.out',
//             snap: { textContent: 1 },
//             onUpdate: function () {
//               const value = Math.ceil(this.targets()[0].textContent);
//               ref.textContent = value + suffix;
//             },
//           });
//         }
//       });

//       // 3. Progress Bars - Animate from 0% to full width
//       const validProgressBars = progressBarsRef.current.filter(el => el !== null);
//       if (validProgressBars.length > 0) {
//         gsap.from(validProgressBars, {
//           width: '0%',
//           duration: 1.5,
//           ease: 'power2.out',
//           stagger: 0.2,
//         });
//       }

//       // 4. Learning Card - Fade in + Slide up
//       if (learningCardRef.current) {
//         gsap.from(learningCardRef.current, {
//           opacity: 0,
//           y: 50,
//           duration: 1,
//           ease: 'power2.out',
//           delay: 0.3,
//         });
//       }

//       // 5. Updates Cards - Fade in with stagger
//       const validUpdates = updatesRef.current.filter(el => el !== null);
//       if (validUpdates.length > 0) {
//         gsap.from(validUpdates, {
//           opacity: 0,
//           x: -20,
//           duration: 0.7,
//           stagger: 0.1,
//           ease: 'power2.out',
//           delay: 0.3,
//         });
//       }

//       // 6. Activity Cards - Fade in from bottom
//       const validActivityCards = activityCardsRef.current.filter(el => el !== null);
//       if (validActivityCards.length > 0) {
//         gsap.from(validActivityCards, {
//           opacity: 0,
//           y: 30,
//           duration: 0.8,
//           stagger: 0.1,
//           ease: 'back.out',
//           delay: 0.5,
//         });
//       }

//       // 7. Mock Test Cards - Slide in from bottom with rotation
//       const validMockTestCards = mockTestCardsRef.current.filter(el => el !== null);
//       if (validMockTestCards.length > 0) {
//         gsap.from(validMockTestCards, {
//           opacity: 0,
//           y: 60,
//           rotationZ: -5,
//           duration: 0.9,
//           stagger: 0.15,
//           ease: 'back.out',
//           delay: 0.4,
//         });
//       }

//       // 8. Hover Effects on Cards
//       const allCards = document.querySelectorAll('.hover-card');
//       allCards.forEach((card) => {
//         card.addEventListener('mouseenter', () => {
//           gsap.to(card, {
//             scale: 1.05,
//             boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
//             duration: 0.3,
//             ease: 'power2.out',
//           });
//         });

//         card.addEventListener('mouseleave', () => {
//           gsap.to(card, {
//             scale: 1,
//             boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//             duration: 0.3,
//             ease: 'power2.out',
//           });
//         });
//       });

//       // 9. Hover Effects on Buttons
//       const allButtons = document.querySelectorAll('.hover-button');
//       allButtons.forEach((button) => {
//         button.addEventListener('mouseenter', () => {
//           gsap.to(button, {
//             scale: 1.08,
//             duration: 0.2,
//             ease: 'power2.out',
//           });
//         });

//         button.addEventListener('mouseleave', () => {
//           gsap.to(button, {
//             scale: 1,
//             duration: 0.2,
//             ease: 'power2.out',
//           });
//         });
//       });

//       // 10. Scroll Animations - Activity and Performance sections
//       const observerOptions = {
//         threshold: 0.1,
//       };

//       const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             gsap.to(entry.target, {
//               opacity: 1,
//               y: 0,
//               duration: 0.8,
//               ease: 'power2.out',
//             });
//             observer.unobserve(entry.target);
//           }
//         });
//       }, observerOptions);

//       const scrollElements = document.querySelectorAll('.scroll-animate');
//       scrollElements.forEach((el) => {
//         gsap.set(el, { opacity: 0, y: 30 });
//         observer.observe(el);
//       });

//       // Clean up scroll observer on unmount
//       return () => {
//         observer.disconnect();
//         allCards.forEach(card => {
//           card.removeEventListener('mouseenter', null);
//           card.removeEventListener('mouseleave', null);
//         });
//         allButtons.forEach(button => {
//           button.removeEventListener('mouseenter', null);
//           button.removeEventListener('mouseleave', null);
//         });
//       };
//     }, 100); // Small delay to ensure DOM is ready

//     // Scroll trigger animations run independently
//     const scrollTriggerTimeout = setTimeout(() => {
//       ScrollTrigger.refresh();
      
//       // Stats cards scale and fade on scroll
//       const validStatsCards = statsCardsRef.current.filter(el => el !== null);
//       if (validStatsCards.length > 0) {
//         gsap.to(validStatsCards, {
//           scrollTrigger: {
//             trigger: '.stats-section',
//             start: 'top 80%',
//             end: 'top 20%',
//             scrub: 0.5,
//             markers: false,
//           },
//           opacity: 1,
//           y: 0,
//           duration: 1,
//         });
//       }

//       // Mock test cards rotate and scale on scroll
//       const validMockTestCards = mockTestCardsRef.current.filter(el => el !== null);
//       validMockTestCards.forEach((card, index) => {
//         gsap.to(card, {
//           scrollTrigger: {
//             trigger: card,
//             start: 'top 85%',
//             end: 'top 50%',
//             scrub: 1,
//             markers: false,
//           },
//           rotationZ: 0,
//           opacity: 1,
//           duration: 1,
//         });
//       });

//       // Learning card parallax effect
//       if (learningCardRef.current) {
//         gsap.to(learningCardRef.current, {
//           scrollTrigger: {
//             trigger: learningCardRef.current,
//             start: 'top 80%',
//             end: 'bottom 60%',
//             scrub: 1,
//             markers: false,
//           },
//           y: -50,
//           opacity: 1,
//           duration: 1,
//         });
//       }

//       // Progress bars animate on scroll trigger
//       const validProgressBars = progressBarsRef.current.filter(el => el !== null);
//       validProgressBars.forEach((bar, index) => {
//         gsap.to(bar, {
//           scrollTrigger: {
//             trigger: bar.parentElement,
//             start: 'top 90%',
//             end: 'top 30%',
//             scrub: 0.5,
//             markers: false,
//           },
//           width: bar.getAttribute('data-width') || '100%',
//           duration: 2,
//           ease: 'power2.out',
//         });
//       });

//       // Section headings animate on scroll
//       const sectionHeadings = document.querySelectorAll('.section-heading');
//       sectionHeadings.forEach((heading) => {
//         gsap.from(heading, {
//           scrollTrigger: {
//             trigger: heading,
//             start: 'top 90%',
//             end: 'top 60%',
//             scrub: 0.5,
//             markers: false,
//           },
//           opacity: 0,
//           x: -50,
//           duration: 0.8,
//         });
//       });
//     }, 150);

//     return () => {
//       clearTimeout(animationTimeout);
//       clearTimeout(scrollTriggerTimeout);
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 ml-72 p-8 overflow-auto bg-gray-50">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-start justify-between mb-6">
//             <div>
//               <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-2">
//                 Welcome back
//               </p>
//               <h1 className="text-4xl font-bold text-gray-900">
//                 {userName}
//               </h1>
//             </div>
//             <div className="w-12 h-12 bg-blue-600 rounded-full"></div>
//           </div>
//           <p className="text-gray-600">
//             Your KEAM preparation journey is <span className="font-semibold text-blue-600">{completionPercentage}%</span> complete. Stay consistent to reach your goal of 900+ score.
//           </p>
//         </div>

//         {/* Top Stats Grid */}
//         <div className="stats-section grid grid-cols-4 gap-6 mb-8">
//           <div 
//             ref={(el) => statsCardsRef.current[0] = el}
//             className="hover-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-sm font-semibold uppercase text-gray-600">Daily Goal</p>
//               <Zap className="w-5 h-5 text-blue-600" />
//             </div>
//             <p 
//               ref={(el) => counterRefs.current.dailyGoal = el}
//               className="text-3xl font-bold text-gray-900"
//             >
//               0%
//             </p>
//             <p className="text-xs text-gray-500 mt-2">4/10 Completed</p>
//           </div>

//           <div 
//             ref={(el) => statsCardsRef.current[1] = el}
//             className="hover-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-sm font-semibold uppercase text-gray-600">Questions</p>
//               <CheckCircle className="w-5 h-5 text-green-600" />
//             </div>
//             <p 
//               ref={(el) => counterRefs.current.questions = el}
//               className="text-3xl font-bold text-gray-900"
//             >
//               0
//             </p>
//             <p className="text-xs text-gray-500 mt-2">Attempted</p>
//           </div>

//           <div 
//             ref={(el) => statsCardsRef.current[2] = el}
//             className="hover-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-sm font-semibold uppercase text-gray-600">Accuracy</p>
//               <TrendingUp className="w-5 h-5 text-blue-600" />
//             </div>
//             <p 
//               ref={(el) => counterRefs.current.accuracy = el}
//               className="text-3xl font-bold text-gray-900"
//             >
//               0%
//             </p>
//             <p className="text-xs text-gray-500 mt-2">Overall</p>
//           </div>

//           <div 
//             ref={(el) => statsCardsRef.current[3] = el}
//             className="hover-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-sm font-semibold uppercase text-gray-600">Rank</p>
//               <BarChart3 className="w-5 h-5 text-amber-600" />
//             </div>
//             <p className="text-3xl font-bold text-gray-900">Top 5%</p>
//             <p className="text-xs text-gray-500 mt-2">Overall ranking</p>
//           </div>
//         </div>

//         {/* Main Two Column Section */}
//         <div className="grid grid-cols-3 gap-6 mb-8">
//           {/* Left Column - Learning */}
//           <div className="col-span-2">
//             <div 
//               ref={learningCardRef}
//               className="hover-card bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100 shadow-sm cursor-pointer"
//             >
//               <div className="flex items-start justify-between mb-6">
//                 <div>
//                   <p className="text-sm font-semibold uppercase text-blue-600 mb-2">Currently Learning</p>
//                   <h3 className="text-2xl font-bold text-gray-900">Electrostatics & Potential</h3>
//                   <p className="text-gray-700 mt-2">Physics • Last studied 2 hours ago</p>
//                 </div>
//                 <BookOpen className="w-8 h-8 text-blue-600" />
//               </div>
//               <p className="text-gray-700 mb-6">Master the concepts of electric fields and potential surfaces with guided practice questions. You've completed 12 out of 25 topics.</p>
//               <div className="mb-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="text-sm font-semibold text-gray-700">Progress</p>
//                   <p className="text-sm text-gray-600">48%</p>
//                 </div>
//                 <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
//                   <div 
//                     ref={(el) => progressBarsRef.current[0] = el}
//                     className="bg-blue-600 h-full rounded-full" 
//                     style={{ width: '48%' }}
//                     data-width="48%"
//                   ></div>
//                 </div>
//               </div>
//               <button className="hover-button w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
//                 Continue Learning
//               </button>
//             </div>
//           </div>

//           {/* Right Column - Announcements */}
//           <div>
//             <h3 className="section-heading text-lg font-bold text-gray-900 mb-4">Latest Updates</h3>
//             <div className="space-y-4">
//               <div 
//                 ref={(el) => updatesRef.current[0] = el}
//                 className="hover-card bg-white rounded-lg p-4 border border-red-100 shadow-sm cursor-pointer"
//               >
//                 <div className="flex gap-3">
//                   <div className="flex-shrink-0 w-3 h-3 bg-red-500 rounded-full mt-1.5"></div>
//                   <div>
//                     <p className="font-semibold text-gray-900 text-sm">Application Extended</p>
//                     <p className="text-xs text-gray-600 mt-1">May 15th deadline</p>
//                   </div>
//                 </div>
//               </div>

//               <div 
//                 ref={(el) => updatesRef.current[1] = el}
//                 className="hover-card bg-white rounded-lg p-4 border border-green-100 shadow-sm cursor-pointer"
//               >
//                 <div className="flex gap-3">
//                   <div className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
//                   <div>
//                     <p className="font-semibold text-gray-900 text-sm">Admit Cards Ready</p>
//                     <p className="text-xs text-gray-600 mt-1">Download now</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Featured Mock Tests */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="section-heading text-lg font-bold text-gray-900">Featured Mock Tests</h3>
//             <button className="hover-button text-blue-600 hover:text-blue-700 font-semibold text-sm">View All →</button>
//           </div>

//           <div className="grid grid-cols-3 gap-6">
//             {/* Mock Test 1 */}
//             <div 
//               ref={(el) => mockTestCardsRef.current[0] = el}
//               className="hover-card bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
//             >
//               <div className="bg-gradient-to-r from-gray-400 to-gray-500 h-40 flex items-center justify-center">
//                 <div className="text-5xl">📝</div>
//               </div>
//               <div className="p-6">
//                 <p className="text-xs font-semibold uppercase text-gray-600 mb-2">100 Questions • 2h 30m</p>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Full-Length KEAM Mock #12</h4>
//                 <button className="hover-button w-full bg-amber-800 hover:bg-amber-900 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
//                   Start Mock Test
//                 </button>
//               </div>
//             </div>

//             {/* Mock Test 2 */}
//             <div 
//               ref={(el) => mockTestCardsRef.current[1] = el}
//               className="hover-card bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
//             >
//               <div className="bg-gradient-to-r from-teal-400 to-teal-600 h-40 flex items-center justify-center">
//                 <div className="text-5xl">🧪</div>
//               </div>
//               <div className="p-6">
//                 <p className="text-xs font-semibold uppercase text-gray-600 mb-2">45 Questions • 40m</p>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Advanced Chemistry Booster</h4>
//                 <button className="hover-button w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
//                   <Lock className="w-4 h-4" />
//                   Unlock Test
//                 </button>
//               </div>
//             </div>

//             {/* Mock Test 3 */}
//             <div 
//               ref={(el) => mockTestCardsRef.current[2] = el}
//               className="hover-card bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
//             >
//               <div className="bg-gradient-to-r from-orange-300 to-red-400 h-40 flex items-center justify-center">
//                 <div className="text-5xl">📊</div>
//               </div>
//               <div className="p-6">
//                 <p className="text-xs font-semibold uppercase text-gray-600 mb-2">60 Questions • 50m</p>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Mathematics Rank File #04</h4>
//                 <button className="hover-button w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
//                   <Lock className="w-4 h-4" />
//                   Unlock Test
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Activity & Performance */}
//         <div className="grid grid-cols-2 gap-6">
//           <div className="scroll-animate hover-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between pb-3 border-b border-gray-100">
//                 <p className="text-sm text-gray-700">Completed Physics Quiz</p>
//                 <p className="text-xs text-gray-500">2 hours ago</p>
//               </div>
//               <div className="flex items-center justify-between pb-3 border-b border-gray-100">
//                 <p className="text-sm text-gray-700">Started Chemistry Chapter</p>
//                 <p className="text-xs text-gray-500">5 hours ago</p>
//               </div>
//               <div className="flex items-center justify-between">
//                 <p className="text-sm text-gray-700">Attempted 15 Math Problems</p>
//                 <p className="text-xs text-gray-500">1 day ago</p>
//               </div>
//             </div>
//           </div>

//           <div className="scroll-animate hover-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer">
//             <h3 className="text-lg font-bold text-gray-900 mb-4">Performance This Week</h3>
//             <div className="space-y-3">
//               <div>
//                 <div className="flex items-center justify-between mb-1">
//                   <p className="text-sm font-medium text-gray-700">Physics</p>
//                   <p className="text-sm font-semibold text-gray-900">89%</p>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     ref={(el) => progressBarsRef.current[1] = el}
//                     className="bg-green-600 h-full rounded-full" 
//                     style={{ width: '89%' }}
//                     data-width="89%"
//                   ></div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex items-center justify-between mb-1">
//                   <p className="text-sm font-medium text-gray-700">Chemistry</p>
//                   <p className="text-sm font-semibold text-gray-900">76%</p>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     ref={(el) => progressBarsRef.current[2] = el}
//                     className="bg-blue-600 h-full rounded-full" 
//                     style={{ width: '76%' }}
//                     data-width="76%"
//                   ></div>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex items-center justify-between mb-1">
//                   <p className="text-sm font-medium text-gray-700">Mathematics</p>
//                   <p className="text-sm font-semibold text-gray-900">82%</p>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     ref={(el) => progressBarsRef.current[3] = el}
//                     className="bg-amber-600 h-full rounded-full" 
//                     style={{ width: '82%' }}
//                     data-width="82%"
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

// };