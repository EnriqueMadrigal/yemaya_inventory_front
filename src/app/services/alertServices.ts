import { ApplicationRef, ComponentRef, Injectable, Injector, Type, createComponent, EnvironmentInjector } from '@angular/core';
import { AlertModalComponent } from '../components/modals/alert/alert.modal';
import { AlertOptions, AlertResult } from '../models/AlertType';


@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private envInjector: EnvironmentInjector
  ) {}

  // Simple “OK” alert
  alert(options: AlertOptions): Promise<AlertResult> {
    return this.open({ ...options, cancelText: undefined }, false);
  }

  // Confirm with OK/Cancel
  confirm(options: AlertOptions): Promise<AlertResult> {
    const withDefaults: AlertOptions = {
      cancelText: 'Cancel',
      ...options
    };
    return this.open(withDefaults, true);
  }

  success(message: string, title = 'Success', autoCloseMs?: number) {
    return this.alert({ type: 'success', message, title, autoCloseMs });
  }

  info(message: string, title = 'Information', autoCloseMs?: number) {
    return this.alert({ type: 'info', message, title, autoCloseMs });
  }

  warning(message: string, title = 'Warning') {
    return this.alert({ type: 'warning', message, title });
  }

  error(message: string, title = 'Error') {
    return this.alert({ type: 'danger', message, title });
  }

  private open(options: AlertOptions, confirmMode: boolean): Promise<AlertResult> {
    const cmpRef = this.attach(AlertModalComponent);
    const inst = cmpRef.instance;

    // Pass inputs
    inst.title = options.title;
    inst.message = options.message;
    inst.type = options.type ?? 'info';
    inst.okText = options.okText;
    inst.cancelText = options.cancelText;
    inst.confirmMode = confirmMode;
    inst.autoCloseMs = options.autoCloseMs;
    inst.backdrop = options.backdrop ?? true;
    inst.keyboard = options.keyboard ?? true;

    // Return the modal's promise, then clean up
    const resultP = inst.waitForResult().then(res => {
      this.detach(cmpRef);
      return res;
    });

    return resultP;
  }

  private attach<T>(component: Type<T>): ComponentRef<T> {
    const cmpRef = createComponent(component, {
      environmentInjector: this.envInjector,
      elementInjector: this.injector
    });
    this.appRef.attachView(cmpRef.hostView);
    document.body.appendChild(cmpRef.location.nativeElement);
    return cmpRef;
  }

  private detach<T>(cmpRef: ComponentRef<T>) {
    this.appRef.detachView(cmpRef.hostView);
    cmpRef.destroy();
  }
}
