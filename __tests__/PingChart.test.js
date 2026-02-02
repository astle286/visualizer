import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock Chart component so it doesn’t try to render a real canvas
jest.mock('../components/Chart', () => () => <div>Mocked Chart</div>);

import PingChart from '../components/PingChart';

test('renders PingChart component', () => {
  render(<PingChart />);
  expect(screen.getByText(/multi-host ping visualizer/i)).toBeInTheDocument();
  expect(screen.getByText(/mocked chart/i)).toBeInTheDocument();
});