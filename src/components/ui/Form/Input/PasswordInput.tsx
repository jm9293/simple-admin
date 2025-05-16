// State를 가질 수 밖에 없으므로 Cleint Component로 따로 구현
'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Input, InputProps } from '.';

export function PasswordInput(props: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      suffixIcon={
        <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </div>
      }
      {...props}
    />
  );
}
