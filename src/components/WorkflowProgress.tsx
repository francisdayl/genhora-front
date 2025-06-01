import { useScheduleStore } from '@/store/scheduleStore';

const steps = [
  { id: 'choose-subjects', label: 'Choose Subjects' },
  { id: 'choose-parallels', label: 'Choose Parallels' },
  { id: 'preferences', label: 'Set Preferences' },
  { id: 'download', label: 'Download Schedules' },
];

export const WorkflowProgress = () => {
  const { currentStep, selectedSubjects, preferences, setCurrentStep } =
    useScheduleStore();

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  const canNavigateToStep = (stepIndex: number, stepId: string) => {
    // Always allow going back to previous steps
    if (stepIndex < currentStepIndex) {
      return true;
    }

    // Allow current step
    if (stepIndex === currentStepIndex) {
      return false; // No need to click current step
    }

    // For forward navigation, check if prerequisites are met
    switch (stepId) {
      case 'choose-parallels':
        return selectedSubjects.length > 0;
      case 'preferences':
        return (
          selectedSubjects.length > 0 &&
          selectedSubjects.some((s) => s.parallels.length > 0)
        );
      case 'download':
        return (
          selectedSubjects.length > 0 &&
          selectedSubjects.some((s) => s.parallels.length > 0) &&
          preferences !== null
        );
      default:
        return true;
    }
  };

  const handleStepClick = (stepId: string, stepIndex: number) => {
    if (canNavigateToStep(stepIndex, stepId)) {
      setCurrentStep(stepId as any);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isClickable = canNavigateToStep(index, step.id);
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center">
                <button
                  onClick={() => handleStepClick(step.id, index)}
                  disabled={!isClickable && !isCurrent}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    index <= currentStepIndex
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  } ${
                    isClickable && !isCurrent
                      ? 'hover:bg-blue-600 cursor-pointer'
                      : isCurrent
                        ? 'cursor-default'
                        : 'cursor-not-allowed opacity-50'
                  }`}
                >
                  {index + 1}
                </button>
                <button
                  onClick={() => handleStepClick(step.id, index)}
                  disabled={!isClickable && !isCurrent}
                  className={`ml-2 text-sm font-medium transition-colors ${
                    index <= currentStepIndex
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  } ${
                    isClickable && !isCurrent
                      ? 'hover:text-blue-700 cursor-pointer'
                      : isCurrent
                        ? 'cursor-default'
                        : 'cursor-not-allowed'
                  }`}
                >
                  {step.label}
                </button>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 ${
                    index < currentStepIndex ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
