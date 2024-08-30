import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'app/shared/hiring-process-services/client.service';
import { Client } from 'app/shared/model/client';
import { Poc } from 'app/shared/model/poc';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {
  showPocsFields: boolean = false;
  client: Client = new Client();
  pointToContact: Poc = new Poc();
  pointToContacts: Poc[] = [];
  editMode: boolean = false;
  editedPocIndex: number | null = null;
  selectedIndex: number | null = null;

  constructor(
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private clientService: ClientService
  ) { }

  togglePocsFields() {
    this.showPocsFields = !this.showPocsFields;
    if (this.showPocsFields) {
      this.addPocField();
    }
  }

  addPocField() {
    this.pointToContact = new Poc();
  }

  EditPoc(index: number) {
    const selectedPoc = this.pointToContacts[index];
    this.pointToContact.name = selectedPoc.name;
    this.pointToContact.mobile = selectedPoc.mobile;
    this.pointToContact.email = selectedPoc.email;
    this.editMode = true;
    this.selectedIndex = index;
  }

  deletePoc(i: any) {
    this.pointToContacts.splice(i, 1);
  }

  submitPocs() {
    if (this.validatePoc()) {
      if (this.editMode && this.selectedIndex !== undefined && this.selectedIndex !== null) {
        this.pointToContacts[this.selectedIndex] = { ...this.pointToContact };
        this.editMode = false;
        this.selectedIndex = null;
      } else {
        const existingIndex = this.pointToContacts.findIndex(edu => edu.name === this.pointToContact.name && edu.mobile === this.pointToContact.mobile);
        if (existingIndex !== -1) {
          this.pointToContacts[existingIndex] = { ...this.pointToContact };
        } else {
          this.pointToContacts.push({ ...this.pointToContact });
        }
      }
      this.clearPocFields();
    }
  }

  clearPocFields() {
    this.pointToContact = { name: "", mobile: "", email: "" };
    this.showPocsFields = false;
  }

  validatePoc(): boolean {
    if (!this.pointToContact.name || !this.pointToContact.email || !this.pointToContact.mobile) {
      throw new Error('All fields are required');
    }
    return true;
  }

  addClient() {
    this.client.pocs = this.pointToContacts;
    console.log("client details are:" + this.client.pocs.length);
    this.clientService.addClient(this.client).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/client/list']);
      },
      error => {
        console.error('Error occurred while adding client:', error);
      }
    );
  }
  cancel(){
    this.router.navigate(['/client/list']);
  }
  ngOnInit() { }
}


