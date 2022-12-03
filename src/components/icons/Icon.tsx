import React from 'react';
import { ExitIcon, FlaskIcon, GitHubIcon } from './index';

export type IconName = 'exit' | 'flask' | 'github';

type Props = {
  name: IconName;
} & React.SVGProps<SVGSVGElement>;

const Icon: React.FC<Props> = ({ name, ...props }) => {
  switch (name) {
    case 'exit':
      return <ExitIcon {...props} />;
    case 'flask':
      return <FlaskIcon {...props} />;
    case 'github':
      return <GitHubIcon {...props} />;
  }
};

export default Icon;
