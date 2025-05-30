import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { loginUser } from '../../api/auth';
import { useAuthStore } from '@/store/authStore';

// Zod schema
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
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
    const response = await loginUser(data);
    if (!response.error) {
      saveUser(response);
      console.log('Login successful:', response);
      navigate('/dashboard');
      console.log('navigating to dashboard');
    }
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
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <div className="relative">
          <input
            data-testid="password-input"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className="w-full mt-1 p-2 border rounded-md pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-2.5 text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        data-testid="login-button"
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
      >
        Login
      </button>
      <p className="text-center text-sm">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
