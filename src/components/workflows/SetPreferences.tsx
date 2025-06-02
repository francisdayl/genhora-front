import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useScheduleStore } from '@/store/scheduleStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const preferencesSchema = z.object({
  startTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Por favor ingrese el tiempo en formato HH:MM'
    ),
  endTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Por favor ingrese el tiempo en formato HH:MM'
    ),
  maxSubjectsPerDay: z
    .number()
    .min(2, 'Minimo 2 materias por dia')
    .max(10, 'Maximo 6 materias por dia'),
});

type PreferencesForm = z.infer<typeof preferencesSchema>;

export const SetPreferences = () => {
  const { selectedSubjects, setPreferences, setCurrentStep } =
    useScheduleStore();
  const maxPossibleSubjects = selectedSubjects.length;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<PreferencesForm>({
    resolver: zodResolver(preferencesSchema),
    mode: 'onChange',
    defaultValues: {
      startTime: '07:00',
      endTime: '19:00',
      maxSubjectsPerDay: Math.min(6, maxPossibleSubjects),
    },
  });

  const watchedMaxSubjects = watch('maxSubjectsPerDay');

  const onSubmit = (data: PreferencesForm) => {
    setPreferences({
      startTime: data.startTime,
      endTime: data.endTime,
      maxSubjectsPerDay: data.maxSubjectsPerDay,
    });
    setCurrentStep('download');
  };

  const generateSubjectOptions = () => {
    const options = [];
    for (let i = 2; i <= Math.min(maxPossibleSubjects, 10); i++) {
      options.push(i);
    }
    return options;
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Elija sus preferencias
        </h1>
        <p className="text-gray-600 mb-8">
          Elija sus preferencias para la generación de horarios.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Time */}
            <div className="space-y-2">
              <Label htmlFor="startTime">Hora de Entrada</Label>
              <Input
                id="startTime"
                type="time"
                {...register('startTime')}
                className={errors.startTime ? 'border-red-500' : ''}
              />
              {errors.startTime && (
                <p className="text-sm text-red-600">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <Label htmlFor="endTime">Hora de Salida</Label>
              <Input
                id="endTime"
                type="time"
                {...register('endTime')}
                className={errors.endTime ? 'border-red-500' : ''}
              />
              {errors.endTime && (
                <p className="text-sm text-red-600">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          {/* Max Subjects Per Day */}
          <div className="space-y-2">
            <Label htmlFor="maxSubjectsPerDay">
              Cantidad maxima de materias por dia
            </Label>
            <Select
              value={watchedMaxSubjects?.toString()}
              onValueChange={(value) =>
                setValue('maxSubjectsPerDay', parseInt(value))
              }
            >
              <SelectTrigger
                className={errors.maxSubjectsPerDay ? 'border-red-500' : ''}
              >
                <SelectValue placeholder="Select maximum subjects per day" />
              </SelectTrigger>
              <SelectContent>
                {generateSubjectOptions().map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} materias
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.maxSubjectsPerDay && (
              <p className="text-sm text-red-600">
                {errors.maxSubjectsPerDay.message}
              </p>
            )}
            <p className="text-sm text-gray-500">
              Has elejido {maxPossibleSubjects} materias
            </p>
          </div>

          <Button
            type="submit"
            disabled={!isValid}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            Generar Horarios
          </Button>
        </form>
      </div>
    </div>
  );
};
