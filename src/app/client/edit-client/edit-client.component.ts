import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'app/shared/hiring-process-services/client.service';
import { Client } from 'app/shared/model/client';
import { Poc } from 'app/shared/model/poc';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {


  @ViewChild("editClientForm", { static: false }) editClientForm!: NgForm;
  //@ViewChild('editClientForm') editClientForm!: NgForm;

  constructor(
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private clientService: ClientService
  ) { }

  showPocsFields: boolean = false;
  client: Client = new Client();
  pointToContact: Poc = new Poc();
  pointToContacts: Poc[] = [];
  editMode: boolean = false;
  selectedIndex: number | null = null;

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
    this.pointToContact = { ...selectedPoc };
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
        const existingIndex = this.pointToContacts.findIndex(
          poc => poc.name === this.pointToContact.name && poc.mobile === this.pointToContact.mobile
        );

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
    this.pointToContact = { name: '', mobile: '', email: '' };
    this.showPocsFields = false;
  }

  validatePoc(): boolean {
    if (!this.pointToContact.name || !this.pointToContact.email || !this.pointToContact.mobile) {
      throw new Error('All fields are required');
    }
    return true;
  }

  updateClient() {
    this.client.pocs = this.pointToContacts;
    console.log('client details are:', this.client.pocs.length);

    this.clientService.updateClient(this.client).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/client/list']);
      },
      error => {
        console.error('Error occurred while updating client:', error);
      }
    );
  }

  ngOnInit() {
    const stateData = history.state || {};
    const client = stateData.client;

    if (client) {
      this.client = client;
      this.pointToContacts = this.client.pocs;
    } else {
      console.error('Client data is missing in state.');
    }
  }
}

