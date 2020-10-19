import * as React from 'react';

import { getGreeting } from '@mono/shared/greeter';

interface Props {
  firstName: string;
}

const Greeting: React.FC<Props> = ({ firstName }) => {
  return <h1>{getGreeting(firstName)}</h1>
};

export default Greeting;
