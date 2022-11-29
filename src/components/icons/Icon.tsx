import React from 'react';
import { ExitIcon } from './index';

export type IconName = 'exit';

type Props = {
  name: IconName;
} & React.SVGProps<SVGSVGElement>;

const Icon: React.FC<Props> = ({ name, ...props }) => {
  switch (name) {
    case 'exit':
      return <ExitIcon {...props} />;
  }
};

export default Icon;
