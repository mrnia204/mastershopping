'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next/themes';
import { SunIcon, MoonIcon, SunMoon } from 'lucide-react';


const ModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme} = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
      
  );
}
 
export default ModeToggle;