import YextIcon from "../icons/YextIcon";

export interface ButtonProps {
  label: string;
}

export const Button = (props: ButtonProps): JSX.Element => {
  return <div style={{width: 100}}><YextIcon></YextIcon><button className='button'>{props.label}</button></div>;
};
