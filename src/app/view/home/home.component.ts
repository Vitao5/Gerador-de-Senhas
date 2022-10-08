import { Options } from '@angular-slider/ngx-slider';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200
  };
  formSenha!: FormGroup 
  model: any = {}
  senhaGerada: any = []
  tipoSenha: string = ''
  showMensagem: boolean = false
  enableSomenteNumeros: any
  enableSomenteLetras:  any
  enableCaracteresEspeciais:  any
  enableLetrasMaiusculas:  any
  enableLetraMinusculas:  any
  enableNumeros:  any
  novaSenha: string = ''
  senhaNumeros: any = []
  senhaCaracteres: any = []
  senhaLetrasMaiusculas: any = []
  senhasLetrasMinusculas: any = []
  senhaSomenteNumeros: any = []
  senhaSomenteLetras: any = []
  caracteresEspeciais: any = []

  constructor(
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    
    this.formSenha = this.fb.group({
      tamanhoSenha: ['10'],
      senhaEscolhida: [''],
      enableSomenteNumeros:[],
      enableSomenteLetras:[],
      enableCaracteresEspeciais:[],
      enableLetrasMaiusculas:[],
      enableLetraMinusculas:[],
      enableNumeros:[],
    })
    this.preencheCampos()
  }


  gerarLetrasMaiusculas(){
    const tamanhoSenha = '-'+this.formSenha.get('tamanhoSenha')?.value
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVXYZÇÁÉÍÓÚ'
    for (let index = 0; index <this.formSenha.get('tamanhoSenha')?.value; index++) {
     const senha =  alfabeto[Math.floor(Math.random() * alfabeto.length)]
      this.senhaLetrasMaiusculas.push(senha)
    }
    
    return this.senhaLetrasMaiusculas.join('').slice(+tamanhoSenha) 
  }

  gerarLetrasMinusculas(){
    const tamanhoSenha = '-'+this.formSenha.get('tamanhoSenha')?.value
    const alfabeto = 'abcdefghijklmnopqrstuvxyzçáéíóú'
    for (let index = 0; index <this.formSenha.get('tamanhoSenha')?.value; index++) {
     const senha =  alfabeto[Math.floor(Math.random() * alfabeto.length)]
      this.senhasLetrasMinusculas.push(senha)
    }
    
    return this.senhasLetrasMinusculas.join('').slice(+tamanhoSenha) 
  }

  gerarNumeros(){
    const tamanhoSenha = '-'+this.formSenha.get('tamanhoSenha')?.value
    const alfabeto = '0123456789'
    for (let index = 0; index <this.formSenha.get('tamanhoSenha')?.value; index++) {
     const senha =  alfabeto[Math.floor(Math.random() * alfabeto.length)]
      this.senhaNumeros.push(senha)
    }
    
    return  this.senhaNumeros.join('').slice(+tamanhoSenha)
  }

  gerarCaracteresEspeciais(){
    const  s = '!@#$%&*?:[]^'
    const tamanhoSenha = '-'+this.formSenha.get('tamanhoSenha')?.value
    for (let index = 0; index <this.formSenha.get('tamanhoSenha')?.value; index++) {
      const senha = s[Math.floor(Math.random() * s.length)]
      this.caracteresEspeciais.push(senha)    
    }
    return this.caracteresEspeciais.join('').slice(+tamanhoSenha) 
  }


  preencheCampos(){
   setTimeout(() => {
    this.formSenha.get('enableNumeros')?.setValue(true)  
    this.formSenha.get('enableCaracteresEspeciais')?.setValue(true) 
    this.formSenha.get('enableLetraMinusculas')?.setValue(true) 
    this.formSenha.get('enableLetrasMaiusculas')?.setValue(true) 
    this.formSenha.get('enableSomenteLetras')?.setValue(false)  
    this.formSenha.get('enableSomenteNumeros')?.setValue(false) 
   }, 200);
  }

  opcoesSelecionadas(){
    const campos = []
    if(this.model.enableNumeros !== false && this.model.enableNumeros !== ''){
     campos.push({N: this.model.enableNumeros, label: 'N'})
    }
    if(this.model.enableCaracteresEspeciais  !== false  && this.model.enableCaracteresEspeciais !== ''){
      campos.push({CE: this.model.enableCaracteresEspeciais, label: 'CE'})
     }
     if(this.model.enableLetraMinusculas  !== false  && this.model.enableLetraMinusculas !== ''){
      campos.push({LMN: this.model.enableLetraMinusculas, label: 'LMN'})
     }
     if(this.model.enableLetrasMaiusculas !== false  && this.model.enableLetrasMaiusculas !== ''){
      campos.push({LM: this.model.enableLetrasMaiusculas, label: 'LM'})
     }
     if(this.model.enableSomenteLetras  !== false  && this.model.enableSomenteLetras !== ''){
      campos.push({SL: this.model.enableSomenteLetras, label: 'SL'})
     }
     if(this.model.enableSomenteNumeros  !== false  && this.model.enableSomenteNumeros !== ''){
      campos.push({SN: this.model.enableSomenteNumeros, label: 'SN'})
     }

     return campos
  }


  gerarSenha(){ 
    const tamanhoSenha = this.formSenha.get('tamanhoSenha')?.value
    
     if( 
     !this.formSenha.get('enableNumeros')?.value &&
     !this.formSenha.get('enableCaracteresEspeciais')?.value  &&
     !this.formSenha.get('enableLetraMinusculas')?.value  &&
     !this.formSenha.get('enableLetrasMaiusculas')?.value &&
     !this.formSenha.get('enableSomenteLetras')?.value  &&
     !this.formSenha.get('enableSomenteNumeros')?.value
     ){
      this.showMensagem = true 
     }
    
    else{
      const senhas = this.opcoesSelecionadas()
      
      this.senhaGerada.length = 0
      this.showMensagem = false 
      for (const element of senhas) {
        element.label === 'N' ? this.senhaGerada.push(this.gerarNumeros()) : null
        element.label === 'CE' ? this.senhaGerada.push(this.gerarCaracteresEspeciais()) : null
        element.label === 'LMN' ? this.senhaGerada.push(this.gerarLetrasMinusculas()) : null
        element.label === 'LM' ?  this.senhaGerada.push(this.gerarLetrasMaiusculas()) : null
        element.label === 'SL' ? this.senhaGerada.push(this.gerarLetrasMinusculas()) : null
        element.label === 'SN' ? this.senhaGerada.push(this.gerarNumeros()) : null
      }

      const senhaConcat  = this.senhaGerada.join('')
      const senhaEmbaralhada = senhaConcat.split('').sort(function(){return 0.5-Math.random()}).join('')
      this.novaSenha = senhaEmbaralhada.substring(0, +tamanhoSenha)
    
    }
  }
  copiarSenha(){
    navigator.clipboard.writeText(this.novaSenha).then().catch(e => console.error(e));
  }

  verificaOpcaoSelecionada(param: string){
    this.tipoSenha = param

    if(param === 'SN'){

      this.formSenha.get('enableNumeros')?.setValue('')
      this.formSenha.get('enableCaracteresEspeciais')?.setValue('')
      this.formSenha.get('enableLetraMinusculas')?.setValue('')
      this.formSenha.get('enableLetrasMaiusculas')?.setValue('')
      this.formSenha.get('enableSomenteLetras')?.setValue('')

    }

    if(param === 'SL'){    
      this.formSenha.get('enableNumeros')?.setValue('')
      this.formSenha.get('enableCaracteresEspeciais')?.setValue('')
      this.formSenha.get('enableLetraMinusculas')?.setValue('')
      this.formSenha.get('enableLetrasMaiusculas')?.setValue('')
      this.formSenha.get('enableSomenteNumeros')?.setValue('')
    }

    if(
      param === 'CE' ||
      param === 'LM' ||
      param === 'LMN' ||
      param === 'N'
      ){
      this.formSenha.get('enableSomenteLetras')?.setValue('')
      this.formSenha.get('enableSomenteNumeros')?.setValue('')
    }
  }
}
