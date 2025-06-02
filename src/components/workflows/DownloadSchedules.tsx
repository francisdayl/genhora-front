import { useState } from 'react';
import { useScheduleStore } from '@/store/scheduleStore';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { GenHoraPayload } from '@/types';
import { downloadSchedules } from '@/api/schedules';
import { useToast } from '@/hooks/use-toast';

export const DownloadSchedules = () => {
  const { selectedSubjects, preferences, reset } = useScheduleStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!preferences) return;

    setIsDownloading(true);

    try {
      const payload: GenHoraPayload = {
        filtros: {
          INICIO: preferences.startTime,
          FIN: preferences.endTime,
          MAXIMO_MATERIAS_DIA: preferences.maxSubjectsPerDay,
          ESPERA: '00:00', // Default wait time
        },
        materias: selectedSubjects.reduce(
          (acc, subject) => {
            if (subject.parallels.length > 0) {
              acc[subject.code] = subject.parallels;
            }
            return acc;
          },
          {} as Record<string, string[]>
        ),
      };

      const response = await downloadSchedules(payload);
      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schedules.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Show success toast
      toast({
        title: 'Schedules downloaded successfully!',
        description:
          'Your schedule file has been saved to your downloads folder.',
      });
    } catch (error: any) {
      // Show error toast
      toast({
        title: 'Failed to download schedules',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleStartOver = () => {
    reset();
  };

  const subjectsWithParallels = selectedSubjects.filter(
    (s) => s.parallels.length > 0
  );

  return (
    <div className="flex-1 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Descargar Horarios
        </h1>
        <p className="text-gray-600 mb-8">
          En base a tus preferencias se generaran todos los posibles horarios.
        </p>

        {/* Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Resumen para la planificación de horarios:
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total de Materias:</span>
              <span className="font-medium">{selectedSubjects.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Horario de clases:</span>
              <span className="font-medium">
                {preferences?.startTime} - {preferences?.endTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Maxima cantidad de materias por dia:
              </span>
              <span className="font-medium">
                {preferences?.maxSubjectsPerDay}
              </span>
            </div>
          </div>

          {subjectsWithParallels.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Materias elegidas con sus paralelos:
              </h3>
              <div className="space-y-1">
                {subjectsWithParallels.map((subject) => (
                  <div key={subject.code} className="text-sm text-gray-600">
                    <strong>{subject.code}:</strong>{' '}
                    {subject.parallels.join(', ')}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleDownload}
            disabled={isDownloading || subjectsWithParallels.length === 0}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            {isDownloading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generando Horarios...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Descargar Horarios
              </>
            )}
          </Button>

          {subjectsWithParallels.length === 0 && (
            <p className="text-sm text-orange-600 text-center">
              No hay materias con paralelos. Regrese y complete la informacion.
            </p>
          )}

          <Button
            onClick={handleStartOver}
            variant="outline"
            className="w-full py-3 rounded-lg font-medium"
          >
            Volver a empezar
          </Button>
        </div>
      </div>
    </div>
  );
};
