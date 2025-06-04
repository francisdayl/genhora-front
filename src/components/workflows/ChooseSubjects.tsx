import { useState } from 'react';
import { useScheduleStore } from '@/store/scheduleStore';
import { useSubjects } from '../../hooks/useSubjects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Subject } from '../../types';

export const ChooseSubjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { selectedSubjects, addSubject, setCurrentStep } = useScheduleStore();
  const { data: subjects = [], isLoading } = useSubjects();

  const filteredSubjects = subjects.filter(
    (subject) =>
      !selectedSubjects.some((selected) => selected.code === subject.code) &&
      (subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubjectSelect = (subject: Subject) => {
    addSubject(subject);
    setSearchTerm('');
    setShowDropdown(false);
  };

  const handleNext = () => {
    if (selectedSubjects.length > 0) {
      setCurrentStep('choose-parallels');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredSubjects.length > 0) {
      handleSubjectSelect(filteredSubjects[0]);
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Agregar Materias
        </h1>
        <p className="text-gray-600 mb-8">
          Busque y elija las materias con las que desea armar su horario
        </p>

        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Escriba la materia por nombre o codigo"
            data-testid="subject-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onKeyPress={handleKeyPress}
            className="w-full"
          />

          {showDropdown && searchTerm && (
            <div
              data-testid="subjects-result-container"
              className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-10"
            >
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">Cargando...</div>
              ) : filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => (
                  <button
                    key={subject.code}
                    data-testclass="subject-item"
                    onClick={() => handleSubjectSelect(subject)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900">
                      {subject.code}
                    </div>
                    <div className="text-sm text-gray-600">{subject.name}</div>
                  </button>
                ))
              ) : (
                <div
                  data-testid="subjects-not-found"
                  className="p-4 text-center text-gray-500"
                >
                  No se encontraron materias
                </div>
              )}
            </div>
          )}
        </div>

        <Button
          onClick={handleNext}
          disabled={selectedSubjects.length === 0}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium"
        >
          Agregar Paralelos
        </Button>
      </div>
    </div>
  );
};
