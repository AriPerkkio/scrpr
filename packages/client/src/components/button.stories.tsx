import { storiesOf } from '@storybook/react';
import React from 'react';

import Button from './Button';

storiesOf('Button', module).add('with text', () => (
    <Button>Hello Button</Button>
));
