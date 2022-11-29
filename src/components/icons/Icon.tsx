import React from 'react';
import { ExitIcon, GitHubIcon } from './index';

export type IconName = 'exit' | 'github';

type Props = {
  name: IconName;
} & React.SVGProps<SVGSVGElement>;

const Icon: React.FC<Props> = ({ name, ...props }) => {
  switch (name) {
    case 'exit':
      return <ExitIcon {...props} />;
    case 'github':
      return <GitHubIcon {...props} />;
  }
};

export default Icon;
