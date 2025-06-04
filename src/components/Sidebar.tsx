import { useState } from 'react';
import { useScheduleStore } from '@/store/scheduleStore';
import { ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Sidebar = () => {
  const { selectedSubjects, removeSubject, removeParallel } =
    useScheduleStore();
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(
    new Set()
  );

  const toggleExpanded = (code: string) => {
    const newExpanded = new Set(expandedSubjects);
    if (newExpanded.has(code)) {
      newExpanded.delete(code);
    } else {
      newExpanded.add(code);
    }
    setExpandedSubjects(newExpanded);
  };

  if (selectedSubjects.length === 0) {
    return (
      <div className="w-80 bg-gray-50 border-r border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Materias</h2>
        <p className="text-sm text-gray-500">No hay materias agregadas</p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Materias</h2>

      <div data-testid="sidebar-items-container" className="space-y-2">
        {selectedSubjects.map((subject) => {
          const isExpanded = expandedSubjects.has(subject.code);

          return (
            <div
              key={subject.code}
              className="bg-white rounded-lg border border-gray-200"
            >
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleExpanded(subject.code)}
                    className="flex items-center text-left min-w-0 flex-1 mr-2"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 truncate">
                        {subject.code}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {subject.name}
                      </div>
                    </div>
                  </button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSubject(subject.code)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {isExpanded && subject.parallels.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="space-y-2">
                      {subject.parallels.map((parallel) => (
                        <div
                          key={parallel}
                          className="flex items-center justify-between py-1 px-2 bg-gray-50 rounded text-sm"
                        >
                          <span className="text-gray-700">{parallel}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              removeParallel(subject.code, parallel)
                            }
                            className="text-red-500 hover:text-red-700 hover:bg-red-100 h-6 w-6 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
