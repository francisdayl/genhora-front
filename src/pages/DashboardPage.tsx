import { useScheduleStore } from '@/store/scheduleStore';
import { Sidebar } from '@/components/Sidebar';
import { WorkflowProgress } from '@/components/WorkflowProgress';
import { ChooseSubjects } from '@/components/workflows/ChooseSubjects';
import { ChooseParallels } from '@/components/workflows/ChooseParallels';
import { SetPreferences } from '@/components/workflows/SetPreferences';
import { DownloadSchedules } from '@/components/workflows/DownloadSchedules';

const Index = () => {
  const { currentStep } = useScheduleStore();

  const renderCurrentWorkflow = () => {
    switch (currentStep) {
      case 'choose-subjects':
        return <ChooseSubjects />;
      case 'choose-parallels':
        return <ChooseParallels />;
      case 'preferences':
        return <SetPreferences />;
      case 'download':
        return <DownloadSchedules />;
      default:
        return <ChooseSubjects />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <WorkflowProgress />
        {renderCurrentWorkflow()}
      </div>
    </div>
  );
};

export default Index;
