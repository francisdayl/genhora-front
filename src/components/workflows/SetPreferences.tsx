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
      'Please enter time in HH:MM format'
    ),
  endTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Please enter time in HH:MM format'
    ),
  maxSubjectsPerDay: z
    .number()
    .min(2, 'Minimum 2 subjects per day')
    .max(10, 'Maximum 10 subjects per day'),
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
          Set Your Preferences
        </h1>
        <p className="text-gray-600 mb-8">
          Configure your schedule preferences to generate the best possible
          schedules.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Time */}
            <div className="space-y-2">
              <Label htmlFor="startTime">Entry Time</Label>
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
              <Label htmlFor="endTime">Exit Time</Label>
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
            <Label htmlFor="maxSubjectsPerDay">Maximum Subjects Per Day</Label>
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
                    {num} subjects
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
              You have {maxPossibleSubjects} subjects selected
            </p>
          </div>

          <Button
            type="submit"
            disabled={!isValid}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            Generate Schedules
          </Button>
        </form>
      </div>
    </div>
  );
};
