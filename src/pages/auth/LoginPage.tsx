import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/authStore';
import { UserData } from '@/types';

// Zod schema
const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email')
    .endsWith('espol.edu.ec', 'Invalid email')
    .max(30, 'Invalid email')
    .refine(
      (email) => {
        const username = email.split('@')[0];
        return /^[a-zA-Z]{5,15}$/.test(username);
      },
      {
        message: 'Invalid email',
      }
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const saveUser = useAuthStore((state) => state.saveUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const timestampInSeconds = Math.floor(tomorrow.getTime() / 1000);
    const userData: UserData = {
      email: data.email,
      exp: timestampInSeconds,
      generations: 0,
    };
    saveUser(userData);
    navigate('/');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 space-y-4 p-6 border rounded-xl shadow-md bg-white"
    >
      <h2 className="text-2xl font-semibold text-center">Login</h2>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          data-testid="email-input"
          {...register('email')}
          className="w-full mt-1 p-2 border rounded-md"
        />
        {errors.email && (
          <p data-testid="email-error" className="text-red-500 text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        data-testid="login-button"
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
}
