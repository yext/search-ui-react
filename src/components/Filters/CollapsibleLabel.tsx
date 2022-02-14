import classNames from 'classnames';
import { ReactNode } from 'react';
import ChevronIcon from '../../icons/ChevronIcon';
import CollapseButton from './CollapseButton';
import { useGroupContext } from './GroupContext';
import Label from './Label';

export type CollapsibleLabelProps = {
  children?: ReactNode
};

export default function CollapsibleLabel({ children }: CollapsibleLabelProps): JSX.Element {
  const { isExpanded } = useGroupContext();
  const iconClassName = classNames('w-3', {
    'transform rotate-180': !isExpanded
  });

  return (
    <CollapseButton>
      <Label>{children}</Label>
      <ChevronIcon className={iconClassName}/>
    </CollapseButton>
  );
}