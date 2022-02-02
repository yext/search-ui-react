export interface ButtonProps {
  label: string;
}

export const Button = (props: ButtonProps): JSX.Element => {
  return <button className='button'>{props.label}</button>;
};
