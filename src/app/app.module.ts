import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstructionComponent } from './instruction/instruction.component';
import { ControlComponent } from './control/control.component';
import { ExperimentalComponent } from './experimental/experimental.component';
import { SurveyComponent } from './survey/survey.component';
import { EndComponent } from './end/end.component';
import { DoorComponent } from './door/door.component';
import { ConsentComponent } from './consent/consent.component';

@NgModule({
  declarations: [
    AppComponent,
    InstructionComponent,
    ControlComponent,
    ExperimentalComponent,
    SurveyComponent,
    EndComponent,
    DoorComponent,
    ConsentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
