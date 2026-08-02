import { Component, OnInit, inject ,input, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alertServices';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth';
import { User } from '../../../models/User';
import { firstValueFrom } from 'rxjs';
import { ResponseData } from '../../../models/ResponseData';
import { ComponentsTextService } from '../../../services/componentsText.service';
import { ComponentsText } from '../../../models/ComponentsText';


@Component({
  selector: 'app-edit-heredo-familiares',
  imports: [ReactiveFormsModule], 
  templateUrl: './edit-heredo-familiares.html',
  styleUrl: './edit-heredo-familiares.css',
})
export class EditHeredoFamiliares implements OnInit{


antecedentesForm!: FormGroup;
authService: any;
  curUser!: User;
  userId =  "";
  isLoading = false;
  
  componentText1 = signal<ComponentsText[]>([]);
  componentText2 = signal<ComponentsText[]>([]);
  componentText3 = signal<ComponentsText[]>([]);


constructor(private router: Router,
    private alerts: AlertService,
    private fb: FormBuilder, 
    private componentsTextService : ComponentsTextService,
    private auth: AuthService,
    private route: ActivatedRoute ) {
    this.authService = auth;
   }

  ngOnInit(): void {
  this.initForm();
 this.userId = this.auth.getUserId() ?? "0";
     const id = this.route.snapshot.paramMap.get('id') ?? "";
    
    this.safeCallComponents(this.componentText1,"0");
    this.safeCallComponents(this.componentText2,"6");
    this.safeCallComponents(this.componentText3,"7");



}


initForm(): void {
  // Inicialización del FormGroup con los valores de currentUser

this.antecedentesForm = new FormGroup({
      id: new FormControl(0),
      p1: new FormControl(0),
      p2: new FormControl(0),
      p3: new FormControl(0),
      p4: new FormControl(0),
      p5: new FormControl(0),
      p6: new FormControl(0),
      p7: new FormControl(0),
      p8: new FormControl(0),
      p9: new FormControl(0),
      p10: new FormControl(0),
      p11: new FormControl(0),
      p12: new FormControl(0),
      p13: new FormControl(0),
      p14: new FormControl(0),
      p15: new FormControl(0),
      p16: new FormControl(0),
      p17: new FormControl(0),
      p18: new FormControl(0),
      p19: new FormControl(0),
      p20: new FormControl(0),
      p21: new FormControl(0),
      p22: new FormControl(0),
      p23: new FormControl(0),
      p24: new FormControl(0),
      p25: new FormControl(0),
      p26: new FormControl(0),
      p27: new FormControl(0),
      p28: new FormControl(0),
      p29: new FormControl(0),
      p30: new FormControl(0),
      p31: new FormControl(0),
      p32: new FormControl(0),
      p33: new FormControl(0),
      p34: new FormControl(0),
      p35: new FormControl(0),
      p36: new FormControl(0),
      p37: new FormControl(0),
      p38: new FormControl(0),
      p39: new FormControl(0),
      p40: new FormControl(0),
      p41: new FormControl(0),
      p42: new FormControl(0),
      p43: new FormControl(0),
      p44: new FormControl(0),
      p45: new FormControl(0),
      p46: new FormControl(0),
      p47: new FormControl(0),
      p48: new FormControl(0),
      p49: new FormControl(0),
      p50: new FormControl(0),
      p51: new FormControl(0),
      p52: new FormControl(0),
      p53: new FormControl(0),
      p54: new FormControl(0),
      p55: new FormControl(0),
      p56: new FormControl(0),
      p57: new FormControl(0),
      p58: new FormControl(0),
      p59: new FormControl(0),
      p60: new FormControl(0),
      p61: new FormControl(0),
      p62: new FormControl(0),
      p63: new FormControl(0),
      p64: new FormControl(0),
      p65: new FormControl(0),
      p66: new FormControl(0),
      p67: new FormControl(0),
      p68: new FormControl(0),
      p69: new FormControl(0),
      p70: new FormControl(0),
      p71: new FormControl(0),
      p72: new FormControl(0),
      p73: new FormControl(0),
      p74: new FormControl(0),
      p75: new FormControl(0),
      p76: new FormControl(0),
      p77: new FormControl(0),
      p78: new FormControl(0),
      p79: new FormControl(0),
      p80: new FormControl(0),
      p81: new FormControl(0),
      p82: new FormControl(0),
      p83: new FormControl(0),
      p84: new FormControl(0),
      p85: new FormControl(0),
      p86: new FormControl(0),
      p87: new FormControl(0),
      p88: new FormControl(0),
      p89: new FormControl(0),
      p90: new FormControl(0),
      p91: new FormControl(0),
      p92: new FormControl(0),
      p93: new FormControl(0),
      p94: new FormControl(0),
      p95: new FormControl(0),
      p96: new FormControl(0),
      p97: new FormControl(0),
      p98: new FormControl(0),
      p99: new FormControl(0),
      p100: new FormControl(0),
      p101: new FormControl(0),
      p102: new FormControl(0),
      p103: new FormControl(0),
      p104: new FormControl(0),
      p105: new FormControl(0),







    });
  }

onSubmit(): void {
}



async safeCallComponents(arraySignal: WritableSignal<ComponentsText[]>, id: string) {
      this.componentsTextService.getComponents(id).subscribe({
        next: (data) => {
          arraySignal.update(currentItems => data);   
        },
        error: (err) => {
          console.error("Error reading Sexos");
          return [];
        }
      });
}


}
