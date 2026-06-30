import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, inject, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';


declare const bootstrap: any;

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .modal-header.border-0 { border-bottom: 0 !important; }
    .modal-footer.border-0 { border-top: 0 !important; }
    .icon {
      width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center;
      border-radius: 50%; margin-right: 8px; font-weight: 700; color: #fff;
    }
    .icon.success { background: #198754; }
    .icon.info    { background: #0d6efd; }
    .icon.warning { background: #ffc107; color: #000; }
    .icon.danger  { background: #dc3545; }
  `],
  template: `
  <div #host class="modal fade" tabindex="-1" aria-hidden="true" [attr.aria-labelledby]="id + '-label'">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-0">
          <div class="d-flex align-items-center">
            <span class="icon" [ngClass]="type">{{ icon }}</span>
            <span class="modal-title fs-5 mb-0" [id]="id + '-label'">{{ title || defaultTitle }}</span>
          </div>
          <button type="button" class="btn-close" aria-label="Close" (click)="dismiss(false)"></button>
        </div>

        <div class="modal-body">
          <div [innerHTML]="message"></div>
        </div>

        <div class="modal-footer border-0" *ngIf="confirmMode; else alertActions">
          <button type="button" class="btn btn-outline-secondary" (click)="dismiss(false)">{{ cancelText || 'Cancel' }}</button>
          <button type="button" class="btn btn-primary" (click)="dismiss(true)">{{ okText || 'Confirm' }}</button>
        </div>

  <!--  
  @if (confirmMode) {
{{ cancelText || 'Cancel' }} {{ okText || 'Confirm' }}
} @else {
{{ okText || 'OK' }}
}      
  
  -->

        <ng-template #alertActions>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-primary" (click)="dismiss(true)">{{ okText || 'OK' }}</button>
          </div>
        </ng-template>
      </div>
    </div>
  </div>
  `
})
export class AlertModalComponent implements OnInit, OnDestroy {
  @Input() id = `alertModal-${Math.random().toString(36).slice(2)}`;
  @Input() title?: string;
  @Input() message = '';
  @Input() type: 'success' | 'info' | 'warning' | 'danger' = 'info';
  @Input() okText?: string;
  @Input() cancelText?: string;
  @Input() confirmMode = false;
  @Input() autoCloseMs?: number;
  @Input() backdrop: boolean | 'static' = true;
  @Input() keyboard = true;

  @ViewChild('host', { static: true }) host!: ElementRef<HTMLElement>;

  private modal!: any;
  private autoTimer?: any;
  private resolve!: (v: { confirmed: boolean }) => void;

  // expose a promise to the service that resolves on close
  waitForResult(): Promise<{ confirmed: boolean }> {
    return new Promise((res) => this.resolve = res);
  }



constructor() {
    // Safely runs ONLY in the browser, avoiding SSR "not defined" crashes
    afterNextRender(() => {
   
  const el = this.host.nativeElement;
    this.modal = new bootstrap.Modal(el, {
      backdrop: this.backdrop,
      keyboard: this.keyboard
    });

    el.addEventListener('hidden.bs.modal', () => {
      // When closed externally (ESC/backdrop)
      this.finish(false);
    });

    this.modal.show();

    if (this.autoCloseMs && !this.confirmMode) {
      this.autoTimer = setTimeout(() => this.dismiss(true), this.autoCloseMs);
    }


    });
  }

 ngOnInit(): void {}


/*
  ngOnInit(): void {
    const el = this.host.nativeElement;
    this.modal = new bootstrap.Modal(el, {
      backdrop: this.backdrop,
      keyboard: this.keyboard
    });

    el.addEventListener('hidden.bs.modal', () => {
      // When closed externally (ESC/backdrop)
      this.finish(false);
    });

    this.modal.show();

    if (this.autoCloseMs && !this.confirmMode) {
      this.autoTimer = setTimeout(() => this.dismiss(true), this.autoCloseMs);
    }
  }
*/
  ngOnDestroy(): void {
    clearTimeout(this.autoTimer);
    try { this.modal?.hide(); } catch {}
  }

  dismiss(confirmed: boolean) {
    // Prevent double resolve when 'hidden' event also fires
    this.finish(confirmed, true);
  }

  private finished = false;
  private finish(confirmed: boolean, hide = false) {
    if (this.finished) return;
    this.finished = true;
    clearTimeout(this.autoTimer);
    if (hide) {
      try { this.modal?.hide(); } catch {}
    }
    // Resolve if someone is awaiting, otherwise no-op
    if (this.resolve) this.resolve({ confirmed });
  }

  get icon(): string {
    switch (this.type) {
      case 'success': return '✓';
      case 'warning': return '!';
      case 'danger':  return '✕';
      default:        return 'i';
    }
  }

  get defaultTitle(): string {
    switch (this.type) {
      case 'success': return 'Success';
      case 'warning': return 'Warning';
      case 'danger':  return 'Error';
      default:        return 'Information';
    }
  }
}
