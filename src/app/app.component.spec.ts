import { ErrorHandler } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTaiga } from '@taiga-ui/core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppComponent } from './app.component';
import { CalculateComponent } from './calculate/calculate.component';
import { CheckedComponent } from './checked/checked.component';
import { CONFIG_PROVIDER } from './config/config.provider';
import { CostComponent } from './cost/cost.component';
import { ListComponent } from './list/list.component';
import { MemoryStorageService } from './storage/memory-storage.service';
import { APP_STORAGE } from './storage/storage.providers';

describe('HMP calculator', () => {
  let storage: MemoryStorageService;
  let initialUrl: string;
  const handleError = vi.fn();

  beforeEach(() => {
    initialUrl = window.location.href;
    window.history.replaceState(null, '', window.location.pathname);
    storage = new MemoryStorageService();
    handleError.mockClear();

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [CalculateComponent, CheckedComponent, CostComponent, ListComponent],
      providers: [
        CONFIG_PROVIDER,
        provideTaiga(),
        { provide: APP_STORAGE, useValue: storage },
        { provide: ErrorHandler, useValue: { handleError } },
      ],
      rethrowApplicationErrors: false,
    });
  });

  afterEach(() => {
    window.history.replaceState(null, '', initialUrl);
  });

  it.each([
    ['amount', 'weight-kg', 'amount'],
    ['weight-kg', 'amount', 'weight-kg'],
    ['unsupported', 'amount', 'amount'],
    ['unsupported', 'unsupported', 'weight-kg'],
  ])('chooses mode %s with saved mode %s', async (requested, saved, expected) => {
    window.history.replaceState(null, '', '?mode=' + requested);
    storage.setItem('configActive', saved);

    const fixture = await render();

    expect(radio(fixture, expected).checked).toBe(true);
    expect(storage.getItem('configActive')).toBe(expected);
  });

  it('loads old rows, switches modes, saves a new calculation and clears only that mode', async () => {
    storage.setItem('weight-kg', '[[60,2,30]]');
    storage.setItem('amount', '[[12,2,6]]');
    const fixture = await render();

    expect(table(fixture).textContent).toContain('Вес');
    expect(table(fixture).querySelectorAll('tbody tr')).toHaveLength(1);
    await enterValues(fixture, '25', '2');
    expect(result(fixture)).toMatch(/12[,.]5/);

    radio(fixture, 'amount').click();
    await refresh(fixture);

    expect(storage.getItem('configActive')).toBe('amount');
    expect(table(fixture).textContent).toContain('Количество');
    expect(result(fixture)).toMatch(/^0\s*₽/);
    expect(submitButton(fixture).disabled).toBe(true);

    await enterValues(fixture, '100', '3');
    expect(result(fixture)).toMatch(/33[,.]33/);
    submitButton(fixture).click();
    await refresh(fixture);

    expect(storage.getItem('amount')).toBe('[[12,2,6],[100,3,33.33]]');
    expect(table(fixture).querySelectorAll('tbody tr')).toHaveLength(2);
    expect(result(fixture)).toMatch(/^0\s*₽/);

    element<HTMLButtonElement>(fixture, 'app-list button').click();
    await refresh(fixture);
    expect(storage.getItem('amount')).toBeNull();
    expect(storage.getItem('weight-kg')).toBe('[[60,2,30]]');

    radio(fixture, 'weight-kg').click();
    await refresh(fixture);
    expect(table(fixture).textContent).toContain('Вес');
    expect(table(fixture).querySelectorAll('tbody tr')).toHaveLength(1);
  });

  it('keeps valid stored rows beside damaged entries and handles invalid JSON', async () => {
    storage.setItem('weight-kg', '[null,[15,3,5],["20",2,10],[60,2]]');
    storage.setItem('amount', '{');
    const fixture = await render();

    expect(table(fixture).querySelectorAll('tbody tr')).toHaveLength(1);
    radio(fixture, 'amount').click();
    await refresh(fixture);

    const host: HTMLElement = fixture.nativeElement;
    expect(host.querySelector('app-list table')).toBeNull();
    expect(result(fixture)).toMatch(/^0\s*₽/);
  });

  it('restores the initial numeric display when switching back to kilograms', async () => {
    const fixture = await render();
    const selector = 'app-calculate tui-textfield:nth-child(2) input';
    const initialWeightDisplay = element<HTMLInputElement>(fixture, selector).value;

    radio(fixture, 'amount').click();
    await refresh(fixture);
    await enterValues(fixture, '20', '2');
    const amountInput = element<HTMLInputElement>(fixture, selector);
    amountInput.focus();
    const weightRadio = radio(fixture, 'weight-kg');
    weightRadio.focus();
    weightRadio.click();
    await refresh(fixture);

    const weightInput = element<HTMLInputElement>(fixture, selector);
    expect(weightInput).not.toBe(amountInput);
    expect(weightInput.value).toBe(initialWeightDisplay);
    expect(result(fixture)).toMatch(/^0\s*₽/);
  });

  it('keeps the selected radio and history when persisting a mode fails', async () => {
    storage.setItem('weight-kg', '[[60,2,30]]');
    storage.setItem('amount', '[[12,2,6]]');
    const fixture = await render();
    const writeError = new Error('Mode write failed');

    vi.spyOn(storage, 'setItem').mockImplementationOnce(() => {
      throw writeError;
    });

    radio(fixture, 'amount').click();
    await Promise.resolve();
    await refresh(fixture);

    expect(handleError).toHaveBeenCalledWith(writeError);
    expect(radio(fixture, 'weight-kg').checked).toBe(true);
    expect(storage.getItem('configActive')).toBe('weight-kg');
    expect(table(fixture).textContent).toContain('Вес');

    radio(fixture, 'amount').click();
    await refresh(fixture);

    expect(radio(fixture, 'amount').checked).toBe(true);
    expect(storage.getItem('configActive')).toBe('amount');
    expect(table(fixture).textContent).toContain('Количество');
  });

  it('retains the draft on a failed write and submits it once on retry', async () => {
    storage.setItem('weight-kg', '[[60,2,30]]');
    const fixture = await render();
    await enterValues(fixture, '100', '3');
    const writeError = new Error('Storage write failed');
    const write = vi.spyOn(storage, 'setItem').mockImplementationOnce(() => {
      throw writeError;
    });
    const form = element<HTMLFormElement>(fixture, 'app-calculate form');

    form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
    await refresh(fixture);

    expect(handleError).toHaveBeenCalledWith(writeError);
    expect(storage.getItem('weight-kg')).toBe('[[60,2,30]]');
    expect(table(fixture).querySelectorAll('tbody tr')).toHaveLength(1);
    expect(result(fixture)).toMatch(/33[,.]33/);

    form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
    form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
    await refresh(fixture);

    expect(write).toHaveBeenCalledTimes(2);
    expect(storage.getItem('weight-kg')).toBe('[[60,2,30],[100,3,33.33]]');
    expect(submitButton(fixture).disabled).toBe(true);
  });

  async function render(): Promise<ComponentFixture<AppComponent>> {
    const fixture = TestBed.createComponent(AppComponent);
    await refresh(fixture);
    return fixture;
  }

  async function refresh(fixture: ComponentFixture<AppComponent>): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  function element<T extends HTMLElement>(
    fixture: ComponentFixture<AppComponent>,
    selector: string
  ): T {
    const host: HTMLElement = fixture.nativeElement;
    const found = host.querySelector<T>(selector);

    if (!found) {
      throw new Error('Missing element: ' + selector);
    }

    return found;
  }

  function table(fixture: ComponentFixture<AppComponent>): HTMLTableElement {
    return element(fixture, 'app-list table');
  }

  function result(fixture: ComponentFixture<AppComponent>): string {
    return element(fixture, 'app-cost h1').textContent?.trim() ?? '';
  }

  function submitButton(fixture: ComponentFixture<AppComponent>): HTMLButtonElement {
    return element(fixture, 'app-calculate button[type="submit"]');
  }

  function radio(fixture: ComponentFixture<AppComponent>, mode: string): HTMLInputElement {
    const host: HTMLElement = fixture.nativeElement;
    const text = mode === 'amount' ? 'за 1 шт.' : 'за 1 кг';
    const labels = [...host.querySelectorAll('app-checked label')];
    const input = labels.find(label => label.textContent?.includes(text))
      ?.querySelector<HTMLInputElement>('input');

    if (!input) {
      throw new Error('Missing mode: ' + mode);
    }

    return input;
  }

  async function enterValues(
    fixture: ComponentFixture<AppComponent>,
    price: string,
    quantity: string
  ): Promise<void> {
    const host: HTMLElement = fixture.nativeElement;
    const inputs = host.querySelectorAll<HTMLInputElement>('app-calculate input');

    for (const [i, value] of [price, quantity].entries()) {
      inputs[i].value = value;
      inputs[i].dispatchEvent(new InputEvent('input', { bubbles: true }));
      await refresh(fixture);
    }
  }
});
