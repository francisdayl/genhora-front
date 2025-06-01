import { useScheduleStore } from '@/store/scheduleStore';

const steps = [
  { id: 'choose-subjects', label: 'Choose Subjects' },
  { id: 'choose-parallels', label: 'Choose Parallels' },
  { id: 'preferences', label: 'Set Preferences' },
  { id: 'download', label: 'Download Schedules' },
];

export const WorkflowProgress = () => {
  const { currentStep } = useScheduleStore();

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStepIndex
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  index <= currentStepIndex ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 ${
                  index < currentStepIndex ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
