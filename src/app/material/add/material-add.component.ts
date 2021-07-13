import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageStyler} from '../../utils/message-styler';
import {Material} from '../model/material.model';
import {MaterialRepositoryService} from '../repository-service/material-repository.service';
import {TranslationService} from '../../translation/translation.service';

@Component({
  selector: 'app-material-add',
  templateUrl: './material-add.component.html',
  styleUrls: ['./material-add.component.css']
})
export class MaterialAddComponent implements OnInit {

  isOnEdit = history.state.material !== undefined;
  materialAddForm: FormGroup;
  material: Material = history.state.material;
  messageStyler = MessageStyler;
  userMessage;

  constructor(private materialRepositoryService: MaterialRepositoryService,
              public translationService: TranslationService) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }


  private initializeForm() {

    if (this.isOnEdit) {

      this.materialAddForm = new FormGroup({
        type: new FormControl(this.material.type, Validators.required)
      });
    } else {
      this.materialAddForm = new FormGroup({
        type: new FormControl('', Validators.required),
      });
    }
  }

  onSubmit() {

    const newMaterial = new Material(
      this.materialAddForm.value.type
    );

    if (this.isOnEdit) {
      this.materialRepositoryService.updateMaterial(this.material.id, newMaterial).subscribe(
        data => {
          this.userMessage = 'Material { ' + Object.values(data).splice(1, 1).toString() + ' } has been updated.';
        },
        err => {
          this.userMessage = Object.values(err.error)[0];
        }
      );
    } else {
      this.materialRepositoryService.createMaterial(newMaterial).subscribe(
        data => {
          this.userMessage = 'Material { ' + Object.values(data).splice(1, 1).toString() + ' } has been created.';
          this.materialAddForm.reset();
        },
        err => {
          this.userMessage = Object.values(err.error)[0];
        }
      );
    }
  }
}
