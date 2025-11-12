import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/input';
import { motion } from 'framer-motion';

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  className?: string;
}

export function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder = '••••••••',
  required = false,
  error,
  autoComplete = 'current-password',
  className = '',
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-300">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          className={`bg-zinc-800 border-zinc-700 text-white pr-10 ${
            error ? 'border-red-500 focus-visible:ring-red-500' : ''
          } ${className}`}
        />
        <motion.button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-emerald-400 transition-colors duration-150"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <motion.div
            initial={false}
            animate={{ scale: showPassword ? 1 : 0.8, opacity: showPassword ? 1 : 0.8 }}
            transition={{ duration: 0.15 }}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </motion.div>
        </motion.button>
      </div>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
