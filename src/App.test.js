import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from './redux/Store';
import { BrowserRouter,MemoryRouter } from 'react-router-dom';
import App from './App';
import { AmountTile } from './views/dashboards/dashboard-components';
import { RecentTransactions } from './views/dashboards/dashboard-components';

describe("Smoke Test App", () => {
  

  it('Should not crash when rendering App', async () => {
    const mockStore = configureStore();
    let store;
    store = mockStore;
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  });

});


describe("Smoke Test Dashboard", () => {

  it('should not crash when rendering AmountTile', async () => {
    const amount = vi.fn();
    const fabColor = vi.fn();
    const titleColor = vi.fn();
    render(<AmountTile title='Total Income' amount={amount} fabColor={fabColor} titleColor={titleColor} />);
  });

  it('should not crash when rendering Recent Transaction', async () => {
    const data = vi.fn();
    render(<RecentTransactions data={data} />);
  });
  

});

describe("Snapshot Test", async () => {

  it("should matches snapshot of AmountTile", () => {
    const amount = vi.fn();
    const fabColor = vi.fn();
    const titleColor = vi.fn();
    const { asFragment } = render(
      <AmountTile title='Total Income' amount={amount} fabColor={fabColor} titleColor={titleColor} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should matches snapshot Recent Transactions", () => {
    const data = vi.fn();
    const { asFragment } = render(<RecentTransactions data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });


});