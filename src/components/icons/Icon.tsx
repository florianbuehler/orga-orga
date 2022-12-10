import React from 'react';
import {
  AddDonorIcon,
  BanIcon,
  CloseIcon,
  EraserIcon,
  ExitIcon,
  FlaskIcon,
  FloppyDiskIcon,
  GitHubIcon,
  ProjectIcon
} from './index';

export type IconName =
  | 'add-donor'
  | 'ban'
  | 'close'
  | 'eraser'
  | 'exit'
  | 'flask'
  | 'floppy-disk'
  | 'github'
  | 'project';

type Props = {
  name: IconName;
} & React.SVGProps<SVGSVGElement>;

const Icon: React.FC<Props> = ({ name, ...props }) => {
  switch (name) {
    case 'add-donor':
      return <AddDonorIcon {...props} />;
    case 'ban':
      return <BanIcon {...props} />;
    case 'close':
      return <CloseIcon {...props} />;
    case 'eraser':
      return <EraserIcon {...props} />;
    case 'exit':
      return <ExitIcon {...props} />;
    case 'flask':
      return <FlaskIcon {...props} />;
    case 'floppy-disk':
      return <FloppyDiskIcon {...props} />;
    case 'github':
      return <GitHubIcon {...props} />;
    case 'project':
      return <ProjectIcon {...props} />;
  }
};

export default Icon;
