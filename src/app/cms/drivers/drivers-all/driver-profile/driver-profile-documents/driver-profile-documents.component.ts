import { Component, OnInit } from '@angular/core';
import { Media } from 'src/app/@models/entities/media';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { environment } from 'src/environments/environment';
import { Driver } from 'src/app/@models/entities/driver';

@Component({
  selector: 'app-driver-profile-documents',
  templateUrl: './driver-profile-documents.component.html',
  styleUrls: ['./driver-profile-documents.component.css']
})
export class DriverProfileDocumentsComponent implements OnInit {
  documents: Media[];
  root = environment.root;
  constructor(private route: ActivatedRoute, private backend: BackendService) { }

  ngOnInit(): void {
    this.route.data.subscribe(async (x) => {
      let docs = (await this.backend.getRows<Driver>({table: 'driver', filters: {id: this.route.snapshot.paramMap.get('id')}, relations: ['documents']})).data[0].documents;
      this.documents = docs;
    });
  }

}
