import React from 'react';
import { AddPatientIcon, BanIcon, CloseIcon, ExitIcon, FlaskIcon, FloppyDiskIcon, GitHubIcon } from './index';

export type IconName = 'add-patient' | 'ban' | 'close' | 'exit' | 'flask' | 'floppy-disk' | 'github';

type Props = {
  name: IconName;
} & React.SVGProps<SVGSVGElement>;

const Icon: React.FC<Props> = ({ name, ...props }) => {
  switch (name) {
    case 'add-patient':
      return <AddPatientIcon {...props} />;
    case 'ban':
      return <BanIcon {...props} />;
    case 'close':
      return <CloseIcon {...props} />;
    case 'exit':
      return <ExitIcon {...props} />;
    case 'flask':
      return <FlaskIcon {...props} />;
    case 'floppy-disk':
      return <FloppyDiskIcon {...props} />;
    case 'github':
      return <GitHubIcon {...props} />;
  }
};

export default Icon;
