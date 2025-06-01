import { useState } from 'react';
import { useScheduleStore } from '@/store/scheduleStore';
import { useParallels } from '@/hooks/useParallels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Circle } from 'lucide-react';

export const ChooseParallels = () => {
  const { selectedSubjects, addParallel, setCurrentStep } = useScheduleStore();
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const currentSubject = selectedSubjects[selectedSubjectIndex];
  const { data: parallels = [] } = useParallels(currentSubject?.code || '');

  const filteredParallels = parallels.filter(
    (parallel) =>
      !currentSubject?.parallels.includes(parallel) &&
      parallel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleParallelSelect = (parallel: string) => {
    if (currentSubject) {
      addParallel(currentSubject.code, parallel);
      setSearchTerm('');
      setShowDropdown(false);
    }
  };

  const handleNext = () => {
    setCurrentStep('preferences');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredParallels.length > 0) {
      handleParallelSelect(filteredParallels[0]);
    }
  };

  if (selectedSubjects.length === 0) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            No Subjects Selected
          </h1>
          <p className="text-gray-600">
            Please go back and select some subjects first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Parallels
        </h1>
        <p className="text-gray-600 mb-8">
          Select parallels for each subject. Click on a subject to add its
          parallels.
        </p>

        {/* Subject Selection */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {selectedSubjects.map((subject, index) => (
            <button
              key={subject.code}
              onClick={() => setSelectedSubjectIndex(index)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors whitespace-nowrap ${
                index === selectedSubjectIndex
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {subject.parallels.length > 0 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
              <div className="text-left">
                <div className="font-medium">{subject.code}</div>
                <div className="text-xs text-gray-500">
                  {subject.parallels.length} parallel
                  {subject.parallels.length !== 1 ? 's' : ''}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Parallel Search and Selection */}
        {currentSubject && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Add parallels for {currentSubject.code}
            </h2>

            <div className="relative">
              <Input
                type="text"
                placeholder="Search parallels..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onKeyPress={handleKeyPress}
                className="w-full max-w-md"
              />

              {showDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-10 max-w-md">
                  {filteredParallels.length > 0 ? (
                    filteredParallels.map((parallel) => (
                      <button
                        key={parallel}
                        onClick={() => handleParallelSelect(parallel)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-gray-900">
                          {parallel}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      {searchTerm
                        ? 'No parallels found'
                        : 'Start typing to search'}
                    </div>
                  )}
                </div>
              )}
            </div>

            {currentSubject.parallels.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Selected parallels:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentSubject.parallels.map((parallel) => (
                    <span
                      key={parallel}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {parallel}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium"
        >
          Set Preferences
        </Button>
      </div>
    </div>
  );
};
