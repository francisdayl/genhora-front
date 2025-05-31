// import React, { useState, useMemo } from 'react';
// import { Search, Plus, Trash2, Check, Clock, Download, ChevronDown, ChevronRight } from 'lucide-react';

// // Mock data for subjects and parallels
// const mockSubjects = [
//   'Mathematics',
//   'Physics',
//   'Chemistry',
//   'Biology',
//   'Computer Science',
//   'English Literature',
//   'History',
//   'Geography',
//   'Economics',
//   'Psychology',
//   'Philosophy',
//   'Art History',
//   'Music Theory',
//   'Statistics',
//   'Calculus',
//   'Linear Algebra',
//   'Organic Chemistry',
//   'Molecular Biology',
//   'Data Structures',
//   'Algorithms'
// ];

// const mockParallels = {
//   'Mathematics': ['Math-A (Mon/Wed 9:00-11:00)', 'Math-B (Tue/Thu 14:00-16:00)', 'Math-C (Fri 10:00-13:00)'],
//   'Physics': ['Physics-A (Mon/Wed 14:00-16:00)', 'Physics-B (Tue/Thu 9:00-11:00)'],
//   'Chemistry': ['Chem-A (Mon/Fri 11:00-13:00)', 'Chem-B (Wed/Thu 16:00-18:00)'],
//   'Biology': ['Bio-A (Tue/Thu 11:00-13:00)', 'Bio-B (Mon/Wed 16:00-18:00)'],
//   'Computer Science': ['CS-A (Mon/Wed/Fri 8:00-9:30)', 'CS-B (Tue/Thu 13:00-14:30)', 'CS-C (Sat 9:00-12:00)']
// };

// // Generate mock parallels for other subjects
// Object.keys(mockSubjects).forEach(key => {
//   const subject = mockSubjects[key];
//   if (!mockParallels[subject]) {
//     mockParallels[subject] = [
//       `${subject.split(' ')[0]}-A (Mon/Wed 9:00-11:00)`,
//       `${subject.split(' ')[0]}-B (Tue/Thu 14:00-16:00)`
//     ];
//   }
// });

// const App = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [subjectParallels, setSubjectParallels] = useState({});
//   const [collapsedSubjects, setCollapsedSubjects] = useState({});
//   const [searchQuery, setSearchQuery] = useState('');
//   const [parallelSearchQuery, setParallelSearchQuery] = useState('');
//   const [selectedSubjectForParallel, setSelectedSubjectForParallel] = useState('');
//   const [preferences, setPreferences] = useState({
//     entryTime: '',
//     exitTime: '',
//     maxSubjectsPerDay: 3
//   });
//   const [generatedSchedules, setGeneratedSchedules] = useState([]);

//   // Filtered subjects for search
//   const filteredSubjects = useMemo(() => {
//     if (!searchQuery) return [];
//     return mockSubjects.filter(subject =>
//       subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       !selectedSubjects.includes(subject)
//     ).slice(0, 5);
//   }, [searchQuery, selectedSubjects]);

//   // Filtered parallels for search
//   const filteredParallels = useMemo(() => {
//     if (!parallelSearchQuery || !selectedSubjectForParallel) return [];
//     const parallels = mockParallels[selectedSubjectForParallel] || [];
//     return parallels.filter(parallel =>
//       parallel.toLowerCase().includes(parallelSearchQuery.toLowerCase()) &&
//       !(subjectParallels[selectedSubjectForParallel] || []).includes(parallel)
//     ).slice(0, 5);
//   }, [parallelSearchQuery, selectedSubjectForParallel, subjectParallels]);

//   const addSubject = (subject) => {
//     if (!selectedSubjects.includes(subject)) {
//       setSelectedSubjects([...selectedSubjects, subject]);
//       setSearchQuery('');
//     }
//   };

//   const removeParallel = (subject, parallel) => {
//     const currentParallels = subjectParallels[subject] || [];
//     const updatedParallels = currentParallels.filter(p => p !== parallel);
//     setSubjectParallels({
//       ...subjectParallels,
//       [subject]: updatedParallels
//     });
//   };

//   const addParallel = (parallel) => {
//     if (selectedSubjectForParallel && parallel) {
//       const currentParallels = subjectParallels[selectedSubjectForParallel] || [];
//       if (!currentParallels.includes(parallel)) {
//         setSubjectParallels({
//           ...subjectParallels,
//           [selectedSubjectForParallel]: [...currentParallels, parallel]
//         });
//         setParallelSearchQuery('');
//       }
//     }
//   };

//   const toggleSubjectCollapse = (subject) => {
//     setCollapsedSubjects({
//       ...collapsedSubjects,
//       [subject]: !collapsedSubjects[subject]
//     });
//   };

//   const generateSchedules = () => {
//     // Mock schedule generation
//     const schedules = [
//       { id: 1, name: 'Schedule Option 1', subjects: selectedSubjects.slice(0, 3) },
//       { id: 2, name: 'Schedule Option 2', subjects: selectedSubjects.slice(1, 4) },
//       { id: 3, name: 'Schedule Option 3', subjects: selectedSubjects.slice(0, 2) }
//     ];
//     setGeneratedSchedules(schedules);
//     setCurrentStep(4);
//   };

//   const canProceedToParallels = selectedSubjects.length > 0;
//   const canProceedToPreferences = selectedSubjects.every(subject =>
//     subjectParallels[subject] && subjectParallels[subject].length > 0
//   );
//   const canGenerateSchedules = preferences.entryTime && preferences.exitTime && preferences.maxSubjectsPerDay;

//   const steps = [
//     { number: 1, title: 'Choose Subjects', active: currentStep === 1 },
//     { number: 2, title: 'Choose Parallels', active: currentStep === 2 },
//     { number: 3, title: 'Set Preferences', active: currentStep === 3 },
//     { number: 4, title: 'Download Schedules', active: currentStep === 4 }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <div className="w-80 bg-white shadow-lg p-6 overflow-y-auto">
//         <h2 className="text-xl font-bold text-gray-800 mb-6">Subjects</h2>

//         {selectedSubjects.length === 0 ? (
//           <p className="text-gray-500 text-sm">No subjects selected yet</p>
//         ) : (
//           <div className="space-y-3">
//             {selectedSubjects.map((subject) => (
//               <div key={subject} className="border border-gray-200 rounded-lg overflow-hidden">
//                 <div
//                   className="p-3 bg-gray-50 cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors"
//                   onClick={() => toggleSubjectCollapse(subject)}
//                 >
//                   <span className="font-medium text-gray-800">{subject}</span>
//                   <div className="flex items-center gap-2">
//                     {(subjectParallels[subject] || []).length > 0 && (
//                       <Check className="w-4 h-4 text-green-500" />
//                     )}
//                     {collapsedSubjects[subject] ? (
//                       <ChevronRight className="w-4 h-4 text-gray-600" />
//                     ) : (
//                       <ChevronDown className="w-4 h-4 text-gray-600" />
//                     )}
//                   </div>
//                 </div>

//                 {!collapsedSubjects[subject] && (
//                   <div className="p-3 space-y-2">
//                     {(subjectParallels[subject] || []).length === 0 ? (
//                       <p className="text-sm text-gray-500">No parallels added</p>
//                     ) : (
//                       subjectParallels[subject].map((parallel) => (
//                         <div key={parallel} className="flex items-center justify-between p-2 bg-blue-50 rounded text-sm">
//                           <span className="text-gray-700">{parallel}</span>
//                           <button
//                             onClick={() => removeParallel(subject, parallel)}
//                             className="text-red-500 hover:text-red-700 transition-colors"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {/* Workflow Progress */}
//         <div className="mb-8">
//           <div className="flex items-center justify-center mb-4">
//             {steps.map((step, index) => (
//               <div key={step.number} className="flex items-center">
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
//                   step.active ? 'bg-blue-500 text-white' :
//                   currentStep > step.number ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
//                 }`}>
//                   {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`w-16 h-1 mx-2 ${
//                     currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//           <h1 className="text-2xl font-bold text-center text-gray-800">
//             {steps.find(s => s.active)?.title}
//           </h1>
//         </div>

//         {/* Step Content */}
//         <div className="max-w-2xl mx-auto">
//           {currentStep === 1 && (
//             <div className="space-y-6">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Write your subject"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   onKeyPress={(e) => {
//                     if (e.key === 'Enter' && filteredSubjects.length > 0) {
//                       addSubject(filteredSubjects[0]);
//                     }
//                   }}
//                 />
//               </div>

//               {filteredSubjects.length > 0 && (
//                 <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
//                   {filteredSubjects.map((subject) => (
//                     <button
//                       key={subject}
//                       onClick={() => addSubject(subject)}
//                       className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
//                     >
//                       {subject}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               <button
//                 onClick={() => setCurrentStep(2)}
//                 disabled={!canProceedToParallels}
//                 className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
//               >
//                 Add Parallels
//               </button>
//             </div>
//           )}

//           {currentStep === 2 && (
//             <div className="space-y-6">
//               <div className="flex flex-wrap gap-4 justify-center">
//                 {selectedSubjects.map((subject) => (
//                   <button
//                     key={subject}
//                     onClick={() => setSelectedSubjectForParallel(subject)}
//                     className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 transition-all ${
//                       selectedSubjectForParallel === subject
//                         ? 'border-blue-500 bg-blue-50 text-blue-700'
//                         : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
//                     }`}
//                   >
//                     <span>{subject}</span>
//                     {(subjectParallels[subject] || []).length > 0 && (
//                       <Check className="w-4 h-4 text-green-500" />
//                     )}
//                   </button>
//                 ))}
//               </div>

//               {selectedSubjectForParallel && (
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-medium text-gray-800 text-center">
//                     Add parallels for {selectedSubjectForParallel}
//                   </h3>

//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       placeholder="Search parallels..."
//                       value={parallelSearchQuery}
//                       onChange={(e) => setParallelSearchQuery(e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       onKeyPress={(e) => {
//                         if (e.key === 'Enter' && filteredParallels.length > 0) {
//                           addParallel(filteredParallels[0]);
//                         }
//                       }}
//                     />
//                   </div>

//                   {filteredParallels.length > 0 && (
//                     <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
//                       {filteredParallels.map((parallel) => (
//                         <button
//                           key={parallel}
//                           onClick={() => addParallel(parallel)}
//                           className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
//                         >
//                           {parallel}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}

//               <button
//                 onClick={() => setCurrentStep(3)}
//                 disabled={!canProceedToPreferences}
//                 className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
//               >
//                 Set Preferences
//               </button>
//             </div>
//           )}

//           {currentStep === 3 && (
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Entry Time
//                   </label>
//                   <div className="relative">
//                     <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="time"
//                       value={preferences.entryTime}
//                       onChange={(e) => setPreferences({...preferences, entryTime: e.target.value})}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Exit Time
//                   </label>
//                   <div className="relative">
//                     <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="time"
//                       value={preferences.exitTime}
//                       onChange={(e) => setPreferences({...preferences, exitTime: e.target.value})}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Max Subjects Per Day
//                 </label>
//                 <select
//                   value={preferences.maxSubjectsPerDay}
//                   onChange={(e) => setPreferences({...preferences, maxSubjectsPerDay: parseInt(e.target.value)})}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   {Array.from({length: selectedSubjects.length - 1}, (_, i) => i + 2).map(num => (
//                     <option key={num} value={num}>{num}</option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 onClick={generateSchedules}
//                 disabled={!canGenerateSchedules}
//                 className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
//               >
//                 Generate Schedules
//               </button>
//             </div>
//           )}

//           {currentStep === 4 && (
//             <div className="text-center space-y-6">
//               <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//                 <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-green-800 mb-2">
//                   Schedules Generated Successfully!
//                 </h3>
//                 <p className="text-green-600">
//                   {generatedSchedules.length} schedule options have been created based on your preferences.
//                 </p>
//               </div>

//               <button
//                 onClick={() => {
//                   // Mock download functionality
//                   const dataStr = JSON.stringify(generatedSchedules, null, 2);
//                   const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
//                   const exportFileDefaultName = 'schedules.json';
//                   const linkElement = document.createElement('a');
//                   linkElement.setAttribute('href', dataUri);
//                   linkElement.setAttribute('download', exportFileDefaultName);
//                   linkElement.click();
//                 }}
//                 className="inline-flex items-center gap-2 bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors"
//               >
//                 <Download className="w-5 h-5" />
//                 Download Schedules
//               </button>

//               <button
//                 onClick={() => {
//                   setCurrentStep(1);
//                   setSelectedSubjects([]);
//                   setSubjectParallels({});
//                   setPreferences({ entryTime: '', exitTime: '', maxSubjectsPerDay: 3 });
//                   setGeneratedSchedules([]);
//                 }}
//                 className="block w-full text-gray-600 hover:text-gray-800 transition-colors"
//               >
//                 Start Over
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
