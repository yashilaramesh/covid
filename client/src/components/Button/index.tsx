import React, { CSSProperties } from "react";

// define button styles here


const btnStyle = {
  primary: 'bg-primary hover:bg-gray-600 text-white rounded-full', //big primary button
  secondary: 'bg-gray-100 hover:bg-gray-300 text-black rounded-md',
  transparent: '',
  outline: '',
};

const btnSize = {
  sm: '',
  md: 'py1 px-4',
  lg: 'py-2 px-6 ',
  xl: ''
};

const Button = ({
  children,
  disabled = false,
  id,
  onClick,
  className,
  style,
  variant = 'primary',
  size = 'lg',
}:ButtonProps) => {
  return (
    <button
      type="button"
      id={id}
      className={`grid gap-4 auto-cols-auto ${btnStyle[variant]} ${btnSize[size]} ${className}`}
      style={style}
      onClick={()=> onClick()}
      //onKeyDown={()=>onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
interface ButtonProps {
  children?: React.ReactNode
  disabled?: boolean
  id?: string
  onClick?:any
  className?: string
  style?: CSSProperties
  variant?: 'primary' | 'secondary' | 'outline' | 'transparent'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}
export default Button;
