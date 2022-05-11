import { Button } from './Button';

export default {
  title: 'atoms/Button',
  args: {
    label: 'Button label',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary'],
    },
  },
};

const Template = (args) => Button(args);

export const button = Template.bind({});
